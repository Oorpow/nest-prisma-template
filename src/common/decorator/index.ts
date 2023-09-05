import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

/** 访问端点是否需要登陆 */
export const NeedLogin = () => SetMetadata('need-login', true);

/** 访问端点所需的权限 */
export const NeedPermission = (...permissions: string[]) =>
  SetMetadata('need-permissions', permissions);

/** 获取已登陆用户的信息 */
export const LoggedUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();

    if (data && data in req.user) {
      return req.user[data];
    }
    return req.user;
  },
);
