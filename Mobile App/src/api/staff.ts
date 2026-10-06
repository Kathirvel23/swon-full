import { api } from './client';
import { idemKey } from './applications';

/**
 * Event Attendance Manager (owner brief 2026-10-05).
 *
 * Two sides, and the split matters:
 *  - MANAGER side (worker role): the capability is event-scoped. The server
 *    re-checks the assignment row on every call, so a worker who is not the
 *    manager of THIS event gets 403 even with a valid token.
 *  - HOST side (employer role): designate/revoke a crew member, and stamp the
 *    (server-computed) incentive onto their earning.
 *
 * The client NEVER sends an incentive amount — only an optional percentage the
 * host chooses; the money itself is always computed on the server (§26).
 */

/** Manager vocabulary. LATE is derived from the check-in time (never sent). */
export type UiStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'NOT_MARKED';
export type WritableStatus = 'PRESENT' | 'ABSENT' | 'NOT_MARKED';

export type ManagerEvent = {
  assignmentPublicId: string;
  role: 'ATTENDANCE_MANAGER';
  incentivePct: number;
  job: {
    publicId: string;
    title: string;
    startsOn: string;
    endsOn: string;
    city: string;
    status: string;
  };
};

export type EventAttendanceRow = {
  worker: { publicId: string; fullName: string; crewStatus: string };
  status: UiStatus;
  recordPublicId: string | null;
  checkInAt: string | null;
  checkOutAt: string | null;
  approved: boolean;
};

export type EventAttendance = {
  job: { publicId: string; title: string; city: string; areaName: string | null };
  date: string;
  hasWorkDay: boolean;
  summary: { total: number; present: number; late: number; absent: number; notMarked: number };
  workers: EventAttendanceRow[];
};

export type StaffIncentive = {
  basePaise: number;
  pct: number;
  incentivePaise: number;
  totalPaise: number;
  appliedPaise: number;
  currency: string;
  earningStatus: string | null;
};

export type HostStaffRow = {
  worker: { publicId: string; fullName: string };
  assignmentPublicId: string;
  incentivePct: number;
  overridden: boolean;
};

export const staffApi = {
  // ------------------------------------------------------------- manager

  /** The events this worker manages (drives the entry card on My Work). */
  myEvents: () => api.get<{ events: ManagerEvent[] }>('/me/event-staff'),

  eventAttendance: (jobPublicId: string, date?: string) =>
    api.get<EventAttendance>(
      `/jobs/${jobPublicId}/event-attendance${date ? `?date=${date}` : ''}`,
    ),

  mark: (jobPublicId: string, body: { workerPublicId: string; status: WritableStatus; date?: string }) =>
    api.post<{ recordPublicId: string; status: UiStatus }>(
      `/jobs/${jobPublicId}/event-attendance/mark`,
      body,
    ),

  /** Read-only: what the server says this manager will earn for the event. */
  incentive: (jobPublicId: string) =>
    api.get<StaffIncentive>(`/jobs/${jobPublicId}/event-attendance/incentive`),

  // ---------------------------------------------------------------- host

  staff: (jobPublicId: string) =>
    api.get<{ staff: HostStaffRow[] }>(`/jobs/${jobPublicId}/event-staff`),

  assign: (jobPublicId: string, body: { workerPublicId: string; incentivePct?: number }) =>
    api.post<{ assignmentPublicId: string; worker: { publicId: string; fullName: string }; incentivePct: number }>(
      `/jobs/${jobPublicId}/event-staff`,
      body,
    ),

  revoke: (jobPublicId: string, workerPublicId: string) =>
    api.delete<{ revoked: boolean }>(`/jobs/${jobPublicId}/event-staff/${workerPublicId}`),

  /** Idempotent on the server: the adjustment is set, never stacked. */
  applyIncentive: (jobPublicId: string) =>
    api.post<{ earningPublicId: string; pct: number; incentivePaise: number; totalPaise: number }>(
      `/jobs/${jobPublicId}/event-staff/incentive/apply`,
      {},
      { headers: { 'Idempotency-Key': idemKey('staff-incentive') } },
    ),
};
