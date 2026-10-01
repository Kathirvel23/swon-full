import { api } from './client';

/**
 * Wave 4 API — H6 application queue & hiring + H7 crew roster.
 * Mirrors packages/contracts applications.ts / crew.ts. Apply and decisions
 * carry a client-generated Idempotency-Key (§8): a double-tap or flaky
 * retry replays the stored response instead of acting twice.
 */

export type ApplicationStatus =
  | 'APPLIED' | 'SHORTLISTED' | 'WAITLISTED' | 'HIRED'
  | 'REJECTED' | 'WITHDRAWN' | 'CANCELLED' | 'EXPIRED';

export type CrewSeat = 'NONE' | 'ACTIVE' | 'RELEASED' | 'NO_SHOW' | 'COMPLETED';

/** ≥8 chars, unique per user action (retry with the SAME key is a replay). */
export const idemKey = (tag: string): string =>
  `${tag}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export interface ApplicationCard {
  publicId: string;
  status: ApplicationStatus;
  source: 'APPLY' | 'QUICK_MATCH';
  appliedAt: string;
  decidedAt?: string | null;
  decisionNote?: string | null;
  job: {
    publicId: string;
    title: string;
    city: string;
    areaName: string;
    startsOn: string;
    endsOn: string;
    payAmountPaise: number;
    payType: string;
    headcountRequired: number;
    hiredCount: number;
    employerName: string;
    status: string;
  };
  crewSeat: CrewSeat;
}

export interface QueueItem {
  application: {
    publicId: string;
    status: ApplicationStatus;
    source: 'APPLY' | 'QUICK_MATCH';
    appliedAt: string;
    decidedAt?: string | null;
    decisionNote?: string | null;
    coverNote?: string | null;
    worker: {
      publicId: string;
      fullName: string;
      photoUrl?: string | null;
      avgRatingMilli: number;
      ratingsCount: number;
      jobsDoneCount: number;
      kycBadge: boolean;
      skills: { skillId: string; name: string }[];
    };
    conflictWarning: boolean;
  };
}

export type DecisionAction = 'shortlist' | 'waitlist' | 'reject' | 'hire' | 'release';

export interface CrewMember {
  publicId: string;
  status: 'ACTIVE' | 'RELEASED' | 'NO_SHOW' | 'COMPLETED';
  hiredAt: string;
  releasedAt?: string | null;
  releasedReason?: string | null;
  applicationPublicId: string;
  worker: {
    publicId: string;
    fullName: string;
    photoUrl?: string | null;
    avgRatingMilli: number;
    ratingsCount: number;
    experienceYears?: number | null;
    skills: { skillId: string; name: string }[];
    kycBadge: boolean;
  };
}

export interface CrewRoster {
  items: CrewMember[];
  summary: {
    seatsRequired: number;
    seatsFilled: number;
    seatsReleased: number;
    jobStatus: string;
  };
}

export const applicationsApi = {
  /** Worker — apply (Idempotency-Key required by the contract). */
  apply: (jobId: string, key: string, coverNote?: string) =>
    api.post<{ publicId: string; status: string; jobId: string }>(
      '/applications',
      { jobId, ...(coverNote ? { coverNote } : {}) },
      { headers: { 'Idempotency-Key': key } },
    ),

  /** Worker — my applications (first page; cursors come later with load-more). */
  mine: (params?: { status?: string; active?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.status) q.set('status', params.status);
    if (params?.active) q.set('active', 'true');
    const suffix = q.toString() ? `?${q.toString()}` : '';
    return api.get<ApplicationCard[]>(`/applications${suffix}`);
  },

  /** Worker — withdraw (A6 pre-hire / A7 hired before work starts). */
  withdraw: (applicationId: string, reason?: string) =>
    api.post<{ publicId: string; status: string }>(
      `/applications/${applicationId}/withdraw`,
      reason ? { reason } : {},
    ),

  /** Employer — application queue for a job (worker cards + conflict flags). */
  queue: (jobPublicId: string, params?: { status?: string; sort?: string }) => {
    const q = new URLSearchParams();
    if (params?.status) q.set('status', params.status);
    if (params?.sort) q.set('sort', params.sort);
    const suffix = q.toString() ? `?${q.toString()}` : '';
    return api.get<QueueItem[]>(`/jobs/${jobPublicId}/queue${suffix}`);
  },

  /** Employer — one decision (shortlist/waitlist/reject/hire/release). */
  decide: (
    applicationId: string,
    action: DecisionAction,
    key: string,
    extra?: { note?: string; reason?: string },
  ) =>
    api.post<{ publicId: string; status: string }>(
      `/applications/${applicationId}/decision`,
      { action, ...extra },
      { headers: { 'Idempotency-Key': key } },
    ),

  /** Employer — crew roster (H7) with seat summary. */
  roster: (jobPublicId: string, params?: { status?: string }) => {
    const suffix = params?.status ? `?status=${params.status}` : '';
    return api.get<CrewRoster>(`/jobs/${jobPublicId}/crew${suffix}`);
  },
};
