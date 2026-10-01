# WorkBridge — Supporting Entities (ERD part 2)

**Status:** DRAFT for owner gate review · **Date:** 2026-09-25 · Conventions and PK/`public_id` rules: see `ERD.md` §1.

---

## 1. Taxonomy & reference data (seeded — see `SEED_DATA.md`)

### `skill`
id · public_id · name · name_ta NULL · category_id NULL FK→job_category · active BOOL default 1 · sort_order INT
### `job_category` *(defined in ERD §3.8)*
### `welfare_item`
id · public_id · code VARCHAR(40) UNIQUE (e.g. `MEAL_PROVIDED`, `DRINKING_WATER`, `FIRST_AID`, `REST_AREA`, `SAFE_TRANSPORT`, `SHOE_GLOVE_REQUIRED`, `POSH_AWARE`) · label · label_ta NULL · description NULL · sort_order · active
Rationale: welfare is a fixed, reviewable taxonomy (M5) — employers pick codes + free-text note per job; workers see them as chips.
### `area`
id · public_id · city VARCHAR(60) (Coimbatore / Tiruppur first) · name VARCHAR(80) · name_ta NULL · lat/lng NULL (future distance features) · active
UNIQUE(city, name) · index(city) — discovery + matching filter path.

---

## 2. Worker availability (§14 `/workers` ops, matching input M1)

### `availability_slot`
id · worker_profile_id FK RESTRICT · work_date DATE · from_time TIME · to_time TIME · area_id FK NULL (open to travel? NULL = home area only) · status VARCHAR CHECK('AVAILABLE','BOOKED_HINT') · created_at / updated_at
UNIQUE(worker_profile_id, work_date, from_time, to_time) · overlap validation enforced in API (no overlapping windows) · index(work_date, area_id) matching scan.
*"Open to work" toggle:* stored on `worker_profile`? → column `open_to_work BOOL default 0` on `availability_slot`'s parent is wrong granularity; use platform_config-free flag on **worker_profile**: `open_to_work TINYINT default 0` + `open_to_work_updated_at` — ranking signal only (§36a #17).

---

## 3. Auth & session (H1)

### `session`
id · public_id · account_id FK RESTRICT · refresh_token_hash CHAR(64) UNIQUE (SHA-256 of opaque refresh; never store raw) · user_agent VARCHAR(120) NULL · ip_hash CHAR(64) NULL · issued_at · expires_at · revoked_at NULL · last_used_at
Index(account_id, revoked_at) — `GET /sessions`, `DELETE /sessions/:id`.
**Tokens:** access = short-lived JWT (stateless, §15); refresh = opaque, rotating, hashed here; reuse of a rotated refresh ⇒ revoke family (suspicious-activity rule).

### `otp_challenge`
id · public_id (becomes `challengeId`) · phone VARCHAR(15) · purpose VARCHAR CHECK('LOGIN','PHONE_CHANGE') · code_hash CHAR(64) (never raw) · attempts TINYINT default 0 (max 5) · max_attempts TINYINT default 5 · expires_at (2 min) · cooldown_until (rate limit) · consumed_at NULL · created_at
Index(phone, purpose, consumed_at) · request rate: 1/min/phone+ip class (§24 rate limits).

### `push_token`
id · account_id FK · platform VARCHAR CHECK('ANDROID','IOS','WEB') · token VARCHAR(255) · active BOOL default 1 · last_seen_at · created_at · UNIQUE(account_id, token) · invalid-token pruning on repeated failure (§22).

---

## 4. KYC support (H3)

### `kyc_consent` *(1:1 per submission — folded into `kyc_submission`? kept separate for auditability)*
id · submission_id FK UNIQUE · consent_version VARCHAR(20) · granted_at · ip_hash · text_snapshot JSON (exact wording accepted — DPDP evidence)
### `document_access_log` *(who opened a KYC doc — §20 sensitive access)*
id · document_id FK · actor_account_id FK · action VARCHAR CHECK('VIEW','DOWNLOAD','DELETE') · at DATETIME · ip_hash NULL
Append-only (part of the audit family).

---

## 5. Notification plumbing (M3, §22)

### `notification_outbox` *(same-transaction commit point)*
id · event_key VARCHAR(64) · dedupe_key VARCHAR(120) UNIQUE (event id — dedupe on retry) · payload JSON (recipients resolved, params) · status VARCHAR CHECK('PENDING','SENDING','SENT','FAILED','DEAD') · attempts TINYINT default 0 · next_attempt_at NULL · created_at / updated_at
Index(status, next_attempt_at) — dispatcher poll.
### `notification_delivery`
id · outbox_id FK · recipient_account_id FK · channel VARCHAR CHECK('INAPP','PUSH','SMS','EMAIL') · status VARCHAR CHECK('PENDING','SENT','FAILED','SKIPPED') · provider_ref VARCHAR(120) NULL · error_code VARCHAR(40) NULL · attempted_at · created_at
(Channels per event = matrix in `architecture.md` §22; rules enforced by dispatcher.)
### `notification_pref`
account_id PK/FK · push_enabled BOOL default 1 · sms_enabled BOOL default 1 (OTP exempt — unmuteable) · quiet_hours VARCHAR(20) NULL · updated_at
### `sms_log` *(DLT/cost audit)*
id · phone_hash CHAR(64) (no raw phone in logs) · template_id VARCHAR(64) · purpose · provider_ref · status · cost_paise INT NULL · created_at — required evidence for Indian DLT compliance review (R4).

