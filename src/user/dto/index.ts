import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(5, { message: '密码长度不能少于5位' })
  password: string;

  @IsOptional()
  nickname: string;

  @IsNotEmpty({ message: '邮箱地址不能为空' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  captcha: string;
}

export class UserLoginDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
