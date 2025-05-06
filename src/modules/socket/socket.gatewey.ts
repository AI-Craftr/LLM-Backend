import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { LoggerService } from "../logger/logger.service";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { ConnectionService } from "./service/connection.service";
import { ChatMessageService } from "./service/chat_message.service";
import { SocketKeys } from "@src/common/constants/socket.keys";
import { CreateMessageDto } from "../chat-messages/dtos/create-message.dto";

const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Authorization', 'fingerprint'],
    methods: ['GET', 'POST'],
};

@WebSocketGateway({
    cors: corsOptions
})
export class SocketGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    public server: Server;

    constructor(
        private readonly logger: LoggerService,
        private readonly connectionService: ConnectionService,
        private readonly chatMessageService: ChatMessageService,
    ) { }

    onModuleInit() {
        this.server.on("connection", (socket) => {
            this.logger.log(`client connected: ${socket.id}, ${SocketGateway.name}`);
        })
    }

    handleConnection(socket: Socket) {
        const { sockets } = this.server.sockets;
        this.connectionService.handleConnection(socket);
        console.log(sockets.size, "online user");

    }

    handleDisconnect(socket: Socket) {
        this.logger.log(`${socket.id} disconnected!`, SocketGateway.name);
    }

    @SubscribeMessage(SocketKeys.CREATE_MESSAGE)
    async sendMessage(@ConnectedSocket() socket: Socket, @MessageBody() data: CreateMessageDto) {
        try {            
            return await this.chatMessageService.createMessage(data, socket);
        } catch (error) {
            console.log(error);
        }
    }
}