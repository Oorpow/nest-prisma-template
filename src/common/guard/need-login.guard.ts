import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface JwtUserData {
  userId: number;
  username: string;
  roles: string[];
  permissions: string[];
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

/** 验证是否登录的守卫 */
@Injectable()
export class NeedLoginGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const needLogin = this.reflector.getAllAndOverride('need-login', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!needLogin) return true;

    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization;
      const data = this.jwtService.verify<JwtUserData>(token);

      req.user = {
        userId: data.userId,
        username: data.username,
        roles: data.roles,
        permissions: data.permissions,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('token失效, 请重新登陆');
    }
  }
}
