import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { getLocationByIp } from 'src/utils/ip';
import { getDataByUa } from 'src/utils/ua';
import { CreateVisitorDto } from './dto/request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateVisitorDto, request: Request) {
    const ip = request.ip as string;
    const data = await this.getVisitorByIp(ip);
    if (data) {
      return null;
    }
    const userAgent = body.userAgent || request.headers['user-agent'];
    const location = getLocationByIp(ip);
    const system = getDataByUa(userAgent);
    // 在node端发起获取的userAgent是node, 所以部分接口通过参数传递过来
    await this.prisma.prisma.visitor.create({
      data: {
        ip,
        userAgent,
        ...body,
        country: location?.country,
        province: location?.province,
        city: location?.city,
        isp: location?.isp,
        system,
      },
    });
  }

  async getVisitorPage({ take, skip }: PaginationDto) {
    const [list, total] = await Promise.all([
      this.prisma.prisma.visitor.findMany({
        take,
        skip,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
      this.prisma.prisma.visitor.count(),
    ]);
    return {
      list,
      total,
    };
  }

  async system() {
    const visitors = await this.prisma.prisma.visitor.findMany({
      select: {
        system: true,
      },
    });

    const setVal = (key: string, attr: string, system: any, obj: Record<string, any>) => {
      if (!system[key]) {
        return obj;
      }
      const val = system[key][attr] || '其他';
      if (val) {
        if (obj[key][val]) {
          obj[key][val]++;
        } else {
          obj[key][val] = 1;
        }
      }
      return obj;
    };
    return [...visitors].reduce(
      (obj, item) => {
        setVal('browser', 'name', item.system, obj);
        setVal('engine', 'name', item.system, obj);
        setVal('os', 'name', item.system, obj);
        setVal('device', 'model', item.system, obj);
        return obj;
      },
      {
        browser: {},
        engine: {},
        os: {},
        device: {},
      } as Record<string, any>,
    );
  }

  async location() {
    const visitors = await this.prisma.prisma.visitor.findMany({
      select: {
        province: true,
        country: true,
        city: true,
      },
    });

    const setVal = (attr: string, visitor: any, obj: Record<string, any>) => {
      if (!visitor) {
        return obj;
      }
      const val = visitor[attr] || '其他';
      if (val) {
        if (obj[attr][val]) {
          obj[attr][val]++;
        } else {
          obj[attr][val] = 1;
        }
      }
      return obj;
    };
    return visitors.reduce(
      (obj, item) => {
        setVal('country', item, obj);
        setVal('province', item, obj);
        setVal('city', item, obj);
        return obj;
      },
      {
        country: {},
        province: {},
        city: {},
      } as Record<string, any>,
    );
  }

  count() {
    return this.prisma.prisma.visitor.count();
  }

  getVisitorByIp(ip: string) {
    return this.prisma.prisma.visitor.findUnique({
      where: {
        ip,
      },
    });
  }
}
