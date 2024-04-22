import { TOKEN_KEY } from '@funblog/constants';
import { Body, Controller, Headers, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public';
import { ApiException } from 'src/exceptions/api-exception';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';
import { UserAuthService } from './user-auth.service';
import { GlobalConfigService } from '../globalConfig/globalConfig.service';

@Controller('')
export class UserAuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly globalConfigService: GlobalConfigService,
  ) {}

  getTopDomain(request: Request) {
    const forwardedHost = request.headers['x-forwarded-host'];
    let host = request.headers.host;
    if (Array.isArray(forwardedHost)) {
      host = forwardedHost[0];
    } else if (forwardedHost) {
      host = forwardedHost;
    }
    const topHost = host?.split('.').slice(-2).join('.');
    const topHostWithoutPort = topHost?.split(':')[0];
    return topHostWithoutPort;
  }

  getTokenConfig(req: Request) {
    const day = Number(this.globalConfigService.config.advance?.tokenExpiresIn || 3);
    return {
      domain: this.getTopDomain(req),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * day),
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    if (user?.admin !== 1) {
      throw new ApiException('此账号无登录权限！');
    }
    const { token } = await this.userAuthService.login(user, req.ip);
    res.cookie(TOKEN_KEY, token, this.getTokenConfig(req));
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sid = req.cookies[TOKEN_KEY];
    if (sid) {
      res.clearCookie(TOKEN_KEY, {
        domain: this.getTopDomain(req),
      });
    }
  }

  @Public()
  @Post('user-check')
  userCheck(@Headers('authorization') token: string, @Body() body) {
    token = (token || '').replace('Bearer ', '');
    if (body?.token) {
      token = body.token;
    }
    return this.userAuthService.userCheck(token);
  }

  @Post('user-login')
  @UseGuards(LocalAuthGuard)
  @Public()
  async userLogin(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { token, data } = await this.userAuthService.login(req.user, req.ip);
    res.cookie(TOKEN_KEY, token, this.getTokenConfig(req));
    return data;
  }
}
