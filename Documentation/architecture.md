# SWON — V1 Architecture & Technical Blueprint

**Status:** DRAFT — for project-owner review and approval
**Date:** 2026-09-24
**Phase:** Pre-implementation (Architecture & Technical Planning)
**Related documents:** `audit.md` (internal), `client-progress.md` (client-facing)

> This document is architecture, not implementation. No application code, database schema, API implementation, project scaffold, or dependencies have been created. Decisions are marked **CONFIRMED** (owner direction already given), **PROPOSED** (recommendation awaiting approval), **UNKNOWN** (not yet researched/decided), or **REQUIRES OWNER DECISION** (business/product call). Consolidated in the Open Architectural Questions section at the end.

---

## 1. Executive Architecture Summary

- **Product shape:** Mobile-first temporary workforce platform. Central lifecycle: Authentication → Profile → KYC → Job Creation → Discovery → Application → Application Queue → Hiring → Crew → Attendance → Work Completion → Payment → Rating/Reputation. Every component below exists to serve this chain.
- **System shape:** React Native (Expo, TypeScript) mobile client + a separate lightweight Admin web app, both talking to a single versioned REST API delivered by a **modular monolith** backend over **MySQL 8**. One database, one deployable backend, strict internal module boundaries.
- **Consistency first:** Application → Hiring → Crew → Attendance → Payment is a transactional chain. A single database with in-process business logic makes correctness cheap; distributed services would make it expensive. This is the primary reason for the monolith choice.
- **Admin:** Proposed as a separate web application (not part of the mobile app) — desk-based document review and moderation workflows fit desktop UX, and admin changes bypass app-store review.
- **Money (V1):** Ledger/record model — the platform computes earnings, records employer approval and payment confirmation; actual settlement happens outside the platform until a payment model is chosen (owner decision).
- **Attendance:** Server-issued, signed, rotating QR tokens scanned by workers, with an employer manual-roster fallback; per-work-day records; employer approval gates payment eligibility.
- **Matching:** Deterministic rule-based filtering + weighted scoring with reason codes (explainable, testable, cheap). Quick Match is a separate time-boxed offer workflow that reuses the same eligibility/scoring core.
- **Notifications:** Event-driven; in-app inbox always, push for time-critical events, SMS for OTP and critical fallbacks. Channel-per-event matrix, not everything-everywhere.
- **Security:** Phone-OTP authentication, short-lived access tokens with rotating refresh tokens, RBAC + resource-ownership authorization, deny-by-default, append-only business audit trail, rate limiting from day one.
- **Provider-agnostic edges:** SMS/OTP, push, object storage, geocoding, KYC verification, payments — each sits behind a small interface. No vendor is selected in this document; vendors are open questions.

---

## 2. System Boundary

Four bounded areas. The rule that governs them: **the mobile application never touches the database; all paths go through the Backend API.**

### 2.1 Mobile Application (React Native + Expo + TypeScript)

Owns:
- UI rendering, navigation, routing, deep links
- Client-side form input handling and *UX-level* validation (server remains authoritative)
- Secure storage of session tokens (OS keychain/keystore)
- Camera capture and QR scanning (payload shape check only; authenticity is server-verified)
- Location acquisition (permission flow, coordinates/area) — acquisition only, decisions are server-side
- Push token registration and notification receipt handling
- Local persistence: session, user preferences, read-caches, form drafts
- Offline-awareness UX (loading / error / empty / retry states, draft persistence)

Does NOT own:
- Business rules, state transitions, eligibility, matching computation
- Authorization decisions (UI hiding is UX only; the server enforces)
- Any data of record, payment logic, or cross-user visibility rules

### 2.2 Backend API

Owns:
- Authentication and session/token lifecycle
- Authorization (role checks + resource ownership/policy checks), deny-by-default
- All business rules and every state machine in this document
- Authoritative validation of all input
- Matching and Quick Match computation
- Notification orchestration (event → rule → channel dispatch)
- File/KYC-document access control (presigned-URL issuance)
- Rate limiting, idempotency, abuse controls
- All database access and transaction management
- Business audit records and structured application logs

### 2.3 Database (MySQL 8)

Owns durable records for: accounts/sessions, worker & employer profiles, availability, skills/categories, KYC submissions and document references, jobs and their requirements/welfare, applications, quick-match offers, crew assignments, attendance records, earnings/payments/ledger, ratings, notifications, complaints, platform configuration, audit trail.

Rules: only the backend connects; PII minimized to what the product needs; audit tables append-only; KYC document *binaries* live in object storage (DB stores references + status only).

### 2.4 External Services (responsibility first — no vendor selected)

| Capability | Responsibility in the product | Failure posture if unavailable |
|---|---|---|
| OTP / SMS delivery | Phone verification at registration/login; critical fallback alerts | Resend cooldown + clear UX; no login until delivered (fallback channel = open question) |
| Push notification delivery | Time-critical alerts (hire, offers, application changes) | In-app inbox still works; SMS fallback for critical events |
| Object / file storage | KYC documents, profile photos, payment evidence (private, presigned access) | Uploads paused with retry queue; existing data unaffected |
| Geocoding (area → coordinates) | Optional distance features when coordinates are absent | Manual area selection and city/area filters still work |
| Maps display / routing | Deferred; V1 links out to the native maps app | No in-app dependency |
| Payment / payout processing | Conditional on settlement model (likely future) | V1 record-only flow unaffected |
| KYC / identity verification provider | Future automated checks; V1 = manual admin review | Manual path is the baseline |
| Email | Minimal (admin/employer receipts, if any) | Non-critical |

Each external capability is accessed through a narrow interface (adapter) owned by the backend, so vendors can be swapped without touching business logic.

### 2.5 Interaction rule

```
[ Worker/Employer mobile app (RN+Expo) ]        [ Admin web app ]
                │                                       │
                └────────── HTTPS + JSON (REST /api/v1) ┘
                                    │
                          [ Backend API — modular monolith ]
                          auth · identity · jobs · hiring · crew
                          attendance · payments · matching ·
                          notifications · moderation · audit
                                    │
                    ┌───────────────┼────────────────┐
               [ MySQL 8 ]   [ Object storage ]  [ External providers:
                    │            (private)         SMS, push, geocode… ]
             (only backend)
```

No client talks to any other system directly. No external provider is called from the mobile app.

---

## 3. Recommended Architecture

**Recommendation: Option B-family — a modular monolith backend with a single versioned REST API, MySQL 8, React Native (Expo) clients, and a separate admin web app.**

Structure:
- **One deployable backend process** (stateless, horizontally scalable by replicas).
- **Internal structure = domain modules** (auth, accounts, profiles, kyc, jobs, applications, hiring, crew, attendance, payments, matching, quick-match, notifications, ratings, welfare, complaints, moderation, config, audit), each with its own service layer, data ownership, and public interface. Modules call each other in-process; side effects travel via an in-process domain-event bus.
- **One MySQL database**, one schema per environment; transactions span module boundaries when the business flow requires it (e.g., hire + crew creation + slot count).
- **Thin HTTP layer:** controllers parse/validate input, invoke a module service, map results to the error envelope. No business logic in controllers.
- **Background work:** in-process scheduler for expiry sweeps, NO_SHOW detection, notification retries (an outbox table guarantees events survive crashes).

Why this fits SWON V1:
1. **Transactional integrity.** The core chain (application → hire → crew → attendance → payment eligibility) must never show "hired but no crew record" or double-fill a job. Single-DB transactions make this trivial; services would need distributed sagas.
2. **One team, AI-assisted delivery.** One repo, one deploy pipeline, one set of conventions — the highest-leverage setup for correctness and review speed.
3. **The entities are deeply shared.** Job is touched by eight modules. In-process calls with typed interfaces beat network hops with retry/serialization concerns.
4. **V1 scale expectations** (two cities, thousands of users, tens of thousands of jobs) are far below the threshold where a monolith is a constraint.
5. **Testability.** Module services are plain classes/functions with injected dependencies — unit-testable without network or database.

When to revisit (extract services later): independent scaling of notifications or matching; separate teams owning domains; differing availability requirements. Likely first extractions: notification delivery worker, matching compute. The module boundaries defined here are deliberately the future service boundaries — extraction is a refactor of the transport, not the domain logic.

---

## 4. Architecture Alternatives Considered

| Option | Description | Verdict |
|---|---|---|
| **A** — RN + API + layered modular backend + MySQL | Explicit layered architecture: HTTP → application services → domain → repositories, organized by module | **Converges with B.** Layering *inside* modules is how B is built; A and B differ only in emphasis. Not a real alternative. |
| **B** — RN + modular monolith + MySQL | **Recommended.** One backend, domain modules with ownership boundaries, single API, single DB, in-process events | Chosen: best fit for transactional core, team size, delivery model (§3) |
| **C** — Service-oriented backend (multiple services) | Job service, hiring service, attendance service, payment service… communicating over the network | **Rejected for V1.** Distributed transactions across the core chain; operational overhead (N deploys, service discovery, tracing, partial-failure handling); slower iteration; no scaling need at V1 scale. Revisit when a domain genuinely needs independent scale/ownership. |
| **D** — Backend-as-a-Service (Firebase/Supabase-style) or schema-owning client | Less custom backend; logic in client + BaaS rules/functions | **Rejected.** The product's state machines, role/ownership authorization, matching, and audit requirements exceed what BaaS rules express cleanly; strong lock-in risk; contradicts the project principle that the client never owns data access or business rules. |

Trade-off summary for the chosen path: we accept that all modules deploy together (a fault in one module can affect the whole API — mitigated by module discipline, tests, and process-level supervision) and that the database is a single scaling point (acceptable at V1 scale; read replicas/reporting split later). In exchange we get transactional correctness, simple operations, and fast, safe iteration.

---

## 5. Technology Stack Recommendation

| Layer | Choice | Status |
|---|---|---|
| Mobile app | React Native + Expo (managed workflow) + TypeScript | **CONFIRMED** (owner direction) |
| Mobile navigation | Expo Router (file-based, route groups per auth state/role) | PROPOSED |
| Mobile server-state | TanStack Query | PROPOSED |
| Mobile local state | Zustand (session/UI state) | PROPOSED |
| Forms + validation | React Hook Form + Zod | PROPOSED |
| Repo layout | Single monorepo: `/mobile`, `/backend`, `/admin`, `/packages/contracts` (shared Zod schemas/types) | PROPOSED |
| Backend runtime | Node.js (LTS) + TypeScript | CONFIRMED (owner execution prompt, 2026-09-24) |
| Backend framework | **NestJS** | CONFIRMED (owner execution prompt, 2026-09-24; alternatives noted in §5) |
| ORM / data access | Prisma (typed queries, migration tooling) | CONFIRMED (owner execution prompt, 2026-09-24) |
| Database | MySQL 8.0, InnoDB, utf8mb4 | CONFIRMED (owner direction + execution prompt, 2026-09-24) |
| API style | REST + JSON, `/api/v1`, error envelope, idempotency keys on critical mutations | PROPOSED |
| Auth mechanism | Phone + OTP (SMS) login; short-lived JWT access token + rotating refresh token | PROPOSED (mechanism); provider UNKNOWN |
| Object storage | S3-compatible private bucket + presigned URLs | PROPOSED pattern; vendor UNKNOWN |
| Push | Expo Notifications (abstracts FCM/APNs) | PROPOSED |
| SMS/OTP vendor | — | UNKNOWN (open question; India DLT rules apply) |
| Maps/geocoding | None in-app (link out to native maps); geocode adapter optional | PROPOSED |
| Cache / message queue | None for V1 (DB outbox + in-process scheduler); Redis only if measurements demand | PROPOSED |
| Server testing | Jest + Supertest; test database per run | PROPOSED |
| Mobile testing | Jest + React Native Testing Library; Maestro for device E2E | PROPOSED |
| Admin web | React + Vite + TypeScript; Playwright E2E | PROPOSED (React-based separate web app CONFIRMED by owner execution prompt 2026-09-24; Vite/Playwright detail remains open) |

**Backend framework evaluation (the main open stack decision):**

- **NestJS (recommended proposal):** Strong structural conventions (modules, providers, guards, interceptters, pipes) that keep 15 modules separated; dependency injection makes services unit-testable in isolation; guards/interceptors are the natural home for authentication, authorization, rate limiting, logging, and error mapping as true cross-cutting concerns; OpenAPI generation is built in; first-class TypeScript aligns with the mobile app and shared contracts. Trade-off: more ceremony than a bare framework, framework-learning surface for contributors.
- **Laravel (PHP):** Fastest CRUD velocity, mature ecosystem, built-in queue/scheduler/notifications. Trade-off: introduces a second language and loses type sharing with the TypeScript client/contracts; splits the AI-agent/tooling surface across ecosystems. Strongest alternative if the owner prefers PHP.
- **Django / DRF (Python):** Batteries included, and Django admin could shortcut parts of the admin backend. Trade-off: weaker static-typing story for complex state transitions and API contracts; again a second language; admin generator locks UI patterns.
- **Express or bare Fastify:** Minimal and fast to start, but at 15 modules scale it means *inventing* the structure NestJS gives you — conventions become documents rather than enforced code. Rejected for maintainability, not capability.

All four can build this product. NestJS is proposed because structural enforcement of module boundaries and cross-cutting concerns is exactly where multi-module, AI-assisted projects drift. **Final selection is the owner's call** (Open Question #1).

---

## 6. Mobile Architecture

Conceptual layers (folder structure is a later-phase decision):

1. **Presentation layer**
   - *Screens:* feature containers that compose components, call resource hooks, and render states (loading/error/empty/success). Screens contain no business rules beyond UX validation.
   - *Components:* `ui/` primitives (Button, Input, Card, List, Badge…) and feature composites (JobCard, ApplicationRow, AttendanceQrView…). Presentational only; data flows in via props.
2. **Navigation layer** — Expo Router route groups gated by session state and role (see §10). Guards redirect; server-side checks remain authoritative.
3. **State layer (four distinct kinds, deliberately separated)**
   - *Server state:* TanStack Query cache (jobs, applications, profile, earnings, notifications) — fetching, caching, refetch-on-focus, invalidation after mutations.
   - *Session/UI state:* Zustand store (current user+role, onboarding step, modal/flag state).
   - *Form state:* React Hook Form + Zod schema per form.
   - *Persisted state:* SecureStore (tokens), AsyncStorage (preferences, last-known lists, drafts).
4. **API layer**
   - A single typed HTTP client: base URL per build profile, automatic auth-header injection, refresh-on-401 with request queueing during refresh, normalization of every response into a typed `AppError` (see §24).
   - Resource modules (`jobsApi`, `applicationsApi`…) built on the shared contracts package. **Screens never call `fetch` directly.**
5. **Services layer** — device capabilities behind interfaces: `auth` (token lifecycle), `location` (permission + acquisition), `notifications` (push-token registration, receipt handling), `qr` (camera scan → payload parse), `uploads` (presigned upload flow with retry), `storage`.
6. **Cross-cutting**
   - Global error boundary + error presenter (no white screens; every failure has a user path)
   - i18n: all user-facing strings in externalized key tables from day one (even if V1 ships one language)
   - Logging/crash reporting adapter (no PII in logs)
   - Remote feature config (minimal V1)

Hard rules: tokens only in SecureStore (never AsyncStorage); role gating in the router is UX — every sensitive action is re-verified by the API; device permissions (camera/location/notifications) are requested contextually with a graceful denied-state path; no third-party SDK collects data without a decision recorded here.

---

## 7. Backend Architecture

**Shape:** modular monolith, layered inside each module.

```
HTTP layer        controllers · DTO/Zod validation · interceptors (logging, error envelope, idempotency)
Auth layer        authentication guard · role guard · policy/ownership guard (deny by default)
Domain modules    auth, accounts, profiles, kyc, jobs, applications, hiring, crew,
                  attendance, payments, matching, quick-match, notifications,
                  ratings, welfare, complaints, moderation, config, audit
                  └── each: service(s) + repository interface + own tables + public interface
Infrastructure    ORM/MySQL · object storage · SMS adapter · push adapter · geocode adapter ·
                  clock/id generation (injectable — testability)
Cross-cutting     domain event bus (in-process) · audit writer · config loader · structured logger
```

- **Module communication:** synchronous in-process service calls for anything that must share a transaction; **domain events** (post-commit) for side effects that must not fail the business transaction (e.g., `ApplicationCreated` → notify employer → outbox row → async dispatch).
- **Data ownership:** each module's tables are written only by that module. Other modules read through the owning module's public query interface or approved read views. This is convention + review + (later) lint enforcement — it is the load-bearing wall that keeps a monolith from becoming spaghetti.
- **Transactions:** owned by the calling application service; short-lived; no network calls inside a transaction.
- **Deployment:** stateless API process(es) + MySQL + object storage. Scaling = replicas behind a load balancer. Background jobs (offer expiry, NO_SHOW sweep, notification retries) run on an in-process scheduler V1; a dedicated worker process is a later, non-breaking split.
- **Environments:** separate config/credentials/instances for local, staging, production (§30).

---

## 8. Database Architecture

*(Conceptual decisions only — no schema/SQL is created until the Data & API Design phase, per instructions.)*

