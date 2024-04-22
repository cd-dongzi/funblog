import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { CreateLinkDto } from './dto/request.dto';
import { LinkService } from './link.service';

@Public()
@Controller('p/link')
export class LinkPublicController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() body: CreateLinkDto) {
    return this.linkService.create(body);
  }

  @Get('list')
  list() {
    return this.linkService.list();
  }
}
