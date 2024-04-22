import { Injectable } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api-exception';
import { v4 as uuidv4 } from 'uuid';
import { CreateInvitationCodeDto, UpdateInvitationCodeDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvitationCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ roles, ...createInvitationCodeDto }: CreateInvitationCodeDto & { userId: number }) {
    const code = uuidv4();
    const hasInvitationCode = await this.getInvitationCodeByCode(code);
    if (hasInvitationCode) {
      throw new ApiException('邀请码已存在，请点击重新创建！');
    }
    await this.prisma.prisma.invitationCode.create({
      data: {
        code,
        ...createInvitationCodeDto,
        roles: {
          connect: roles.map((id) => ({ id })),
        },
      },
    });
    return null;
  }

  /**
   * 查询所有邀请码
   *
   * @return {*}
   * @memberof InvitationCodeService
   */
  async findAll() {
    return await this.prisma.prisma.invitationCode.findMany({
      include: {
        roles: true,
      },
    });
  }

  async findOne(id: number) {
    const data = await this.prisma.prisma.invitationCode.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          select: {
            id: true,
          },
        },
      },
    });
    return {
      ...data,
      role: data?.roles.map(({ id }) => id),
    };
  }

  /**
   * 根据id更新邀请码
   *
   * @param {number} id
   * @param {UpdateInvitationCodeDto} updateInvitationCodeDto
   * @return {*}
   * @memberof InvitationCodeService
   */
  async update(id: number, { roles, ...updateInvitationCodeDto }: UpdateInvitationCodeDto) {
    const invitationCode = await this.getInvitationCodeById(id);
    if (!invitationCode) {
      throw new ApiException('邀请码不存在！');
    }
    await this.prisma.prisma.invitationCode.update({
      data: {
        ...updateInvitationCodeDto,
        roles: {
          connect: roles?.map((id) => ({ id })),
        },
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const invitationCode = await this.getInvitationCodeById(id);
    if (!invitationCode) {
      throw new ApiException('邀请码不存在！');
    }
    await this.prisma.prisma.invitationCode.delete({
      where: {
        id,
      },
    });
  }

  /**
   * 根据id获取邀请码
   *
   * @param {number} id
   * @return {*}
   * @memberof InvitationCodeService
   */
  async getInvitationCodeById(id: number) {
    return await this.prisma.prisma.invitationCode.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * 根据code获取邀请码
   *
   * @param {string} code
   * @return {*}
   * @memberof InvitationCodeService
   */
  async getInvitationCodeByCode(code: string) {
    return await this.prisma.prisma.invitationCode.findUnique({
      where: {
        code,
      },
    });
  }
}
