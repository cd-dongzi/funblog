import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { EmailService } from './email.service';

@Public()
@Controller('email')
export class EmailController {
  constructor(private readonly commentService: EmailService) {}
  @Get('test')
  test() {
    return this.commentService.test();
  }
}
