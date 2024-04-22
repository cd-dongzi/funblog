import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { ApiException } from 'src/exceptions/api-exception';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const hasPermission = await this.getPermissionByCode(createPermissionDto.code);
    if (hasPermission) {
      throw new ApiException('权限标识已存在！');
    }
    await this.prisma.prisma.permission.create({
      data: {
        ...createPermissionDto,
      },
    });
    return null;
  }

  /**
   * 查询所有权限
   *
   * @return {*}
   * @memberof PermissionService
   */
  async findAll() {
    return await this.prisma.prisma.permission.findMany();
  }

  /**
   * 分页查询权限
   *
   * @return {*}
   * @memberof PermissionService
   */
  async findPage({ take, skip }: PaginationDto) {
    const [list, total] = await Promise.all([
      this.prisma.prisma.permission.findMany({
        take,
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
      this.prisma.prisma.permission.count(),
    ]);
    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.prisma.permission.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * 根据id更新权限
   *
   * @param {number} id
   * @param {UpdatePermissionDto} updatePermissionDto
   * @return {*}
   * @memberof PermissionService
   */
  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.getPermissionById(id);
    if (!permission) {
      throw new ApiException('权限不存在！');
    }
    await this.prisma.prisma.permission.update({
      data: updatePermissionDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const permission = await this.getPermissionById(id);
    if (!permission) {
      throw new ApiException('权限不存在！');
    }
    // 获取所有以当前权限为id的权限数据
    const permissions = await this.prisma.prisma.permission.findMany({
      select: {
        id: true,
      },
      where: {
        OR: [{ id }],
      },
    });

    const permissionIds = permissions.map((item) => item.id);

    // 删除关联表中的数据
    const deleteRolePermission = this.prisma.prisma.rolePermission.deleteMany({
      where: {
        permissionId: {
          in: permissionIds,
        },
      },
    });

    // 删除permission表中id匹配项
    const deletePermission = this.prisma.prisma.permission.deleteMany({
      where: {
        id: {
          in: permissionIds,
        },
      },
    });

    await this.prisma.prisma.$transaction([deleteRolePermission, deletePermission]);
  }

  /**
   * 根据id获取权限
   *
   * @param {number} id
   * @return {*}
   * @memberof PermissionService
   */
  async getPermissionById(id: number) {
    return await this.prisma.prisma.permission.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * 根据code获取权限
   *
   * @param {string} code
   * @return {*}
   * @memberof PermissionService
   */
  async getPermissionByCode(code: string) {
    return await this.prisma.prisma.permission.findUnique({
      where: {
        code,
      },
    });
  }
}
