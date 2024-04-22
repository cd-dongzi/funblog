import { Injectable } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto, BatchRemoveTagDto, QueryTagDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTagDto: CreateTagDto) {
    await this.prisma.prisma.tag.create({
      data: {
        ...createTagDto,
      },
    });
  }

  async findAll(query?: QueryTagDto) {
    return this.prisma.prisma.tag.findMany({
      where: {
        name: {
          contains: query?.keyword || '',
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.prisma.tag.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.prisma.prisma.tag.update({
      where: {
        id,
      },
      data: {
        ...updateTagDto,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.prisma.tag.delete({
      where: {
        id,
      },
    });
  }

  async batchRemove(data: BatchRemoveTagDto) {
    const { ids } = data;
    await this.prisma.prisma.tag.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
