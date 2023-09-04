import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RedisService } from 'src/redis/redis.service';
import { RegisterUserDto, UserLoginDto } from './dto';
import { md5Password } from 'src/utils/index';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const { username, password } = userLoginDto;

    const existUser = await this.prisma.user.findUnique({
      where: {
        username,
        isAdmin: false,
      },
    });
    if (!existUser) {
      throw new BadRequestException('用户不存在');
    }
    if (md5Password(password) !== existUser.password) {
      throw new BadRequestException('密码错误');
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const { username, password, captcha, email, nickname } = registerUserDto;

    const redisCaptcha = await this.redisService.get(`captcha_${email}`);
    if (!redisCaptcha) {
      throw new BadRequestException('验证码已失效，请重新获取');
    }
    if (captcha !== redisCaptcha) {
      throw new BadRequestException('验证码错误');
    }

    const existUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existUser) {
      throw new BadRequestException('用户已存在');
    }

    return this.prisma.user
      .create({
        data: {
          username,
          password: md5Password(password),
          email,
          nickname,
        },
      })
      .then(() => {
        return '用户注册成功';
      })
      .catch((err) => {
        throw new BadRequestException('用户创建失败');
      });
  }

  async findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
