var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ApiError } from '../common/api-error.js';
import { hmacish, randomToken, safeEqualHex } from '../common/crypto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { approveEligible, assertCheckInWindow, assertCheckOutWindow, assertCorrect, assertReverseCheckIn, computeDurationMinutes, noShowDue, } from './attendance.domain.js';
const GRACE_MIN = 60;
const CUTOFF_MIN = 120;
const TOKEN_TTL_SEC = 60;
const ROTATE_EVERY_SEC = 30;
const secret = () => {
    const s = process.env.ATTENDANCE_TOKEN_SECRET ?? process.env.JWT_ACCESS_SECRET ?? '';
    if (!s)
        throw new ApiError('VALIDATION_FAILED', 'ATTENDANCE_TOKEN_SECRET is not configured');
    return s;
};
const isoDate = (d) => d.toISOString().slice(0, 10);
const minutesOfDay = (d) => d.getUTCHours() * 60 + d.getUTCMinutes();
const nowMinutesIst = () => {
    const ist = new Date(Date.now() + 330 * 60_000);
    return ist.getUTCHours() * 60 + ist.getUTCMinutes();
};
const todayIst = () => isoDate(new Date(Date.now() + 330 * 60_000));
let AttendanceService = class AttendanceService {
    prisma;
    dispatcher;
    timer;
    constructor(prisma, dispatcher) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
    }
    onModuleInit() {
        if (process.env.NODE_ENV === 'test')
            return;
        this.timer = setInterval(() => {
            this.sweep().catch(() => undefined);
        }, 5 * 60 * 1000);
        this.timer.unref?.();
    }
    sign(claims) {
        const body = Buffer.from(JSON.stringify(claims)).toString('base64url');
        return `${body}.${hmacish(body, secret())}`;
    }
    verify(payload) {
        const dot = payload.lastIndexOf('.');
        if (dot <= 0)
            throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Malformed attendance token');
        const body = payload.slice(0, dot);
        const sig = payload.slice(dot + 1);
        if (!safeEqualHex(sig, hmacish(body, secret()))) {
            throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Attendance token signature mismatch');
        }
        let claims;
        try {
            claims = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
        }
        catch {
            throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Attendance token unreadable');
        }
        if (!claims?.j || !claims?.d || !claims?.e) {
            throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Attendance token incomplete');
        }
        if (claims.e < Math.floor(Date.now() / 1000)) {
            throw new ApiError('ATTENDANCE_TOKEN_EXPIRED', 'This QR code has expired — ask for a fresh one');
        }
        return claims;
    }
    tokenDto(jobPublicId, workDate) {
        return {
            payload: this.sign({
                j: jobPublicId,
                d: workDate,
                n: randomToken(),
                e: Math.floor(Date.now() / 1000) + TOKEN_TTL_SEC,
            }),
            expiresSec: TOKEN_TTL_SEC,
            rotateEverySec: ROTATE_EVERY_SEC,
            jobPublicId,
            workDate,
        };
    }
    async jobOwned(accountId, jobPublicId) {
        const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
        if (!profile)
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
        const job = await this.prisma.job.findUnique({
            where: { publicId: jobPublicId },
            include: { workDays: { orderBy: { workDate: 'asc' } } },
        });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        return job;
    }
    windowOf(workDay) {
        return {
            start: minutesOfDay(workDay.startTime),
            end: minutesOfDay(workDay.endTime),
            grace: GRACE_MIN,
            cutoff: CUTOFF_MIN,
        };
    }
    async recordFor(jobId, workDate, workerProfileId) {
        const workDay = await this.prisma.jobWorkDay.findFirst({
            where: { jobId, workDate: new Date(`${workDate}T00:00:00.000Z`) },
        });
        if (!workDay)
            throw new ApiError('NOT_FOUND', 'No work day on that date');
        const record = await this.prisma.attendanceRecord.findFirst({
            where: { jobId, workDayId: workDay.id, workerProfileId },
            include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
        });
        if (!record)
            throw new ApiError('NOT_FOUND', 'No attendance record for that worker/day');
        return { workDay, record };
    }
    dto(r, jobPublicId) {
        return {
            publicId: r.publicId,
            status: r.status,
            workDate: isoDate(r.workDay.workDate),
            checkInAt: r.checkInAt?.toISOString() ?? null,
            checkOutAt: r.checkOutAt?.toISOString() ?? null,
            checkSource: r.checkSource,
            durationMinutes: r.durationMinutes,
            worker: { publicId: r.worker.publicId, fullName: r.worker.fullName, photoUrl: null },
            jobPublicId,
            correctionReason: r.correctionReason,
        };
    }
    async audit(accountId, role, action, publicId, before, after) {
        await this.prisma.auditLog.create({
            data: {
                actorAccountId: accountId,
                actorRole: role,
                action,
                entityType: 'ATTENDANCE',
                entityPublicId: publicId,
                beforeJson: before,
                afterJson: after,
            },
        });
    }
    async issueToken(accountId, jobPublicId, date) {
        const job = await this.jobOwned(accountId, jobPublicId);
        const day = date ?? todayIst();
        const workDay = job.workDays.find((w) => isoDate(w.workDate) === day);
        if (!workDay)
            throw new ApiError('VALIDATION_FAILED', 'That date is not a work day for this job');
        if (!['OPEN', 'HIRING', 'FILLED', 'IN_PROGRESS'].includes(job.status)) {
            throw new ApiError('STATE_INVALID', `Job is ${job.status} — no attendance to take`);
        }
        return this.tokenDto(job.publicId, day);
    }
    async today(accountId) {
        const wp = await this.prisma.workerProfile.findUnique({ where: { accountId } });
        if (!wp)
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your work profile first');
        const day = todayIst();
        const crew = await this.prisma.crewMember.findFirst({
            where: {
                workerProfileId: wp.id,
                status: 'ACTIVE',
                job: { startsOn: { lte: new Date(`${day}T00:00:00.000Z`) } },
            },
            include: { job: { include: { workDays: { orderBy: { workDate: 'asc' } } } } },
        });
        if (!crew)
            return { token: null, record: null, job: null, workDate: day };
        const job = crew.job;
        const workDay = job.workDays.find((w) => isoDate(w.workDate) === day);
        if (!workDay)
            return { token: null, record: null, job: null, workDate: day };
        const { record } = await this.recordFor(job.id, day, wp.id);
        return {
            token: this.tokenDto(job.publicId, day),
            record: this.dto(record, job.publicId),
            job: { publicId: job.publicId, title: job.title, city: job.city, areaName: job.area?.name ?? '' },
            workDate: day,
        };
    }
    async check(accountId, input) {
        const claims = this.verify(input.payload);
        if (input.workerPublicId && input.workDate && input.workDate !== claims.d) {
            throw new ApiError('VALIDATION_FAILED', 'Manual mark date does not match the token day');
        }
        const job = await this.prisma.job.findUnique({
            where: { publicId: claims.j },
            include: { workDays: { orderBy: { workDate: 'asc' } } },
        });
        if (!job)
            throw new ApiError('NOT_FOUND', 'Job not found');
        if (['CANCELLED', 'EXPIRED', 'CLOSED', 'COMPLETED'].includes(job.status)) {
            throw new ApiError('STATE_INVALID', `Job is ${job.status}`);
        }
        let workerProfileId;
        let source;
        let role;
        if (input.workerPublicId) {
            const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
            if (!profile || profile.id !== job.employerProfileId) {
                throw new ApiError('FORBIDDEN', 'Only the hiring employer can mark attendance manually');
            }
            const target = await this.prisma.workerProfile.findUnique({ where: { publicId: input.workerPublicId } });
            if (!target)
                throw new ApiError('NOT_FOUND', 'Worker not found');
            workerProfileId = target.id;
            source = 'EMPLOYER';
            role = 'EMPLOYER';
        }
        else {
            const wp = await this.prisma.workerProfile.findUnique({ where: { accountId } });
            if (!wp)
                throw new ApiError('PROFILE_INCOMPLETE', 'Complete your work profile first');
            workerProfileId = wp.id;
            source = 'SCAN';
            role = 'WORKER';
        }
        const crew = await this.prisma.crewMember.findFirst({
            where: { jobId: job.id, workerProfileId, status: { in: ['ACTIVE', 'NO_SHOW'] } },
        });
        if (!crew)
            throw new ApiError('FORBIDDEN', 'That worker is not on this crew');
        const { workDay, record } = await this.recordFor(job.id, claims.d, workerProfileId);
        const day = this.windowOf(workDay);
        const now = nowMinutesIst();
        const before = { status: record.status, checkInAt: record.checkInAt, checkOutAt: record.checkOutAt };
        if (input.action === 'IN') {
            if (record.status !== 'NOT_STARTED') {
                throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked in for this day');
            }
            assertCheckInWindow(now, day);
            const updated = await this.prisma.$transaction(async (tx) => {
                const fresh = await tx.attendanceRecord.findUnique({ where: { id: record.id } });
                if (!fresh || fresh.status !== 'NOT_STARTED') {
                    throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked in for this day');
                }
                const row = await tx.attendanceRecord.update({
                    where: { id: record.id },
                    data: {
                        status: 'CHECKED_IN',
                        checkInAt: new Date(),
                        checkSource: source,
                        checkTokenId: claims.n,
                        sourceLat: input.lat ?? null,
                        sourceLng: input.lng ?? null,
                    },
                    include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
                });
                if (['OPEN', 'HIRING', 'FILLED'].includes(job.status)) {
                    await tx.job.update({ where: { id: job.id }, data: { status: 'IN_PROGRESS' } });
                }
                return row;
            });
            await this.audit(accountId, role, 'ATTENDANCE_CHECK_IN', record.publicId, before, { status: 'CHECKED_IN', checkInAt: updated.checkInAt });
            return this.dto(updated, job.publicId);
        }
        if (record.status === 'CHECKED_OUT') {
            throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked out for this day');
        }
        if (record.status !== 'CHECKED_IN') {
            throw new ApiError('STATE_INVALID', `Cannot check out from ${record.status}`);
        }
        assertCheckOutWindow(now, day);
        if (!record.checkInAt)
            throw new ApiError('STATE_INVALID', 'No check-in to close');
        const duration = computeDurationMinutes(record.checkInAt.toISOString(), new Date().toISOString());
        const updated = await this.prisma.$transaction(async (tx) => {
            const fresh = await tx.attendanceRecord.findUnique({ where: { id: record.id } });
            if (!fresh || fresh.status !== 'CHECKED_IN') {
                throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked out for this day');
            }
            return tx.attendanceRecord.update({
                where: { id: record.id },
                data: {
                    status: 'CHECKED_OUT',
                    checkOutAt: new Date(),
                    checkSource: source,
                    durationMinutes: duration,
                    checkTokenId: claims.n,
                },
                include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
            });
        });
        await this.audit(accountId, role, 'ATTENDANCE_CHECK_OUT', record.publicId, before, { status: 'CHECKED_OUT', durationMinutes: duration });
        return this.dto(updated, job.publicId);
    }
    async roster(accountId, jobPublicId, date) {
        const job = await this.jobOwned(accountId, jobPublicId);
        const day = date ?? (job.workDays.some((w) => isoDate(w.workDate) === todayIst()) ? todayIst() : isoDate(job.workDays[0]?.workDate ?? new Date()));
        const workDay = job.workDays.find((w) => isoDate(w.workDate) === day);
        if (!workDay)
            throw new ApiError('VALIDATION_FAILED', 'That date is not a work day for this job');
        const crew = await this.prisma.crewMember.findMany({
            where: { jobId: job.id, status: { in: ['ACTIVE', 'NO_SHOW', 'COMPLETED'] } },
            orderBy: { hiredAt: 'asc' },
            include: { workerProfile: { select: { publicId: true, fullName: true } } },
        });
        const records = await this.prisma.attendanceRecord.findMany({
            where: { jobId: job.id, workDayId: workDay.id },
            include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
        });
        const earnings = await this.prisma.earning.findMany({ where: { jobId: job.id } });
        const earningByWorker = new Map(earnings.map((e) => [e.workerProfileId.toString(), e.status]));
        const rows = crew.map((c) => {
            const record = records.find((r) => r.workerProfileId === c.workerProfileId);
            return {
                worker: {
                    publicId: c.workerProfile.publicId,
                    fullName: c.workerProfile.fullName,
                    photoUrl: null,
                    crewStatus: c.status,
                },
                attendance: record ? this.dto(record, job.publicId) : null,
                earningStatus: earningByWorker.get(c.workerProfileId.toString()) ?? 'PENDING',
            };
        });
        return { date: day, rows };
    }
    async approve(accountId, recordIds) {
        const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
        if (!profile)
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
        const records = await this.prisma.attendanceRecord.findMany({
            where: { publicId: { in: recordIds } },
            include: { job: { select: { employerProfileId: true, publicId: true } }, worker: { select: { accountId: true } } },
        });
        if (records.length !== recordIds.length)
            throw new ApiError('NOT_FOUND', 'Some records were not found');
        for (const r of records) {
            if (r.job.employerProfileId !== profile.id)
                throw new ApiError('NOT_FOUND', 'Some records were not found');
            approveEligible(r.status);
        }
        await this.prisma.attendanceRecord.updateMany({
            where: { publicId: { in: recordIds }, status: 'CHECKED_OUT' },
            data: { status: 'APPROVED' },
        });
        await this.audit(accountId, 'EMPLOYER', 'ATTENDANCE_APPROVED', records[0].job.publicId);
        await this.dispatcher.enqueue({
            eventKey: 'ATTENDANCE_APPROVED',
            recipientAccountIds: [...new Set(records.map((r) => r.worker.accountId))],
            contextType: 'JOB',
            contextPublicId: records[0].job.publicId,
            args: { days: String(records.length) },
        });
        return { approved: records.length };
    }
    async correct(accountId, recordId, input, role) {
        const record = await this.prisma.attendanceRecord.findUnique({
            where: { publicId: recordId },
            include: { workDay: true, worker: { select: { publicId: true, fullName: true } }, job: { select: { employerProfileId: true, publicId: true } } },
        });
        if (!record)
            throw new ApiError('NOT_FOUND', 'Record not found');
        if (role === 'EMPLOYER') {
            const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
            if (!profile || profile.id !== record.job.employerProfileId)
                throw new ApiError('NOT_FOUND', 'Record not found');
        }
        const current = record.status;
        const isReversal = input.status === 'NOT_STARTED';
        if (isReversal) {
            assertReverseCheckIn(current, input.reason);
        }
        else {
            assertCorrect(current, { reason: input.reason, status: input.status });
        }
        const before = { status: record.status, checkInAt: record.checkInAt, checkOutAt: record.checkOutAt, durationMinutes: record.durationMinutes };
        const data = isReversal
            ? { status: 'NOT_STARTED', checkInAt: null, checkOutAt: null, durationMinutes: null, checkSource: 'CORRECTED', correctionReason: input.reason, correctedByAccountId: accountId }
            : {
                ...(input.status ? { status: input.status } : {}),
                ...(input.checkInAt ? { checkInAt: new Date(input.checkInAt) } : {}),
                ...(input.checkOutAt ? { checkOutAt: new Date(input.checkOutAt) } : {}),
                checkSource: 'CORRECTED',
                correctionReason: input.reason,
                correctedByAccountId: accountId,
            };
        const updated = await this.prisma.attendanceRecord.update({
            where: { id: record.id },
            data,
            include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
        });
        await this.audit(accountId, role, isReversal ? 'ATTENDANCE_REVERSED' : 'ATTENDANCE_CORRECTED', record.publicId, before, {
            status: updated.status,
            checkInAt: updated.checkInAt,
            checkOutAt: updated.checkOutAt,
        });
        return this.dto(updated, record.job.publicId);
    }
    async sweep() {
        const now = nowMinutesIst();
        const open = await this.prisma.attendanceRecord.findMany({
            where: { status: 'CHECKED_IN' },
            include: { workDay: true, job: { select: { publicId: true, status: true, employerProfileId: true } }, worker: { select: { accountId: true } } },
        });
        let autoClosed = 0;
        for (const r of open) {
            if (!r.workDay)
                continue;
            const day = this.windowOf(r.workDay);
            const pastDay = isoDate(r.workDay.workDate) < todayIst();
            if (!pastDay && now <= day.end + day.grace)
                continue;
            if (!r.checkInAt)
                continue;
            await this.prisma.attendanceRecord.update({
                where: { id: r.id },
                data: { status: 'CHECKED_OUT', checkOutAt: new Date(), durationMinutes: computeDurationMinutes(r.checkInAt.toISOString(), new Date().toISOString()) },
            });
            await this.audit(null, 'SYSTEM', 'ATTENDANCE_AUTO_CLOSED', r.publicId);
            autoClosed += 1;
        }
        const pending = await this.prisma.attendanceRecord.findMany({
            where: { status: 'NOT_STARTED' },
            include: { workDay: true, job: { select: { publicId: true, employerProfileId: true } }, worker: { select: { accountId: true } } },
        });
        let noShows = 0;
        for (const r of pending) {
            if (!r.workDay)
                continue;
            const day = this.windowOf(r.workDay);
            const pastDay = isoDate(r.workDay.workDate) < todayIst();
            if (!pastDay && !noShowDue('NOT_STARTED', now, day))
                continue;
            await this.prisma.attendanceRecord.update({ where: { id: r.id }, data: { status: 'NO_SHOW' } });
            await this.prisma.crewMember.updateMany({
                where: { jobId: r.jobId, workerProfileId: r.workerProfileId, status: 'ACTIVE' },
                data: { status: 'NO_SHOW' },
            });
            await this.audit(null, 'SYSTEM', 'ATTENDANCE_NO_SHOW', r.publicId);
            await this.dispatcher.enqueue({
                eventKey: 'ATTENDANCE_NO_SHOW',
                recipientAccountIds: [r.worker.accountId, r.job.employerProfileId ? (await this.prisma.employerProfile.findUnique({ where: { id: r.job.employerProfileId }, select: { accountId: true } }))?.accountId ?? 0n : 0n].filter((x) => x !== 0n),
                contextType: 'JOB',
                contextPublicId: r.job.publicId,
                args: { workDate: isoDate(r.workDay.workDate) },
            });
            noShows += 1;
        }
        return { autoClosed, noShows };
    }
};
AttendanceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        DispatcherService])
], AttendanceService);
export { AttendanceService };
//# sourceMappingURL=attendance.service.js.map