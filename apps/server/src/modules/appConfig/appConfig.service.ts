import { SiteComment, SiteImage, SiteCommentReview, SiteEmail, SiteMeta, SiteUser } from '@funblog/types';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MetaDataConfig, updateMetaDataConfig } from 'src/config/metaData';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { SiteConfigType } from '../site/site.interface';
import { SiteService } from '../site/site.service';

@Injectable()
export class AppConfigService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => SiteService)) private readonly siteService: SiteService,
    private readonly emailService: EmailService,
  ) {
    this.getSiteMetaConfig();
    this.getSiteImageConfig();
    this.getSiteCommentConfig();
    this.getSiteCommentReviewConfig();
    this.getSiteEmailConfig();
    this.getSiteUserConfig();
  }

  async getSiteConfigData<T extends Record<string, any>>(type: SiteConfigType) {
    const data = await this.prisma.prisma.siteConfig.findUnique({
      where: {
        type,
      },
    });
    if (!data) {
      return;
    }
    return data.config as T;
  }

  updateMetaDataConfig(data: Partial<MetaDataConfig>) {
    updateMetaDataConfig(data);
    this.emailService.update();
  }

  async getSiteMetaConfig() {
    const meta = await this.getSiteConfigData<SiteMeta>(SiteConfigType.META);
    this.updateMetaDataConfig({ meta });
  }

  async getSiteImageConfig() {
    const image = await this.getSiteConfigData<SiteImage>(SiteConfigType.IMAGE);
    this.updateMetaDataConfig({ image });
  }

  async getSiteCommentConfig() {
    const comment = await this.getSiteConfigData<SiteComment>(SiteConfigType.COMMENT);
    this.updateMetaDataConfig({ comment });
  }

  async getSiteCommentReviewConfig() {
    const commentReview = await this.getSiteConfigData<SiteCommentReview>(SiteConfigType.COMMENT_REVIEW);
    this.updateMetaDataConfig({ commentReview });
  }

  async getSiteEmailConfig() {
    const email = await this.getSiteConfigData<SiteEmail>(SiteConfigType.EMAIL);
    this.updateMetaDataConfig({ email });
  }

  async getSiteUserConfig() {
    const user = await this.getSiteConfigData<SiteUser>(SiteConfigType.USER);
    this.updateMetaDataConfig({ user });
  }
}
