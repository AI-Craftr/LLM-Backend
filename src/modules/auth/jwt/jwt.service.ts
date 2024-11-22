import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService as _JwtService } from '@nestjs/jwt';

import { CommonService } from '../../../common/common.service';

import { IAccessToken, IAccessPayload } from './interfaces/access-token.interface';
import { IRefreshToken, IRefreshPayload } from './interfaces/refresh-token.interface';
import { TokenTypeEnum } from './enums/token-type.enum';
import { IJwt } from '../../../config/interfaces/jwt.interface';
import { IEmailToken } from './interfaces/email-token.interface';
import { User } from '@src/modules/users/entities/user.entity';

@Injectable()
export class JwtService {
  private readonly jwtConfig: IJwt;
  private readonly issuer: string;
  private readonly domain: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {
    this.issuer = this.configService.get<string>('app_id');
    this.jwtConfig = this.configService.get<IJwt>('jwt');
    this.domain = this.configService.get<string>('app_domain');
  }

  private static async generateTokenAsync(
    payload: IAccessPayload | IRefreshPayload,
    secret: string,
    options: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, rejects) => {
      jwt.sign(payload, secret, options, (error, token) => {
        if (error) {
          rejects(error);
          return;
        }
        resolve(token);
      });
    });
  }

  private static async verifyTokenAsync<T>(token: string, secret: string, options: jwt.VerifyOptions): Promise<T> {
    return new Promise((resolve, rejects) => {
      jwt.verify(token, secret, options, (error, payload: T) => {
        if (error) {
          rejects(error);
          return;
        }
        resolve(payload);
      });
    });
  }

  private static async throwBadRequest<T extends IAccessToken | IRefreshToken | IEmailToken>(
    promise: Promise<T>,
  ): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new BadRequestException('Token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async generateToken(
    user: User,
    tokenType: TokenTypeEnum,
    domain?: string | null,
    tokenId?: string,
  ): Promise<string> {
    const jwtOptions: jwt.SignOptions = {
      issuer: this.issuer,
      subject: user.user_id,
      audience: domain ?? this.domain,
      algorithm: 'HS256',
    };
    switch (tokenType) {
      case TokenTypeEnum.ACCESS:
        const { private_key, time: accessTime } = this.jwtConfig.access;
        return this.commonService.throwInternalError(
          JwtService.generateTokenAsync({ user_id: user.user_id }, private_key, {
            ...jwtOptions,
            expiresIn: accessTime,
            algorithm: 'RS256',
          }),
        );
      case TokenTypeEnum.REFRESH:
        const { secret: refreshSecret, time: refreshTime } = this.jwtConfig.refresh;
        return this.commonService.throwInternalError(
          JwtService.generateTokenAsync(
            {
              user_id: user.user_id,
              tokenId: tokenId ?? v4(),
            },
            refreshSecret,
            {
              ...jwtOptions,
              expiresIn: refreshTime,
            },
          ),
        );
      case TokenTypeEnum.CONFIRMATION:
      case TokenTypeEnum.RESET_PASSWORD:
        const { secret, time } = this.jwtConfig[tokenType];
        return this.commonService.throwInternalError(
          JwtService.generateTokenAsync({ user_id: user.user_id }, secret, {
            ...jwtOptions,
            expiresIn: time,
          }),
        );
    }
  }

  public async verifyToken<T extends IAccessToken | IRefreshToken>(
    token: string,
    tokenType: TokenTypeEnum,
  ): Promise<T> {
    const jwtOptions: jwt.VerifyOptions = {
      issuer: this.issuer,
      audience: new RegExp(this.domain),
    };

    switch (tokenType) {
      case TokenTypeEnum.ACCESS:
        const { public_key, time: accessTime } = this.jwtConfig.access;
        return JwtService.throwBadRequest(
          JwtService.verifyTokenAsync(token, public_key, {
            ...jwtOptions,
            maxAge: accessTime,
            algorithms: ['RS256'],
          }),
        );
      case TokenTypeEnum.REFRESH:
      case TokenTypeEnum.CONFIRMATION:
      case TokenTypeEnum.RESET_PASSWORD:
        const { secret, time } = this.jwtConfig[tokenType];
        return JwtService.throwBadRequest(
          JwtService.verifyTokenAsync(token, secret, {
            ...jwtOptions,
            maxAge: time,
            algorithms: ['HS256'],
          }),
        );
    }
  }

  public async generateAuthTokens(user: User, domain?: string, tokenId?: string): Promise<[string, string]> {
    return Promise.all([
      this.generateToken(user, TokenTypeEnum.ACCESS, domain, tokenId),
      this.generateToken(user, TokenTypeEnum.REFRESH, domain, tokenId),
    ]);
  }
}
