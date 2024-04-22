import { PageMenuButtonType } from '@funblog/types';
import { Injectable } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api-exception';
import {
  CreatePageDto,
  GetPageMenuDto,
  PageMenuButtonProps,
  QueryPageDto,
  SavePageMenuDto,
  UpdatePageDto,
} from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPageDto: CreatePageDto) {
    return await this.prisma.prisma.page.create({
      data: {
        ...createPageDto,
      },
      select: {
        id: true,
      },
    });
  }

  async findOne(id: number) {
    const data = await this.getPageById(id);
    if (!data) {
      throw new ApiException('文章不存在！');
    }
    return this.prisma.prisma.page.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    const data = await this.getPageById(id);
    if (!data) {
      throw new ApiException('文章不存在！');
    }
    await this.prisma.prisma.page.update({
      where: {
        id,
      },
      data: {
        ...updatePageDto,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.prisma.page.delete({
      where: {
        id,
      },
    });
  }

  async getPageList(query: QueryPageDto) {
    return this.prisma.prisma.page.findMany({
      where: {
        title: {
          contains: query?.keyword || '',
        },
      },
      include: {
        user: true,
      },
    });
  }

  getClientPageList() {
    return this.prisma.prisma.page.findMany({
      select: {
        alias: true,
      },
    });
  }

  async savePageMenu({ type, ...savePageMenuDto }: SavePageMenuDto & { data: Record<string, any>[] }) {
    const data = await this.prisma.prisma.pageMenu.findUnique({
      where: {
        type,
      },
    });
    if (!data) {
      await this.prisma.prisma.pageMenu.create({
        data: {
          ...savePageMenuDto,
          type,
        },
      });
    } else {
      await this.prisma.prisma.pageMenu.update({
        data: {
          ...savePageMenuDto,
        },
        where: {
          type,
        },
      });
    }
  }

  formatMenuList(list: PageMenuButtonProps[] = []) {
    return list.map((item) => {
      if (item.buttonType === PageMenuButtonType.CATEGORY) {
        item.url = `/category/${item.value}`;
      } else if (item.buttonType === PageMenuButtonType.TAG) {
        item.url = `/tag/${item.value}`;
      } else if (item.buttonType === PageMenuButtonType.PAGE) {
        item.url = `/${item.value}`;
      }
      return {
        ...item,
        children: item.children ? this.formatMenuList(item.children) : item.children,
      };
    });
  }

  async getPageMenuList(query: GetPageMenuDto) {
    const res = await this.prisma.prisma.pageMenu.findUnique({
      where: {
        type: query.type,
      },
    });
    if (res) {
      res.data = this.formatMenuList(res.data as any) as any;
    }
    return res;
  }

  async getClientPageMenuList(query: GetPageMenuDto) {
    const res = await this.prisma.prisma.pageMenu.findUnique({
      where: {
        type: query.type,
      },
      select: {
        data: true,
      },
    });
    return this.formatMenuList(res?.data as any);
  }

  getPageById(id: number) {
    return this.prisma.prisma.page.findUnique({
      where: {
        id,
      },
    });
  }

  getPageByAlias(alias: string) {
    return this.prisma.prisma.page.findUnique({
      where: {
        alias,
      },
    });
  }
}
