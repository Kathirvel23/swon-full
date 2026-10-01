import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Wave 4 — H6/H7 edge paths beyond the journey happy path:
 * role + header guards, idempotency (replay / reuse / missing key),
 * gate #10 worker side (action-based: apply AND hire need KYC), pre-hire withdraw,
 * §16/§17 conflict at apply AND at hire (+ queue conflictWarning flipping),
 * J2/J3/J4/J5 status derivations, A8 release (reason required), A7 hired
 * withdraw, bulk per-row results (§14), crew roster summary, ownership 404s.
 */

// Fresh test numbers (this suite's own fixtures — dev OTP returns the code).
const PHONES = {
  emp: '+919009123801',
  emp2: '+919009123802',
  w1: '+919009123803',
  w2: '+919009123804',
  w3: '+919009123805',
};

let app: INestApplication;
let prisma: PrismaService;
let areaId: string;
let skillId: string;
let categoryId: string;
let welfareCode: string;

let empToken = '';
let emp2Token = '';
let w1Token = '';
let w2Token = '';
let w3Token = '';

let jobA = ''; // Nov 2–3, headcount 2
let jobB = ''; // Nov 3–4 (overlaps A), headcount 1
let jobC = ''; // Nov 9–10, headcount 2

// application public ids
let w1A = '';
let w2A = '';
let w1B = '';
let w3C = '';
let w1C = '';
let w2C = '';

const http = () => request(app.getHttpServer());

async function register(phone: string): Promise<string> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

async function verifyKyc(phone: string): Promise<void> {
  // SETUP shortcut (documented): K0–K5 itself is proven in kyc.e2e-spec.ts.
  const account = await prisma.account.findUnique({ where: { phone } });
  if (!account) throw new Error('account missing');
  await prisma.kycSubmission.create({
    data: {
      accountId: account.id,
      status: 'VERIFIED',
      idType: 'PAN',
      idNumberEnc: Buffer.from('E2E-SETUP'),
      idNumberHash: `apps-kyc-${account.id}`,
      submittedAt: new Date(),
      decidedAt: new Date(),
    },
  });
}

async function apply(token: string, jobId: string, key: string, body: Record<string, unknown> = {}) {
  return http()
    .post('/api/v1/applications')
    .set('Authorization', `Bearer ${token}`)
    .set('Idempotency-Key', key)
    .send({ jobId, ...body });
}

async function decide(token: string, appId: string, key: string, body: Record<string, unknown>) {
  return http()
    .post(`/api/v1/applications/${appId}/decision`)
    .set('Authorization', `Bearer ${token}`)
    .set('Idempotency-Key', key)
    .send(body);
}

async function createJob(token: string, overrides: Record<string, unknown>): Promise<string> {
  const res = await http()
    .post('/api/v1/jobs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Temporary shift work',
      description: 'Sorting, packing and stacking at the Coimbatore location.',
      categoryId,
      city: 'Coimbatore',
      areaId,
      addressLine: '5, Test Estate Road',
      startsOn: '2026-11-02',
      endsOn: '2026-11-03',
      dayStartTime: '09:00',
      dayEndTime: '18:00',
      payType: 'DAY',
      payAmountPaise: 75_000,
      headcountRequired: 2,
      skillIds: [skillId],
      welfare: [{ code: welfareCode }],
      ...overrides,
    })
    .expect(201);
  return res.body.data.publicId as string;
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);

  const phones = Object.values(PHONES).map((p) => `'${p}'`).join(',');
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    for (const tbl of ['job_work_day', 'job_skill', 'job_welfare', 'application', 'crew_member']) {
      await tx.$executeRawUnsafe(
        `DELETE x FROM ${tbl} x JOIN job jj ON jj.id = x.job_id JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
      );
    }
    await tx.$executeRawUnsafe(
      `DELETE jj FROM job jj JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(
      `DELETE kp FROM kyc_submission kp JOIN account a ON a.id = kp.account_id WHERE a.phone IN (${phones})`,
    );
    // idempotency keys embed the payload (incl. per-run job ids) — always start clean
    await tx.$executeRawUnsafe("DELETE FROM idempotency_key WHERE `key` LIKE 'apps-%'");
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });

  const catalog = await http().get('/api/v1/catalog').expect(200);
  areaId = catalog.body.data.areas[0].publicId;
  skillId = catalog.body.data.skills[0].publicId;
  categoryId = catalog.body.data.categories.find((c: { code: string }) => c.code === 'WAREHOUSE').publicId;
  welfareCode = (await http().get('/api/v1/welfare/catalog').expect(200)).body.data[0].code;
});

