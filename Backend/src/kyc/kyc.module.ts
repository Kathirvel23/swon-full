import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module.js';

import { AdminKycController } from './admin-kyc.controller.js';
import { KycController } from './kyc.controller.js';
import { KycService } from './kyc.service.js';

@Module({
  imports: [NotificationsModule],
  controllers: [KycController, AdminKycController],
  providers: [KycService],
  exports: [KycService],
})
export class KycModule {}
