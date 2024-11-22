import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatMessagesRepository {
  constructor(@InjectRepository(ChatMessage) private chatMessageEntity: Repository<ChatMessage>) {}
}
