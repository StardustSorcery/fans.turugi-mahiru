import * as log4js from '@/logger';
import strapi from '@/strapi';
import * as redis from '@/redis';
import scheduler from 'node-schedule';
import { Innertube, YTNodes } from 'youtubei.js';
import objectHash from 'object-hash';
import { StrapiResponseData, Video } from '@/types/strapi';

const logger = log4js.init().getLogger();

async function main() {
  logger.info('[System] Launched.');

  const redisClient = await redis.init();

  const youtube = await Innertube.create({
    lang: 'ja',
    location: 'JP',
  });

  scheduler.scheduleJob(
    process.env.CRON_RULE || '*/30 * * * * *',
    async () => {
      try {
        // fetch live streams from "live" feed
        const liveStreams = await youtube
          .getChannel(process.env.YT_CHANNEL_ID || 'UCSzT-rU62SSiham-g1Dj9yw')
          .then(channel => {
            return channel.getLiveStreams();
          })
          .then(channel => {
            logger.debug(`[Innertube#channel] Fetched ${channel.videos.length} live streams.`);
            return channel.videos;
          })
          .catch(err => {
            err.message = `[Innertube#channel] ${err.message}`;
            throw err;
          });

        await redis.connect(redisClient);

        await Promise.allSettled(liveStreams.map(async (video) => {
          try {
            // check Etag (MD5 hash)
            if(!(video instanceof YTNodes.Video)) {
              logger.warn(`[Task] Skipping video "${video.title}": the type "${video.type}" is not acceptable.`);
              return;
            }

            const record: Omit<Video, 'etag' | 'raw'> = {
              provider: 'youtube',
              videoId: video.id,
              type: 'LiveStream',
              title: video.title.toString(),
              description: '',
              thumbnails: video.thumbnails,
              author: {
                authorId: null,
                title: null,
              },
              isInProgressLiveStream: (video.duration.seconds === null) && (!video.upcoming),
              isUpcomingLiveStream: !!video.upcoming,
              videoPublishedAt: null,
              scheduledStartsAt: video.upcoming || null,
              scheduledEndsAt: null,
              startedAt: null,
              endedAt: null,
              client: 'youtubei.js',
            };

            const etag = objectHash.MD5(record);

            const isUpdated = await redisClient
              .hGet(redis.keys.videoEtagHash, video.id)
              .then(cachedEtag => {
                return etag !== cachedEtag;
              })
              .catch(err => {
                err.message = `[Redis.HGET(videoEtagHash)] ${err.message}`;
                throw err;
              });

            if(!isUpdated) {
              logger.info(`[Task] Skipping video "${video.title}" (${video.id}): already up-to-date.`);
              return;
            }

            // get current entry id
            const entryId = await strapi
              .find<StrapiResponseData<Video>[]>(
                'videos',
                {
                  fields: [],
                  filters: {
                    provider: 'youtube',
                    videoId: video.id,
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
              raw: video,
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
              .hSet(redis.keys.videoEtagHash, video.id, etag)
              .then(() => {
                logger.debug(`[Redis.HSET(videoEtagHash)] Stored etag of the video "${video.title}" (${video.id}).`);
                return;
              })
              .catch(err => {
                err.message = `[Redis.HSET(videoEtagHash)] ${err.message}`;
                throw err;
              });
          }
          catch(err) {
            if(err instanceof Error) {
              logger.error(`[Task] ${err.toString()}`);
            }
            else {
              logger.error('[Task] Unknown error occured.');
            }
            throw err;
          }
        })).then(results => {
          logger.info(`[Task] Successfully processed ${results.filter(r => r.status === 'fulfilled').length}/${results.length}.`);
        });
      }
      catch(err) {
        if(err instanceof Error) {
          logger.error(`[Main] ${err.toString()}`);
        }
        else {
          logger.error('[Main] Unknown error occured.');
        }
      }
    }
  );
}

async function shutdown(code: number) {
  logger.info(`[System] Shutting down... (${code})`);

  return process.exit(code);
}

// launch
try {
  main();
}
catch(err) {
  if(err instanceof Error) {
    logger.error(`[System] ${err.toString()}`);
  }
  else {
    logger.error('[System] Unknown error occured.');
  }

  shutdown(1);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
process.on('SIGQUIT', () => shutdown(0));
