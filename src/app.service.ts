import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { md5Password } from './utils';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async initData() {
    await this.prisma.user.create({
      data: {
        username: 'user2',
        password: md5Password('123123'),
        email: '1875555513@qq.com',
        isAdmin: false,
        roles: {
          create: [
            {
              role: {
                create: {
                  name: 'user',
                  permissions: {
                    create: [
                      {
                        permission: {
                          create: {
                            name: '访问bbb',
                            desc: '',
                          },
                        },
                      },
                      {
                        permission: {
                          create: {
                            name: '编辑bbb',
                            desc: '',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    });
  }
}
