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
export const ERROR_CODES = {
    // --- 400/422 validation -------------------------------------------------
    VALIDATION_FAILED: 422,
    PROFILE_INCOMPLETE: 422, // e.g. KYC K0 before onboarding (M5) — account not ACTIVE yet
    PAGINATION_CURSOR_INVALID: 400,
    UNSUPPORTED_LOCALE: 400,
    // --- 401 authentication -------------------------------------------------
    UNAUTHENTICATED: 401,
    TOKEN_EXPIRED: 401,
    TOKEN_INVALID: 401,
    OTP_INVALID: 401,
    OTP_EXPIRED: 401,
    OTP_MAX_ATTEMPTS: 401,
    OTP_COOLDOWN: 429,
    REFRESH_TOKEN_REUSED: 401, // family revoked (§15 theft detection)
    // --- 403 authorization --------------------------------------------------
    FORBIDDEN: 403,
    ROLE_REQUIRED: 403,
    NOT_OWNER: 403,
    ADMIN_PERMISSION_REQUIRED: 403,
    ACCOUNT_SUSPENDED: 403,
    ACCOUNT_CLOSED: 403,
    KYC_REQUIRED: 403, // gate policy (§36a #10): verify-to-be-hired / to-publish
    // --- 404 ----------------------------------------------------------------
    NOT_FOUND: 404,
    // --- 409 state / conflict / race ---------------------------------------
    STATE_INVALID: 409, // generic state-machine rejection (§12)
    JOB_NOT_OPEN: 409,
    JOB_ALREADY_FILLED: 409,
    JOB_CANCELLED: 409,
    DUPLICATE_APPLICATION: 409, // UNIQUE(job, worker)
    APPLICATION_NOT_APPLICABLE: 409,
    HIRE_RACE_LOST: 409, // slot taken inside the transaction (§8 row-lock note)
    CREW_DOUBLE_JOB: 409, // overlap/double-booking guard (§16/§17)
    ALREADY_RATED: 409,
    NOT_JOB_PARTY: 409,
    KYC_SUBMISSION_ACTIVE: 409,
    KYC_ATTEMPT_CAP: 409,
    EARNING_STATE_INVALID: 409,
    AMOUNT_MISMATCH: 409, // mark-paid amount ≠ locked amount (§12.4 P4)
    ATTENDANCE_DUPLICATE: 409,
    ATTENDANCE_WINDOW_CLOSED: 409,
    ATTENDANCE_TOKEN_INVALID: 401, // signed QR failed freshness/signature (§19)
    ATTENDANCE_TOKEN_EXPIRED: 401,
    IDEMPOTENCY_KEY_REUSED: 409, // same key, different payload
    IDEMPOTENCY_IN_PROGRESS: 409, // concurrent duplicate — retry shortly
    QUICKMATCH_EXPIRED: 409,
    // --- 413 uploads --------------------------------------------------------
    FILE_TOO_LARGE: 413,
    FILE_TYPE_NOT_ALLOWED: 413,
    DOCUMENT_REQUIRED: 422,
    // --- 429 rate limiting (§23) --------------------------------------------
    RATE_LIMITED: 429,
    SMS_QUOTA_EXCEEDED: 429,
    // --- 5xx ----------------------------------------------------------------
    INTERNAL: 500,
    SERVICE_UNAVAILABLE: 503, // SMS/push/storage outage — retryable (§24)
    DEPENDENCY_FAILED: 503,
};
export const statusForCode = (code) => ERROR_CODES[code];
export const kindForCode = (code) => {
    const status = ERROR_CODES[code];
    if (status === 429 || status === 503)
        return 'temporary';
    if (status >= 500)
        return 'system';
    return 'user';
};
