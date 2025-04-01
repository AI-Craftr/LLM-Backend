import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Server config
  APP_ID: Joi.string().uuid({ version: 'uuidv4' }).required(),
  APP_PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  APP_DOMAIN: Joi.string().required(),
  DOC_PATH: Joi.string().required(),
  APP_URL: Joi.string().uri().required(),

  // Database config
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_TYPE: Joi.string().required(),
  DB_NAME_TEST: Joi.string().optional(),
  DB_NAME_DEVELOPMENT: Joi.string().optional(),
  DB_NAME_PRODUCTION: Joi.string().optional(),

  // JWT config
  JWT_ACCESS_TIME: Joi.number().required(),
  JWT_CONFIRMATION_SECRET: Joi.string().required(),
  JWT_CONFIRMATION_TIME: Joi.number().required(),
  JWT_RESET_PASSWORD_SECRET: Joi.string().required(),
  JWT_RESET_PASSWORD_TIME: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_TIME: Joi.number().required(),

  // Elasticsearch
  // ELASTICSEARCH_NODE: Joi.string().required(),
  // ELASTICSEARCH_API_KEY: Joi.string().required(),
});
