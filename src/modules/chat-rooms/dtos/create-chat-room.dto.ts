import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateChatRoomDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title: string;
}
