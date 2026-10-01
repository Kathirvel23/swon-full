import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard, RolesGuard } from '../common/guards.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { OtpService } from './otp.service.js';
import { PrismaOtpStore, PrismaSessionStore } from './prisma-stores.js';
import { DevSmsAdapter, SMS_PORT } from './sms.service.js';
import { TokenService } from './token.service.js';

/**
 * Auth domain (H1). Services are constructed with injected stores so unit
 * tests substitute in-memory fakes; guards are registered app-wide here —
 * every route is authenticated unless marked @Public().
 */
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: SMS_PORT,
      useFactory: (prisma: PrismaService) => new DevSmsAdapter(prisma),
      inject: [PrismaService],
    },
    {
      provide: OtpService,
      useFactory: (prisma: PrismaService, config: ConfigService) =>
        new OtpService(new PrismaOtpStore(prisma), {
          cooldownSec: config.get<number>('otp.cooldownSec') ?? 60,
          ttlSec: config.get<number>('otp.ttlSec') ?? 120,
          maxAttempts: config.get<number>('otp.maxAttempts') ?? 5,
          sim: config.get<boolean>('otp.sim') ?? false,
          hashSecret: config.get<string>('auth.accessSecret') ?? '',
        }),
      inject: [PrismaService, ConfigService],
    },
    {
      provide: TokenService,
      useFactory: (prisma: PrismaService, config: ConfigService) =>
        new TokenService(new PrismaSessionStore(prisma), {
          accessSecret: config.get<string>('auth.accessSecret') ?? '',
          accessTtlSec: config.get<number>('auth.accessTtlSec') ?? 900,
          refreshTtlDays: config.get<number>('auth.refreshTtlDays') ?? 30,
        }),
      inject: [PrismaService, ConfigService],
    },
    AuthService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
