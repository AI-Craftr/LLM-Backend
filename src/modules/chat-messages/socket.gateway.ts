import { Server, Socket } from 'socket.io';
import { OnModuleInit, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WsCatchAllFilter } from '@src/common/exceptions/ws-catch-all-filter';
import { ChatMessagesService } from './chat-messages.service';
import { SocketConnectionService } from './socket-connection.service';
import { LoggerService } from '../logger/logger.service';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: '*',
  allowedHeaders: ['Authorization', 'fingerprint'],
};

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  cors: corsOptions,
})
export class SocketGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  constructor(
    private logger: LoggerService,
    private connectionService: SocketConnectionService,
    private chatMessagesService: ChatMessagesService,
  ) {}

  handleConnection(socket: Socket): void {
    this.connectionService.handleConnection(socket);
  }

  handleDisconnect(socket: Socket) {    
    this.logger.log(`${socket.id} disconnected!`, SocketGateway.name);
  }

  onModuleInit() {
    this.server.on('connection', socket => {
      console.log(`Connected ${socket.id}`, SocketGateway.name);
    });
  }
}
