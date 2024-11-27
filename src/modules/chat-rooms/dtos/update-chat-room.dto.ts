import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateChatRoomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
