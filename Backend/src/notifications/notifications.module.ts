import { Module } from '@nestjs/common';

import { DevicesController, NotificationPrefsController, NotificationsController } from './notifications.controller.js';
import { DispatcherService } from './dispatcher.service.js';
import { InboxService } from './inbox.service.js';

@Module({
  controllers: [NotificationsController, DevicesController, NotificationPrefsController],
  providers: [InboxService, DispatcherService],
  exports: [DispatcherService, InboxService],
})
export class NotificationsModule {}
