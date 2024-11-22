import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { config } from '@src/config/index.config';
import { validationSchema } from '@src/config/schema/config.schema';
import { LoggerModule } from '../logger/logger.module';
import typeorm from '@src/config/database/typeorm.config';
import { Database } from '@src/config/database/database.module';
import { CommonModule } from '@src/common/common.module';
import { RedisModule } from '../redis/redis.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, typeorm],
      validationSchema,
    }),
    Database,
    CommonModule,
    LoggerModule,
    RedisModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
