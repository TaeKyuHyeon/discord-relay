'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');

const config = require('../../config');
const moment = require('moment');
const configWinston = winston.config;
/**
 * <h3>Logger level</h3>
 * <code>
 * logger.error('Error : 0');
 * logger.warn('Warn : 1');
 * logger.info('Info : 2');
 * logger.verbose('Verbose : 3');
 * logger.debug('Debug : 4');
 * logger.silly('Silly : 5');
 * </code>
 */

 const timeStamp = () => moment().format('YYYY-MM-DD HH:mm:ss');
 const formatter = (options) => {
  return '[' + options.timestamp() + '] [' +
    configWinston.colorize(options.level, options.level.toUpperCase()) + '] ' +
    (options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
}

const logFileTransport = {
  colorize: true,
  level: config.server.logger,
  showLevel: true,
  timestamp: timeStamp,
  formatter: formatter,
  filename: `./log/discord-relay.%DATE%.log`,
  datePattern: `YYYY-MM-DD-HHmm`,
  zippedArche: true,
  maxFiles: `7d`,
  frequency: '1m' //‘#m’ or ‘#h’ e.g., ‘5m’ or ‘3h’.  
};

const exceptionLogFileTransport = {
  timestamp: timeStamp,
  formatter: formatter,
  handleExceptions: true,
  filename: `./log/exception/discord-relay-exception.log`
};

const mainLogTransform = new (winston.transports.DailyRotateFile)(logFileTransport);

const logger =winston.createLogger({
  transports: [
    mainLogTransform
  ],
  exceptionHandlers: [
    new (winston.transports.File)(exceptionLogFileTransport)
  ],
  rejectionHandlers: [
    new (winston.transports.File)(exceptionLogFileTransport)
  ]
});

if (process.env.NODE_ENV !== 'prd') {
  const consoleTransport = {
    colorize: true,
    level: 'debug',
    showLevel: true,
    timestamp: timeStamp,
    formatter: formatter
  };

  logger.add(new winston.transports.Console(consoleTransport));
}

class Logger {
  
  constructor(inputModule) {
    this.filename = inputModule.filename.split('/').slice(-1).join('/');
  }

  error(msg) {
    logger.error('[' + this.findFileInfo() + '] ' + msg);
  }

  warn(msg) {
    logger.warn('[' + this.findFileInfo() + '] ' + msg);
  }

  info(msg) {
    logger.info('[' + this.findFileInfo() + '] ' + msg);
  }

  verbose(msg) {
    logger.verbose('[' + this.findFileInfo() + '] ' + msg);
  }

  debug(msg) {
    logger.debug('[' + this.findFileInfo() + '] ' + msg);
  }

  silly(msg) {
    logger.silly('[' + this.findFileInfo() + '] ' + msg);
  }

  findFileInfo() {
    const s = (new Error()).stack;
    let subs;
    let ret = this.filename;
    if (!s) {
      return ret;
    }
    try {
      subs = s.split('\n');
      for (const es of subs) {
        if (es.match(this.filename)) {
          ret = es.split('/').slice(-3).join('/');
          ret = ret.replace(')', '');
          break;
        }
      }
    }
    catch (e) {
      // nothing
    }
    return ret;
  }
}

module.exports = Logger;
