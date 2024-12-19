import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJWTUserData } from '../interfaces/jwt.interface';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user: IJWTUserData = req.user;

    return data ? user[data] : user;
  },
);
