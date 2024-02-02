import * as log4js from '@/logger';
import strapi from '@/strapi';
import * as redis from '@/redis';
import objectHash from 'object-hash';
import { StrapiResponseData, Video } from '@/types/strapi';

const logger = log4js.init().getLogger();

export default async function upsertVideo(record: Partial<Omit<Video, 'etag' | 'raw'>>, raw: any, recordId?: number) {
  const redisClient = await redis.init();

  await redis.connect(redisClient);

  return (async () => {
    // get current core fields
    const currentRecord = await strapi
      .find<StrapiResponseData<Video>[]>(
        'videos',
        {
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
        return result.data[0] || null;
      })
      .catch(err => {
        err.message = `[Strapi.find<Video[]>] ${err.message}`;
        throw err;
      });

    if(!currentRecord) { // create new
      const etag = objectHash.MD5(record);
      const fullRecord = {
        ...record,
        etag,
        raw,
      };

      await strapi
        .create<StrapiResponseData<Video>>(
          'videos',
          fullRecord,
          {
            fields: [],
          }
        )
        .then(result => {
          logger.debug(`[Strapi.create<Video>] Created video entry "${fullRecord.title}" (id: ${result.data.id}).`);
        })
        .catch(err => {
          err.message = `[Strapi.create<Video>] ${err.message} (title: "${fullRecord.title}")`;
          throw err;
        });

      return;
    }
    else if(record.provider === 'googleapis.youtube.js') {
      // force update
      const etag = objectHash.MD5(record);
      const fullRecord = {
        ...record,
        etag,
        raw,
      };

      await strapi
        .update<StrapiResponseData<Video>>(
          'videos',
          currentRecord.id,
          fullRecord,
          {
            fields: [],
          }
        )
        .then(() => {
          logger.debug(`[Strapi.update<Video>] Updated video entry "${fullRecord.title}" (id: ${currentRecord.id}).`)
        })
        .catch(err => {
          err.message = `[Strapi.update<Video>] ${err.message} (title: "${fullRecord.title}", id: ${currentRecord.id})`;
          throw err;
        });
    
      return;
    }
    else { // exists
      const latestRecord = structuredClone<StrapiResponseData<Video>['attributes']>(currentRecord.attributes);

      let isUpdated = false;
      if(typeof record.title === 'string' && latestRecord.title !== record.title) {
        latestRecord.title = record.title;
        isUpdated = true;
      }
      if(typeof record.scheduledStartsAt === 'string' && latestRecord.scheduledStartsAt !== record.scheduledStartsAt) {
        latestRecord.scheduledStartsAt = record.scheduledStartsAt;
        isUpdated = true;
      }
      if(typeof record.isInProgressLiveStream === 'boolean' && latestRecord.isInProgressLiveStream !== record.isInProgressLiveStream) {
        latestRecord.isInProgressLiveStream = record.isInProgressLiveStream;
        isUpdated = true;
      }
      if(typeof record.isUpcomingLiveStream === 'boolean' && latestRecord.isUpcomingLiveStream !== record.isUpcomingLiveStream) {
        latestRecord.isUpcomingLiveStream = record.isUpcomingLiveStream;
        isUpdated = true;
      }

      if(!isUpdated) { // skip
        logger.info(`[Task] Skipping video "${record.title}" (${record.videoId}): already up-to-date.`);
        return;
      }

      if(typeof record.client === 'string' && latestRecord.client !== record.client) {
        latestRecord.client = record.client;
      }

      // update
      const etag = objectHash.MD5(latestRecord);
      const fullRecord = {
        ...latestRecord,
        etag,
        raw,
      };

      await strapi
        .update<StrapiResponseData<Video>>(
          'videos',
          currentRecord.id,
          fullRecord,
          {
            fields: [],
          }
        )
        .then(() => {
          logger.debug(`[Strapi.update<Video>] Updated video entry "${fullRecord.title}" (id: ${currentRecord.id}).`)
        })
        .catch(err => {
          err.message = `[Strapi.update<Video>] ${err.message} (title: "${fullRecord.title}", id: ${currentRecord.id})`;
          throw err;
        });
    
      return;
    }
  })()
    .finally(async () => {
      await redisClient.disconnect();
    });
}
