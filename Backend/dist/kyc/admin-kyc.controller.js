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
import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { kycDecideSchema, kycQueueQuerySchema } from '@workbridge/contracts';
import { authOf, Roles } from '../common/guards.js';
import { ZodBody, ZodQuery } from '../common/zod.js';
import { KycService } from './kyc.service.js';
let AdminKycController = class AdminKycController {
    kyc;
    constructor(kyc) {
        this.kyc = kyc;
    }
    async queue(query) {
        return this.kyc.adminQueue(query);
    }
    async pick(publicId) {
        return { data: await this.kyc.adminPick(publicId) };
    }
    async viewDocument(publicId, docType, req, res) {
        const auth = authOf(req);
        const { buffer, mime } = await this.kyc.adminViewDocument(publicId, docType, auth.accountIdBig);
        res.setHeader('Content-Type', mime || 'application/octet-stream');
        res.setHeader('Content-Disposition', `inline; filename="${docType.toLowerCase()}"`);
        res.send(buffer);
    }
    async decide(publicId, body, req) {
        const auth = authOf(req);
        return { data: await this.kyc.adminDecide(auth.accountIdBig, publicId, body) };
    }
};
__decorate([
    Get(),
    Roles('admin'),
    __param(0, ZodQuery(kycQueueQuerySchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "queue", null);
__decorate([
    Get(':publicId'),
    Roles('admin'),
    __param(0, Param('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "pick", null);
__decorate([
    Get(':publicId/documents/:docType'),
    Roles('admin'),
    __param(0, Param('publicId')),
    __param(1, Param('docType')),
    __param(2, Req()),
    __param(3, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "viewDocument", null);
__decorate([
    Post(':publicId/decision'),
    Roles('admin'),
    __param(0, Param('publicId')),
    __param(1, ZodBody(kycDecideSchema)),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "decide", null);
AdminKycController = __decorate([
    Controller('admin/kyc'),
    __metadata("design:paramtypes", [KycService])
], AdminKycController);
export { AdminKycController };
//# sourceMappingURL=admin-kyc.controller.js.map