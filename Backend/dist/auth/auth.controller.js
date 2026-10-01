var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { logoutInputSchema, otpRequestInputSchema, otpVerifyOutputSchema, otpVerifyInputSchema, publicIdSchema, refreshInputSchema, } from '@workbridge/contracts';
import { z } from 'zod';
import { authOf, Public } from '../common/guards.js';
import { ZodBody, ZodParams } from '../common/zod.js';
import { AuthService } from './auth.service.js';
const publicIdParamSchema = z.object({ publicId: publicIdSchema });
let AuthController = class AuthController {
    auth;
    config;
    constructor(auth, config) {
        this.auth = auth;
        this.config = config;
    }
    async requestOtp(body, req) {
        const out = await this.auth.requestOtp(body.phone, {
            ip: req.ip ?? null,
            userAgent: req.headers['user-agent'] ?? null,
        });
        const sim = this.config.get('otp.sim') === true;
        const data = sim ? out : { ...out, devCode: undefined };
        if (!sim)
            delete data.devCode;
        return { data };
    }
    async verifyOtp(body, req) {
        const out = await this.auth.verifyOtp(body.challengeId, body.code, {
            ip: req.ip ?? null,
            userAgent: req.headers['user-agent'] ?? null,
            requestId: req.requestId ?? null,
        });
        return { data: otpVerifyOutputSchema.parse(out) };
    }
    async refresh(body, req) {
        const out = await this.auth.refresh(body.refreshToken, {
            ip: req.ip ?? null,
            userAgent: req.headers['user-agent'] ?? null,
        });
        return { data: out };
    }
    async logout(body, req) {
        const auth = authOf(req);
        return { data: await this.auth.logout(body, auth) };
    }
    async listSessions(req) {
        const auth = authOf(req);
        return { data: { sessions: await this.auth.listSessions(auth.accountId, auth.sessionId) } };
    }
    async revokeSession(params, req) {
        const auth = authOf(req);
        return { data: await this.auth.revokeSession(auth.accountId, params.publicId) };
    }
};
__decorate([
    Public(),
    Post('otp/request'),
    __param(0, ZodBody(otpRequestInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestOtp", null);
__decorate([
    Public(),
    Post('otp/verify'),
    __param(0, ZodBody(otpVerifyInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    Public(),
    Post('refresh'),
    __param(0, ZodBody(refreshInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    Post('logout'),
    __param(0, ZodBody(logoutInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Get('sessions'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "listSessions", null);
__decorate([
    Delete('sessions/:publicId'),
    __param(0, ZodParams(publicIdParamSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeSession", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService,
        ConfigService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map