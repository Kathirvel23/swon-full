import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { ComplaintsService } from './complaints.service.js';
import type { ComplaintCreate, ComplaintStatusUpdate } from '@workbridge/contracts';

/**
 * Complaint routes: party-facing submit/my/reply + admin queue/decision +
 * account reinstate. Envelope convention: { data }.
 */
@Controller()
export class ComplaintsController {
  constructor(private readonly complaints: ComplaintsService) {}

  @Post('complaints')
  @Roles('worker', 'employer')
  async submit(@Req() req: AuthenticatedRequest, @Body() body: ComplaintCreate) {
    const auth = authOf(req);
    return { data: await this.complaints.submit({ accountId: auth.accountIdBig, role: auth.role }, body) };
  }

  @Get('complaints')
  @Roles('worker', 'employer')
  async my(@Req() req: AuthenticatedRequest, @Query('status') status?: string) {
    const auth = authOf(req);
    return {
      data: await this.complaints.my({ accountId: auth.accountIdBig, role: auth.role }, status || undefined),
    };
  }

  @Post('complaints/:publicId/reply')
  @Roles('worker', 'employer')
  async reply(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: { body: string; evidenceUploadTickets?: string[] },
  ) {
    const auth = authOf(req);
    return {
      data: await this.complaints.reply(
        { accountId: auth.accountIdBig, role: auth.role },
        publicId,
        body.body,
        body.evidenceUploadTickets,
      ),
    };
  }

  @Get('admin/complaints')
  @Roles('admin')
  async adminList(
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('severity') severity?: string,
    @Query('sort') sort?: string,
  ) {
    return { data: await this.complaints.adminList({ status, type, severity, sort }) };
  }

  @Post('admin/complaints/:publicId/decision')
  @Roles('admin')
  async decide(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: ComplaintStatusUpdate,
  ) {
    const auth = authOf(req);
    return {
      data: await this.complaints.decide({ accountId: auth.accountIdBig, role: auth.role }, publicId, body),
    };
  }

  @Post('admin/accounts/:publicId/reinstate')
  @Roles('admin')
  async reinstate(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: { note: string },
  ) {
    const auth = authOf(req);
    return {
      data: await this.complaints.reinstate({ accountId: auth.accountIdBig, role: auth.role }, publicId, body.note),
    };
  }
}
