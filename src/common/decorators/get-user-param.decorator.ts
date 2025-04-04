import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@src/modules/users/entities/user.entity';

export const GetUser = createParamDecorator((keyname: keyof User, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const user: User = req.user;
  return keyname ? user[keyname] : user;
});
