import fs from 'fs';
import path from 'path';
import { CommentStatus, CommentType, LinkType, LinkStatus } from '@funblog/types';
import { checkStr, randomInteger } from '@funblog/utils';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { BlogModel } from './models/blog';
import { BlogCommentModel } from './models/blogComment';
import { BlogLikeModel } from './models/blogLike';
import { BlogTagModel } from './models/blogTag';
import { CommentModel } from './models/comment';
import { LinkModel } from './models/link';
import { UserModel } from './models/user';
import { VisitorModel } from './models/visitor';
import { prisma } from '../prisma/prisma.service';

export const LINK_LIST = [
  { value: LinkType.PERSONAL_BLOG, label: '个人博客', alias: '小伙伴们', showClient: true },
  { value: LinkType.WEBSITE_COMMUNITY, label: '网站社区', showClient: true },
  { value: LinkType.PERSONAL_ONLINE, label: '个人在线' },
  { value: LinkType.PERSONAL_RECOMMENDATION, label: '个人引荐' },
  { value: LinkType.RESOURCE_MATERIALS, label: '资源素材' },
];

const TagObj = {
  算法: {
    old: '算法',
    new: 'algorithm',
  },
  Webpack: {
    old: 'Webpack',
    new: 'webpack',
  },
  MongoDB: {
    old: 'MongoDB',
    new: 'mongodb',
  },
  Node: {
    old: 'NodeJs',
    new: 'nodejs',
  },
  React: {
    old: 'React',
    new: 'react',
  },
  Vue: {
    old: 'Vue',
    new: 'vue',
  },
  JavaScript: {
    old: 'JavaScript',
    new: 'javascript',
  },
  HTML: {
    old: 'HTML',
    new: 'html',
  },
  CSS: {
    old: 'CSS',
    new: 'css',
  },
  TypeScript: {
    old: 'TypeScript',
    new: 'typescript',
  },
  Canvas: {
    old: 'Canvas',
    new: 'canvas',
  },
  源码解读: {
    old: '源码解读',
    new: 'code-analysis',
  },
};

@Injectable()
export class MongodbService {
  constructor() {}

