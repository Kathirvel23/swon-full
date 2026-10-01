var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let InboxService = class InboxService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toDto(row) {
        const bodyParams = row.bodyParams;
        return {
            publicId: row.publicId,
            eventKey: row.eventKey,
            titleKey: row.titleKey,
            bodyParams: bodyParams ?? undefined,
            context: row.contextType && row.contextPublicId
                ? {
                    type: row.contextType,
                    publicId: row.contextPublicId,
                }
                : undefined,
            readAt: row.readAt?.toISOString() ?? null,
            createdAt: row.createdAt.toISOString(),
        };
    }
    async list(accountId, query) {
        const rows = await this.prisma.notification.findMany({
            where: {
                recipientAccountId: accountId,
                ...(query.unread ? { readAt: null } : {}),
                ...(query.contextType ? { contextType: query.contextType } : {}),
                ...(query.cursor ? { id: { lt: BigInt(query.cursor) } } : {}),
            },
            orderBy: { id: 'desc' },
            take: query.limit + 1,
        });
        const hasMore = rows.length > query.limit;
        const page = hasMore ? rows.slice(0, query.limit) : rows;
        return {
            data: page.map((row) => this.toDto(row)),
            meta: {
                nextCursor: hasMore && page.length > 0 ? String(page[page.length - 1].id) : null,
                hasMore,
                limit: query.limit,
            },
        };
    }
    async unreadCount(accountId) {
        const unread = await this.prisma.notification.count({
            where: { recipientAccountId: accountId, readAt: null },
        });
        return { unread };
    }
    async markRead(accountId, input) {
        await this.prisma.notification.updateMany({
            where: {
                recipientAccountId: accountId,
                readAt: null,
                ...(input.all ? {} : { publicId: { in: input.ids ?? [] } }),
            },
            data: { readAt: new Date() },
        });
        return this.unreadCount(accountId);
    }
    async getPrefs(accountId) {
        const row = await this.prisma.notificationPref.findUnique({ where: { accountId } });
        return {
            pushEnabled: row?.pushEnabled ?? true,
            smsEnabled: row?.smsEnabled ?? true,
            quietHours: row?.quietHours ?? null,
        };
    }
    async updatePrefs(accountId, patch) {
        await this.prisma.notificationPref.upsert({
            where: { accountId },
            create: {
                accountId,
                pushEnabled: patch.pushEnabled ?? true,
                smsEnabled: patch.smsEnabled ?? true,
                quietHours: patch.quietHours ?? null,
            },
            update: {
                ...(patch.pushEnabled !== undefined ? { pushEnabled: patch.pushEnabled } : {}),
                ...(patch.smsEnabled !== undefined ? { smsEnabled: patch.smsEnabled } : {}),
                ...(patch.quietHours !== undefined ? { quietHours: patch.quietHours } : {}),
            },
        });
        return this.getPrefs(accountId);
    }
    async registerPushToken(accountId, input) {
        await this.prisma.pushToken.upsert({
            where: { accountId_token: { accountId, token: input.token } },
            update: { active: true, lastSeenAt: new Date(), platform: input.platform },
            create: { accountId, token: input.token, platform: input.platform },
        });
        return { ok: true };
    }
};
InboxService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], InboxService);
export { InboxService };
//# sourceMappingURL=inbox.service.js.map