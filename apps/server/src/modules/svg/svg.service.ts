import { Svg, SvgScope } from '@funblog/types';
import { Injectable } from '@nestjs/common';
import { CreateSvgDto, UpdateSvgDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SvgService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateSvgDto) {
    return this.prisma.prisma.svg.create({
      data: body,
    });
  }

  async list() {
    return this.prisma.prisma.svg.findMany();
  }

  async getClientList() {
    const list = (await this.prisma.prisma.svg.findMany()) as Svg[];
    return list.filter((item) => {
      return item.scope?.some((v) => v === SvgScope.CLIENT);
    });
  }

  async getAdminList() {
    const list = (await this.prisma.prisma.svg.findMany()) as Svg[];
    return list.filter((item) => {
      return item.scope?.some((v) => v === SvgScope.ADMIN);
    });
  }

  async findOne(id: number) {
    return this.prisma.prisma.svg.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateSvgDto: UpdateSvgDto) {
    await this.prisma.prisma.svg.update({
      where: {
        id,
      },
      data: {
        ...updateSvgDto,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.prisma.svg.delete({
      where: {
        id,
      },
    });
  }
}
