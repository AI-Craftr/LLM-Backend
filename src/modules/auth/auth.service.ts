import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UsersRepository } from '@src/modules/users/users.repository';
import { SignupDto } from './dtos/signup.dto';
import { JwtService } from './jwt/jwt.service';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  public async signup(
    signupDto: SignupDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const duplicatedEmail = await this.usersRepository.findOneBy({
      email: signupDto.email,
    });

    if (duplicatedEmail) {
      throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }

    const user = await this.usersRepository.create({
      email: signupDto.email,
      full_name: signupDto.full_name,
      password_hash: signupDto.password,
    });

    const [accessToken, refreshToken] =
      await this.jwtService.generateAuthTokens(user);

    return { accessToken, refreshToken };
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersRepository.findOneBy({
      email: loginDto.email,
    });

    if (!user) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const isMatch: boolean = await user.comparePassword(loginDto.password);

    if (!isMatch) {
      throw new BadRequestException(ResponseMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const [accessToken, refreshToken] =
      await this.jwtService.generateAuthTokens(user);

    return { accessToken, refreshToken };
  }
}
