import * as log4js from '@/logger';
import strapi from '@/strapi';
import scheduler from 'node-schedule';

const logger = log4js.init().getLogger();

async function main() {
  logger.info('[System] Launched.');

  scheduler.scheduleJob(
    process.env.CRON_RULE || '*/30 * * * * *',
    () => {
      const now = new Date();
      logger.debug(`Hello, it's ${now.toLocaleTimeString()} !`);
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
