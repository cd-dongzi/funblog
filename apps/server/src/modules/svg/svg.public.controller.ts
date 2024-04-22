import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { CreateSvgDto } from './dto/request.dto';
import { SvgService } from './svg.service';

@Public()
@Controller('p/svg')
export class SvgPublicController {
  constructor(private readonly svgService: SvgService) {}

  @Post()
  create(@Body() body: CreateSvgDto) {
    return this.svgService.create(body);
  }

  @Get('list')
  list() {
    return this.svgService.getClientList();
  }

  @Get('list/admin')
  adminList() {
    return this.svgService.getAdminList();
  }
}
