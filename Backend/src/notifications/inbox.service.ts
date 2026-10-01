import { Injectable } from '@nestjs/common';
import type { NotificationDto, NotificationsList } from '@workbridge/contracts';

import { PrismaService } from '../prisma/prisma.service.js';

/**
 * In-app inbox (M3-core, §14 row 14): cursor pages, unread filter, mark-read,
 * device push-token registration. INAPP is the system of record (§22).
 */
@Injectable()
export class InboxService {
  constructor(private readonly prisma: PrismaService) {}

  private toDto(row: {
    publicId: string;
    eventKey: string;
    titleKey: string;
    bodyParams: unknown;
    contextType: string | null;
    contextPublicId: string | null;
    readAt: Date | null;
    createdAt: Date;
  }): NotificationDto {
    const bodyParams = row.bodyParams as Record<string, string | number | boolean> | null;
    return {
      publicId: row.publicId,
      eventKey: row.eventKey as NotificationDto['eventKey'],
      titleKey: row.titleKey,
      bodyParams: bodyParams ?? undefined,
      context:
        row.contextType && row.contextPublicId
          ? {
              type: row.contextType as NonNullable<NotificationDto['context']>['type'],
              publicId: row.contextPublicId,
            }
          : undefined,
      readAt: row.readAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
    };
  }

  async list(
    accountId: bigint,
    query: { cursor?: string; limit: number; unread?: boolean; contextType?: string },
  ): Promise<NotificationsList> {
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

  async unreadCount(accountId: bigint) {
    const unread = await this.prisma.notification.count({
      where: { recipientAccountId: accountId, readAt: null },
    });
    return { unread };
  }

  async markRead(accountId: bigint, input: { ids?: string[]; all?: boolean }) {
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

  /** Device push token (M3-core registration; push delivery = dev-sim until a device build). */
  /** §22 prefs: defaults live in the schema; a missing row means defaults. */
  async getPrefs(accountId: bigint) {
    const row = await this.prisma.notificationPref.findUnique({ where: { accountId } });
    return {
      pushEnabled: row?.pushEnabled ?? true,
      smsEnabled: row?.smsEnabled ?? true,
      quietHours: row?.quietHours ?? null,
    };
  }

  async updatePrefs(
    accountId: bigint,
    patch: { pushEnabled?: boolean; smsEnabled?: boolean; quietHours?: string | null },
  ) {
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

  async registerPushToken(
    accountId: bigint,
    input: { token: string; platform: 'IOS' | 'ANDROID' | 'WEB'; deviceName?: string },
  ) {
    await this.prisma.pushToken.upsert({
      where: { accountId_token: { accountId, token: input.token } },
      update: { active: true, lastSeenAt: new Date(), platform: input.platform },
      create: { accountId, token: input.token, platform: input.platform },
    });
    return { ok: true };
  }
}
