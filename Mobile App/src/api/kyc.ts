import { api } from './client';

/**
 * Wave 2 API — KYC (M5 lifecycle) + notification inbox (M3-core).
 * Endpoints mirror packages/contracts kyc.ts / notifications.ts exactly.
 */

export type KycStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';
export type KycIdType = 'PAN' | 'VOTER' | 'DRIVING' | 'PASSPORT';
export type KycDocType = 'ID_FRONT' | 'ID_BACK' | 'SELFIE' | 'ADDRESS_PROOF';

export interface KycDocumentMeta {
  publicId: string;
  docType: KycDocType;
  uploadedAt: string;
  sizeBytes: number;
  mime: string;
}

export interface KycSubmission {
  publicId: string;
  status: KycStatus;
  idType: KycIdType;
  idNumberMasked: string;
  attempts: number;
  maxAttempts: number;
  rejectionReason?: string | null;
  documents: KycDocumentMeta[];
  submittedAt?: string | null;
  decidedAt?: string | null;
  createdAt: string;
}

export interface NotificationItem {
  publicId: string;
  eventKey: string;
  titleKey: string;
  bodyParams?: Record<string, string | number | boolean> | null;
  context?: { type: string; publicId: string } | null;
  readAt?: string | null;
  createdAt: string;
}

export const kycApi = {
  active: () => api.get<{ submission: KycSubmission | null }>('/kyc'),

  create: (input: { idType: KycIdType; idNumber: string; consentAccepted: true; consentVersion: string }) =>
    api.post<{ submission: KycSubmission }>('/kyc', input),

  ticket: (docType: KycDocType) =>
    api.post<{ uploadUrl: string; documentId: string; maxBytes: number; expiresSec: number }>(
      '/kyc/documents/upload-ticket',
      { docType },
    ),

  /** Absolute presigned URL → same-origin path, multipart PUT (client.uploadPut). */
  upload: (uploadUrl: string, uri: string, fileName: string, mimeType: string) => {
    const path = uploadUrl.replace(/^https?:\/\/[^/]+/, '');
    const form = new FormData();
    // React Native FormData file part (web uses the same field names).
    form.append('file', { uri, name: fileName, mimeType } as unknown as Blob);
    return api.uploadPut<{ document: KycDocumentMeta }>(path, form);
  },

  submit: () => api.post<{ submission: KycSubmission }>('/kyc/submit'),
};

export const notificationsApi = {
  list: (opts: { unread?: boolean; cursor?: string; limit?: number } = {}) => {
    const params = new URLSearchParams();
    if (opts.unread) params.set('unread', 'true');
    if (opts.cursor) params.set('cursor', opts.cursor);
    if (opts.limit) params.set('limit', String(opts.limit));
    const qs = params.toString();
    // Transport unwraps {data}; cursor meta is not surfaced in V1 UI (no load-more yet).
    return api.get<NotificationItem[]>(`/notifications${qs ? `?${qs}` : ''}`);
  },

  unreadCount: () => api.get<{ unread: number }>('/notifications/unread-count'),

  markAllRead: () => api.post<{ unread: number }>('/notifications/read', { all: true }),
};
