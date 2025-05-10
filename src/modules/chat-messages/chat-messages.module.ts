import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatMessagesController } from './chat-messages.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ChatMessageRepository } from './chat-messages.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), AuthModule, UsersModule],
  controllers: [ChatMessagesController],
  providers: [ChatMessageRepository],
  exports: [ChatMessageRepository]
})
export class ChatMessagesModule {}
