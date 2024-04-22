import { Body, Controller, Delete, Get, Param, Patch, Query, Post } from '@nestjs/common';
import { CreateLinkDto, UpdateLinkDto, QueryLinkDto } from './dto/request.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get('list')
  findAll(@Query() query: QueryLinkDto) {
    return this.linkService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
