import { User } from '@funblog/types';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiException } from 'src/exceptions/api-exception';
import { BcryptService } from '../shared/bcrypt.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bctyptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(emailOrUsername: string, password: string) {
    const user = await this.userService.getUserByEmailOrUsername(emailOrUsername);
    if (!user) {
      throw new ApiException('用户不存在！');
    }
    if (!user.password) {
      throw new ApiException('用户未设置密码！');
    }
    if (!(await this.bctyptService.compare(password, user.password))) {
      throw new ApiException('密码错误!');
    }
    if (user.status === 2) {
      throw new ApiException('用户已被禁用，请联系管理员');
    }
    return user;
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token, {
      json: true,
    });
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token);
  }

  async generateToken(user: Partial<User>) {
    return this.jwtService.sign({
      id: user.id,
    });
  }

  async logout() {
    return true;
  }
}
