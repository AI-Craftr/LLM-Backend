import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { IConfig } from './interfaces/config.interface';

export const config = (): IConfig => {
  const public_key = readFileSync(
    join(resolve(), 'src', 'modules', 'auth', 'jwt', 'keys/public.key'),
    'utf-8',
  );
  const private_key = readFileSync(
    join(resolve(), 'src', 'modules', 'auth', 'jwt', 'keys/private.key'),
    'utf-8',
  );

  return {
    app_id: process.env.APP_ID,
    app_port: parseInt(process.env.APP_PORT),
    app_url: process.env.APP_URL,
    app_mode: process.env.NODE_ENV,
    is_test: process.env.NODE_ENV === 'test',
    is_production: process.env.NODE_ENV === 'production',
    is_development: process.env.NODE_ENV === 'development',
    app_domain: process.env.APP_DOMAIN,
    doc_path: process.env.DOC_PATH,
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
    db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      type: process.env.DB_TYPE,
      name_test: process.env.DB_NAME_TEST,
      name_development: process.env.DB_NAME_DEVELOPMENT,
      name_production: process.env.DB_NAME_PRODUCTION,
    },
    jwt: {
      access: {
        private_key,
        public_key,
        time: parseInt(process.env.JWT_ACCESS_TIME, 10),
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        time: parseInt(process.env.JWT_REFRESH_TIME, 10),
      },
      reset_password: {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
        time: parseInt(process.env.JWT_RESET_PASSWORD_TIME, 10),
      },
      confirmation: {
        secret: process.env.JWT_CONFIRMATION_SECRET,
        time: parseInt(process.env.JWT_CONFIRMATION_TIME, 10),
      },
    },
    // elasticsearch: {
    //   node: process.env.ELASTICSEARCH_NODE,
    //   api_key: process.env.ELASTICSEARCH_API_KEY,
    // },
  };
};
