import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { hmacish } from '../src/common/crypto.js';
import { AttendanceService } from '../src/attendance/attendance.service.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Wave 5 attendance + payments EDGES (the journey carries the happy path):
 *   - token authenticity: garbage, tampered, EXPIRED (signed with the test
 *     secret so the failure is the freshness check, not the signature)
 *   - non-crew workers are refused even with a valid token
 *   - manual employer marks + audited corrections (reason mandatory)
 *   - the in-process sweeps: auto-checkout (T2) and NO_SHOW (T4)
 *   - money walls: pay before approve, empty selection, cross-employer isolation
 *
 * Fixture style: creates its own employer + two workers through the public
 * APIs; employer/worker KYC is marked VERIFIED directly (setup shortcut —
 * K0–K5 itself is proven in kyc.e2e-spec.ts, gate #10 in journey/jobs).
 */

// Fresh edge-fixture numbers (W4 lesson: never copy masked digits from tool
// output — these are test-only, collision-checked against this suite's wipe).
const PHONES = {
  emp: '+919000000101',
  worker: '+919000000102',
  stranger: '+919000000103',
};

let app: INestApplication;
let prisma: PrismaService;
let attendance: AttendanceService;
let areaId: string;
let categoryId: string;
let empToken = '';
let workerToken = '';
let strangerToken = '';
let jobPublicId = '';

const http = () => request(app.getHttpServer());
const istMin = (): number => {
  const d = new Date(Date.now() + 330 * 60_000);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
};
const fmt = (m: number): string =>
  `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const at = (m: number): Date => new Date(`1970-01-01T${fmt(m)}:00.000Z`);
const today = (): string => new Date(Date.now() + 330 * 60_000).toISOString().slice(0, 10);

async function register(phone: string): Promise<string> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

/** Sign a token with the test secret so the EXPIRY check is what fires. */
function signedToken(j: string, d: string, expSec: number): string {
  const body = Buffer.from(JSON.stringify({ j, d, n: 'edge-test-nonce', e: expSec })).toString('base64url');
  const secret = process.env.ATTENDANCE_TOKEN_SECRET ?? '';
  return `${body}.${hmacish(body, secret)}`;
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);
  attendance = app.get(AttendanceService);

  const phones = Object.values(PHONES).map((p) => `'${p}'`).join(',');
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
    await tx.$executeRawUnsafe(
      `DELETE jj FROM job jj JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe("DELETE FROM idempotency_key WHERE `key` LIKE 'edge-%'");
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });

  const catalog = await http().get('/api/v1/catalog').expect(200);
  areaId = catalog.body.data.areas[0].publicId;
  const warehouse = catalog.body.data.categories.find((c: { code: string }) => c.code === 'WAREHOUSE');
  categoryId = warehouse.publicId;

  const emp0 = await register(PHONES.emp);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${emp0}`)
    .send({
      role: 'employer',
      orgName: 'Edge Works',
      orgType: 'FIRM',
      contactName: 'Edge Owner',
      city: 'Coimbatore',
      areaId,
      addressLine: '3, Edge Lane',
    })
    .expect(201);
  const wk0 = await register(PHONES.worker);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${wk0}`)
    .send({ role: 'worker', fullName: 'Edge Worker', city: 'Coimbatore', areaId, bio: 'Edge cases', experienceYears: 2 })
    .expect(201);
  const st0 = await register(PHONES.stranger);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${st0}`)
    .send({ role: 'worker', fullName: 'Stranger Worker', city: 'Coimbatore', areaId, bio: 'Just browsing', experienceYears: 1 })
    .expect(201);
  // role was granted after the token was minted → re-mint (journey relogin())
  empToken = await register(PHONES.emp);
  workerToken = await register(PHONES.worker);
  strangerToken = await register(PHONES.stranger);

  // SETUP shortcut (documented): worker VERIFIED directly — K0–K5 itself is
  // proven in kyc.e2e-spec.ts; gate #10 blocks are journey-asserted.
  const wAcc = await prisma.account.findUnique({ where: { phone: PHONES.worker } });
  expect(wAcc).not.toBeNull();
  await prisma.kycSubmission.create({
    data: {
      accountId: wAcc!.id,
      status: 'VERIFIED',
      idType: 'PAN',
      idNumberEnc: Buffer.from('E2E-SETUP-EDGE'),
      idNumberHash: `edge-kyc-${wAcc!.id}`,
      submittedAt: new Date(),
      decidedAt: new Date(),
    },
  });

  // employer job — 2 work days, headcount 1, ₹750/day
  const now = istMin();
  const welfare = await http().get('/api/v1/welfare/catalog').expect(200);
  const wCodes = welfare.body.data.slice(0, 1).map((w: { code: string }) => w.code);
  const draft = await http()
    .post('/api/v1/jobs')
    .set('Authorization', `Bearer ${empToken}`)
    .send({
      title: 'Edge fixture job',
      description: 'Attendance and payment edge cases.',
      categoryId,
      city: 'Coimbatore',
      areaId,
      addressLine: '9, Edge Industrial Estate',
      lat: 11.01,
      lng: 77.02,
      startsOn: today(),
      endsOn: today(),
      dayStartTime: fmt(Math.max(0, now - 30)),
      dayEndTime: fmt(Math.min(now + 180, 1439)),
      payType: 'DAY',
      payAmountPaise: 75_000,
      headcountRequired: 1,
      welfare: wCodes.map((code: string) => ({ code })),
    })
    .expect(201);
  jobPublicId = draft.body.data.publicId;
  // one-day range → one derived work day; add a second explicit day tomorrow
  // (kept out of range validation by extending the job window first).
  // IST-safe: near midnight the UTC calendar day differs from IST's, so
  // "tomorrow" is computed from the IST date string, never Date.now()+24h.
  const tomorrowIst = new Date(Date.now() + 330 * 60_000 + 86_400_000).toISOString().slice(0, 10);
  await prisma.job.update({
    where: { publicId: jobPublicId },
    data: { endsOn: new Date(`${tomorrowIst}T00:00:00.000Z`) },
  });
  // second work day (tomorrow): its window deliberately excludes NOW
  await prisma.jobWorkDay.create({
    data: {
      jobId: (await prisma.job.findUniqueOrThrow({ where: { publicId: jobPublicId } })).id,
      workDate: new Date(`${tomorrowIst}T00:00:00.000Z`),
      startTime: at((now + 300) % 1440),
      endTime: at((now + 600) % 1440),
    },
  });

  await prisma.job.update({ where: { publicId: jobPublicId }, data: { status: 'OPEN' } }); // setup shortcut past gate #10 publish flow
  const applied = await http()
    .post('/api/v1/applications')
    .set('Authorization', `Bearer ${workerToken}`)
    .set('Idempotency-Key', 'edge-apply-0001')
    .send({ jobId: jobPublicId, coverNote: 'Ready for edge tests' })
    .expect(201);
  const appPub = applied.body.data.publicId;
  await http()
    .post(`/api/v1/applications/${appPub}/decision`)
    .set('Authorization', `Bearer ${empToken}`)
    .set('Idempotency-Key', 'edge-hire-0001')
    .send({ action: 'hire' })
    .expect(200);
});

afterAll(async () => {
  await app?.close();
});

describe('token authenticity (§19)', () => {
  it('garbage payload → ATTENDANCE_TOKEN_INVALID (401)', async () => {
    const res = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ payload: 'not-a-token-but-long-enough-to-pass-zod', action: 'IN' })
      .expect(401);
    expect(res.body.error.code).toBe('ATTENDANCE_TOKEN_INVALID');
  });

  it('correctly signed but EXPIRED token → ATTENDANCE_TOKEN_EXPIRED (401)', async () => {
    const expired = signedToken(jobPublicId, today(), Math.floor(Date.now() / 1000) - 30);
    const res = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ payload: expired, action: 'IN' })
      .expect(401);
    expect(res.body.error.code).toBe('ATTENDANCE_TOKEN_EXPIRED');
  });

  it('valid token + non-crew worker → FORBIDDEN (403)', async () => {
    const tok = await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ date: today() })
      .expect(201);
    const res = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${strangerToken}`)
      .send({ payload: tok.body.data.payload, action: 'IN' })
      .expect(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it("another employer's token on THEIR job… the stranger's employer perspective → wrong role is 403", async () => {
    // worker hitting the employer-only token endpoint
    await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ date: today() })
      .expect(403);
  });
});

