import { SiteAdvance } from '@funblog/types';
import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '../prisma/prisma.service';
import { SiteConfigType } from '../site/site.interface';

@Injectable()
export class GlobalConfigService {
  constructor() {}
  config = {} as {
    advance?: SiteAdvance;
  };

  async getSiteConfigData<T extends Record<string, any>>(type: SiteConfigType) {
    const data = await prisma.siteConfig.findUnique({
      where: {
        type,
      },
    });
    if (!data) {
      return;
    }
    return data.config as T;
  }

  async getSiteAdvanceConfig() {
    if (this.config.advance) {
      return this.config.advance;
    }
    const siteAdvance = await this.getSiteConfigData<SiteAdvance>(SiteConfigType.ADVANCE);
    this.config.advance = siteAdvance;
    return siteAdvance;
  }
}
