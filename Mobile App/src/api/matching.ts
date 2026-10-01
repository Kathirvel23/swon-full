import { api } from './client';
import { idemKey } from './applications';

/** Matching (§16 candidates) + Quick Match offers. Mirrors contracts matching.ts. */

export type Signals = {
  proximityMilli: number;
  skillMatchMilli: number;
  reliabilityMilli: number;
  ratingMilli: number;
  recencyMilli: number;
  availabilityMilli: number;
  overlapMilli: number;
};

export type MatchCandidate = {
  workerPublicId: string;
  score: number;
  distanceBand: string;
  signals: Signals;
  reasonCodes: string[];
};

export type MatchResult = {
  jobPublicId: string;
  weightsVersion: number;
  logId: string;
  candidates: MatchCandidate[];
  ignoredCount: number;
  takenMs: number;
};

export type QuickMatchOffer = {
  publicId: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'CANCELLED';
  job: {
    publicId: string;
    title: string;
    city: string;
    areaName: string;
    payAmountPaise: number;
    payType: string;
    employerName: string;
  };
  requirementSnapshot: string;
  windowStart: string;
  windowEnd: string;
  respondBy: string;
  respondedAt?: string | null;
  distanceBand: string;
  expiringSoon: boolean;
  /** explainability codes for the offer card (same vocabulary as MatchCandidate.reasonCodes) */
  reasonCodes?: string[];
};

export type LaunchWave = {
  created: number;
  skipped: number;
  waveNo: number;
  respondBy: string;
};

export const matchingApi = {
  candidates: (jobPublicId: string) =>
    api.get<MatchResult>(`/matching/jobs/${jobPublicId}/candidates`),

  launch: (body: {
    jobPublicId: string;
    headcount: number;
    windowStart: string;
    windowEnd: string;
    requirementSnapshot: string;
    radiusKm?: number;
    waveSize?: number;
  }) => api.post<LaunchWave>('/quick-match', body, { headers: { 'Idempotency-Key': idemKey('qm') } }),

  myOffers: (status?: string) =>
    api.get<QuickMatchOffer[]>(`/quick-match${status ? `?status=${status}` : ''}`),

  respond: (offerPublicId: string, response: 'ACCEPT' | 'DECLINE', coverNote?: string) =>
    api.post<{ status: string; application: { publicId: string; status: string } | null }>(
      `/quick-match/${offerPublicId}/respond`,
      { response, coverNote },
    ),
};
