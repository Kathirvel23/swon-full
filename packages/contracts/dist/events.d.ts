/**
 * Notification event catalog — machine-readable form of architecture §22's
 * event → channel matrix. The outbox dispatcher routes by these entries;
 * templates resolve `titleKey` + `bodyParams` client/server-side (§22 rules:
 * keyed, versioned, escaped, no foreign PII, OTP SMS unmuteable).
 *
 * Adding an event = add here + template + test (grep for eventKey in Wave M3).
 */
export declare const CHANNELS: readonly ["INAPP", "PUSH", "SMS", "EMAIL"];
export type Channel = (typeof CHANNELS)[number];
export declare const NOTIFICATION_EVENTS: {
    readonly OTP_SMS: {
        readonly channels: readonly ["SMS"];
        readonly critical: true;
        readonly titleKey: "event.otp_sms";
    };
    readonly APPLICATION_SUBMITTED: {
        readonly channels: readonly ["INAPP"];
        readonly titleKey: "event.application_submitted";
    };
    readonly APPLICATION_RECEIVED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly batched: true;
        readonly titleKey: "event.application_received";
    };
    readonly APPLICATION_SHORTLISTED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.application_shortlisted";
    };
    readonly APPLICATION_WAITLISTED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.application_waitlisted";
    };
    readonly APPLICATION_REJECTED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.application_rejected";
    };
    readonly APPLICATION_WITHDRAWN: {
        readonly channels: readonly ["INAPP"];
        readonly titleKey: "event.application_withdrawn";
    };
    readonly HIRED: {
        readonly channels: readonly ["INAPP", "PUSH", "SMS"];
        readonly critical: true;
        readonly titleKey: "event.hired";
    };
    readonly QUICKMATCH_OFFER: {
        readonly channels: readonly ["INAPP", "PUSH", "SMS"];
        readonly critical: true;
        readonly titleKey: "event.quickmatch_offer";
    };
    readonly QUICKMATCH_EXPIRING: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.quickmatch_expiring";
    };
    readonly QUICKMATCH_DECLINED: {
        readonly channels: readonly ["INAPP"];
        readonly titleKey: "event.quickmatch_declined";
    };
    readonly JOB_STAFFED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.job_staffed";
    };
    readonly JOB_SHORTFALL: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.job_shortfall";
    };
    readonly JOB_CANCELLED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.job_cancelled";
    };
    readonly ATTENDANCE_REMINDER: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.attendance_reminder";
    };
    readonly ATTENDANCE_APPROVED: {
        readonly channels: readonly ["INAPP"];
        readonly titleKey: "event.attendance_approved";
    };
    readonly ATTENDANCE_NO_SHOW: {
        readonly channels: readonly ["INAPP"];
        readonly titleKey: "event.attendance_no_show";
    };
    readonly ATTENDANCE_CORRECTED: {
        readonly channels: readonly ["INAPP"];
        readonly titleKey: "event.attendance_corrected";
    };
    readonly EARNINGS_READY: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.earnings_ready";
    };
    readonly PAYMENT_APPROVED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.payment_approved";
    };
    readonly PAYMENT_RECORDED: {
        readonly channels: readonly ["INAPP", "PUSH", "SMS"];
        readonly titleKey: "event.payment_recorded";
    };
    readonly RATING_REQUEST: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.rating_request";
    };
    readonly KYC_SUBMITTED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.kyc_submitted";
    };
    readonly KYC_DECISION: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.kyc_decision";
    };
    readonly COMPLAINT_ACK: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.complaint_ack";
    };
    readonly COMPLAINT_STATUS: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.complaint_status";
    };
    readonly COMPLAINT_OUTCOME: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.complaint_outcome";
    };
    readonly ACCOUNT_WELCOME: {
        readonly channels: readonly ["INAPP"];
        readonly titleKey: "event.account_welcome";
    };
    readonly ACCOUNT_SUSPENDED: {
        readonly channels: readonly ["INAPP", "PUSH", "SMS"];
        readonly critical: true;
        readonly titleKey: "event.account_suspended";
    };
    readonly ACCOUNT_REINSTATED: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.account_reinstated";
    };
    readonly ADMIN_QUEUE_ALERT: {
        readonly channels: readonly ["INAPP", "PUSH"];
        readonly titleKey: "event.admin_queue_alert";
    };
};
export type EventKey = keyof typeof NOTIFICATION_EVENTS;
export declare const eventChannels: (key: EventKey) => readonly Channel[];
//# sourceMappingURL=events.d.ts.map