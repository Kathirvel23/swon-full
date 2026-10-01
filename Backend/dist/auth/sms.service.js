var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { maskPhone, sha256Hex } from '../common/crypto.js';
export const SMS_PORT = Symbol('SMS_PORT');
let DevSmsAdapter = class DevSmsAdapter {
    prisma;
    logger = new Logger('SMS:SIM');
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendOtp(phone, code) {
        this.logger.log(`→ ${maskPhone(phone)} OTP=${code} (simulated — no vendor called)`);
        await this.prisma.smsLog.create({
            data: {
                phoneHash: sha256Hex(phone),
                templateId: 'OTP_LOGIN_V1',
                purpose: 'LOGIN',
                providerRef: 'sim',
                status: 'SENT',
            },
        });
    }
};
DevSmsAdapter = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], DevSmsAdapter);
export { DevSmsAdapter };
//# sourceMappingURL=sms.service.js.map