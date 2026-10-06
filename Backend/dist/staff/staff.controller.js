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
import { Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { z } from 'zod';
import { authOf, Roles } from '../common/guards.js';
import { ZodBody } from '../common/zod.js';
import { StaffService } from './staff.service.js';
const markSchema = z.object({
    workerPublicId: z.string().min(1),
    status: z.enum(['PRESENT', 'ABSENT', 'NOT_MARKED']),
    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
});
const assignSchema = z.object({
    workerPublicId: z.string().min(1),
    incentivePct: z.number().min(0).max(100).optional(),
});
let StaffController = class StaffController {
    staffService;
    constructor(staffService) {
        this.staffService = staffService;
    }
    async myEvents(req) {
        return { data: { events: await this.staffService.myEvents(authOf(req).accountId) } };
    }
    async eventAttendance(publicId, date, req) {
        return { data: await this.staffService.eventAttendance(authOf(req).accountId, publicId, date) };
    }
    async mark(publicId, body, req) {
        return { data: await this.staffService.mark(authOf(req).accountId, publicId, body) };
    }
    async incentive(publicId, req) {
        return { data: await this.staffService.incentiveFor(authOf(req).accountId, publicId) };
    }
    async staffList(publicId, req) {
        return { data: { staff: await this.staffService.staff(authOf(req).accountId, publicId) } };
    }
    async assign(publicId, body, req) {
        return { data: await this.staffService.assign(authOf(req).accountId, publicId, body) };
    }
    async revoke(publicId, workerPublicId, req) {
        return { data: await this.staffService.revoke(authOf(req).accountId, publicId, workerPublicId) };
    }
    async applyIncentive(publicId, req) {
        return { data: await this.staffService.applyIncentive(authOf(req).accountId, publicId) };
    }
};
__decorate([
    Get('me/event-staff'),
    Roles('worker'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "myEvents", null);
__decorate([
    Get('jobs/:publicId/event-attendance'),
    Roles('worker'),
    __param(0, Param('publicId')),
    __param(1, Query('date')),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "eventAttendance", null);
__decorate([
    Post('jobs/:publicId/event-attendance/mark'),
    Roles('worker'),
    __param(0, Param('publicId')),
    __param(1, ZodBody(markSchema)),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "mark", null);
__decorate([
    Get('jobs/:publicId/event-attendance/incentive'),
    Roles('worker'),
    __param(0, Param('publicId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "incentive", null);
__decorate([
    Get('jobs/:publicId/event-staff'),
    Roles('employer'),
    __param(0, Param('publicId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "staffList", null);
__decorate([
    Post('jobs/:publicId/event-staff'),
    Roles('employer'),
    __param(0, Param('publicId')),
    __param(1, ZodBody(assignSchema)),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "assign", null);
__decorate([
    Delete('jobs/:publicId/event-staff/:workerPublicId'),
    Roles('employer'),
    __param(0, Param('publicId')),
    __param(1, Param('workerPublicId')),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "revoke", null);
__decorate([
    Post('jobs/:publicId/event-staff/incentive/apply'),
    Roles('employer'),
    __param(0, Param('publicId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "applyIncentive", null);
StaffController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [StaffService])
], StaffController);
export { StaffController };
//# sourceMappingURL=staff.controller.js.map