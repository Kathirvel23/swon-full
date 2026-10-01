import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import {
  applicationDecisionSchema,
  applyInputSchema,
  bulkDecisionSchema,
  crewRosterQuerySchema,
  myApplicationsQuerySchema,
  queueQuerySchema,
  withdrawInputSchema,
  type ApplicationDecision,
  type ApplyInput,
  type BulkDecision,
  type CrewRosterQuery,
  type MyApplicationsQuery,
  type QueueQuery,
  type WithdrawInput,
} from '@workbridge/contracts';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { ApiError } from '../common/api-error.js';
import { ZodBody, ZodQuery } from '../common/zod.js';

import { ApplicationsService } from './applications.service.js';

/**
 * /applications + /jobs/{id}/queue|crew — H6/H7.
 * POST /applications and POST /applications/{id}/decision require an
 * Idempotency-Key header (W0 contract); replay returns the stored response.
 * Envelope: singles { data }, lists { data, meta } (crew roster carries
 * { data: { items, summary }, meta }).
 */
@Controller()
export class ApplicationsController {
  constructor(private readonly apps: ApplicationsService) {}

  private idem(req: AuthenticatedRequest): string {
    const raw = req.headers['idempotency-key'];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (!value || value.length < 8 || value.length > 80) {
      throw new ApiError('VALIDATION_FAILED', 'Idempotency-Key header required (8–80 chars)');
    }
    return value;
  }

  // ------------------------------------------------------------- worker side

  @Post('applications')
  @HttpCode(201)
  @Roles('worker')
  async apply(
    @Req() req: AuthenticatedRequest,
    @ZodBody(applyInputSchema) body: ApplyInput,
  ) {
    const data = await this.apps.apply(authOf(req).accountIdBig, body, this.idem(req));
    return { data };
  }

  @Get('applications')
  @Roles('worker')
  mine(@Req() req: AuthenticatedRequest, @ZodQuery(myApplicationsQuerySchema) query: MyApplicationsQuery) {
    return this.apps.mine(authOf(req).accountIdBig, query); // { data, meta }
  }

  @Post('applications/:publicId/withdraw')
  @HttpCode(200)
  @Roles('worker')
  async withdraw(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @ZodBody(withdrawInputSchema) body: WithdrawInput,
  ) {
    return { data: await this.apps.withdraw(authOf(req).accountIdBig, publicId, body) };
  }

  // ---------------------------------------------------------- employer queue

  @Get('jobs/:publicId/queue')
  @Roles('employer')
  queue(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @ZodQuery(queueQuerySchema) query: QueueQuery,
  ) {
    return this.apps.queue(authOf(req).accountIdBig, publicId, query); // { data, meta }
  }

  @Post('applications/:publicId/decision')
  @HttpCode(200)
  @Roles('employer')
  async decide(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @ZodBody(applicationDecisionSchema) body: ApplicationDecision,
  ) {
    return {
      data: await this.apps.decide(authOf(req).accountIdBig, publicId, body, this.idem(req)),
    };
  }

  @Post('applications/bulk-decision')
  @HttpCode(200)
  @Roles('employer')
  async bulk(@Req() req: AuthenticatedRequest, @ZodBody(bulkDecisionSchema) body: BulkDecision) {
    return { data: await this.apps.bulk(authOf(req).accountIdBig, body) };
  }

  // ------------------------------------------------------------ H7 roster

  @Get('jobs/:publicId/crew')
  @Roles('employer')
  roster(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @ZodQuery(crewRosterQuerySchema) query: CrewRosterQuery,
  ) {
    return this.apps.roster(authOf(req).accountIdBig, publicId, query);
  }
}