---

## 6. Platform, ops, integrity (cross-cutting)

### `audit_log` *(append-only — app role has no UPDATE/DELETE grant)*
id (BIGINT) · at DATETIME · actor_account_id NULL (system rows NULL) · actor_role VARCHAR · action VARCHAR(80) (e.g. `APPLICATION_HIRED`, `ATTENDANCE_CORRECTED`) · entity_type VARCHAR(40) · entity_public_id VARCHAR(30) · before_json JSON NULL · after_json JSON NULL · request_id VARCHAR(40) NULL · ip_hash NULL
Indexes: (entity_type, entity_public_id), (actor_account_id, at), (at).
### `sanction`
id · account_id FK · type VARCHAR CHECK('WARN','SUSPEND','BAN','PAYMENT_HOLD') · reason TEXT · linked_complaint_id NULL FK · issued_by_account_id FK · starts_at · ends_at NULL · lifted_at NULL · created_at
### `platform_config`
`key` VARCHAR(64) PK (e.g. `MATCH_WEIGHTS`, `QUICKMATCH_EXPIRY_SEC`, `OTP_MAX_ATTEMPTS`, `RATING_WINDOW_DAYS`, `KYC_ATTEMPT_CAP`, `GRACE_MINUTES`) · value_json JSON · scope VARCHAR default 'GLOBAL' · version INT default 1 · updated_by_account_id NULL · updated_at
Weights/limits live here (editable later = L4 config UI), NOT in code (§16 explainability needs recorded weights).
### `idempotency_key`
key VARCHAR(80) PK (client-supplied `Idempotency-Key` + route) · account_id FK · request_hash CHAR(64) · response_json JSON · status VARCHAR CHECK('IN_PROGRESS','DONE') · created_at · expires_at (24h)
Enables §14 replay semantics for apply/hire/check-in/approve/pay/quick-match-accept.
### `match_log` *(optional explainability, §16)*
id · job_id FK · requested_by_account_id FK · candidates_json JSON (top-N with scores+reason codes) · weights_version INT · created_at — cheap to store; powers "why was I ranked here" support answers.
### `email_outbox` *(minimal §2.3)* — deferred: V1 has no critical email; table created only when first email need is approved.

---

## 7. Complaint support
### `complaint_event`
id · complaint_id FK · actor_account_id FK · kind VARCHAR CHECK('NOTE','PARTY_REPLY','STATUS_CHANGE','EVIDENCE') · body TEXT NULL · evidence_storage_key NULL · created_at — feeds `WAITING_ON_PARTY` aging sweep (§12.7).

---

## 8. Future entities — attach points (§13.3, not in this schema)

| Future entity | Attaches at |
|---|---|
| Incident/SOS, emergency replacement | `complaint` (type extension) + `crew_member` (replacement row) |
| Insurance policy/claim | `earning` / `payment_transaction` |
| Payout/escrow transaction | `payment_transaction` (provider column addition) |
| Message/Conversation | `account` pair + `job` context |
| Organization member/role | `employer_profile` (1:N members) |
| Hourly shift | `job_work_day` (finer slots) |

**No future entity requires reshaping a core table** (§13.4-6 satisfied).

---

## 9. Index & uniqueness summary (query-path driven, §8)

| Query path | Table | Index |
|---|---|---|
| Discovery feed | job | (status, category_id, city, area_id, starts_on) |
| My jobs | job | (employer_profile_id, status) |
| Sweep (EXPIRED) | job | (status, ends_on) |
| Apply eligibility | application | UNIQUE(job_id, worker_profile_id) |
| Employer queue | application | (job_id, status) |
| My applications | application | (worker_profile_id, status) |
| Crew roster | crew_member | (job_id, status) |
| Attendance roster/day | attendance_record | (job_id, status) / (work_day_id, status) |
| Attendance uniqueness | attendance_record | UNIQUE(job_id, worker_profile_id, work_day_id) |
| Earnings per job / mine | earning | (job_id, status) / (worker_profile_id, status) |
| Matching scan | availability_slot | (work_date, area_id) |
| Unread inbox | notification | (recipient_account_id, read_at, created_at) |
| Admin queues | kyc_submission / complaint | (status, created_at) / (status, severity) |
| Session list | session | (account_id, revoked_at) |
| Double-hire guard (tx lock) | crew_member | UNIQUE(job_id, worker_profile_id) |
