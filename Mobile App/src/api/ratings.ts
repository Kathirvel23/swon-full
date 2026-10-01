import { api } from './client';

/** Ratings — double-blind (48 h) on completed jobs. Mirrors contracts ratings.ts. */

export const RATING_TAGS = [
  'ON_TIME',
  'SAFE_ENVIRONMENT',
  'CLEAR_PAY',
  'RESPECTFUL',
  'GOOD_WORK',
  'RELIABLE',
  'NEEDS_IMPROVEMENT',
] as const;
export type RatingTag = (typeof RATING_TAGS)[number];

export type RatingCreate = {
  jobPublicId: string;
  rateeAccountPublicId: string;
  score: number;
  tags?: RatingTag[];
  comment?: string;
};

export type RatingDto = {
  publicId: string;
  score: number;
  tags: RatingTag[];
  comment?: string | null;
  commentVisible: boolean;
  jobPublicId: string;
  jobTitle: string;
  raterRole: 'WORKER' | 'EMPLOYER';
  rater: { publicId: string; displayName: string; photoUrl?: string | null; revealed: boolean };
  ratee: { publicId: string; displayName: string; photoUrl?: string | null };
  createdAt: string;
};

export type RatingSummary = {
  avgRatingMilli: number;
  ratingsCount: number;
  distribution: { five: number; four: number; three: number; two: number; one: number };
  pendingCount: number;
};

export type PendingRating = {
  jobPublicId: string;
  jobTitle: string;
  ratee: { publicId: string; displayName: string };
  rateeRole: 'WORKER' | 'EMPLOYER';
};

export const ratingsApi = {
  create: (body: RatingCreate) => api.post<RatingDto>('/ratings', body),
  summary: () => api.get<RatingSummary>('/me/rating-summary'),
  pending: () => api.get<PendingRating[]>('/ratings/pending'),
  list: (scope: 'received' | 'given' = 'received') =>
    api.get<RatingDto[]>(`/ratings?scope=${scope}`),
};
