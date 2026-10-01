import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import {
  markReadSchema,
  notificationPrefsSchema,
  notificationsQuerySchema,
  pushTokenRegisterSchema,
} from '@workbridge/contracts';

import { authOf, type AuthenticatedRequest } from '../common/guards.js';
import { ZodBody, ZodQuery } from '../common/zod.js';
import { InboxService } from './inbox.service.js';

/**
 * /notifications (§14 row 14) — in-app inbox: cursor pages, unread filter,
 * mark-read, unread count. /devices registers push tokens (M3-core).
 */
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly inbox: InboxService) {}

  @Get()
  async list(
    @ZodQuery(notificationsQuerySchema) query: Parameters<InboxService['list']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return this.inbox.list(auth.accountIdBig, query); // already { data, meta }
  }

  @Get('unread-count')
  async unreadCount(@Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { data: await this.inbox.unreadCount(auth.accountIdBig) };
  }

  @Post('read')
  async markRead(
    @ZodBody(markReadSchema) body: Parameters<InboxService['markRead']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.inbox.markRead(auth.accountIdBig, body) };
  }
}

/** §22 preferences: push/SMS mute + quiet hours (OTP SMS stays unmuteable). */
@Controller('me/notification-prefs')
export class NotificationPrefsController {
  constructor(private readonly inbox: InboxService) {}

  @Get()
  async get(@Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { data: await this.inbox.getPrefs(auth.accountIdBig) };
  }

  @Put()
  async update(
    @ZodBody(notificationPrefsSchema) body: Parameters<InboxService['updatePrefs']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.inbox.updatePrefs(auth.accountIdBig, body) };
  }
}

@Controller('devices')
export class DevicesController {
  constructor(private readonly inbox: InboxService) {}

  @Post('push-token')
  async registerPushToken(
    @ZodBody(pushTokenRegisterSchema) body: Parameters<InboxService['registerPushToken']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.inbox.registerPushToken(auth.accountIdBig, body) };
  }
}
