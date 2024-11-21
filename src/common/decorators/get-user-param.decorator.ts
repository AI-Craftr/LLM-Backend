import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (keyname: keyof any, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const user: any = req.user;
    return keyname ? user[keyname] : user;
  },
);
