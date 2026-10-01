import { SetMetadata } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';

import { ApiError } from './api-error.js';
import { TokenService } from '../auth/token.service.js';

/** Marks a route as reachable without a token (OTP request/verify, /config, /health). */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
/** Restricts a route to specific account roles — 403 ROLE_REQUIRED otherwise. */
export const Roles = (...roles: ('worker' | 'employer' | 'admin')[]) =>
  SetMetadata(ROLES_KEY, roles);

export interface AuthenticatedRequest extends Request {
  auth?: {
    accountId: string;
    accountIdBig: bigint;
    publicId: string;
    role: 'worker' | 'employer' | 'admin' | null;
    sessionId: string;
  };
}

/**
 * Verifies the Bearer access token (§15) and attaches auth context.
 * Account status (SUSPENDED/CLOSED) is re-checked against the DB — a token
 * minted before a suspension must not keep working past the suspension.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokens: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = req.headers.authorization ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) throw new ApiError('UNAUTHENTICATED', 'Missing access token');

    const claims = await this.tokens.verifyAccessToken(token);
    if (!claims.sub) throw new ApiError('TOKEN_INVALID', 'Malformed token');
    req.auth = {
      accountId: claims.sub,
      accountIdBig: BigInt(claims.sub),
      publicId: claims.publicId,
      role: claims.role,
      sessionId: claims.sid,
    };
    return true;
  }
}

/** Convenience accessor for controllers — throws if guard did not run. */
export const authOf = (req: AuthenticatedRequest) => {
  if (!req.auth) throw new ApiError('UNAUTHENTICATED', 'No auth context');
  return req.auth;
};

/**
 * Enforces @Roles(...) metadata (§15): missing role (pre-onboarding) or a
 * different role ⇒ 403 ROLE_REQUIRED. Runs AFTER JwtAuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const wanted: string[] = Reflect.getMetadata(ROLES_KEY, context.getHandler()) ?? [];
    if (wanted.length === 0) return true;
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!req.auth?.role || !wanted.includes(req.auth.role)) {
      throw new ApiError('ROLE_REQUIRED', `This action requires role: ${wanted.join(' or ')}`);
    }
    return true;
  }
}
