import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signToken(payload: any) {
    const accessToken = await this.jwtService.signAsync(
      {
        userId: payload.id,
        username: payload.username,
        roles: payload.roles,
        permissions: payload.permissions,
      },
      {
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        userId: payload.id,
      },
      {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES'),
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
