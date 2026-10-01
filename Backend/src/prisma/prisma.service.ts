import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../generated/prisma/client.js';

/**
 * Prisma 7 runtime client — driver-adapter based (no embedded engine).
 * DATABASE_URL is parsed here into a mariadb pool config (the adapter speaks
 * the MySQL wire protocol; Prisma 7 ships it as @prisma/adapter-mariadb).
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not set — copy Backend/.env.example to Backend/.env');
    }
    const u = new URL(url);
    super({
      adapter: new PrismaMariaDb({
        host: u.hostname,
        port: Number(u.port || 3306),
        user: decodeURIComponent(u.username),
        password: u.password ? decodeURIComponent(u.password) : undefined,
        database: u.pathname.replace(/^\//, ''),
      }),
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
