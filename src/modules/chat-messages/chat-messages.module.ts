import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatMessagesController } from './chat-messages.controller';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesRepository } from './chat-messages.repository';
import { SocketConnectionService } from './socket-connection.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { SocketGateway } from './socket.gateway';
import { ChatTogetherAIService } from '../langchain/services/chat-together-ai.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), AuthModule, UsersModule],
  controllers: [ChatMessagesController],
  providers: [ChatMessagesService, ChatMessagesRepository, ChatMessagesRepository, SocketConnectionService, SocketGateway, ChatTogetherAIService],
})
export class ChatMessagesModule {}
