import { Module } from '@nestjs/common';

import { ApplicationsModule } from '../applications/applications.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { MatchingController } from './matching.controller.js';
import { MatchingService } from './matching.service.js';

/** H5 matching: §16 candidates + Quick Match wave (offers → application). */
@Module({
  imports: [PrismaModule, NotificationsModule, ApplicationsModule],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
