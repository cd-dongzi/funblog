import { Injectable } from '@nestjs/common';
import { FALLBACK_PICTURE_TYPE } from 'src/constants';
import { ApiException } from 'src/exceptions/api-exception';
import { deleteMultipleObject } from 'src/utils/cos';
import { getPathWithoutExt, getRealFullPath, removeFiles, renameFiles } from 'src/utils/file';
import { CreateImageDto, ImagePaginationDto, UpdateImageFilenameDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createImageDto: CreateImageDto) {
    await this.prisma.prisma.image.create({
      data: createImageDto,
    });
    return createImageDto.url;
  }

  async findImagePage({ take, skip }: ImagePaginationDto) {
    const [list, total] = await Promise.all([
      this.prisma.prisma.image.findMany({
        take,
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        select: {
          id: true,
          url: true,
        },
      }),
      this.prisma.prisma.image.count(),
    ]);
    return {
      list,
      total,
    };
  }

  async updateFilename(id: number, { filename }: UpdateImageFilenameDto) {
    const has = await this.prisma.prisma.image.findFirst({
      where: {
        filename,
      },
    });
    if (has) {
      throw new ApiException('文件名已存在');
    }
    const file = await this.prisma.prisma.image.findUnique({
      where: {
        id,
      },
    });
    if (!file) {
      return null;
    }
    const [url, originalUrl, thumbnailUrl] = renameFiles(
      [
        getRealFullPath(file.url),
        getRealFullPath(file.originalUrl),
        ...(file?.thumbnailUrl ? [getRealFullPath(file.thumbnailUrl)] : []),
      ],
      filename,
    );
    return this.prisma.prisma.image.update({
      where: {
        id,
      },
      data: {
        filename,
        url,
        originalUrl,
        thumbnailUrl,
      },
    });
  }

  async info(id: number) {
    return this.prisma.prisma.image.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const file = await this.prisma.prisma.image.findUnique({
      where: {
        id,
      },
    });
    if (!file) {
      throw new ApiException('文件不存在');
    }
    // 删除兜底jpg
    removeFiles(
      Array.from(
        new Set([
          file.url,
          file.originalUrl,
          file.thumbnailUrl as string,
          `${getPathWithoutExt(file.url)}.${FALLBACK_PICTURE_TYPE}`,
        ]),
      ).filter((v) => v),
    );
    await deleteMultipleObject([file.url, file.thumbnailUrl]);
    await this.prisma.prisma.image.delete({
      where: {
        id,
      },
    });
  }
}
