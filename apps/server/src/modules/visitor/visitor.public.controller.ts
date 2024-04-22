import { Controller, Get } from '@nestjs/common';

import { Public } from 'src/decorators/public';
import { VisitorService } from './visitor.service';

@Public()
@Controller('p/visitor')
export class VisitorPublicController {
  constructor(private readonly visitorService: VisitorService) {}
  @Get('count')
  count() {
    return this.visitorService.count();
  }
}
