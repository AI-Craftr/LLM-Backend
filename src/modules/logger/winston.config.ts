import { config } from 'dotenv';
import * as winston from 'winston';

config();

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, context, trace }) => {
        return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
      }),
    ),
  }),
];

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
});
