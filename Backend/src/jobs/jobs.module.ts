import { Module } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module.js';
import { PaymentsModule } from '../payments/payments.module.js';

import { AdminJobsController, JobsController } from './jobs.controller.js';
import { JobsService } from './jobs.service.js';
import { WelfareController } from '../welfare/welfare.controller.js';
import { WelfareService } from '../welfare/welfare.service.js';

@Module({
  imports: [NotificationsModule, PaymentsModule],
  controllers: [JobsController, AdminJobsController, WelfareController],
  providers: [JobsService, WelfareService],
  exports: [JobsService],
})
export class JobsModule {}
