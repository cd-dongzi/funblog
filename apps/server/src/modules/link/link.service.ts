import { LinkStatus } from '@funblog/types';
import { Injectable } from '@nestjs/common';
import { CreateLinkDto, QueryLinkDto, UpdateLinkDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateLinkDto) {
    return this.prisma.prisma.link.create({
      data: body,
    });
  }

  async list() {
    const list = await this.prisma.prisma.link.findMany({
      where: {
        visible: true,
        status: LinkStatus.APPROVED,
      },
    });
    const obj = list.reduce((obj, item) => {
      if (obj[item.type]) {
        obj[item.type].push(item);
      } else {
        obj[item.type] = [item];
      }
      return obj;
    }, {});
    return Object.keys(obj).map((key) => {
      return {
        type: key,
        list: obj[key],
      };
    });
  }

  async findAll(query?: QueryLinkDto) {
    return this.prisma.prisma.link.findMany({
      where: {
        title: {
          contains: query?.keyword || '',
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.prisma.link.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    await this.prisma.prisma.link.update({
      where: {
        id,
      },
      data: {
        ...updateLinkDto,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.prisma.link.delete({
      where: {
        id,
      },
    });
  }
}
