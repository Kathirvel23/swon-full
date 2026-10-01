import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, Req } from '@nestjs/common';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { AdminService, type SanctionInput } from './admin.service.js';

/**
 * Admin oversight routes (all admin-role): dashboard stats, audit trail,
 * account search + sanctions, jobs moderation, payments oversight,
 * platform_config. Envelope convention: { data }.
 */
@Controller('admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  private caller(req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { accountId: auth.accountIdBig, role: auth.role };
  }

  @Get('stats')
  @Roles('admin')
  async stats() {
    return { data: await this.admin.stats() };
  }

  @Get('audit')
  @Roles('admin')
  async audit(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('action') action?: string,
    @Query('entityType') entityType?: string,
    @Query('entityPublicId') entityPublicId?: string,
  ) {
    return this.admin.auditList({ limit, offset, action, entityType, entityPublicId }); // already { data, meta }
  }

  @Get('accounts')
  @Roles('admin')
  async accounts(@Query('query') query?: string, @Query('status') status?: string, @Query('role') role?: string) {
    return { data: await this.admin.searchAccounts(query, status, role) };
  }

  @Get('accounts/:publicId')
  @Roles('admin')
  async accountDetail(@Param('publicId') publicId: string) {
    return { data: await this.admin.accountDetail(publicId) };
  }

  @Post('accounts/:publicId/sanctions')
  @Roles('admin')
  async sanction(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: SanctionInput,
  ) {
    return { data: await this.admin.sanction(this.caller(req), publicId, body) };
  }

  @Get('jobs')
  @Roles('admin')
  async jobs(@Query('status') status?: string, @Query('hidden') hidden?: string, @Query('query') query?: string) {
    return { data: await this.admin.jobsList({ status, hidden, query }) };
  }

  @Post('jobs/:publicId/hide')
  @HttpCode(200)
  @Roles('admin')
  async hide(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: { reason?: string },
  ) {
    return { data: await this.admin.hideJob(this.caller(req), publicId, body.reason ?? '') };
  }

  @Post('jobs/:publicId/restore')
  @HttpCode(200)
  @Roles('admin')
  async restore(@Req() req: AuthenticatedRequest, @Param('publicId') publicId: string) {
    return { data: await this.admin.restoreJob(this.caller(req), publicId) };
  }

  @Get('payments/overview')
  @Roles('admin')
  async payments() {
    return { data: await this.admin.paymentsOverview() };
  }

  @Post('payments/earnings/:publicId/release-hold')
  @HttpCode(200)
  @Roles('admin')
  async releaseHold(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: { reason?: string },
  ) {
    return { data: await this.admin.releaseHold(this.caller(req), publicId, body.reason ?? '') };
  }

  @Get('config')
  @Roles('admin')
  async config() {
    return { data: await this.admin.configList() };
  }

  @Put('config/:key')
  @Roles('admin')
  async configSet(
    @Req() req: AuthenticatedRequest,
    @Param('key') key: string,
    @Body() body: { value?: unknown },
  ) {
    return { data: await this.admin.configSet(this.caller(req), key, body.value) };
  }
}