- **Engine:** MySQL 8.0, InnoDB, utf8mb4; one database per environment; UTF8-safe for Tamil script content.
- **Access:** only the backend connects. No client, no ad-hoc analyst connection (reporting reads a replica/export later). Credentials via environment secrets, never in code.
- **Migrations:** forward-only, numbered, reviewed, applied by CI/release — never ad-hoc at runtime. Rollback in production = a forward corrective migration (down-migrations used for local dev only).
- **Conventions (proposed):**
  - Surrogate `BIGINT` primary keys internally; externally exposed IDs are opaque (decision deferred to schema design — flagged as open).
  - `snake_case` names; `created_at` / `updated_at` on all mutable tables.
  - **Money:** integer minor units (paise) in `BIGINT` — never floats. Currency `INR`.
  - **Time:** timestamps stored UTC; job schedules stored as local dates + local time with an explicit timezone (Asia/Kolkata) — a job's meaning must not shift with server timezone.
  - **Status columns:** string + `CHECK` constraint (evolvable), with the application's state machine (§12) as the authoritative transition authority.
  - Referential integrity enforced with FKs; default `ON DELETE RESTRICT` (no accidental cascades — deletion is a deliberate, module-owned operation).
  - Indexes follow the query paths: discovery filters (status, category, city/area, date), matching (availability, worker area), queue lookups (job, status), attendance (job+worker+date unique).
- **Sensitive data:** KYC document binaries in private object storage (DB holds references, status, hashes); PII columns limited to product necessity; `audit_log` is append-only (no UPDATE/DELETE permission for the app role).
- **Integrity:** uniqueness constraints where the business demands it — one account per phone, one application per (job, worker), one active attendance record per (job, worker, date), one rating per (job, rater, ratee).
- **Backups:** automated daily full + binlog point-in-time recovery; restore procedure rehearsed before launch (owner-facing item).
- **Concurrency note:** MySQL has no exclusion constraints, so overlap/double-booking checks are done inside transactions with row-level locking on the worker's active hires (see §16/§17) — validated by dedicated race-condition tests (§27).

---
## 9. Module Architecture

Format per module: Purpose · Responsibilities · Primary users · Inputs · Outputs · Dependencies · Data ownership · Business rules · Important states · Security considerations · Failure scenarios · Future extension points.

### H1 — Authentication & Account
- **Purpose:** Establish and verify identity; manage sessions for all three roles.
- **Responsibilities:** Registration/login via phone OTP, session issuance/rotation/revocation, account state enforcement, device session visibility.
- **Primary users:** Worker, Employer, Admin (admin provisioned separately).
- **Inputs:** Phone number, OTP codes, role selection (at signup), device metadata, refresh token.
- **Outputs:** Account record, access/refresh tokens, active-session list, auth events.
- **Dependencies:** SMS/OTP adapter, notification module (push registration), audit module.
- **Data ownership:** `accounts`, `sessions` (refresh-token families), `otp_challenges`.
- **Business rules:** One account per phone number; phone verification required before any profile/job action; role fixed at signup in V1 (dual-role = open question); admin accounts cannot self-register (invite/provision only); OTP resend cooldown; locked/suspended accounts cannot obtain sessions.
- **Important states:** Account: `PENDING_VERIFICATION → ACTIVE → SUSPENDED` (+ `CLOSED` future); OTP challenge: `ISSUED → USED | EXPIRED | FAILED_ATTEMPTS`.
- **Security considerations:** OTP rate limits (per phone + per IP), short access token (~15 min), rotating refresh tokens with reuse detection (reuse revokes the family), tokens only in OS secure storage, session revocation from profile, auth events audited.
- **Failure scenarios:** SMS undeliverable → retry/backoff + clear resend UX; token theft → family revocation on reuse; duplicate signup → return existing account for verification; brute force → throttling + lockout window.
- **Future extension points:** Email/social login, MFA for admin, organization accounts, passkeys.

### H2 — User & Profile Management
- **Purpose:** Hold the identity, work attributes, and trust surface each role needs for discovery and decisions.
- **Responsibilities:** Worker profile (name, photo, skills, experience, city/area, availability), employer profile (business name, type, address, contact, logo), profile completeness enforcement, privacy-safe public views.
- **Primary users:** Worker (own), Employer (own), Admin (moderation views), both roles as *viewers* of each other's safe views.
- **Inputs:** Profile field edits, skill/category selections, availability windows (date + time ranges + area), photo upload, employer org details.
- **Outputs:** Profile records, role-safe projection views (what each audience may see), completeness flags.
- **Dependencies:** Object storage (photos), KYC module (status badge), jobs/matching (read consumers), audit.
- **Data ownership:** `worker_profiles`, `employer_profiles`, `skills`, `worker_skills`, `availability_slots`, area/city reference data.
- **Business rules:** Minimum completeness required before applying (name + area + ≥1 skill — proposed); employer org profile must be complete before publishing a job; availability never overrides an existing hire (hires win — conflict checks assume this); other users see only explicitly safe fields (no phone number leakage).
- **Important states:** Profile completeness flags (per-field `INCOMPLETE → COMPLETE`); no heavy state machine — account state (H1) governs participation.
- **Security considerations:** Edit restricted to owner (or admin); photo uploads type/size-validated; PII masked in cross-user views; audit on sensitive profile changes (e.g., area change affecting matching).
- **Failure scenarios:** Photo upload failure → resumable retry; stale availability vs. new hire → hire transaction wins, availability flagged for user review; duplicate skills → uniqueness constraint.
- **Future extension points:** Team/org accounts with members, portfolio/media, languages, resume import, skill assessments.

### H3 — KYC & Verification
- **Purpose:** Establish verified trust for workers and employers before high-stakes participation.
- **Responsibilities:** Submission intake, document capture/upload, admin review queue, decisions with reasons, resubmission loop, verification badge exposure.
- **Primary users:** Worker/Employer (submit, track), Admin (review/decide).
- **Inputs:** ID type + number, document images, selfie, address details; employer business-registration document (type TBD); admin decision + reason.
- **Outputs:** KYC record with status, verification badge on profile/job views, consent record, audit events.
- **Dependencies:** Object storage (private), admin surface, notification (decision alerts), audit, config (required-doc set).
- **Data ownership:** `kyc_submissions`, `kyc_documents` (references/hashes), `kyc_consents`.
- **Business rules:** Phone-verified account required before submission; one active submission per account; resubmission attempt cap (e.g., 3 — proposed); *whether KYC is required before applying vs. before being hired vs. before publishing jobs is a trust-policy owner decision* (proposal: browse/apply freely; KYC required to be hired (worker) and to publish (employer)); status is derived from the latest submission.
- **Important states:** `DRAFT → SUBMITTED → UNDER_REVIEW → VERIFIED | REJECTED` (→ resubmit → `SUBMITTED`); expired/re-verify state later.
- **Security considerations:** Documents in private encrypted bucket via presigned upload; time-boxed, audited view URLs; only the KYC-review role can access documents; every view/decision audited; ID numbers masked in UI; Aadhaar-storage regulatory caution (Open Question).
- **Failure scenarios:** Upload failure → resumable queue; unreadable document → rejection with specific reason; reviewer backlog → queue metrics + alerts; provider outage (future) → manual path unaffected.
- **Future extension points:** Automated eKYC provider behind a `KycProvider` interface, tiered verification levels, re-verification expiry, document classification.

### H4 — Job Management
- **Purpose:** Employers define opportunities; the platform owns the job lifecycle.
- **Responsibilities:** Create/edit/draft jobs, validation on publish, lifecycle transitions, fill counting, cancel/close semantics, moderation visibility, welfare/requirement declarations.
- **Primary users:** Employer (owner), Admin (moderate/hide), Worker (read consumer), system (auto-transitions).
- **Inputs:** Job fields (title, category/type, worker count, date(s), time window, location, pay type + rate, skills/requirements, welfare declarations), publish/edit/close/cancel actions.
- **Outputs:** Job records, lifecycle events (published, filled, cancelled…) driving notifications/matching/discovery.
- **Dependencies:** Applications/hiring (slot consumption), discovery (read index), matching, notification, audit, location, config (categories/welfare taxonomy).
- **Data ownership:** `jobs`, `job_work_days` (multi-day schedules), `job_requirements`, `job_welfare`, `job_categories`.
- **Business rules:** Employer owns their jobs; publish requires complete fields, count ≥ 1, future dates, stated pay, complete org profile (+ KYC if policy requires); core fields lock once applications exist (pay/date changes need an explicit confirm/repost flow — detail deferred, flagged); `hired_count == required_count` ⇒ auto-`FILLED`; cancel allowed before `IN_PROGRESS` with forced handling of already-hired crew (worked days still owed); admin can hide/restore any job with audit.
- **Important states:** Job state machine (§12): `DRAFT, OPEN, HIRING, FILLED, IN_PROGRESS, COMPLETED, CLOSED, CANCELLED` (+ proposed `EXPIRED`).
- **Security considerations:** Ownership checks on every mutation; content validation/length limits; welfare claims are employer-declared (UI must not imply platform certification); moderation can unpublish; all transitions audited.
- **Failure scenarios:** Concurrent hires racing past the required count → transactional slot check (§27 race test); past-date submit → validation; duplicate posting → soft dedupe warning; cancellation with crew → block until crew released/acknowledged with payment obligations surfaced.
- **Future extension points:** Recurring/multi-shift job templates, bulk posting, drafts with assisted fill-in, shift-level (hourly) granularity.

### H5 — Job Marketplace & Discovery
- **Purpose:** Workers find eligible, suitable, live jobs efficiently.
- **Responsibilities:** Feed/list queries, filtering (category, city/area, distance, date, pay, welfare flags), search, sorting, eligibility computation with transparent reasons, job detail rendering.
- **Primary users:** Worker.
- **Inputs:** Filter/search/sort parameters, worker context (area, availability, existing applications/hires, KYC status).
- **Outputs:** Paginated job lists, job detail view, eligibility badge ("eligible" / "why not"), cache-safe responses.
- **Dependencies:** Jobs (source), profile (eligibility context), location (distance), matching module (shared ranking logic), config (categories), notification (future job alerts).
- **Data ownership:** None new — read model over jobs/profile; owns query/perf indexes only.
- **Business rules:** Only `OPEN`/`HIRING` published jobs of active employers are visible; drafts/private jobs visible only to owner; eligibility = slots open + no time conflict + not already hired + policy gates (KYC) — *always explained, never silently hidden*; personalization in V1 = filters + deterministic ranking (no ML feed).
- **Important states:** Read path (stateless) + cursor pagination; feed cache invalidated on job state change.
- **Security considerations:** No leakage of draft/closed jobs or other employers' data; rate-limited heavy queries; safe field projection (employer contact masked until hired).
- **Failure scenarios:** Empty result → guided relaxation (clear filters / widen area / next date), not a dead end; stale cache after fill → invalidation on transition; location permission denied → manual area selection path.
- **Future extension points:** Geo-sorted feed, recommendation shelf, saved searches, proactive job alerts (event → notification), map view (behind the location boundary).

### H6 — Application Queue & Hiring
- **Purpose:** The selection process — "Who should we hire?" — on both sides: workers manage their applications; employers process the queue.
- **Responsibilities:** Apply/withdraw; queue listing and sorting; shortlist/waitlist/reject/hire/release with notes; slot accounting; hire → crew handoff; auto-close on job cancellation/expiry; bulk actions.
- **Primary users:** Worker (apply/withdraw/view), Employer (review/decide), System (auto-close).
- **Inputs:** Apply action; withdraw action; employer decisions (`SHORTLIST`, `WAITLIST`, `REJECT`, `HIRE`, release-after-hire); reviewer notes; bulk command lists.
- **Outputs:** Application records + transitions, hire events (→ crew creation), notifications to both parties, audit.
- **Dependencies:** Job lifecycle (fill/cancel), crew module (hire side-effect), conflict/double-booking check, notification, audit, quick-match (reuses the same hire command).
- **Data ownership:** `applications`, `application_notes`.
- **Business rules:** Unique (job, worker) application; apply only when job is `OPEN|HIRING`, slots remain, worker eligible and conflict-free; withdraw any time before hire; decisions restricted to the job owner; hire runs in a transaction that re-checks slots (never exceeds required count); waitlisted can be hired while slots remain; rejected workers cannot re-apply to the same job (V1 simplicity — flagged); job cancel/expiry auto-closes non-hired applications; `hired_count` reaches required ⇒ job `FILLED`.
- **Important states:** Application state machine (§12): `APPLIED, SHORTLISTED, WAITLISTED, HIRED, REJECTED, WITHDRAWN, CANCELLED, EXPIRED`.
- **Security considerations:** Employer sees only their job's queue; workers see only their own applications; notes are employer-internal but discoverable by admin (and via complaint flow); every decision audited; bulk endpoints authorize *per row*, not once.
- **Failure scenarios:** Two employers hiring the same worker for overlapping times → conflict check inside the transaction → `409` with explanation; slot race → re-check under lock; notification delivery failure → decision still stands (outbox retry); withdraw-vs-hire race → state guard resolves deterministically (first commit wins).
- **Future extension points:** Team review/assignment, attachments on applications, auto-reject rules, candidate messaging, offer-letter generation.

### H7 — Crew / Workforce Management
- **Purpose:** After hiring — "Who is currently working on this job, and what is their status?"
- **Responsibilities:** Roster creation on hire, headcount vs. requirement, member status, release/replacement handling, shortfall signaling, attendance/payment linkage.
- **Primary users:** Employer (manage), Worker (view own membership), System (derived completion/no-show), Admin (override with audit).
- **Inputs:** Hire events (creates members), release action, status changes, attendance outcomes (consumed), replacement requests (future L2 input).
- **Outputs:** Crew roster, headcount vs. gap indicators (feeds Quick Match shortfall), eligibility signals to payments, audit.
- **Dependencies:** Applications (source of truth for membership), attendance (upstream of completion), payments (eligibility input), matching (gap re-run — future), notification.
- **Data ownership:** `crew_members`.
- **Business rules:** Membership exists iff the application is `HIRED` (created atomically with the hire); headcount never exceeds the job's required count; release before work ⇒ application `CANCELLED`, slot freed, notify; completion derived from attendance approval; NO_SHOW recorded from attendance; replacement in V1 = release + hire (L2 automates later).
- **Important states:** Member: `ACTIVE → COMPLETED | RELEASED | NO_SHOW` (see §12 addition).
- **Security considerations:** Only the job owner mutates roster; workers can view own membership only; admin overrides audited; roster changes notify affected workers.
- **Failure scenarios:** Worker backs out late → release flow + shortfall alert to employer (+ Quick Match entry point); double assignment → unique (job, worker) constraint; inconsistent roster vs. applications → single-writer rule (membership derived from hire transaction) prevents drift.
- **Future extension points:** L2 automated replacement, worker confirmation step, sub-role/skill assignments within crew, crew-level communication.

### H8 — Attendance & Work Tracking
- **Purpose:** Record who actually worked, when — the basis of payment eligibility.
- **Responsibilities:** QR check-in/check-out, employer manual roster marking, per-work-day records, corrections with reasons, NO_SHOW sweep, employer approval.
- **Primary users:** Worker (scan), Employer (display code, manual mark, correct, approve), System (expiry sweeps), Admin (override/audit).
- **Inputs:** Scanned signed QR payload, device timestamp + optional coordinates, manual marks, correction entries with reason, bulk approval commands.
- **Outputs:** Attendance records per (job, worker, date), approved-day totals → earning eligibility, NO_SHOW flags, audit events.
- **Dependencies:** Crew (who may attend), job schedule (days/windows), location (optional check), notification (reminders), payments (consumer), audit.
- **Data ownership:** `attendance_records`.
- **Business rules:** Only `ACTIVE` crew may check in; within the job's time window + grace (e.g., 15 min, configurable); exactly one check-in and one check-out per worker per job-day; server clock/token freshness is authoritative (device time is a hint only); missing checkout at window end ⇒ auto close + employer confirm; approval is required before payment eligibility; all manual marks/corrections require actor + reason; NO_SHOW set when no check-in by cutoff + grace.
- **Important states:** Attendance state machine (§12): `NOT_STARTED, CHECKED_IN, CHECKED_OUT, APPROVED, NO_SHOW`.
- **Security considerations:** QR payloads are server-signed, short-lived, rotating, job-scoped; scan endpoints rate-limited; optional geofence (owner decision); employer approvals/corrections fully audited; employers do not have their own attendance in V1 (flagged scope note).
- **Failure scenarios:** Offline scan → fails fast; employer manual mark fallback keeps the day recordable; expired/rotating code → refresh and rescan; wrong-job code → clear error; duplicate scan → idempotent no-op / `409`; missed checkout → correction flow with reason.
- **Future extension points:** Hourly shifts (currently day-based), GPS/geofence enforcement, biometric/anti-share measures, overtime rules, incident linkage (L1).

