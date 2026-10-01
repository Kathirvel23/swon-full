import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

import { Roles, authOf, type AuthenticatedRequest } from '../common/guards.js';
import { AttendanceService } from './attendance.service.js';
import type { AttendanceCheck, CorrectAttendance } from '@workbridge/contracts';

/**
 * Attendance routes (§12.3): QR token issue, check-in/out (scan or manual),
 * employer roster, day approval, corrections. Envelope convention: singles
 * as { data }. Role literals are lowercase — the RolesGuard compares them
 * case-sensitively against the JWT role.
 */
@Controller()
export class AttendanceController {
  constructor(private readonly attendance: AttendanceService) {}

  @Post('jobs/:publicId/attendance/token')
  @Roles('employer')
  async issue(
    @Req() req: AuthenticatedRequest,
    @Param('publicId') publicId: string,
    @Body() body: { date?: string } | undefined,
  ) {
    return { data: await this.attendance.issueToken(authOf(req).accountIdBig, publicId, body?.date) };
  }

  @Get('attendance/today')
  @Roles('worker', 'admin')
  async today(@Req() req: AuthenticatedRequest) {
    return { data: await this.attendance.today(authOf(req).accountIdBig) };
  }

  @Post('attendance/check')
  @Roles('worker', 'employer')
  async check(@Req() req: AuthenticatedRequest, @Body() body: AttendanceCheck) {
    return { data: await this.attendance.check(authOf(req).accountIdBig, body) };
  }

  @Get('jobs/:publicId/roster')
  @Roles('employer')
  async roster(@Req() req: AuthenticatedRequest, @Param('publicId') publicId: string, @Query('date') date?: string) {
    return { data: await this.attendance.roster(authOf(req).accountIdBig, publicId, date) };
  }

  @Post('attendance/approve')
  @Roles('employer')
  async approve(@Req() req: AuthenticatedRequest, @Body() body: { recordIds: string[] }) {
    return { data: await this.attendance.approve(authOf(req).accountIdBig, body.recordIds) };
  }

  @Post('attendance/:recordId/correct')
  @Roles('employer', 'admin')
  async correct(@Req() req: AuthenticatedRequest, @Param('recordId') recordId: string, @Body() body: CorrectAttendance) {
    const auth = authOf(req);
    const role = auth.role === 'admin' ? 'ADMIN' : 'EMPLOYER';
    return { data: await this.attendance.correct(auth.accountIdBig, recordId, body, role) };
  }
}
