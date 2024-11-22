import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
} from '@nestjs/common';
import { WsBadRequestExeption, WsUnknownExeption } from './ws-exceptions';
import { Socket } from 'socket.io';

export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: Socket = host.switchToWs().getClient();

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();
      const exceptionMessage =
        exceptionData['message'] ?? exceptionData ?? exception.name;

      const wsException = new WsBadRequestExeption(exceptionMessage);
      socket.emit('exception', wsException.getError());
      return;
    }

    const wsException = new WsUnknownExeption(exception.message);
    socket.emit('exception', wsException.getError());
  }
}
