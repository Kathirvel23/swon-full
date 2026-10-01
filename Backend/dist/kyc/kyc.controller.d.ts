import { type AuthenticatedRequest } from '../common/guards.js';
import { KycService } from './kyc.service.js';
export declare class KycController {
    private readonly kyc;
    constructor(kyc: KycService);
    active(req: AuthenticatedRequest): Promise<{
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
            } | null;
        };
    }>;
    create(body: Parameters<KycService['create']>[1], req: AuthenticatedRequest): Promise<{
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
        };
    }>;
    ticket(body: {
        docType: string;
    }, req: AuthenticatedRequest): Promise<{
        data: {
            uploadUrl: string;
            documentId: string;
            maxBytes: number;
            expiresSec: number;
        };
    }>;
    upload(ticket: string, file: {
        mimetype: string;
        size: number;
        buffer: Buffer;
    } | undefined, req: AuthenticatedRequest): Promise<{
        data: {
            document: {
                publicId: string;
                docType: "ID_FRONT" | "ID_BACK" | "SELFIE" | "ADDRESS_PROOF";
                uploadedAt: string;
                sizeBytes: number;
                mime: string;
            };
        };
    }>;
    submit(req: AuthenticatedRequest): Promise<{
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
        };
    }>;
}
