# WorkBridge — Executable State Machine Tables (Phase 1)

**Status:** DRAFT for owner gate review · **Date:** 2026-09-25
**Source:** `architecture.md` §12 (authoritative definitions — this file formats them as implementable transition tables).
**Rules common to every machine:**
- Invalid transition → `409 STATE_INVALID`, **no partial writes**; every transition writes `audit_log`.
- Mutating commands that carry side effects accept `Idempotency-Key` (replay = original result).
- Actor column = minimum role; ownership (resource belongs to caller) is checked *in addition*.
- Terminal states cannot leave (marked ✗).
- These tables map 1:1 to unit tests: `expect(transition('OPEN','CANCELLED',actor='EMPLOYER')).toBe...` — one test per row + one per ✗ example.

---

## M1 — Job

States: `DRAFT · OPEN · HIRING · FILLED · IN_PROGRESS · COMPLETED · CLOSED · CANCELLED · EXPIRED`

| # | From | To | Actor | Validation / guard | Side effects (same tx unless async) |
|---|---|---|---|---|---|
| J1 | DRAFT | OPEN | Employer (owner) | publish validation: title/desc/category/area/date-window/pay/headcount ≥1; welfare set present; org+KYC gate per §36a #10 policy | published_at set; visible in discovery; audit; optional match pre-warm |
| J2 | OPEN | HIRING | System | first application received OR first hire | employer notified (`NEW_APPLICATION` batched) |
| J3 | OPEN/HIRING | FILLED | System | hired_count == headcount_required (set by hire tx) | off discovery; `STAFFED` event (in-app+push to employer) |
| J4 | FILLED | HIRING | System | hired_count < headcount_required (release) | shortfall event; Quick Match entry possible |
| J5 | HIRING | OPEN | System | hired_count == 0 (all released — normalization) | back to full discovery |
| J6 | OPEN/HIRING/FILLED | IN_PROGRESS | System / Employer | first check-in of a work day, or employer manual start within schedule window | crew workspace active; application mutations locked (only post-work flows) |
| J7 | IN_PROGRESS | COMPLETED | Employer (owner) | every work day's attendance ∈ {APPROVED, NO_SHOW} (resolved) | earnings finalized → ELIGIBLE per policy; rating windows open; `RATING_REQUEST` events |
| J8 | COMPLETED | CLOSED | Employer / System | all linked earnings ∈ {PAID, CANCELLED} OR grace elapsed | terminal; archived; rating window may continue |
| J9 | OPEN/HIRING/FILLED | CANCELLED | Employer (owner) / Admin | NOT IN_PROGRESS; crew-handling confirmation step surfaced | applications → EXPIRED; crew → release flow required; worked-day earnings honored; `JOB_CANCELLED` events |
| J10 | OPEN/HIRING (past ends_on + grace) | EXPIRED | System sweep | date passed, unfilled, no completion path | applications → EXPIRED; audit |
| J11 | DRAFT | hard delete | Employer (owner) | never published; zero references | delete row (only legal hard delete, audit records it) |

✗ examples (unit tests): `COMPLETED→OPEN` (no reopen — repost instead) · `CANCELLED→*` · `IN_PROGRESS→CANCELLED` (must complete/correct) · `CLOSED→*` · `EXPIRED→*`.

---

## M2 — Application

States: `APPLIED · SHORTLISTED · WAITLISTED · HIRED · REJECTED · WITHDRAWN · CANCELLED · EXPIRED`

| # | From | To | Actor | Validation / guard | Side effects |
|---|---|---|---|---|---|
| A0 | — | APPLIED | Worker | job ∈ {OPEN,HIRING}; slots free; worker eligible (KYC gate policy); no date conflict with active crew jobs (tx row-lock); UNIQUE(job,worker); account ACTIVE | application_count++; employer `NEW_APPLICATION` events; job J2 |
| A1 | APPLIED | SHORTLISTED | Employer (owner) | ownership | worker notified |
| A2 | APPLIED | WAITLISTED | Employer (owner) | ownership | worker notified |
| A3 | APPLIED/WAITLISTED/SHORTLISTED | REJECTED | Employer (owner) | ownership | worker notified; V1: cannot re-apply to same job |
| A4 | WAITLISTED↔SHORTLISTED | (swap) | Employer (owner) | ownership | worker notified |
| A5 | APPLIED/SHORTLISTED/WAITLISTED | HIRED | Employer (owner) / Quick Match accept | free slot (hired_count < required) + conflict-free inside tx + Idempotency-Key | **crew_member row created in same tx**; hired_count++; job J3/J4 check; worker `HIRED` events (in-app+push+SMS) |
| A6 | APPLIED/SHORTLISTED/WAITLISTED | WITHDRAWN | Worker (self) | before hire | employer queue updated |
| A7 | HIRED | WITHDRAWN | Worker (self) | before IN_PROGRESS | crew → RELEASED; hired_count--; job J4/J5 check |
| A8 | HIRED | CANCELLED | Employer (owner) | before IN_PROGRESS (release flow, reason required) | crew → RELEASED; freed slot; worker notified with reason |
| A9 | APPLIED/…/SHORTLISTED/WAITLISTED | EXPIRED | System | job CANCELLED or EXPIRED sweep | queue cleanup; worker told job outcome |
| A10 | REJECTED/WITHDRAWN/CANCELLED/EXPIRED | ✗ terminal | — | — | — |

