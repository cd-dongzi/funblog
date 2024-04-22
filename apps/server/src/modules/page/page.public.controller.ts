import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { PageService } from './page.service';

@Public()
@Controller('p/page')
export class PagePublicController {
  constructor(private readonly pageService: PageService) {}

  @Get('list')
  getPageList() {
    return this.pageService.getClientPageList();
  }

  @Get(':alias')
  findOne(@Param('alias') alias: string) {
    return this.pageService.getPageByAlias(alias);
  }

  @Get('menu/navigation/list')
  getPageMenuNavigationList() {
    return this.pageService.getClientPageMenuList({
      type: 'navigation-nav',
    });
  }

  @Get('menu/sub/list')
  getPageMenuSubList() {
    return this.pageService.getClientPageMenuList({
      type: 'sub-nav',
    });
  }
}
