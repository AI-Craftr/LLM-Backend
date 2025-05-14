import { StatusEnum } from "@src/common/enums/status.enum";
import { ChatRoom } from "@src/modules/chat-rooms/entities/chat-room.entity";
import { User } from "@src/modules/users/entities/user.entity";

export interface IMessageTempUser {
    user: User;
    status: StatusEnum;
    user_prompt: string;
    fingerprint: string;
    response: string;
    chat_room: string;
    function_name: null;
    resource_url?: string;
}

export interface IMessageAuthenticatedUser {
    _id: string;
    response: string;
    function_name: string | null;
    status: StatusEnum;
    user_prompt: string;
    user: User,
    chat_room: ChatRoom,
    created_at: Date;
    updated_at: Date;
    resource_url?: string;
}

export interface IMessageResponse {
    success: true;
    data: {
        message: IMessageTempUser | IMessageAuthenticatedUser;
    }
}