afterAll(async () => {
  await app.close();
});

describe('Wave 4 — applications, hiring, crew (H6/H7) edge paths', () => {
  it('setup: employer + second employer + three workers (w1/w2 verified, w3 not)', async () => {
    empToken = await register(PHONES.emp);
    await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${empToken}`)
      .send({
        role: 'employer',
        orgName: 'Hire Edge Traders',
        orgType: 'FIRM',
        contactName: 'Hire Edge Manager',
        city: 'Coimbatore',
        areaId,
        addressLine: '5, Test Estate Road',
      })
      .expect(201);
    empToken = await register(PHONES.emp); // fresh claims

    emp2Token = await register(PHONES.emp2);
    await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${emp2Token}`)
      .send({
        role: 'employer',
        orgName: 'Other Edge Traders',
        orgType: 'FIRM',
        contactName: 'Other Manager',
        city: 'Coimbatore',
        areaId,
        addressLine: '9, Other Road',
      })
      .expect(201);
    emp2Token = await register(PHONES.emp2);

    for (const [phone, setter] of [
      [PHONES.w1, (t: string) => (w1Token = t)],
      [PHONES.w2, (t: string) => (w2Token = t)],
      [PHONES.w3, (t: string) => (w3Token = t)],
    ] as const) {
      let token = await register(phone);
      await http()
        .post('/api/v1/me/onboarding')
        .set('Authorization', `Bearer ${token}`)
        .send({ role: 'worker', fullName: `Worker ${phone.slice(-4)}`, city: 'Coimbatore', areaId, bio: 'Loading', experienceYears: 3 })
        .expect(201);
      token = await register(phone);
      setter(token);
    }

    await verifyKyc(PHONES.emp);
    await verifyKyc(PHONES.w1);
    await verifyKyc(PHONES.w2);

    jobA = await createJob(empToken, { startsOn: '2026-11-02', endsOn: '2026-11-03', headcountRequired: 2 });
    jobB = await createJob(empToken, { startsOn: '2026-11-03', endsOn: '2026-11-04', headcountRequired: 1 });
    jobC = await createJob(empToken, { startsOn: '2026-11-09', endsOn: '2026-11-10', headcountRequired: 2 });
    for (const j of [jobA, jobB, jobC]) {
      await http().post(`/api/v1/jobs/${j}/publish`).set('Authorization', `Bearer ${empToken}`).expect(201);
    }
  });

  it('guards: roles + required Idempotency-Key', async () => {
    const queueAsWorker = await http().get(`/api/v1/jobs/${jobA}/queue`).set('Authorization', `Bearer ${w1Token}`);
    expect(queueAsWorker.status).toBe(403);

    const applyAsEmployer = await http()
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${empToken}`)
      .set('Idempotency-Key', 'employer-apply-00001')
      .send({ jobId: jobA });
    expect(applyAsEmployer.status).toBe(403);

    const noKey = await http()
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${w1Token}`)
      .send({ jobId: jobA });
    expect(noKey.status).toBe(422);
    expect(noKey.body.error.code).toBe('VALIDATION_FAILED');

    const shortKey = await apply(w1Token, jobA, 'short'); // 5 chars < 8
    expect(shortKey.status).toBe(422);

    const badDecisionKey = await http()
      .post(`/api/v1/applications/whatever/decision`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ action: 'shortlist' });
    expect(badDecisionKey.status).toBe(422); // missing Idempotency-Key validated first
  });

  it('apply: KYC gate first, then happy path, J2 flip, duplicates, replay, payload-reuse', async () => {
    // Action-based KYC (owner brief): an UNVERIFIED worker is refused before
    // any row or idempotency record exists — the same key must work after KYC.
    const blocked = await apply(w3Token, jobC, 'apps-apply-w3-00001', { coverNote: 'Ready to work' });
    expect(blocked.status).toBe(403);
    expect(blocked.body.error.code).toBe('KYC_REQUIRED');

    // admin verifies (setup shortcut — K0–K5 proven in kyc.e2e-spec.ts)
    await verifyKyc(PHONES.w3);

    // the ORIGINAL action is retried by the client; backend revalidates
    const res = await apply(w3Token, jobC, 'apps-apply-w3-00001', { coverNote: 'Ready to work' });
    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('APPLIED');
    w3C = res.body.data.publicId;

    // J2: first application flips jobC OPEN → HIRING
    const job = await prisma.job.findUnique({ where: { publicId: jobC } });
    expect(job!.status).toBe('HIRING');
    expect(job!.applicationCount).toBe(1);

    // duplicate with a fresh key → UNIQUE(job, worker)
    const dup = await apply(w3Token, jobC, 'apps-apply-w3-00002');
    expect(dup.status).toBe(409);
    expect(dup.body.error.code).toBe('DUPLICATE_APPLICATION');

    // w1 apply jobA (key must be ≥8 chars)
    const w1Apply = await apply(w1Token, jobA, 'apps-apply-w1-00001');
    expect(w1Apply.status).toBe(201);
    w1A = w1Apply.body.data.publicId;

    // replay: same key + same payload → stored response, no second row
    const replay = await apply(w1Token, jobA, 'apps-apply-w1-00001');
    expect(replay.status).toBe(201);
    expect(replay.body.data.publicId).toBe(w1A);

    // same key + DIFFERENT payload → IDEMPOTENCY_KEY_REUSED
    const reused = await apply(w1Token, jobA, 'apps-apply-w1-00001', { coverNote: 'changed my mind' });
    expect(reused.status).toBe(409);
    expect(reused.body.error.code).toBe('IDEMPOTENCY_KEY_REUSED');

    // worker's "my applications" list carries the job block
    const mine = await http().get('/api/v1/applications').set('Authorization', `Bearer ${w3Token}`).expect(200);
    expect(mine.body.data).toHaveLength(1);
    expect(mine.body.data[0].job.publicId).toBe(jobC);
    expect(mine.body.data[0].crewSeat).toBe('NONE');
  });

  it('gate #10 worker side: hire is refused if the worker\'s KYC is not VERIFIED', async () => {
    // w3 applied while verified; simulate a mid-flight status regression so
    // the defense-in-depth hire check stays covered end-to-end.
    const account = await prisma.account.findUnique({ where: { phone: PHONES.w3 } });
    expect(account).not.toBeNull();
    const sub = await prisma.kycSubmission.findFirst({ where: { accountId: account!.id } });
    expect(sub).not.toBeNull();
    await prisma.kycSubmission.update({ where: { id: sub!.id }, data: { status: 'REJECTED' } });

    const blocked = await decide(empToken, w3C, 'apps-hire-w3-00001', { action: 'hire' });
    expect(blocked.status).toBe(403);
    expect(blocked.body.error.code).toBe('KYC_REQUIRED');

    // restore so the rest of the suite (withdraw / duplicate re-apply) runs
    await prisma.kycSubmission.update({ where: { id: sub!.id }, data: { status: 'VERIFIED' } });
  });

  it('pre-hire withdraw (A6) → WITHDRAWN, queue empty, no re-apply in V1', async () => {
    const wd = await http()
      .post(`/api/v1/applications/${w3C}/withdraw`)
      .set('Authorization', `Bearer ${w3Token}`)
      .send({ reason: 'Found another shift' })
      .expect(200);
    expect(wd.body.data.status).toBe('WITHDRAWN');

    const queue = await http().get(`/api/v1/jobs/${jobC}/queue`).set('Authorization', `Bearer ${empToken}`).expect(200);
    expect(queue.body.data).toHaveLength(0);

    // V1: UNIQUE(job, worker) persists — withdrawing does not free a re-apply
    const again = await apply(w3Token, jobC, 'apps-apply-w3-00003');
    expect(again.status).toBe(409);
    expect(again.body.error.code).toBe('DUPLICATE_APPLICATION');
  });

  it('conflict §16/§17: apply-time and hire-time double-booking guards + queue warning', async () => {
    const w2Apply = await apply(w2Token, jobA, 'apps-apply-w2-00001');
    expect(w2Apply.status).toBe(201);
    w2A = w2Apply.body.data.publicId;

    // w1 applies jobB BEFORE holding any seat → allowed (no crew yet)
    const w1ApplyB = await apply(w1Token, jobB, 'apps-apply-w1-00002');
    expect(w1ApplyB.status).toBe(201);
    w1B = w1ApplyB.body.data.publicId;

    // hire both into jobA (both verified) → jobA FILLED (J3)
    const hire1 = await decide(empToken, w1A, 'apps-hire-w1-00001', { action: 'hire' });
    expect(hire1.status).toBe(200);
    expect(hire1.body.data.status).toBe('HIRED');
    const hire2 = await decide(empToken, w2A, 'apps-hire-w2-00001', { action: 'hire' });
    expect(hire2.status).toBe(200);
    const jobARow = await prisma.job.findUnique({ where: { publicId: jobA } });
    expect(jobARow!.hiredCount).toBe(2);
    expect(jobARow!.status).toBe('FILLED');

    // queue for jobB now carries the conflict warning for w1 (crew on Nov 2–3 overlaps Nov 3–4)
    const queueB = await http().get(`/api/v1/jobs/${jobB}/queue`).set('Authorization', `Bearer ${empToken}`).expect(200);
    expect(queueB.body.data).toHaveLength(1);
    expect(queueB.body.data[0].application.conflictWarning).toBe(true);

    // hire-time guard: w1 already crewed on an overlapping window → 409
    const conflictHire = await decide(empToken, w1B, 'apps-hire-w1-00002', { action: 'hire' });
    expect(conflictHire.status).toBe(409);
    expect(conflictHire.body.error.code).toBe('CREW_DOUBLE_JOB');

    // apply-time guard: w2 (crewed in jobA, Nov 2–3) applies jobB (Nov 3–4) → 409
    const conflictApply = await apply(w2Token, jobB, 'apps-apply-w2-00002');
    expect(conflictApply.status).toBe(409);
    expect(conflictApply.body.error.code).toBe('CREW_DOUBLE_JOB');

    // FILLED jobA left discovery; HIRING jobB is still there
    const feed = await http().get('/api/v1/jobs').set('Authorization', `Bearer ${w3Token}`).expect(200);
    expect(feed.body.data.some((j: { publicId: string }) => j.publicId === jobA)).toBe(false);
    expect(feed.body.data.some((j: { publicId: string }) => j.publicId === jobB)).toBe(true);
  });

  it('release (A8): reason required, seat freed J4, notifications, idempotent replay', async () => {
    const noReason = await decide(empToken, w1A, 'apps-rel-w1-nr-0001', { action: 'release' });
    expect(noReason.status).toBe(422);
    expect(noReason.body.error.code).toBe('VALIDATION_FAILED');

    const released = await decide(empToken, w1A, 'apps-rel-w1-00001', { action: 'release', reason: 'No show at site' });
    expect(released.status).toBe(200);
    expect(released.body.data.status).toBe('CANCELLED');

    // J4: FILLED → HIRING with a seat open, crew RELEASED
    const jobARow = await prisma.job.findUnique({ where: { publicId: jobA } });
    expect(jobARow!.hiredCount).toBe(1);
    expect(jobARow!.status).toBe('HIRING');
    const crew = await prisma.crewMember.findFirst({
      where: { job: { publicId: jobA }, workerProfile: { account: { phone: PHONES.w1 } } },
    });
    expect(crew!.status).toBe('RELEASED');
    expect(crew!.releasedReason).toBe('No show at site');

    // worker informed (decision with reason) + employer got the shortfall event
    const notif = await prisma.notification.count({
      where: { eventKey: 'APPLICATION_REJECTED', contextPublicId: w1A },
    });
    expect(notif).toBe(1);
    const shortfall = await prisma.notification.count({ where: { eventKey: 'JOB_SHORTFALL' } });
    expect(shortfall).toBeGreaterThanOrEqual(1);

    // w1 no longer crewed on jobA → jobB conflict warning flips off
    const queueB = await http().get(`/api/v1/jobs/${jobB}/queue`).set('Authorization', `Bearer ${empToken}`).expect(200);
    expect(queueB.body.data[0].application.conflictWarning).toBe(false);

    // idempotent replay of the same decision key → stored response
    const replay = await decide(empToken, w1A, 'apps-rel-w1-00001', { action: 'release', reason: 'No show at site' });
    expect(replay.status).toBe(200);
    expect(replay.body.data.status).toBe('CANCELLED');

    // applying again after release is still blocked (V1 unique persists)
    const reapply = await apply(w1Token, jobA, 'apps-apply-w1-00003');
    expect(reapply.status).toBe(409);
    expect(reapply.body.error.code).toBe('DUPLICATE_APPLICATION');
  });

  it('hired worker withdraws (A7): crew released, J5 normalizes job back to OPEN', async () => {
    const wd = await http()
      .post(`/api/v1/applications/${w2A}/withdraw`)
      .set('Authorization', `Bearer ${w2Token}`)
      .send({ reason: 'Family emergency' })
      .expect(200);
    expect(wd.body.data.status).toBe('WITHDRAWN');

    const jobARow = await prisma.job.findUnique({ where: { publicId: jobA } });
    expect(jobARow!.hiredCount).toBe(0);
    expect(jobARow!.status).toBe('OPEN'); // J5: all seats released → full discovery again

    const shortfall = await prisma.notification.count({ where: { eventKey: 'JOB_SHORTFALL' } });
    expect(shortfall).toBeGreaterThanOrEqual(2);

    const feed = await http().get('/api/v1/jobs').set('Authorization', `Bearer ${w3Token}`).expect(200);
    expect(feed.body.data.some((j: { publicId: string }) => j.publicId === jobA)).toBe(true);
  });

  it('my applications: crewSeat reflects the seat, active filter hides terminal rows', async () => {
    const all = await http().get('/api/v1/applications').set('Authorization', `Bearer ${w1Token}`).expect(200);
    expect(all.body.data).toHaveLength(2); // jobA (released) + jobB (applied)
    const jobARow = all.body.data.find((r: { job: { publicId: string } }) => r.job.publicId === jobA);
    expect(jobARow.crewSeat).toBe('RELEASED');
    expect(jobARow.status).toBe('CANCELLED'); // A8 outcome

    const active = await http()
      .get('/api/v1/applications?active=true')
      .set('Authorization', `Bearer ${w1Token}`)
      .expect(200);
    expect(active.body.data).toHaveLength(1); // only jobB still live for w1
    expect(active.body.data[0].job.publicId).toBe(jobB);
  });

  it('bulk decisions §14: happy path, then a failing row reports per-row results (422)', async () => {
    const a1 = await apply(w1Token, jobC, 'apps-apply-w1-00004');
    const a2 = await apply(w2Token, jobC, 'apps-apply-w2-00003');
    expect(a1.status).toBe(201);
    expect(a2.status).toBe(201);
    w1C = a1.body.data.publicId;
    w2C = a2.body.data.publicId;

    const happy = await http()
      .post('/api/v1/applications/bulk-decision')
      .set('Authorization', `Bearer ${empToken}`)
      .send({
        items: [
          { applicationId: w1C, action: 'shortlist', note: 'Solid profile' },
          { applicationId: w2C, action: 'waitlist' },
        ],
      })
      .expect(200);
    expect(happy.body.data.succeeded).toBe(2);
    expect(happy.body.data.failed).toBe(0);

    const filtered = await http()
      .get(`/api/v1/jobs/${jobC}/queue?status=SHORTLISTED`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    expect(filtered.body.data).toHaveLength(1);
    expect(filtered.body.data[0].application.publicId).toBe(w1C);

    // failing row: release on a WAITLISTED application → APPLICATION_NOT_APPLICABLE.
    // Row 1 (waitlist swap) commits, row 2 fails, everything reported explicitly.
    const mixed = await http()
      .post('/api/v1/applications/bulk-decision')
      .set('Authorization', `Bearer ${empToken}`)
      .send({
        items: [
          { applicationId: w1C, action: 'waitlist' }, // A4 swap SHORTLISTED → WAITLISTED (ok)
          { applicationId: w2C, action: 'release', reason: 'not even hired' }, // not HIRED → domain rejection
        ],
      });
    expect(mixed.status).toBe(422);
    const results = mixed.body.error.details.results as {
      applicationId: string;
      ok: boolean;
      code?: string;
      status?: string;
    }[];
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({ applicationId: w1C, ok: true, status: 'WAITLISTED' });
    expect(results[1]).toMatchObject({ applicationId: w2C, ok: false, code: 'APPLICATION_NOT_APPLICABLE' });
  });

  it('bulk hire → jobC FILLED (J3), roster summary, release updates seats (H7)', async () => {
    const hire = await http()
      .post('/api/v1/applications/bulk-decision')
      .set('Authorization', `Bearer ${empToken}`)
      .send({
        items: [
          { applicationId: w1C, action: 'hire' },
          { applicationId: w2C, action: 'hire' },
        ],
      })
      .expect(200);
    expect(hire.body.data.succeeded).toBe(2);

    const jobCRow = await prisma.job.findUnique({ where: { publicId: jobC } });
    expect(jobCRow!.hiredCount).toBe(2);
    expect(jobCRow!.status).toBe('FILLED');

    const roster = await http().get(`/api/v1/jobs/${jobC}/crew`).set('Authorization', `Bearer ${empToken}`).expect(200);
    expect(roster.body.data.items).toHaveLength(2);
    expect(roster.body.data.summary).toMatchObject({
      seatsRequired: 2,
      seatsFilled: 2,
      seatsReleased: 0,
      jobStatus: 'FILLED',
    });
    expect(roster.body.data.items[0].worker.kycBadge).toBe(true); // w1 verified

    // role guard on the roster too
    const asWorker = await http().get(`/api/v1/jobs/${jobC}/crew`).set('Authorization', `Bearer ${w1Token}`);
    expect(asWorker.status).toBe(403);

    // release one seat → summary flips, J4 status, RELEASED filter
    const rel = await decide(empToken, w2C, 'apps-rel-w2-00001', { action: 'release', reason: 'Skill mismatch' });
    expect(rel.status).toBe(200);

    const after = await http().get(`/api/v1/jobs/${jobC}/crew`).set('Authorization', `Bearer ${empToken}`).expect(200);
    expect(after.body.data.summary).toMatchObject({ seatsFilled: 1, seatsReleased: 1, jobStatus: 'HIRING' });

    const releasedOnly = await http()
      .get(`/api/v1/jobs/${jobC}/crew?status=RELEASED`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    expect(releasedOnly.body.data.items).toHaveLength(1);
    expect(releasedOnly.body.data.items[0].releasedReason).toBe('Skill mismatch');
  });

  it('queue ownership + sort parameters', async () => {
    // second employer cannot peek at someone else's queue/roster
    const q = await http().get(`/api/v1/jobs/${jobC}/queue`).set('Authorization', `Bearer ${emp2Token}`);
    expect(q.status).toBe(404);
    const r = await http().get(`/api/v1/jobs/${jobC}/crew`).set('Authorization', `Bearer ${emp2Token}`);
    expect(r.status).toBe(404);
    const d = await decide(emp2Token, w1C, 'apps-emp2-dec-00001', { action: 'reject' });
    expect(d.status).toBe(404);

    // sort params accepted (deterministic result on equal ratings/distances)
    for (const sort of ['RATING', 'DISTANCE', 'APPLIED_AT']) {
      const res = await http()
        .get(`/api/v1/jobs/${jobC}/queue?sort=${sort}`)
        .set('Authorization', `Bearer ${empToken}`)
        .expect(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    }

    // A8 on the last hired seat, then the terminal state blocks re-decisions (A10)
    const releaseW1 = await decide(empToken, w1C, 'apps-rel-w1c-00001', { action: 'release', reason: 'Shift completed early' });
    expect(releaseW1.status).toBe(200);
    const stale = await decide(empToken, w1C, 'apps-stale-00000001', { action: 'reject' });
    expect(stale.status).toBe(409); // CANCELLED is terminal for reject
    expect(stale.body.error.code).toBe('APPLICATION_NOT_APPLICABLE');
    const stale2 = await decide(empToken, w1C, 'apps-stale-00000002', { action: 'hire' });
    expect(stale2.status).toBe(409);
    expect(stale2.body.error.code).toBe('APPLICATION_NOT_APPLICABLE');
  });
});