describe('check-in happy path then duplicates', () => {
  it('check in, replay → ATTENDANCE_DUPLICATE (409), check out records duration', async () => {
    const tok = await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ date: today() })
      .expect(201);
    const payload: string = tok.body.data.payload;

    const inn = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ payload, action: 'IN' })
      .expect(201);
    expect(inn.body.data.status).toBe('CHECKED_IN');

    const dup = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ payload, action: 'IN' })
      .expect(409);
    expect(dup.body.error.code).toBe('ATTENDANCE_DUPLICATE');

    // manual correction with reason flips it back (T5) → then IN again works
    const reversed = await http()
      .post(`/api/v1/attendance/${inn.body.data.publicId}/correct`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ status: 'NOT_STARTED', reason: 'Wrong day scanned by mistake' })
      .expect(201);
    expect(reversed.body.data.status).toBe('NOT_STARTED');
    expect(reversed.body.data.checkInAt).toBeNull();

    const retry = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ payload, action: 'IN' })
      .expect(201);
    expect(retry.body.data.status).toBe('CHECKED_IN');

    // backdate so the OUT yields a real duration
    await prisma.attendanceRecord.updateMany({
      where: { job: { publicId: jobPublicId }, status: 'CHECKED_IN' },
      data: { checkInAt: new Date(Date.now() - 60 * 60_000) },
    });
    const out = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ payload, action: 'OUT' })
      .expect(201);
    expect(out.body.data.status).toBe('CHECKED_OUT');
    expect(out.body.data.durationMinutes).toBeGreaterThanOrEqual(60);

    // correction audits carry before/after (T6)
    const audits = await prisma.auditLog.findMany({
      where: { entityPublicId: inn.body.data.publicId },
      orderBy: { id: 'asc' },
    });
    expect(audits.map((a) => a.action)).toEqual(
      expect.arrayContaining(['ATTENDANCE_CHECK_IN', 'ATTENDANCE_REVERSED', 'ATTENDANCE_CHECK_IN']),
    );
    expect(audits.find((a) => a.action === 'ATTENDANCE_REVERSED')?.beforeJson).toBeTruthy();
  });

  it('day 2 token is valid but its window excludes now → 409 WINDOW_CLOSED', async () => {
    const tok = await http()
      .post(`/api/v1/jobs/${jobPublicId}/attendance/token`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ date: new Date(Date.now() + 330 * 60_000 + 86_400_000).toISOString().slice(0, 10) }) // IST tomorrow
      .expect(201);
    const res = await http()
      .post('/api/v1/attendance/check')
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ payload: tok.body.data.payload, action: 'IN' })
      .expect(409);
    expect(res.body.error.code).toBe('ATTENDANCE_WINDOW_CLOSED');
  });
});

