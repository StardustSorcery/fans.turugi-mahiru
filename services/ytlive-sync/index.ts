import * as log4js from '@/logger';
import strapi from '@/strapi';

const logger = log4js.init().getLogger();

async function main() {
  logger.debug('Hello!');
  const privacy = await strapi.find('privacy');
  logger.debug(JSON.stringify(privacy.data));
}

async function shutdown(code: number) {
  logger.info('shutting down...');

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

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGQUIT', shutdown);
