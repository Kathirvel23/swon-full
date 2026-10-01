import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Wave 2 integration suite — M5 KYC lifecycle (K0→K5) against the REAL MySQL
 * TEST database: admin bootstrap (#4), consent snapshot, upload ticket,
 * queue pick (K2), logged document view, decide (K3/K4), attempt cap,
 * duplicate-ID guard, the #10 gate outcome, and the M3-core inbox/devices.
 *
 * Phones are wiped per run → deterministic re-runs.
 */
const ADMIN = '+919000000009'; // ADMIN_PHONES (vitest env) → role admin at first OTP
const K1 = '+919000000021'; // applicant: reject → resubmit → verified
const K2 = '+919000000022'; // second account: duplicate-ID guard
const PHONES = [ADMIN, K1, K2];

let app: INestApplication;
let prisma: PrismaService;

// shared state across sequential tests
let adminToken = '';
let workerToken = '';
let submissionPublicId = '';

const http = () => request(app.getHttpServer());

async function wipe(phones: string[]): Promise<void> {
  const list = phones.map((p) => `'${p}'`).join(',');
  // Children first (FK checks off, ONE connection): leftover kyc/notification
  // rows from a previous run would trip the duplicate-ID guard and inbox counts.
  const statements = [
    // Orphan sweep FIRST: rows whose account row is already gone (previous
    // runs deleted accounts with FK checks off) cannot be found by phone —
    // a leftover kyc_submission trips the duplicate-ID guard forever.
    `DELETE s FROM kyc_submission s LEFT JOIN account a ON s.account_id = a.id WHERE a.id IS NULL`,
    `DELETE d FROM kyc_document d LEFT JOIN kyc_submission s ON d.submission_id = s.id WHERE s.id IS NULL`,
    `DELETE c FROM kyc_consent c LEFT JOIN kyc_submission s ON c.submission_id = s.id WHERE s.id IS NULL`,
    `DELETE al FROM document_access_log al LEFT JOIN kyc_document d ON al.document_id = d.id WHERE d.id IS NULL`,
    `DELETE n FROM notification n LEFT JOIN account a ON n.recipient_account_id = a.id WHERE a.id IS NULL`,
    `DELETE pt FROM push_token pt LEFT JOIN account a ON pt.account_id = a.id WHERE a.id IS NULL`,
    `DELETE dl FROM notification_delivery dl LEFT JOIN account a ON dl.recipient_account_id = a.id WHERE a.id IS NULL`,
    `DELETE o FROM notification_outbox o WHERE CAST(SUBSTRING_INDEX(o.dedupe_key, ':', -1) AS UNSIGNED) NOT IN (SELECT id FROM account)`,
    `DELETE al FROM document_access_log al
       JOIN kyc_document d ON al.document_id = d.id
       JOIN kyc_submission s ON d.submission_id = s.id
       JOIN account a ON s.account_id = a.id
      WHERE a.phone IN (${list})`,
    `DELETE d FROM kyc_document d
       JOIN kyc_submission s ON d.submission_id = s.id
       JOIN account a ON s.account_id = a.id
      WHERE a.phone IN (${list})`,
    `DELETE c FROM kyc_consent c
       JOIN kyc_submission s ON c.submission_id = s.id
       JOIN account a ON s.account_id = a.id
      WHERE a.phone IN (${list})`,
    `DELETE n FROM notification n
       JOIN account a ON n.recipient_account_id = a.id
      WHERE a.phone IN (${list})`,
    `DELETE pt FROM push_token pt
       JOIN account a ON pt.account_id = a.id
      WHERE a.phone IN (${list})`,
    `DELETE dl FROM notification_delivery dl
       JOIN account a ON dl.recipient_account_id = a.id
      WHERE a.phone IN (${list})`,
    `DELETE o FROM notification_outbox o
       JOIN account a ON o.dedupe_key LIKE CONCAT('%:', a.id)
      WHERE a.phone IN (${list})`,
    `DELETE s FROM kyc_submission s
       JOIN account a ON s.account_id = a.id
      WHERE a.phone IN (${list})`,
    `DELETE FROM account WHERE phone IN (${list})`,
    `DELETE FROM otp_challenge WHERE phone IN (${list})`,
  ];
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    for (const sql of statements) await tx.$executeRawUnsafe(sql);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });
}

