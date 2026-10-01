var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from '../common/guards.js';
let ConfigController = class ConfigController {
    config;
    constructor(config) {
        this.config = config;
    }
    getConfig() {
        const otp = this.config.get('otp');
        return {
            data: {
                appVersionMin: '1.0.0',
                otp: {
                    cooldownSec: otp.cooldownSec,
                    expiresSec: otp.ttlSec,
                    maxAttempts: otp.maxAttempts,
                },
                quickMatch: { respondSec: 1800, waveSizeDefault: 2 },
                attendance: { tokenRotateSec: 60, tokenTtlSec: 60, graceMinutes: 30, noShowAfterHours: 24 },
                distanceBands: { bandsKm: [2, 5, 10, 25], labelFormat: 'Within {km} km' },
                features: {},
                locale: { default: 'en', supported: ['en', 'ta'] },
                kycPolicy: { requiredForHire: true, requiredForPublish: true, maxAttempts: 3 },
                maintenanceMode: false,
            },
        };
    }
};
__decorate([
    Public(),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ConfigController.prototype, "getConfig", null);
ConfigController = __decorate([
    Controller('config'),
    __metadata("design:paramtypes", [ConfigService])
], ConfigController);
export { ConfigController };
//# sourceMappingURL=config.controller.js.map