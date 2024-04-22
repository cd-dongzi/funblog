import { User } from '@funblog/types';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async login(user: Partial<User>, ip: string) {
    const data = await this.prisma.prisma.user.update({
      data: {
        ip,
      },
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        url: true,
      },
    });
    const token = await this.authService.generateToken(user);
    return {
      token,
      data,
    };
  }

  async userCheck(token: string) {
    try {
      await this.authService.validateToken(token);
      const data = await this.authService.decodeToken(token);
      if (data) {
        const user = await this.prisma.prisma.user.findUnique({
          where: {
            id: data.id,
          },
        });
        if (user) {
          return data.id;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
