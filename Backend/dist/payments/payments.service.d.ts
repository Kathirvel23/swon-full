import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { ApproveEarnings, MarkPaid, PaymentTransactionDto } from '@workbridge/contracts';
export declare class PaymentsService {
    private readonly prisma;
    private readonly dispatcher;
    constructor(prisma: PrismaService, dispatcher: DispatcherService);
    private idem;
    private jobLite;
    private approvedMinutes;
    private toDto;
    myEarnings(accountId: bigint, q: {
        cursor?: string;
        limit: number;
        status?: string;
    }): Promise<{
        data: {
            publicId: string;
            status: "PENDING" | "ELIGIBLE" | "APPROVED" | "PROCESSING" | "PAID" | "FAILED" | "ON_HOLD" | "CANCELLED";
            amountPaise: number;
            adjustmentPaise: number;
            currency: "INR";
            job: {
                publicId: string;
                title: string;
                startsOn: string;
                endsOn: string;
            };
            attendanceMinutes: number;
            adjustmentReason?: string | null | undefined;
            worker?: {
                publicId: string;
                fullName: string;
                photoUrl?: string | null | undefined;
            } | undefined;
            approvedAt?: string | null | undefined;
            paidAt?: string | null | undefined;
            holdReason?: string | null | undefined;
        }[];
        meta: {
            nextCursor: string | null;
            limit: number;
        };
    }>;
    jobEarnings(accountId: bigint, jobPublicId: string, q: {
        cursor?: string;
        limit: number;
        status?: string;
    }): Promise<{
        data: {
            publicId: string;
            status: "PENDING" | "ELIGIBLE" | "APPROVED" | "PROCESSING" | "PAID" | "FAILED" | "ON_HOLD" | "CANCELLED";
            amountPaise: number;
            adjustmentPaise: number;
            currency: "INR";
            job: {
                publicId: string;
                title: string;
                startsOn: string;
                endsOn: string;
            };
            attendanceMinutes: number;
            adjustmentReason?: string | null | undefined;
            worker?: {
                publicId: string;
                fullName: string;
                photoUrl?: string | null | undefined;
            } | undefined;
            approvedAt?: string | null | undefined;
            paidAt?: string | null | undefined;
            holdReason?: string | null | undefined;
        }[];
        meta: {
            nextCursor: string | null;
            limit: number;
        };
    }>;
    approve(accountId: bigint, body: ApproveEarnings, idempotencyKey?: string): Promise<{
        approved: number;
    }>;
    markPaid(accountId: bigint, body: MarkPaid, idempotencyKey?: string): Promise<PaymentTransactionDto>;
    finalizeJobEarnings(jobId: bigint): Promise<{
        eligible: number;
        cancelled: number;
    }>;
}
