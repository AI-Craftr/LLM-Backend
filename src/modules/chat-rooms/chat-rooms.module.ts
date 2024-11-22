import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { ShareLink } from './entities/share-link.entity';
import { ChatRoomsController } from './chat-rooms.controller';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsRepository } from './repositories/chat-rooms.repository';
import { ShareLinksRepository } from './repositories/share-links.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, ShareLink])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService, ChatRoomsRepository, ShareLinksRepository],
})
export class ChatRoomsModule {}
