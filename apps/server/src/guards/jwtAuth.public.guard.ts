import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiException, ResponseStatusEnum } from 'src/exceptions/api-exception';

@Injectable()
export class JwtAuthPublicGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err) {
      throw err || new ApiException('暂无权限访问', ResponseStatusEnum.FORBIDDEN);
    }
    if (!user) {
      return undefined;
      // throw new ApiException('请先进行登录', ResponseStatusEnum.FORBIDDEN);
    }
    return user;
  }
}
