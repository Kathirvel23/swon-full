# WorkBridge — Entity Relationship Design (Phase 1)

**Status:** DRAFT for owner gate review · **Date:** 2026-09-25
**Source:** `architecture.md` §8 (conventions) · §12 (state machines) · §13 (domain model) · §14 (API needs).
Companion files: `ERD_supporting.md` (supporting entities) · `STATE_MACHINES.md` · `SEED_DATA.md` · `MIGRATION_PLAN.md` · `../Backend/prisma/schema.prisma` (machine-readable twin of this document).

---

## 1. Conventions (from §8 — non-negotiable)

- MySQL 8.0 / InnoDB / utf8mb4 (Tamil-safe). `snake_case`; `created_at`/`updated_at` on every mutable table (UTC).
- **Keys:** internal `BIGINT UNSIGNED` surrogate PK (`id`); opaque `public_id` (cuid, unique) on every externally-addressed entity — *decision deferred by §8 was taken here: APIs expose `public_id` only, never the bigint.*
- **Money:** integer **paise** in `BIGINT`; `currency` = `'INR'` everywhere. Never floats.
- **Time:** timestamps UTC. Job schedules = local date + local time + explicit `timezone` (`Asia/Kolkata`).
- **Status columns:** `VARCHAR` + `CHECK` (list applied in migration SQL — Prisma cannot express CHECK; state machine §12 is authoritative).
- **FKs:** `ON DELETE RESTRICT` (default, no cascades).
- **Deletion:** only `DRAFT` jobs and unreferenced sessions are ever deleted; everything else is state-terminated.
- Sensitive data: KYC binaries in private object storage (DB stores refs + hashes); `audit_log` append-only.

## 2. Relationship map (backbone)

```
account ──1:1── worker_profile ──1:N── availability_slot
   │                    ├──1:N── application ──1:1── crew_member
   │                    └──1:N─────────────────────────┐
   ├──1:1── employer_profile ──1:N── job ──1:N── job_work_day / job_welfare / job_skill
   │                              ├──1:N── application (unique per worker)
   │                              ├──1:N── quick_match_offer
   │                              ├──1:N── crew_member ──1:N── attendance_record ──0..1── earning
   │                              ├──1:N── rating                                └──N:1── payment_earning ──N:1── payment_transaction
   │                              └──1:N── complaint (polymorphic link 0..1)
   ├──1:N── session / otp_challenge / push_token / kyc_submission(1) / notification
   └──1:N── complaint (submitter) · audit_log (actor)
```

**Invariants (from §13.4/§8):** `application.HIRED ⇔ crew_member row` (same transaction) · one application per (job, worker) · one crew member per (job, worker) · one attendance per (job, worker, work_day) · one earning per (job, worker) · one rating per (job, rater, ratee) · one account per phone · overlap/double-booking checked in-transaction with row locks (no DB exclusion constraint exists in MySQL).

---

## 3. Core entities

### 3.1 `account` (H1)
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT UNSIGNED | PK, autoincrement | internal only |
| public_id | VARCHAR(30) | UNIQUE, cuid | API identity |
| phone | VARCHAR(15) | UNIQUE, NOT NULL | E.164 `+91…`; login identity |
| role | VARCHAR(10) | NOT NULL, CHECK in ('worker','employer','admin') | one role per account (V1) |
| status | VARCHAR(20) | NOT NULL, CHECK in ('PENDING_VERIFICATION','ACTIVE','SUSPENDED','CLOSED') | §12.6 |
| phone_verified_at | DATETIME NULL | | set by OTP verify |
| last_login_at | DATETIME NULL | | |
| closed_at | DATETIME NULL | | |
| created_at / updated_at | DATETIME | NOT NULL | UTC |

Indexes: `phone` (unique), `role+status` (admin search).

