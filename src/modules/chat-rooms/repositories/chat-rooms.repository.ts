import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../entities/chat-room.entity';

@Injectable()
export class ChatRoomsRepository {
  constructor(@InjectRepository(ChatRoom) private chatRoomEntity: Repository<ChatRoom>) {}
}
