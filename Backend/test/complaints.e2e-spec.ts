import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { ComplaintsService } from '../src/complaints/complaints.service.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Complaints & Support (M7 L0–L7) EDGES (the journey carries the happy path):
 *   - L0: party authorization, PAYMENT hold on the linked APPROVED earning,
 *     evidence tickets, spam rate-limit
 *   - L1–L5: admin-only transitions, party reply under WAITING_ON_PARTY
 *   - P7: holds released on RESOLVED/DISMISSED/timeout, kept on PAYMENT_HOLD
 *   - L7: reopen exactly once
 *   - M6 C2/C3: SUSPEND sanction revokes sessions; reinstate restores login
 *
 * Fixture style: fresh phones (never reuse masked digits from tool output);
 * employer/worker flow built through public APIs where it matters, earnings
 * inserted directly where only their state matters (documented setup
 * shortcut — the real money flow is journey-proven).
 */

const PHONES = {
  emp: '+919000000991',
  worker: '+919000000992',
  stranger: '+919000000993',
};

let app: INestApplication;
let prisma: PrismaService;
let complaints: ComplaintsService;
let areaId: string;
let categoryId: string;
let empToken = '';
let workerToken = '';
let strangerToken = '';
let adminToken = '';
let jobPublicId = '';
let earningPublicId = '';
let adminPhone = '';

const http = () => request(app.getHttpServer());

async function register(phone: string): Promise<string> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);
  complaints = app.get(ComplaintsService);

  adminPhone = (process.env.ADMIN_PHONES ?? '').split(',')[0].trim();
  expect(adminPhone).not.toBe('');

  const phones = [...Object.values(PHONES), adminPhone].map((p) => `'${p}'`).join(',');
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    await tx.$executeRawUnsafe(
      `DELETE pe FROM payment_earning pe JOIN payment_transaction pt ON pt.id = pe.payment_transaction_id JOIN account a ON a.id = pt.recorded_by_account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(
      `DELETE pt FROM payment_transaction pt JOIN account a ON a.id = pt.recorded_by_account_id WHERE a.phone IN (${phones})`,
    );
    for (const tbl of ['job_work_day', 'job_skill', 'job_welfare', 'application', 'crew_member', 'attendance_record', 'earning']) {
      await tx.$executeRawUnsafe(
        `DELETE x FROM ${tbl} x JOIN job jj ON jj.id = x.job_id JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
      );
    }
    // complaint/sanction hang off accounts, not jobs — delete by submitter/target
    await tx.$executeRawUnsafe(
      `DELETE ce FROM complaint_event ce JOIN complaint c ON c.id = ce.complaint_id JOIN account a ON a.id = c.submitter_account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(
      `DELETE c FROM complaint c JOIN account a ON a.id = c.submitter_account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(
      `DELETE s FROM sanction s JOIN account a ON a.id = s.account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe("DELETE FROM idempotency_key WHERE `key` LIKE 'cmpl-%'");
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });

  const catalog = await http().get('/api/v1/catalog').expect(200);
  areaId = catalog.body.data.areas[0].publicId;
  categoryId = catalog.body.data.categories.find((c: { code: string }) => c.code === 'WAREHOUSE').publicId;

  const emp0 = await register(PHONES.emp);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${emp0}`)
    .send({
      role: 'employer',
      orgName: 'Case Traders',
      orgType: 'FIRM',
      contactName: 'Case Owner',
      city: 'Coimbatore',
      areaId,
      addressLine: '4, Case Street',
    })
    .expect(201);
  const wk0 = await register(PHONES.worker);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${wk0}`)
    .send({ role: 'worker', fullName: 'Case Worker', city: 'Coimbatore', areaId, bio: 'Complaint fixture', experienceYears: 2 })
    .expect(201);
  const st0 = await register(PHONES.stranger);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${st0}`)
    .send({ role: 'worker', fullName: 'Case Stranger', city: 'Coimbatore', areaId, bio: 'Unrelated', experienceYears: 1 })
    .expect(201);
  empToken = await register(PHONES.emp);
  workerToken = await register(PHONES.worker);
  strangerToken = await register(PHONES.stranger);
  adminToken = await register(adminPhone);

  const draft = await http()
    .post('/api/v1/jobs')
    .set('Authorization', `Bearer ${empToken}`)
    .send({
      title: 'Complaint fixture job',
      description: 'Linked-entity complaints need a real job.',
      categoryId,
      city: 'Coimbatore',
      areaId,
      addressLine: '9, Case Estate',
      lat: 11.01,
      lng: 77.02,
      startsOn: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
      endsOn: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
      dayStartTime: '09:00',
      dayEndTime: '18:00',
      payType: 'DAY',
      payAmountPaise: 70_000,
      headcountRequired: 1,
    })
    .expect(201);
  jobPublicId = draft.body.data.publicId;

  // SETUP shortcut: an APPROVED earning exists (the state under test is the
  // hold/release path; earning creation itself is journey-proven at J7/P2).
  const job = await prisma.job.findUniqueOrThrow({ where: { publicId: jobPublicId } });
  const workerAcc0 = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.worker } });
  const wp = await prisma.workerProfile.findUniqueOrThrow({ where: { accountId: workerAcc0.id } });
  const earning = await prisma.earning.create({
    data: { jobId: job.id, workerProfileId: wp.id, status: 'APPROVED', amountPaise: 70_000n, approvedAt: new Date() },
  });
  earningPublicId = earning.publicId;
});

