import { ConfigService } from '@nestjs/config';
import type { KycDecide, KycSubmitInput } from '@workbridge/contracts';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { type KycStatus } from './kyc.domain.js';
export declare class KycService {
    private readonly prisma;
    private readonly config;
    private readonly dispatcher;
    constructor(prisma: PrismaService, config: ConfigService, dispatcher: DispatcherService);
    private secret;
    private maxAttempts;
    private maxBytes;
    rawLatest(accountId: bigint): Promise<({
        documents: {
            id: bigint;
            createdAt: Date;
            submissionId: bigint;
            docType: string;
            storageKey: string;
            contentSha: string;
            mime: string;
            sizeBytes: number;
        }[];
    } & {
        publicId: string;
        accountId: bigint;
        id: bigint;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        idType: string;
        idNumberEnc: import("@prisma/client/runtime/client").Bytes;
        idNumberHash: string;
        attempts: number;
        rejectionReason: string | null;
        submittedAt: Date | null;
        decidedAt: Date | null;
        decidedByAccountId: bigint | null;
    }) | null>;
    private dto;
    getActive(accountId: bigint): Promise<{
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
    }>;
    create(accountId: bigint, input: KycSubmitInput, meta: {
        ip?: string | null;
    }): Promise<{
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
    }>;
    issueTicket(accountId: bigint, docType: string, baseUrl: string): Promise<{
        uploadUrl: string;
        documentId: string;
        maxBytes: number;
        expiresSec: number;
    }>;
    saveDocument(accountId: bigint, ticket: string, file: {
        mimetype: string;
        size: number;
        buffer: Buffer;
    }): Promise<{
        document: {
            publicId: string;
            docType: "ID_FRONT" | "ID_BACK" | "SELFIE" | "ADDRESS_PROOF";
            uploadedAt: string;
            sizeBytes: number;
            mime: string;
        };
    }>;
    submit(accountId: bigint): Promise<{
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
    }>;
    private adminRow;
    private applicantName;
    adminQueue(query: {
        cursor?: string;
        limit: number;
        status?: string;
        q?: string;
    }): Promise<{
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
    adminPick(publicId: string): Promise<{
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
    }>;
    adminViewDocument(publicId: string, docType: string, actorId: bigint): Promise<{
        buffer: Buffer<ArrayBufferLike>;
        mime: string;
    }>;
    adminDecide(adminId: bigint, publicId: string, input: KycDecide): Promise<{
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
        accountKycStatus: KycStatus;
    }>;
}
