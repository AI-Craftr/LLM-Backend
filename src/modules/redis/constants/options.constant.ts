import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from '@src/modules/logger/logger.service';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService, logger: LoggerService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
      },
      password: configService.get<string>('redis.password'),
    });

    const redisClient = store.getClient();

    redisClient.on('connect', () => {
      logger.log('✅ —> Connected to Redis');
    });

    redisClient.on('ready', () => {
      logger.log('✅ —> Redis is ready to use');
    });

    redisClient.on('error', err => {
      logger.error('❌ —> Redis Error:', err.message);
    });

    redisClient.on('end', () => {
      logger.log('❌ —> Redis disconnected!');
    });

    return {
      store: () => store,
    };
  },
  inject: [ConfigService, LoggerService],
};
