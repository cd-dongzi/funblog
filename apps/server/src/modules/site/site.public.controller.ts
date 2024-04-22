import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { SiteService } from './site.service';

@Controller('p/site')
@Public()
export class SitePublicController {
  constructor(private readonly siteService: SiteService) {}
  @Get('meta')
  getSiteMeta() {
    return this.siteService.getSiteMeta();
  }

  @Get('blogger')
  getSiteBlogger() {
    return this.siteService.getSiteBlogger();
  }

  @Get('pagination')
  getSitePagination() {
    return this.siteService.getSitePagination();
  }

  @Get('social_account')
  getSiteSocialAccount() {
    return this.siteService.getSiteSocialAccount();
  }

  @Get('user')
  getSiteUser() {
    return this.siteService.getSiteUser();
  }

  @Get('comment')
  getSiteComment() {
    return this.siteService.getSiteComment();
  }

  @Get('link')
  getSiteLink() {
    return this.siteService.getSiteLink();
  }

  @Get('layout')
  getSiteLayout() {
    return this.siteService.getSiteLayout();
  }
}
