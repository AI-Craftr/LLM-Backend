import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from '@src/common/guards/auth.guard';
import { config } from '@src/config/index.config';
import typeorm from '@src/config/database/typeorm.config';
import { validationSchema } from '@src/config/schema/config.schema';
import { LoggerModule } from '../logger/logger.module';
import { Database } from '@src/config/database/database.module';
import { CommonModule } from '@src/common/common.module';
import { RedisModule } from '../redis/redis.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ChatRoomsModule } from '../chat-rooms/chat-rooms.module';
import { ChatMessagesModule } from '../chat-messages/chat-messages.module';
import { LangchainMoule } from '../langchain/langchain.module';

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
    ChatRoomsModule,
    ChatMessagesModule,
    LangchainMoule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
