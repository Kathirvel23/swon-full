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
import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { markReadSchema, notificationPrefsSchema, notificationsQuerySchema, pushTokenRegisterSchema, } from '@workbridge/contracts';
import { authOf } from '../common/guards.js';
import { ZodBody, ZodQuery } from '../common/zod.js';
import { InboxService } from './inbox.service.js';
let NotificationsController = class NotificationsController {
    inbox;
    constructor(inbox) {
        this.inbox = inbox;
    }
    async list(query, req) {
        const auth = authOf(req);
        return this.inbox.list(auth.accountIdBig, query);
    }
    async unreadCount(req) {
        const auth = authOf(req);
        return { data: await this.inbox.unreadCount(auth.accountIdBig) };
    }
    async markRead(body, req) {
        const auth = authOf(req);
        return { data: await this.inbox.markRead(auth.accountIdBig, body) };
    }
};
__decorate([
    Get(),
    __param(0, ZodQuery(notificationsQuerySchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "list", null);
__decorate([
    Get('unread-count'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "unreadCount", null);
__decorate([
    Post('read'),
    __param(0, ZodBody(markReadSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markRead", null);
NotificationsController = __decorate([
    Controller('notifications'),
    __metadata("design:paramtypes", [InboxService])
], NotificationsController);
export { NotificationsController };
let NotificationPrefsController = class NotificationPrefsController {
    inbox;
    constructor(inbox) {
        this.inbox = inbox;
    }
    async get(req) {
        const auth = authOf(req);
        return { data: await this.inbox.getPrefs(auth.accountIdBig) };
    }
    async update(body, req) {
        const auth = authOf(req);
        return { data: await this.inbox.updatePrefs(auth.accountIdBig, body) };
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationPrefsController.prototype, "get", null);
__decorate([
    Put(),
    __param(0, ZodBody(notificationPrefsSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationPrefsController.prototype, "update", null);
NotificationPrefsController = __decorate([
    Controller('me/notification-prefs'),
    __metadata("design:paramtypes", [InboxService])
], NotificationPrefsController);
export { NotificationPrefsController };
let DevicesController = class DevicesController {
    inbox;
    constructor(inbox) {
        this.inbox = inbox;
    }
    async registerPushToken(body, req) {
        const auth = authOf(req);
        return { data: await this.inbox.registerPushToken(auth.accountIdBig, body) };
    }
};
__decorate([
    Post('push-token'),
    __param(0, ZodBody(pushTokenRegisterSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "registerPushToken", null);
DevicesController = __decorate([
    Controller('devices'),
    __metadata("design:paramtypes", [InboxService])
], DevicesController);
export { DevicesController };
//# sourceMappingURL=notifications.controller.js.map