### H9 — Payment & Earnings
- **Purpose:** Compute what is owed, who approved it, and record disbursement — separated from processing.
- **Responsibilities:** Earning calculation from job terms + approved attendance, eligibility gating, employer approval (single/bulk), payment recording (manual reference or future provider), adjustments with reasons, statements, hold on dispute.
- **Primary users:** Employer (approve/record), Worker (view own), Admin (oversight, release holds, resolve), System (computes).
- **Inputs:** Job pay terms (daily rate/fixed), approved attendance, adjustment entries (bonus/deduction + reason), approve/pay actions, payment reference/evidence, (future: provider callbacks).
- **Outputs:** Earning records, immutable ledger entries, payment transaction records, worker totals/statements, audit.
- **Dependencies:** Attendance (eligibility input), job terms, complaints (hold linkage), KYC (if payout policy requires), notification, audit, payment provider (future).
- **Data ownership:** `earnings`, `payment_transactions`, `ledger_entries` (append-only).
- **Business rules:** Earning = job rate × approved days (daily type) or the job's fixed amount on completion (exact formula fixed at schema design); eligibility only after attendance `APPROVED` (+ job completion per policy); approval transitions `ELIGIBLE → APPROVED`; V1 disbursement model proposed as *record-only*: employer pays outside the platform, then records payment with reference → `PAID` (settlement/escrow model = owner decision); adjustments require reason + actor; `FAILED` retries then manual/admin path; open complaint on an earning ⇒ `ON_HOLD`; all money in integer paise.
- **Important states:** Payment state machine (§12): `PENDING, ELIGIBLE, APPROVED, PROCESSING, PAID, FAILED, ON_HOLD, CANCELLED`.
- **Security considerations:** Only employer/admin mutate; workers read-only on own; idempotency keys on approve/pay; no bank/card data stored in V1; every transition audited with before/after.
- **Failure scenarios:** Calculation drift → single calculation service + golden tests; double approval → state guard + idempotency; employer never approves → aging alerts to employer + admin visibility; dispute → hold via complaint; partial-day edge cases → integer math + explicit rounding rules.
- **Future extension points:** Gateway payouts/escrow, instant payout, platform fee/commission (business-model dependent — open question), tax handling (TDS) if the platform ever disburses, wallet, multi-currency (out of scope).

### M1 — Workforce Matching & Recommendation Engine
- **Purpose:** Answer "Which workers are suitable for this job?" — the intelligence layer (§16).
- **Responsibilities:** Candidate filtering (hard eligibility), multi-signal scoring, deterministic ranking, explainability (scores + reason codes), fallback relaxation, weight configuration.
- **Primary users:** Employer (view ranked candidates for own jobs), Quick Match (consumer), Admin (weight/config oversight).
- **Inputs:** Job requirements (skills, date/time window, location/area, count), candidate pool attributes (skills, experience, availability, area/distance, rating, attendance/reliability, response history, conflict state), configured weights.
- **Outputs:** Ranked candidate list with component scores, top reasons, filters applied, relaxation flags.
- **Dependencies:** Profiles/skills, availability, ratings, attendance history, job conflict state, config module, audit (request log).
- **Data ownership:** No new source-of-truth data; optional `match_requests` log for debugging/explainability.
- **Business rules:** Same input ⇒ same output (deterministic ordering with documented tie-breakers); hard filters (eligibility, conflict, availability) are never scored around; every result carries explainable reasons; weights live in configuration, not code; cold-start workers score on available signals with documented neutral defaults (never NaN/undefined); fairness note — only job-relevant signals (no protected-class proxies).
- **Important states:** Stateless computation; short-TTL cache per (job, filter-set) optional.
- **Security considerations:** Employers can only match against candidates eligible for *their* job; candidate PII exposure limited to profile safe-views; compute endpoints rate-limited; match activity audited lightly.
- **Failure scenarios:** Empty pool → ladder of relaxations (distance ↑, then rating floor ↓, then time window ±) returned with explicit "relaxed" markers; stale attributes → recompute per request (V1); oversized pool → bounded candidate pre-filter (SQL) before in-memory scoring.
- **Future extension points:** ML ranker/A-B testing behind the same interface, response-time prediction, embeddings, learned weights — all deferred.

### M2 — Quick Match
- **Purpose:** "I need suitable workers quickly" — a fast-hiring workflow layered on M1 (§17), not the engine itself.
- **Responsibilities:** Requirement intake, candidate wave selection, time-boxed offers, acceptance handling, direct-to-crew hiring, shortfall reporting.
- **Primary users:** Employer (initiate), Worker (accept/decline), System (expiry waves).
- **Inputs:** Requirement (category, count, date/time, area, rate, offer duration), offer actions, worker accept/decline.
- **Outputs:** Quick-match offers, `HIRED` applications (source = quick match) → crew, shortfall report, notifications, audit.
- **Dependencies:** M1 scoring, H6/H7 hire pipeline (same command), availability + conflict checks, notification, audit.
- **Data ownership:** `quickmatch_offers`.
- **Business rules:** Offers only to eligible, available, conflict-free workers; wave size ≈ 2× remaining slots (capped, e.g., 10 — configurable); offer expiry configurable (default proposal: 30 min); accept is a *transactional hire* (re-checks slots + conflicts — an accept against a full slot or conflicting hire fails gracefully); a worker may hold multiple concurrent offers — first acceptance wins; declines/expiries trigger the next wave automatically; never exceeds required count; shortfall result always ends in an explicit report (never a silent failure).
- **Important states:** Offer: `PENDING → ACCEPTED | DECLINED | EXPIRED | CANCELLED` (§17).
- **Security considerations:** Same authorization as hiring; offer sends rate-limited (anti-spam); all offer activity audited; workers' responses never exposed to other workers.
- **Failure scenarios:** All candidates decline → normal application queue remains open + employer alerted; insufficient pool → shortfall + prompts to widen criteria or broadcast a non-binding "interest" alert; last-slot race on accept → `409` handled with a friendly message; notification undelivered → in-app offer still visible.
- **Future extension points:** Auto-wave scheduling, L2 emergency replacement reuse, surge/demand signals, employer auto-extend options.

### M3 — Notifications & Communication
- **Purpose:** Event-driven awareness for every role, across the right channels only (§22).
- **Responsibilities:** Event intake, per-event channel routing, template rendering, in-app inbox, push/SMS dispatch, delivery retry, preference enforcement, token hygiene.
- **Primary users:** All roles.
- **Inputs:** Domain events (post-commit), user preferences, templates, device push tokens, provider responses.
- **Outputs:** In-app notification records (always), push/SMS (per matrix), delivery logs, preferences.
- **Dependencies:** Every domain module (events), SMS/push adapters, config (templates), audit (best-effort delivery records).
- **Data ownership:** `notifications` (inbox), `notification_outbox`, `notification_deliveries`, `user_notification_prefs`, `templates`.
- **Business rules:** In-app record always created; channel per event follows the matrix in §22 (not everything everywhere); OTP SMS is transactional priority; user may mute non-critical push only (OTP/critical cannot be muted); business transactions never wait on delivery (outbox after commit, async dispatch, retries with backoff); duplicate suppression by event ID; no marketing messages in V1.
- **Important states:** Delivery: `PENDING → SENT → DELIVERED | FAILED` (provider acks best-effort); inbox: `UNREAD → READ`.
- **Security considerations:** Templates escape user-generated content (no injection into SMS/push); messages carry minimal PII; notifications and prefs readable/writable only by owner; device tokens pruned on auth-out.
- **Failure scenarios:** Provider outage → retry queue + SMS fallback for critical events; invalid push token → prune + degrade to in-app; backlog → depth alerts; event lost → outbox written in the same transaction as the business change (at-least-once).
- **Future extension points:** Two-way chat/messaging (owner scope decision), localized templates, email receipts, campaigns (deliberately excluded from V1).

### M4 — Rating & Reputation
- **Purpose:** Post-completion mutual trust signals that later feed matching (§10 workflow).
- **Responsibilities:** Rating window management, one-time mutual ratings, aggregate computation, abuse/moderation handling, reputation exposure.
- **Primary users:** Worker (rates employer), Employer (rates worker), Admin (moderation), Matching (consumer).
- **Inputs:** Score (1–5), optional category tags + comment, job completion event.
- **Outputs:** Rating records, aggregate reputation (average, count, reliability components), audit.
- **Dependencies:** Job completion, complaint module (comment moderation), matching (reads), notification (rating requests).
- **Data ownership:** `ratings` (aggregates computed on read in V1).
- **Business rules:** Only actual parties of the same `COMPLETED` job may rate; one rating per (job, rater, ratee); window opens at job completion, expires after a period (e.g., 14 days) — unrated after expiry simply never appears; no edits in V1; ratings visible immediately (simpler than double-blind — trade-off noted); aggregates show a "new" state below a minimum count; both worker and employer reputations are visible to each other.
- **Important states:** Rating opportunity: `OPEN → RATED | EXPIRED` per (job, rater).
- **Security considerations:** Authorization strictly scoped to job parties; comments moderated via complaint flow (admin hide right); rate-limited submissions; no retaliation mechanics (scores are not editable or deletable by counterparties).
- **Failure scenarios:** One side silent → expiry handles it; abusive comment → complaint path + admin hide with audit; gaming (fake ratings) → constraint that ratings require completed jobs makes fabrication structurally hard; aggregate edge cases (zero ratings) → explicit UI states.
- **Future extension points:** Weighted reputation algorithm, skill badges, attendance-derived reliability score, dispute-adjusted scores, employer response to ratings.

### M5 — Worker Safety & Welfare
- **Purpose:** Make welfare expectations visible, filterable, and accountable — declared by employers, surfaced to workers, overseen by admins.
- **Responsibilities:** Taxonomy-driven welfare declarations on jobs, display on job cards/details, discovery filters, violation reporting linkage (via M6), admin overview.
- **Primary users:** Employer (declare), Worker (view/filter/report), Admin (oversee).
- **Inputs:** Welfare toggles + notes (PPE, drinking water, shade/rest, breaks, meals, toilets, transport/parking, first aid, women-safety measures, working-hours cap…), admin flags.
- **Outputs:** Job welfare block, welfare filters in discovery, audit of changes, evidence for complaints.
- **Dependencies:** Jobs (attached at job level), config (taxonomy), complaints (violation path), notification, audit.
- **Data ownership:** `job_welfare` (per job), `welfare_taxonomy` (platform config).
- **Business rules:** Taxonomy-driven checkboxes (+ note) so declarations are structured and filterable; declarations are *employer-stated, not platform-certified* — UI must say so; declaration fields are optional in V1 (owner may mandate a minimal set — open question); editable only before publish (post-publish edits audited and surfaced); filters treat absence honestly ("not declared" ≠ "not provided").
- **Important states:** No independent state machine; declaration set versions with the job's edit history.
- **Security considerations:** Only owner edits; workers cannot be penalized for reporting violations (complaint anonymity policy = owner decision); admin can flag misleading claims and hide jobs; all edits audited.
- **Failure scenarios:** Misleading claims → complaint path + moderation; conflicting declarations vs. reality → M6 workflow; spam/toggle abuse → admin flagging.
- **Future extension points:** Verification badges, insurance linkage (deferred tier), welfare scoring per employer, region-specific mandatory sets, welfare history as reputation signal.

### M6 — Complaints & Issue Management
- **Purpose:** Structured intake and resolution of disputes and safety issues — the trust backstop for the whole lifecycle.
- **Responsibilities:** Typed complaint intake with evidence, linkage to business entities, review workflow, resolutions/sanctions, payment/attendance hold triggers, audit.
- **Primary users:** Worker, Employer (submit), Admin (resolve), System (aging/escalation).
- **Inputs:** Complaint type (payment not received, unsafe conditions, no-show, fake/misleading job, harassment/abuse, other), narrative, evidence (photos/refs), linked entity IDs, admin actions (assign, request info, resolve with outcome, sanction), party responses.
- **Outputs:** Complaint records + event thread, resolutions, sanctions (warn/suspend/hide job), payment holds/releases, attendance corrections as outcomes, audit.
- **Dependencies:** Linked modules (payments hold, attendance correction, account suspension), notification, admin surface, audit; future L1/SOS intake.
- **Data ownership:** `complaints`, `complaint_events`, `sanctions`.
- **Business rules:** Only parties to the linked entity may open a complaint (plus admin-created); severity levels drive ordering; linked earning ⇒ payment `ON_HOLD` until resolution; resolution types: dismiss / warn / suspend (worker|employer) / hide job / release-or-void payment hold / correct attendance; abandoned threads auto-close with notice after inactivity timeout; suspensions enforced centrally by the auth layer (H1) — one enforcement point.
- **Important states:** Complaint: `OPEN → UNDER_REVIEW → WAITING_ON_PARTY → RESOLVED | DISMISSED` (+ reopen by admin).
- **Security considerations:** Access = submitter + subject + admin only; evidence private and audited on view; submission rate limits (spam); retaliation monitoring is policy + product visibility (admin sees complaint patterns per account); every action audited.
- **Failure scenarios:** Unresponsive parties → timeout close; false claims → review + dismissal with reason; evidence upload failure → resumable; both parties silent → auto-close; harassment severity → escalation flag to admin lead.
- **Future extension points:** L1 SOS intake, insurance claim linkage, resolution chat, auto-categorization, SLA tracking.

---
## 10. Navigation Architecture

**Model:** Expo Router with three top-level route groups; the user's session + role selects the group at launch and on session change. Guards redirect; the server remains authoritative.

```
app/
├── (auth)/        Welcome · Login (phone) · OTP verify · Role select · Registration steps
├── (worker)/      role-gated tab stack
├── (employer)/    role-gated tab stack
└── [shared modals]: JobDetails · AttendanceScanner · ImageViewer · Confirmations
```

**Unauthenticated:** Welcome → Login (phone entry) → OTP verify → (new user) Role select → registration completion → session established → role group. (Existing verified user → straight into their group.) Session-expired users land back at (auth) with return-path preserved.

**Worker tabs (proposed, 5):**
1. Home — feed highlights, alerts, today's job shortcut
2. Jobs — search/filter list → Job Details (push) → Apply
3. Work — my applications (statuses) + hired jobs → job workspace (crew card, attendance/QR, details)
4. Earnings — payment history and pending amounts
5. Profile — profile, skills, availability, KYC status, ratings received, settings
Notifications: header icon (badge) on all groups, opening a full-screen Notifications stack — not a tab, to keep tabs at five.

**Employer tabs (proposed, 5):**
1. Dashboard — open jobs, hiring progress, urgent alerts
2. Jobs — my jobs (lifecycle chips) → Create/Edit Job (stack) → Job workspace
3. Hiring — per-job application queue: review → shortlist → hire (bulk actions); Quick Match entry
4. Crew — rosters per job: attendance oversight, approvals, payment approvals
5. Profile — org profile, KYC, welfare defaults, settings
Notifications: same header pattern.

**Admin:** NOT in the mobile app (CONFIRMED — separate lightweight React web app, owner execution prompt 2026-09-24). Design intent: a **separate responsive web app** with table/queue-first UX (KYC review with document viewers, user moderation, complaints, config). Rationale: admin work is desk-based and document-heavy; web avoids app-store review for operational changes; keeps privileged capabilities off personal devices; allows a different auth policy (2FA). Alternative considered: admin section inside the RN app (single codebase, faster V1 start) — rejected for UX fit, review friction, and a wider attack surface on consumer devices.

**Cross-cutting navigation rules:** deep links validated against role before resolving; auth state changes rebuild the router (no stale role screens); back behavior platform-native; destructive actions always confirmed via modal; every screen defines loading/error/empty states (§24).

**Dual-role note:** V1 assumes one role per account (open question). If dual-role is approved later, navigation adds a role-switch affordance and both groups load from the same session — the structure above already permits it.

---

## 11. Workflow Architecture

Each workflow: Actor · Trigger · Preconditions · Steps · State transitions · Validation · Failure conditions · Notifications · Data changes.

### 11.1 Worker Registration
- **Actor / Trigger:** Worker; opening the app / tapping "Register".
- **Preconditions:** None (phone number possessed); account may already exist for that phone.
- **Steps:** Enter phone → OTP challenge created (SMS) → verify OTP → role select (worker) → minimal profile (name, area, skills) → account `ACTIVE` → prompted for KYC (can be deferred per policy).
- **State transitions:** Account `PENDING_VERIFICATION → ACTIVE`; OTP `ISSUED → USED | EXPIRED | FAILED`.
- **Validation:** Phone format; OTP exact + not expired; attempt limits; profile minimum fields.
- **Failures:** SMS not delivered → resend cooldown/backoff; OTP wrong → attempt counter, lockout window; duplicate phone → existing account verification path; profile save fail → local draft retained.
- **Notifications:** Welcome (in-app); OTP via SMS (transactional).
- **Data changes:** `accounts` insert; `otp_challenges` lifecycle rows; `worker_profiles` insert; consent records if KYC flow entered; audit `account.registered`.

### 11.2 Employer Registration
- **Actor / Trigger:** Employer; "Register as Employer".
- **Preconditions:** Phone; role selection available.
- **Steps:** Phone → OTP → role (employer) → org profile (business name, type, address, contact) → account `ACTIVE` → (policy) KYC prompt before publishing.
- **State transitions:** Account `PENDING_VERIFICATION → ACTIVE`; org profile completeness flags → COMPLETE.
- **Validation:** OTP rules as above; org required fields; address/area present.
- **Failures:** Same OTP failure set; org save fail → draft retained.
- **Notifications:** Welcome (in-app); OTP (SMS); possibly "complete verification to publish" reminder.
- **Data changes:** `accounts`, `employer_profiles`, audit `account.registered`.

