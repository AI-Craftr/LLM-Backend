export type ChatMessageInput = {
    chat_message_id:string;
    chat_room_id:string;
    owner_id:string;
    user_prompt:string;
    response:string;
    status:string;
    resource_url:string;
    created_at:Date;
    updated_at:Date;
}