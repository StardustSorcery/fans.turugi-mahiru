import * as log4js from '@/logger';
import scheduler from 'node-schedule';
import { Innertube, YTNodes } from 'youtubei.js';
import { Video } from '@/types/strapi';
import upsertVideo from '@/libs/upsertVideo';
import minimist from 'minimist';
import * as GYoutube from '@/g-youtube';
import listVideosByPage from '@/libs/listVideosByPage';

const logger = log4js.init().getLogger();

async function main() {
  const youtube = await Innertube.create({
    lang: 'ja',
    location: 'JP',
  });

  const gYoutube = await GYoutube.init();

  // Handle CLI arguments
  const args = minimist(process.argv.slice(2));
  switch(args._[0]) {
    default: {
      break;
    }
    case 'add': {
      switch(args._[1]) {
        default: {
          logger.error(`[CLI] unknown command "add ${args._[1]}"`);
          process.exit(1);
        }
        case 'video': {
          const videoIds = args._.slice(2);

          const videos = await gYoutube.videos
            .list({
              part: [
                'id',
                'snippet',
                'liveStreamingDetails',
                'contentDetails',
                'status',
                'statistics',
                'liveStreamingDetails',
                'localizations',
              ],
              id: videoIds,
              hl: 'ja',
            })
            .then(res => {
              return res.data.items || [];
            })
            .catch((err: Error) => {
              logger.error(`[YouTube#videos.list] ${err.message}`);
              throw err;
            });

          const now = Date.now();

          await Promise
            .allSettled(videos.map(async (video) => {
              const videoId = video.id;
              if(!videoId) return null;

              const record: Omit<Video, 'etag' | 'raw'> = {
                provider: 'youtube',
                videoId,
                type: video.liveStreamingDetails ? 'LiveStream' : 'UploadedVideo',
                title: video.snippet?.title || '',
                description: video.snippet?.description || '',
                thumbnails:
                  video.snippet?.thumbnails
                    ? (
                      Object.values(video.snippet.thumbnails)
                        .map(t => ({
                          url: t.url,
                          width: t.width || -1,
                          height: t.height || -1,
                        }))
                    )
                    : [{
                      url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                      width: -1,
                      height: -1,
                    }],
                author: {
                  authorId: video.snippet?.channelId || null,
                  title: video.snippet?.channelTitle || null,
                },
                isInProgressLiveStream:
                  video.liveStreamingDetails && video.liveStreamingDetails.actualStartTime && !video.liveStreamingDetails.actualEndTime
                    ? new Date(video.liveStreamingDetails.actualStartTime).getTime() > now
                    : false,
                isUpcomingLiveStream:
                  video.liveStreamingDetails && !video.liveStreamingDetails.actualStartTime && video.liveStreamingDetails.scheduledStartTime
                    ? new Date(video.liveStreamingDetails.scheduledStartTime).getTime() < now
                    : false,
                videoPublishedAt: video.snippet?.publishedAt || null,
                scheduledStartsAt: video.liveStreamingDetails?.scheduledStartTime || null,
                scheduledEndsAt: video.liveStreamingDetails?.scheduledEndTime || null,
                startedAt: video.liveStreamingDetails?.actualStartTime || null,
                endedAt: video.liveStreamingDetails?.actualEndTime || null,
                client: 'googleapis.youtube.js',
              };
              
              await upsertVideo(record, video)
                .catch((err: Error) => {
                  logger.error(`[upsertVideo] ${err.message}`);
                  throw err;
                });

              return;
            }))
            .then(result => {
              logger.info(`[CLI] ${result.filter(r => r.status === 'fulfilled').length}/${result.length} was fulfilled.`);
            });

          process.exit(0);
        }
      }
    }
  }

  // Register sync-livestream-schedule task
  scheduler.scheduleJob(
    process.env.SYNC_CRON_RULE || process.env.CRON_RULE || '*/30 * * * * *',
    async () => {
      try {
        // fetch live streams from "live" feed
        const liveStreams = await youtube
          .getChannel(process.env.YT_CHANNEL_ID || 'UCSzT-rU62SSiham-g1Dj9yw')
          .then(channel => {
            return channel.getLiveStreams();
          })
          .then(channel => {
            logger.debug(`[Sync Task] Fetched ${channel.videos.length} live streams.`);
            return channel.videos;
          })
          .catch(err => {
            err.message = `[Innertube#channel] ${err.message}`;
            throw err;
          });

        await Promise.allSettled(liveStreams.map(async (video) => {
          try {
            // check Etag (MD5 hash)
            if(!(video instanceof YTNodes.Video)) {
              logger.warn(`[Sync Task] Skipping video "${video.title}": the type "${video.type}" is not acceptable.`);
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
              scheduledStartsAt: video.upcoming?.toISOString() || null,
              scheduledEndsAt: null,
              startedAt: null,
              endedAt: null,
              client: 'youtubei.js',
            };

            await upsertVideo(record, video);

            return;
          }
          catch(err) {
            if(err instanceof Error) {
              logger.error(`[Sync Task] ${err.toString()}`);
            }
            else {
              logger.error('[Sync Task] Unknown error occured.');
            }
            throw err;
          }
        })).then(results => {
          logger.info(`[Sync Task] Successfully processed ${results.filter(r => r.status === 'fulfilled').length}/${results.length}.`);
        });
      }
      catch(err) {
        if(err instanceof Error) {
          logger.error(`[Sync Task] ${err.toString()}`);
        }
        else {
          logger.error('[Sync Task] Unknown error occured.');
        }
      }
    }
  );

  // Register resync-records task
  scheduler.scheduleJob(
    process.env.RESYNC_CRON_RULE || '0 0 0 * * *',
    async () => {
      const tasks = [];

      try {
        // List existing records
        for(let i = 1; true; i++) {
          const targetRecords = await listVideosByPage({ page: i, pageSize: 50 });

          if(targetRecords.length === 0) break;

          // Get latest data
          const videos = await gYoutube.videos
            .list({
              part: [
                'id',
                'snippet',
                'liveStreamingDetails',
                'contentDetails',
                'status',
                'statistics',
                'liveStreamingDetails',
                'localizations',
              ],
              id: targetRecords.map(r => r.attributes.videoId),
              hl: 'ja',
            })
            .then(res => {
              return res.data.items || [];
            })
            .catch((err: Error) => {
              logger.error(`[YouTube#videos.list] ${err.message}`);
              throw err;
            });

          // Update records
          tasks.push(...(videos.map(async (video) => {
            const videoId = video.id;
            if(!videoId) return null;

            const recordId = targetRecords.find(r => r.attributes.videoId === videoId)?.id;
            if(!recordId) return null;

            const now = Date.now();

            const record: Omit<Video, 'etag' | 'raw'> = {
              provider: 'youtube',
              videoId,
              type: video.liveStreamingDetails ? 'LiveStream' : 'UploadedVideo',
              title: video.snippet?.title || '',
              description: video.snippet?.description || '',
              thumbnails:
                video.snippet?.thumbnails
                  ? (
                    Object.values(video.snippet.thumbnails)
                      .map(t => ({
                        url: t.url,
                        width: t.width || -1,
                        height: t.height || -1,
                      }))
                  )
                  : [{
                    url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                    width: -1,
                    height: -1,
                  }],
              author: {
                authorId: video.snippet?.channelId || null,
                title: video.snippet?.channelTitle || null,
              },
              isInProgressLiveStream:
                video.liveStreamingDetails && video.liveStreamingDetails.actualStartTime && !video.liveStreamingDetails.actualEndTime
                  ? new Date(video.liveStreamingDetails.actualStartTime).getTime() > now
                  : false,
              isUpcomingLiveStream:
                video.liveStreamingDetails && !video.liveStreamingDetails.actualStartTime && video.liveStreamingDetails.scheduledStartTime
                  ? new Date(video.liveStreamingDetails.scheduledStartTime).getTime() < now
                  : false,
              videoPublishedAt: video.snippet?.publishedAt || null,
              scheduledStartsAt: video.liveStreamingDetails?.scheduledStartTime || null,
              scheduledEndsAt: video.liveStreamingDetails?.scheduledEndTime || null,
              startedAt: video.liveStreamingDetails?.actualStartTime || null,
              endedAt: video.liveStreamingDetails?.actualEndTime || null,
              client: 'googleapis.youtube.js',
            };

            await upsertVideo(record, video, recordId)
              .catch((err: Error) => {
                logger.error(`[upsertVideo] ${err.message}`);
                throw err;
              });

            return;
           })));
        }

        await Promise.allSettled(tasks)
          .then(result => {
            logger.info(`[Resync Task] ${result.filter(r => r.status === 'fulfilled').length}/${result.length} was fulfilled.`);
          });
      }
      catch(err) {
        if(err instanceof Error) {
          logger.error(`[Resync Task] ${err.toString()}`);
        }
        else {
          logger.error('[Resync Task] Unknown error occured.');
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
