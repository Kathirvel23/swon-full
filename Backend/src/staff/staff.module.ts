import { Module } from '@nestjs/common';

import { StaffController } from './staff.controller.js';
import { StaffService } from './staff.service.js';

/** Event Attendance Manager — event-scoped staff capability (owner brief 2026-10-05). */
@Module({
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
