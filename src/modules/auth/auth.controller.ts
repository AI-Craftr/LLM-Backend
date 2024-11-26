import { Request } from 'express';
import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { TransformInterceptor } from '@src/common/interceptors/transform.interceptor';
import { ApiSignup } from './docs/signup.doc';
import { LoggerService } from '../logger/logger.service';
import { LoginDto } from './dtos/login.dto';
import { ApiLogin } from './docs/login.doc';
import { Public } from '@src/common/decorators';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: LoggerService,
  ) {}

  @Public()
  @ApiSignup()
  @Post('signup')
  public signup(@Body() signupDto: SignupDto): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log('Called signup', AuthController.name);
    return this.authService.signup(signupDto);
  }

  @Public()
  @ApiLogin()
  @Post('login')
  public login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log('Called login', AuthController.name);
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  public refreshToken(
    @Body() { refresh_token }: RefreshTokenDto,
    @Req() req: Request,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    this.logger.log('Called refresh token', AuthController.name);
    return this.authService.refreshToken(refresh_token, req.headers.origin);
  }
}
