import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { TagService } from './tag.service';

@Public()
@Controller('p/tag')
export class TagPublicController {
  constructor(private readonly tagService: TagService) {}

  @Get('list')
  findAll() {
    return this.tagService.findAll();
  }
}
