import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto, UserLoginDto } from './dto';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';

import {
  LoggedUser,
  NeedLogin,
  NeedPermission,
} from 'src/common/decorator/index';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
    private readonly authService: AuthService,
  ) {}

  @Get('register-captcha')
  async getRegisterCaptcha(@Query('email') email: string) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${email}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: email,
      subject: '注册验证码',
      html: `<span>验证码是${code}</span>`,
    });
    return '验证码发送成功';
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const vo = await this.userService.login(userLoginDto);
    const { accessToken, refreshToken } = await this.authService.signToken(
      vo.userInfo,
    );
    vo.accessToken = accessToken;
    vo.refreshToken = refreshToken;
    return vo;
  }

  @Get('refresh')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.authService.verifyToken(refreshToken);
      const user = await this.userService.findOneById(data.userId);
      return this.authService.signToken(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    // return this.userService.findAll({});
  }

  @NeedLogin()
  @NeedPermission('访问bbb')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @LoggedUser() user) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const params = {
      data: updateUserDto,
      where: { id },
    };

    // return this.userService.update(params);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // return this.userService.delete({ id });
  }
}
