import { CACHE_CLIENT_TAGS } from '@funblog/constants';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { metaData } from 'src/config/metaData';
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
import { SiteConfigType } from './site.interface';
import { AppConfigService } from '../appConfig/appConfig.service';
import { HttpService } from '../http/http.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SiteService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AppConfigService))
    private readonly appConfigService: AppConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getSiteConfigData<T extends Record<string, any>>(type: SiteConfigType) {
    const data = await this.prisma.prisma.siteConfig.findUnique({
      where: {
        type,
      },
    });
    if (!data) {
      return null;
    }
    return data.config as T;
  }

  async updateSiteConfigData(type: SiteConfigType, data: Record<string, any>, cacheTag?: string) {
    const info = await this.getSiteConfigData(type);
    if (!info) {
      await this.prisma.prisma.siteConfig.create({
        data: {
          type,
          config: data,
        },
      });
    } else {
      await this.prisma.prisma.siteConfig.update({
        where: {
          type,
        },
        data: {
          config: data,
        },
      });
    }
    if (metaData.config.meta?.url && cacheTag) {
      await this.httpService.get(`${metaData.config.meta.url}/apis/clear-cache?tag=${cacheTag}`);
    }
  }

  async getSiteMeta() {
    return this.getSiteConfigData<SiteMetaDto>(SiteConfigType.META);
  }

  async updateSiteMeta(data: SiteMetaDto) {
    await this.updateSiteConfigData(SiteConfigType.META, data, CACHE_CLIENT_TAGS.getSiteMeta);
    this.appConfigService.getSiteMetaConfig();
  }

  async getSiteBlogger() {
    return this.getSiteConfigData<SiteBloggerDto>(SiteConfigType.BLOGGER);
  }

  async updateSiteBlogger(data: SiteBloggerDto) {
    await this.updateSiteConfigData(SiteConfigType.BLOGGER, data, CACHE_CLIENT_TAGS.getSiteBlogger);
  }

  async getSiteImage() {
    return this.getSiteConfigData<SiteImageDto>(SiteConfigType.IMAGE);
  }

  async updateSiteImage(data: SiteImageDto) {
    await this.updateSiteConfigData(SiteConfigType.IMAGE, data);
    this.appConfigService.getSiteImageConfig();
  }

  async getSitePagination() {
    return this.getSiteConfigData<SitePaginationDto>(SiteConfigType.PAGINATION);
  }

  async updateSitePagination(data: SitePaginationDto) {
    await this.updateSiteConfigData(SiteConfigType.PAGINATION, data, CACHE_CLIENT_TAGS.getSitePagination);
  }

  async getSiteSocialAccount() {
    return this.getSiteConfigData<SiteSocialAccountDto>(SiteConfigType.SOCIAL_ACCOUNT);
  }

  async updateSiteSocialAccount(data: SiteSocialAccountDto) {
    await this.updateSiteConfigData(SiteConfigType.SOCIAL_ACCOUNT, data, CACHE_CLIENT_TAGS.getSocialAccount);
  }

  async getSiteUser() {
    return this.getSiteConfigData<SiteUserDto>(SiteConfigType.USER);
  }

  async updateSiteUser(data: SiteUserDto) {
    await this.updateSiteConfigData(SiteConfigType.USER, data, CACHE_CLIENT_TAGS.getSiteUsr);
    this.appConfigService.getSiteUserConfig();
  }

  async getSiteComment() {
    return this.getSiteConfigData<SiteCommentDto>(SiteConfigType.COMMENT);
  }

  async updateSiteComment(data: SiteCommentDto) {
    await this.updateSiteConfigData(SiteConfigType.COMMENT, data, CACHE_CLIENT_TAGS.getSiteComment);
    this.appConfigService.getSiteCommentConfig();
  }

  async getSiteCommentReview() {
    return this.getSiteConfigData<SiteCommentReviewDto>(SiteConfigType.COMMENT_REVIEW);
  }

  async updateSiteCommentReview(data: SiteCommentReviewDto) {
    await this.updateSiteConfigData(SiteConfigType.COMMENT_REVIEW, data);
    this.appConfigService.getSiteCommentReviewConfig();
  }

  async getSiteEmail() {
    return this.getSiteConfigData<SiteEmailDto>(SiteConfigType.EMAIL);
  }

  async updateSiteEmail(data: SiteEmailDto) {
    await this.updateSiteConfigData(SiteConfigType.EMAIL, data);
    this.appConfigService.getSiteEmailConfig();
  }

  async getSiteAdvance() {
    return this.getSiteConfigData<SiteAdvanceDto>(SiteConfigType.ADVANCE);
  }

  async updateSiteAdvance(data: SiteAdvanceDto) {
    await this.updateSiteConfigData(SiteConfigType.ADVANCE, data);
  }

  async getSiteLink() {
    return this.getSiteConfigData<SiteLinkDto>(SiteConfigType.LINK);
  }

  async updateSiteLink(data: SiteLinkDto) {
    await this.updateSiteConfigData(SiteConfigType.LINK, data, CACHE_CLIENT_TAGS.getSiteLink);
  }

  async getSiteLayout() {
    return this.getSiteConfigData<SiteLayoutDto>(SiteConfigType.LAYOUT);
  }

  async updateSiteLayout(data: SiteLayoutDto) {
    await this.updateSiteConfigData(SiteConfigType.LAYOUT, data, CACHE_CLIENT_TAGS.getSiteLayout);
  }
}
