var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KYC_CONSENT_TEXT, KYC_CONSENT_VERSION } from '@workbridge/contracts';
import { ApiError } from '../common/api-error.js';
import { hmacish, maskPhone, safeEqualHex, sha256Hex } from '../common/crypto.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { assertCanCreate, assertDecidable, assertPicks, assertSubmittable, decryptIdNumber, docRules, encryptIdNumber, idNumberHmac, maskIdNumber, } from './kyc.domain.js';
const EXT_BY_MIME = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};
let KycService = class KycService {
    prisma;
    config;
    dispatcher;
    constructor(prisma, config, dispatcher) {
        this.prisma = prisma;
        this.config = config;
        this.dispatcher = dispatcher;
    }
    secret() {
        return this.config.get('kyc.idSecret') ?? '';
    }
    maxAttempts() {
        return this.config.get('kyc.maxAttempts') ?? 3;
    }
    maxBytes() {
        return this.config.get('kyc.maxBytes') ?? 5 * 1024 * 1024;
    }
    async rawLatest(accountId) {
        return this.prisma.kycSubmission.findFirst({
            where: { accountId },
            orderBy: { createdAt: 'desc' },
            include: { documents: true },
        });
    }
    dto(sub) {
        return {
            publicId: sub.publicId,
            status: sub.status,
            idType: sub.idType,
            idNumberMasked: maskIdNumber(decryptIdNumber(Buffer.from(sub.idNumberEnc), this.secret())),
            attempts: sub.attempts,
            maxAttempts: this.maxAttempts(),
            rejectionReason: sub.rejectionReason,
            documents: sub.documents.map((d) => ({
                publicId: `kycdoc${String(d.id).padStart(6, '0')}`,
                docType: d.docType,
                uploadedAt: d.createdAt.toISOString(),
                sizeBytes: d.sizeBytes,
                mime: d.mime,
            })),
            submittedAt: sub.submittedAt?.toISOString() ?? null,
            decidedAt: sub.decidedAt?.toISOString() ?? null,
            createdAt: sub.createdAt.toISOString(),
        };
    }
    async getActive(accountId) {
        const sub = await this.rawLatest(accountId);
        return { submission: sub ? this.dto(sub) : null };
    }
    async create(accountId, input, meta) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            select: { status: true },
        });
        if (!account || account.status !== 'ACTIVE') {
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your profile before starting verification');
        }
        const existing = await this.rawLatest(accountId);
        assertCanCreate(existing?.status ?? null, existing?.attempts ?? 0, this.maxAttempts());
        const hash = idNumberHmac(input.idNumber, this.secret());
        if (existing && existing.idNumberHash !== hash) {
            throw new ApiError('VALIDATION_FAILED', 'Resubmission must use the same ID number');
        }
        if (!existing) {
            const dup = await this.prisma.kycSubmission.findFirst({
                where: { idNumberHash: hash, accountId: { not: accountId } },
                select: { publicId: true },
            });
            if (dup) {
                throw new ApiError('VALIDATION_FAILED', 'This ID number is already linked to another account');
            }
        }
        const enc = encryptIdNumber(input.idNumber, this.secret());
        const ipHash = meta.ip ? sha256Hex(meta.ip) : null;
        const snapshot = {
            version: input.consentVersion,
            acceptedVersion: KYC_CONSENT_VERSION,
            text: KYC_CONSENT_TEXT,
        };
        let sub = null;
        if (!existing) {
            try {
                sub = await this.prisma.$transaction(async (tx) => {
                    const created = await tx.kycSubmission.create({
                        data: {
                            accountId,
                            status: 'DRAFT',
                            idType: input.idType,
                            idNumberEnc: enc,
                            idNumberHash: hash,
                            attempts: 1,
                        },
                    });
                    await tx.kycConsent.create({
                        data: {
                            submissionId: created.id,
                            consentVer: input.consentVersion,
                            ipHash,
                            textSnapshot: snapshot,
                        },
                    });
                    return tx.kycSubmission.findUnique({
                        where: { id: created.id },
                        include: { documents: true },
                    });
                });
            }
            catch (e) {
                if (e.code === 'P2002') {
                    throw new ApiError('KYC_SUBMISSION_ACTIVE', 'A verification is already in progress');
                }
                throw e;
            }
        }
        else {
            sub = await this.prisma.kycSubmission.update({
                where: { id: existing.id },
                data: {
                    status: 'DRAFT',
                    idType: input.idType,
                    attempts: existing.attempts + 1,
                    rejectionReason: null,
                    submittedAt: null,
                    decidedAt: null,
                    decidedByAccountId: null,
                },
                include: { documents: true },
            });
            await this.prisma.kycConsent.upsert({
                where: { submissionId: sub.id },
                update: { consentVer: input.consentVersion, grantedAt: new Date(), ipHash, textSnapshot: snapshot },
                create: { submissionId: sub.id, consentVer: input.consentVersion, ipHash, textSnapshot: snapshot },
            });
        }
        if (!sub)
            throw new ApiError('NOT_FOUND', 'Submission could not be created');
        return { submission: this.dto(sub) };
    }
    async issueTicket(accountId, docType, baseUrl) {
        const sub = await this.rawLatest(accountId);
        if (!sub)
            throw new ApiError('NOT_FOUND', 'Start identity verification first');
        if (sub.status !== 'DRAFT') {
            throw new ApiError('KYC_SUBMISSION_ACTIVE', 'Documents can only change while the submission is a draft');
        }
        const expiresSec = 600;
        const doc = await this.prisma.kycDocument.create({
            data: { submissionId: sub.id, docType, storageKey: '', contentSha: '', mime: '', sizeBytes: 0 },
        });
        const body = Buffer.from(JSON.stringify({
            a: accountId.toString(),
            i: doc.id.toString(),
            d: docType,
            e: Date.now() + expiresSec * 1000,
        })).toString('base64url');
        const ticket = `${body}.${hmacish(body, this.secret())}`;
        return {
            uploadUrl: `${baseUrl}/api/v1/kyc/upload/${ticket}`,
            documentId: String(doc.id),
            maxBytes: this.maxBytes(),
            expiresSec,
        };
    }
    async saveDocument(accountId, ticket, file) {
        const [body, sig] = ticket.split('.');
        if (!body || !sig || !safeEqualHex(hmacish(body, this.secret()), sig)) {
            throw new ApiError('VALIDATION_FAILED', 'Upload ticket is invalid or expired');
        }
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
        if (payload.e < Date.now()) {
            throw new ApiError('VALIDATION_FAILED', 'Upload ticket is invalid or expired');
        }
        if (payload.a !== accountId.toString()) {
            throw new ApiError('FORBIDDEN', 'Upload ticket belongs to another account');
        }
        docRules(file.mimetype, file.size, this.maxBytes());
        const sub = await this.rawLatest(accountId);
        if (!sub)
            throw new ApiError('NOT_FOUND', 'Start identity verification first');
        if (sub.status !== 'DRAFT') {
            throw new ApiError('KYC_SUBMISSION_ACTIVE', 'Documents can only change while the submission is a draft');
        }
        const doc = await this.prisma.kycDocument.findUnique({ where: { id: BigInt(payload.i) } });
        if (!doc || doc.submissionId !== sub.id || doc.docType !== payload.d) {
            throw new ApiError('VALIDATION_FAILED', 'Upload ticket is invalid or expired');
        }
        const ext = EXT_BY_MIME[file.mimetype] ?? 'bin';
        const dir = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
        await mkdir(dir, { recursive: true });
        const storageKey = `kyc-${randomUUID()}.${ext}`;
        await writeFile(join(dir, storageKey), file.buffer);
        if (doc.storageKey) {
            await unlink(join(dir, doc.storageKey)).catch(() => undefined);
        }
        const contentSha = createHash('sha256').update(file.buffer).digest('hex');
        const updated = await this.prisma.kycDocument.update({
            where: { id: doc.id },
            data: { storageKey, contentSha, mime: file.mimetype, sizeBytes: file.size },
        });
        return {
            document: {
                publicId: `kycdoc${String(updated.id).padStart(6, '0')}`,
                docType: updated.docType,
                uploadedAt: new Date().toISOString(),
                sizeBytes: updated.sizeBytes,
                mime: updated.mime,
            },
        };
    }
    async submit(accountId) {
        const sub = await this.rawLatest(accountId);
        if (!sub)
            throw new ApiError('NOT_FOUND', 'Start identity verification first');
        const consent = await this.prisma.kycConsent.findUnique({ where: { submissionId: sub.id } });
        assertSubmittable({
            status: sub.status,
            docCount: sub.documents.length,
            consentGranted: !!consent,
            attempts: sub.attempts,
            maxAttempts: this.maxAttempts(),
        });
        const updated = await this.prisma.kycSubmission.update({
            where: { id: sub.id },
            data: { status: 'SUBMITTED', submittedAt: new Date() },
            include: { documents: true },
        });
        const admins = await this.prisma.account.findMany({
            where: { role: 'admin' },
            select: { id: true },
        });
        await this.dispatcher.enqueue({
            eventKey: 'KYC_SUBMITTED',
            recipientAccountIds: admins.map((a) => a.id),
            contextType: 'KYC',
            contextPublicId: updated.publicId,
            args: { attempt: updated.attempts },
        });
        return { submission: this.dto(updated) };
    }
    async adminRow(where) {
        return this.prisma.kycSubmission.findUnique({
            where: where,
            include: {
                documents: true,
                account: {
                    select: {
                        publicId: true,
                        phone: true,
                        role: true,
                        createdAt: true,
                        workerProfile: { select: { fullName: true } },
                        employerProfile: { select: { orgName: true } },
                    },
                },
            },
        });
    }
    applicantName(row) {
        return row.account.workerProfile?.fullName ?? row.account.employerProfile?.orgName ?? '—';
    }
    async adminQueue(query) {
        const take = query.limit + 1;
        const rows = await this.prisma.kycSubmission.findMany({
            where: {
                ...(query.status
                    ? { status: query.status }
                    : { status: { in: ['SUBMITTED', 'UNDER_REVIEW'] } }),
                ...(query.q
                    ? { account: { OR: [{ publicId: { contains: query.q } }, { phone: { contains: query.q } }] } }
                    : {}),
            },
            orderBy: { submittedAt: 'asc' },
            take,
            ...(query.cursor ? { cursor: { id: BigInt(query.cursor) }, skip: 1 } : {}),
            include: {
                documents: true,
                account: {
                    select: {
                        publicId: true,
                        phone: true,
                        role: true,
                        createdAt: true,
                        workerProfile: { select: { fullName: true } },
                        employerProfile: { select: { orgName: true } },
                    },
                },
            },
        });
        const hasMore = rows.length > take;
        const page = hasMore ? rows.slice(0, query.limit) : rows;
        const items = page.map((row) => ({
            submission: this.dto(row),
            account: {
                publicId: row.account.publicId,
                phoneMasked: maskPhone(row.account.phone),
                role: row.account.role ?? '—',
                createdAt: row.account.createdAt.toISOString(),
            },
            applicantName: this.applicantName(row),
            waitingHours: Math.max(0, Math.floor((Date.now() - (row.submittedAt?.getTime() ?? Date.now())) / 3_600_000)),
        }));
        return {
            data: items,
            meta: {
                nextCursor: hasMore ? String(page[page.length - 1]?.id ?? '') : null,
                hasMore,
                limit: query.limit,
            },
        };
    }
    async adminPick(publicId) {
        let row = await this.adminRow({ publicId });
        if (!row)
            throw new ApiError('NOT_FOUND', 'Submission not found');
        if (row.status === 'SUBMITTED') {
            assertPicks(row.status);
            await this.prisma.kycSubmission.update({
                where: { id: row.id },
                data: { status: 'UNDER_REVIEW' },
            });
            row = await this.adminRow({ publicId });
        }
        else if (row.status === 'DRAFT') {
            throw new ApiError('STATE_INVALID', 'Submission is still a draft');
        }
        if (!row)
            throw new ApiError('NOT_FOUND', 'Submission not found');
        return {
            submission: this.dto(row),
            account: {
                publicId: row.account.publicId,
                phoneMasked: maskPhone(row.account.phone),
                role: row.account.role ?? '—',
                createdAt: row.account.createdAt.toISOString(),
            },
            applicantName: this.applicantName(row),
        };
    }
    async adminViewDocument(publicId, docType, actorId) {
        const row = await this.adminRow({ publicId });
        if (!row)
            throw new ApiError('NOT_FOUND', 'Submission not found');
        if (row.status === 'DRAFT') {
            throw new ApiError('STATE_INVALID', 'Nothing to review — submission is still a draft');
        }
        const doc = row.documents.find((d) => d.docType === docType && d.storageKey);
        if (!doc)
            throw new ApiError('NOT_FOUND', 'Document not found');
        const { readFile } = await import('node:fs/promises');
        const dir = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
        let buffer;
        try {
            buffer = await readFile(join(dir, doc.storageKey));
        }
        catch {
            throw new ApiError('NOT_FOUND', 'Stored file missing');
        }
        await this.prisma.documentAccessLog.create({
            data: { documentId: doc.id, actorId, action: 'VIEW' },
        });
        return { buffer, mime: doc.mime };
    }
    async adminDecide(adminId, publicId, input) {
        const row = await this.adminRow({ publicId });
        if (!row)
            throw new ApiError('NOT_FOUND', 'Submission not found');
        const status = assertDecidable(row.status, {
            decision: input.decision,
            reason: input.reason,
            idNumberMatched: input.idNumberMatched,
        });
        const updated = await this.prisma.kycSubmission.update({
            where: { id: row.id },
            data: {
                status,
                rejectionReason: status === 'REJECTED' ? input.reason ?? null : null,
                decidedAt: new Date(),
                decidedByAccountId: adminId,
            },
            include: { documents: true },
        });
        await this.dispatcher.enqueue({
            eventKey: 'KYC_DECISION',
            recipientAccountIds: [row.accountId],
            contextType: 'KYC',
            contextPublicId: row.publicId,
            args: { status, ...(status === 'REJECTED' && input.reason ? { reason: input.reason } : {}) },
        });
        return { submission: this.dto(updated), accountKycStatus: status };
    }
};
KycService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ConfigService,
        DispatcherService])
], KycService);
export { KycService };
//# sourceMappingURL=kyc.service.js.map