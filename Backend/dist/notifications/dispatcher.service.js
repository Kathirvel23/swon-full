var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DispatcherService_1;
import { Injectable, Logger } from '@nestjs/common';
import { NOTIFICATION_EVENTS } from '@workbridge/contracts';
import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { channelsFor } from './channels.js';
let DispatcherService = DispatcherService_1 = class DispatcherService {
    prisma;
    logger = new Logger(DispatcherService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async enqueue(input) {
        const def = NOTIFICATION_EVENTS[input.eventKey];
        if (!def)
            throw new ApiError('VALIDATION_FAILED', `Unknown notification event: ${input.eventKey}`);
        if (input.recipientAccountIds.length === 0)
            return;
        for (const recipient of input.recipientAccountIds) {
            const dedupeKey = `${input.eventKey}:${input.contextType ?? '-'}:${input.contextPublicId ?? '-'}:${recipient}`;
            const payload = {
                titleKey: def.titleKey,
                recipientAccountIds: [recipient.toString()],
                ...(input.contextType ? { contextType: input.contextType } : {}),
                ...(input.contextPublicId ? { contextPublicId: input.contextPublicId } : {}),
                ...(input.args ? { args: input.args } : {}),
            };
            try {
                await this.prisma.notificationOutbox.create({
                    data: { eventKey: input.eventKey, dedupeKey, payload: payload },
                });
            }
            catch (e) {
                if (e.code === 'P2002')
                    continue;
                throw e;
            }
        }
        await this.dispatchPending();
    }
    async dispatchPending(limit = 50) {
        const rows = await this.prisma.notificationOutbox.findMany({
            where: { status: 'PENDING' },
            orderBy: { id: 'asc' },
            take: limit,
        });
        let processed = 0;
        for (const row of rows) {
            const claimed = await this.prisma.notificationOutbox.updateMany({
                where: { id: row.id, status: 'PENDING' },
                data: { status: 'SENDING', attempts: { increment: 1 } },
            });
            if (claimed.count === 0)
                continue;
            try {
                const payload = row.payload;
                for (const rid of payload.recipientAccountIds ?? []) {
                    const accountId = BigInt(rid);
                    const prefs = await this.prisma.notificationPref.findUnique({ where: { accountId } });
                    const plan = channelsFor(row.eventKey, {
                        pushEnabled: prefs?.pushEnabled ?? true,
                        smsEnabled: prefs?.smsEnabled ?? true,
                    });
                    for (const channel of plan) {
                        const delivery = await this.prisma.notificationDelivery.create({
                            data: { outboxId: row.id, recipientAccountId: accountId, channel },
                        });
                        let providerRef = null;
                        if (channel === 'INAPP') {
                            await this.prisma.notification.create({
                                data: {
                                    recipientAccountId: accountId,
                                    eventKey: row.eventKey,
                                    titleKey: payload.titleKey,
                                    ...(payload.args ? { bodyParams: payload.args } : {}),
                                    ...(payload.contextType ? { contextType: payload.contextType } : {}),
                                    ...(payload.contextPublicId ? { contextPublicId: payload.contextPublicId } : {}),
                                },
                            });
                            providerRef = 'inapp';
                        }
                        else if (channel === 'PUSH') {
                            providerRef = 'push-dev-sim';
                            this.logger.debug(`PUSH(dev-sim) ${row.eventKey} → account ${accountId}`);
                        }
                        else {
                            providerRef = 'sms-dev-sim';
                            this.logger.debug(`SMS(dev-sim) ${row.eventKey} → account ${accountId}`);
                        }
                        await this.prisma.notificationDelivery.update({
                            where: { id: delivery.id },
                            data: { status: 'SENT', providerRef, attemptedAt: new Date() },
                        });
                    }
                }
                await this.prisma.notificationOutbox.update({
                    where: { id: row.id },
                    data: { status: 'SENT' },
                });
                processed += 1;
            }
            catch (e) {
                const attempts = row.attempts + 1;
                const dead = attempts >= 3;
                this.logger.error(`outbox ${row.id} failed (attempt ${attempts})`, e instanceof Error ? e.message : String(e));
                await this.prisma.notificationOutbox.update({
                    where: { id: row.id },
                    data: {
                        status: dead ? 'DEAD' : 'PENDING',
                        nextAttemptAt: dead ? null : new Date(Date.now() + 60_000 * attempts),
                    },
                });
            }
        }
        return processed;
    }
};
DispatcherService = DispatcherService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], DispatcherService);
export { DispatcherService };
//# sourceMappingURL=dispatcher.service.js.map