describe('sweeps (T2 auto-checkout, T4 NO_SHOW)', () => {
  it('auto-closes an overdue CHECKED_IN record and flips abandoned days to NO_SHOW', async () => {
    const job = await prisma.job.findUniqueOrThrow({
      where: { publicId: jobPublicId },
      include: { workDays: true },
    });
    const day1 = job.workDays[0];
    const day2 = job.workDays[1];
    const worker = await prisma.workerProfile.findFirstOrThrow({
      where: { account: { phone: PHONES.worker } },
    });

    // T2 fixture: checked in, day long over (end + grace passed)
    await prisma.attendanceRecord.update({
      where: {
        jobId_workerProfileId_workDayId: {
          jobId: job.id,
          workDayId: day1.id,
          workerProfileId: worker.id,
        },
      },
      data: { status: 'CHECKED_IN', checkInAt: new Date(Date.now() - 6 * 3600_000), checkOutAt: null },
    });
    await prisma.jobWorkDay.update({
      where: { id: day1.id },
      data: { startTime: at(Math.max(0, istMin() - 420)), endTime: at(Math.max(0, istMin() - 360)) },
    });
    // T4 fixture: day 2 never started, cutoff (end + 120) passed
    await prisma.jobWorkDay.update({
      where: { id: day2.id },
      data: { startTime: at(Math.max(0, istMin() - 300)), endTime: at(Math.max(0, istMin() - 240)) },
    });
    await prisma.attendanceRecord.updateMany({
      where: { jobId: job.id, workDayId: day2.id },
      data: { status: 'NOT_STARTED' },
    });
    await prisma.crewMember.updateMany({ where: { jobId: job.id }, data: { status: 'ACTIVE' } });
    // back-date both work days: "overdue" must hold at any wall-clock hour
    // (minutes-of-day math wraps near midnight — the past-date rule catches it)
    const yesterday = new Date(Date.now() + 330 * 60_000 - 86_400_000).toISOString().slice(0, 10);
    const dayBefore = new Date(Date.now() + 330 * 60_000 - 2 * 86_400_000).toISOString().slice(0, 10);
    // UNIQUE(job, work_date): the two days must land on different dates
    await prisma.jobWorkDay.update({ where: { id: day1.id }, data: { workDate: new Date(`${yesterday}T00:00:00.000Z`) } });
    await prisma.jobWorkDay.update({ where: { id: day2.id }, data: { workDate: new Date(`${dayBefore}T00:00:00.000Z`) } });

    const result = await attendance.sweep();
    expect(result.autoClosed).toBeGreaterThanOrEqual(1);
    expect(result.noShows).toBeGreaterThanOrEqual(1);

    const d1 = await prisma.attendanceRecord.findUniqueOrThrow({
      where: { jobId_workerProfileId_workDayId: { jobId: job.id, workDayId: day1.id, workerProfileId: worker.id } },
    });
    expect(d1.status).toBe('CHECKED_OUT');
    expect(d1.durationMinutes).toBeGreaterThan(0);

    const d2 = await prisma.attendanceRecord.findUniqueOrThrow({
      where: { jobId_workerProfileId_workDayId: { jobId: job.id, workDayId: day2.id, workerProfileId: worker.id } },
    });
    expect(d2.status).toBe('NO_SHOW');
    const crew = await prisma.crewMember.findFirstOrThrow({ where: { jobId: job.id } });
    expect(crew.status).toBe('NO_SHOW');

    // system actions are audited with SYSTEM actor
    const audits = await prisma.auditLog.findMany({
      where: { entityPublicId: { in: [d1.publicId, d2.publicId] } },
    });
    expect(audits.map((a) => a.action)).toEqual(
      expect.arrayContaining(['ATTENDANCE_AUTO_CLOSED', 'ATTENDANCE_NO_SHOW']),
    );
    const noShowNotice = await prisma.notification.count({
      where: { eventKey: 'ATTENDANCE_NO_SHOW', contextPublicId: jobPublicId },
    });
    expect(noShowNotice).toBeGreaterThanOrEqual(1);
  });
});