  init() {
    const port = process.env.NODE_ENV === 'development' ? 27017 : 27018;
    const opts =
      process.env.NODE_ENV === 'development'
        ? {}
        : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            auth: {
              user: 'dzblog',
              password: 'dzblog549527.',
            },
            authSource: 'admin',
          };
    mongoose
      .connect(`mongodb://localhost:${port}/dzblog`, opts)
      .then(() => {
        console.log('数据库连接成功！');
      })
      .catch((err) => {
        console.log('数据库连接失败 err！', err);
      });
  }

  async test() {
    // return 'test';
    // return await BlogCommentModel.find({
    //   articleId: '5ade11309ca41104aa1b6d6e'
    // })
    return await UserModel.find({
      name: 'Wintermelon',
    });
  }

  async start() {
    // 开始同步标签
    console.log('开始同步标签');
    await this.tag();
    console.log('开始同步文章');
    await this.post();
    console.log('开始同步用户');
    await this.user();
    console.log('开始同步评论');
    await this.comment();
    console.log('开始同步文章评论');
    await this.blogComment();
    console.log('开始同步点赞');
    await this.like();
    console.log('开始同步访客');
    await this.visitor();
    console.log('开始同步友链');
    await this.link();
    console.log('同步完毕');

    // await this.tag();
    // await this.post();
    // await this.user();
    // await this.comment();
    // await this.like();
    // await this.visitor();
    // await this.link();
    // return 'start';
  }

  async syncComment() {
    console.log('开始同步评论');
    await this.comment();
    console.log('开始同步文章评论');
    await this.blogComment();
    console.log('开始同步点赞');
    await this.like();
    console.log('开始同步文章阅读');
    await this.read();
    console.log('同步完毕');
  }

  async read() {
    const blogs = await BlogModel.find();
    let likeIps = (
      await prisma.userLike.findMany({
        select: {
          ip: true,
        },
      })
    ).map((item) => item.ip);
    likeIps = Array.from(new Set(likeIps));
    for (const blog of blogs) {
      const post = await prisma.post.findFirst({
        where: {
          title: blog.title,
        },
      });
      await prisma.userRead.createMany({
        data: new Array(Math.ceil(blog.read_nums / 2)).fill(likeIps[randomInteger(0, likeIps.length - 1)]).map((ip) => {
          return {
            postId: post?.id,
            ip,
          };
        }),
      });
    }
  }

  async tag() {
    const list = await BlogTagModel.find();
    await prisma.tag.createMany({
      data: list
        .map((item) => {
          if (!TagObj[item.name]) {
            return null;
          }
          return {
            name: TagObj[item.name].old,
            alias: TagObj[item.name].new,
          };
        })
        .filter((v) => v) as any[],
    });
  }

  async post() {
    const tags = await prisma.tag.findMany();
    const blogs = await BlogModel.find();
    try {
      for (const blog of blogs) {
        await prisma.post.create({
          data: {
            title: blog.title,
            alias: blog._id,
            content: blog.md,
            summary: blog.desc,
            cover: blog.cover,
            enableComment: true,
            visible: true,
            github: blog.github,
            tags: {
              connect: blog.tags.map((item) => {
                return {
                  id: tags.find((t) => t.name === TagObj[item.name].old)?.id,
                };
              }),
            },
            createdAt: blog.createTime,
            updatedAt: blog.updateTime,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async user() {
    const list = await UserModel.find();
    try {
      return await prisma.user.createMany({
        data: list
          .map((item) => {
            const obj = {
              email: item.email || null,
              username: item.name,
              url: item.url,
              ip: item.ip,
              userAgent: item.userAgent,
              avatar: item.avatar,
              createdAt: item.createTime,
            };
            if (item.email) {
              obj.email = item.email;
            }
            return obj;
          })
          .reduce((arr: any[], item) => {
            if (arr.find((v) => v.username === item.username) || !item.username) {
              return arr;
            }
            return [...arr, item];
          }, []),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getUInfo(users, item) {
    let uInfo = users.find((v) => v.username === item.name) as any;
    if (!item.name) {
      return uInfo;
    }
    if (!uInfo) {
      uInfo = await prisma.user.findFirst({
        where: {
          username: item.name,
        },
      });
      if (!uInfo) {
        uInfo = await prisma.user.create({
          data: {
            email: null,
            username: item.name,
            avatar: item.avatar,
          },
        });
      }
    }
    return uInfo;
  }

  async comment() {
    const users = await prisma.user.findMany();
    const list = await CommentModel.find();
    try {
      for (const item of list) {
        const uInfo = await this.getUInfo(users, item);
        const _data = {
          path: '/messages',
          content: item.content,
          status: CommentStatus.APPROVED,
          createdAt: item.createTime,
          type: CommentType.MESSAGE_BOARD,
          userId: uInfo?.id,
        } as any;
        if (_data.userId && item.name !== 'admin') {
          const info = await prisma.comment.create({
            data: _data,
          });
          const arr = item.replyList || [];
          for (const v of arr) {
            const vInfo = await this.getUInfo(users, v);
            await prisma.comment.create({
              data: {
                path: '/messages',
                content: v.content || '',
                status: CommentStatus.APPROVED,
                createdAt: new Date(v.createTime as string),
                type: CommentType.MESSAGE_BOARD,
                userId: vInfo?.id,
                parentId: info.id,
              },
            });
          }
          // await prisma.comment.createMany({
          //   data: arr
          //     .map((v: any) => {
          //       return {
          //         path: '/messages',
          //         content: v.content,
          //         status: CommentStatus.APPROVED,
          //         createdAt: new Date(v.createTime),
          //         type: CommentType.MESSAGE_BOARD,
          //         userId: users.find((v1) => v1.username === v.name)?.id,
          //         parentId: info.id,
          //       };
          //     })
          //     .filter((v) => v.userId) as any[],
          // });
        }
      }
    } catch (err) {
      console.log(err);
    }
    return list;
  }

  async blogComment() {
    const users = await prisma.user.findMany();
    const list = await BlogCommentModel.find();
    try {
      for (const item of list) {
        const article = await BlogModel.findById(item.articleId);
        const post = await prisma.post.findFirst({
          where: {
            title: article?.title,
          },
        });
        if (!post) {
          continue;
        }
        const uInfo = await this.getUInfo(users, item);
        const _data = {
          path: `/post/${post.id}`,
          content: item.content,
          status: CommentStatus.APPROVED,
          createdAt: item.createTime,
          type: CommentType.POST,
          postId: post.id,
          userId: uInfo?.id,
        } as any;
        if (_data.userId && item.name !== 'admin') {
          const info = await prisma.comment.create({
            data: _data,
          });
          const arr = item.replyList || [];
          for (const v of arr) {
            const vInfo = await this.getUInfo(users, v);
            await prisma.comment.create({
              data: {
                path: `/post/${post.id}`,
                content: v.content || '',
                status: CommentStatus.APPROVED,
                createdAt: new Date(v.createTime as string),
                type: CommentType.MESSAGE_BOARD,
                postId: post.id,
                userId: vInfo.id,
                parentId: info.id,
              },
            });
          }
          // await prisma.comment.createMany({
          //   data: arr
          //     .map((v: any) => {
          //       return {
          //         path: `/post/${post.id}`,
          //         content: v.content,
          //         status: CommentStatus.APPROVED,
          //         createdAt: new Date(v.createTime),
          //         type: CommentType.MESSAGE_BOARD,
          //         postId: post.id,
          //         userId: users.find((v1) => v1.username === v.name)?.id,
          //         parentId: info.id,
          //       };
          //     })
          //     .filter((v) => v.userId) as any[],
          // });
        }
      }
    } catch (err) {
      console.log(err);
    }
    return list;
  }

  async like() {
    const list = await BlogLikeModel.find();
    // return list;
    try {
      for (const item of list) {
        // if (!item.userId) continue;
        const _blog = await BlogModel.findById(item.articleId);
        if (!_blog) continue;
        const blog = await prisma.post.findFirst({
          where: {
            title: _blog.title,
          },
        });
        let user: undefined | null | any;
        if (item.userId) {
          const _user = await UserModel.findById(item.userId);
          if (_user?.name) {
            user = await prisma.user.findFirst({
              where: {
                username: _user.name,
              },
            });
          }
        }
        await prisma.userLike.create({
          data: {
            ip: item.ip,
            postId: blog?.id,
            userId: user?.id,
            createdAt: new Date((item as any).createTime),
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    return list;
  }

  // 迁移visitor
  async visitor() {
    let list: any[] = await VisitorModel.find();
    list = list
      .map((item) => {
        const ips =
          item.ip
            ?.split(',')
            .map((ip) => {
              ip = ip.trim();
              if (checkStr(ip, 'IPV4') || checkStr(ip, 'IPV6')) {
                return ip;
              }
              return null;
            })
            .filter((v) => v) || [];
        const ip = ips.length > 0 ? ips[0] : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ua, ...rest } = item.system || {};
        return {
          createdAt: item.createTime,
          updatedAt: item.createTime,
          ip,
          userAgent: item.userAgent,

          country: item.location?.country || null,
          province: item.location?.province || null,
          city: item.location?.city || null,
          isp: item.location?.ISP || null,

          system: rest || null,
        };
      })
      .filter((v) => v.ip);

    const _data = list.reduce(
      ({ arr, obj }, item) => {
        if (!obj[item.ip]) {
          obj[item.ip] = true;
          arr.push(item);
        }
        return {
          arr,
          obj,
        };
      },
      {
        arr: [],
        obj: {},
      },
    );

    try {
      await prisma.visitor.createMany({
        data: _data.arr,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async link() {
    try {
      const list = await LinkModel.find();
      await prisma.link.createMany({
        data: list.map((item) => {
          return {
            title: item.title,
            url: item.url,
            desc: item.desc,
            logo: item.logo,
            type: LINK_LIST.find((v) => v.label === item.type)?.value,
            visible: true,
            status: LinkStatus.APPROVED,
            createdAt: (item as any).createTime,
          };
        }) as any[],
      });
      return list;
    } catch (err) {
      console.log(err);
    }
  }

  async svgSync() {
    const list = await prisma.svg.findMany();
    const _p = path.resolve(process.cwd(), './assets/svg.json');
    fs.writeFileSync(_p, JSON.stringify(list, null, 2), 'utf-8');
    return list;
  }

  async svgSyncLocal() {
    const _p = path.resolve(process.cwd(), './assets/svg.json');
    const data = fs.readFileSync(_p, 'utf-8').toString();
    const list = JSON.parse(data);
    return await prisma.svg.createMany({
      data: list.map((item) => {
        return {
          name: item.name,
          content: item.content,
          scope: item.scope,
          desc: item.desc,
        };
      }),
    });
  }

  async delete() {
    // return 'delete';
    await prisma.userRead.deleteMany();
  }
}