### 11.3 Job Creation
- **Actor / Trigger:** Employer; "Create Job".
- **Preconditions:** `ACTIVE` employer, org profile complete, KYC per policy.
- **Steps:** Enter details (type, category, count, date(s), time window, location, pay, requirements, welfare) → Save Draft (anytime) → Review → Publish → validation passes → `OPEN`.
- **State transitions:** `DRAFT → OPEN` (publish); `DRAFT → DRAFT` (autosave edits).
- **Validation:** count ≥ 1; dates in future; time window sane; pay specified (type + amount, integer paise); category chosen; location resolvable (city/area minimum); no banned content.
- **Failures:** Validation errors → inline field errors (no data loss); publish while suspended/KYC-blocked → clear gate message; duplicate-post detection → warning (non-blocking).
- **Notifications:** Confirmation (in-app); matching engine may pre-warm candidate suggestions (silent).
- **Data changes:** `jobs` insert/update; `job_work_days`, `job_requirements`, `job_welfare` rows; audit `job.published`.

### 11.4 Job Discovery
- **Actor / Trigger:** Worker; opening Jobs/Home or applying filters.
- **Preconditions:** `ACTIVE` worker session.
- **Steps:** Query feed (defaults: area + date-soon) → filter/sort → Job Details → eligibility shown with reasons → Apply CTA state.
- **State transitions:** None (read path); job list reflects jobs in `OPEN|HIRING`.
- **Validation:** Filter params (ranges, known categories); pagination cursor integrity.
- **Failures:** Empty results → guided relaxation hints; location denied → manual area path; slow query → timeout with retry; stale cache → invalidation on transitions.
- **Notifications:** None in-flow (future: saved-search alerts).
- **Data changes:** None (optional lightweight impression/analytics event — consent-gated).

### 11.5 Application
- **Actor / Trigger:** Worker; "Apply" on Job Details.
- **Preconditions:** Job `OPEN|HIRING` with free slots; worker eligible (profile minimum, conflict-free, KYC per policy); not already applied.
- **Steps:** Tap Apply → confirm → server transaction (eligibility + conflict + slot re-check) → `APPLIED` → employer notified.
- **State transitions:** — → `APPLIED`.
- **Validation:** Server-side eligibility, uniqueness (job, worker), no time overlap with existing `HIRED` jobs.
- **Failures:** Job just filled → `409` "job filled" with alternatives; conflict discovered → `409` with conflicting job; network fail → no partial state (transaction), clear retry; duplicate tap → idempotent (same application returned).
- **Notifications:** Employer: "New application" (in-app + push, batched per job); Worker: application receipt (in-app).
- **Data changes:** `applications` insert; job `HIRING` transition if first application (proposed); audit `application.created`.

### 11.6 Application Queue Processing
- **Actor / Trigger:** Employer; opening queue / acting on rows.
- **Preconditions:** Own job; application in a decidable state.
- **Steps:** Review candidate (profile safe-view + KYC badge) → Shortlist / Waitlist / Reject (optional note) → later Hire or bulk actions.
- **State transitions:** `APPLIED → SHORTLISTED | WAITLISTED | REJECTED`; `WAITLISTED → SHORTLISTED | HIRED | REJECTED`; `SHORTLISTED → HIRED | WAITLISTED | REJECTED`.
- **Validation:** Actor owns job; target state allowed from current state; slot availability for `HIRED`.
- **Failures:** Race (slot taken / worker conflict) → `409`, queue refresh; bulk partial failure → per-row results (some succeed, some report reason); notification failure → decisions unaffected (outbox).
- **Notifications:** Worker: shortlisted / waitlisted / rejected / hired updates (in-app + push).
- **Data changes:** `applications.status` transitions; notes rows; audit per decision.

### 11.7 Hiring
- **Actor / Trigger:** Employer; "Hire" on an application (or Quick Match accept — §11.12).
- **Preconditions:** Application eligible; free slot; worker conflict-free (and KYC per policy).
- **Steps:** Hire command → transaction: re-check slots + conflicts (row lock) → application `HIRED` → create `crew_members` → increment filled count → possibly job `FILLED` → notify.
- **State transitions:** Application → `HIRED`; Job → `HIRING`/`FILLED` as counts change; Crew member created `ACTIVE`.
- **Validation:** All precondition checks server-side inside the transaction; idempotency key to make double-taps safe.
- **Failures:** Conflict with another employer's overlapping hire → `409` (transaction rolls back fully); last-slot race → one winner, loser gets `409`; post-hire worker declines → release flow (11.8) frees the slot.
- **Notifications:** Worker: "You're hired" (in-app + push, SMS fallback optional); Employer: confirmation; Job `FILLED` → employer alert.
- **Data changes:** `applications` → `HIRED`; `crew_members` insert; `jobs.hired_count` + status; audit `hiring.hired`.

### 11.8 Crew Release / Replacement (V1 manual)
- **Actor / Trigger:** Employer; "Release worker" (or worker withdraws post-hire).
- **Preconditions:** Crew member `ACTIVE`; work not `IN_PROGRESS` (post-start releases require the attendance/payment path).
- **Steps:** Release with reason → application `CANCELLED` → crew member `RELEASED` → slot freed → notify worker → employer optionally enters Quick Match for the gap.
- **State transitions:** Application `HIRED → CANCELLED`; Crew `ACTIVE → RELEASED`; Job `FILLED → HIRING` if count drops below required.
- **Validation:** Ownership; timing rule above; worked-days obligations surfaced if any attendance exists.
- **Failures:** Worker already checked in → blocked with guidance (use correction/payment flow); notification failure → audit still recorded.
- **Notifications:** Worker: release notice with reason; Employer: shortfall banner + Quick Match shortcut.
- **Data changes:** `applications`, `crew_members`, `jobs.hired_count/status`; audit `hiring.released`.

### 11.9 Attendance (per work day)
- **Actor / Trigger:** Worker scanning (check-in/check-out); Employer displaying code, manual marking, approving.
- **Preconditions:** Crew `ACTIVE`; job work day + window active (or correction context); QR token freshly issued to employer device for this job/day.
- **Steps:** Employer opens attendance screen → server issues rotating signed token → worker scans → payload + context posted → server validates (signature, job, freshness, crew, window+grace, no duplicate, optional geofence) → `CHECKED_IN` → work → scan/out (or auto-close at window end) → `CHECKED_OUT` → employer reviews day → bulk/single Approve → `APPROVED`.
- **State transitions:** `NOT_STARTED → CHECKED_IN → CHECKED_OUT → APPROVED`; `NOT_STARTED → NO_SHOW` (cutoff sweep).
- **Validation:** As listed; corrections require reason + actor; approval only from `CHECKED_OUT`.
- **Failures:** Offline/failed scan → employer manual roster mark (source=`manual`, audited); expired token → employer screen auto-refreshes, worker rescans; wrong job's code → explicit error; double scan → idempotent; missed checkout → auto-close + employer confirm; geofence miss (if enabled) → fallback to employer override with reason.
- **Notifications:** Attendance reminders (push, pre-start, per matrix); approval → payment eligibility notice to worker (in-app); NO_SHOW → both parties informed.
- **Data changes:** `attendance_records` lifecycle (times, source, status, actors); audit entries for every mark/correct/approve; earning eligibility recomputed downstream.

### 11.10 Payment
- **Actor / Trigger:** System (eligibility), Employer (approve, record payment), Admin (hold/release oversight), Worker (view).
- **Preconditions:** Required attendance `APPROVED` (and job completion per policy); no open hold.
- **Steps:** Earning computed from job terms + approved days → `ELIGIBLE` → employer approves (single/bulk) → `APPROVED` → employer settles outside platform (V1 record model) → records payment reference (+optional evidence) → `PAID` → worker earnings updated; (future provider path fills `PROCESSING` automatically).
- **State transitions:** `PENDING → ELIGIBLE → APPROVED → (PROCESSING) → PAID`; any pre-payment state may enter `FAILED` (retry) or `ON_HOLD` (complaint) or `CANCELLED` (job cancelled before eligibility).
- **Validation:** Actor authorized; integer-paise math from single calculation service; idempotent approve/pay; reference required for manual `PAID`.
- **Failures:** Employer inaction → aging reminders + admin visibility; disputed → `ON_HOLD` via complaint; recording error → admin correction with audit (never silent overwrite); provider failure (future) → `FAILED` → retry policy.
- **Notifications:** Employer: "N earnings ready to approve"; Worker: "Payment approved" / "Payment recorded" (in-app; SMS optional per matrix); Admin: aging/hold alerts.
- **Data changes:** `earnings` status; `payment_transactions`; append-only `ledger_entries`; audit on every transition.

### 11.11 Rating
- **Actor / Trigger:** Worker and Employer; job `COMPLETED` opens the window (in-app prompt).
- **Preconditions:** Rater is a party to the completed job; not yet rated; within window.
- **Steps:** Prompt → submit score (1–5) + optional tags/comment → stored → aggregate recomputed on read → after expiry, remaining side simply never rates.
- **State transitions:** Rating opportunity `OPEN → RATED | EXPIRED` per party.
- **Validation:** Parties-only; one per (job, rater, ratee); score range; length limits on comment.
- **Failures:** One-sided silence → expiry; abusive content → complaint/moderation path; submit fail → draft retained locally.
- **Notifications:** "Please rate" nudges (in-app, once per window + one reminder); no notification of *scores* (avoid pressure/conflict).
- **Data changes:** `ratings` insert; aggregates derived; audit `rating.created`.

### 11.12 Quick Match
- **Actor / Trigger:** Employer; "Quick Hire" from job or dashboard.
- **Preconditions:** Job `OPEN|HIRING` with unfilled slots; requirement parameters supplied.
- **Steps:** Requirement → M1 filter+score → wave of offers (≈2× slots, capped) → workers notified (push/SMS + in-app) → accept = transactional hire (slots+conflicts re-checked) → crew; decline/timeout → next wave until slots filled or pool exhausted → shortfall report.
- **State transitions:** Offer `PENDING → ACCEPTED | DECLINED | EXPIRED | CANCELLED`; accepted ⇒ application created directly as `HIRED` (source=quick_match) + crew member `ACTIVE`; job may reach `FILLED`.
- **Validation:** Candidate eligibility/availability/conflict per offer; expiry timestamps server-enforced; never exceed required count.
- **Failures:** All decline → fallback = normal queue stays open + employer alert; insufficient pool → explicit shortfall UI + widen-criteria actions; accept race on last slot → `409` handled gracefully; worker conflicts discovered at accept → offer voided, next candidate.
- **Notifications:** Offer (push + SMS + in-app, time-limited); accept/decline confirmations; shortfall alert to employer.
- **Data changes:** `quickmatch_offers`; on accept: `applications` (`HIRED`), `crew_members`, `jobs.hired_count`; audit for offer lifecycle.

### 11.13 Complaint
- **Actor / Trigger:** Worker/Employer (submit); Admin (review); System (aging).
- **Preconditions:** Party to the linked entity (or admin); not spam-limited.
- **Steps:** Select type + link + narrative + evidence → submit → `OPEN` → admin assigns/reviews → may request info from parties → resolve with outcome (dismiss / warn / suspend / hide job / payment hold-release / attendance correction) → notify parties → close.
- **State transitions:** `OPEN → UNDER_REVIEW → WAITING_ON_PARTY → RESOLVED | DISMISSED` (+ admin reopen).
- **Validation:** Party authorization; evidence type/size; severity assignment; linked-entity integrity.
- **Failures:** Evidence upload fail → resumable; abandonment → auto-close with notice; unresolvable → escalated flag; retaliation risk → policy note + admin pattern visibility.
- **Notifications:** Acknowledgement on submit; status changes to both parties; outcome notification; admin queue alerts.
- **Data changes:** `complaints`, `complaint_events`, `sanctions` if any, linked holds/suspensions; audit everywhere.

### 11.14 KYC
- **Actor / Trigger:** Worker/Employer (submit/resubmit); Admin (review/decide).
- **Preconditions:** Phone-verified account; no active submission (or previous rejected).
- **Steps:** Consent → enter ID details → document/selfie upload (presigned) → `SUBMITTED` → admin queue → `UNDER_REVIEW` → view (audited) → `VERIFIED` or `REJECTED(reason)` → rejected → resubmit (attempt cap) → verified state feeds badges/gates.
- **State transitions:** `DRAFT → SUBMITTED → UNDER_REVIEW → VERIFIED | REJECTED` (→ resubmit → `SUBMITTED`).
- **Validation:** ID format per type; document type/size/clarity requirements; attempt cap; one active submission.
- **Failures:** Upload fail → resume queue; unreadable → specific rejection reason; reviewer backlog → queue alerts; ID type regulatory block (e.g., Aadhaar policy) → alternative types offered.
- **Notifications:** "Submitted" ack; decision result (in-app + push); reminder if incomplete.
- **Data changes:** `kyc_submissions`, `kyc_documents` refs, consent rows; profile badge derived; audit `kyc.submitted/decided` (with document access audit).

---

## 12. State Machines

Legend: **Actor** = who may trigger. Invalid transitions are rejected with `409` and no partial writes. All transitions are audited.

### 12.1 Job
States: `DRAFT, OPEN, HIRING, FILLED, IN_PROGRESS, COMPLETED, CLOSED, CANCELLED` (+ proposed `EXPIRED`).

| From → To | Actor | Validation | Side effects |
|---|---|---|---|
| DRAFT → OPEN | Employer | Publish validation passes; gates (org complete, KYC policy) | Visible in discovery; matching may pre-warm; audit |
| OPEN → HIRING | System | First application received (auto) or first hire | Employer queue signaled |
| OPEN/HIRING → FILLED | System | `hired_count == required_count` (set by hire transaction) | Off discovery; "fully staffed" alerts |
| HIRING → OPEN | System | (Optional normalization if all hires released) | Back to full discovery |
| FILLED → HIRING | System | A hire released (count < required) | Shortfall alert + Quick Match entry |
| OPEN/HIRING/FILLED → IN_PROGRESS | System/Employer | First check-in of the day, or employer "start" on schedule | Crew workspace active; application mutations locked to post-work flows |
| IN_PROGRESS → COMPLETED | Employer | All expected attendance resolved (`CHECKED_OUT`/`NO_SHOW` approved or explicitly resolved) | Earnings finalized to eligible; rating windows open |
| COMPLETED → CLOSED | Employer/System | All earnings terminal (`PAID`/`CANCELLED`) or grace period elapsed | Terminal; archived; rating window may still run |
| OPEN/HIRING/FILLED → CANCELLED | Employer/Admin | Not `IN_PROGRESS`; crew-handling obligations surfaced/confirmed | Non-hired applications → `EXPIRED`; hired crew → release flow required; earnings for worked days honored |
| OPEN/HIRING (past date, unfilled) → EXPIRED | System (sweep) | Date + grace passed without completion | Applications → `EXPIRED`; audit |
| DRAFT → (deleted) | Employer | Never published; no dependencies | Hard delete allowed (audit) |

Invalid examples: `COMPLETED → OPEN` (no reopen in V1 — repost instead); `CANCELLED → anything` (terminal); `IN_PROGRESS → CANCELLED` (must go through completion/correction path).

### 12.2 Application
States: `APPLIED, SHORTLISTED, WAITLISTED, HIRED, REJECTED, WITHDRAWN, CANCELLED, EXPIRED`.

| From → To | Actor | Validation | Side effects |
|---|---|---|---|
| — → APPLIED | Worker | Job open+slots; eligible; conflict-free; unique (job, worker) | Employer notified; job → HIRING |
| APPLIED → SHORTLISTED | Employer (owner) | Ownership | Worker notified |
| APPLIED → WAITLISTED | Employer | Ownership | Worker notified |
| APPLIED/WAITLISTED/SHORTLISTED → REJECTED | Employer | Ownership | Worker notified; cannot re-apply (V1 rule) |
| WAITLISTED → SHORTLISTED / SHORTLISTED → WAITLISTED | Employer | Ownership | Worker notified |
| APPLIED/SHORTLISTED/WAITLISTED → HIRED | Employer (or Quick Match accept) | Free slot + conflict-free, inside transaction; idempotency key | Crew member created; counts updated; job may FILLED; worker notified |
| APPLIED/SHORTLISTED/WAITLISTED → WITHDRAWN | Worker | Before hire | Employer queue updated |
| HIRED → WITHDRAWN | Worker | Before `IN_PROGRESS` | Triggers release side effects (crew `RELEASED`, slot freed) |
| HIRED → CANCELLED | Employer | Before `IN_PROGRESS` (release flow) | Crew `RELEASED`, slot freed, worker notified with reason |
| APPLIED/SHORTLISTED/WAITLISTED → EXPIRED | System | Job cancelled or expired sweep | Queue cleanup; worker notified of job outcome |
| REJECTED/WITHDRAWN/CANCELLED/EXPIRED | — | Terminal | — |

### 12.3 Attendance (per job, worker, day)
States: `NOT_STARTED, CHECKED_IN, CHECKED_OUT, APPROVED, NO_SHOW`.