describe('money walls (M4)', () => {
  it('paying PENDING earnings fails; empty selection fails; short reference fails', async () => {
    const earnings = await prisma.earning.findMany({ where: { job: { publicId: jobPublicId } } });
    expect(earnings).toHaveLength(1);
    const earningId = earnings[0].publicId;

    // P4 requires APPROVED — PENDING cannot pay
    const tooEarly = await http()
      .post('/api/v1/earnings/mark-paid')
      .set('Authorization', `Bearer ${empToken}`)
      .set('Idempotency-Key', 'edge-paid-early-0001')
      .send({ earningIds: [earningId], reference: 'UTREDGE1', totalPaise: 75_000, currency: 'INR' })
      .expect(409);
    expect(tooEarly.body.error.code).toBe('EARNING_STATE_INVALID');

    // no targets
    const empty = await http()
      .post('/api/v1/earnings/mark-paid')
      .set('Authorization', `Bearer ${empToken}`)
      .set('Idempotency-Key', 'edge-paid-empty-0001')
      .send({ earningIds: [], reference: 'UTREDGE2', totalPaise: 0, currency: 'INR' })
      .expect(422);
    expect(empty.body.error.code).toBe('VALIDATION_FAILED');

    // reference floor is 6 chars (STATE_MACHINES P4)
    const short = await http()
      .post('/api/v1/earnings/mark-paid')
      .set('Authorization', `Bearer ${empToken}`)
      .set('Idempotency-Key', 'edge-paid-short-0001')
      .send({ earningIds: [earningId], reference: 'abc', totalPaise: 75_000, currency: 'INR' })
      .expect(422);
    expect(short.body.error.code).toBe('VALIDATION_FAILED');
  });

  it("another employer cannot see or approve this job's earnings (404 isolation)", async () => {
    const other = await register(PHONES.stranger); // stranger is a WORKER — role wall first
    await http()
      .get(`/api/v1/jobs/${jobPublicId}/earnings`)
      .set('Authorization', `Bearer ${other}`)
      .expect(403);
  });
});
