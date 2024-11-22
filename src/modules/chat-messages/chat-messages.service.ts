import { Injectable } from '@nestjs/common';
import { ChatMessagesRepository } from './chat-messages.repository';

@Injectable()
export class ChatMessagesService {
  constructor(private chatMessagesRepository: ChatMessagesRepository) {}
}
