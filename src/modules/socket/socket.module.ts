import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gatewey";
import { ChatMessageService } from "./service/chat_message.service";
import { ConnectionService } from "./service/connection.service";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { AgentsService } from "./service/agents.service";
import { ChatRoomsModule } from "../chat-rooms/chat-rooms.module";
import { ChatMessagesModule } from "../chat-messages/chat-messages.module";

@Module({
    imports: [
        AuthModule, 
        UsersModule,
        ChatRoomsModule,
        ChatMessagesModule,
    ],
    controllers: [],
    providers: [
        SocketGateway, 
        ChatMessageService,
        ConnectionService,
        AgentsService
    ]
})

export class SocketModule { }