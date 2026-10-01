import { api } from './client';

/** Complaints & Support (M7): party submit/reply + my list. Admin lives in Admin app. */

export const COMPLAINT_TYPES = ['PAYMENT', 'SAFETY', 'HARASSMENT', 'NO_SHOW', 'FRAUD', 'OTHER'] as const;
export type ComplaintType = (typeof COMPLAINT_TYPES)[number];

export type ComplaintStatus =
  | 'OPEN'
  | 'UNDER_REVIEW'
  | 'WAITING_ON_PARTY'
  | 'RESOLVED'
  | 'DISMISSED'
  | 'CLOSED_TIMEOUT';

export type ComplaintEvent = {
  publicId: string;
  kind: 'NOTE' | 'PARTY_REPLY' | 'STATUS_CHANGE' | 'EVIDENCE';
  body?: string | null;
  actor: { publicId: string; role: 'WORKER' | 'EMPLOYER' | 'ADMIN'; displayName: string };
  evidenceUrl?: string | null;
  createdAt: string;
};

export type Complaint = {
  publicId: string;
  type: ComplaintType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  status: ComplaintStatus;
  link?: { type: string; publicId: string } | null;
  narrative: string;
  resolutionNote?: string | null;
  resolvedAt?: string | null;
  events: ComplaintEvent[];
  createdAt: string;
  updatedAt: string;
};

export const complaintsApi = {
  submit: (body: {
    type: ComplaintType;
    severity?: 'LOW' | 'MEDIUM' | 'HIGH';
    linkType?: 'JOB' | 'APPLICATION' | 'EARNING' | 'ATTENDANCE' | 'ACCOUNT';
    linkPublicId?: string;
    narrative: string;
  }) => api.post<Complaint>('/complaints', body),

  mine: (status?: string) =>
    api.get<Complaint[]>(`/complaints${status ? `?status=${status}` : ''}`),

  reply: (publicId: string, body: string) =>
    api.post<{ status: string; repliedAt: string }>(`/complaints/${publicId}/reply`, { body }),
};
