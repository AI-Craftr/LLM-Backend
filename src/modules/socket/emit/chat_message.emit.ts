import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { SocketKeys } from "@src/common/constants/socket.keys";
import { SocketGateway } from "../socket.gatewey";

@Injectable()
export class ChatMessageEmit {
    constructor(
        @Inject(forwardRef(() => SocketGateway)) private chatGateway: SocketGateway
    ) { }

    public createMessage(room: string, event: SocketKeys, response: any) {
        this.chatGateway.server.to(room).emit(event, response);
    }

    public cancelMessage(room: string, response: any) {
        this.chatGateway.server.to(room).emit(SocketKeys.CANCEL_MESSAGE, response);
    }
}