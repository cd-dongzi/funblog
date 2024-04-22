import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { ApiException } from 'src/exceptions/api-exception';
import { CreateRoleDto, UpdateRoleDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建角色
   *
   * @param {CreateRoleDto} { permissions, ...createRoleDto }
   * @return {*}
   * @memberof RoleService
   */
  async create({ permissions, ...createRoleDto }: CreateRoleDto) {
    const hasRole = await this.getRoleByCode(createRoleDto.code);
    if (hasRole) {
      throw new ApiException('角色类型已存在！');
    }
    await this.prisma.prisma.role.create({
      data: {
        ...createRoleDto,
        rolePermissions: {
          createMany: {
            data: permissions.map((item) => {
              return {
                permissionId: item,
              };
            }),
          },
        },
      },
    });
    return null;
  }

  /**
   * 查询所有角色
   *
   * @return {*}
   * @memberof RoleService
   */
  async findAll() {
    return await this.prisma.prisma.role.findMany();
  }

  /**
   * 分页查询角色
   *
   * @return {*}
   * @memberof RoleService
   */
  async findPage({ take, skip }: PaginationDto) {
    const [list, total] = await Promise.all([
      this.prisma.prisma.role.findMany({
        take,
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      }),
      this.prisma.prisma.role.count(),
    ]);
    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  /**
   * 根据id更新角色
   *
   * @param {number} id
   * @param {UpdateRoleDto} updateRoleDto
   * @return {*}
   * @memberof RoleService
   */
  async update(id: number, { permissions, ...updateRoleDto }: UpdateRoleDto) {
    const permission = await this.getRoleById(id);
    if (!permission) {
      throw new ApiException('角色不存在！');
    }
    await this.prisma.prisma.role.update({
      data: {
        ...updateRoleDto,
        rolePermissions: {
          deleteMany: {
            roleId: id,
          },
          createMany: {
            data:
              permissions?.map((item) => {
                return {
                  permissionId: item,
                };
              }) || [],
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const permission = await this.getRoleById(id);
    if (!permission) {
      throw new ApiException('角色不存在！');
    }
    return await this.prisma.prisma.role.deleteMany({
      where: {
        id,
      },
    });
  }

  /**
   * 根据id获取角色
   *
   * @param {number} id
   * @return {*}
   * @memberof RoleService
   */
  async getRoleById(id: number) {
    return await this.prisma.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * 根据code获取角色
   *
   * @param {string} code
   * @return {*}
   * @memberof RoleService
   */
  async getRoleByCode(code: string) {
    return await this.prisma.prisma.role.findUnique({
      where: {
        code,
      },
    });
  }
}
