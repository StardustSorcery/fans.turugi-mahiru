import * as log4js from '@/libs/logger';
import strapi from '@/libs/strapi';
import scheduler from 'node-schedule';
import { Ranking, RankingUserVoting, StrapiResponseData } from 'types/strapi';

const logger = log4js.init().getLogger();

async function main() {
  // Register aggregation task
  scheduler.scheduleJob(
    process.env.CRON_RULE || '0 0 2 * * *',
    async () => {
      try {
        const scores: {
          [key: number]: number;
        } = {};

        for(let i = 1; true; i++) {
          const votings = await strapi
            .find<StrapiResponseData<RankingUserVoting>[]>(
              'ranking-user-votings',
              {
                populate: [
                  'videos',
                ],
                pagination: {
                  page: i,
                  pageSize: 100,
                  withCount: false,
                },
              }
            )
            .then(res => {
              return res.data;
            });
          if(votings.length === 0) break;
          logger.debug(`[Aggregate Task] Fetched ${votings.length} user votings.`);

          for(const voting of votings) {
            logger.debug(`[Aggregate Task] Processing voting id "${voting.id}" by uid "${voting.attributes.uid}".`);
            voting.attributes.videos.data.forEach((video, index) => {
              if(!scores[video.id]) scores[video.id] = 0;
              scores[video.id] += 5 - index;
            });
          }
        }

        const ranking = Object.keys(scores)
          .map(id => ({
            videoEntryId: Number(id),
            score: scores[Number(id)],
          }))
          .sort((a, b) => b.score - a.score);

        const now = new Date();
      
        const insertedRecord = await strapi
          .create<StrapiResponseData<Ranking>>(
            'rankings',
            {
              aggregatedAt: now.toISOString(),
              scoredVideos: ranking
                .map(r => ({
                  score: r.score,
                  video: {
                    set: [ r.videoEntryId ],
                  },
                })),
            }
          )
          .then(res => {
            return res.data;
          });
        logger.info(`[Aggregate Task] Completed aggregating. Created ranking id is ${insertedRecord.id}.`);

        return;
      }
      catch(err) {
        if(err instanceof Error) {
          logger.error(`[Aggregate Task] ${err.toString()}`);
        }
        else if(typeof err === 'object') {
          logger.error(`[Aggregate Task] ${JSON.stringify(err)}`);
        }
        else {
          logger.error('[Aggregate Task] Unknown error occured.');
        }
      }
    }
  )
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
  else if(typeof err === 'object') {
    logger.error(`[System] ${JSON.stringify(err)}`);
  }
  else {
    logger.error('[System] Unknown error occured.');
  }

  shutdown(1);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
process.on('SIGQUIT', () => shutdown(0));
