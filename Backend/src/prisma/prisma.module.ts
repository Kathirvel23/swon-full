import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service.js';

/** Global so every business module can inject PrismaService without re-declaring. */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
