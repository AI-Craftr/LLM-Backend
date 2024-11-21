import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { RedisOptions } from './constants/options.constant';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