async function login(phone: string): Promise<string> {
  const otp = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: otp.body.data.challengeId, code: otp.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

async function onboardWorker(token: string): Promise<void> {
  const catalog = await http().get('/api/v1/catalog').expect(200);
  const areaId = catalog.body.data.areas[0].publicId;
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${token}`)
    .send({ role: 'worker', fullName: 'KYC Applicant', city: 'Coimbatore', areaId, bio: 'KYC test worker', experienceYears: 1 })
    .expect(201);
}

const ID_NUMBER = 'ABCDE1234F';
const JPE = () => Buffer.from('fake-jpeg-bytes-not-a-real-image-but-valid-mime');

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);
  await wipe(PHONES);
});

afterAll(async () => {
  await app.close();
});

describe('Wave 2 KYC lifecycle (e2e, real DB)', () => {
  it('admin bootstrap (#4): OTP from ADMIN_PHONES → role admin', async () => {
    const token = await login(ADMIN);
    adminToken = token;
    const me = await http().get('/api/v1/me').set('Authorization', `Bearer ${token}`).expect(200);
    expect(me.body.data.account.role).toBe('admin');
  });

  it('K0 gate: a non-onboarded account cannot start verification', async () => {
    workerToken = await login(K1);
    const res = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ idType: 'PAN', idNumber: ID_NUMBER, consentAccepted: true, consentVersion: '2026-09-v1' });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('PROFILE_INCOMPLETE');
  });

  it('K0: onboarded worker opens a DRAFT with consent snapshot + encrypted id', async () => {
    await onboardWorker(workerToken);
    const res = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ idType: 'PAN', idNumber: ID_NUMBER, consentAccepted: true, consentVersion: '2026-09-v1' })
      .expect(201);
    expect(res.body.data.submission.status).toBe('DRAFT');
    expect(res.body.data.submission.idNumberMasked).toBe('XXXXX1234F');
    submissionPublicId = res.body.data.submission.publicId;

    const db = await prisma.kycSubmission.findUnique({
      where: { publicId: submissionPublicId },
      include: { consent: true },
    });
    expect(db).toBeTruthy();
    expect(db!.idNumberEnc.length).toBeGreaterThan(12); // iv|tag|ct — not plaintext
    expect(db!.consent?.consentVer).toBe('2026-09-v1');
    expect(db!.consent).toBeTruthy();
    expect((db!.consent!.textSnapshot as { text: string }).text).toContain('consent');
  });

  it('K1 gate: submit without documents → DOCUMENT_REQUIRED', async () => {
    const res = await http()
      .post('/api/v1/kyc/submit')
      .set('Authorization', `Bearer ${workerToken}`);
    expect(res.status).toBe(422); // DOCUMENT_REQUIRED = 422 (catalog)
    expect(res.body.error.code).toBe('DOCUMENT_REQUIRED');
  });

  it('upload ticket → PUT bytes → document recorded; tampered ticket rejected', async () => {
    const tampered = await http()
      .put('/api/v1/kyc/upload/aaaa.bbbb')
      .set('Authorization', `Bearer ${workerToken}`)
      .attach('file', JPE(), { filename: 'front.jpg', contentType: 'image/jpeg' });
    expect(tampered.status).toBe(422);

    const ticket = await http()
      .post('/api/v1/kyc/documents/upload-ticket')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ docType: 'ID_FRONT' })
      .expect(201);
    expect(ticket.body.data.uploadUrl).toContain('/api/v1/kyc/upload/');
    expect(ticket.body.data.maxBytes).toBe(5 * 1024 * 1024);

    const put = await http()
      .put(new URL(ticket.body.data.uploadUrl).pathname.replace('/api/v1', '/api/v1'))
      .set('Authorization', `Bearer ${workerToken}`)
      .attach('file', JPE(), { filename: 'front.jpg', contentType: 'image/jpeg' });
    expect(put.status, JSON.stringify(put.body)).toBe(200); // Nest: PUT → 200
    expect(put.body.data.document.docType).toBe('ID_FRONT');
    expect(put.body.data.document.sizeBytes).toBeGreaterThan(0);
  });

  it('K1: submit → SUBMITTED + consent-checked; active submission blocks K0', async () => {
    const res = await http()
      .post('/api/v1/kyc/submit')
      .set('Authorization', `Bearer ${workerToken}`)
      .expect(201);
    expect(res.body.data.submission.status).toBe('SUBMITTED');
    expect(res.body.data.submission.submittedAt).toBeTruthy();

    const again = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ idType: 'PAN', idNumber: ID_NUMBER, consentAccepted: true, consentVersion: '2026-09-v1' });
    expect(again.status).toBe(409);
    expect(again.body.error.code).toBe('KYC_SUBMISSION_ACTIVE');

    // M3-core: admins got the KYC_SUBMITTED event through the outbox
    const admin = await prisma.account.findUnique({ where: { phone: ADMIN } });
    const note = await prisma.notification.findFirst({
      where: { recipientAccountId: admin!.id, eventKey: 'KYC_SUBMITTED', contextPublicId: submissionPublicId },
    });
    expect(note).toBeTruthy();
    const outbox = await prisma.notificationOutbox.findFirst({
      where: { eventKey: 'KYC_SUBMITTED' },
      include: { deliveries: true },
    });
    expect(outbox?.status).toBe('SENT');
    expect(outbox!.deliveries.some((d) => d.channel === 'INAPP')).toBe(true);
  });

  it('guards: queue needs admin role; worker token gets 403', async () => {
    const denied = await http().get('/api/v1/admin/kyc').set('Authorization', `Bearer ${workerToken}`);
    expect(denied.status).toBe(403);
    expect(denied.body.error.code).toBe('ROLE_REQUIRED');
    await http().get('/api/v1/admin/kyc').expect(401);
  });

  it('queue lists the submission (oldest first) + K2 pick persists UNDER_REVIEW', async () => {
    const queue = await http().get('/api/v1/admin/kyc').set('Authorization', `Bearer ${adminToken}`).expect(200);
    const item = queue.body.data.find((i: { submission: { publicId: string } }) => i.submission.publicId === submissionPublicId);
    expect(item).toBeTruthy();
    expect(item.account.phoneMasked).toContain('****');
    expect(item.applicantName).toBe('KYC Applicant');
    expect(queue.body.meta).toHaveProperty('hasMore');

    const pick = await http()
      .get(`/api/v1/admin/kyc/${submissionPublicId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(pick.body.data.submission.status).toBe('UNDER_REVIEW');
    const db = await prisma.kycSubmission.findUnique({ where: { publicId: submissionPublicId } });
    expect(db!.status).toBe('UNDER_REVIEW'); // persisted, not just returned
  });

  it('admin document view returns bytes + writes DocumentAccessLog VIEW', async () => {
    const before = await prisma.documentAccessLog.count();
    const res = await http()
      .get(`/api/v1/admin/kyc/${submissionPublicId}/documents/ID_FRONT`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.headers['content-type']).toContain('image/jpeg');
    expect(res.body.length ?? res.text.length).toBeGreaterThan(0);
    expect(await prisma.documentAccessLog.count()).toBe(before + 1);
  });

  it('K4: REJECTED requires reason; decision notifies the applicant', async () => {
    const noReason = await http()
      .post(`/api/v1/admin/kyc/${submissionPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'REJECTED', idNumberMatched: true });
    expect(noReason.status).toBe(422);

    const res = await http()
      .post(`/api/v1/admin/kyc/${submissionPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'REJECTED', reason: 'Photo does not match the ID document', idNumberMatched: false })
      .expect(201);
    expect(res.body.data.submission.status).toBe('REJECTED');
    expect(res.body.data.accountKycStatus).toBe('REJECTED');
    expect(res.body.data.submission.rejectionReason).toContain('Photo does not match');

    const worker = await prisma.account.findUnique({ where: { phone: K1 } });
    const note = await prisma.notification.findFirst({
      where: { recipientAccountId: worker!.id, eventKey: 'KYC_DECISION' },
    });
    expect(note).toBeTruthy();
    expect((note!.bodyParams as { status: string }).status).toBe('REJECTED');
  });

  it('K5: rejected → resubmit (same ID, attempts+1) → SUBMITTED again', async () => {
    const wrongId = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ idType: 'PAN', idNumber: 'XYZDE1234F', consentAccepted: true, consentVersion: '2026-09-v1' });
    expect(wrongId.status, JSON.stringify(wrongId.body)).toBe(422); // resubmit must keep the same id

    const res = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ idType: 'PAN', idNumber: ID_NUMBER, consentAccepted: true, consentVersion: '2026-09-v1' })
      .expect(201);
    expect(res.body.data.submission.status).toBe('DRAFT');
    expect(res.body.data.submission.attempts).toBe(2);

    // re-upload (draft replaced; doc slot reissued) then submit
    const ticket = await http()
      .post('/api/v1/kyc/documents/upload-ticket')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ docType: 'ID_FRONT' })
      .expect(201);
    await http()
      .put(new URL(ticket.body.data.uploadUrl).pathname)
      .set('Authorization', `Bearer ${workerToken}`)
      .attach('file', JPE(), { filename: 'front.jpg', contentType: 'image/jpeg' })
      .expect(200);
    await http().post('/api/v1/kyc/submit').set('Authorization', `Bearer ${workerToken}`).expect(201);
  });

  it('K3: VERIFIED with attestation → terminal + #10 gate outcome visible in /me', async () => {
    await http().get(`/api/v1/admin/kyc/${submissionPublicId}`).set('Authorization', `Bearer ${adminToken}`).expect(200);

    const missingAttestation = await http()
      .post(`/api/v1/admin/kyc/${submissionPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'VERIFIED', idNumberMatched: false });
    expect(missingAttestation.status).toBe(422);

    const res = await http()
      .post(`/api/v1/admin/kyc/${submissionPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'VERIFIED', idNumberMatched: true })
      .expect(201);
    expect(res.body.data.accountKycStatus).toBe('VERIFIED');

    // decided rows are terminal: no fourth submission, no re-decide
    const terminal = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ idType: 'PAN', idNumber: ID_NUMBER, consentAccepted: true, consentVersion: '2026-09-v1' });
    expect(terminal.status).toBe(409);
    expect(terminal.body.error.code).toBe('STATE_INVALID');

    const redecide = await http()
      .post(`/api/v1/admin/kyc/${submissionPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'REJECTED', reason: 'Changed my mind about this one', idNumberMatched: true });
    expect(redecide.status).toBe(409);

    const loginRes = await http().post('/api/v1/auth/otp/request').send({ phone: K1 }).expect(201);
    const again = await http()
      .post('/api/v1/auth/otp/verify')
      .send({ challengeId: loginRes.body.data.challengeId, code: loginRes.body.data.devCode })
      .expect(201);
    expect(again.body.data.account.kycStatus).toBe('VERIFIED'); // gate: can now be hired
  });

  it('attempt cap: REJECTED at max attempts → KYC_ATTEMPT_CAP', async () => {
    const worker = await prisma.account.findUnique({ where: { phone: K1 } });
    await prisma.kycSubmission.updateMany({
      where: { accountId: worker!.id },
      data: { status: 'REJECTED', attempts: 3 },
    });
    const res = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ idType: 'PAN', idNumber: ID_NUMBER, consentAccepted: true, consentVersion: '2026-09-v1' });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('KYC_ATTEMPT_CAP');
  });

  it('duplicate ID across accounts → VALIDATION_FAILED', async () => {
    const token2 = await login(K2);
    await onboardWorker(token2);
    const res = await http()
      .post('/api/v1/kyc')
      .set('Authorization', `Bearer ${token2}`)
      .send({ idType: 'PAN', idNumber: ID_NUMBER, consentAccepted: true, consentVersion: '2026-09-v1' });
    expect(res.status).toBe(422);
    expect(res.body.error.message).toContain('already linked');
  });
});

describe('M3-core inbox & devices', () => {
  it('applicant inbox shows KYC_DECISION; mark-all-read zeroes the unread count', async () => {
    const token = await login(K1);
    const list = await http().get('/api/v1/notifications').set('Authorization', `Bearer ${token}`);
    expect(list.status, JSON.stringify(list.body)).toBe(200);
    expect(Array.isArray(list.body.data)).toBe(true);
    expect(list.body.data.some((n: { eventKey: string }) => n.eventKey === 'KYC_DECISION')).toBe(true);
    expect(list.body.meta).toHaveProperty('hasMore');

    const unread = await http().get('/api/v1/notifications/unread-count').set('Authorization', `Bearer ${token}`);
    expect(unread.status, JSON.stringify(unread.body)).toBe(200);
    expect(unread.body.data.unread).toBeGreaterThan(0);

    const read = await http()
      .post('/api/v1/notifications/read')
      .set('Authorization', `Bearer ${token}`)
      .send({ all: true })
      .expect(201);
    expect(read.body.data.unread).toBe(0);

    const empty = await http()
      .get('/api/v1/notifications?unread=true')
      .set('Authorization', `Bearer ${token}`);
    expect(empty.status, JSON.stringify(empty.body)).toBe(200);
    expect(empty.body.data).toHaveLength(0);
  });

  it('push token registers and is stored once per (account, token)', async () => {
    const token = await login(K1);
    const payload = { token: 'expo-push-token-e2e-abcdef123456', platform: 'ANDROID', deviceName: 'e2e-device' };
    await http().post('/api/v1/devices/push-token').set('Authorization', `Bearer ${token}`).send(payload).expect(201);
    await http().post('/api/v1/devices/push-token').set('Authorization', `Bearer ${token}`).send(payload).expect(201);

    const worker = await prisma.account.findUnique({ where: { phone: K1 } });
    const count = await prisma.pushToken.count({ where: { accountId: worker!.id, token: payload.token } });
    expect(count).toBe(1); // upsert — no duplicates
  });
});