### 3.2 `worker_profile` (H2) — 1:1 account
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| account_id | BIGINT UNSIGNED | FK→account, UNIQUE, RESTRICT | |
| full_name | VARCHAR(120) | NOT NULL | |
| photo_storage_key | VARCHAR(255) NULL | | private bucket |
| city / area_id | VARCHAR/VARINT | FK→area NULL-able | home area (matching) |
| bio | VARCHAR(500) NULL | | |
| experience_years | TINYINT NULL | | |
| avg_rating_milli | INT | NOT NULL, default 0 | denorm ×1000 (1.234 → 1234); updated by M4 |
| ratings_count / jobs_done_count | INT | default 0 | denorm |
| attendance_rate_milli | INT NULL | default NULL | derived reliability signal |
| profile_complete_pct | TINYINT | default 0 | drives completeness gates |
| created_at / updated_at | | | |

### 3.3 `employer_profile` (H2) — 1:1 account
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| account_id | BIGINT | FK, UNIQUE, RESTRICT | |
| org_name | VARCHAR(120) | NOT NULL | |
| org_type | VARCHAR(20) | CHECK ('INDIVIDUAL','FIRM','COMPANY','GOVT','NGO') | |
| contact_name | VARCHAR(120) | NOT NULL | |
| city / area_id | | FK→area, NOT NULL | |
| address_line | VARCHAR(255) | | |
| pan_ref / gstin | VARCHAR(20) NULL | | optional identity |
| verification_status | VARCHAR(20) | default 'UNVERIFIED' | org badge |
| avg_rating_milli / ratings_count / jobs_posted_count | INT | default 0 | denorm |
| welfare_defaults | JSON NULL | | employer's default welfare set |
| created_at / updated_at | | | |

### 3.4 `kyc_submission` (H3) — N:1 account (one open at a time)
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| account_id | BIGINT | FK→account, RESTRICT | |
| status | VARCHAR(20) | CHECK ('DRAFT','SUBMITTED','UNDER_REVIEW','VERIFIED','REJECTED') | §12.5 |
| id_type | VARCHAR(20) | CHECK ('PAN','VOTER','DRIVING','PASSPORT') | Aadhaar excluded pending compliant provider (R2) |
| id_number_enc | VARBINARY(512) | | app-layer encrypted |
| id_number_hash | CHAR(64) | | UNIQUE(account_id, id_number_hash) — dedupe/dup-fraud |
| attempts | TINYINT | default 1 | resubmit cap (3) |
| rejection_reason | VARCHAR(255) NULL | | shown to worker |
| submitted_at / decided_at | DATETIME NULL | | |
| decided_by_account_id | BIGINT NULL | FK→account (admin) | |
| created_at / updated_at | | | |

### 3.5 `kyc_document`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| submission_id | BIGINT | FK→kyc_submission, RESTRICT | |
| doc_type | VARCHAR(20) | CHECK ('ID_FRONT','ID_BACK','SELFIE','ADDRESS_PROOF') | |
| storage_key | VARCHAR(255) | NOT NULL | private, presigned access only |
| content_sha256 | CHAR(64) | NOT NULL | integrity + dup detection |
| mime | VARCHAR(80) / size_bytes INT | NOT NULL | allow-list enforced in API |
| created_at | | | |

### 3.6 `job` (H4)
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| employer_profile_id | BIGINT | FK, RESTRICT | |
| title | VARCHAR(120) | NOT NULL | ≤120 chars |
| description | TEXT | NOT NULL | plain language |
| category_id | BIGINT | FK→job_category, RESTRICT | |
| city | VARCHAR(60) | NOT NULL, default 'Coimbatore'/'Tiruppur' | |
| area_id | BIGINT | FK→area, NOT NULL | |
| address_line | VARCHAR(255) | NOT NULL | exact spot shared on hire |
| lat / lng | DECIMAL(10,7) NULL | | optional (V1 basic location) |
| timezone | VARCHAR(40) | NOT NULL, default 'Asia/Kolkata' | §8 |
| starts_on / ends_on | DATE | NOT NULL, CHECK ends≥starts | multi-day range; work days in `job_work_day` |
| day_start_time / day_end_time | TIME | NOT NULL | default window; per-day override allowed |
| pay_type | VARCHAR(10) | CHECK ('HOUR','DAY','TOTAL') | |
| pay_amount_paise | BIGINT | NOT NULL, CHECK >0 | per pay_type unit |
| headcount_required | SMALLINT | NOT NULL, CHECK >0 | |
| hired_count | SMALLINT | NOT NULL, default 0 | denorm, maintained by hire transaction |
| application_count | SMALLINT | NOT NULL, default 0 | denorm |
| status | VARCHAR(20) | CHECK ('DRAFT','OPEN','HIRING','FILLED','IN_PROGRESS','COMPLETED','CLOSED','CANCELLED','EXPIRED') | §12.1 |
| min_experience_years | TINYINT NULL | | |
| requirements_note | VARCHAR(500) NULL | | free-text must-haves |
| published_at / cancelled_at | DATETIME NULL | | |
| cancel_reason | VARCHAR(255) NULL | | |
| created_at / updated_at | | | |

