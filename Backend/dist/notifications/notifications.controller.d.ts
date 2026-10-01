import { type AuthenticatedRequest } from '../common/guards.js';
import { InboxService } from './inbox.service.js';
export declare class NotificationsController {
    private readonly inbox;
    constructor(inbox: InboxService);
    list(query: Parameters<InboxService['list']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            publicId: string;
            eventKey: string;
            titleKey: string;
            createdAt: string;
            bodyParams?: Record<string, string | number | boolean> | null | undefined;
            context?: {
                type: "ACCOUNT" | "JOB" | "APPLICATION" | "EARNING" | "KYC" | "COMPLAINT";
                publicId: string;
            } | null | undefined;
            readAt?: string | null | undefined;
        }[];
        meta: {
            hasMore: boolean;
            limit: number;
            nextCursor?: string | null | undefined;
        };
    }>;
    unreadCount(req: AuthenticatedRequest): Promise<{
        data: {
            unread: number;
        };
    }>;
    markRead(body: Parameters<InboxService['markRead']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            unread: number;
        };
    }>;
}
export declare class NotificationPrefsController {
    private readonly inbox;
    constructor(inbox: InboxService);
    get(req: AuthenticatedRequest): Promise<{
        data: {
            pushEnabled: boolean;
            smsEnabled: boolean;
            quietHours: string | null;
        };
    }>;
    update(body: Parameters<InboxService['updatePrefs']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            pushEnabled: boolean;
            smsEnabled: boolean;
            quietHours: string | null;
        };
    }>;
}
export declare class DevicesController {
    private readonly inbox;
    constructor(inbox: InboxService);
    registerPushToken(body: Parameters<InboxService['registerPushToken']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            ok: boolean;
        };
    }>;
}
