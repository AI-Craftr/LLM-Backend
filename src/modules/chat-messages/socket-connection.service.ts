import { Socket } from 'socket.io';
import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../auth/jwt/jwt.service';
import { UsersRepository } from '../users/users.repository';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';
import { TokenTypeEnum } from '../auth/jwt/enums/token-type.enum';
import { SocketKeys } from './constants/socket.keys';

@Injectable()
export class SocketConnectionService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) { }

  async handleConnection(client: Socket) {
    try {
      const authorization = client.handshake.headers['authorization'];
      const fingerprintId = client.handshake.headers['fingerprint'] as string;

      if (!fingerprintId) {
        throw new UnauthorizedException(ResponseMessages.PLEASE_SET_FINGERPRINT_ID_IN_HEADER);
      }

      if (!authorization) {
        this.handleTemporaryUser(client, fingerprintId);
        return;
      }

      await this.handleAuthenticatedUser(client, authorization);
    } catch (err) {
      this.handleError(client, err);
    }
  }

  private handleTemporaryUser(client: Socket, fingerprintId: string) {
    client.join(fingerprintId);
    client.data.is_guest_mode = true;
    client.data.fingerprint_id = fingerprintId;
  }

  private async handleAuthenticatedUser(client: Socket, authorization: string) {
    client.data.is_guest_mode = false;
    const token = this.extractToken(authorization);

    const { user_id } = await this.jwtService.verifyToken(token, TokenTypeEnum.ACCESS);
    const user = await this.usersRepository.findOneBy({ user_id });

    if (!user) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }

    client.data.user_id = user.user_id;
    this.connectedClients.set(client.id, client);

    client.on('disconnect', () => {
      this.connectedClients.delete(client.id);
    });
  }

  private extractToken(authorization: string): string {
    return authorization.split(' ')[1];
  }

  private handleError(client: Socket, error: any) {
    const errorMessage = error.response.message;

    const unauthorizedException = new UnauthorizedException(errorMessage);
    this.disconnect(client, unauthorizedException);
  }

  private disconnect(socket: Socket, error: any) {
    socket.emit(SocketKeys.ERROR, error.response);
    socket.disconnect();
    socket.rooms.clear();
  }
}