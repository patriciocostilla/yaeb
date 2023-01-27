import dotenv from 'dotenv';
import { cleanEnv, num, str, url } from 'envalid';
dotenv.config();

const config = cleanEnv(process.env, {
  // Node Environment
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    default: 'production',
  }),
  // Optional
  PORT: num({ default: 3000 }),
  LOGGER_PATH: str({ default: '' }),
  LOGGER_LOG_LEVEL: str({
    choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'],
    default: 'info',
  }),
  LOGGER_SLACK_WEBHOOK_URL: url({ default: '' }),
  LOGGER_SLACK_LOG_LEVEL: str({
    choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'],
    default: 'info',
  }),
  LOGGER_LOKI_URL: url({ default: '' }),
  LOGGER_LOKI_USERNAME: str({ default: '' }),
  LOGGER_LOKI_PASSWORD: str({ default: '' }),
  SWAGGER_TITLE: str({ default: 'REST API' }),
  SWAGGER_DESCRIPTION: str({ default: 'Express Boilerplate' }),
  npm_package_version: str({ default: '1.0.0' }),
});

if (config.isDevelopment) console.log(config);

export default config;
