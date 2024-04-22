import { Injectable } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api-exception';
import { PostPaginationDto, CreatePostDto, UpdatePostDto, PostSearchPaginationDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../shared/bcrypt.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  appendTagsAndCategories({ tags, categories, ...data }: CreatePostDto | UpdatePostDto) {
    let _data: Record<'tags' | 'categories', any> = { ...data } as any;
    if (tags) {
      _data = {
        ..._data,
        tags: {
          connect: tags.map((id) => ({ id })),
        },
      };
    }
    if (categories) {
      _data = {
        ..._data,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      };
    }
    return _data;
  }

  async hashPwd<T extends CreatePostDto | UpdatePostDto>(data: T) {
    if (data.password) {
      data.password = await this.bcryptService.hash(data.password);
    }
    return data;
  }

  async create(createPostDto: CreatePostDto) {
    return await this.prisma.prisma.post.create({
      data: {
        ...createPostDto,
        ...this.appendTagsAndCategories(createPostDto),
      },
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return this.prisma.prisma.post.findMany({
      include: {
        tags: true,
        categories: true,
      },
    });
  }

  async findPage(
    { take, skip, ...query }: PostPaginationDto,
    { where: inputWhere } = {} as { where?: Record<string, any> },
  ) {
    const where = {
      AND: {
        ...inputWhere,
        title: query.title,
        summary: query.summary,
        content: query.content,
        tags: query.tags?.length
          ? {
              some: {
                OR: [
                  {
                    id: {
                      in: query.tags?.map((v) => +v).filter((v) => v),
                    },
                  },
                  {
                    alias: {
                      in: query.tags,
                    },
                  },
                ],
              },
            }
          : {},
        categories: query.categories?.length
          ? {
              some: {
                OR: [
                  {
                    id: {
                      in: query.categories?.map((v) => +v).filter((v) => v),
                    },
                  },
                  {
                    alias: {
                      in: query.categories,
                    },
                  },
                ],
              },
            }
          : {},
      },
    };
    const [list, total] = await Promise.all([
      this.prisma.prisma.post.findMany({
        take,
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        where,
        select: {
          id: true,
          title: true,
          alias: true,
          cover: true,
          tags: true,
          categories: true,
          visible: true,
          _count: {
            select: {
              userLikes: true,
              userReads: true,
              userComments: true,
            },
          },
          user: true,
        },
      }),
      this.prisma.prisma.post.count({ where }),
    ]);
    return {
      list: list.map(({ _count, ...item }) => ({
        ...item,
        likeCount: _count.userLikes,
        readCount: _count.userReads,
        commentCount: _count.userComments,
      })),
      total,
    };
  }

  async findSearchPage({ take, skip, ...query }: PostSearchPaginationDto) {
    let where = {};
    const keyword = query.keyword;
    if (keyword) {
      where = {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            summary: {
              contains: keyword,
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: keyword,
                },
              },
            },
          },
          {
            categories: {
              some: {
                name: {
                  contains: keyword,
                },
              },
            },
          },
        ],
      };
    }
    const [list, total] = await Promise.all([
      this.prisma.prisma.post.findMany({
        take,
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        where,
        select: {
          id: true,
          title: true,
          alias: true,
          cover: true,
          tags: true,
          categories: true,
          visible: true,
          _count: {
            select: {
              userLikes: true,
              userReads: true,
              userComments: true,
            },
          },
          user: true,
        },
      }),
      this.prisma.prisma.post.count({ where }),
    ]);
    return {
      list: list.map(({ _count, ...item }) => ({
        ...item,
        likeCount: _count.userLikes,
        readCount: _count.userReads,
        commentCount: _count.userComments,
      })),
      total,
    };
  }

  async findOne(id: number) {
    const data = await this.getPostById(id);
    if (!data) {
      throw new ApiException('文章不存在！');
    }
    const info = await this.prisma.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          select: {
            id: true,
          },
        },
        categories: {
          select: {
            id: true,
          },
        },
      },
    });
    return {
      ...info,
      tags: info?.tags.map((item) => item.id),
      categories: info?.categories.map((item) => item.id),
    };
  }

  async findOneById(id: number) {
    const info = await this.prisma.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            userLikes: true,
            userReads: true,
            userComments: true,
          },
        },
      },
    });
    if (!info) {
      return info;
    }
    const { _count, ...rest } = info;
    return {
      ...rest,
      likeCount: _count.userLikes,
      readCount: _count.userReads,
      commentCount: _count.userComments,
      tags: info.tags,
      categories: info.categories,
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const data = await this.getPostById(id);
    if (!data) {
      throw new ApiException('文章不存在！');
    }
    await this.prisma.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
        ...this.appendTagsAndCategories(updatePostDto),
      },
    });
  }

  async getRelationInfo(id: number) {
    const info = await this.prisma.prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        _count: {
          select: {
            userLikes: true,
            userReads: true,
            userComments: true,
          },
        },
      },
    });
    return {
      likeCount: info?._count.userLikes,
      readCount: info?._count.userReads,
    };
  }

  async updateReadNum(
    id: number,
    {
      userId,
      ip,
    }: {
      userId?: string;
      ip: string;
    },
  ) {
    const _userId = userId ? +userId : null;
    await this.prisma.prisma.userRead.create({
      data: {
        postId: id,
        ip,
        ...(userId ? { userId: _userId } : {}),
      },
    });
  }

  async checkLikeStatus(id: number, { userId, ip }: { userId?: string; ip: string }) {
    const res = await this.prisma.prisma.userLike.findFirst({
      where: {
        postId: id,
        ...(userId ? { userId: +userId } : { ip }),
      },
    });
    // 游客， 同一个ip地址
    if (!userId && res?.userId) {
      return false;
    }
    return !!res;
  }

  async updateLikeNum(
    id: number,
    {
      userId,
      ip,
    }: {
      userId?: string;
      ip: string;
    },
  ) {
    const _userId = userId ? +userId : null;
    await this.prisma.prisma.userLike.create({
      data: {
        postId: id,
        ip,
        ...(userId ? { userId: _userId } : {}),
      },
    });
  }

  getLatestList() {
    return this.prisma.prisma.post.findMany({
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getPopularList() {
    return this.prisma.prisma.post.findMany({
      take: 4,
      orderBy: {
        userLikes: {
          _count: 'desc',
        },
      },
      include: {
        userLikes: true,
        userComments: true,
        userReads: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.prisma.post.delete({
      where: {
        id,
      },
    });
  }

  count() {
    return this.prisma.prisma.post.count();
  }

  getPostById(id: number) {
    return this.prisma.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  getPostByAlias(alias: string) {
    return this.prisma.prisma.post.findUnique({
      where: {
        alias,
      },
    });
  }
}
