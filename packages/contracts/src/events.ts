/**
 * Notification event catalog — machine-readable form of architecture §22's
 * event → channel matrix. The outbox dispatcher routes by these entries;
 * templates resolve `titleKey` + `bodyParams` client/server-side (§22 rules:
 * keyed, versioned, escaped, no foreign PII, OTP SMS unmuteable).
 *
 * Adding an event = add here + template + test (grep for eventKey in Wave M3).
 */

export const CHANNELS = ['INAPP', 'PUSH', 'SMS', 'EMAIL'] as const;
export type Channel = (typeof CHANNELS)[number];

type EventDef = {
  /** §22 matrix for this event */
  channels: readonly Channel[];
  /** Critical events cannot be muted (and stay in-app regardless) */
  critical?: boolean;
  /** Employer-side batched per job (§22: "batched per job") */
  batched?: boolean;
  /** i18n key for the in-app row title (client renders localized) */
  titleKey: string;
};

export const NOTIFICATION_EVENTS = {
  OTP_SMS: { channels: ['SMS'], critical: true, titleKey: 'event.otp_sms' },

  APPLICATION_SUBMITTED: { channels: ['INAPP'], titleKey: 'event.application_submitted' }, // worker receipt
  APPLICATION_RECEIVED: { channels: ['INAPP', 'PUSH'], batched: true, titleKey: 'event.application_received' }, // employer
  APPLICATION_SHORTLISTED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.application_shortlisted' },
  APPLICATION_WAITLISTED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.application_waitlisted' },
  APPLICATION_REJECTED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.application_rejected' },
  APPLICATION_WITHDRAWN: { channels: ['INAPP'], titleKey: 'event.application_withdrawn' },

  HIRED: { channels: ['INAPP', 'PUSH', 'SMS'], critical: true, titleKey: 'event.hired' }, // time-sensitive
  QUICKMATCH_OFFER: { channels: ['INAPP', 'PUSH', 'SMS'], critical: true, titleKey: 'event.quickmatch_offer' },
  QUICKMATCH_EXPIRING: { channels: ['INAPP', 'PUSH'], titleKey: 'event.quickmatch_expiring' },
  QUICKMATCH_DECLINED: { channels: ['INAPP'], titleKey: 'event.quickmatch_declined' },

  JOB_STAFFED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.job_staffed' },
  JOB_SHORTFALL: { channels: ['INAPP', 'PUSH'], titleKey: 'event.job_shortfall' },
  JOB_CANCELLED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.job_cancelled' },

  ATTENDANCE_REMINDER: { channels: ['INAPP', 'PUSH'], titleKey: 'event.attendance_reminder' },
  ATTENDANCE_APPROVED: { channels: ['INAPP'], titleKey: 'event.attendance_approved' },
  ATTENDANCE_NO_SHOW: { channels: ['INAPP'], titleKey: 'event.attendance_no_show' },
  ATTENDANCE_CORRECTED: { channels: ['INAPP'], titleKey: 'event.attendance_corrected' },

  EARNINGS_READY: { channels: ['INAPP', 'PUSH'], titleKey: 'event.earnings_ready' }, // employer
  PAYMENT_APPROVED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.payment_approved' },
  PAYMENT_RECORDED: { channels: ['INAPP', 'PUSH', 'SMS'], titleKey: 'event.payment_recorded' }, // money — SMS optional per matrix

  RATING_REQUEST: { channels: ['INAPP', 'PUSH'], titleKey: 'event.rating_request' },

  KYC_SUBMITTED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.kyc_submitted' },
  KYC_DECISION: { channels: ['INAPP', 'PUSH'], titleKey: 'event.kyc_decision' },

  COMPLAINT_ACK: { channels: ['INAPP', 'PUSH'], titleKey: 'event.complaint_ack' },
  COMPLAINT_STATUS: { channels: ['INAPP', 'PUSH'], titleKey: 'event.complaint_status' },
  COMPLAINT_OUTCOME: { channels: ['INAPP', 'PUSH'], titleKey: 'event.complaint_outcome' },

  ACCOUNT_WELCOME: { channels: ['INAPP'], titleKey: 'event.account_welcome' }, // first signup (H1 DoD)
  ACCOUNT_SUSPENDED: { channels: ['INAPP', 'PUSH', 'SMS'], critical: true, titleKey: 'event.account_suspended' },
  ACCOUNT_REINSTATED: { channels: ['INAPP', 'PUSH'], titleKey: 'event.account_reinstated' },

  ADMIN_QUEUE_ALERT: { channels: ['INAPP', 'PUSH'], titleKey: 'event.admin_queue_alert' },
} as const satisfies Record<string, EventDef>;

export type EventKey = keyof typeof NOTIFICATION_EVENTS;

export const eventChannels = (key: EventKey): readonly Channel[] =>
  NOTIFICATION_EVENTS[key].channels;
