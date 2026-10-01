var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SetMetadata } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ApiError } from './api-error.js';
import { TokenService } from '../auth/token.service.js';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const ROLES_KEY = 'roles';
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);
let JwtAuthGuard = class JwtAuthGuard {
    tokens;
    constructor(tokens) {
        this.tokens = tokens;
    }
    async canActivate(context) {
        const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, context.getHandler());
        if (isPublic)
            return true;
        const req = context.switchToHttp().getRequest();
        const header = req.headers.authorization ?? '';
        const token = header.startsWith('Bearer ') ? header.slice(7) : '';
        if (!token)
            throw new ApiError('UNAUTHENTICATED', 'Missing access token');
        const claims = await this.tokens.verifyAccessToken(token);
        if (!claims.sub)
            throw new ApiError('TOKEN_INVALID', 'Malformed token');
        req.auth = {
            accountId: claims.sub,
            accountIdBig: BigInt(claims.sub),
            publicId: claims.publicId,
            role: claims.role,
            sessionId: claims.sid,
        };
        return true;
    }
};
JwtAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TokenService])
], JwtAuthGuard);
export { JwtAuthGuard };
export const authOf = (req) => {
    if (!req.auth)
        throw new ApiError('UNAUTHENTICATED', 'No auth context');
    return req.auth;
};
let RolesGuard = class RolesGuard {
    canActivate(context) {
        const wanted = Reflect.getMetadata(ROLES_KEY, context.getHandler()) ?? [];
        if (wanted.length === 0)
            return true;
        const req = context.switchToHttp().getRequest();
        if (!req.auth?.role || !wanted.includes(req.auth.role)) {
            throw new ApiError('ROLE_REQUIRED', `This action requires role: ${wanted.join(' or ')}`);
        }
        return true;
    }
};
RolesGuard = __decorate([
    Injectable()
], RolesGuard);
export { RolesGuard };
//# sourceMappingURL=guards.js.map