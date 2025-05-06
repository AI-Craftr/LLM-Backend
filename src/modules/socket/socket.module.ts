import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gatewey";
import { ChatMessageService } from "./service/chat_message.service";
import { ConnectionService } from "./service/connection.service";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { AgentsService } from "./service/agents.service";

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [],
    providers: [SocketGateway, ChatMessageService, ConnectionService, AgentsService]
})

export class SocketModule { }