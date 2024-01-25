import * as log4js from '@/logger';
import strapi from '@/strapi';
import * as redis from '@/redis';
import objectHash from 'object-hash';
import { StrapiResponseData, Video } from '@/types/strapi';

const logger = log4js.init().getLogger();

export default async function upsertVideo(record: Omit<Video, 'etag' | 'raw'>, raw: any, recordId?: number) {
  const redisClient = await redis.init();

  await redis.connect(redisClient);

  // check Etag (MD5 hash)
  const etag = objectHash.MD5(record);

  const isUpdated = await redisClient
    .hGet(redis.keys.videoEtagHash, `youtube:${record.videoId}`)
    .then(cachedEtag => {
      return etag !== cachedEtag;
    })
    .catch(err => {
      err.message = `[Redis.HGET(videoEtagHash)] ${err.message}`;
      throw err;
    });

  if(!isUpdated) {
    logger.info(`[Task] Skipping video "${record.title}" (${record.videoId}): already up-to-date.`);
    return;
  }

  // get current entry id
  const entryId =
    recordId ||
    await strapi
      .find<StrapiResponseData<Video>[]>(
        'videos',
        {
          fields: [],
          filters: {
            provider: 'youtube',
            videoId: record.videoId,
          },
          pagination: {
            start: 0,
            limit: 1,
            withCount: false,
          },
        }
      )
      .then(result => {
        return result.data[0]?.id || null;
      })
      .catch(err => {
        err.message = `[Strapi.find<Video[]>] ${err.message}`;
        throw err;
      });

  // create or update record
  const fullRecord: Video = {
    ...record,
    etag,
    raw,
  };

  if(entryId === null) {
    await strapi
      .create<StrapiResponseData<Video>>(
        'videos',
        fullRecord,
        {
          fields: [],
        }
      )
      .then(result => {
        logger.debug(`[Strapi.create<Video>] Created video entry (id: ${result.data.id}).`);
      })
      .catch(err => {
        err.message = `[Strapi.create<Video>] ${err.message}`;
        throw err;
      });
  }
  else {
    await strapi
      .update<StrapiResponseData<Video>>(
        'videos',
        entryId,
        fullRecord,
        {
          fields: [],
        }
      )
      .then(() => {
        logger.debug(`[Strapi.update<Video>] Updated video entry (id: ${entryId}).`)
      })
      .catch(err => {
        err.message = `[Strapi.update<Video>] ${err.message}`;
        throw err;
      });
  }

  // store etag
  await redisClient
    .hSet(redis.keys.videoEtagHash, `youtube:${record.videoId}`, etag)
    .then(() => {
      logger.debug(`[Redis.HSET(videoEtagHash)] Stored etag of the video "${record.title}" (${record.videoId}).`);
      return;
    })
    .catch(err => {
      err.message = `[Redis.HSET(videoEtagHash)] ${err.message}`;
      throw err;
    });

  await redisClient.disconnect();

  return;
}
