import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Req } from '@nestjs/common';
import {
  jobCancelSchema,
  jobCreateSchema,
  jobMineQuerySchema,
  jobPatchSchema,
  jobSearchSchema,
  type JobCancel,
  type JobCreate,
  type JobMineQuery,
  type JobPatch,
  type JobSearch,
} from '@workbridge/contracts';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { ZodBody, ZodQuery } from '../common/zod.js';

import { JobsService } from './jobs.service.js';

/**
 * /jobs — employer lifecycle commands (H4) + worker discovery feed (H5).
 * Mutations: @Roles('employer') + ownership inside the service.
 * Feed/detail: any signed-in role; eligibility badges for worker viewers.
 * Envelope convention (auth/kyc precedent): singles as { data }, lists as
 * { data, meta } straight from the service.
 */
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobs: JobsService) {}

  @Post()
  @Roles('employer')
  async create(@Req() req: AuthenticatedRequest, @ZodBody(jobCreateSchema) body: JobCreate) {
    return { data: await this.jobs.create(authOf(req).accountIdBig, body) };
  }

  @Patch(':publicId')
  @Roles('employer')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @ZodBody(jobPatchSchema) body: JobPatch,
  ) {
    return { data: await this.jobs.update(authOf(req).accountIdBig, publicId, body) };
  }

  @Get('mine')
  @Roles('employer')
  mine(@Req() req: AuthenticatedRequest, @ZodQuery(jobMineQuerySchema) query: JobMineQuery) {
    return this.jobs.mine(authOf(req).accountIdBig, query); // already { data, meta }
  }

  @Post(':publicId/publish')
  @HttpCode(201)
  @Roles('employer')
  async publish(@Req() req: AuthenticatedRequest, @Param('publicId') publicId: string) {
    return { data: await this.jobs.publish(authOf(req).accountIdBig, publicId) };
  }

  @Post(':publicId/cancel')
  @HttpCode(201)
  @Roles('employer')
  async cancel(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @ZodBody(jobCancelSchema) body: JobCancel,
  ) {
    return { data: await this.jobs.cancel(authOf(req).accountIdBig, publicId, body) };
  }

  @Post(':publicId/complete')
  @HttpCode(201)
  @Roles('employer')
  async complete(@Req() req: AuthenticatedRequest, @Param('publicId') publicId: string) {
    return { data: await this.jobs.complete(authOf(req).accountIdBig, publicId) };
  }

  @Delete(':publicId')
  @Roles('employer')
  async remove(@Req() req: AuthenticatedRequest, @Param('publicId') publicId: string) {
    return { data: await this.jobs.remove(authOf(req).accountIdBig, publicId) };
  }

  @Get()
  feed(@Req() req: AuthenticatedRequest, @ZodQuery(jobSearchSchema) query: JobSearch) {
    return this.jobs.feed(authOf(req).accountIdBig, query); // already { data, meta }
  }

  @Get(':publicId')
  async detail(@Req() req: AuthenticatedRequest, @Param('publicId') publicId: string) {
    return { data: await this.jobs.detail(authOf(req).accountIdBig, publicId) };
  }
}

/** J10 system sweep — admin-triggered (an hourly sweep also runs in-process). */
@Controller('admin/jobs')
export class AdminJobsController {
  constructor(private readonly jobs: JobsService) {}

  @Post('expire-sweep')
  @HttpCode(200)
  @Roles('admin')
  async sweep() {
    return { data: await this.jobs.expireSweep() };
  }
}
