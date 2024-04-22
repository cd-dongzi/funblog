import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  SiteBloggerDto,
  SitePaginationDto,
  SiteImageDto,
  SiteMetaDto,
  SiteUserDto,
  SiteSocialAccountDto,
  SiteCommentDto,
  SiteCommentReviewDto,
  SiteEmailDto,
  SiteAdvanceDto,
  SiteLinkDto,
  SiteLayoutDto,
} from './dto/request.dto';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get('meta')
  getSiteMeta() {
    return this.siteService.getSiteMeta();
  }

  @Post('meta')
  updateSiteMeta(@Body() data: SiteMetaDto) {
    return this.siteService.updateSiteMeta(data);
  }

  @Get('blogger')
  getSiteBlogger() {
    return this.siteService.getSiteBlogger();
  }

  @Post('blogger')
  updateSiteBlogger(@Body() data: SiteBloggerDto) {
    return this.siteService.updateSiteBlogger(data);
  }

  @Get('image')
  getSiteImage() {
    return this.siteService.getSiteImage();
  }

  @Post('image')
  updateSiteImage(@Body() data: SiteImageDto) {
    return this.siteService.updateSiteImage(data);
  }

  @Get('pagination')
  getSitePagination() {
    return this.siteService.getSitePagination();
  }

  @Post('pagination')
  updateSitePagination(@Body() data: SitePaginationDto) {
    return this.siteService.updateSitePagination(data);
  }

  @Get('social_account')
  getSiteSocialAccount() {
    return this.siteService.getSiteSocialAccount();
  }

  @Post('social_account')
  updateSiteSocialAccount(@Body() data: SiteSocialAccountDto) {
    return this.siteService.updateSiteSocialAccount(data);
  }

  @Get('user')
  getSiteUser() {
    return this.siteService.getSiteUser();
  }

  @Post('user')
  updateSiteUser(@Body() data: SiteUserDto) {
    return this.siteService.updateSiteUser(data);
  }

  @Get('comment')
  getSiteComment() {
    return this.siteService.getSiteComment();
  }

  @Post('comment')
  updateSiteComment(@Body() data: SiteCommentDto) {
    return this.siteService.updateSiteComment(data);
  }

  @Get('comment_review')
  getSiteCommentReview() {
    return this.siteService.getSiteCommentReview();
  }

  @Post('comment_review')
  updateSiteCommentReview(@Body() data: SiteCommentReviewDto) {
    return this.siteService.updateSiteCommentReview(data);
  }

  @Get('email')
  getSiteEmail() {
    return this.siteService.getSiteEmail();
  }

  @Post('email')
  updateSiteEmail(@Body() data: SiteEmailDto) {
    return this.siteService.updateSiteEmail(data);
  }

  @Get('advance')
  getSiteAdvance() {
    return this.siteService.getSiteAdvance();
  }

  @Post('advance')
  updateSiteAdvance(@Body() data: SiteAdvanceDto) {
    return this.siteService.updateSiteAdvance(data);
  }

  @Get('link')
  getSiteLink() {
    return this.siteService.getSiteLink();
  }

  @Post('link')
  updateSiteLink(@Body() data: SiteLinkDto) {
    return this.siteService.updateSiteLink(data);
  }

  @Get('layout')
  getSiteLayout() {
    return this.siteService.getSiteLayout();
  }

  @Post('layout')
  updateSiteLayout(@Body() data: SiteLayoutDto) {
    return this.siteService.updateSiteLayout(data);
  }
}