| From → To | Actor | Validation | Side effects |
|---|---|---|---|
| — → NOT_STARTED | System | Crew member `ACTIVE` for the work day | Row created (or implicit) |
| NOT_STARTED → CHECKED_IN | Worker (scan) / Employer (manual) | Fresh signed token; crew `ACTIVE`; within window + grace; no duplicate; optional geofence | Timestamp + source recorded; audit; employer roster updates live |
| CHECKED_IN → CHECKED_OUT | Worker / Employer / System | Checkout scan, employer close, or auto-close at window end | Duration computed; day record closed |
| CHECKED_OUT → APPROVED | Employer | Review; no open dispute | Earning day counted; payment eligibility may open; worker notified |
| NOT_STARTED → NO_SHOW | System (sweep) | Cutoff + grace passed with no check-in | Crew flagged; both parties notified; excluded from earnings |
| CHECKED_IN → NOT_STARTED | Employer/Admin | Invalid/erroneous check-in correction, with reason | Full audit; rarely used |
| Any → corrected values | Employer/Admin | Reason + actor required; never silent | Audit with before/after |

Invalid: `APPROVED → CHECKED_IN` (day is final; corrections are explicit audited edits, not re-entry); worker-initiated approvals (approval is employer-only).

### 12.4 Payment / Earning
States: `PENDING, ELIGIBLE, APPROVED, PROCESSING, PAID, FAILED, ON_HOLD, CANCELLED`.

| From → To | Actor | Validation | Side effects |
|---|---|---|---|
| — → PENDING | System | Crew member exists for job | Earning shell created (amount computed later from terms) |
| PENDING → ELIGIBLE | System | Required attendance `APPROVED` (+ completion policy) | Employer notified ("ready to approve") |
| ELIGIBLE → APPROVED | Employer | Ownership; idempotency key | Locked amount; audit; worker notified |
| APPROVED → PROCESSING | System/Provider | Future provider path only (record model skips this) | Provider attempt logged |
| APPROVED/PROCESSING → PAID | Employer (manual record) / System (provider callback) | Reference/evidence required (manual); amount matches | Ledger entries finalized; worker totals updated; worker notified |
| APPROVED → FAILED | System | Provider failure (future) | Retry policy; employer/admin alerted |
| ELIGIBLE/APPROVED → ON_HOLD | System (complaint link) / Admin | Open complaint on this earning | Actions blocked until resolution |
| ON_HOLD → ELIGIBLE/APPROVED | Admin | Complaint resolved (hold released) | Resumes normal flow; parties notified |
| PENDING → CANCELLED | System | Job cancelled with no approved attendance | Terminal; audit |

Invalid: `PAID → anything` (immutable — corrections are compensating ledger entries); worker-initiated transitions of any kind.

### 12.5 Additional machine — KYC submission
`DRAFT → SUBMITTED → UNDER_REVIEW → VERIFIED | REJECTED`; `REJECTED → DRAFT (resubmit)` within attempt cap. Actors: owner (submit/resubmit), admin (review/decide), system (queue moves). Side effects: badge derivation, gates unlock, notifications, document-access audits.

### 12.6 Additional machine — Account
`PENDING_VERIFICATION → ACTIVE → SUSPENDED → ACTIVE | CLOSED`. Actors: system (verification), admin (suspend/reinstate), user (future self-close). Side effects: suspension blocks sessions immediately (refresh rejected), cancels pending participation per policy, triggers complaint-linked sanctions. Invalid: user self-reactivation.

### 12.7 Additional machine — Complaint
`OPEN → UNDER_REVIEW → WAITING_ON_PARTY → RESOLVED | DISMISSED` (+ admin `REOPEN`). Actors: submitter (open), admin (all transitions), system (aging auto-close from `WAITING_ON_PARTY` after timeout → `CLOSED`-by-timeout recorded as resolution type). Side effects: payment holds, sanctions, notifications, audit.

---

## 13. Domain Model

Conceptual only — no tables/columns are designed here. "Owner" = the module that writes it (§7 data ownership).

### 13.1 Core entities (the transaction backbone)

| Entity | Purpose | Key relationships (cardinality) | Lifecycle | Owner |
|---|---|---|---|---|
| **Account** | Login identity + role + state | 1:1 User-or-Employer profile; 1:N sessions, devices | register → active → suspended/closed | H1 |
| **Worker Profile** | Work attributes & trust surface | 1:1 account; 1:N skills, availability slots; 1:N applications | completeness-driven; badge from KYC | H2 |
| **Employer Profile** | Business identity | 1:1 account; 1:N jobs | completeness + verification gates | H2 |
| **KYC Submission** | Verification case | N:1 account; 1:N documents; consent 1:1 | submit → review → verified/rejected → resubmit | H3 |
| **Job** | The opportunity + its lifecycle | N:1 employer; 1:N work-days, requirements, welfare; 1:N applications, crew, attendance, earnings | draft → open → … → closed/cancelled | H4 |
| **Application** | Worker's request + selection state | N:1 job; N:1 worker; 1:0..1 crew membership (via hire) | applied → shortlisted/waitlisted → hired/rejected/… | H6 |
| **Quick Match Offer** | Time-boxed hiring offer | N:1 job; N:1 worker; 0..1 resulting application | pending → accepted/declined/expired/cancelled | M2 |
| **Crew Membership** | Hired workforce roster entry | 1:1 hired application; N:1 job; N:1 worker | active → completed/released/no-show | H7 |
| **Attendance Record** | One worker's one job-day | N:1 job; N:1 worker; N:1 work-day; → earning input | not-started → checked-in → checked-out → approved / no-show | H8 |
| **Earning** | Entitlement per worker per job | N:1 job; N:1 worker; 1:N payments/adjustments; 0..1 complaint link | pending → eligible → approved → paid/failed/held | H9 |
| **Payment Transaction** | A disbursement record against earning(s) | N:1 earnings (batch-capable); 1:N ledger entries | approved → processing → paid/failed | H9 |
| **Rating** | One party's score of the other for one job | N:1 job; N:1 rater; N:1 ratee; unique (job, rater, ratee) | created (immutable) | M4 |
| **Notification** | In-app inbox item | N:1 recipient; delivery attempts 1:N | unread → read; deliveries pending → sent/failed | M3 |
| **Complaint** | Dispute/safety case | N:1 submitter; links 0..1 to job/application/earning/attendance/account; 1:N events | open → review → resolved/dismissed | M6 |

### 13.2 Supporting entities
Skills & categories (taxonomy), Availability slots (worker × date × time window × area), Job work-days (multi-day schedule rows), Welfare declarations (job × taxonomy item + note), Consent records (KYC/data-processing), Notification outbox/deliveries/templates/preferences, Session & OTP challenge records, Sanctions, Audit log (append-only cross-cutting), Platform configuration (weights, taxonomies, feature flags), Location reference data (cities/areas), Match request log (optional explainability).

**Value-object-style concepts (embedded, not standalone tables unless design proves otherwise):** location on a job (city, area, address line, optional coordinates), pay terms (type + integer amount), time windows, distance bands.

### 13.3 Future entities (explicitly not designed now)
Incident/SOS report, Emergency replacement request, Insurance policy/claim, Payout/escrow transaction, Message/Conversation, Organization member/role, Shift (hourly granularity), Audit export/data-warehouse records.

### 13.4 Key modeling decisions to carry into schema design
1. **Earning is per (worker, job)**; payment transactions may settle multiple earnings later (batch) — keeps V1 simple, batch-capable.
2. **Attendance is per (worker, job, work-day)** — multi-day jobs produce multiple records; earnings aggregate approved days.
3. **Application is the source of truth for membership**: `HIRED` ⇔ crew row created in the same transaction (no drift possible).
4. **Ratings require completed jobs** — structurally prevents fabricated reputation.
5. **Everything mutable carries audit**; money and audit are append-only.
6. **Core vs. supporting split:** the eleven core entities *are* the lifecycle; supporting entities make it discoverable, explainable, and operable; future entities must attach at existing seams (job, earning, complaint, notification) without reshaping the core.

---
## 14. API Architecture

**Conventions (apply to every domain):**
- REST over HTTPS, JSON bodies, `/api/v1` prefix.
- Success envelope: `{ "data": ... , "meta": {...pagination} }`. Error envelope: `{ "error": { "code", "message", "details": [...], "requestId" } }` (§24).
- Authentication: `Authorization: Bearer <access-token>` on everything except OTP request/verify and public config.
- Pagination: cursor + limit. Sorting: whitelisted keys only.
- Mutations with side effects (apply, hire, release, check-in, approve, pay, quick-match accept): `Idempotency-Key` header; replay returns the original result.
- Validation: Zod schema per endpoint (shared contracts package) — request rejected before touching business logic.
- Rate limiting per user/IP/route class; all responses carry `requestId` for support correlation.
- Authorization: authentication guard → role guard → policy/ownership guard — every endpoint declares all three.

**API domains:**

| Domain | Responsibility | Main operations | AuthN | AuthZ (summary) | Typical request → response | Validation | Error cases |
|---|---|---|---|---|---|---|---|
| `/auth` | Sessions, OTP, tokens | `POST /otp/request`, `POST /otp/verify` (returns tokens + first-login flag), `POST /refresh`, `POST /logout`, `GET /sessions`, `DELETE /sessions/:id` | OTP challenge or refresh token | Owner of session only | `{phone}` → `{challengeId}`; `{challengeId, code}` → `{accessToken, refreshToken, account}` | Phone format; OTP attempts/cooldown | 429 rate limit, 401 invalid OTP, 409 session conflict |
| `/users` & `/me` | Own account/profile | `GET /me`, `PATCH /me`, profile sub-resources (skills, availability, photo) | Session | Self only | `{area, skills[]}` → profile | Field schemas; completeness rules | 403 cross-user, 422 fields |
| `/workers` | Worker-safe views + availability | `GET /workers/me/availability`, `PUT .../availability`, (employer) `GET /workers/:id` (safe view) | Session | Self / employer-with-job-context | `{date, slots[]}` → saved | Overlap rules on slots | 403, 404 |
| `/employers` | Org profile | `GET/PATCH /employers/me/org` | Session | Self (employer role) | Org fields → org profile | Completeness rules | 403 role |
| `/kyc` | Verification lifecycle | `POST /kyc/submissions`, `POST /kyc/submissions/:id/documents` (presign), `GET /kyc/mine`; admin: `GET /admin/kyc/queue`, `POST /admin/kyc/:id/decide` | Session | Owner / admin-kyc role | ID details → submission; `{decision, reason}` → status | ID formats; attempt cap; file rules | 409 active submission, 403, 413 file |
| `/jobs` | Job lifecycle | `POST /jobs`, `PATCH /jobs/:id`, `POST /jobs/:id/publish`, `POST /jobs/:id/cancel`, `GET /jobs/:id`, `GET /jobs` (discovery feed) | Session | Owner mutations; live jobs readable by workers; drafts owner-only | Job fields → job; filters → feed page | Publish validation; filter whitelists | 403 not owner, 409 invalid state, 422 |
| `/applications` | Worker-side applications | `POST /jobs/:id/apply`, `POST /applications/:id/withdraw`, `GET /applications/mine` | Session | Worker self; apply targets live jobs | — → application | Eligibility + conflict + slots (server) | 409 filled/conflict/duplicate |
| `/hiring` (job-scoped) | Employer queue decisions | `GET /jobs/:id/applications`, `POST /applications/:id/decision` `{action: shortlist\|waitlist\|reject\|hire\|release, note?}`, bulk endpoint | Session | Job owner; per-row re-check in bulk | `{action}` → application | State machine + slot/conflict checks | 409 race/state, 403, 422 bulk partial results |
| `/crew` | Roster views | `GET /jobs/:id/crew`, `GET /crew/mine` | Session | Job owner / own membership | — → roster | — | 403 |
| `/attendance` | Check-in/out + approval | `POST /jobs/:id/attendance/tokens` (employer display), `POST /attendance/check` (worker scan/manual), `POST /attendance/:id/approve` (bulk ok), `POST /attendance/:id/correct`, `GET /jobs/:id/attendance` | Session | Token issuer = job owner; scan = crew member; approve/correct = owner/admin | `{payload, coords?}` → attendance record | Signature/freshness/window/crew/dup; reason on corrections | 401 token invalid/expired, 409 duplicate, 403, 422 |
| `/payments` | Earnings + approvals | `GET /jobs/:id/earnings`, `GET /earnings/mine`, `POST /earnings/:id/approve`, `POST /earnings/:id/mark-paid` `{reference}`, bulk approve, `POST /earnings/:id/adjust` | Session | Employer owner / worker own / admin | `{reference, amount?}` → earning | Idempotency; integer amounts; state guards | 409 state, 403, 422 amount mismatch |
| `/matching` | Ranked candidates | `POST /jobs/:id/match` `{filters?, limit?}` | Session | Job owner only | Job id → ranked candidates + scores + reasons | Limit caps; filter whitelists | 403, 429 compute limit |
| `/quick-match` | Offer workflow | `POST /jobs/:id/quick-match` `{requirement}`, `GET /jobs/:id/offers`, `POST /offers/:id/accept\|decline`, `POST /offers/:id/cancel` (employer), `GET /offers/mine` (worker) | Session | Employer: own job; worker: own offer | Requirement → offers created | Wave caps; expiry server-side; eligibility per candidate | 409 slot/conflict on accept, 429, 403 |
| `/notifications` | Inbox + prefs | `GET /notifications`, `POST /notifications/:id/read`, `GET/PATCH /me/notification-prefs`, `POST /me/push-token` | Session | Self only | — → inbox page / prefs | — | 403 |
| `/ratings` | Ratings | `POST /jobs/:id/ratings` `{score, tags?, comment?}`, `GET /jobs/:id/ratings` (parties/aggregate views) | Session | Job parties only; once | Rating → record | Range/length/uniqueness | 409 already rated, 403 not party |
| `/welfare` | Welfare declarations | Embedded: `PUT /jobs/:id/welfare` (owner, mostly via job save); `GET /welfare/taxonomy` | Session | Owner / public taxonomy | Taxonomy selections → saved | Taxonomy ids only | 403, 422 |
| `/complaints` | Issue lifecycle | `POST /complaints`, `GET /complaints/mine`, `POST /complaints/:id/events` (party reply), admin: `GET /admin/complaints`, `POST /admin/complaints/:id/resolve` | Session | Party / admin | Type + link + narrative → complaint | Party authorization; evidence rules | 403 not party, 429 spam |
| `/admin/*` | Platform operations | User search/suspend/reinstate, KYC queue/decide, job hide/restore, complaint resolve, config get/patch, dashboards | Session (admin role) | Granular admin permissions (§15) | Admin commands → records | Per-action schemas | 403 permission, 404, 409 |
| `/config` (public) | Client bootstrap | `GET /config` (categories, welfare taxonomy, distance bands, app min-version) | None | Public, read-only | — → config | — | — |

Notes: no GraphQL in V1 (adds caching/authorization complexity with no third-party consumer need; REST fits the mobile clients and admin web equally). Webhooks/callbacks only appear if a payment or KYC provider is later approved. OpenAPI spec generated from the code at implementation time and diffed in CI (§27 contract testing).

---

## 15. Authentication & Authorization

**Authentication (mechanism PROPOSED, provider open):**
- Phone + OTP primary (matches the market: workers are phone-first; email penetration low). Flow: request OTP (cooldown) → verify → issue tokens. Passwords are not part of V1 (removes breach/reset/reset-phishing surfaces entirely).
- **Token model:** short-lived access token (~15 min, JWT or opaque — implementation detail) + long-lived refresh token (~30 days) that **rotates on every refresh**; refresh tokens stored server-side as families; presentation of an already-rotated token ⇒ whole family revoked (theft detection). Sessions listable/revocable by the user ("Sign out this device").
- Admin authentication: CONFIRMED (owner, 2026-09-25) — same phone-OTP baseline as users, with the admin role granted server-side on the separate admin app (no separate password/2FA system in V1).
- Account suspension (from complaints/moderation) invalidates all sessions immediately at refresh time.

**Authorization model — RBAC + resource policies, deny by default:**

| Capability | Worker | Employer | Admin |
|---|---|---|---|
| Manage own profile / availability / prefs | ✓ (self) | ✓ (self) | — |
| Browse/discover live jobs | ✓ | — (unless dual-role later) | ✓ (read) |
| Apply / withdraw own applications | ✓ | — | — |
| Create/edit/publish/cancel own jobs | — | ✓ (own only) | hide/restore any (moderation) |
| View application queue, decide (shortlist/hire/…) | — | ✓ (own jobs) | read-only oversight |
| Manage crew, release hires | — | ✓ (own jobs) | override + audit |
| Issue attendance tokens, approve/correct attendance | — | ✓ (own jobs) | override + audit |
| Approve/mark payments | — | ✓ (own jobs) | oversight, hold/release, corrections |
| Rate counterparty (completed job) | ✓ | ✓ | — |
| Submit complaints | ✓ | ✓ | create on behalf (case work) |
| Submit/track KYC | ✓ (self) | ✓ (self) | decide (kyc:decide permission) |
| Verify KYC, moderate users/jobs, resolve complaints | — | — | ✓ (granular permissions) |
| Platform config, dashboards, audit views | — | — | ✓ (config:manage, audit:read) |

Additional permissions beyond the brief: worker withdraw-after-hire; employer release-hire and cancel-job; admin sanction (suspend/hide), payment hold/release, attendance correction; session self-revocation; push-token management.

