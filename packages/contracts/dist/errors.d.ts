/**
 * Error-code catalog — single source of truth for every `error.code` the API
 * may return (architecture §24: one error contract, code-keyed client UX).
 *
 * Rules:
 * - Codes are STABLE API surface: add freely, never rename/remove (clients
 *   localize by code). Message text is server-English fallback only.
 * - HTTP status is derived by `statusForCode`; clients branch on `code`, not
 *   on message strings. 409 over 400 whenever STATE is the problem (§24).
 */
export declare const ERROR_CODES: {
    readonly VALIDATION_FAILED: 422;
    readonly PROFILE_INCOMPLETE: 422;
    readonly PAGINATION_CURSOR_INVALID: 400;
    readonly UNSUPPORTED_LOCALE: 400;
    readonly UNAUTHENTICATED: 401;
    readonly TOKEN_EXPIRED: 401;
    readonly TOKEN_INVALID: 401;
    readonly OTP_INVALID: 401;
    readonly OTP_EXPIRED: 401;
    readonly OTP_MAX_ATTEMPTS: 401;
    readonly OTP_COOLDOWN: 429;
    readonly REFRESH_TOKEN_REUSED: 401;
    readonly FORBIDDEN: 403;
    readonly ROLE_REQUIRED: 403;
    readonly NOT_OWNER: 403;
    readonly ADMIN_PERMISSION_REQUIRED: 403;
    readonly ACCOUNT_SUSPENDED: 403;
    readonly ACCOUNT_CLOSED: 403;
    readonly KYC_REQUIRED: 403;
    readonly NOT_FOUND: 404;
    readonly STATE_INVALID: 409;
    readonly JOB_NOT_OPEN: 409;
    readonly JOB_ALREADY_FILLED: 409;
    readonly JOB_CANCELLED: 409;
    readonly DUPLICATE_APPLICATION: 409;
    readonly APPLICATION_NOT_APPLICABLE: 409;
    readonly HIRE_RACE_LOST: 409;
    readonly CREW_DOUBLE_JOB: 409;
    readonly ALREADY_RATED: 409;
    readonly NOT_JOB_PARTY: 409;
    readonly KYC_SUBMISSION_ACTIVE: 409;
    readonly KYC_ATTEMPT_CAP: 409;
    readonly EARNING_STATE_INVALID: 409;
    readonly AMOUNT_MISMATCH: 409;
    readonly ATTENDANCE_DUPLICATE: 409;
    readonly ATTENDANCE_WINDOW_CLOSED: 409;
    readonly ATTENDANCE_TOKEN_INVALID: 401;
    readonly ATTENDANCE_TOKEN_EXPIRED: 401;
    readonly IDEMPOTENCY_KEY_REUSED: 409;
    readonly IDEMPOTENCY_IN_PROGRESS: 409;
    readonly QUICKMATCH_EXPIRED: 409;
    readonly FILE_TOO_LARGE: 413;
    readonly FILE_TYPE_NOT_ALLOWED: 413;
    readonly DOCUMENT_REQUIRED: 422;
    readonly RATE_LIMITED: 429;
    readonly SMS_QUOTA_EXCEEDED: 429;
    readonly INTERNAL: 500;
    readonly SERVICE_UNAVAILABLE: 503;
    readonly DEPENDENCY_FAILED: 503;
};
export type ErrorCode = keyof typeof ERROR_CODES;
export declare const statusForCode: (code: ErrorCode) => (typeof ERROR_CODES)[ErrorCode];
/** Client taxonomy (§24) — drives AppError.kind on mobile: which UX bucket? */
export type ErrorKind = 'user' | 'system' | 'temporary';
export declare const kindForCode: (code: ErrorCode) => ErrorKind;
//# sourceMappingURL=errors.d.ts.map