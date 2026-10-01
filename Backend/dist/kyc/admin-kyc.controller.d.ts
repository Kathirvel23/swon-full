import type { Response } from 'express';
import { type AuthenticatedRequest } from '../common/guards.js';
import { KycService } from './kyc.service.js';
export declare class AdminKycController {
    private readonly kyc;
    constructor(kyc: KycService);
    queue(query: Parameters<KycService['adminQueue']>[0]): Promise<{
        data: {
            submission: {
                publicId: string;
                status: "DRAFT" | "REJECTED" | "SUBMITTED" | "UNDER_REVIEW" | "VERIFIED";
                idType: "PAN" | "VOTER" | "DRIVING" | "PASSPORT";
                idNumberMasked: string;
                attempts: number;
                maxAttempts: number;
                documents: {
                    publicId: string;
                    docType: "ID_FRONT" | "ID_BACK" | "SELFIE" | "ADDRESS_PROOF";
                    uploadedAt: string;
                    sizeBytes: number;
                    mime: string;
                }[];
                createdAt: string;
                rejectionReason?: string | null | undefined;
                submittedAt?: string | null | undefined;
                decidedAt?: string | null | undefined;
            };
            account: {
                publicId: string;
                phoneMasked: string;
                role: string;
                createdAt: string;
            };
            applicantName: string;
            waitingHours: number;
        }[];
        meta: {
            nextCursor: string | null;
            hasMore: boolean;
            limit: number;
        };
    }>;
    pick(publicId: string): Promise<{
        data: {
            submission: {
                publicId: string;
                status: "DRAFT" | "REJECTED" | "SUBMITTED" | "UNDER_REVIEW" | "VERIFIED";
                idType: "PAN" | "VOTER" | "DRIVING" | "PASSPORT";
                idNumberMasked: string;
                attempts: number;
                maxAttempts: number;
                documents: {
                    publicId: string;
                    docType: "ID_FRONT" | "ID_BACK" | "SELFIE" | "ADDRESS_PROOF";
                    uploadedAt: string;
                    sizeBytes: number;
                    mime: string;
                }[];
                createdAt: string;
                rejectionReason?: string | null | undefined;
                submittedAt?: string | null | undefined;
                decidedAt?: string | null | undefined;
            };
            account: {
                publicId: string;
                phoneMasked: string;
                role: string;
                createdAt: string;
            };
            applicantName: string;
        };
    }>;
    viewDocument(publicId: string, docType: string, req: AuthenticatedRequest, res: Response): Promise<void>;
    decide(publicId: string, body: Parameters<KycService['adminDecide']>[2], req: AuthenticatedRequest): Promise<{
        data: {
            submission: {
                publicId: string;
                status: "DRAFT" | "REJECTED" | "SUBMITTED" | "UNDER_REVIEW" | "VERIFIED";
                idType: "PAN" | "VOTER" | "DRIVING" | "PASSPORT";
                idNumberMasked: string;
                attempts: number;
                maxAttempts: number;
                documents: {
                    publicId: string;
                    docType: "ID_FRONT" | "ID_BACK" | "SELFIE" | "ADDRESS_PROOF";
                    uploadedAt: string;
                    sizeBytes: number;
                    mime: string;
                }[];
                createdAt: string;
                rejectionReason?: string | null | undefined;
                submittedAt?: string | null | undefined;
                decidedAt?: string | null | undefined;
            };
            accountKycStatus: import("./kyc.domain.js").KycStatus;
        };
    }>;
}
