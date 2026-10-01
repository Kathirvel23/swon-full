import { Body, Controller, Get, Headers, Param, Post, Query, Req } from '@nestjs/common';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { PaymentsService } from './payments.service.js';
import type { ApproveEarnings, MarkPaid } from '@workbridge/contracts';

/**
 * Earnings + record-only payouts (§12.4). Money writes REQUIRE an
 * Idempotency-Key header (P2/P4) and are strictly employer-side — a
 * worker hitting these gets 403 (ROLE_REQUIRED), never a silent no-op.
 * Lists come back { data, meta }; commands wrap in { data }.
 */
@Controller()
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Get('earnings')
  @Roles('worker')
  my(@Req() req: AuthenticatedRequest, @Query() query: { cursor?: string; limit?: string; status?: string }) {
    return this.payments.myEarnings(authOf(req).accountIdBig, {
      cursor: query.cursor,
      limit: Math.min(Math.max(Number(query.limit) || 20, 1), 50),
      status: query.status,
    });
  }

  @Get('jobs/:publicId/earnings')
  @Roles('employer')
  forJob(@Req() req: AuthenticatedRequest, @Param('publicId') publicId: string, @Query() query: { cursor?: string; limit?: string; status?: string }) {
    return this.payments.jobEarnings(authOf(req).accountIdBig, publicId, {
      cursor: query.cursor,
      limit: Math.min(Math.max(Number(query.limit) || 20, 1), 50),
      status: query.status,
    });
  }

  @Post('earnings/approve')
  @Roles('employer')
  async approve(@Req() req: AuthenticatedRequest, @Body() body: ApproveEarnings, @Headers('idempotency-key') key?: string) {
    return { data: await this.payments.approve(authOf(req).accountIdBig, body, key) };
  }

  @Post('earnings/mark-paid')
  @Roles('employer')
  async paid(@Req() req: AuthenticatedRequest, @Body() body: MarkPaid, @Headers('idempotency-key') key?: string) {
    return { data: await this.payments.markPaid(authOf(req).accountIdBig, body, key) };
  }
}
