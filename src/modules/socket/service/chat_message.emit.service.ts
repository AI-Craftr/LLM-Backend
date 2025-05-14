import { Injectable } from "@nestjs/common";
import { IMessageAuthenticatedUser, IMessageResponse, IMessageTempUser } from "../interfaces/message-response.interface";
import { SocketKeys } from "@src/common/constants/socket.keys";
import { ChatMessageEmit } from "../emit/chat_message.emit";

@Injectable()
export class ChatMessageEmitService {
    constructor(
        private readonly chatMessageEmit: ChatMessageEmit
    ) { }

    public emitMessage(socketRoom: string, message: (IMessageTempUser | IMessageAuthenticatedUser) | Error): void {
        let response: IMessageResponse | Error;

        if (message instanceof Error) response = message;
        else response = { success: true, data: { message }};
        
        this.chatMessageEmit.createMessage(socketRoom, SocketKeys.RECEIVE_MESSAGE, response);
    }
}