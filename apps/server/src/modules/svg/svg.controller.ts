import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSvgDto, UpdateSvgDto } from './dto/request.dto';
import { SvgService } from './svg.service';

@Controller('svg')
export class SvgController {
  constructor(private readonly svgService: SvgService) {}
  @Post()
  create(@Body() createSvgDto: CreateSvgDto) {
    return this.svgService.create(createSvgDto);
  }

  @Get('list')
  list() {
    return this.svgService.list();
  }

  @Get('list/client')
  clientList() {
    return this.svgService.getClientList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSvgDto: UpdateSvgDto) {
    return this.svgService.update(+id, updateSvgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svgService.remove(+id);
  }
}
