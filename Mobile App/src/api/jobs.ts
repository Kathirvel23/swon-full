import { api } from './client';

/**
 * Wave 3 API — job lifecycle (H4) + discovery feed (H5) + welfare catalog (M5).
 * Mirrors packages/contracts jobs.ts / welfare.ts. The transport unwraps the
 * { data } envelope; list cursors (meta.next) are not surfaced in the V1 UI
 * yet — screens load the first page (same stance as the W2 inbox).
 */

export type JobStatus =
  | 'DRAFT' | 'OPEN' | 'HIRING' | 'FILLED' | 'IN_PROGRESS'
  | 'COMPLETED' | 'CLOSED' | 'CANCELLED' | 'EXPIRED';

export interface JobCard {
  publicId: string;
  title: string;
  description: string;
  status: JobStatus;
  category: { publicId: string; code: string; name: string };
  city: string;
  area: { publicId: string; name: string };
  addressLine: string;
  coordinatesAvailable: boolean;
  startsOn: string;
  endsOn: string;
  dayStartTime: string;
  dayEndTime: string;
  workDays: { date: string; startTime: string; endTime: string }[];
  payType: 'HOUR' | 'DAY' | 'TOTAL';
  payAmountPaise: number;
  payLabel: string;
  headcountRequired: number;
  hiredCount: number;
  applicationCount: number;
  minExperienceYears?: number | null;
  requirementsNote?: string | null;
  skills: { skillId: string; name: string }[];
  welfare: { code: string; label: string; note?: string | null }[];
  employer: {
    publicId: string;
    orgName: string;
    orgType: string;
    avgRatingMilli: number;
    ratingsCount: number;
    kycBadge: boolean;
  };
  publishedAt?: string | null;
  cancelReason?: string | null;
  viewerState?: { applied: boolean; applicationStatus?: string; hasCrewSeat: boolean; isOwner: boolean };
  /** discovery context (worker feed/detail) */
  distanceKm?: number | null;
  viewerBadges?: { matchesSkills: boolean; experienceOk: boolean; kycOk: boolean };
  createdAt: string;
}

export interface JobCreateInput {
  title: string;
  description: string;
  categoryId: string;
  city: string;
  areaId: string;
  addressLine: string;
  startsOn: string;
  endsOn: string;
  dayStartTime: string;
  dayEndTime: string;
  payType: 'HOUR' | 'DAY' | 'TOTAL';
  payAmountPaise: number;
  headcountRequired: number;
  skillIds?: string[];
  welfare?: { code: string; note?: string }[];
}

export interface WelfareItem {
  code: string;
  label: string;
  labelTa?: string | null;
  category: 'FOOD' | 'TRANSPORT' | 'SAFETY' | 'FACILITY' | 'OTHER';
  active: boolean;
  sortOrder: number;
}

const qs = (params: Record<string, string | number | undefined>): string => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') p.set(k, String(v));
  }
  const s = p.toString();
  return s ? `?${s}` : '';
};

export const jobsApi = {
  feed: (params: { q?: string; sort?: 'DATE_DESC' | 'DATE_ASC' | 'PAY_DESC'; welfareCodes?: string; limit?: number } = {}) =>
    api.get<JobCard[]>(`/jobs${qs({ ...params, limit: params.limit ?? 40 })}`),

  detail: (publicId: string) => api.get<JobCard>(`/jobs/${publicId}`),

  mine: () => api.get<JobCard[]>('/jobs/mine?limit=40'),

  create: (input: JobCreateInput) => api.post<JobCard>('/jobs', input),

  publish: (publicId: string) =>
    api.post<{ publicId: string; status: string }>(`/jobs/${publicId}/publish`),

  cancel: (publicId: string, reason: string) =>
    api.post<{ publicId: string; status: string }>(`/jobs/${publicId}/cancel`, {
      reason,
      crewHandlingConfirmed: true,
    }),

  remove: (publicId: string) =>
    api.delete<{ publicId: string; deleted: boolean }>(`/jobs/${publicId}`),

  welfareCatalog: () => api.get<WelfareItem[]>('/welfare/catalog'),
};