---

## M3 — Attendance (per job × worker × work_day)

States: `NOT_STARTED · CHECKED_IN · CHECKED_OUT · APPROVED · NO_SHOW`

| # | From | To | Actor | Validation / guard | Side effects |
|---|---|---|---|---|---|
| T0 | — | NOT_STARTED | System | crew_member ACTIVE for the work day | row created on demand (hire or day start) |
| T1 | NOT_STARTED | CHECKED_IN | Worker (scan) / Employer (manual) | signed, fresh token (≤60s, single-use — token_id recorded); crew ACTIVE; within [day_start − grace, day_start + cutoff]; no existing check-in; optional geofence match | check_in_at (UTC) + source + coordinates; audit; employer roster live-updates; `ATTENDANCE_REMINDER` pre-event |
| T2 | CHECKED_IN | CHECKED_OUT | Worker / Employer / System | checkout scan, employer close, or auto-close at day_end + grace | duration_minutes computed; day closed |
| T3 | CHECKED_OUT | APPROVED | Employer (owner) | no open complaint linked to this record | earning-day counted → earning ELIGIBLE check (M4-P2); worker `ATTENDANCE_APPROVED` |
| T4 | NOT_STARTED | NO_SHOW | System sweep | day_end + cutoff passed, no check-in | crew flagged NO_SHOW (job J7 accounting); both parties notified; excluded from earnings |
| T5 | CHECKED_IN | NOT_STARTED | Employer (owner) / Admin | erroneous check-in reversal; reason mandatory | full audit before/after; rare |
| T6 | any (post-checkin) | corrected values | Employer (owner) / Admin | reason + actor mandatory; never silent | `ATTENDANCE_CORRECTED` audit |

✗: `APPROVED→CHECKED_IN` (day final — corrections are audited edits, not re-entry) · worker-initiated `APPROVED` · `NO_SHOW→CHECKED_IN` (admin correction path via T5 rules with reason only).

---

## M4 — Earning / Payment

States: `PENDING · ELIGIBLE · APPROVED · PROCESSING · PAID · FAILED · ON_HOLD · CANCELLED`

| # | From | To | Actor | Validation / guard | Side effects |
|---|---|---|---|---|---|
| P0 | — | PENDING | System | crew_member exists for job | earning shell (amount computed from job terms × approved days later) |
| P1 | PENDING | ELIGIBLE | System | all required attendance APPROVED (per completion policy) | employer `EARNINGS_READY` (in-app+push) |
| P2 | ELIGIBLE | APPROVED | Employer (owner) | ownership; Idempotency-Key | amount_paise LOCKED; audit; worker `PAYMENT_APPROVED` |
| P3 | APPROVED | PROCESSING | System/Provider | future provider path only (record-only V1 skips) | attempt logged |
| P4 | APPROVED/PROCESSING | PAID | Employer (manual record) / System (provider cb) | reference required (≥6 chars) + optional evidence; amount matches locked amount; Idempotency-Key | payment_transaction + payment_earning rows; worker totals updated; `PAYMENT_RECORDED` events (in-app+push, SMS optional per matrix) |
| P5 | APPROVED | FAILED | System | provider failure (future) | retry policy; employer/admin alerted |
| P6 | ELIGIBLE/APPROVED | ON_HOLD | System (complaint link) / Admin | open complaint targeting this earning | actions blocked while held; parties notified |
| P7 | ON_HOLD | ELIGIBLE/APPROVED | Admin | complaint RESOLVED/DISMISSED | resumes prior flow; parties notified |
| P8 | PENDING | CANCELLED | System | job CANCELLED with zero approved attendance | terminal; audit |
| P9 | any (money) | compensating adjustment | Employer/Admin | `adjust` only pre-PAID; PAID corrections = new negative adjustment row with reason (never mutate PAID) | audit before/after |

