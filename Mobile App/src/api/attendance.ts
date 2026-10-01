import { api } from './client';
import { idemKey } from './applications';

// Local mirror of the contract shapes (Mobile App keeps its own types —
// the workspace contracts package is a backend/DTO source, not a client dep).
export type AttendanceCheck = {
  payload: string;
  action: 'IN' | 'OUT';
  lat?: number;
  lng?: number;
  workerPublicId?: string;
  workDate?: string;
  reason?: string;
};

export type AttendanceTokenDto = {
  payload: string;
  expiresSec: number;
  rotateEverySec: number;
  jobPublicId: string;
  workDate: string;
};

export type CorrectAttendance = {
  status?: string;
  checkInAt?: string;
  checkOutAt?: string;
  reason: string;
};

/** W5 attendance + payments — employer tokens/roster/approvals/payouts,
 * worker check-in/out + earnings. Money writes carry an Idempotency-Key. */

export type RosterRecord = {
  publicId: string;
  status: string;
  workDate: string;
  checkInAt?: string | null;
  checkOutAt?: string | null;
  checkSource?: string | null;
  durationMinutes?: number | null;
  correctionReason?: string | null;
};

export type RosterRow = {
  worker: { publicId: string; fullName: string; photoUrl?: string | null; crewStatus: string };
  attendance: RosterRecord | null;
  earningStatus: string;
};

export type Roster = { date: string; rows: RosterRow[] };

export type TodayState = {
  token: AttendanceTokenDto | null;
  record: (RosterRecord & { jobPublicId: string }) | null;
  job: { publicId: string; title: string; city: string; areaName: string } | null;
  workDate: string;
};

export type CompleteResult = {
  publicId: string;
  status: string;
  earnings: { eligible: number; cancelled: number };
};

export const attendanceApi = {
  issueToken: (jobPublicId: string, date?: string) =>
    api.post<AttendanceTokenDto>(`/jobs/${jobPublicId}/attendance/token`, { date }),

  today: () => api.get<TodayState>('/attendance/today'),

  check: (body: AttendanceCheck) =>
    api.post<RosterRecord & { jobPublicId: string }>('/attendance/check', body),

  roster: (jobPublicId: string, date?: string) =>
    api.get<Roster>(`/jobs/${jobPublicId}/roster${date ? `?date=${date}` : ''}`),

  approve: (recordIds: string[]) =>
    api.post<{ approved: number }>('/attendance/approve', { recordIds }),

  correct: (recordId: string, body: CorrectAttendance) =>
    api.post<RosterRecord>(`/attendance/${recordId}/correct`, body),

  completeJob: (jobPublicId: string) =>
    api.post<CompleteResult>(`/jobs/${jobPublicId}/complete`, {}),
};

// ---------------------------------------------------------------- payments

export type EarningRow = {
  publicId: string;
  status: string;
  amountPaise: number;
  adjustmentPaise: number;
  adjustmentReason?: string | null;
  currency: string;
  job: { publicId: string; title: string; startsOn: string; endsOn: string };
  worker?: { publicId: string; fullName: string; photoUrl?: string | null };
  attendanceMinutes: number;
  approvedAt?: string | null;
  paidAt?: string | null;
};

export type Page<T> = { data: T[]; meta: { nextCursor: string | null; limit: number } };

export type PaymentTx = {
  publicId: string;
  status: 'PROCESSING' | 'PAID' | 'FAILED';
  reference: string;
  amountPaise: number;
  currency: string;
  paidAt?: string | null;
  earnings: { earningId: string; amountPaise: number }[];
};

export type MarkPaidBody = {
  earningIds: string[];
  reference: string;
  totalPaise: number;
  currency: 'INR';
  note?: string;
};

export const paymentsApi = {
  myEarnings: (status?: string) =>
    api.get<Page<EarningRow>>(`/earnings${status ? `?status=${status}` : ''}`),

  jobEarnings: (jobPublicId: string) => api.get<Page<EarningRow>>(`/jobs/${jobPublicId}/earnings`),

  approve: (earningIds: string[]) =>
    api.post<{ approved: number }>('/earnings/approve', { earningIds }, {
      headers: { 'Idempotency-Key': idemKey('earnings-approve') },
    }),

  markPaid: (body: MarkPaidBody) =>
    api.post<PaymentTx>('/earnings/mark-paid', body, {
      headers: { 'Idempotency-Key': idemKey('mark-paid') },
    }),
};
