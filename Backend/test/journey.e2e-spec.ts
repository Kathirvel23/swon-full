import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Journey test (plan §2 item 6): ONE scripted happy path covering
 *   discover → match → apply → hire → manage → attend → complete → pay → rate
 * (architecture §4: journey tests carry the bulk of regression proof).
 *
 * Wave 1 has shipped the two registration steps → they run as REAL assertions
 * against the test DB. The rest stay `it.todo` — the suite RUNS GREEN while
 * steps remain unimplemented; no fake assertions are invented (never fabricate
 * test results). Each later Wave flips its todos → real assertions.
 *
 * Fixture style: seed-free — the journey CREATES its own accounts through the
 * public APIs, exactly as a real user would; the two-worker variant exists to
 * prove conflict handling (CREW_DOUBLE_JOB) when Wave 2 lands.
 *
 * Related failing-path suites (also Wave-sequenced): 409 matrix per state
 * machine (Database/STATE_MACHINES.md), quick-match race, attendance token
 * replay, mark-paid AMOUNT_MISMATCH, idempotency replay.
 */

const PHONES = {
  workerA: '+919350000001',
  workerB: '+919350000002',
  employer: '+919350000003',
};

let app: INestApplication;
let prisma: PrismaService;
let areaId: string;
let skillId: string;
let categoryId: string;
// Wave 3 tokens/job survive across `it` blocks (the story builds step by step)
let workerAToken = '';
let workerBToken = '';
let employerToken = '';
let jobPublicId = '';
let applicationAId = '';
let applicationBId = '';

const http = () => request(app.getHttpServer());

async function register(phone: string): Promise<string> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

/** Onboarding assigns the role AFTER the verify-time token was minted —
 * a fresh OTP login re-mints claims with the current role (mirrors the
 * refresh path, which also re-reads role from the account row). */
async function relogin(phone: string): Promise<string> {
  return register(phone);
}