**Enforcement:** server-side guards compose as authentication → role → policy (e.g., `ownsJob(jobId, actor)`); policies are functions per resource type, unit-tested directly (§27); UI hiding is UX only; bulk endpoints authorize every row; admin permissions are a table (not a hardcoded if-chain) so L4 config can grow into it.

---

## 16. Matching Architecture

**Pipeline:** Job requirement → **hard filter** (never scored around) → **weighted scoring** → deterministic rank → explainable result (+ fallback ladder if thin).

**Hard filters (candidate must pass all):** account `ACTIVE`; available for every work-day/time-window (explicit availability slot covering the window); area/distance within the *search* band; no time conflict with existing `HIRED` commitments; meets job's required skills/experience minimums; KYC verified *if* the job's policy requires it (config); not already `HIRED` on this job.

**Scoring signals (PROPOSED weights, config-owned, sum = 100):**

| Signal | Weight | Basis |
|---|---:|---|
| Skill/category fit | 30 | Required-vs-held skills overlap (+ experience years in category, capped) |
| Proximity | 25 | Distance band steps from job coords/area (band-based, not raw meters) |
| Availability exactness | 20 | Exact window coverage vs. bare coverage |
| Rating | 15 | Normalized average with shrinkage toward neutral until count ≥ threshold |
| Reliability | 10 | Attendance rate (approved/assigned) + application response behavior |

- **Determinism:** same inputs ⇒ same output. Documented tie-breakers: score → proximity → rating (shrunk) → completed-jobs count → oldest account id. No randomness.
- **Explainability:** response carries component scores + top 3 reason codes (e.g., `SKILL_MATCH_ALL`, `WITHIN_5KM`, `RATED_4.6_40JOBS`). Reasons render directly in the employer UI.
- **Fallback ladder (explicit, marked in response):** (1) widen distance band one step → (2) drop rating floor → (3) relax to availability-overlap (adjacent windows) → (4) return empty with actionable suggestions ("add skills filter tolerance", "increase rate", "expand area").
- **Cold start:** workers with no history get documented neutral defaults (reliability = configured prior, rating = unscored) — never null/NaN; employers see "new worker" transparency.
- **Data requirements:** populated skills/availability/location (H2), attendance history (H8), ratings (M4), job conflict state (H6). Matching *degrades gracefully* on sparse data by design — the ladder handles it.
- **Evaluation:** golden test set (hand-ranked candidate scenarios) locked in CI; later, offline metrics (accepted-offer rate, hired-per-match) inform weight changes — changes are config edits with audit, not code rewrites.
- **Rejected for V1:** ML/learned rankers, embeddings, response-time prediction — none are explainable/testable/cheap enough for V1 per the brief's criteria. The interface is designed so a smarter ranker can replace the scorer later behind the same contract.

---

## 17. Quick Match Architecture

```
Employer requirement (category, count, date/time, area, rate, offer window)
        ↓  M1 hard filter + score (same engine — this is the reuse point)
Ranked eligible & available & conflict-free candidates
        ↓  wave selection: ~2 × remaining slots, capped (e.g. 10)
OFFERS SENT (push + SMS + in-app, server-enforced expiry, default proposal 30 min)
        ↓                                  ↓
 ACCEPT (transactional hire:            DECLINE / EXPIRED
  re-check slots + conflicts)                ↓
        ↓                              next wave until filled
HIRED application (source=quick_match)       ↓
        ↓                              pool exhausted → SHORTFALL REPORT
 CREW member created                          ↓
 (job may → FILLED)               prompts: widen area / lower floor /
                                   broadcast non-binding interest alert
```

Rules (owner-adjustable values marked):
- **Availability:** explicit worker availability slots for the date/window are mandatory; the worker's "open to work" toggle influences ranking but is not a hard requirement.
- **Contact:** in-app offer (always) + push (if token) + SMS (critical fallback for time-sensitive offers). Workers see full job details before responding.
- **Acceptance:** server transaction re-checks slots, conflicts, eligibility at accept time — a stale offer fails gracefully with `409` and an explanation; first acceptance wins any race; a worker may hold multiple concurrent offers (simplest correct rule; alternatively one-at-a-time — owner choice).
- **Rejection/timeout:** decline or expiry marks the offer terminal and triggers the next wave automatically; employer can cancel pending offers.
- **Duplicate hiring prevention:** the same transactional slot+conflict check as §11.7 — Quick Match *is* the hire command, not a parallel path; unique (job, worker) application constraint is the backstop; double-booking across jobs uses the row-locked conflict query (§8 concurrency note).
- **How many workers:** never more than remaining required count; shortfall always explicit.
- **Insufficient workers:** shortfall report + widening prompts + optional broad "interest" notification to the category/area (non-binding, rate-limited) — the job's normal application queue remains open throughout.

---

## 18. Location Architecture

**V1 needs basic location, not a maps platform.**

| Capability | V1 | How |
|---|---|---|
| City / area / address on jobs & profiles | ✓ | Structured fields + area reference data (Coimbatore/Tiruppur areas seeded, model not city-locked) |
| Optional coordinates (pin) | ✓ optional | Employer can pin or leave unset; worker location = home area (+optional coords) |
| Distance filtering/sorting | ✓ when coords exist | Haversine computed **server-side at query time** from stored coords — no external API calls in the feed path |
| Distance bands | ✓ | e.g. 0–5 / 5–15 / 15–30 / 30+ km — stored in config, used by filters + matching |
| Interactive in-app maps, routes, navigation | ✗ deferred | Address rows deep-link to the device's native maps app (`Linking`) — zero SDK dependency |
| Geocoding (area → coords) | optional | Adapter behind interface; without it, coordinates remain optional and city/area filters carry discovery |
| Geofence for attendance | owner decision | If enabled: simple radius check against job coords on scan (§19); requires coords present — manual override otherwise |

**Privacy posture:** worker coordinates are coarse (area-level) by default; precise device location is not tracked in V1 (no background location); location permission requested only when a feature needs it, with the manual-area path always available.

**Why not maps-first:** making a map provider foundational would put a paid external dependency in the core feed path. Discovery, distance sorting, and matching all run on stored fields — a map SDK later becomes a *view* over data we already have, not a dependency we must design around.

---

## 19. Attendance Architecture

**Production concept (QR-style, made real):**

