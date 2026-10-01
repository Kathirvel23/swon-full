import { type AuthenticatedRequest } from '../common/guards.js';
import { PaymentsService } from './payments.service.js';
import type { ApproveEarnings, MarkPaid } from '@workbridge/contracts';
export declare class PaymentsController {
    private readonly payments;
    constructor(payments: PaymentsService);
    my(req: AuthenticatedRequest, query: {
        cursor?: string;
        limit?: string;
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
    forJob(req: AuthenticatedRequest, publicId: string, query: {
        cursor?: string;
        limit?: string;
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
    approve(req: AuthenticatedRequest, body: ApproveEarnings, key?: string): Promise<{
        data: {
            approved: number;
        };
    }>;
    paid(req: AuthenticatedRequest, body: MarkPaid, key?: string): Promise<{
        data: {
            publicId: string;
            status: "PROCESSING" | "PAID" | "FAILED";
            reference: string;
            amountPaise: number;
            currency: "INR";
            earnings: {
                earningId: string;
                amountPaise: number;
            }[];
            paidAt?: string | null | undefined;
            evidenceUrl?: string | null | undefined;
        };
    }>;
}
