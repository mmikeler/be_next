import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: {},
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: './src/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './src/logs/combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

//
// Replaces the previous transports with those in the
// new configuration wholesale.
//

// logger.configure({
//   level: 'info',
//   transports: [
//     new DailyRotateFile(opts)
//   ]
// });