/** SETUP shortcut: worker VERIFIED directly (K0–K5 proven in kyc.e2e-spec). */
async function verifyWorkerJourney(phone: string, letter: string): Promise<void> {
  const account = await prisma.account.findUnique({ where: { phone } });
  expect(account).not.toBeNull();
  const existing = await prisma.kycSubmission.findFirst({ where: { accountId: account!.id } });
  if (existing) {
    await prisma.kycSubmission.update({ where: { id: existing.id }, data: { status: 'VERIFIED' } });
    return;
  }
  await prisma.kycSubmission.create({
    data: {
      accountId: account!.id,
      status: 'VERIFIED',
      idType: 'PAN',
      idNumberEnc: Buffer.from(`E2E-SETUP-${letter}`),
      idNumberHash: `journey-kyc-${account!.id}`,
      submittedAt: new Date(),
      decidedAt: new Date(),
    },
  });
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);

  // deterministic re-runs: wipe this journey's own accounts only
  // (single transaction → FK toggle and DELETEs share one pooled connection)
  const phones = Object.values(PHONES).map((p) => `'${p}'`).join(',');
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    // Wave 3: journey jobs must not outlive their accounts (children first)
    // W5: payments hang off the employer ACCOUNT (no job_id) — delete them
    // first, then the job-scoped children below (children first throughout)
    await tx.$executeRawUnsafe(
      `DELETE pe FROM payment_earning pe JOIN payment_transaction pt ON pt.id = pe.payment_transaction_id JOIN account a ON a.id = pt.recorded_by_account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(
      `DELETE pt FROM payment_transaction pt JOIN account a ON a.id = pt.recorded_by_account_id WHERE a.phone IN (${phones})`,
    );
    for (const tbl of [
      'job_work_day', 'job_skill', 'job_welfare', 'application', 'crew_member',
      'attendance_record', 'earning',
    ]) {
      await tx.$executeRawUnsafe(
        `DELETE x FROM ${tbl} x JOIN job jj ON jj.id = x.job_id JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
      );
    }
    await tx.$executeRawUnsafe(
      `DELETE jj FROM job jj JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
    );
    // idempotency keys embed the payload (incl. per-run job ids) — always start clean
    await tx.$executeRawUnsafe("DELETE FROM idempotency_key WHERE `key` LIKE 'journey-%'");
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });

  const catalog = await http().get('/api/v1/catalog').expect(200);
  areaId = catalog.body.data.areas[0].publicId;
  skillId = catalog.body.data.skills[0].publicId;
  const warehouse = catalog.body.data.categories.find((c: { code: string }) => c.code === 'WAREHOUSE');
  categoryId = warehouse.publicId; // 'cat_domain_warehouse' — find by code, not index
});

afterAll(async () => {
  await app.close();
});

describe('E2E journey: discover → match → apply → hire → manage → attend → complete → pay → rate', () => {
  // --- Setup ---------------------------------------------------------------
  it('register worker A (phone OTP → ACTIVE + minimal profile + skills)', async () => {
    const token = await register(PHONES.workerA);
    workerAToken = token;

    const onboard = await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: 'worker',
        fullName: 'Worker A',
        city: 'Coimbatore',
        areaId,
        bio: 'Warehouse + events',
        experienceYears: 4,
      })
      .expect(201);
    expect(onboard.body.data.account.status).toBe('ACTIVE');
    expect(onboard.body.data.account.role).toBe('worker');

    const skills = await http()
      .put('/api/v1/me/skills')
      .set('Authorization', `Bearer ${token}`)
      .send({ skills: [{ skillId, yearsHint: 3 }] })
      .expect(200);
    expect(skills.body.data.profileCompletePct).toBeGreaterThan(0);
    expect(skills.body.data.skills).toHaveLength(1); // PUT /me/skills → WorkerProfileDto
    // role was granted by onboarding AFTER the token was minted → re-mint
    workerAToken = await relogin(PHONES.workerA);
  });

  it('register worker B (conflict twin) and employer (org profile, KYC per gate policy)', async () => {
    // worker B — minimal onboarding, no skills yet (mirrors a fresh install)
    const tokenB = await register(PHONES.workerB);
    workerBToken = tokenB;
    const onboardB = await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ role: 'worker', fullName: 'Worker B', city: 'Tiruppur', areaId, bio: 'Loading', experienceYears: 1 })
      .expect(201);
    expect(onboardB.body.data.account.status).toBe('ACTIVE');
    workerBToken = await relogin(PHONES.workerB);

    // employer — full org profile on one shot → completeness 100
    const tokenE = await register(PHONES.employer);
    employerToken = tokenE;
    const onboardE = await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${tokenE}`)
      .send({
        role: 'employer',
        orgName: 'Journey Traders',
        orgType: 'FIRM',
        contactName: 'Journey Manager',
        city: 'Coimbatore',
        areaId,
        addressLine: '7, Journey Street',
      })
      .expect(201);
    expect(onboardE.body.data.account.status).toBe('ACTIVE');
    expect(onboardE.body.data.org.completenessPct).toBe(100);
    // role was just granted — re-mint the token so @Roles('employer') passes
    employerToken = await relogin(PHONES.employer);
    // KYC gating happens at job publish (Wave 2) — per gate policy default
    // "verify to publish"; nothing to assert until the publish endpoint exists.
  });

  it('employer creates + publishes job (OPEN): dates, headcount 2, pay, welfare', async () => {
    const welfare = await http().get('/api/v1/welfare/catalog').expect(200);
    expect(welfare.body.data.length).toBeGreaterThan(0);
    const wCodes = welfare.body.data.slice(0, 2).map((w: { code: string }) => w.code);

    const draft = await http()
      .post('/api/v1/jobs')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({
        title: 'Warehouse loading crew needed',
        description:
          'Load and stack cartons at our SIDCO warehouse. Three days of shift-based temporary work.',
        categoryId,
        city: 'Coimbatore',
        areaId,
        addressLine: '12, SIDCO Industrial Estate, Kurichi',
        lat: 11.0087,
        lng: 77.056,
        startsOn: '2026-10-05',
        endsOn: '2026-10-07',
        dayStartTime: '09:00',
        dayEndTime: '18:00',
        payType: 'DAY',
        payAmountPaise: 75_000,
        headcountRequired: 2,
        welfare: wCodes.map((code: string) => ({ code })),
      })
      .expect(201);
    jobPublicId = draft.body.data.publicId;
    expect(draft.body.data.status).toBe('DRAFT');
    expect(draft.body.data.workDays).toHaveLength(3); // derived across the range
    expect(draft.body.data.payLabel).toBe('₹750 / day');

    // Gate #10 (CONFIRMED): not verified yet → publish blocked, not queued
    const blocked = await http()
      .post(`/api/v1/jobs/${jobPublicId}/publish`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(403);
    expect(blocked.body.error.code).toBe('KYC_REQUIRED');

    // SETUP shortcut (documented): mark the employer VERIFIED directly —
    // the K0–K5 user journey itself is proven in kyc.e2e-spec.ts.
    const account = await prisma.account.findUnique({ where: { phone: PHONES.employer } });
    expect(account).not.toBeNull();
    await prisma.kycSubmission.create({
      data: {
        accountId: account!.id,
        status: 'VERIFIED',
        idType: 'PAN',
        idNumberEnc: Buffer.from('E2E-SETUP'),
        idNumberHash: `journey-kyc-${account!.id}`,
        submittedAt: new Date(),
        decidedAt: new Date(),
      },
    });

    const published = await http()
      .post(`/api/v1/jobs/${jobPublicId}/publish`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(201);
    expect(published.body.data.status).toBe('OPEN');
  });

  // --- Discover & match ----------------------------------------------------
  it('worker A sees job in discovery feed (filters + distance, no address leak)', async () => {
    const feed = await http()
      .get('/api/v1/jobs')
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    const item = feed.body.data.find((j: { publicId: string }) => j.publicId === jobPublicId);
    expect(item).toBeDefined();
    expect(item.viewerBadges.kycOk).toBe(false); // worker A is not verified yet
    expect(item.distanceKm).toBe(0); // same area as the profile (Singanallur)
    expect(item.addressLine).toBe(''); // §18 — hidden until hired
    expect(item.coordinatesAvailable).toBe(false);

    // keyword filter narrows the feed server-side
    const q = await http()
      .get('/api/v1/jobs?q=loading%20crew')
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(q.body.data.some((j: { publicId: string }) => j.publicId === jobPublicId)).toBe(true);

    // welfare filter
    const byWelfare = await http()
      .get(`/api/v1/jobs?welfareCodes=${item.welfare[0].code}`)
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(byWelfare.body.data.some((j: { publicId: string }) => j.publicId === jobPublicId)).toBe(true);

    // employer (owner) sees the full address; worker detail never leaks it
    const ownerView = await http()
      .get(`/api/v1/jobs/${jobPublicId}`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(200);
    expect(ownerView.body.data.addressLine).not.toBe('');
    expect(ownerView.body.data.coordinatesAvailable).toBe(true);

    const workerView = await http()
      .get(`/api/v1/jobs/${jobPublicId}`)
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(workerView.body.data.addressLine).toBe('');
    expect(workerView.body.data.coordinatesAvailable).toBe(false);
  });
  it('matching returns worker A/B with reason codes + match_log row', async () => {
    const before = await prisma.matchLog.count({ where: { job: { publicId: jobPublicId } } });

    const res = await http()
      .get(`/api/v1/matching/jobs/${jobPublicId}/candidates`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(200);

    expect(res.body.data.jobPublicId).toBe(jobPublicId);
    expect(res.body.data.weightsVersion).toBeGreaterThanOrEqual(1);
    expect(res.body.data.candidates.length).toBeGreaterThanOrEqual(2);
    for (const c of res.body.data.candidates) {
      expect(c.score).toBeGreaterThanOrEqual(0);
      expect(c.score).toBeLessThanOrEqual(1000);
      expect(c.reasonCodes.length).toBeGreaterThan(0);
      expect(typeof c.distanceBand).toBe('string');
      expect(c.signals).toHaveProperty('proximityMilli');
    }

    const ids = res.body.data.candidates.map((c: { workerPublicId: string }) => c.workerPublicId);
    const wA = await prisma.workerProfile.findFirst({
      where: { account: { phone: PHONES.workerA } },
      select: { publicId: true },
    });
    const wB = await prisma.workerProfile.findFirst({
      where: { account: { phone: PHONES.workerB } },
      select: { publicId: true },
    });
    expect(ids).toContain(wA!.publicId);
    expect(ids).toContain(wB!.publicId);

    // every request is inspectable: one new match_log row with the version
    const after = await prisma.matchLog.count({ where: { job: { publicId: jobPublicId } } });
    expect(after).toBe(before + 1);
    const log = await prisma.matchLog.findFirst({
      where: { job: { publicId: jobPublicId } },
      orderBy: { createdAt: 'desc' },
    });
    expect(log!.publicId).toBe(res.body.data.logId);
    expect(log!.weightsVersion).toBe(res.body.data.weightsVersion);
  });

  // --- Apply & hire (state machine M1/M2) ----------------------------------
  it("worker A applies → APPLIED (employer gets batched APPLICATION_RECEIVED)", async () => {
    // Action-based KYC gate (owner brief): UNVERIFIED apply is refused BEFORE
    // any row/idempotency record exists, so the SAME key works after KYC.
    const gated = await http()
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${workerAToken}`)
      .set('Idempotency-Key', 'journey-apply-workerA-0001')
      .send({ jobId: jobPublicId, coverNote: '4 years warehouse experience' });
    expect(gated.status).toBe(403);
    expect(gated.body.error.code).toBe('KYC_REQUIRED');

    await verifyWorkerJourney(PHONES.workerA, 'A');

    const res = await http()
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${workerAToken}`)
      .set('Idempotency-Key', 'journey-apply-workerA-0001')
      .send({ jobId: jobPublicId, coverNote: '4 years warehouse experience' })
      .expect(201);
    expect(res.body.data.status).toBe('APPLIED');
    applicationAId = res.body.data.publicId;

    // replay with the SAME key returns the stored response — no second row
    const replay = await http()
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${workerAToken}`)
      .set('Idempotency-Key', 'journey-apply-workerA-0001')
      .send({ jobId: jobPublicId, coverNote: '4 years warehouse experience' })
      .expect(201);
    expect(replay.body.data.publicId).toBe(applicationAId);

    // fresh key, same job → UNIQUE(job, worker) holds
    const dup = await http()
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${workerAToken}`)
      .set('Idempotency-Key', 'journey-apply-workerA-0002')
      .send({ jobId: jobPublicId })
      .expect(409);
    expect(dup.body.error.code).toBe('DUPLICATE_APPLICATION');

    // J2: first application flips OPEN → HIRING
    const detail = await http()
      .get(`/api/v1/jobs/${jobPublicId}`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(200);
    expect(detail.body.data.status).toBe('HIRING');

    // notifications: worker receipt + employer (batched) APPLICATION_RECEIVED
    const submitted = await prisma.notification.count({
      where: { eventKey: 'APPLICATION_SUBMITTED', contextPublicId: applicationAId },
    });
    expect(submitted).toBe(1);
    const received = await prisma.notification.count({ where: { eventKey: 'APPLICATION_RECEIVED' } });
    expect(received).toBeGreaterThan(0);

    // employer queue shows the application with a worker card
    const queue = await http()
      .get(`/api/v1/jobs/${jobPublicId}/queue`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(200);
    expect(queue.body.data).toHaveLength(1);
    expect(queue.body.data[0].application.worker.fullName).toBe('Worker A');
    expect(queue.body.data[0].application.worker.kycBadge).toBe(true); // verified before applying
    expect(queue.body.data[0].application.conflictWarning).toBe(false);
  });

  it('employer shortlists → hires A (slots+conflicts in tx; crew ACTIVE)', async () => {
    const shortlisted = await http()
      .post(`/api/v1/applications/${applicationAId}/decision`)
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-shortlist-A-0001')
      .send({ action: 'shortlist', note: 'Good experience' })
      .expect(200);
    expect(shortlisted.body.data.status).toBe('SHORTLISTED');

    // Gate #10 defense-in-depth: A applied while VERIFIED; simulate a status
    // regression so the hire-time revalidation stays covered end-to-end.
    const accA = await prisma.account.findUnique({ where: { phone: PHONES.workerA } });
    expect(accA).not.toBeNull();
    const subA = await prisma.kycSubmission.findFirst({ where: { accountId: accA!.id } });
    expect(subA).not.toBeNull();
    await prisma.kycSubmission.update({ where: { id: subA!.id }, data: { status: 'REJECTED' } });

    const blocked = await http()
      .post(`/api/v1/applications/${applicationAId}/decision`)
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-hire-A-blocked-0001')
      .send({ action: 'hire' })
      .expect(403);
    expect(blocked.body.error.code).toBe('KYC_REQUIRED');

    await prisma.kycSubmission.update({ where: { id: subA!.id }, data: { status: 'VERIFIED' } });

    const hired = await http()
      .post(`/api/v1/applications/${applicationAId}/decision`)
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-hire-A-0001')
      .send({ action: 'hire' })
      .expect(200);
    expect(hired.body.data.status).toBe('HIRED');

    // seat created atomically; hired_count = 1 of 2; job still HIRING
    const crew = await prisma.crewMember.findMany({
      where: { job: { publicId: jobPublicId }, status: 'ACTIVE' },
    });
    expect(crew).toHaveLength(1);
    const job = await prisma.job.findUnique({ where: { publicId: jobPublicId } });
    expect(job!.hiredCount).toBe(1);
    expect(job!.status).toBe('HIRING');

    // HIRED notification (critical: in-app + push + SMS channels)
    const hiredNotifs = await prisma.notification.count({
      where: { eventKey: 'HIRED', contextPublicId: applicationAId },
    });
    expect(hiredNotifs).toBe(1);

    // §18: address is now visible to the hired worker
    const workerView = await http()
      .get(`/api/v1/jobs/${jobPublicId}`)
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(workerView.body.data.addressLine).not.toBe('');
  });

  it('quick-match offer → worker B accepts → HIRED with source=QUICK_MATCH', async () => {
    const job = await prisma.job.findUnique({ where: { publicId: jobPublicId } });

    // setup shortcut: B becomes discoverable (open-to-work + same city)
    await prisma.workerProfile.updateMany({
      where: { account: { phone: PHONES.workerB } },
      data: { openToWork: true, city: (job as unknown as { city: string }).city },
    });

    // Quick Hire availability preview (owner brief §16): REAL aggregates,
    // owner-only — checked BEFORE launch so the pool is untouched.
    const avail = await http()
      .get(`/api/v1/quick-match/availability?jobPublicId=${jobPublicId}&radiusKm=25`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(200);
    expect(avail.body.data.availableNearby).toBeGreaterThanOrEqual(1);
    expect(avail.body.data.potentialMatches).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(avail.body.data.bands)).toBe(true);
    const availAsWorker = await http()
      .get(`/api/v1/quick-match/availability?jobPublicId=${jobPublicId}`)
      .set('Authorization', `Bearer ${workerBToken}`);
    expect(availAsWorker.status).toBe(403);

    // employer launches a timed wave (A is crew already → only B remains)
    const launch = await http()
      .post('/api/v1/quick-match')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-qm-launch-0001')
      .send({
        jobPublicId,
        headcount: 1,
        windowStart: (job as unknown as { startsOn: Date }).startsOn.toISOString(),
        windowEnd: (job as unknown as { endsOn: Date }).endsOn.toISOString(),
        requirementSnapshot: 'Warehouse helper — 1 person',
        radiusKm: 25,
        waveSize: 10,
      })
      .expect(201);
    expect(launch.body.data.created).toBeGreaterThanOrEqual(1);
    expect(launch.body.data.waveNo).toBe(1);

    // worker B sees the PENDING offer with its window
    const offers = await http()
      .get('/api/v1/quick-match?status=PENDING')
      .set('Authorization', `Bearer ${workerBToken}`)
      .expect(200);
    const offer = offers.body.data.find(
      (o: { job: { publicId: string } }) => o.job.publicId === jobPublicId,
    );
    expect(offer).toBeTruthy();
    expect(offer.status).toBe('PENDING');
    expect(typeof offer.respondBy).toBe('string');
    expect(offer.requirementSnapshot).not.toBe('');
    // match reasons ride along with the offer (same vocabulary as candidates)
    expect(Array.isArray(offer.reasonCodes)).toBe(true);

    // Action-based KYC on FlashMatch accept (respond routes through apply):
    // refused while UNVERIFIED, and the offer stays PENDING (not burned).
    const gated = await http()
      .post(`/api/v1/quick-match/${offer.publicId}/respond`)
      .set('Authorization', `Bearer ${workerBToken}`)
      .send({ response: 'ACCEPT' });
    expect(gated.status).toBe(403);
    expect(gated.body.error.code).toBe('KYC_REQUIRED');
    const pendingAfterGated = await http()
      .get('/api/v1/quick-match?status=PENDING')
      .set('Authorization', `Bearer ${workerBToken}`)
      .expect(200);
    expect(
      pendingAfterGated.body.data.find(
        (o: { publicId: string }) => o.publicId === offer.publicId,
      ),
    ).toBeTruthy();
    await verifyWorkerJourney(PHONES.workerB, 'B');

    // accept → offer claimed + application row created in one transaction
    const resp = await http()
      .post(`/api/v1/quick-match/${offer.publicId}/respond`)
      .set('Authorization', `Bearer ${workerBToken}`)
      .send({ response: 'ACCEPT' })
      .expect(201);
    expect(resp.body.data.status).toBe('ACCEPTED');

    const applicationId = resp.body.data.application.publicId as string;
    const appRow = await prisma.application.findUnique({ where: { publicId: applicationId } });
    expect(appRow!.source).toBe('QUICK_MATCH');
    expect(appRow!.status).toBe('APPLIED');

    // second answer on the same offer is refused (already accepted)
    const again = await http()
      .post(`/api/v1/quick-match/${offer.publicId}/respond`)
      .set('Authorization', `Bearer ${workerBToken}`)
      .send({ response: 'DECLINE' })
      .expect(409);
    expect(again.body.error.code).toBe('STATE_INVALID');

    // the FILLED test below hires THIS application (no second apply)
    applicationBId = applicationId;
  });

  it('job reaches FILLED; duplicate/last-slot attempts return 409 (race paths)', async () => {
    // worker B applies for the last seat
    // B's application already exists when the Quick Match test ran first
    if (!applicationBId) {
      const applyB = await http()
        .post('/api/v1/applications')
        .set('Authorization', `Bearer ${workerBToken}`)
        .set('Idempotency-Key', 'journey-apply-workerB-0001')
        .send({ jobId: jobPublicId })
        .expect(201);
      applicationBId = applyB.body.data.publicId;
    }

    // B was VERIFIED in the quick-match test above (action-based gate)
    await verifyWorkerJourney(PHONES.workerB, 'B');

    // RACE: two simultaneous hires for the LAST seat → exactly one 200 + one 409
    const [r1, r2] = await Promise.all([
      http()
        .post(`/api/v1/applications/${applicationBId}/decision`)
        .set('Authorization', `Bearer ${employerToken}`)
        .set('Idempotency-Key', 'journey-race-hire-B-0001')
        .send({ action: 'hire' }),
      http()
        .post(`/api/v1/applications/${applicationBId}/decision`)
        .set('Authorization', `Bearer ${employerToken}`)
        .set('Idempotency-Key', 'journey-race-hire-B-0002')
        .send({ action: 'hire' }),
    ]);
    const statuses = [r1.status, r2.status];
    expect(statuses.filter((s) => s === 200)).toHaveLength(1);
    expect(statuses.filter((s) => s === 409)).toHaveLength(1);

    // J3: exactly 2 seats, 2 hired → FILLED; never over-filled
    const job = await prisma.job.findUnique({ where: { publicId: jobPublicId } });
    expect(job!.hiredCount).toBe(2);
    expect(job!.status).toBe('FILLED');

    // the quick-match route's application carries its source through hire
    const appB = await prisma.application.findUnique({ where: { publicId: applicationBId } });
    expect(appB!.source).toBe('QUICK_MATCH');
    expect(appB!.status).toBe('HIRED');
    const crew = await prisma.crewMember.count({
      where: { job: { publicId: jobPublicId }, status: 'ACTIVE' },
    });
    expect(crew).toBe(2);

    // J3 side effect: STAFFED event to the employer
    const staffed = await prisma.notification.count({
      where: { eventKey: 'JOB_STAFFED', contextPublicId: jobPublicId },
    });
    expect(staffed).toBe(1);

    // FILLED jobs leave discovery
    const feed = await http()
      .get('/api/v1/jobs')
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(feed.body.data.some((j: { publicId: string }) => j.publicId === jobPublicId)).toBe(false);

    // re-deciding the already-HIRED application → 409
    const again = await http()
      .post(`/api/v1/applications/${applicationBId}/decision`)
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-hire-B-again-0001')
      .send({ action: 'hire' })
      .expect(409);
    expect(again.body.error.code).toBe('APPLICATION_NOT_APPLICABLE');
  });

  // --- Manage & attend (M3) ------------------------------------------------
  it('employer opens attendance → rotating QR token; hired workers see the address', async () => {
    // Time-window fixture (documented): check-in windows are minutes-of-day
    // based, so the suite runs green at ANY hour — day 1 gets a window that
    // contains NOW, day 2 a window that provably does not (freshness and
    // window guards are then asserted against it).
    const istMin = (): number => {
      const d = new Date(Date.now() + 330 * 60_000);
      return d.getUTCHours() * 60 + d.getUTCMinutes();
    };
    const fmt = (m: number): string =>
      `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
    const now = istMin();
    const openStart = Math.max(0, now - 30); // IN window [start-60, start+120] contains now
    const openEnd = Math.min(now + 240, 1439); // OUT window ≤ end+60 contains now
    const closedStart = (now + 180) % 1440; // now sits outside [start-60, start+120]

    const days = await prisma.jobWorkDay.findMany({
      where: { job: { publicId: jobPublicId } },
      orderBy: { workDate: 'asc' },
    });
    expect(days).toHaveLength(3);
    const at = (m: number): Date => new Date(`1970-01-01T${fmt(m)}:00.000Z`);
    await prisma.jobWorkDay.update({ where: { id: days[0].id }, data: { startTime: at(openStart), endTime: at(openEnd) } });
    await prisma.jobWorkDay.update({ where: { id: days[1].id }, data: { startTime: at(closedStart), endTime: at((closedStart + 300) % 1440) } });

    // issue: signed rotating token for a real work day
    const tok = await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ date: '2026-10-05' })
      .expect(201);
    expect(tok.body.data.payload.length).toBeGreaterThan(20);
    expect(tok.body.data.expiresSec).toBe(60);
    expect(tok.body.data.rotateEverySec).toBeLessThanOrEqual(60);
    expect(tok.body.data.jobPublicId).toBe(jobPublicId);
    expect(tok.body.data.workDate).toBe('2026-10-05');

    // non-work date → validation error, no token minted
    await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ date: '2026-12-25' })
      .expect(422);

    // §18: the hired worker now sees the exact address (strangers still can't —
    // proven in jobs.e2e-spec; here we prove the post-hire unhide)
    const detail = await http()
      .get(`/api/v1/jobs/${jobPublicId}`)
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(detail.body.data.addressLine).toContain('SIDCO');
  });

  it('workers check in/out via QR; window + freshness + replay guards hold', async () => {
    const tok = await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ date: '2026-10-05' })
      .expect(201);
    const payload: string = tok.body.data.payload;

    // worker A self scan → CHECKED_IN (J6: job opens)
    const ain = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerAToken}`)
      .send({ payload, action: 'IN' })
      .expect(201);
    expect(ain.body.data.status).toBe('CHECKED_IN');
    expect(ain.body.data.checkSource).toBe('SCAN');
    expect(ain.body.data.checkInAt).toBeTruthy();

    // J6 side effect: the job is now IN_PROGRESS
    const job = await prisma.job.findUnique({ where: { publicId: jobPublicId } });
    expect(job!.status).toBe('IN_PROGRESS');

    // replay: same worker, same day → ATTENDANCE_DUPLICATE (single-use)
    const replay = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerAToken}`)
      .send({ payload, action: 'IN' })
      .expect(409);
    expect(replay.body.error.code).toBe('ATTENDANCE_DUPLICATE');

    // tampered signature → ATTENDANCE_TOKEN_INVALID
    const forged = `${payload.slice(0, -3)}zzz`;
    const bad = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerAToken}`)
      .send({ payload: forged, action: 'IN' })
      .expect(401); // signed-QR failures are 401 per §24
    expect(bad.body.error.code).toBe('ATTENDANCE_TOKEN_INVALID');

    // worker B marked manually by the employer (roster tap → EMPLOYER source)
    const bWp = await prisma.workerProfile.findFirst({
      where: { account: { phone: PHONES.workerB } },
      select: { publicId: true },
    });
    const bManual = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ payload, action: 'IN', workerPublicId: bWp!.publicId })
      .expect(201);
    expect(bManual.body.data.status).toBe('CHECKED_IN');
    expect(bManual.body.data.checkSource).toBe('EMPLOYER');

    // no target = the employer marking THEMSELF → no worker profile, 422
    const selfMark = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ payload, action: 'IN' })
      .expect(422);
    expect(selfMark.body.error.code).toBe('PROFILE_INCOMPLETE');

    // day 2's window does not contain NOW → closed, even with a valid token
    const tok2 = await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ date: '2026-10-06' })
      .expect(201);
    const win = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerAToken}`)
      .send({ payload: tok2.body.data.payload, action: 'IN' })
      .expect(409);
    expect(win.body.error.code).toBe('ATTENDANCE_WINDOW_CLOSED');

    // Fixture: backdate the check-ins so same-minute OUTs still yield a
    // real duration (≈90 min) — the pay assertions rely on minutes > 0.
    await prisma.attendanceRecord.updateMany({
      where: { job: { publicId: jobPublicId }, status: 'CHECKED_IN' },
      data: { checkInAt: new Date(Date.now() - 90 * 60_000) },
    });

    // check-outs → duration recorded
    for (const token of [workerAToken, workerBToken]) {
      const out = await http()
        .post('/api/v1/attendance/check')
        .set('Authorization', `Bearer ${token}`)
        .send({ payload, action: 'OUT' })
        .expect(201);
      expect(out.body.data.status).toBe('CHECKED_OUT');
      expect(out.body.data.durationMinutes).toBeGreaterThanOrEqual(0);
    }
  });

  it('employer approves day → attendance APPROVED; earnings still locked until completion', async () => {
    const roster = await http()
      .get(`/api/v1/jobs/${jobPublicId}/roster?date=2026-10-05`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(200);
    expect(roster.body.data.rows).toHaveLength(2);
    const recordIds = roster.body.data.rows.map((r: { attendance: { publicId: string } | null }) => r.attendance!.publicId);
    expect(recordIds).toHaveLength(2);
    for (const r of roster.body.data.rows) {
      expect(r.attendance.status).toBe('CHECKED_OUT');
      expect(r.earningStatus).toBe('PENDING'); // P0 shell from the hire
    }

    const ok = await http()
      .post('/api/v1/attendance/approve')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ recordIds })
      .expect(201);
    expect(ok.body.data.approved).toBe(2);

    const again = await http()
      .post('/api/v1/attendance/approve')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ recordIds })
      .expect(409);
    expect(again.body.error.code).toBe('STATE_INVALID'); // only CHECKED_OUT approves

    const notices = await prisma.notification.count({
      where: { eventKey: 'ATTENDANCE_APPROVED', contextPublicId: jobPublicId },
    });
    expect(notices).toBeGreaterThanOrEqual(1);

    // P1 waits for completion — approval alone never makes money ELIGIBLE
    const pendings = await prisma.earning.count({ where: { job: { publicId: jobPublicId }, status: 'PENDING' } });
    expect(pendings).toBe(2);
  });

  // --- Complete, pay, rate (M4) --------------------------------------------
  it('job COMPLETED after final work day; no-show path exercised separately', async () => {
    // premature complete → every record must be resolved first
    const early = await http()
      .post(`/api/v1/jobs/${jobPublicId}/complete`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(409);
    expect(early.body.error.code).toBe('STATE_INVALID');

    // days 2 & 3: nobody came → employer marks NO_SHOW (audited, reason ≥ 5)
    const pending = await prisma.attendanceRecord.findMany({
      where: { job: { publicId: jobPublicId }, status: 'NOT_STARTED' },
      select: { publicId: true },
    });
    expect(pending).toHaveLength(4); // 2 workers × days 2-3
    for (const rec of pending) {
      const mark = await http()
        .post(`/api/v1/attendance/${rec.publicId}/correct`)
        .set('Authorization', `Bearer ${employerToken}`)
        .send({ status: 'NO_SHOW', reason: 'Crew never arrived on these days' })
        .expect(201);
      expect(mark.body.data.status).toBe('NO_SHOW');
    }

    // reason is mandatory (T5/T6)
    const noReason = await http()
      .post(`/api/v1/attendance/${pending[0].publicId}/correct`)
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ status: 'NO_SHOW' })
      .expect(422);
    expect(noReason.body.error.code).toBe('VALIDATION_FAILED');

    const done = await http()
      .post(`/api/v1/jobs/${jobPublicId}/complete`)
      .set('Authorization', `Bearer ${employerToken}`);
    expect(done.status).toBe(201);
    expect(done.body.data.status).toBe('COMPLETED');
    expect(done.body.data.earnings).toEqual({ eligible: 2, cancelled: 0 });

    // P1: each earning is ELIGIBLE with approved-work amount (1 day × ₹750)
    const earnings = await prisma.earning.findMany({ where: { job: { publicId: jobPublicId } } });
    expect(earnings).toHaveLength(2);
    for (const e of earnings) {
      expect(e.status).toBe('ELIGIBLE');
      expect(e.amountPaise).toBe(75_000n);
    }
    const ready = await prisma.notification.count({
      where: { eventKey: 'EARNINGS_READY', contextPublicId: jobPublicId },
    });
    expect(ready).toBe(1);

    // COMPLETED is final for J7
    const again = await http()
      .post(`/api/v1/jobs/${jobPublicId}/complete`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(409);
    expect(again.body.error.code).toBe('STATE_INVALID');
  });

  it('employer approves earnings → records manual payout (AMOUNT_MISMATCH on mismatch)', async () => {
    const list = await http()
      .get(`/api/v1/jobs/${jobPublicId}/earnings`)
      .set('Authorization', `Bearer ${employerToken}`)
      .expect(200);
    const ids: string[] = list.body.data.map((e: { publicId: string }) => e.publicId);
    expect(ids).toHaveLength(2);
    expect(list.body.data[0].attendanceMinutes).toBeGreaterThan(0);

    // worker-initiated money action → hard 403 (role guard)
    await http()
      .post('/api/v1/earnings/approve')
      .set('Authorization', `Bearer ${workerAToken}`)
      .send({ earningIds: ids })
      .expect(403);

    // P2 approve (Idempotency-Key required) + idempotent replay
    const approved = await http()
      .post('/api/v1/earnings/approve')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-earnings-approve-0001')
      .send({ earningIds: ids })
      .expect(201);
    expect(approved.body.data.approved).toBe(2);

    const replay = await http()
      .post('/api/v1/earnings/approve')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-earnings-approve-0001')
      .send({ earningIds: ids })
      .expect(201);
    expect(replay.body.data.approved).toBe(2); // replay = original response

    const fresh = await http()
      .post('/api/v1/earnings/approve')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-earnings-approve-0002')
      .send({ earningIds: ids })
      .expect(409);
    expect(fresh.body.error.code).toBe('EARNING_STATE_INVALID');

    // P4 reconciliation: client total must match the locked amounts
    const mismatch = await http()
      .post('/api/v1/earnings/mark-paid')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-paid-mismatch-0001')
      .send({ earningIds: ids, reference: 'UTR2026X1', totalPaise: 149_999, currency: 'INR' })
      .expect(409);
    expect(mismatch.body.error.code).toBe('AMOUNT_MISMATCH');

    const paid = await http()
      .post('/api/v1/earnings/mark-paid')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-paid-ok-0001')
      .send({ earningIds: ids, reference: 'UTR2026X1', totalPaise: 150_000, currency: 'INR' })
      .expect(201);
    expect(paid.body.data.status).toBe('PAID');
    expect(paid.body.data.earnings).toHaveLength(2);
    expect(paid.body.data.earnings.reduce((a: number, e: { amountPaise: number }) => a + e.amountPaise, 0)).toBe(150_000);

    // replay same key → SAME transaction, never a second payment
    const paidAgain = await http()
      .post('/api/v1/earnings/mark-paid')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-paid-ok-0001')
      .send({ earningIds: ids, reference: 'UTR2026X1', totalPaise: 150_000, currency: 'INR' })
      .expect(201);
    expect(paidAgain.body.data.publicId).toBe(paid.body.data.publicId);

    // PAID is immutable: a NEW key hits the P4 wall
    const again = await http()
      .post('/api/v1/earnings/mark-paid')
      .set('Authorization', `Bearer ${employerToken}`)
      .set('Idempotency-Key', 'journey-paid-again-0002')
      .send({ earningIds: ids, reference: 'UTR2026X2', totalPaise: 150_000, currency: 'INR' })
      .expect(409);
    expect(again.body.error.code).toBe('EARNING_STATE_INVALID');

    // worker sees the payout in their ledger + jobs-done ticks up
    const mine = await http()
      .get('/api/v1/earnings?status=PAID')
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(mine.body.data.length).toBeGreaterThanOrEqual(1);
    expect(mine.body.data[0].status).toBe('PAID');

    const wp = await prisma.workerProfile.findFirst({
      where: { account: { phone: PHONES.workerA } },
      select: { jobsDoneCount: true },
    });
    expect(wp!.jobsDoneCount).toBeGreaterThanOrEqual(1);

    const recorded = await prisma.notification.count({
      where: { eventKey: 'PAYMENT_RECORDED', contextPublicId: jobPublicId },
    });
    expect(recorded).toBeGreaterThanOrEqual(1);
  });

  it('both sides rate (double-blind) → aggregates recomputed; second submit = 409 ALREADY_RATED', async () => {
    const wA = await prisma.workerProfile.findFirst({
      where: { account: { phone: PHONES.workerA } },
      select: { account: { select: { publicId: true } }, avgRatingMilli: true },
    });
    const empAcct = await prisma.employerProfile.findFirst({
      where: { account: { phone: PHONES.employer } },
      select: { account: { select: { publicId: true } } },
    });

    // employer rates worker A first — comment stays hidden (worker silent so far)
    const byEmployer = await http()
      .post('/api/v1/ratings')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({
        jobPublicId,
        rateeAccountPublicId: wA!.account.publicId,
        score: 5,
        tags: ['ON_TIME', 'GOOD_WORK'],
        comment: 'Punctual all week',
      })
      .expect(201);
    expect(byEmployer.body.data.score).toBe(5);
    expect(byEmployer.body.data.commentVisible).toBe(false);
    expect(byEmployer.body.data.comment).toBeNull();
    expect(byEmployer.body.data.rater.displayName).toBe('Anonymous'); // still blind

    // worker A rates the employer back — now BOTH submitted → reveal flips on
    const byWorker = await http()
      .post('/api/v1/ratings')
      .set('Authorization', `Bearer ${workerAToken}`)
      .send({
        jobPublicId,
        rateeAccountPublicId: empAcct!.account.publicId,
        score: 4,
        comment: 'Fair pay, clear instructions',
      })
      .expect(201);
    expect(byWorker.body.data.commentVisible).toBe(true);
    expect(byWorker.body.data.comment).toBe('Fair pay, clear instructions');

    // second submit from the same side = 409 ALREADY_RATED
    const dup = await http()
      .post('/api/v1/ratings')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ jobPublicId, rateeAccountPublicId: wA!.account.publicId, score: 1 })
      .expect(409);
    expect(dup.body.error.code).toBe('ALREADY_RATED');

    // aggregates recomputed on both profiles (integer milli-units)
    const wAfter = await prisma.workerProfile.findFirst({
      where: { account: { phone: PHONES.workerA } },
      select: { avgRatingMilli: true, ratingsCount: true },
    });
    expect(wAfter!.avgRatingMilli).toBe(5000);
    expect(wAfter!.ratingsCount).toBe(1);
    const eAfter = await prisma.employerProfile.findFirst({
      where: { account: { phone: PHONES.employer } },
      select: { avgRatingMilli: true, ratingsCount: true },
    });
    expect(eAfter!.avgRatingMilli).toBe(4000);
    expect(eAfter!.ratingsCount).toBe(1);

    const summary = await http()
      .get('/api/v1/me/rating-summary')
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(summary.body.data.avgRatingMilli).toBe(5000);
    expect(summary.body.data.distribution.five).toBe(1);

    // rated jobs drop off the pending list
    const pending = await http()
      .get('/api/v1/ratings/pending')
      .set('Authorization', `Bearer ${workerAToken}`)
      .expect(200);
    expect(pending.body.data.some((p: { jobPublicId: string }) => p.jobPublicId === jobPublicId)).toBe(false);

    // completion fired the rate-this-job prompt to both sides
    const prompts = await prisma.notification.count({
      where: { eventKey: 'RATING_REQUEST', contextPublicId: jobPublicId },
    });
    expect(prompts).toBeGreaterThanOrEqual(1);
  });

  // --- Cross-cutting proofs ------------------------------------------------
  it('every step above left audit_log rows + expected outbox/notification events (§22 matrix)', async () => {
    // §22: the story fired these events — every one landed in an inbox.
    const expectedEvents = [
      'APPLICATION_SUBMITTED',
      'APPLICATION_RECEIVED',
      'HIRED',
      'JOB_STAFFED',
      'QUICKMATCH_OFFER',
      'ATTENDANCE_APPROVED',
      'EARNINGS_READY',
      'PAYMENT_APPROVED',
      'PAYMENT_RECORDED',
      'RATING_REQUEST',
    ];
    for (const key of expectedEvents) {
      const notifications = await prisma.notification.count({ where: { eventKey: key } });
      expect(notifications, `missing in-app notification for ${key}`).toBeGreaterThanOrEqual(1);
      const inapp = await prisma.notificationDelivery.count({
        where: { channel: 'INAPP', outbox: { eventKey: key } },
      });
      expect(inapp, `missing INAPP delivery row for ${key}`).toBeGreaterThanOrEqual(1);
    }

    // nothing stuck in the outbox (sync dispatcher drains every enqueue)
    const stuck = await prisma.notificationOutbox.count({ where: { status: 'PENDING' } });
    expect(stuck).toBe(0);

    // audit ledger carries the story's key actions (append-only, per §12)
    const expectedAudits = [
      'APPLICATION_SUBMITTED',
      'APPLICATION_HIRED',
      'JOB_COMPLETED',
      'ATTENDANCE_CHECK_IN',
      'ATTENDANCE_APPROVED',
      'EARNINGS_APPROVED',
      'PAYMENT_RECORDED',
    ];
    for (const action of expectedAudits) {
      const rows = await prisma.auditLog.count({ where: { action } });
      expect(rows, `missing audit rows for ${action}`).toBeGreaterThanOrEqual(1);
    }
  });
});
