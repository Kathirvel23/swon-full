import { createHash, randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  KycDecide,
  KycQueueItem,
  KycSubmitInput,
  KycSubmissionDto,
} from '@workbridge/contracts';
import { KYC_CONSENT_TEXT, KYC_CONSENT_VERSION } from '@workbridge/contracts';

import { ApiError } from '../common/api-error.js';
import { hmacish, maskPhone, safeEqualHex, sha256Hex } from '../common/crypto.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  assertCanCreate,
  assertDecidable,
  assertPicks,
  assertSubmittable,
  decryptIdNumber,
  docRules,
  encryptIdNumber,
  idNumberHmac,
  maskIdNumber,
  type KycStatus,
} from './kyc.domain.js';

type SubmissionRow = NonNullable<Awaited<ReturnType<KycService['rawLatest']>>>;

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/**
 * KYC orchestration (M5: K0–K5) + notification inbox (M3-core).
 * Pure rules live in kyc.domain.ts (unit-tested); this layer owns Prisma,
 * local private storage for documents (vendor = decision #14), consent
 * snapshots (DPDP), and dispatcher hand-off for KYC_SUBMITTED/KYC_DECISION.
 */
@Injectable()
export class KycService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly dispatcher: DispatcherService,
  ) {}

  private secret(): string {
    return this.config.get<string>('kyc.idSecret') ?? '';
  }
  private maxAttempts(): number {
    return this.config.get<number>('kyc.maxAttempts') ?? 3;
  }
  private maxBytes(): number {
    return this.config.get<number>('kyc.maxBytes') ?? 5 * 1024 * 1024;
  }

  /** Latest submission for the account with documents (dto needs them). */
  async rawLatest(accountId: bigint) {
    return this.prisma.kycSubmission.findFirst({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
      include: { documents: true },
    });
  }

  private dto(sub: SubmissionRow): KycSubmissionDto {
    return {
      publicId: sub.publicId,
      status: sub.status as KycSubmissionDto['status'],
      idType: sub.idType as KycSubmissionDto['idType'],
      idNumberMasked: maskIdNumber(decryptIdNumber(Buffer.from(sub.idNumberEnc), this.secret())),
      attempts: sub.attempts,
      maxAttempts: this.maxAttempts(),
      rejectionReason: sub.rejectionReason,
      documents: sub.documents.map((d) => ({
        publicId: `kycdoc${String(d.id).padStart(6, '0')}`, // publicIdSchema needs ≥10 chars
        docType: d.docType as 'ID_FRONT' | 'ID_BACK' | 'SELFIE' | 'ADDRESS_PROOF',
        uploadedAt: d.createdAt.toISOString(),
        sizeBytes: d.sizeBytes,
        mime: d.mime,
      })),
      submittedAt: sub.submittedAt?.toISOString() ?? null,
      decidedAt: sub.decidedAt?.toISOString() ?? null,
      createdAt: sub.createdAt.toISOString(),
    };
  }

  // ------------------------------------------------------------------ worker

  async getActive(accountId: bigint) {
    const sub = await this.rawLatest(accountId);
    return { submission: sub ? this.dto(sub) : null };
  }

  /** K0 (create) / K5 (rejected → draft resubmit). */
  async create(accountId: bigint, input: KycSubmitInput, meta: { ip?: string | null }) {
    // M5 K0: only an ACTIVE account (onboarded) may open a submission.
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      select: { status: true },
    });
    if (!account || account.status !== 'ACTIVE') {
      throw new ApiError('PROFILE_INCOMPLETE', 'Complete your profile before starting verification');
    }
    const existing = await this.rawLatest(accountId);
    assertCanCreate(
      (existing?.status as KycStatus | undefined) ?? null,
      existing?.attempts ?? 0,
      this.maxAttempts(),
    );

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

    let sub: SubmissionRow | null = null;
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
              textSnapshot: snapshot as never,
            },
          });
          return tx.kycSubmission.findUnique({
            where: { id: created.id },
            include: { documents: true },
          });
        });
      } catch (e) {
        if ((e as { code?: string }).code === 'P2002') {
          throw new ApiError('KYC_SUBMISSION_ACTIVE', 'A verification is already in progress');
        }
        throw e;
      }
    } else {
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
        update: { consentVer: input.consentVersion, grantedAt: new Date(), ipHash, textSnapshot: snapshot as never },
        create: { submissionId: sub.id, consentVer: input.consentVersion, ipHash, textSnapshot: snapshot as never },
      });
    }

    if (!sub) throw new ApiError('NOT_FOUND', 'Submission could not be created');
    return { submission: this.dto(sub) };
  }

  /**
   * Stateless upload ticket (contract: uploadUrl + documentId + expiresSec).
   * The document row is pre-created so the client can reference it; the PUT
   * fills storage fields. Local storage behind the same interface as photos.
   */
  async issueTicket(accountId: bigint, docType: string, baseUrl: string) {
    const sub = await this.rawLatest(accountId);
    if (!sub) throw new ApiError('NOT_FOUND', 'Start identity verification first');
    if (sub.status !== 'DRAFT') {
      throw new ApiError('KYC_SUBMISSION_ACTIVE', 'Documents can only change while the submission is a draft');
    }
    const expiresSec = 600;
    const doc = await this.prisma.kycDocument.create({
      data: { submissionId: sub.id, docType, storageKey: '', contentSha: '', mime: '', sizeBytes: 0 },
    });
    const body = Buffer.from(
      JSON.stringify({
        a: accountId.toString(),
        i: doc.id.toString(),
        d: docType,
        e: Date.now() + expiresSec * 1000,
      }),
    ).toString('base64url');
    const ticket = `${body}.${hmacish(body, this.secret())}`;
    return {
      uploadUrl: `${baseUrl}/api/v1/kyc/upload/${ticket}`,
      documentId: String(doc.id),
      maxBytes: this.maxBytes(),
      expiresSec,
    };
  }

  /** PUT target for tickets: verify signature/expiry/ownership, store bytes. */
  async saveDocument(
    accountId: bigint,
    ticket: string,
    file: { mimetype: string; size: number; buffer: Buffer },
  ) {
    const [body, sig] = ticket.split('.');
    if (!body || !sig || !safeEqualHex(hmacish(body, this.secret()), sig)) {
      throw new ApiError('VALIDATION_FAILED', 'Upload ticket is invalid or expired');
    }
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as {
      a: string;
      i: string;
      d: string;
      e: number;
    };
    if (payload.e < Date.now()) {
      throw new ApiError('VALIDATION_FAILED', 'Upload ticket is invalid or expired');
    }
    if (payload.a !== accountId.toString()) {
      throw new ApiError('FORBIDDEN', 'Upload ticket belongs to another account');
    }
    docRules(file.mimetype, file.size, this.maxBytes());

    const sub = await this.rawLatest(accountId);
    if (!sub) throw new ApiError('NOT_FOUND', 'Start identity verification first');
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
      await unlink(join(dir, doc.storageKey)).catch(() => undefined); // replacing the same docType
    }
    const contentSha = createHash('sha256').update(file.buffer).digest('hex');
    const updated = await this.prisma.kycDocument.update({
      where: { id: doc.id },
      data: { storageKey, contentSha, mime: file.mimetype, sizeBytes: file.size },
    });
    return {
      document: {
        publicId: `kycdoc${String(updated.id).padStart(6, '0')}`,
        docType: updated.docType as 'ID_FRONT' | 'ID_BACK' | 'SELFIE' | 'ADDRESS_PROOF',
        uploadedAt: new Date().toISOString(),
        sizeBytes: updated.sizeBytes,
        mime: updated.mime,
      },
    };
  }

  /** K1: DRAFT → SUBMITTED + KYC_SUBMITTED to every admin. */
  async submit(accountId: bigint) {
    const sub = await this.rawLatest(accountId);
    if (!sub) throw new ApiError('NOT_FOUND', 'Start identity verification first');
    const consent = await this.prisma.kycConsent.findUnique({ where: { submissionId: sub.id } });
    assertSubmittable({
      status: sub.status as KycStatus,
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

  // ------------------------------------------------------------------- admin

  private async adminRow(where: { publicId: string }) {
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

  private applicantName(row: NonNullable<Awaited<ReturnType<KycService['adminRow']>>>): string {
    return row.account.workerProfile?.fullName ?? row.account.employerProfile?.orgName ?? '—';
  }

  async adminQueue(query: { cursor?: string; limit: number; status?: string; q?: string }) {
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
      orderBy: { submittedAt: 'asc' }, // oldest first — 24h queue metric (§14)
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
    const items: KycQueueItem[] = page.map((row) => ({
      submission: this.dto(row),
      account: {
        publicId: row.account.publicId,
        phoneMasked: maskPhone(row.account.phone),
        role: row.account.role ?? '—',
        createdAt: row.account.createdAt.toISOString(),
      },
      applicantName: this.applicantName(row),
      waitingHours: Math.max(
        0,
        Math.floor((Date.now() - (row.submittedAt?.getTime() ?? Date.now())) / 3_600_000),
      ),
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

  /** Queue pick (K2) + full detail; decided rows are view-only. */
  async adminPick(publicId: string) {
    let row = await this.adminRow({ publicId });
    if (!row) throw new ApiError('NOT_FOUND', 'Submission not found');

    if (row.status === 'SUBMITTED') {
      assertPicks(row.status as KycStatus);
      await this.prisma.kycSubmission.update({
        where: { id: row.id },
        data: { status: 'UNDER_REVIEW' },
      });
      row = await this.adminRow({ publicId });
    } else if (row.status === 'DRAFT') {
      throw new ApiError('STATE_INVALID', 'Submission is still a draft');
    }
    if (!row) throw new ApiError('NOT_FOUND', 'Submission not found');
    return {
      submission: this.dto(row as SubmissionRow),
      account: {
        publicId: row.account.publicId,
        phoneMasked: maskPhone(row.account.phone),
        role: row.account.role ?? '—',
        createdAt: row.account.createdAt.toISOString(),
      },
      applicantName: this.applicantName(row),
    };
  }

  /** Admin document view — bytes + DocumentAccessLog VIEW row (§20). */
  async adminViewDocument(publicId: string, docType: string, actorId: bigint) {
    const row = await this.adminRow({ publicId });
    if (!row) throw new ApiError('NOT_FOUND', 'Submission not found');
    if (row.status === 'DRAFT') {
      throw new ApiError('STATE_INVALID', 'Nothing to review — submission is still a draft');
    }
    const doc = row.documents.find((d) => d.docType === docType && d.storageKey);
    if (!doc) throw new ApiError('NOT_FOUND', 'Document not found');

    const { readFile } = await import('node:fs/promises');
    const dir = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
    let buffer: Buffer;
    try {
      buffer = await readFile(join(dir, doc.storageKey));
    } catch {
      throw new ApiError('NOT_FOUND', 'Stored file missing');
    }
    await this.prisma.documentAccessLog.create({
      data: { documentId: doc.id, actorId, action: 'VIEW' },
    });
    return { buffer, mime: doc.mime };
  }

  /** K3/K4: decision + KYC_DECISION notification to the applicant. */
  async adminDecide(adminId: bigint, publicId: string, input: KycDecide) {
    const row = await this.adminRow({ publicId });
    if (!row) throw new ApiError('NOT_FOUND', 'Submission not found');
    const status = assertDecidable(row.status as KycStatus, {
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
}
