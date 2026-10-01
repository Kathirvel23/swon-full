import { Module } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module.js';

import { ApplicationsController } from './applications.controller.js';
import { ApplicationsService } from './applications.service.js';

/** H6 Application Queue & Hiring + H7 Crew roster (Wave 4). */
@Module({
  imports: [NotificationsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
