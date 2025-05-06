import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_prompt: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    chat_room_id?: string;
}