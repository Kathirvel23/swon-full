import { type AuthenticatedRequest } from '../common/guards.js';
import { AdminService, type SanctionInput } from './admin.service.js';
export declare class AdminController {
    private readonly admin;
    constructor(admin: AdminService);
    private caller;
    stats(): Promise<{
        data: {
            accounts: number;
            workers: number;
            employers: number;
            suspended: number;
            openJobs: number;
            hiddenJobs: number;
            openComplaints: number;
            pendingKyc: number;
            unpaidEarnings: number;
            heldEarnings: number;
        };
    }>;
    audit(limit?: string, offset?: string, action?: string, entityType?: string, entityPublicId?: string): Promise<{
        data: {
            id: string;
            at: string;
            action: string;
            entityType: string;
            entityPublicId: string;
            actorRole: string | null;
            actor: {
                publicId: string;
                role: string | null;
                phone: string;
            } | null;
            requestId: string | null;
            beforeJson: string | number | boolean | import("@prisma/client/runtime/client").JsonObject | import("@prisma/client/runtime/client").JsonArray | null;
            afterJson: string | number | boolean | import("@prisma/client/runtime/client").JsonObject | import("@prisma/client/runtime/client").JsonArray | null;
        }[];
        meta: {
            count: number;
            limit: number;
            offset: number;
        };
    }>;
    accounts(query?: string, status?: string, role?: string): Promise<{
        data: {
            publicId: string;
            phone: string;
            role: string | null;
            status: string;
            createdAt: string;
            lastLoginAt: string | null;
            name: string | null;
            activeSanctions: {
                type: string;
                reason: string;
                createdAt: string;
            }[];
        }[];
    }>;
    accountDetail(publicId: string): Promise<{
        data: {
            publicId: string;
            phone: string;
            role: string | null;
            status: string;
            createdAt: string;
            lastLoginAt: string | null;
            phoneVerifiedAt: string | null;
            name: string | null;
            activeSessions: number;
            sanctions: {
                type: string;
                reason: string;
                startsAt: string;
                endsAt: string | null;
                liftedAt: string | null;
                createdAt: string;
            }[];
            recentAudit: {
                at: string;
                action: string;
                entityType: string;
            }[];
        };
    }>;
    sanction(req: AuthenticatedRequest, publicId: string, body: SanctionInput): Promise<{
        data: {
            publicId: string;
            status: string;
            sanction: {
                type: "WARN" | "SUSPEND" | "BAN";
                reason: string;
            };
        };
    }>;
    jobs(status?: string, hidden?: string, query?: string): Promise<{
        data: {
            publicId: string;
            title: string;
            city: string;
            status: string;
            headcountRequired: number;
            hiredCount: number;
            applicationCount: number;
            payAmountPaise: string;
            payType: string;
            employerName: string;
            hiddenAt: string | null;
            hiddenReason: string | null;
            startsOn: string;
            createdAt: string;
        }[];
    }>;
    hide(req: AuthenticatedRequest, publicId: string, body: {
        reason?: string;
    }): Promise<{
        data: {
            publicId: string;
            hidden: boolean;
        };
    }>;
    restore(req: AuthenticatedRequest, publicId: string): Promise<{
        data: {
            publicId: string;
            hidden: boolean;
        };
    }>;
    payments(): Promise<{
        data: {
            awaitingPayment: {
                publicId: string;
                amountPaise: string;
                status: string;
                job: {
                    publicId: string;
                    title: string;
                };
                workerFullName: string;
                holdComplaint: {
                    publicId: string;
                    type: string;
                    status: string;
                } | null;
                approvedAt: string | null;
                updatedAt: string;
            }[];
            onHold: {
                publicId: string;
                amountPaise: string;
                status: string;
                job: {
                    publicId: string;
                    title: string;
                };
                workerFullName: string;
                holdComplaint: {
                    publicId: string;
                    type: string;
                    status: string;
                } | null;
                approvedAt: string | null;
                updatedAt: string;
            }[];
            recentTransactions: {
                publicId: string;
                status: string;
                amountPaise: string;
                reference: string;
                paidAt: string | null;
                createdAt: string;
                earnings: {
                    earningPublicId: string;
                    status: string;
                }[];
            }[];
        };
    }>;
    releaseHold(req: AuthenticatedRequest, publicId: string, body: {
        reason?: string;
    }): Promise<{
        data: {
            publicId: string;
            status: "APPROVED";
        };
    }>;
    config(): Promise<{
        data: {
            flags: {
                key: string;
                valueJson: import("@prisma/client/runtime/client").JsonValue;
                scope: string;
                version: number;
                updatedAt: string;
            }[];
            matchWeights: {
                version: number;
                weights: {
                    readonly proximity: 25;
                    readonly skill: 25;
                    readonly reliability: 15;
                    readonly rating: 15;
                    readonly recency: 10;
                    readonly availability: 5;
                    readonly overlap: 5;
                };
            };
        };
    }>;
    configSet(req: AuthenticatedRequest, key: string, body: {
        value?: unknown;
    }): Promise<{
        data: {
            key: string;
            valueJson: import("@prisma/client/runtime/client").JsonValue;
            version: number;
            updatedAt: string;
        };
    }>;
}