Indexes: `(status, category_id, city, area_id, starts_on)` discovery · `(employer_profile_id, status)` my-jobs · `(status, ends_on)` sweep (EXPIRED).

### 3.7 `job_work_day` (multi-day schedule)
| id · job_id (FK) · work_date DATE · start_time TIME · end_time TIME · headcount SMALLINT NULL |
|---|
| UNIQUE(job_id, work_date) · drives one `attendance_record` per worker per day |

### 3.8 `job_skill` / `job_category` / `job_welfare`
- `job_skill`: id · job_id FK · skill_id FK → UNIQUE(job_id, skill_id).
- `job_category`: id · public_id · name · name_ta NULL · parent_id NULL FK self · sort_order · active. (seed data)
- `job_welfare`: id · job_id FK · welfare_item_id FK · note VARCHAR(255) NULL → UNIQUE(job_id, welfare_item_id). (§M5 taxonomy in SEED_DATA.md)

### 3.9 `application` (H6)
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| job_id | BIGINT | FK, RESTRICT | |
| worker_profile_id | BIGINT | FK, RESTRICT | |
| status | VARCHAR(20) | CHECK ('APPLIED','SHORTLISTED','WAITLISTED','HIRED','REJECTED','WITHDRAWN','CANCELLED','EXPIRED') | §12.2 |
| source | VARCHAR(15) | default 'APPLY', CHECK ('APPLY','QUICK_MATCH') | |
| quick_match_offer_id | BIGINT NULL | FK→quick_match_offer | |
| cover_note | VARCHAR(300) NULL | | |
| decision_note | VARCHAR(255) NULL | | employer note |
| decided_at | DATETIME NULL | | |
| created_at / updated_at | | | |

UNIQUE(job_id, worker_profile_id) · Index(worker_profile_id, status) "my applications" · Index(job_id, status) queue.

### 3.10 `quick_match_offer` (M2)
| id / public_id · job_id FK · worker_profile_id FK · status VARCHAR CHECK('PENDING','ACCEPTED','DECLINED','EXPIRED','CANCELLED') · wave_no SMALLINT · required_headcount SMALLINT · respond_by DATETIME NOT NULL (server expiry) · responded_at NULL · created_at |
|---|
| UNIQUE(job_id, worker_profile_id) · Index(worker_profile_id, status, respond_by) "my offers" |

### 3.11 `crew_member` (H7) — created only inside the HIRED transaction
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| job_id | BIGINT | FK, RESTRICT | |
| application_id | BIGINT | FK, UNIQUE, RESTRICT | 1:1 ⇔ application.status='HIRED' |
| worker_profile_id | BIGINT | FK, RESTRICT | UNIQUE(job_id, worker_profile_id) extra guard |
| status | VARCHAR(15) | CHECK ('ACTIVE','COMPLETED','RELEASED','NO_SHOW') | |
| released_reason | VARCHAR(255) NULL | | filled on release |
| hired_at / released_at | DATETIME NULL | | |
| created_at / updated_at | | | |

