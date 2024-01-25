import Strapi from 'strapi-sdk-js'
import * as redis from './redis';
import { StrapiResponseData, Video } from '@/types/strapi';
import objectHash from 'object-hash';

const strapi = new Strapi({
  url: process.env.CMS_URL || 'http://cms:1337/',
  axiosOptions: {
    headers: {
      'Authorization': `Bearer ${process.env.CMS_API_TOKEN || ''}`,
    },
  },
});

export default strapi;

export async function upsertVideo(record: Omit<Video, 'etag' | 'raw'>, raw: any, recordId?: number) {
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
    return null;
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

  let upsertedRecord;
  if(entryId === null) {
    upsertedRecord = await strapi
      .create<StrapiResponseData<Video>>(
        'videos',
        fullRecord,
        {
          populate: [
            'thumbnails',
            'auhtor',
          ],
        }
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        err.message = `[Strapi.create<Video>] ${err.message}`;
        throw err;
      });
  }
  else {
    upsertedRecord = await strapi
      .update<StrapiResponseData<Video>>(
        'videos',
        entryId,
        fullRecord,
        {
          populate: [
            'thumbnails',
            'auhtor',
          ],
        }
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        err.message = `[Strapi.update<Video>] ${err.message}`;
        throw err;
      });
  }

  // store etag
  await redisClient
    .hSet(redis.keys.videoEtagHash, `youtube:${record.videoId}`, etag)
    .catch(err => {
      err.message = `[Redis.HSET(videoEtagHash)] ${err.message}`;
      throw err;
    });

  await redisClient.disconnect();

  return upsertedRecord;
}

