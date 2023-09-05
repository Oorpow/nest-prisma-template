import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class NeedPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    if (!req.user) return true;

    // 获取访问该接口所需的权限
    const needPermissions = this.reflector.getAllAndOverride<string[]>(
      'need-permissions',
      [context.getClass(), context.getHandler()],
    );

    if (!needPermissions) return true;

    // 访问端点需要的权限：['aaa:read']
    // 我所具备的权限: ['aaa:read', 'aaa:edit']

    for (const p of needPermissions) {
      const hasAuth = req.user.permissions.find((item) => item === p);
      if (!hasAuth) {
        throw new UnauthorizedException('你无权访问');
      }
    }

    // for (const permission of req.user.permissions) {
    //   const hasAuth = needPermissions.includes(permission);

    //   if (!hasAuth) {
    //     throw new UnauthorizedException('你无权访问');
    //   }
    // }

    return true;
  }
}
