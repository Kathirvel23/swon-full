import { Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { z } from 'zod';

import { authOf, Roles, type AuthenticatedRequest } from '../common/guards.js';
import { ZodBody } from '../common/zod.js';
import { StaffService } from './staff.service.js';

/**
 * Event Attendance Manager (owner brief 2026-10-05).
 *
 * Manager routes are @Roles('worker') — the capability is NOT a global role,
 * it is re-checked per request against the event-scoped assignment row, so a
 * worker calling another event's id gets 403 (§28 / §38 tests 3-4).
 * Host routes stay @Roles('employer') and are ownership-checked.
 */

const markSchema = z.object({
  workerPublicId: z.string().min(1),
  status: z.enum(['PRESENT', 'ABSENT', 'NOT_MARKED']),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

const assignSchema = z.object({
  workerPublicId: z.string().min(1),
  incentivePct: z.number().min(0).max(100).optional(),
});

type MarkInput = z.infer<typeof markSchema>;
type AssignInput = z.infer<typeof assignSchema>;

@Controller()
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // ------------------------------------------------ worker (the manager)

  /** Events this worker manages — drives the mobile entry point. */
  @Get('me/event-staff')
  @Roles('worker')
  async myEvents(@Req() req: AuthenticatedRequest) {
    return { data: { events: await this.staffService.myEvents(authOf(req).accountId) } };
  }

  @Get('jobs/:publicId/event-attendance')
  @Roles('worker')
  async eventAttendance(
    @Param('publicId') publicId: string,
    @Query('date') date: string | undefined,
    @Req() req: AuthenticatedRequest,
  ) {
    return { data: await this.staffService.eventAttendance(authOf(req).accountId, publicId, date) };
  }

  @Post('jobs/:publicId/event-attendance/mark')
  @Roles('worker')
  async mark(
    @Param('publicId') publicId: string,
    @ZodBody(markSchema) body: MarkInput,
    @Req() req: AuthenticatedRequest,
  ) {
    return { data: await this.staffService.mark(authOf(req).accountId, publicId, body) };
  }

  @Get('jobs/:publicId/event-attendance/incentive')
  @Roles('worker')
  async incentive(@Param('publicId') publicId: string, @Req() req: AuthenticatedRequest) {
    return { data: await this.staffService.incentiveFor(authOf(req).accountId, publicId) };
  }

  // --------------------------------------------------------- host / admin

  @Get('jobs/:publicId/event-staff')
  @Roles('employer')
  async staffList(@Param('publicId') publicId: string, @Req() req: AuthenticatedRequest) {
    return { data: { staff: await this.staffService.staff(authOf(req).accountId, publicId) } };
  }

  @Post('jobs/:publicId/event-staff')
  @Roles('employer')
  async assign(
    @Param('publicId') publicId: string,
    @ZodBody(assignSchema) body: AssignInput,
    @Req() req: AuthenticatedRequest,
  ) {
    return { data: await this.staffService.assign(authOf(req).accountId, publicId, body) };
  }

  @Delete('jobs/:publicId/event-staff/:workerPublicId')
  @Roles('employer')
  async revoke(
    @Param('publicId') publicId: string,
    @Param('workerPublicId') workerPublicId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return { data: await this.staffService.revoke(authOf(req).accountId, publicId, workerPublicId) };
  }

  /** Stamp the (server-computed) incentive onto the manager's earning. */
  @Post('jobs/:publicId/event-staff/incentive/apply')
  @Roles('employer')
  async applyIncentive(@Param('publicId') publicId: string, @Req() req: AuthenticatedRequest) {
    return { data: await this.staffService.applyIncentive(authOf(req).accountId, publicId) };
  }
}
