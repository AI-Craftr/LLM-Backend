import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CancelMessageDto {
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        message_id: string;
    
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        chat_room_id: string;
}