import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'node_modules/.prisma/client';

export const prisma = new PrismaClient();
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  prisma = prisma;
  async onModuleInit() {
    await prisma.$connect();
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
