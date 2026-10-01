import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { RatingsService } from './ratings.service.js';
import type { RatingCreate, RatingSummary } from '@workbridge/contracts';

/**
 * Ratings routes: mutual double-blind ratings on COMPLETED jobs.
 * Envelope convention: singles as { data }. Role literals lowercase.
 */
@Controller()
export class RatingsController {
  constructor(private readonly ratings: RatingsService) {}

  @Post('ratings')
  @Roles('worker', 'employer')
  async create(@Req() req: AuthenticatedRequest, @Body() body: RatingCreate) {
    const auth = authOf(req);
    return { data: await this.ratings.create({ accountId: auth.accountIdBig, role: auth.role }, body) };
  }

  @Get('me/rating-summary')
  @Roles('worker', 'employer')
  async summary(@Req() req: AuthenticatedRequest): Promise<{ data: RatingSummary }> {
    const auth = authOf(req);
    return { data: await this.ratings.summary({ accountId: auth.accountIdBig, role: auth.role }) };
  }

  @Get('ratings/pending')
  @Roles('worker', 'employer')
  async pending(@Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { data: await this.ratings.pending({ accountId: auth.accountIdBig, role: auth.role }) };
  }

  @Get('ratings')
  @Roles('worker', 'employer')
  async list(@Req() req: AuthenticatedRequest, @Query('scope') scope?: string) {
    const auth = authOf(req);
    return {
      data: await this.ratings.list(
        { accountId: auth.accountIdBig, role: auth.role },
        scope === 'given' ? 'given' : 'received',
      ),
    };
  }
}