✗: `PAID→*` (immutable) · any worker-initiated transition.

---

## M5 — KYC submission

States: `DRAFT · SUBMITTED · UNDER_REVIEW · VERIFIED · REJECTED`

| # | From | To | Actor | Guard | Effects |
|---|---|---|---|---|---|
| K0 | — | DRAFT | Worker (owner) | account ACTIVE; no other open submission | shell created |
| K1 | DRAFT | SUBMITTED | Worker | ≥1 valid document (mime/size/hash rules); consent recorded (versioned text snapshot); attempt cap ≤3 | queue entry; `KYC_SUBMITTED` events; doc access logged |
| K2 | SUBMITTED | UNDER_REVIEW | System / Admin | queue pick | — |
| K3 | UNDER_REVIEW | VERIFIED | Admin (kyc permission) | document view logged first (§20) | worker badge derived; gates unlock (hire/publish per #10); `KYC_DECISION` events |
| K4 | UNDER_REVIEW | REJECTED | Admin | reason mandatory | `KYC_DECISION` events |
| K5 | REJECTED | DRAFT | Worker | attempts < cap | resubmit cycle |
| ✗ | VERIFIED | anything | — | — | (correction = admin sanction path, not KYC edit) |

---

## M6 — Account

States: `PENDING_VERIFICATION · ACTIVE · SUSPENDED · CLOSED`

| # | From | To | Actor | Guard | Effects |
|---|---|---|---|---|---|
| C0 | — | PENDING_VERIFICATION | System | first OTP request | challenge issued |
| C1 | PENDING_VERIFICATION | ACTIVE | System | OTP verified (phone bound) | session issued (first-login flag = role/profile completion needed) |
| C2 | ACTIVE | SUSPENDED | Admin | reason + permission; sanction row created | **all sessions revoked (refresh rejected immediately)**; pending participation cancelled per policy; `ACCOUNT_SUSPENDED` events |
| C3 | SUSPENDED | ACTIVE | Admin | reason; or complaint resolved | sessions may be re-established; `ACCOUNT_REINSTATED` events |
| C4 | ACTIVE/SUSPENDED | CLOSED | User (future self-close) / Admin | V1: admin-driven close only; zero open obligations | terminal; PII retention per DPDP policy (#25) |
| ✗ | SUSPENDED | ACTIVE by self | — | — | reactivation is admin-only |

---

## M7 — Complaint

States: `OPEN · UNDER_REVIEW · WAITING_ON_PARTY · RESOLVED · DISMISSED · CLOSED_TIMEOUT`

| # | From | To | Actor | Guard | Effects |
|---|---|---|---|---|---|
| L0 | — | OPEN | Any party (submitter) | link target exists + caller is party; narrative ≥20 chars; spam rate-limit | `COMPLAINT_ACK` events; linked earning → ON_HOLD if type=PAYMENT |
| L1 | OPEN | UNDER_REVIEW | Admin | — | queue |
| L2 | UNDER_REVIEW | WAITING_ON_PARTY | Admin | question/event recorded | party `COMPLAINT_STATUS` events; aging timer starts |
| L3 | WAITING_ON_PARTY | UNDER_REVIEW | Party reply (event) | party authorization | timer stops |
| L4 | UNDER_REVIEW/WAITING_ON_PARTY | RESOLVED | Admin | resolution note mandatory | holds released (M4-P7); sanctions if any (M6-C2); outcome events |
| L5 | UNDER_REVIEW/WAITING_ON_PARTY | DISMISSED | Admin | note mandatory | holds released; outcome events |
| L6 | WAITING_ON_PARTY (timeout, config default 7d) | CLOSED_TIMEOUT | System sweep | timer elapsed | recorded as resolution type; holds released |
| L7 | RESOLVED/DISMISSED | OPEN (REOPEN) | Admin | fresh evidence; once only | audit |

---

## Test mapping (Phase 4 will generate these)

| Machine | Rows | ✗-cases | Test file (future) |
|---|---|---|---|
| Job | 11 | 4+ | `job.state.spec.ts` |
| Application | 10 | 4+ | `application.state.spec.ts` |
| Attendance | 7 | 3+ | `attendance.state.spec.ts` |
| Earning/Payment | 10 | 2+ | `earning.state.spec.ts` |
| KYC | 6 | 1 | `kyc.state.spec.ts` |
| Account | 5 | 1 | `account.state.spec.ts` |
| Complaint | 8 | 1 | `complaint.state.spec.ts` |
