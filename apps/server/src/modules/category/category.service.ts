import { Injectable } from '@nestjs/common';
import { BatchRemoveCategoryDto, CreateCategoryDto, QueryCategoryDto, UpdateCategoryDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    await this.prisma.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  async findAll(query?: QueryCategoryDto) {
    return this.prisma.prisma.category.findMany({
      where: {
        name: {
          contains: query?.keyword,
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.prisma.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async batchRemove(data: BatchRemoveCategoryDto) {
    const { ids } = data;
    await this.prisma.prisma.category.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
