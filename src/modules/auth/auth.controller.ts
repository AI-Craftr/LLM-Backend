import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { TransformInterceptor } from '@src/common/interceptors/transform.interceptor';
import { ApiSignup } from './docs/signup.doc';
import { LoggerService } from '../logger/logger.service';
import { LoginDto } from './dtos/login.dto';
import { ApiLogin } from './docs/login.doc';
import { Public } from '@src/common/decorators';

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
  public signup(@Body() signupDto: SignupDto) {
    this.logger.log('Called signup', AuthController.name);
    return this.authService.signup(signupDto);
  }

  @Public()
  @ApiLogin()
  @Post('login')
  public login(@Body() loginDto: LoginDto) {
    this.logger.log('Called login', AuthController.name);
    return this.authService.login(loginDto);
  }
}
