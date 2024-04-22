import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { Request } from 'express';
import { metaData } from 'src/config/metaData';
import { ADMIN_INVITATION_CODE } from 'src/constants';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { ApiException } from 'src/exceptions/api-exception';
import {
  CreateUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  UpdateUserRolesDto,
  UserQueryDto,
} from './dto/request.dto';
import { EmailService, SendEmailOptions } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../shared/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * 创建用户
   *
   * @param {(CreateUserDto & { avatar?: string })} { invitationCode, userRole, ...createUserDto }
   * @return {*}
   * @memberof UserService
   */
  async create({ invitationCode, request, ...createUserDto }: CreateUserDto & { avatar?: string; request: Request }) {
    const invitationCodeData = await this.checkRegisterInvitationCode(invitationCode);
    if (!invitationCodeData) {
      throw new ApiException('邀请码错误！');
    }
    if (invitationCodeData.expiredAt && dayjs(invitationCodeData.expiredAt).isBefore(dayjs())) {
      throw new ApiException('邀请码已过期！');
    }
    const hasUser = await this.getUserByUsernameOrEmail(createUserDto.username, createUserDto.email);
    if (hasUser) {
      throw new ApiException('用户已存在！');
    }
    const hashedPwd = await this.bcryptService.hash(createUserDto.password);
    createUserDto.password = hashedPwd;
    const user = await this.prisma.prisma.user.create({
      data: {
        ...createUserDto,
        userAgent: this.getUserAgent(request),
        ip: this.getIp(request),
        ...(this.checkAdminByCode(invitationCode)
          ? { admin: 1 }
          : {
              invitationCodeId: invitationCode,
            }),
        userRoles: {
          createMany: {
            data: invitationCodeData.roles.map((v) => ({
              roleId: v.id,
            })),
          },
        },
      },
    });
    if (user) {
      this.sendEmail({
        to: metaData.config.email?.email,
        name: '邀请码注册',
        subject: '有新用户注册了',
        html: this.emailService.createUserRegisterMailTemplate({
          title: '邀请码注册',
          user: user as any,
        }),
      });
    }
  }

  /**
   * 注册用户
   *
   * @param {RegisterUserDto} { username, email, password }
   * @memberof UserService
   */
  async register({ username, email, avatar, url, password, request }: RegisterUserDto & { request: Request }) {
    const hasUser = await this.getUserByUsernameOrEmail(username, email);
    if (hasUser) {
      throw new ApiException('用户已存在！');
    }
    const hashedPwd = await this.bcryptService.hash(password);
    const user = await this.prisma.prisma.user.create({
      data: {
        username,
        email,
        avatar,
        url,
        password: hashedPwd,
        userAgent: this.getUserAgent(request),
        ip: this.getIp(request),
      },
    });
    if (user) {
      this.sendEmail({
        to: metaData.config.email?.email,
        name: '用户注册提醒',
        subject: '有新用户注册了',
        html: this.emailService.createUserRegisterMailTemplate({
          title: '新用户注册',
          user: user as any,
        }),
      });
    }
  }

  sendEmail({
    to,
    ...props
  }: Omit<SendEmailOptions, 'to'> & {
    to?: SendEmailOptions['to'];
  }) {
    if (!to) {
      return;
    }
    if (metaData.config.user?.notifyOnUserRegister) {
      this.emailService.send({ ...props, to });
    }
  }

  async findList(query: UserQueryDto) {
    const where = {} as any;
    if (query.keyword) {
      where.username = {
        in: [query.keyword],
      };
    }
    return this.prisma.prisma.user.findMany({
      where,
      select: this.selectedFiles(),
    });
  }

  async findPage({ take, skip }: PaginationDto) {
    const [list, total] = await Promise.all([
      this.prisma.prisma.user.findMany({
        take,
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        select: this.selectedFiles(),
      }),
      this.prisma.prisma.user.count(),
    ]);
    return {
      list,
      total,
    };
  }

  async disableUser(id: number) {
    await this.prisma.prisma.user.update({
      data: {
        status: 2,
      },
      where: {
        id,
      },
    });
  }

  async enableUser(id: number) {
    await this.prisma.prisma.user.update({
      data: {
        status: 1,
      },
      where: {
        id,
      },
    });
  }

  /**
   * 根据id删除用户
   *
   * @param {number} id
   * @memberof UserService
   */
  async remove(id: number) {
    await this.prisma.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * 更新用户权限
   *
   * @param {number} id
   * @param {UpdateUserRolesDto} UpdateUserRolesDto
   * @memberof UserService
   */
  async updateUserRole(id: number, UpdateUserRolesDto: UpdateUserRolesDto) {
    await this.prisma.prisma.user.update({
      data: {
        userRoles: {
          deleteMany: {
            userId: id,
          },
          createMany: {
            data: UpdateUserRolesDto.userRoles.map((_id) => ({
              roleId: _id,
            })),
          },
        },
      },
      where: {
        id,
      },
    });
  }

  /**
   * 更新用户信息
   *
   * @param {number} id
   * @param {UpdateUserDto} updateUserDto
   * @return {*}
   * @memberof UserService
   */
  async updateUserInfo(id: number, updateUserDto: UpdateUserDto) {
    await this.prisma.prisma.user.update({
      data: {
        ...updateUserDto,
      },
      where: {
        id,
      },
    });
  }

  /**
   * 更新用户密码
   *
   * @param {number} id
   * @param {UpdateUserPasswordDto} data
   * @memberof UserService
   */
  async updateUserPassword(id: number, data: UpdateUserPasswordDto) {
    const user = await this.prisma.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (data.oldPassword === data.password) {
      throw new ApiException('用户当前密码不能与新密码相同！');
    }
    const isOk = await this.bcryptService.compare(data.oldPassword, user?.password || '');
    if (!isOk) {
      throw new ApiException('用户当前密码错误！');
    }
    const hashedPwd = await this.bcryptService.hash(data.password);
    await this.prisma.prisma.user.update({
      data: {
        password: hashedPwd,
      },
      where: {
        id,
      },
    });
  }

  count() {
    return this.prisma.prisma.user.count();
  }

  checkAdminByCode(code: string) {
    return code === ADMIN_INVITATION_CODE;
  }

  /**
   * 检查注册邀请码
   *
   * @param {string} invitationCode
   * @return {*}
   * @memberof UserService
   */
  checkRegisterInvitationCode(code: string) {
    if (this.checkAdminByCode(code)) {
      return {
        code,
        roles: [],
        expiredAt: undefined,
      };
    }
    return this.prisma.prisma.invitationCode.findUnique({
      where: {
        code,
      },
      include: {
        roles: true,
      },
    });
  }

  /**
   * 根据用户名或邮箱获取用户
   *
   * @param {string} username
   * @param {string} email
   * @return {*}
   * @memberof UserService
   */
  async getUserByUsernameOrEmail(username: string, email: string) {
    return await this.prisma.prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });
  }

  /**
   *  根据id获取用户
   *
   * @param {number} id
   * @return {*}
   * @memberof UserService
   */
  async getUserById(id: number) {
    return await this.prisma.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        url: true,
      },
    });
  }

  /**
   * 根据用户名获取用户
   *
   * @param {string} username
   * @return {*}
   * @memberof UserService
   */
  async getUserByEmailOrUsername(emailOrUsername: string) {
    return await this.prisma.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: emailOrUsername,
          },
          {
            username: emailOrUsername,
          },
        ],
      },
    });
  }

  async allowLoginAdmin(id: number) {
    const data = await this.prisma.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        admin: true,
      },
    });
    if (data?.admin === 1) {
      return true;
    }
    return false;
  }

  getUserAgent(request: Request) {
    return request.headers['user-agent'] || '';
  }

  getIp(request: Request) {
    return request.ip;
  }

  selectedFiles() {
    return {
      id: true,
      email: true,
      username: true,
      avatar: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      url: true,
      userRoles: {
        select: {
          role: true,
        },
      },
    };
  }
}
