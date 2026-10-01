import { Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  logoutInputSchema,
  otpRequestInputSchema,
  otpVerifyOutputSchema,
  otpVerifyInputSchema,
  publicIdSchema,
  refreshInputSchema,
} from '@workbridge/contracts';
import type { Request } from 'express';
import { z } from 'zod';

import { authOf, Public, type AuthenticatedRequest } from '../common/guards.js';
import { ZodBody, ZodParams } from '../common/zod.js';
import { AuthService } from './auth.service.js';

const publicIdParamSchema = z.object({ publicId: publicIdSchema });

/**
 * /auth (§14 row 1): phone-first OTP login, rotating refresh, session list.
 * Every response uses the { data } success envelope; errors flow through the
 * shared filter as { error: { code, ... } } (§24).
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Post('otp/request')
  async requestOtp(
    @ZodBody(otpRequestInputSchema) body: { phone: string },
    @Req() req: Request,
  ): Promise<{ data: Record<string, unknown> }> {
    const out = await this.auth.requestOtp(body.phone, {
      ip: req.ip ?? null,
      userAgent: req.headers['user-agent'] ?? null,
    });
    // devCode exists only in OTP_SIM mode; strip unless sim is actually on
    const sim = this.config.get<boolean>('otp.sim') === true;
    const data: Record<string, unknown> = sim ? out : { ...out, devCode: undefined };
    if (!sim) delete data.devCode;
    return { data };
  }

  @Public()
  @Post('otp/verify')
  async verifyOtp(
    @ZodBody(otpVerifyInputSchema) body: { challengeId: string; code: string },
    @Req() req: Request,
  ) {
    const out = await this.auth.verifyOtp(body.challengeId, body.code, {
      ip: req.ip ?? null,
      userAgent: req.headers['user-agent'] ?? null,
      requestId: (req as Request & { requestId?: string }).requestId ?? null,
    });
    // validate our own output against the contract before it reaches a client
    return { data: otpVerifyOutputSchema.parse(out) };
  }

  @Public()
  @Post('refresh')
  async refresh(
    @ZodBody(refreshInputSchema) body: { refreshToken: string },
    @Req() req: Request,
  ) {
    const out = await this.auth.refresh(body.refreshToken, {
      ip: req.ip ?? null,
      userAgent: req.headers['user-agent'] ?? null,
    });
    return { data: out };
  }

  @Post('logout')
  async logout(
    @ZodBody(logoutInputSchema) body: { refreshToken?: string; allDevices?: boolean },
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.auth.logout(body, auth) };
  }

  @Get('sessions')
  async listSessions(@Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { data: { sessions: await this.auth.listSessions(auth.accountId, auth.sessionId) } };
  }

  @Delete('sessions/:publicId')
  async revokeSession(
    @ZodParams(publicIdParamSchema) params: { publicId: string },
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.auth.revokeSession(auth.accountId, params.publicId) };
  }
}
