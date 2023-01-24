import fs from 'fs';
import path from 'path';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import SlackHook, { SlackMessage } from 'winston-slack-webhook-transport';

import config from '@configs/config';

const consoleTransport = new winston.transports.Console();
const transports: any[] = [consoleTransport];

if (config.LOGGER_PATH.length && !config.isTest) {
  const LOGGER_PATH = config.LOGGER_PATH;

  if (!fs.existsSync(LOGGER_PATH)) {
    fs.mkdirSync(LOGGER_PATH);
  }
  const rotateTransport = new WinstonDaily({
    filename: path.resolve(LOGGER_PATH, 'api-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '15d',
  });
  transports.push(rotateTransport);
}


if (config.LOGGER_SLACK_WEBHOOK_URL.length && !config.isTest) {
  const slackFormatter = (
    log: SlackHook.TransformableInfo,
  ): false | SlackMessage => ({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\`${JSON.stringify(log, null, 2)}\`\`\``,
        },
      },
    ],
  });
  const slackTransport = new SlackHook({
    webhookUrl: config.LOGGER_SLACK_WEBHOOK_URL,
    formatter: slackFormatter,
    mrkdwn: true,
    level: config.LOGGER_SLACK_LOG_LEVEL,
  });
  transports.push(slackTransport);
}

const logger = winston.createLogger({
  level: config.LOGGER_LOG_LEVEL || 'warning',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.metadata(),
    winston.format.json({ space: 2 }),
  ),
  transports: transports,
});


const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
