import { IJwt } from './jwt.interface';
import { IEmailConfig } from './email-config.interface';
import { IElasticSearch } from './elasticsearch.interface';
import { RedisConfig } from './redis.interface';
import { IDatabaseConfig } from './database.interface';

export interface IConfig {
  readonly app_id: string;
  readonly app_url: string;
  readonly app_port: number;
  readonly db: IDatabaseConfig;
  readonly app_domain: string;
  readonly redis: RedisConfig;
  readonly doc_path: string;
  readonly app_mode: string;
  readonly is_test: boolean;
  readonly is_development: boolean;
  readonly is_production: boolean;
  readonly jwt: IJwt;
  readonly elasticsearch: IElasticSearch;
}
