import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module.js';
import configuration from './config/configuration.js';
import { HealthModule } from './health/health.module.js';
import { JobsModule } from './jobs/jobs.module.js';
import { ApplicationsModule } from './applications/applications.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { RatingsModule } from './ratings/ratings.module.js';
import { MatchingModule } from './matching/matching.module.js';
import { AdminModule } from './admin/admin.module.js';
import { ComplaintsModule } from './complaints/complaints.module.js';
import { KycModule } from './kyc/kyc.module.js';
import { CatalogController } from './meta/catalog.controller.js';
import { ConfigController } from './meta/config.controller.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProfilesModule } from './profiles/profiles.module.js';

/**
 * Root module. Wave wiring (execution plan §7): W1 Prisma/Auth/Profiles +
 * /config + /catalog; W2 KYC + notifications (inbox/outbox/devices).
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PrismaModule,
    HealthModule,
    AuthModule,
    ProfilesModule,
    NotificationsModule,
    KycModule,
    JobsModule,
    ApplicationsModule,
    AttendanceModule,
    PaymentsModule,
    RatingsModule,
    MatchingModule,
    ComplaintsModule,
    AdminModule,
  ],
  controllers: [ConfigController, CatalogController],
})
export class AppModule {}
