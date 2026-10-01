import { Body, Controller, Get, Headers, Param, Post, Query, Req } from '@nestjs/common';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { MatchingService } from './matching.service.js';
import type { QuickMatchCreate, QuickMatchRespond } from '@workbridge/contracts';

/**
 * Matching routes: scored candidates for an owned job, the Quick Match wave
 * lifecycle (launch → my offers → respond). Envelope convention: { data }.
 */
@Controller()
export class MatchingController {
  constructor(private readonly matching: MatchingService) {}

  @Get('matching/jobs/:publicId/candidates')
  @Roles('employer')
  async candidates(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Query('limit') limit?: string,
    @Query('includeApplied') includeApplied?: string,
  ) {
    const auth = authOf(req);
    return {
      data: await this.matching.candidates(
        { accountId: auth.accountIdBig, role: auth.role },
        publicId,
        { limit, includeApplied },
      ),
    };
  }

  @Post('quick-match')
  @Roles('employer')
  async launch(
    @Req() req: AuthenticatedRequest,
    @Body() body: QuickMatchCreate,
    @Headers('idempotency-key') idemKey?: string,
  ) {
    const auth = authOf(req);
    return {
      data: await this.matching.launch({ accountId: auth.accountIdBig, role: auth.role }, body, idemKey),
    };
  }

  @Get('quick-match/availability')
  @Roles('employer')
  async availability(
    @Req() req: AuthenticatedRequest,
    @Query('jobPublicId') jobPublicId: string,
    @Query('radiusKm') radiusKm?: string,
  ) {
    const auth = authOf(req);
    return {
      data: await this.matching.availability(
        { accountId: auth.accountIdBig, role: auth.role },
        jobPublicId,
        radiusKm !== undefined ? Number(radiusKm) : undefined,
      ),
    };
  }

  @Get('quick-match')
  @Roles('worker')
  async myOffers(@Req() req: AuthenticatedRequest, @Query('status') status?: string) {
    const auth = authOf(req);
    return {
      data: await this.matching.myOffers(
        { accountId: auth.accountIdBig, role: auth.role },
        status || undefined,
      ),
    };
  }

  @Post('quick-match/:publicId/respond')
  @Roles('worker')
  async respond(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: QuickMatchRespond,
  ) {
    const auth = authOf(req);
    return { data: await this.matching.respond({ accountId: auth.accountIdBig, role: auth.role }, publicId, body) };
  }
}
