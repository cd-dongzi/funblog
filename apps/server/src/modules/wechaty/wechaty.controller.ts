import { Controller } from '@nestjs/common';
// import { Response } from 'express';
import { Public } from 'src/decorators/public';
import { WechatyService } from './wechaty.service';

@Public()
@Controller('wechaty')
export class WechatyController {
  constructor(private readonly wechatyService: WechatyService) {}

  // @Get('login')
  // login(@Res() res: Response) {
  //   return this.wechatyService.login(res);
  // }

  // @Get('logout')
  // logout(@Res() res: Response) {
  //   return this.wechatyService.logout(res);
  // }

  // @Get('logged-in')
  // IsLoggedIn() {
  //   return this.wechatyService.IsLoggedIn();
  // }

  // @Get('say')
  // say() {
  //   return this.wechatyService.say();
  // }
}