### 3.12 `attendance_record` (H8) — per (job, worker, work_day)
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| job_id · work_day_id · worker_profile_id · crew_member_id | BIGINT | FKs RESTRICT | |
| status | VARCHAR(15) | CHECK ('NOT_STARTED','CHECKED_IN','CHECKED_OUT','APPROVED','NO_SHOW') | §12.3 |
| check_in_at / check_out_at | DATETIME NULL | | UTC |
| check_source | VARCHAR(15) | NULL, CHECK ('SCAN','EMPLOYER','CORRECTED') | |
| check_token_id | VARCHAR(64) NULL | | replay guard (token audit) |
| source_lat / source_lng | DECIMAL NULL | | optional geofence evidence |
| duration_minutes | SMALLINT NULL | | computed at checkout |
| correction_reason | VARCHAR(255) NULL | | required when corrected |
| corrected_by_account_id | BIGINT NULL | FK | |
| created_at / updated_at | | | |

UNIQUE(job_id, worker_profile_id, work_day_id) · Index(job_id, status) roster · Index(work_day_id, status) sweeps.

### 3.13 `earning` (H9) — per (job, worker)
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id / public_id | | PK / UNIQUE | |
| job_id · worker_profile_id | BIGINT | FK RESTRICT, UNIQUE(job,worker) | |
| status | VARCHAR(15) | CHECK ('PENDING','ELIGIBLE','APPROVED','PROCESSING','PAID','FAILED','ON_HOLD','CANCELLED') | §12.4 |
| amount_paise | BIGINT NOT NULL | | finalized at APPROVED (locked) |
| currency | CHAR(3) | default 'INR' | |
| approved_at / paid_at | DATETIME NULL | | |
| hold_complaint_id | BIGINT NULL | FK→complaint | ON_HOLD link |
| adjustment_paise | BIGINT default 0 | | signed; `POST /earnings/:id/adjust` |
| adjustment_reason | VARCHAR(255) NULL | | required if ≠0 |
| created_at / updated_at | | | |

### 3.14 `payment_transaction` (+ `payment_earning` link)
- `payment_transaction`: id · public_id · status CHECK('PROCESSING','PAID','FAILED') · amount_paise · reference VARCHAR(64) NOT NULL (manual UTR/ref) · evidence_storage_key NULL · recorded_by_account_id FK (employer/admin) · paid_at · created_at. Append-only after terminal (corrections = new compensating row).
- `payment_earning`: earning_id FK · payment_transaction_id FK · amount_paise · PK(earning_id, payment_transaction_id) — batch-capable (§13.4-1).

### 3.15 `rating` (M4) — immutable
| id / public_id · job_id FK · rater_account_id FK · ratee_account_id FK · rater_role VARCHAR CHECK('WORKER','EMPLOYER') · score TINYINT CHECK 1..5 · tags JSON NULL · comment VARCHAR(300) NULL · created_at |
|---|
| UNIQUE(job_id, rater_account_id, ratee_account_id) · Index(ratee_account_id) aggregates · API guard: job must be COMPLETED, rater must be a party (§13.4-4) |

### 3.16 `notification` (M3, in-app inbox)
| id / public_id · recipient_account_id FK · event_key VARCHAR(64) (catalog in contracts `events.ts`) · title_key VARCHAR(64) · body_params JSON (templated, no raw PII of others) · context_type VARCHAR NULL (JOB/APPLICATION/…) · context_public_id VARCHAR NULL · read_at DATETIME NULL · created_at |
|---|
| Index(recipient_account_id, read_at, created_at) "unread first" |

### 3.17 `complaint` (M6)
| id / public_id · submitter_account_id FK · type VARCHAR CHECK('PAYMENT','SAFETY','HARASSMENT','NO_SHOW','FRAUD','OTHER') · severity VARCHAR CHECK('LOW','MEDIUM','HIGH') · status VARCHAR CHECK('OPEN','UNDER_REVIEW','WAITING_ON_PARTY','RESOLVED','DISMISSED','CLOSED_TIMEOUT') · link_type VARCHAR NULL CHECK('JOB','APPLICATION','EARNING','ATTENDANCE','ACCOUNT') · link_public_id VARCHAR NULL · narrative TEXT · resolution_note NULL · resolved_by_account_id NULL · resolved_at NULL · created_at / updated_at |
|---|
| Index(status, severity) admin queue · Index(submitter_account_id) "mine" · party reply events → `complaint_event` (supporting) |

---

*Supporting entities (sessions, OTP, availability, seeds/taxonomy, outbox, audit, config…) → `ERD_supporting.md`.*
