var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map