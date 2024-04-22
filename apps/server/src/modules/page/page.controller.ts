import { Controller, Post, Body, Query, Get, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreatePageDto, GetPageMenuDto, QueryPageDto, SavePageMenuDto, UpdatePageDto } from './dto/request.dto';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  create(@Body() createPostDto: CreatePageDto, @Req() req) {
    return this.pageService.create({
      ...createPostDto,
      userId: req.user.id,
    });
  }

  @Get('list')
  getPageList(@Query() query: QueryPageDto) {
    return this.pageService.getPageList(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePageDto) {
    return this.pageService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }

  @Post('menu/save')
  savePageMenu(@Body() savePageMenuDto: SavePageMenuDto) {
    return this.pageService.savePageMenu(savePageMenuDto);
  }

  @Get('menu/list')
  getPageMenuList(@Query() getPageMenuDto: GetPageMenuDto) {
    return this.pageService.getPageMenuList(getPageMenuDto);
  }
}
