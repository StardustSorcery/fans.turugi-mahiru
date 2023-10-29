import log4js, { Log4js } from 'log4js';

export function init(): Log4js {
  log4js.configure({
    appenders: {
      stdout: {
        type: 'stdout',
      },
    },
    categories: {
      default: {
        appenders: [
          'stdout',
        ],
        level: 'debug',
      },
    }
  });

  return log4js;
};
