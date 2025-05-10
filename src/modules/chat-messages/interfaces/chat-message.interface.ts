import { StatusEnum } from "@src/common/enums/status.enum";

export interface CreateMessageInput {
    chat_room_id: string;
    user_id: string;
    user_prompt: string;
    response?: string;
    status: StatusEnum;
    resource_url?: string;
}