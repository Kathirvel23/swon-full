import { api } from '@/api/client';

/**
 * H1 auth/profile endpoints (§14 rows 1–4). Types are hand-rolled mirrors of
 * packages/contracts — the mobile app doesn't consume the shared package yet
 * (typecheck-only workspace; revisit when the app grows shared validation).
 */

export type OtpRequestResult = {
  challengeId: string;
  cooldownSec: number;
  expiresSec: number;
  /** DEV builds only — the real SMS carries the code. */
  devCode?: string;
};

export type AccountSummary = {
  publicId: string;
  role: 'worker' | 'employer' | 'admin' | null;
  status: string;
  phoneMasked: string;
  isNewAccount: boolean;
  profileCompletePct: number;
  kycStatus: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresInSec: number;
};

export type OtpVerifyResult = TokenPair & { account: AccountSummary };

export type OnboardWorkerInput = {
  role: 'worker';
  fullName: string;
  city?: string;
  areaId?: string;
  bio?: string;
  experienceYears?: number;
};

export type OnboardEmployerInput = {
  role: 'employer';
  orgName: string;
  orgType?: 'INDIVIDUAL' | 'FIRM' | 'COMPANY' | 'GOVT' | 'NGO';
  contactName: string;
  city: string;
  areaId: string;
  addressLine: string;
};

export type OnboardInput = OnboardWorkerInput | OnboardEmployerInput;

export type WorkerProfileDto = {
  publicId: string;
  fullName: string;
  photoUrl?: string | null;
  city?: string | null;
  area?: { publicId: string; name: string } | null;
  bio?: string | null;
  experienceYears?: number | null;
  openToWork: boolean;
  skills: { skillId: string; name: string; yearsHint?: number | null }[];
  avgRatingMilli: number;
  ratingsCount: number;
  jobsDoneCount: number;
  profileCompletePct: number;
  kycBadge: boolean;
  availability: { publicId: string; date: string; fromTime: string; toTime: string; areaId?: string | null }[];
};

export type OrgDto = {
  publicId: string;
  orgName: string;
  orgType: 'INDIVIDUAL' | 'FIRM' | 'COMPANY' | 'GOVT' | 'NGO';
  contactName: string;
  city: string;
  area: { publicId: string; name: string };
  addressLine: string;
  verificationStatus: string;
  avgRatingMilli: number;
  ratingsCount: number;
  jobsPostedCount: number;
  completenessPct: number;
};

export type MeDto = {
  account: { publicId: string; role: 'worker' | 'employer' | 'admin' | null; phoneMasked: string; status: string };
  workerProfile: WorkerProfileDto | null;
  org: OrgDto | null;
  notificationPrefs: { pushEnabled: boolean; smsEnabled: boolean; quietHours?: string | null };
};

export type WorkerProfilePatch = {
  fullName?: string;
  bio?: string;
  city?: string;
  areaId?: string;
  experienceYears?: number;
  openToWork?: boolean;
};

export type OrgPatch = {
  orgName?: string;
  orgType?: 'INDIVIDUAL' | 'FIRM' | 'COMPANY' | 'GOVT' | 'NGO';
  contactName?: string;
  city?: string;
  areaId?: string;
  addressLine?: string;
  panRef?: string | null;
  gstin?: string | null;
};

export type AvailabilitySlotInput = { date: string; fromTime: string; toTime: string; areaId?: string };

export type CatalogArea = { publicId: string; city: string; name: string; nameTa?: string | null };
export type CatalogSkill = { publicId: string; name: string; code: string };
export type Catalog = { areas: CatalogArea[]; skills: CatalogSkill[]; categories: { publicId: string; code: string; name: string }[] };


export const authApi = {
  requestOtp: (phone: string): Promise<OtpRequestResult> =>
    api.post<OtpRequestResult>('/auth/otp/request', { phone }),
  verifyOtp: (challengeId: string, code: string): Promise<OtpVerifyResult> =>
    api.post<OtpVerifyResult>('/auth/otp/verify', { challengeId, code }),
  logout: (refreshToken: string): Promise<{ ok: boolean }> =>
    api.post<{ ok: boolean }>('/auth/logout', { refreshToken }),
  sessions: (): Promise<{ sessions: unknown[] }> =>
    api.get<{ sessions: unknown[] }>('/auth/sessions'),
  me: (): Promise<MeDto> => api.get<MeDto>('/me'),
  onboard: (input: OnboardInput): Promise<MeDto & { role: 'worker' | 'employer' }> =>
    api.post<MeDto & { role: 'worker' | 'employer' }>('/me/onboarding', input),
  catalog: (): Promise<Catalog> => api.get<Catalog>('/catalog'),
  // --- H2 profile management ---
  patchWorker: (input: WorkerProfilePatch): Promise<WorkerProfileDto> =>
    api.patch<WorkerProfileDto>('/me', input),
  patchOrg: (input: OrgPatch): Promise<OrgDto> =>
    api.patch<OrgDto>('/me/org', input),
  putSkills: (skills: { skillId: string; yearsHint?: number }[]): Promise<WorkerProfileDto> =>
    api.put<WorkerProfileDto>('/me/skills', { skills }),
  putAvailability: (slots: AvailabilitySlotInput[]): Promise<{ slots: unknown[] }> =>
    api.put<{ slots: unknown[] }>('/me/availability', { slots }),
  uploadPhoto: (file: { uri: string; name: string; type: string }): Promise<{ storageKey: string; photoUrl: string }> => {
    const form = new FormData();
    form.append('file', file as unknown as Blob);
    return api.upload<{ storageKey: string; photoUrl: string }>('/me/photo', form);
  },
};
