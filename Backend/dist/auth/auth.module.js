var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        controllers: [AuthController],
        providers: [
            {
                provide: SMS_PORT,
                useFactory: (prisma) => new DevSmsAdapter(prisma),
                inject: [PrismaService],
            },
            {
                provide: OtpService,
                useFactory: (prisma, config) => new OtpService(new PrismaOtpStore(prisma), {
                    cooldownSec: config.get('otp.cooldownSec') ?? 60,
                    ttlSec: config.get('otp.ttlSec') ?? 120,
                    maxAttempts: config.get('otp.maxAttempts') ?? 5,
                    sim: config.get('otp.sim') ?? false,
                    hashSecret: config.get('auth.accessSecret') ?? '',
                }),
                inject: [PrismaService, ConfigService],
            },
            {
                provide: TokenService,
                useFactory: (prisma, config) => new TokenService(new PrismaSessionStore(prisma), {
                    accessSecret: config.get('auth.accessSecret') ?? '',
                    accessTtlSec: config.get('auth.accessTtlSec') ?? 900,
                    refreshTtlDays: config.get('auth.refreshTtlDays') ?? 30,
                }),
                inject: [PrismaService, ConfigService],
            },
            AuthService,
            { provide: APP_GUARD, useClass: JwtAuthGuard },
            { provide: APP_GUARD, useClass: RolesGuard },
        ],
        exports: [AuthService, TokenService],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map