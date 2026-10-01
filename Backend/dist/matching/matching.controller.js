var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Headers, Param, Post, Query, Req } from '@nestjs/common';
import { Roles, authOf } from '../common/guards.js';
import { MatchingService } from './matching.service.js';
let MatchingController = class MatchingController {
    matching;
    constructor(matching) {
        this.matching = matching;
    }
    async candidates(req, publicId, limit, includeApplied) {
        const auth = authOf(req);
        return {
            data: await this.matching.candidates({ accountId: auth.accountIdBig, role: auth.role }, publicId, { limit, includeApplied }),
        };
    }
    async launch(req, body, idemKey) {
        const auth = authOf(req);
        return {
            data: await this.matching.launch({ accountId: auth.accountIdBig, role: auth.role }, body, idemKey),
        };
    }
    async availability(req, jobPublicId, radiusKm) {
        const auth = authOf(req);
        return {
            data: await this.matching.availability({ accountId: auth.accountIdBig, role: auth.role }, jobPublicId, radiusKm !== undefined ? Number(radiusKm) : undefined),
        };
    }
    async myOffers(req, status) {
        const auth = authOf(req);
        return {
            data: await this.matching.myOffers({ accountId: auth.accountIdBig, role: auth.role }, status || undefined),
        };
    }
    async respond(req, publicId, body) {
        const auth = authOf(req);
        return { data: await this.matching.respond({ accountId: auth.accountIdBig, role: auth.role }, publicId, body) };
    }
};
__decorate([
    Get('matching/jobs/:publicId/candidates'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Query('limit')),
    __param(3, Query('includeApplied')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], MatchingController.prototype, "candidates", null);
__decorate([
    Post('quick-match'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Headers('idempotency-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], MatchingController.prototype, "launch", null);
__decorate([
    Get('quick-match/availability'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Query('jobPublicId')),
    __param(2, Query('radiusKm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], MatchingController.prototype, "availability", null);
__decorate([
    Get('quick-match'),
    Roles('worker'),
    __param(0, Req()),
    __param(1, Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MatchingController.prototype, "myOffers", null);
__decorate([
    Post('quick-match/:publicId/respond'),
    Roles('worker'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MatchingController.prototype, "respond", null);
MatchingController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [MatchingService])
], MatchingController);
export { MatchingController };
//# sourceMappingURL=matching.controller.js.map