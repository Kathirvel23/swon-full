import type { NotificationsList } from '@workbridge/contracts';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class InboxService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toDto;
    list(accountId: bigint, query: {
        cursor?: string;
        limit: number;
        unread?: boolean;
        contextType?: string;
    }): Promise<NotificationsList>;
    unreadCount(accountId: bigint): Promise<{
        unread: number;
    }>;
    markRead(accountId: bigint, input: {
        ids?: string[];
        all?: boolean;
    }): Promise<{
        unread: number;
    }>;
    getPrefs(accountId: bigint): Promise<{
        pushEnabled: boolean;
        smsEnabled: boolean;
        quietHours: string | null;
    }>;
    updatePrefs(accountId: bigint, patch: {
        pushEnabled?: boolean;
        smsEnabled?: boolean;
        quietHours?: string | null;
    }): Promise<{
        pushEnabled: boolean;
        smsEnabled: boolean;
        quietHours: string | null;
    }>;
    registerPushToken(accountId: bigint, input: {
        token: string;
        platform: 'IOS' | 'ANDROID' | 'WEB';
        deviceName?: string;
    }): Promise<{
        ok: boolean;
    }>;
}