1. **Who generates:** The **server**. Employer opens the job's attendance screen → server issues a signed token: `{jobId, workDate, mode: check_in|check_out, nonce, issuedAt, expiry (~30–60s), HMAC/signature}` rendered as a QR that **rotates automatically** on the employer device.
2. **Who scans:** The **worker** (camera scan) submits `{payload, deviceTime, coords?}` with their session.
3. **Job identity:** embedded in the signed token — a token from another job/time/mode fails signature or scope validation.
4. **Worker identity:** the authenticated session; the payload carries no worker identity (avoids shared-screenshot scans).
5. **Time validation:** server clock + token freshness are authoritative; device time is logged but never trusted; window + grace enforced against job schedule.
6. **Location validation (optional, owner decision):** if geofence enabled and job has coords → radius check; failure does not hard-block — it flags for employer override with reason (venues' coordinates are imperfect; hard-blocking would break legitimate check-ins).
7. **Duplicate prevention:** unique (job, worker, work-day) + state guard: check-in only from `NOT_STARTED`, check-out only from `CHECKED_IN` — repeats are idempotent no-ops, not errors.
8. **Check-out:** same rotating-token mechanism in `check_out` mode, or employer closes the worker's day; auto-close at window end + grace with employer confirmation.
9. **Fraud prevention:** rotating short-lived signed codes (screenshot sharing dies in ≤60s), one-active-check-in enforcement, scan endpoint rate limits, employer must be a party to the job to display codes, full audit of manual marks/corrections, anomaly flags (e.g., many check-ins in seconds) surfaced to admin — plus the honest fallback below.
10. **Offline behavior:** scans fail fast when offline (a signed token cannot be minted/validated offline — by design). **Fallback:** employer marks the roster manually (`source=manual`, reason, audit) so the day is never unrecordable. No offline queue for scans.
11. **Attendance correction:** employer/admin edits times or status with mandatory reason + actor; every change audited before/after; workers may *request* correction via complaint.
12. **Employer approval:** day review → single/bulk `APPROVED` — the gate that makes earnings eligible. Approval is employer-only (admin override exists, audited).

**Multi-day jobs:** one record per (worker, work-day). **NO_SHOW:** system sweep at cutoff + grace. **Employer's own presence** is not tracked in V1 (flagged scope note).

**Alternative considered:** static daily QR (printed) — rejected as trivially shareable; employer-taps-roster-only (no QR) — retained as the *fallback*, not the primary, since scanning is the product's stated UX.

---

## 20. Payment Architecture

Four separations (the brief's requirement), then the flow:

1. **Earnings calculation** (pure logic): amount from job terms — daily: rate × approved days; fixed: job amount upon completion+approval — plus adjustments (bonus/deduction, each with reason + actor). Integer paise, single calculation service, golden tests.
2. **Payment processing:** *how money moves.* V1 proposal = **record-only**: the employer pays the worker outside the platform (cash/UTR/bank transfer), then records the payment with a reference (+ optional evidence). `PROCESSING` exists in the state model but is only entered by a future provider integration. **Settlement model (record-only vs. escrow/payout) = REQUIRES OWNER DECISION** — it determines licensing/compliance scope.
3. **Payment confirmation:** `PAID` requires reference (manual) or provider callback (future); worker's earnings total updates; ledger entry appended; both parties notified.
4. **Payment history:** append-only `ledger_entries` (amount, type, actors, timestamps) + earning/payment records → statements for workers, oversight for admin. Corrections = compensating entries, never overwrites.

**Flow:** attendance `APPROVED` → earning `ELIGIBLE` → employer approves (`APPROVED`) → settles externally → records (`PAID`). **Who owes whom:** employer owes worker; platform = system of record (V1) — never a custodian until a settlement model says otherwise.

**Failure:** approval inaction → aging reminders + admin visibility; disputed → complaint opens `ON_HOLD` (actions blocked) → admin releases; recording mismatch → admin correction with audit; provider failure (future) → `FAILED` → retry policy → manual path.

**Refunds/disputes:** modeled as complaint-linked holds + compensating ledger entries in V1; a full disputes subsystem is future work. **No bank/card data is stored in V1** (record-only has no need for it) — if payouts arrive, capture happens tokenized at the provider.

**Open:** platform fee/commission (business model), tax handling if the platform ever disburses (TDS), payout KYC tiers.

---

## 21. KYC Architecture

**Submission:** consent screen (what/why/retention — DPDP-aligned consent record) → ID details (type selectable) → document + selfie capture → presigned private upload → `SUBMITTED`. Required-info proposal: photo/selfie, one government ID, address basics; **employer adds business-registration proof** (exact document set = owner decision). Bank details excluded from V1 unless the payout model requires them.

**Verification states:** `DRAFT → SUBMITTED → UNDER_REVIEW → VERIFIED | REJECTED(reason)` with resubmission (attempt cap proposed: 3). Status derives from the latest submission; badges consumed by profile/job views and gating policies.

**Admin review:** queue ordered by age/severity; reviewer opens documents via time-boxed presigned URLs (every open audited); decide with reason codes (feeds resubmission UX); second-reviewer step reserved for high-risk cases later.

**Document handling:** private encrypted bucket; client-side type/size validation + server re-validation; content-type sniffing; optional AV scan at upload; object keys never expose ID numbers; thumbnails generated server-side for the queue.

**Data security & access control:** KYC data lives in **separate tables/objects from the general profile** (the brief's requirement) — profile views expose only *status*, never ID numbers or documents; document access permission = `kyc:decide` (admin only) + owner's own files; all access audited; retention policy defined before launch (open question); ID numbers masked in all UIs.

**Provider future-proofing:** manual review *is* the V1 "provider"; an automated eKYC vendor later slots behind a `KycProvider` interface without changing the workflow or states. **Regulatory flag:** Aadhaar storage/use carries UIDAI restrictions — V1 proposes accepting PAN/Voter ID/driving licence (and masked Aadhaar only via a compliant provider) — REQUIRES OWNER DECISION with legal input.

---

## 22. Notification Architecture

**Model:** business transaction commits **with** a row in `notification_outbox` (same DB transaction) → dispatcher (async, retries with backoff, dedupe by event id) → per-event routing rules → channels → delivery logs. In-app inbox rows are created regardless of channel outcome; **delivery failure never rolls back or blocks a business action.**

**Event → channel matrix (PROPOSED; ✓ = sent, — = not sent):**

| Event | In-app | Push | SMS | Email |
|---|---|---|---|---|
| OTP (login/verify) | — | — | ✓ (transactional) | — |
| Application submitted (worker receipt) | ✓ | — | — | — |
| New application received (employer) | ✓ | ✓ (batched per job) | — | — |
| Application shortlisted / waitlisted / rejected | ✓ | ✓ | — | — |
| Worker hired (or quick-match offer) | ✓ | ✓ | ✓ (critical: time-sensitive) | — |
| Quick-match offer (time-boxed) | ✓ | ✓ | ✓ | — |
| Job fully staffed / shortfall alert | ✓ | ✓ | — | — |
| Job cancelled (affected parties) | ✓ | ✓ | — | — |
| Attendance reminder (pre-start, crew) | ✓ | ✓ | — | — |
| Attendance approved / NO_SHOW | ✓ | — | — | — |
| Earnings ready to approve (employer) | ✓ | ✓ | — | — |
| Payment approved / recorded (worker) | ✓ | ✓ | ✓ (money matters — optional) | — |
| Rating request (after completion) | ✓ | ✓ | — | — |
| KYC submitted / decision | ✓ | ✓ | — | — |
| Complaint acknowledged / status / outcome | ✓ | ✓ | — | — |
| Account suspended / reinstated | ✓ | ✓ | ✓ | — |
| Admin queue alerts (KYC backlog, holds aging) | ✓ (admin in-app) | ✓ (admin push) | — | — |

**Rules:** OTP SMS is highest priority and unmuteable; users may mute non-critical **push** only (in-app always kept); SMS reserved for OTP + genuinely time-critical/money events (SMS cost + India DLT template rules are a real constraint — Open Question for the SMS vendor); no marketing/campaign messages in V1; templates are keyed, versioned, and escape user content (no HTML/SMI injection, no PII beyond minimum — name + job title, never phone numbers of other users).

**Failure handling:** provider down → retry queue → depth alert → critical events degrade to in-app (visible on next open); invalid push tokens pruned on repeated failure; unregistered devices simply get in-app.

---
## 23. Security Architecture

Treated as a build-in requirement, not a later pass. Area → V1 requirement → measure:

- **Authentication:** Phone OTP (no passwords to steal/reset); OTP rate limits per phone + per IP; OTP attempts capped with cooldown/lockout; challenges single-use + expiring. *Why it matters:* OTP systems die to brute force and SMS pumping — throttling and provider-side caps are day-one config.
- **Authorization:** Deny-by-default guards (auth → role → ownership/policy); policy functions unit-tested; bulk endpoints authorize per row; admin permissions granular and table-driven; no endpoint trusts client-supplied identity/role/ownership fields.
- **Credential security:** No stored passwords in V1. If passwords arrive later: argon2/bcrypt, complexity policy, breach checks — recorded as a new ADR.
- **Token/session security:** Short access TTL; refresh rotation + family revocation on reuse; secure storage only (Keychain/Keystore); sessions listable/revocable; logout revokes server-side; admin sessions can be force-revoked by admin action.
- **API validation:** Zod at the edge on every endpoint; parameterized queries via ORM (no string-built SQL); output encoding; strict content-type handling; pagination/filter whitelists (no mass-assignment — DTOs define accepted fields explicitly).
- **Rate limiting:** Tiered — OTP endpoints (tightest), auth attempts, expensive compute (matching/quick-match), mutations per user, uploads; response `429` + `Retry-After`; per-IP + per-account dimensions.
- **File upload security:** Allow-list MIME + extension + size caps; server-side content sniffing; private bucket (no public read); presigned URLs short-lived; no executable content; optional AV scan; upload quotas per account.
- **KYC document protection:** Separate storage namespace; encryption at rest (bucket default + policy); access = `kyc:decide` + owner; every access audited; ID numbers masked in responses/logs; retention/deletion policy (open) enforced eventually by a job — never manual.
- **Payment data:** V1 stores no bank/card credentials at all (record-only model); amounts integer paise; ledger append-only; references validated; adjustments reason-gated.
- **Sensitive data exposure:** TLS everywhere; no secrets in the app bundle (server-held only); no PII in logs (log IDs, not phones/names); API responses field-projected per audience; screenshots of KYC/QR minimized by screen design (best-effort; RN cannot fully prevent).
- **Logging:** Structured JSON with levels, `requestId` propagation, automatic redaction of known sensitive keys; log volume/alerts per environment.
- **Audit trail:** Append-only `audit_log` — actor, role, action, entity, before/after diff, IP/device, timestamp. Covered events listed in §26. Separate from application logs, different retention, admin `audit:read` permission.
- **Abuse prevention:** Report/complaint entry points everywhere (M6); account/job suspension central in H1; content length limits; duplicate-job warnings; SMS/offer send throttles; anomaly flags (scan bursts, offer spam) surfaced to admin.
- **Role isolation:** Admin surface separate (app + permission namespace); admin actions always audited; no client can self-elevate; optional IP allow-listing for admin (config, cheap win).
- **Supply chain & process:** Lockfiles + pinned versions; dependency audit in CI; secret scanning in CI; code review on every merge; OWASP API Top-10 checklist + OWASP MASVS-style mobile checklist before release; secrets rotated on leak; separate credentials per environment.
- **Mobile-specific:** No sensitive logic enforced client-side (all gates server-side); root/jailbreak detection optional/deferred; cert pinning deferred (Expo OTA-update reality makes it complex — revisit at hardening phase); deep-link validation against role.

---

## 24. Error Handling

**One error contract everywhere:**

```json
{ "error": { "code": "JOB_ALREADY_FILLED", "message": "This job is already fully staffed.",
             "details": [{ "field": "slot", "issue": "no_slots_left" }], "requestId": "req_..." } }
```

**HTTP mapping:** `400/422` validation (field-level `details`) · `401` unauthenticated/expired · `403` authenticated-but-not-permitted · `404` not found (or hidden-by-policy) · `409` conflict/state-machine/duplicate (`409` over `400` when *state* is the problem: filled job, double apply, invalid transition, lost race) · `413` upload too large · `429` rate limited · `500` unexpected (message is generic; stack goes to logs; `requestId` returned) · `503` dependency unavailable (SMS/provider outage — retryable).

**Client taxonomy** (`AppError.kind`) drives UX:
- **User error** (validation, wrong OTP, not permitted, already applied): inline field messages or specific banners — never a generic "something went wrong" when the cause is known; `code`-keyed localized strings.
- **System error** (500/bug): friendly message + `requestId` shown for support + retry affordance + crash-report hook. Never a white screen (global error boundary with recovery path).
- **Temporary infrastructure failure** (network timeout, 503, 429): automatic backoff-retry for safe/idempotent requests; queued-retry UI for drafts/uploads; "check connection" states; `429` honors `Retry-After`.

**Retry policy:** GETs — retry with exponential backoff + jitter. Mutations — only with an `Idempotency-Key`, or after re-reading state; never blind-retry a hire/apply/check-in (the `409` path explains what changed: "job just filled" with alternatives).

**Server handling:** global exception filter → error envelope (no stack traces to clients); domain errors are typed (`ConflictError`, `PolicyError`…) mapped centrally; unknown errors → `500` + `requestId` + alert. **Duplicate actions** are designed for: idempotency keys + state guards make double-taps, replays, and network retries safe by construction.

---

## 25. Offline / Network Strategy

Assume flaky 2G/3G on low-end Android — but build only the offline behavior with real business value.

| Operations | Requirement | Behavior |
|---|---|---|
| Login/OTP, apply, hire/decisions, payment approve/record, quick-match accept, KYC submit, push registration | **Online-only** | Fail fast with a clear, specific message; no partial state (server transactions); automatic safe retry for idempotent reads |
| QR check-in/out | **Online-only by design** | Signed fresh tokens can't mint/validate offline — deliberate. Fallback = employer manual roster mark (always works, audited) |
| Job feed, job details, profile, earnings history, notification inbox, config | **Cache + refresh** | Cached reads render instantly (stale-while-revalidate), pull-to-refresh, TTL by data volatility (feed short, taxonomy long) |
| Job creation form, complaint narrative, availability edits | **Local drafts** | Persisted locally until submit succeeds — survives app kill and connection loss (highest-value offline feature for employers on venue Wi-Fi) |
| KYC/photo/evidence uploads | **Resumable queue** | Queued with progress; retry on reconnect; visible pending state; never silently lost |
| Optimistic UI | **Minimal** | Allowed only for low-risk toggles (mute, bookmark). Never for apply/hire/attendance/payment — state truth comes from the server |

**Explicitly not building in V1:** offline apply queueing, background sync engine, conflict-merge logic, offline maps. Every screen ships loading/error/empty/retry states as a first-class part of its design (enforced in review, tested in §27).

---

## 26. Observability & Audit

**Two distinct systems, kept separate:**

**A. Application/operational logs** (how is the system behaving?):
- Server: structured JSON per request — method, path, status, latency, `requestId`, userId (IDs only, no PII), module tag; error logs with stack; slow-query log.
- Metrics: request rate/latency (p95), error rate by endpoint, OTP send/verify failure rate, outbox depth + dispatcher lag, scheduler sweep results, match compute latency, DB connections.
- Health: liveness/readiness endpoint; alerts on error-rate spikes, outbox backlog, sweep failure, DB saturation.
- Mobile: console logs in dev; crash/error reports to a provider (UNKNOWN vendor — could be self-hosted/Sentry-class) with consent posture defined before enabling.

**B. Business audit records** (what happened to the business?) — append-only `audit_log`:
`{actor_id, actor_role, action, entity_type, entity_id, before, after, ip, device, request_id, created_at}`

Mandatory audit coverage: login/logout/refresh-reuse-detected · account suspend/reinstate · profile role-critical changes · KYC submit/view/decide · job create/publish/edit/cancel/hide · application created/transitioned · quick-match offer lifecycle · hire/release · crew changes · attendance mark/correct/approve/no-show · earning transitions (every one) · payment approve/record/adjust · ratings created · complaint open/resolve/sanitize · admin config changes · permission changes.

**Retention (proposals, owner-confirmable):** audit ≥ 2 years (money + trust decisions justify longer — org policy call); operational logs 30–90 days; audit table has no UPDATE/DELETE path for the app role. Quarterly restore rehearsal for DB backups before launch.

---

## 27. Testing Strategy

**Layers:**

1. **Unit tests — business logic first.** State machines (table-driven: every valid transition *and* every invalid one asserted to fail), earning calculations (golden cases: daily/fixed/multi-day/adjustments/no-show), matching scorer (golden ranked scenarios + determinism assertion: same input twice ⇒ identical output), offer expiry/wave logic, eligibility/conflict rules, permission policies (each policy function tested as a plain function). Target: ≥80% coverage on domain/business layers (state machines, payments, matching ≥90% — these are the correctness-critical cores).
2. **Integration tests — API + real database.** Migrations up on a per-run test DB; endpoint happy paths; validation rejections; auth guard matrix (each endpoint × wrong-role × unauthenticated ⇒ 401/403); idempotency-key replays; **race tests**: two concurrent hires racing the last slot, same worker hired by two employers for overlapping times (one wins, one gets `409`, zero partial rows); outbox rows written atomically with their business change.
3. **Contract tests.** Shared Zod schemas validate client payloads and server responses on both sides; OpenAPI spec generated from code and diffed in CI — breaking drift fails the build.
4. **End-to-end — the mandated journey.** *API-level journey test* (CI on every merge): register worker → OTP → profile → KYC submit → admin verify → employer creates job → publish → discovery → apply → queue → hire → crew → check-in/out → approve attendance → earning eligible → approve → mark paid → job complete → rating recorded. This single test proves the lifecycle backbone. *Device E2E* (Maestro, Android emulator/real device, per-merge to main): login, browse+filter, apply, employer hire, QR check-in flow. *Admin web E2E* (Playwright): KYC review with document open, complaint resolve, user suspend.
5. **Mobile testing.** Component tests (React Native Testing Library) for complex components (QR view, queue rows, forms); manual device pass per release on a **low-end Android** (primary market) + one iOS device if in scope; permission-denied paths explicitly exercised (camera/location/notification denials).
6. **Role/permission testing.** Automated matrix: enumerated route table × roles; expected status asserted — a permission regression fails CI, not a review.
7. **State-transition testing.** Every state machine exercised via its public API: legal paths succeed; illegal paths (`COMPLETED → OPEN`, worker approving own attendance, `PAID →` anything) return `409` with zero side effects (assert DB unchanged).
8. **Light non-functional.** Seed dataset load test on feed + apply before launch (baseline p95 recorded); security pass = OWASP API Top-10 checklist + upload-abuse cases + rate-limit verification.

**Enforcement:** CI runs unit + integration + contract + journey on every merge; device E2E on main; coverage gates on business layers. A module is not "done" until its state-machine and permission tests exist (this is also the definition behind `client-progress.md` completion claims).

---

## 28. Development Environment

| Tier | Item | Notes |
|---|---|---|
| **Required** | Node.js LTS + pnpm | One runtime for mobile/backend/admin/contracts |
| | Git + GitHub (or equivalent remote) | PR-based flow; CI runs §27 suites |
| | VS Code (or equivalent) + ESLint/Prettier | Shared lint config across packages |
| | MySQL 8.0 | Local instance; Docker strongly preferred (below) |
| | Expo tooling (CLI + project config) | Managed workflow; dev client for camera/notifications |
| | Android tooling: Android Studio SDK + emulator **or** physical Android via Expo Go | Windows host supports this fully |
| | Backend runtime (Node, if NestJS approved) | Runs API locally with `.env` config |
| **Recommended** | Docker Desktop | Containerized MySQL per environment — kills "works on my machine" DB drift; WSL2 backend on Windows |
| | Real low-end Android device from day one | The target market's device — not an afterthought |
| | `.env.example` discipline + config validation at boot | Fail fast on missing config |
| | Shared `contracts` package wired into mobile+backend | One source of truth for payloads |
| **Optional** | macOS/iOS simulator | **Not available on this Windows host.** iOS builds later via EAS cloud — V1 targets Android first (market reality), iOS when scope approves |
| | Maestro (device E2E), Playwright (admin E2E) | Added when the corresponding layer is built |
| | Crash-report/APM provider | Pick before beta; keep behind an adapter |
| | Load-testing tooling | Pre-launch baseline only |

No dependencies or installs happen until implementation is approved.

---

## 29. Dependency Strategy

**Evaluation checklist (every non-trivial dependency):** What problem? Maintenance activity + license? Expo/RN/React compatibility (and does it need native modules — i.e., break Expo Go)? Bundle/runtime cost? Alternatives? Can we live without it? Recorded in an ADR or the dependency register.

**Mobile — proposed core set (small on purpose):**

| Dependency | Why | Alternative / note |
|---|---|---|
| expo-router | File-based routing, deep links, route groups match §10 | React Navigation directly — more wiring for same result |
| @tanstack/react-query | Server-state cache/refetch/invalidation — removes hand-rolled loading logic | Redux-Saga/RTK Query — heavier paradigm shift |
| zustand | Tiny store for session/UI state | Redux (more boilerplate), Context alone (re-render storms) |
| react-hook-form + zod | Performant forms + schema validation shared with API | Formik (less maintained), custom (reinvented wheel) |
| dayjs (+ utc/timezone plugins) | Date/time handling, IST display | date-fns (fine), moment (legacy) |
| expo-secure-store | Token storage in Keychain/Keystore | AsyncStorage — **not acceptable for tokens** |
| expo-notifications | Push token + receipt handling | Vendor SDKs directly — avoid per-vendor lock-in |
| expo-location | Permission + coordinate acquisition | — |
| expo-camera | QR scanning (barcode support in current SDKs) | Legacy barcode-scanner package — verify current SDK status at implementation |
| expo-image-picker / expo-document-picker | KYC + photo evidence uploads | — |
| HTTP: built-in `fetch` + thin wrapper | Zero extra dependency; wrapper owns auth header, refresh queue, error normalization | axios — conveniences, but the wrapper needs exist anyway |
| Maps | **None** — deep-link via `Linking` | Map SDK deferred (§18) |
| i18n | Lightweight string table module (or i18next if formatting needs grow) | Hardcoded strings — rejected from day one (§31 extensibility) |

**Backend — proposed:** `@nestjs/*` core (if approved) · Prisma + MySQL adapter · Zod (shared contracts) · pino (structured logs) · helmet/CORS/rate-limiter middleware · @nestjs/schedule (sweeps) · Jest + Supertest. Deliberately **absent in V1:** Redis, Kafka/RabbitMQ, Redis-backed queues (outbox table suffices until metrics say otherwise), feature-flag SaaS, API-gateway layers.

**Rule:** dependencies are *chosen*, never *inherited from habit*. Each entry above is PROPOSED — final list is confirmed during implementation planning, and additions require a recorded rationale.

---

## 30. Environment Management

**Environments:** `local` (developer machine) · `staging` (shared test/pre-prod: mirrors prod config with test credentials) · `production`. Never share DB instances, buckets, or third-party keys across them.

| Concern | Approach |
|---|---|
| Server config/secrets | `.env` files, gitignored, with committed `.env.example` documenting every key; loaded and **validated at boot** (missing key ⇒ refuse to start, with the key's name in the error) |
| Secrets in production | Host secret manager / platform secrets feature — never in repo, never in images, never in logs. (Specific manager = open question when hosting is chosen) |
| Third-party keys (SMS, push, storage, geocode) | One set per environment; **SMS sender IDs and templates are registered per-environment** (India DLT reality — staging cannot use the production sender ID) |
| Mobile app config | Expo config per build profile: `dev` → local API, `preview` → staging API, `production` → prod API. Only `EXPO_PUBLIC_*` (deliberately public) values in the bundle — **the app bundle must contain no secret, ever** (it is trivially extractable) |
| Feature toggles | Minimal server-driven config endpoint (`/config`) — no SaaS flag service in V1 |
| Database credentials | Least-privilege per environment: app role (DML), migration role (DDL), no shared root |
| CI/CD | Environment-scoped secrets in CI; secret scanning on push; deploy promotes the same artifact (image/build) through staging → prod |
| Rotation | Documented rotation for SMS/storage/auth secrets; rotate-on-leak is mandatory, not discretionary |

---

## 31. Versioning

- **Mobile app:** SemVer (`major.minor.patch`) + build number via EAS; store track per environment (dev/preview/production). **Force-update mechanism:** server returns `minSupportedVersion` in `/config`; app compares and blocks-with-store-link on mismatch — this is how breaking API changes are rolled out without stranded clients.
- **API:** URI versioning `/api/v1`. Within v1: **additive-only** (new fields optional/nullable; never repurpose an existing field). Breaking change ⇒ `/api/v2` coexisting with v1 for a defined overlap window, plus deprecation headers/sunset dates and the min-version mechanism above. Changelog derived from PR titles in the audit doc.
- **Database migrations:** forward-only, numbered, reviewed, CI-applied — never edited after merge (fix forward). Dev-only down-migrations for local iteration. Occasional squash is allowed pre-launch, logged in audit.md.
- **Configuration:** platform config changes are themselves audited records (old value → new value); taxonomies/weights carry effective timestamps so behavior changes are explainable after the fact.
- **Contracts (shared package):** versions with the API; mobile pins the version it was built against.

---

## 32. Future Extensibility

Design seams that exist *now* for things we deliberately do *not* build now:

| Future capability | Seam already present | What we are NOT doing yet |
|---|---|---|
| L1 Emergency / SOS | Complaint entity + notification fan-out + admin console = natural SOS intake; severity routing exists | No SOS button/incident flow |
| L2 Emergency replacement | Crew gap detection + Quick Match pipeline = replacement is "gap → match → offers" | No auto-trigger; employer does it manually today |
| Insurance (welfare/accident) | `welfare` taxonomy + provider interface pattern (same shape as KYC/payment adapters) | No policies/claims |
| Advanced analytics / L3 reporting | Append-only audit + event records are a clean source; outbox events are a stream to warehouse later | No dashboards beyond basic admin counters (L3 deferred) |
| More cities / regions | Location = reference-data rows (cities/areas table), never hard-coded | No multi-city config UI (L4) |
| More job categories / employer types | Taxonomy tables (config), not enums in code | No category management UI |
| More payment providers | `PaymentProvider` port; `PROCESSING` state + callback path already modeled | No gateway integration until settlement model decided |
| More verification providers | `KycProvider` port; manual review is just the first provider | No eKYC vendor |
| Advanced/AI matching | Scorer is an isolated pure function behind a stable contract; weights already externalized in config | No ML pipeline |
| Advanced maps | Location module boundary keeps map concerns out of core data | No map SDK |
| Automated hiring | Quick Match offers are already programmatic + expiring | No employer-authored auto-hire rules |
| Additional languages | All strings externalized from day one; date/locale handling via libraries | No translation content yet |
| Realtime chat/messaging | Notification module + party-scoped authorization give the access model | Owner scope decision pending (M3 boundary) |
| Org/team employer accounts | Employer profile exists as an entity ready to gain members | Single-user accounts in V1 |

Principle honored: **reasonable extensibility, not speculative complexity** — every seam above costs near-zero today because it falls out of boundaries we need anyway; none of them is implemented prematurely.

---
## 33. Architectural Decision Records

Format: Decision · Reason · Alternatives · Trade-off · Consequence. Status marks whether the owner must still approve.

| # | Decision | Status |
|---|---|---|
| ADR-001 | RN + Expo + TypeScript mobile client | CONFIRMED (owner direction) |
| ADR-002 | MySQL as relational database | CONFIRMED-preferred / PROPOSED (8.0 specifics) |
| ADR-003 | V1 module scope (H1–H9 + M1–M6; L1–L4 deferred) | CONFIRMED |
| ADR-004 | Server-authoritative architecture; client never touches DB | CONFIRMED (brief) |
| ADR-005 | Backend framework (NestJS proposal) | CONFIRMED (owner execution prompt, 2026-09-24) |
| ADR-024 | Future top-level project structure (Mobile App / Backend / Database / Documentation) | CONFIRMED (owner direction) |

- **ADR-005 — NestJS (Node/TS) backend.** *Reason:* structural module boundaries + DI testability + guards/interceptors for cross-cutting authz/validation/logging + TypeScript contracts shared with clients. *Alternatives:* Laravel (fastest CRUD; second language, no type sharing), Django/DRF (batteries + admin generator; weaker typing story, second language), Express/Fastify bare (must invent the structure ourselves). *Trade-off:* framework ceremony vs. self-authored conventions. *Consequence:* locks the backend ecosystem (Node), shapes hiring/tooling, keeps one language across the repo.
- **ADR-006 — Modular monolith, single deployable.** *Reason:* transactional core chain; one-team/AI-assisted delivery; shared entities (§3, §4). *Alternatives:* microservices (rejected: distributed transactions + ops overhead at V1 scale), BaaS (rejected: rules/authz/lock-in). *Trade-off:* whole-system deploys; single DB scaling point. *Consequence:* module boundaries must be policed by convention/tests; extraction path to services stays open.
- **ADR-007 — Single MySQL database, all modules.** *Reason:* ACID across hire→crew→attendance→payment; operational simplicity. *Alternative:* DB-per-module (service thinking — premature). *Trade-off:* cross-module reads go through owner interfaces (a discipline cost). *Consequence:* backup/restore story is singular and simple; schema changes are one migration pipeline.
- **ADR-008 — REST/JSON `/api/v1`, additive-only versioning.** *Reason:* simplest model serving two client types; cacheable reads; universal tooling. *Alternative:* GraphQL (client-tailored queries — but authorization complexity + N+1 risks + no third-party consumer need), tRPC (tight TS coupling; weaker for future third parties). *Trade-off:* some over/under-fetching on complex screens. *Consequence:* contract via shared Zod + OpenAPI; breaking changes cost a `/v2`.
- **ADR-009 — Phone + OTP auth; no passwords in V1; rotating refresh tokens.** *Reason:* market reality (phone-first users), eliminates password breach/reset surfaces; rotation detects token theft. *Alternatives:* passwords (rejected), email OTP (low penetration), social login (deferred). *Trade-off:* SMS cost + deliverability dependency; OTP UX friction on bad networks. *Consequence:* SMS provider quality is load-bearing (open question); rate limits are a security control, not a nicety.
- **ADR-010 — Admin as a separate web app.** *Reason:* document-review/moderation UX is desktop-native; no store review for operational change; privileged actions off personal devices; separate auth policy possible (§10). *Alternative:* admin screens inside the RN app (single codebase — rejected for UX/attack-surface reasons). *Trade-off:* one more (small) app to build and deploy. *Consequence:* admin web stack (React+Vite+Playwright) enters the dependency set.
- **ADR-011 — Expo Router (file-based navigation) with role-gated groups.** *Reason:* route groups map 1:1 to auth/role states; deep-link support built in. *Alternative:* React Navigation manually — same outcome, more glue code. *Consequence:* folder layout will follow routes (structure phase detail).
- **ADR-012 — Server-state via TanStack Query; local state via Zustand; forms via RHF+Zod.** *Reason:* clear separation of state kinds (§6) prevents cache/store muddle; smallest libraries that solve each problem. *Alternatives:* Redux全家 (heavier), Context-only (render/perf issues). *Trade-off:* two state libraries to learn. *Consequence:* screens have a fixed pattern — hooks only, never raw fetch.
- **ADR-013 — Deterministic rule-based matching (filters + weighted scoring), weights in config.** *Reason:* explainable, testable, cheap, modifiable without retraining (§15's V1 criteria). *Alternative:* ML ranker (not explainable/testable at V1 data volumes). *Trade-off:* hand-tuned weights need occasional human review. *Consequence:* golden test set becomes the regression safety net; scorer isolated as a pure function for future replacement.
- **ADR-014 — Quick Match = offer workflow reusing the hire command (not a parallel hiring path).** *Reason:* one transactional choke point for slots/conflicts = double-booking prevention stays provable (§17). *Consequence:* offer expiry/wave logic is the only new complexity.
- **ADR-015 — QR attendance via server-signed rotating tokens + manual-roster fallback.** *Reason:* signature/freshness kills screenshot sharing; manual fallback guarantees recordability offline (§19). *Alternatives:* static daily QR (shareable — rejected), GPS-only (venue precision poor; privacy-heavy), pure manual (no scan UX the product promises). *Trade-off:* online dependency for scans. *Consequence:* employer device is part of the attendance infrastructure.
- **ADR-016 — Payment: ledger/record-only in V1; provider behind a port.** *Reason:* platform records entitlements and confirmations without becoming a custodian — avoids payment-licensing scope until the owner chooses a settlement model (§20). *Alternatives:* escrow/payout from day one (compliance + capital + KYC-tier complexity), no payment tracking at all (breaks the lifecycle). *Trade-off:* money moves off-platform in V1. *Consequence:* earning/payment states already model `PROCESSING` for a later provider; business model (fees) still open.
- **ADR-017 — Outbox-table event dispatch (in-process), no broker in V1.** *Reason:* transactional correctness for notifications without operating Kafka/Rabbit/Redis (§22, §29). *Trade-off:* at-least-once with retries is home-grown (small, well-tested code). *Consequence:* dispatcher is a clean extraction point for a worker process/broker later.
- **ADR-018 — Private object storage + presigned URLs for all uploads (KYC/photos/evidence).** *Reason:* no public object URLs ever; access control and audit live server-side (§21, §23). *Vendor:* UNKNOWN (S3-compatible interface).
- **ADR-019 — Append-only business `audit_log` as a first-class table, separate from ops logs.** *Reason:* money/trust decisions must be reconstructable; different consumers and retention (§26). *Trade-off:* write volume + storage. *Consequence:* app DB role has no audit UPDATE/DELETE grant.
- **ADR-020 — Idempotency-Key on every side-effecting mutation.** *Reason:* mobile networks retry; double-tap must never double-apply/double-hire/double-pay (§14, §24). *Trade-off:* idempotency store bookkeeping. *Consequence:* client wrapper adds keys automatically.
- **ADR-021 — Monorepo (`/mobile /backend /admin /packages/contracts`).** *Reason:* atomic cross-cutting changes; one contracts source; single CI. *Alternative:* separate repos (version-skew pain between client and API). *Trade-off:* bigger repo as it grows. *Consequence:* CI matrix per package.
- **ADR-022 — UTC storage + explicit Asia/Kolkata job schedules; integer paise money.** *Reason:* correctness fundamentals — timezone drift and float money are unfixable-in-production bug classes (§8). *Consequence:* display formatting lives client-side via dayjs.
- **ADR-023 — i18n string externalization from day one (single language shipped).** *Reason:* retrofitting localization touches every screen; key tables cost almost nothing now (§32). *Trade-off:* mild indirection when writing UI copy.
- **ADR-024 — Agreed future top-level project structure (owner direction, recorded 2026-09-24).**

  ```
  WorkBridge/
  ├── Mobile App/      React Native + Expo + TypeScript client
  ├── Backend/         API + business logic per this blueprint (§7, §14)
  ├── Database/        MySQL — schema design docs / ERD / seeds (runtime migrations run via backend tooling unless directed otherwise)
  └── Documentation/   architecture.md · audit.md · client-progress.md (moved from repo root at scaffold time)
  ```

  *Reason:* owner-set arrangement for the repository once implementation starts. *Trade-off:* differs from the internal package layout sketched in ADR-021 (`/mobile /backend /admin /packages/contracts`); exact package naming, placement of the admin web app (open question #5) and the shared contracts package get reconciled at the application-structure phase — this top-level arrangement governs. *Consequence:* nothing is scaffolded before architecture approval; at scaffold time the three root documents move into `Documentation/` (with `ARCHITECTURE.md` renamed to `architecture.md` per the owner's naming).

---

## 34. V1 Scope Confirmation

**In scope (CONFIRMED):** H1 Auth · H2 Profiles · H3 KYC · H4 Job Management · H5 Discovery · H6 Application Queue & Hiring · H7 Crew · H8 Attendance · H9 Payments · M1 Matching · M2 Quick Match · M3 Notifications · M4 Ratings · M5 Welfare · M6 Complaints.

**Deferred (CONFIRMED out):** L1 SOS · L2 Emergency Replacement · L3 Analytics · L4 Platform Config UI — architecture leaves seams for all four (§32); none is implemented.

**Scope items surfaced during architecture (need explicit owner confirmation):**

| Item | Proposal | Status |
|---|---|---|
| Multi-day jobs (weddings span days) | In scope — work-day rows + per-day attendance already modeled | PROPOSED |
| Employer↔worker in-app chat | Out of V1; M3 = notifications only. Realtime chat is a large real-time subsystem of its own | REQUIRES OWNER DECISION |
| Dual-role accounts (one person worker+employer) | Single role per account in V1 | PROPOSED |
| Org/team employer accounts | Single-user employer in V1; org fields on profile | PROPOSED |
| Hourly/shift-granularity jobs | Day-based in V1 (time windows exist; shift entities deferred) | PROPOSED |
| KYC gate policy (browse vs. apply vs. hired vs. publish) | Browse+apply free; KYC required to be hired (worker) and to publish (employer) | CONFIRMED (owner, 2026-09-25) |
| Welfare declarations mandatory set | All optional in V1, strongly encouraged in UX | PROPOSED |
| Re-apply after rejection (same job) | Not allowed in V1 | PROPOSED |
| Employer's own attendance tracking | Not in V1 | PROPOSED |
| Progress methodology for tracking docs | Equal weight per V1 module (15 modules ≈ 6.67% each) | CONFIRMED in audit.md/client-progress.md |

---

## 35. Risks / Open Questions

**Risks:**

| # | Risk | Impact × Likelihood | Mitigation in this architecture |
|---|---|---|---|
| R1 | Handling money directly triggers payment/PPI licensing (India) | High × Medium | Record-only V1 (ADR-016); settlement model is an explicit owner decision before any gateway work |
| R2 | Aadhaar storage/use violates UIDAI rules | High × Medium | Default ID set excludes raw Aadhaar; provider-mediated masked verification later (§21) |
| R3 | DPDP Act 2023 (consent, minimization, purpose limitation) | High × High | Consent records at KYC/onboarding, PII minimization, per-audience field projection, retention policy before launch, no PII in logs |
| R4 | OTP fraud/SMS pumping costs + DLT template rules | Medium × High | Tight rate limits, provider caps, per-env sender registration, template registry |
| R5 | Attendance fraud (code sharing, proxy check-ins) | Medium × Medium | Rotating signed tokens, state guards, manual-mark audit trail, anomaly flags, optional geofence |
| R6 | Double-booking / slot races | High × Low-Med | Transactional checks + row locks + race tests in CI (§8, §27) |
| R7 | Matching cold start (empty/sparse data in two launch cities) | Medium × High | Deterministic fallback ladder, transparent employer filters, neutral defaults — matching never blocks hiring (queue still works) |
| R8 | Prototype-behavior expectations drift ("the prototype did X") | Medium × High | This blueprint + audit.md decision records; source-of-truth hierarchy from the brief; later explicit decisions override |
| R9 | Scope creep (SOS/chat/maps/analytics pulled in early) | Medium × High | §34 scope table + open-question discipline; anything new enters via ADR |
| R10 | Low-end Android + flaky networks degrade UX | Medium × High | Offline strategy (§25), cache-first reads, low-end device in the test matrix (§27–28) |
| R11 | Multi-agent/AI implementation drift from conventions | Medium × High | Contracts + state machines + permission matrix tests as CI guardrails; ADRs as the "why"; module boundaries enforced by review |
| R12 | KYC review bottleneck (manual queue) at growth | Medium × Medium | Queue metrics/alerts (§26); KycProvider seam for automation |
| R13 | Notification cost explosion (SMS/push spam) | Low × Medium | Channel matrix discipline (§22), batched employer digests, no campaigns in V1 |
| R14 | MySQL choice regret (e.g., wanted exclusion constraints/JSON depth) | Low × Medium | ORM-mediated access keeps SQL portable; decision re-recorded if it surfaces |
| R15 | Single-admin dependency / suspension abuse | Medium × Low | Granular admin permissions, all admin actions audited, second-reviewer seam noted in KYC |

**Open questions → see the consolidated register below (§36a), which is the actionable checklist.**

---

## 36. Recommended Next Step

1. **Owner reviews this blueprint** — decisions first, prose second: work the register in §36a top-down. Roughly a dozen calls unblock everything else.
2. **Approve/adjust ADRs** — flip PROPOSED → CONFIRMED (or replace with your choice; each swap is cheap now, expensive after schema design).
3. **Then, and only then, the Data & API Design phase** — conceptual model here → full ERD + column-level schema + endpoint contracts + finalized state-machine tables, reviewed the same way.
4. After data/API approval: application structure (folder layout per ADR-011/021), UI/UX design, then implementation planning with milestones that feed `audit.md` / `client-progress.md`.

**No code, schema, scaffold, or installs until steps 1–2 are done.**

---

## 36a. OPEN ARCHITECTURAL QUESTIONS (consolidated register)

| # | Question | Status | Recommendation |
|---|---|---|---|
| 1 | Backend framework | CONFIRMED (owner execution prompt, 2026-09-24) | NestJS + TypeScript (§5, ADR-005) |
| 2 | Database engine confirmation | CONFIRMED (owner execution prompt, 2026-09-24) | MySQL 8.0 + Prisma |
| 3 | API style | CONFIRMED (owner execution prompt, 2026-09-24) | REST/JSON v1, `/api/v1` (ADR-008) |
| 4 | Authentication mechanism | CONFIRMED (owner, 2026-09-25) | Phone OTP + rotating refresh; no passwords (ADR-009). Admin auth: same phone OTP, admin role granted server-side (no separate password system) |
| 5 | Admin application strategy | CONFIRMED (owner execution prompt, 2026-09-24) | Separate lightweight React web app (ADR-010) |
| 6 | Payment settlement model | REQUIRES OWNER DECISION | Record-only in V1 (ADR-016); escrow/payout only with legal/compliance input |
| 7 | Payment provider | UNKNOWN | Unreachable until #6 decided |
| 8 | Platform business model (commission/subscription/none) | REQUIRES OWNER DECISION | Needed before fee logic is ever designed |
| 9 | KYC provider + accepted ID types | CONFIRMED (owner, 2026-09-25) | Manual review V1; IDs: PAN / Voter ID / Driving Licence / Passport (Aadhaar NOT in V1) — matches contracts KYC_ID_TYPES |
| 10 | KYC gate policy (browse/apply/hire/publish) | CONFIRMED (owner, 2026-09-25) | Browse+apply free; verify to be hired (worker) / to publish (employer) |
| 11 | SMS/OTP vendor | UNKNOWN | Compare Indian aggregators on DLT compliance, delivery rates, cost; decide at implementation start |
| 12 | Push provider | PROPOSED | Expo Notifications (FCM/APNs abstraction) |
| 13 | Map/geocoding provider | PROPOSED (deferred) | None in-app; native deep-link; geocode adapter optional |
| 14 | Object storage vendor | PROPOSED (pattern) / UNKNOWN (vendor) | Any S3-compatible private bucket |
| 15 | Matching algorithm | PROPOSED → owner sign-off on weights | Deterministic filters + weighted scoring (§16); weights editable in config |
| 16 | Quick Match offer expiry + wave size | PROPOSED (values) | 30 min expiry, waves ≈ 2× slots capped at 10 |
| 17 | Worker availability model | PROPOSED | Explicit date/time-window slots; "open to work" toggle as ranking signal |
| 18 | Attendance verification rules (geofence required?) | REQUIRES OWNER DECISION | Optional geofence with employer override; manual roster fallback always available |
| 19 | Chat/messaging in M3 | REQUIRES OWNER DECISION | Exclude from V1; notifications only |
| 20 | Dual-role accounts | PROPOSED | Single role per account in V1 |
| 21 | Multi-day jobs | PROPOSED | In scope (already modeled) |
| 22 | Org/team employer accounts | PROPOSED | Deferred past V1 |
| 23 | Crash-reporting / APM vendor | UNKNOWN | Pick before beta, behind adapter |
| 24 | Hosting + deployment target + secrets manager | UNKNOWN | Decide with backend choice; keep env contract (§30) stable |
| 25 | Data retention policy (KYC docs, logs, audit) | PROPOSED | Audit ≥2y, logs 30–90d, KYC per legal review — confirm before launch |
| 26 | iOS in V1? | PROPOSED | Android first (market + Windows-host tooling reality); iOS via EAS when approved |

**CONFIRMED anchors (no further decision needed):** V1 module scope · core lifecycle · three roles · RN+Expo+TS client direction · MySQL preference · mobile-first client/server separation (no client DB access) · prototype ≠ production architecture · this document's source-of-truth discipline. · agreed future top-level project structure — Mobile App / Backend / Database / Documentation (ADR-024).

*End of blueprint. Owner-directed execution began 2026-09-24 (foundation scaffolded per the execution prompt); stack/admin/API decisions above were flipped to CONFIRMED from that prompt. Gate 0 (full blueprint + §36a sign-off) remains NOT approved — further decisions from owner review will be recorded here and in `audit.md`.*
