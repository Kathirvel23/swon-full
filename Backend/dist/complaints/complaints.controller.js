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
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Roles, authOf } from '../common/guards.js';
import { ComplaintsService } from './complaints.service.js';
let ComplaintsController = class ComplaintsController {
    complaints;
    constructor(complaints) {
        this.complaints = complaints;
    }
    async submit(req, body) {
        const auth = authOf(req);
        return { data: await this.complaints.submit({ accountId: auth.accountIdBig, role: auth.role }, body) };
    }
    async my(req, status) {
        const auth = authOf(req);
        return {
            data: await this.complaints.my({ accountId: auth.accountIdBig, role: auth.role }, status || undefined),
        };
    }
    async reply(req, publicId, body) {
        const auth = authOf(req);
        return {
            data: await this.complaints.reply({ accountId: auth.accountIdBig, role: auth.role }, publicId, body.body, body.evidenceUploadTickets),
        };
    }
    async adminList(status, type, severity, sort) {
        return { data: await this.complaints.adminList({ status, type, severity, sort }) };
    }
    async decide(req, publicId, body) {
        const auth = authOf(req);
        return {
            data: await this.complaints.decide({ accountId: auth.accountIdBig, role: auth.role }, publicId, body),
        };
    }
    async reinstate(req, publicId, body) {
        const auth = authOf(req);
        return {
            data: await this.complaints.reinstate({ accountId: auth.accountIdBig, role: auth.role }, publicId, body.note),
        };
    }
};
__decorate([
    Post('complaints'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "submit", null);
__decorate([
    Get('complaints'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __param(1, Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "my", null);
__decorate([
    Post('complaints/:publicId/reply'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "reply", null);
__decorate([
    Get('admin/complaints'),
    Roles('admin'),
    __param(0, Query('status')),
    __param(1, Query('type')),
    __param(2, Query('severity')),
    __param(3, Query('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "adminList", null);
__decorate([
    Post('admin/complaints/:publicId/decision'),
    Roles('admin'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "decide", null);
__decorate([
    Post('admin/accounts/:publicId/reinstate'),
    Roles('admin'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "reinstate", null);
ComplaintsController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [ComplaintsService])
], ComplaintsController);
export { ComplaintsController };
//# sourceMappingURL=complaints.controller.js.map