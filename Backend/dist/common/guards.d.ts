import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { TokenService } from '../auth/token.service.js';
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: ("worker" | "employer" | "admin")[]) => import("@nestjs/common").CustomDecorator<string>;
export interface AuthenticatedRequest extends Request {
    auth?: {
        accountId: string;
        accountIdBig: bigint;
        publicId: string;
        role: 'worker' | 'employer' | 'admin' | null;
        sessionId: string;
    };
}
export declare class JwtAuthGuard implements CanActivate {
    private readonly tokens;
    constructor(tokens: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const authOf: (req: AuthenticatedRequest) => {
    accountId: string;
    accountIdBig: bigint;
    publicId: string;
    role: "worker" | "employer" | "admin" | null;
    sessionId: string;
};
export declare class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
