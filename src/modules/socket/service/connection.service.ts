import { Socket } from "socket.io";
import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ResponseMessages } from "@src/common/constants/response-messages.constant";
import { TokenTypeEnum } from "@src/modules/auth/jwt/enums/token-type.enum";
import { SocketKeys } from "@src/modules/chat-messages/constants/socket.keys";
import { UsersRepository } from "@src/modules/users/users.repository";
import { JwtService } from "@src/modules/auth/jwt/jwt.service";

@Injectable()
export class ConnectionService {
    private readonly connectedClients: Map<string, Socket> = new Map();

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UsersRepository,
    ) { }

    public async handleConnection(client: Socket) {
        try {
            const authorization = client.handshake.headers['authorization'];
            const fingerprintId = client.handshake.headers['fingerprint'] as string;

            if (!fingerprintId) {
                throw new UnauthorizedException(ResponseMessages.PLEASE_SET_FINGERPRINT_ID_IN_HEADER);
            }

            if (!authorization) {
                this.handleGuestUser(client, fingerprintId);
                return;
            }

            await this.handleAuthenticatedUser(client, authorization);
        } catch (error) {
            this.handleError(client, error);
        }
    }

    private handleGuestUser(client: Socket, fingerprintId: string) {
        client.join(fingerprintId);
        client.data.isTemporaryUser = true;
        client.data.fingerprintId = fingerprintId;
    }

    private async handleAuthenticatedUser(client: Socket, authorization: string) {
        client.data.isTemporaryUser = false;
        const token = this.extractToken(authorization);

        const { user_id } = await this.jwtService.verifyToken(token, TokenTypeEnum.ACCESS);
        const user = await this.userRepository.findOneBy({ user_id });

        if (!user) {
            throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
        }

        client.data.userId = user.user_id;
        this.connectedClients.set(client.id, client);

        client.on('disconnect', () => {
            this.connectedClients.delete(client.id);
        });
    }

    private extractToken(authorization: string): string {
        return authorization.split(' ')[1];
    }

    private handleError(client: Socket, error: any) {
        const unauthorizedException = new UnauthorizedException();
        this.disconnect(client, unauthorizedException);
    }

    private disconnect(socket: Socket, error: HttpException) {
        socket.emit(SocketKeys.ERROR, error);
        socket.disconnect();
        socket.rooms.clear();
    }
}