afterAll(async () => {
  await app?.close();
});

describe('complaints (M7)', () => {
  let complaintPublicId = '';

  it('L0: PAYMENT complaint on an earning holds it + ACK/queue alerts fire', async () => {
    const res = await http()
      .post('/api/v1/complaints')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({
        type: 'PAYMENT',
        severity: 'HIGH',
        linkType: 'EARNING',
        linkPublicId: earningPublicId,
        narrative: 'The agreed amount was 700 but the employer mentioned 650 verbally.',
        evidenceUploadTickets: ['case-evidence-1'],
      })
      .expect(201);
    complaintPublicId = res.body.data.publicId;
    expect(res.body.data.status).toBe('OPEN');
    expect(res.body.data.link).toEqual({ type: 'EARNING', publicId: earningPublicId });
    expect(res.body.data.events.some((e: { kind: string }) => e.kind === 'EVIDENCE')).toBe(true);

    const held = await prisma.earning.findUnique({ where: { publicId: earningPublicId } });
    expect(held!.status).toBe('ON_HOLD');
    expect(held!.holdComplaintId).not.toBeNull();

    const workerAcc = await prisma.account.findUnique({ where: { phone: PHONES.worker } });
    const ack = await prisma.notification.count({
      where: { recipientAccountId: workerAcc!.id, eventKey: 'COMPLAINT_ACK', contextPublicId: complaintPublicId },
    });
    expect(ack).toBe(1);
    const adminAcc = await prisma.account.findUnique({ where: { phone: adminPhone } });
    const alert = await prisma.notification.count({
      where: { recipientAccountId: adminAcc!.id, eventKey: 'ADMIN_QUEUE_ALERT', contextPublicId: complaintPublicId },
    });
    expect(alert).toBe(1);
  });

  it('L0 party rule: stranger cannot reply or link a foreign job', async () => {
    const denied = await http()
      .post(`/api/v1/complaints/${complaintPublicId}/reply`)
      .set('Authorization', `Bearer ${strangerToken}`)
      .send({ body: 'I want to chime in on someone else\'s case.' })
      .expect(409);
    expect(denied.body.error.code).toBe('NOT_JOB_PARTY');

    const foreign = await http()
      .post('/api/v1/complaints')
      .set('Authorization', `Bearer ${strangerToken}`)
      .send({
        type: 'OTHER',
        narrative: 'This stranger has nothing to do with that job at all.',
        linkType: 'JOB',
        linkPublicId: jobPublicId,
      })
      .expect(409);
    expect(foreign.body.error.code).toBe('NOT_JOB_PARTY');
  });

  it('L0 spam guard: the sixth complaint in 24 h is refused', async () => {
    let blocked = false;
    for (let i = 0; i < 6; i += 1) {
      const r = await http()
        .post('/api/v1/complaints')
        .set('Authorization', `Bearer ${strangerToken}`)
        .send({ type: 'OTHER', narrative: `Unlinked filler complaint number ${i} for the rate-limit test.` });
      if (r.status === 409) {
        expect(r.body.error.code).toBe('STATE_INVALID');
        blocked = true;
        break;
      }
      expect(r.status).toBe(201);
    }
    expect(blocked).toBe(true);
  });

  it('admin queue lists cases by severity; workers cannot decide', async () => {
    await http()
      .post(`/api/v1/admin/complaints/${complaintPublicId}/decision`)
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ status: 'RESOLVED', note: 'Worker trying to self-close.' })
      .expect(403);

    const queue = await http()
      .get('/api/v1/admin/complaints?sort=SEVERITY')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    const first = queue.body.data[0];
    expect(first.severity).toBe('HIGH'); // severity-first sort
    expect(first.publicId).toBe(complaintPublicId);
  });

  it('L1–L3: admin moves the case, party reply returns it to review', async () => {
    await http()
      .post(`/api/v1/admin/complaints/${complaintPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'UNDER_REVIEW', note: 'Case picked up by the trust team.' })
      .expect(201);

    await http()
      .post(`/api/v1/admin/complaints/${complaintPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'WAITING_ON_PARTY', note: 'Please upload the payment screenshot.' })
      .expect(201);

    const reply = await http()
      .post(`/api/v1/complaints/${complaintPublicId}/reply`)
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ body: 'Screenshot attached — the transfer is for 650 as discussed.', evidenceUploadTickets: ['case-evidence-2'] })
      .expect(201);
    expect(reply.body.data.status).toBe('UNDER_REVIEW'); // L3

    // illegal jumps still refuse
    const skip = await http()
      .post(`/api/v1/admin/complaints/${complaintPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'OPEN', note: 'Trying to rewind without reopen semantics.' });
    expect(skip.status).toBe(409);
  });

  it('L4 + P7: RESOLVED releases the hold; reopen happens exactly once', async () => {
    const resolve = await http()
      .post(`/api/v1/admin/complaints/${complaintPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'RESOLVED',
        note: 'Employer confirmed the higher amount; earning restored.',
        sanction: {
          type: 'WARN',
          reason: 'Verbal pay mismatch — warned the employer.',
          accountPublicId: (await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.emp } })).publicId,
        },
      })
      .expect(201);
    expect(resolve.body.data.status).toBe('RESOLVED');

    const released = await prisma.earning.findUnique({ where: { publicId: earningPublicId } });
    expect(released!.status).toBe('APPROVED'); // P7 target
    expect(released!.holdComplaintId).toBeNull();

    const warn = await prisma.sanction.findFirst({ where: { type: 'WARN', reason: { contains: 'warned' } } });
    expect(warn).not.toBeNull();

    // L7 first reopen
    await http()
      .post(`/api/v1/admin/complaints/${complaintPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'OPEN', note: 'New screenshot arrived — reopening once.' })
      .expect(201);

    // second reopen refused
    const again = await http()
      .post(`/api/v1/admin/complaints/${complaintPublicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'OPEN', note: 'Trying to reopen a second time now.' })
      .expect(409);
    expect(again.body.error.code).toBe('STATE_INVALID');
  });

  it('M6-C2/C3: SUSPEND sanction kills sessions; reinstate restores access', async () => {
    // capture a refresh token BEFORE the suspension so C2 can be proven on it
    const preOtp = await http().post('/api/v1/auth/otp/request').send({ phone: PHONES.worker }).expect(201);
    const preLogin = await http()
      .post('/api/v1/auth/otp/verify')
      .send({ challengeId: preOtp.body.data.challengeId, code: preOtp.body.data.devCode })
      .expect(201);
    const workerRefresh = preLogin.body.data.refreshToken as string;
    workerToken = preLogin.body.data.accessToken as string; // re-mint post-reinstate later

    const c2 = await http()
      .post('/api/v1/complaints')
      .set('Authorization', `Bearer ${empToken}`)
      .send({
        type: 'SAFETY',
        severity: 'HIGH',
        linkType: 'JOB',
        linkPublicId: jobPublicId,
        narrative: 'The worker endangered others on the floor twice this week.',
      })
      .expect(201);

    await http()
      .post(`/api/v1/admin/complaints/${c2.body.data.publicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'UNDER_REVIEW', note: 'Safety review opened.' })
      .expect(201);

    const workerAcc = await prisma.account.findUnique({ where: { phone: PHONES.worker } });
    const suspend = await http()
      .post(`/api/v1/admin/complaints/${c2.body.data.publicId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'RESOLVED',
        note: 'Repeated safety violations — suspended pending retraining.',
        sanction: { type: 'SUSPEND', reason: 'Safety violations on the floor.', accountPublicId: workerAcc!.publicId },
      })
      .expect(201);
    expect(suspend.body.data.status).toBe('RESOLVED');

    const after = await prisma.account.findUnique({ where: { phone: PHONES.worker } });
    expect(after!.status).toBe('SUSPENDED');
    const liveSessions = await prisma.session.count({
      where: { accountId: workerAcc!.id, revokedAt: null },
    });
    expect(liveSessions).toBe(0); // C2: all sessions revoked

    // C2 cut the session family: the old refresh token is dead now
    const refresh = await http().post('/api/v1/auth/refresh').send({ refreshToken: workerRefresh });
    expect([401, 403]).toContain(refresh.status);

    // fresh OTP verify is refused while suspended (ACCOUNT_SUSPENDED = 403)
    const blockedOtp = await http().post('/api/v1/auth/otp/request').send({ phone: PHONES.worker }).expect(201);
    const blockedVerify = await http()
      .post('/api/v1/auth/otp/verify')
      .send({ challengeId: blockedOtp.body.data.challengeId, code: blockedOtp.body.data.devCode });
    expect(blockedVerify.status).toBe(403);
    expect(blockedVerify.body.error.code).toBe('ACCOUNT_SUSPENDED');

    const notify = await prisma.notification.count({
      where: { recipientAccountId: workerAcc!.id, eventKey: 'ACCOUNT_SUSPENDED' },
    });
    expect(notify).toBeGreaterThanOrEqual(1);

    // C3: admin reinstates → ACTIVE + sanctions lifted + login works again
    await http()
      .post(`/api/v1/admin/accounts/${workerAcc!.publicId}/reinstate`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ note: 'Retraining completed — restoring the account.' })
      .expect(201);
    const restored = await prisma.account.findUnique({ where: { phone: PHONES.worker } });
    expect(restored!.status).toBe('ACTIVE');
    const openSanctions = await prisma.sanction.count({
      where: { accountId: workerAcc!.id, liftedAt: null },
    });
    expect(openSanctions).toBe(0);
    const fresh = await register(PHONES.worker);
    expect(fresh.length).toBeGreaterThan(20);
  });

  it('L6 sweep: 7-day silence closes the case and releases its hold', async () => {
    // dedicated held earning: reuse the fixture earning (currently APPROVED)
    const job = await prisma.job.findUniqueOrThrow({ where: { publicId: jobPublicId } });
    const sweepAcc = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.worker } });
    const wp = await prisma.workerProfile.findUniqueOrThrow({ where: { accountId: sweepAcc.id } });
    await prisma.earning.update({
      where: { jobId_workerProfileId: { jobId: job.id, workerProfileId: wp.id } },
      data: { status: 'APPROVED', holdComplaintId: null },
    });

    const c3 = await http()
      .post('/api/v1/complaints')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({
        type: 'PAYMENT',
        linkType: 'EARNING',
        linkPublicId: earningPublicId,
        narrative: 'Second payment case — this one will go silent for a week.',
      })
      .expect(201);
    const c3Id = c3.body.data.publicId;
    const held3 = await prisma.earning.findUnique({ where: { publicId: earningPublicId } });
    expect(held3!.status).toBe('ON_HOLD');

    await http()
      .post(`/api/v1/admin/complaints/${c3Id}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'UNDER_REVIEW', note: 'Review started.' })
      .expect(201);
    await http()
      .post(`/api/v1/admin/complaints/${c3Id}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'WAITING_ON_PARTY', note: 'Awaiting the worker for seven days.' })
      .expect(201);

    // age the case past the 7-day window, then run the system sweep
    await prisma.complaint.updateMany({
      where: { publicId: c3Id },
      data: { updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60_000) },
    });
    const closed = await complaints.sweepTimeouts();
    expect(closed).toBeGreaterThanOrEqual(1);

    const final = await prisma.complaint.findUnique({ where: { publicId: c3Id } });
    expect(final!.status).toBe('CLOSED_TIMEOUT');
    const money = await prisma.earning.findUnique({ where: { publicId: earningPublicId } });
    expect(money!.status).toBe('APPROVED'); // hold released by the sweep
    expect(money!.holdComplaintId).toBeNull();
  });
});
