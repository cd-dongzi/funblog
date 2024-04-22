import { Comment, CommentStatus, CommentType } from '@funblog/types';
import { Injectable } from '@nestjs/common';
import { metaData } from 'src/config/metaData';
import { ApiException } from 'src/exceptions/api-exception';
import {
  GetCommentPageDto,
  CreateCommentDto,
  CommentPaginationDto,
  GetCommentCountByPath,
  UpdateCommentDto,
} from './dto/request.dto';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async getCommentPage({ take, skip, path }: GetCommentPageDto) {
    const where = {
      path,
      parentId: null,
      status: CommentStatus.APPROVED,
    };
    const [list, total] = await Promise.all([
      this.prisma.prisma.comment.findMany({
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
          createdAt: true,
          content: true,
          parentId: true,
          user: {
            select: {
              username: true,
              url: true,
              avatar: true,
            },
          },
          children: {
            where: {
              status: CommentStatus.APPROVED,
            },
            select: {
              id: true,
              createdAt: true,
              content: true,
              parentId: true,
              user: {
                select: {
                  username: true,
                  url: true,
                  avatar: true,
                },
              },
              replierUser: {
                select: {
                  username: true,
                  url: true,
                  avatar: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.prisma.comment.count({ where }),
    ]);
    return {
      list,
      total,
    };
  }

  async createComment(data: CreateCommentDto, userId: number) {
    const { comment, commentReview } = metaData.config;
    if (commentReview?.forbiddenKeywords) {
      const words = commentReview.forbiddenKeywords.split(',');
      const bol = words.some((word) => data.content.includes(word));
      if (bol) {
        throw new ApiException('评论内容包含不被允许的敏感词');
      }
    }
    let status = CommentStatus.PENDING;
    const words = commentReview?.forceReviewKeywords?.split(',').filter((v) => !!v.trim());
    // 包含需要审核的词
    if (words && words.length > 0 && words.some((word) => data.content.includes(word))) {
      status = CommentStatus.PENDING;
    } else {
      // 人工审核
      if (!comment?.review) {
        status = CommentStatus.APPROVED;
      }
      // 已批可直通
      if (comment?.approvedPass) {
        const res = await this.prisma.prisma.comment.findFirst({
          where: {
            userId,
            status: CommentStatus.APPROVED,
          },
        });
        if (res) {
          status = CommentStatus.APPROVED;
        }
      }
    }
    const res = await this.prisma.prisma.comment.create({
      data: { ...data, status, userId },
      include: {
        post: true,
        page: true,
        user: true,
        parent: true,
        replierUser: true,
      },
    });
    this.sendEmail(res as any);
    return res.status;
  }

  getTitle(info: Partial<Comment>) {
    const text = info.post
      ? info.post.title
      : info.page
      ? info.page.title
      : info.type === CommentType.MESSAGE_BOARD
      ? '留言板'
      : '';
    return text ? `「${text}」` : '';
  }

  getUrl(info: Partial<Comment>) {
    const { meta } = metaData.config;
    let url = info.post
      ? `/post/${info.post.id}#comment-container`
      : info.page
      ? `/page/${info.page.id}#comment-container`
      : '';
    url = `${meta?.url}${url}`;
    if (info.status === CommentStatus.PENDING) {
      url = `${meta?.adminUrl}/comment`;
    }
    return url;
  }

  async sendEmail(res: Partial<Comment>) {
    const { comment, email } = metaData.config;
    // 非回复，给管理员发送邮件
    if (!res.parentId && comment?.notifyAfterComment) {
      let name = '留言提醒';
      const subject = `👉 叮咚！${this.getTitle(res)}上有人给您留言啦`;
      if (res.status === CommentStatus.PENDING) {
        name = `${name}：待批准`;
      }
      if (email?.email && res.user?.username && res.content) {
        this.emailService.send({
          name,
          to: email.email,
          subject,
          html: this.emailService.createCommentMailTemplate({
            title: '新的留言',
            username: res.user.username,
            content: res.content,
            url: this.getUrl(res),
          }),
        });
      }
    }

    if (res.parentId) {
      this.emailService.send({
        name: '留言提醒',
        subject: `👉 叮咚！${this.getTitle(res)}上有人对您的留言进行回复啦`,
        to: res.replierUser!.email!,
        html: this.emailService.createReplyCommentMailTemplate({
          title: this.getTitle(res),
          content: res.parent!.content,
          replyContent: res.content!,
          replyUsername: res.user!.username,
          username: res.replierUser!.username,
          url: this.getUrl(res),
        }),
      });
    }
  }

  async findPage({ take, skip, parentId }: CommentPaginationDto) {
    const [list, total] = await Promise.all([
      this.prisma.prisma.comment.findMany({
        take,
        skip,
        where: {
          parentId,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        include: {
          user: true,
          replierUser: true,
          post: true,
          page: true,
          children: {
            include: {
              user: true,
              replierUser: true,
            },
          },
        },
      }),
      this.prisma.prisma.comment.count(),
    ]);
    return {
      list,
      total,
    };
  }

  updateStatus(id: number, body: UpdateCommentDto) {
    return this.prisma.prisma.comment.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
  }

  getCommentCountByPath(query: GetCommentCountByPath) {
    return this.prisma.prisma.comment.count({
      where: {
        path: query.path,
        parentId: null,
        status: CommentStatus.APPROVED,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  count() {
    return this.prisma.prisma.comment.count();
  }
}
