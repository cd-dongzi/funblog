import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from 'src/constants';
import { ApiException, ResponseStatusEnum } from 'src/exceptions/api-exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (!user) {
      throw new ApiException('请先进行登录', ResponseStatusEnum.FORBIDDEN);
    }
    if (err) {
      throw err || new ApiException('暂无权限访问', ResponseStatusEnum.FORBIDDEN);
    }
    return user;
  }
}
