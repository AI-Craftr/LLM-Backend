import { Injectable } from '@nestjs/common';
import { ChatRoomsRepository } from './repositories/chat-rooms.repository';
import { ShareLinksRepository } from './repositories/share-links.repository';

@Injectable()
export class ChatRoomsService {
  constructor(
    private chatRoomsRepository: ChatRoomsRepository,
    private shareLinksRepository: ShareLinksRepository,
  ) {}
}
