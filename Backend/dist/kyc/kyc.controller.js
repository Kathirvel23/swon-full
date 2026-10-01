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
import { BadRequestException, Controller, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { kycSubmitInputSchema, kycUploadTicketInputSchema } from '@workbridge/contracts';
import { authOf } from '../common/guards.js';
import { ZodBody } from '../common/zod.js';
import { KycService } from './kyc.service.js';
const MAX_KYC_FILE_BYTES = 5 * 1024 * 1024;
let KycController = class KycController {
    kyc;
    constructor(kyc) {
        this.kyc = kyc;
    }
    async active(req) {
        const auth = authOf(req);
        return { data: await this.kyc.getActive(auth.accountIdBig) };
    }
    async create(body, req) {
        const auth = authOf(req);
        return { data: await this.kyc.create(auth.accountIdBig, body, { ip: req.ip }) };
    }
    async ticket(body, req) {
        const auth = authOf(req);
        return { data: await this.kyc.issueTicket(auth.accountIdBig, body.docType, originOf(req)) };
    }
    async upload(ticket, file, req) {
        if (!file)
            throw new BadRequestException('Attach the document as multipart field "file"');
        const auth = authOf(req);
        return { data: await this.kyc.saveDocument(auth.accountIdBig, ticket, file) };
    }
    async submit(req) {
        const auth = authOf(req);
        return { data: await this.kyc.submit(auth.accountIdBig) };
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "active", null);
__decorate([
    Post(),
    __param(0, ZodBody(kycSubmitInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "create", null);
__decorate([
    Post('documents/upload-ticket'),
    __param(0, ZodBody(kycUploadTicketInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "ticket", null);
__decorate([
    Put('upload/:ticket'),
    UseInterceptors(FileInterceptor('file', {
        limits: { fileSize: MAX_KYC_FILE_BYTES },
        fileFilter: (_req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
                cb(new BadRequestException('Only images are allowed'), false);
                return;
            }
            cb(null, true);
        },
    })),
    __param(0, Param('ticket')),
    __param(1, UploadedFile()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "upload", null);
__decorate([
    Post('submit'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "submit", null);
KycController = __decorate([
    Controller('kyc'),
    __metadata("design:paramtypes", [KycService])
], KycController);
export { KycController };
function originOf(req) {
    const proto = req.headers['x-forwarded-proto'] ?? req.protocol ?? 'http';
    const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost';
    return `${proto}://${host}`;
}
//# sourceMappingURL=kyc.controller.js.map