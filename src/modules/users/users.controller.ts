import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { GetUser } from '@src/common/decorators';
import { LoggerService } from '../logger/logger.service';
import { UsersService } from './users.service';
import { ApiGetMe } from './docs/get-me.doc';

@Controller('users')
export class UsersController {
  constructor(
    private logger: LoggerService,
    private usersService: UsersService,
  ) {}

  @ApiGetMe()
  @Get('@me')
  public getMe(@GetUser('user_id') userId: string) {
    this.logger.log('Called get me', UsersController.name);
    return this.usersService.getMe(userId);
  }
}
