# SWON — V1 Execution Plan

**Status:** DRAFT — for owner approval (assumes ARCHITECTURE.md is also under review)
**Date:** 2026-09-24
**Source of truth:** `ARCHITECTURE.md` decides WHAT and WHY. This plan decides WHEN and IN WHAT ORDER. On any conflict, the architecture (and later explicit owner decisions) wins — the plan gets corrected, not the other way around.
**Related:** `audit.md` (chronological log) · `client-progress.md` (client view)

> **Unchanged rule: no code, schema, scaffold, or installs until Gate 0 (architecture approval) and Phase 1 (data/API design) are complete.** This document is planning only.

---

## 1. How This Plan Works

- Two axes: **phases** (sequential stages separated by approval gates) and **waves** (module batches inside the implementation phase).
- **Gates:** work past a gate does not start until the owner approves that gate's artifact. Gates are cheap now, expensive later.
- Every wave follows the same **standard execution sequence** (§7.1) so each slice lands tested, documented, and logged.
- Progress reporting ties directly to the `audit.md` methodology: 15 equal-weight V1 modules, counted only when implemented *and* validated (§13).
- Critical path: `Gate 0 → Phase 1 → Phase 2 → Wave 0 → Wave 1 → … → Wave 5 (backbone) → Wave 7 → Phase 5 → Phase 6 → Launch`. Everything else is parallelizable around it.

## 2. Phase Model

```
 Gate 0            Gate 1              Gate 2
   │                 │                    │
   ▼                 ▼                    ▼
[ 0. Architecture ] → [ 1. Data & API  ] → [ 2. Structure & Environment ]
    Approval            Design               Scaffold per ADR-024, CI, envs
                                                     │
        ┌───────────────────────────────────────────┤
        │  [ 3. UI/UX Design ]  (runs in parallel with Phases 1–2;
        │     must finish before Wave 1 UI work)     │
        │                    └──────────────────────┤
        ▼                                           ▼
   [ 4. IMPLEMENTATION — Waves 0…7 (§7) ]  ← Gate 3 = full journey green
        │
        ▼
   [ 5. Hardening & QA ]  →  [ 6. Launch Readiness ]  →  V1 LAUNCH (Coimbatore + Tiruppur)
        │
        ▼
   [ 7. Post-L stabilization → backlog (L1–L4, iOS, chat…) ]
```

Gate owners: **Gate 0/1/2/3 = project owner** (review + explicit approval); waves = executed by AI coding agents against this plan; **CI = mechanical enforcement** of the exit criteria.

---

## 3. Gate 0 — Architecture Approval

**Artifact:** `ARCHITECTURE.md` reviewed; approval is explicit, not assumed by silence.

Checklist (all must be true):
- [ ] §36a open questions resolved — at minimum every item marked *REQUIRES OWNER DECISION*: #1 backend framework, #5 admin strategy, #6 payment settlement, #8 business model (or explicitly "no fees in V1"), #9 KYC ID types, #10 KYC gate policy, #18 geofence, #19 chat-in-M3
- [ ] Remaining PROPOSED items accepted or amended (#2, #3, #4, #12–#17, #20–#22, #25, #26)
- [ ] ADR-005 … ADR-024 flipped to CONFIRMED (or replaced with recorded alternatives)
- [ ] §34 scope table signed off (multi-day, dual-role, org accounts, hourly jobs, welfare mandatory set, re-apply rule…)
- [ ] Risks R1–R15 acknowledged (esp. R1 payment licensing, R2 Aadhaar, R3 DPDP)

**Outcome recorded in:** `ARCHITECTURE.md` (statuses updated) + `audit.md` (Decisions entry).

---

## 4. Phase 1 — Data & API Design (Gate 1)

*Input:* approved blueprint. *No application folders yet.*

Activities:
1. **Domain model → ERD** — every entity from §13 with columns, types, FKs, uniqueness constraints, indexes mapped to §8 conventions (paise integers, UTC + Asia/Kolkata job times, string+CHECK statuses).
2. **State machines → executable tables** — §12 machines enumerated as transition tables (from, to, actor, validation, side effects) that become unit tests later.
3. **API contracts** — every domain in §14 expanded: request/response schemas as Zod (future `packages/contracts`), error codes catalog, pagination/idempotency rules confirmed.
4. **Notification event catalog** — §22 matrix turned into a definitive event list with template keys.
5. **Seed data requirements** — job categories, welfare taxonomy, Coimbatore/Tiruppur area reference data (owner supplies content, §12).
6. **Migration plan** — initial schema migration design (forward-only per §31).

**Deliverables:** ERD document, initial schema DDL/migration draft, OpenAPI draft, transition tables, event catalog, error-code catalog.
**Exit criteria (Gate 1):** owner approves the data/API design; every blueprint question that blocked schema decisions is closed. *Only now does scaffolding begin.*

---

## 5. Phase 2 — Application Structure & Environment

*First moment folders are created — exactly per ADR-024.*

1. Create top-level structure: `WorkBridge/ → Mobile App/ · Backend/ · Database/ · Documentation/` — move the three root docs into `Documentation/` (`ARCHITECTURE.md` → `architecture.md`, plus this plan).
2. Internal package layout (per ADR-021/024 reconciliation done at structure time): mobile app, backend, admin web, `contracts` package.
3. Environments: local `.env` + `.env.example`, boot-time config validation, staging skeleton (§30).
4. CI pipeline: lint → unit → integration (ephemeral test DB with migrations) → contract diff (§27).
5. Test harness: Jest (backend + mobile), test-DB migration runner, journey-test skeleton.
6. Decision-dependent setup (must be closed by now): backend framework (#1), hosting (#24), SMS vendor (#11), storage vendor (#14), push (#12).

**Exit criteria (Gate 2):** empty-but-alive system: CI green, backend `/health` + error envelope responding, mobile app boots to role shells on an Android device, admin web shell loads, docs moved.

---

## 6. Phase 3 — UI/UX Design (parallel with Phases 1–2)

*Must exit before Wave 1 UI work starts.*

1. Design tokens + component inventory (buttons, inputs, cards, list rows, status chips, empty/error/loading states) — mobile-first, low-literacy-friendly, trust-oriented (per design philosophy in the brief).
2. Key screen flows — Worker: onboarding/OTP → profile → job browse/detail → apply → hired job workspace → attendance → earnings. Employer: org setup → create job → queue → hire → roster → attendance oversight → approvals. Admin: KYC review queue with document viewer.
3. Navigation final check against §10 (5 tabs each role, notifications as header stack).
4. Copy guidelines: plain language, payment/requirements clarity; string keys (i18n-ready).

**Deliverables:** screen inventory + state variants, token/component sheet, annotated flows for the three roles.
**Exit criteria:** owner approves the design for at least Worker onboarding + Employer job creation before Wave 1/3 UI begins respectively.

---

## 7. Phase 4 — Implementation (Waves 0–7)

### 7.1 Standard Wave Sequence (every wave, no exceptions)

1. **Contracts first** — Zod schemas + OpenAPI additions (shared package).
2. **Domain layer + state rules with unit tests** (RED first for state machines/eligibility/money/matching — §27).
3. **API endpoints + integration tests** (auth×role matrix rows added for every new route).
4. **Notification events** for this wave's features (outbox rows + templates).
5. **Mobile UI** — screens wired to real APIs, every screen with loading/error/empty states, drafts where §25 says so.
6. **E2E extensions** — journey test grows by this wave's segment; device flow added to Maestro suite.
7. **Close-out** — `audit.md` entry (completed/changed/issues/next); evaluate `client-progress.md` (§13); update this plan's checkboxes if used.

Waves are **vertical slices**: a wave ends with working, tested features end-to-end — not with a pile of backend ahead of the UI.

### 7.2 Wave Register

| Wave | Modules | Builds (in order) | Size | Depends on |
|---|---|---|---|---|
| **W0** | — (foundation) | Repo shells, CI, envs, API wrapper, nav groups, design-token stubs, outbox+dispatcher skeleton, audit writer, admin shell | M | Gate 2, Phase 3 partial |
| **W1** | H1, H2 | OTP auth + token rotation → profiles/skills/availability/photo → role routing UIs → session management | L | W0, SMS vendor (#11), storage (#14) |
| **W2** | H3 (+ M3-core) | Consent/ID/upload flow → admin bootstrap + KYC queue/decide → notification inbox + outbox dispatch + push registration + templates | L | W1, KYC ID policy (#9), admin auth (#4), privacy/consent copy (owner) |
| **W3** | H4, H5, M5 | Taxonomy seeds → job lifecycle + work-days + locks → discovery feed/filters/eligibility badges/distance → welfare declarations+display+filters → employer wizard + worker browse UIs | L | W1 (profiles), seed data (owner) |
| **W4** | H6, H7 | Apply/withdraw + conflict+idempotency → queue decisions+bulk → hire transaction (slots, row locks) → release flow → crew roster + counts/FILLED → both-side UIs → **race tests** | L | W3 |
| **W5** | H8, H9 | QR token mint/rotation + scan validations → manual mark/corrections/approval → NO_SHOW sweep → earning calc + eligibility → approve/mark-paid/adjust + ledger → attendance & earnings UIs | L | W4, settlement model (#6), geofence (#18) |
| **W6** | M4, M1, M6 | Ratings window+submit+aggregates → matching scorer (pure fn + golden tests) + employer match UI → complaints intake+admin console+holds+suspensions | L | W5 |
| **W7** | M2, M3 (finish) | Quick Match offers/waves/expiry/accept-transaction/shortfall → notification matrix completion (preferences UI, SMS fallbacks, aging/admin alerts) | M/L | W6 (M1), all events exist |

### 7.3 Wave Exit Criteria (Gate 3 = end of W7)

A wave exits only when: its standard sequence completed · new state-machine + permission tests green in CI · journey test extended and green · `audit.md` updated · client-visible modules flipped in `client-progress.md` if fully done.

**Gate 3 (backbone gate at W5):** API-level journey green through *payment* (register → KYC → job → apply → hire → crew → attendance → earning → approve → paid).
**Gate 3-final (end of W7):** the §27 mandated **full journey including rating** green in CI, permission matrix covers all routes, zero failing suites.

### 7.4 Progress Forecast (methodology unchanged: completed modules ÷ 15)

| After | Modules completed (cumulative) | Overall % |
|---|---|---:|
| W1 | H1, H2 (2) | 13% |
| W2 | + H3 (3) | 20% |
| W3 | + H4, H5, M5 (6) | 40% |
| W4 | + H6, H7 (8) | 53% |
| W5 | + H8, H9 (10) | 67% |
| W6 | + M4, M1, M6 (13) | 87% |
| W7 | + M2, M3 (15) | **100%** |

Honesty notes: module % reaches 100% at end of W7 — **before** hardening and launch; launch is tracked as milestones in `client-progress.md`, never as a inflated module %. Partial modules (e.g., M3-core in W2) show **In Progress** with a sub-% only when their sub-components are enumerated; the overall % never counts partials. Relative sizes (S/M/L) are planning grades only — **calendar estimates are produced after W0**, when one real slice gives us measured velocity (guessing dates now would be fiction).

### 7.5 Parallelization Rules

- Phase 3 (UI/UX) ∥ Phases 1–2; must finish before the UI portion of the wave that needs it.
- Admin web features can be built alongside mobile UI within a wave (same backend contracts).
- Store listing assets, legal pages, marketing prep ∥ W5–W7.
- Nothing skips its dependency row in §7.2 — no "starting a bit of W4 early" against unfrozen W3 contracts.

---

## 8. Phase 5 — Hardening & QA

1. Security pass: OWASP API Top-10 checklist + upload-abuse + rate-limit drills + MASVS-style mobile checklist (§23).
2. Load baseline: seeded dataset, feed + apply p95 recorded (§27.8).
3. Device matrix: low-end Android (primary), mid-range, iOS if in scope; permission-denied paths exercised.
4. Crash reporting live (#23) with consent posture; monitoring/alerts verified by induced failures (kill SMS provider → see retry behavior).
5. Backup **restore rehearsal** on staging (§26) — not just "backup exists".
6. Regression: full suite + full journey on production-like staging; bug bash; fixes only (no new features).
7. Min-version/force-update mechanism tested (#31).

**Exit criteria:** zero open critical/high bugs; checklists signed; staging run of the full journey green for 3 consecutive days.

## 9. Phase 6 — Launch Readiness

1. Provision production (per #24): DB + backups + secrets manager, storage buckets + retention jobs, push credentials.
2. **SMS sender ID + DLT template registration** (long lead — started during Phase 2, verified here).
3. EAS builds: Android first (#26), store listing, staged rollout plan.
4. Ops runbook: KYC queue daily ops, payment-holds ops, suspension ops, incident basics, support channel.
5. Legal surface: privacy policy + consent copy (DPDP) live, terms, KYC data retention job configured (#25).
6. Go/No-Go checklist reviewed by owner.

**Exit criteria:** V1 live in Coimbatore + Tiruppur, monitoring green, runbook handed over.

## 10. Phase 7 — Post-Launch & Backlog

1. Stabilization sprint (bugs + performance from real usage).
2. Baseline metrics (from §26 counters) → matching weight tuning (#15) as config edits with audit.
3. Backlog ordering (owner sets priority): iOS · chat decision outcome (#19) · org accounts · hourly jobs · L1 SOS → L2 replacement → L3 analytics → L4 config — each re-enters via ADR, never by sneaking into a wave.

---

## 11. Open Questions → Decision Deadlines

| Must be decided | Before | Blocking items |
|---|---|---|
| #1 backend, #2 DB, #3 API style, #4 auth/admin auth, #5 admin strategy | Gate 0/Phase 1 | everything |
| #6 settlement, #10 KYC gates, #9 ID types, #20 dual-role, #21 multi-day, #17 availability model | Phase 1 | schema design |
| #11 SMS, #14 storage, #12 push, #24 hosting/secrets | Phase 2 | W0–W1 |
| Privacy/consent copy + KYC ID legal OK (R2/R3) | before W2 | H3, admin KYC |
| Seed content: categories, welfare taxonomy, areas (owner) | before W3 | H4/H5/M5 |
| #18 geofence, #6 settlement final confirm | before W5 | H8/H9 |
| #15 weights, #16 offer values | before W6/W7 | M1/M2 |
| #23 crash reporting, #25 retention, #26 iOS, store accounts | Phase 5/6 | launch |

Anything undecided at its deadline = the wave **stops for that feature**, flagged in `audit.md` as a blocker — not silently worked around.

## 12. What We Need From the Owner, When

- **Gate 0:** the §36a decisions (one focused review session is enough).
- **Phase 1:** scope-table sign-off; draft content lists (categories, welfare items, Coimbatore/Tiruppur areas).
- **Phase 2:** vendor picks (SMS, storage, hosting) + account creation on those platforms.
- **Before W2:** consent/privacy copy, KYC ID types confirmed, admin reviewer identities.
- **Before W5:** settlement model confirmation, geofence on/off.
- **Before W6/W7:** matching weights + Quick Match values approval.
- **Phase 6:** store accounts/assets, legal pages, Go/No-Go.
- **Every gate/wave close:** review `audit.md` — async is fine; gate latency is the real schedule driver.

## 13. Definition of Done & Reporting Rules

A **module = Completed** (in `client-progress.md`) only when ALL hold:
1. All functionality in its blueprint section implemented (not mocked).
2. Its state-machine and permission tests exist and pass in CI.
3. Its API integration tests + journey segment green.
4. Its notification events wired (in-app minimum).
5. Known failure scenarios from the blueprint have explicit UX (not a crash).
6. `audit.md` entry written for the work.

Reporting: audit updated on **every meaningful task**; client-progress updated **only** on client-visible module completion or milestone; overall % = completed modules ÷ 15, methodology frozen; **never** mark complete because a screen/button/mock exists (brief §13 rule).

## 14. Execution Risks (plan-level)

| Risk | Mitigation |
|---|---|
| Gates skipped under momentum ("just start coding") | Gate checklists in this plan; CI has nothing to run until Phase 2 anyway — process is the control |
| AI-agent drift from conventions | Wave sequence (contracts→tests-first) + §27 suites as mechanical guardrails; ADRs as the "why" |
| Big-bang integration at the end | Vertical waves; journey test grows every wave and is the actual gate |
| Vendor lead times (SMS DLT, store review) | Started in Phase 2/6 per §11 deadlines |
| Scope additions mid-wave | New scope → ADR → next wave backlog; waves are frozen once started (blockers excepted) |
| Calendar pressure → fake progress | Forecast % table + DoD are the only numbers allowed in reports |

## 15. Plan Change Log

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-09-24 | Initial execution plan created from ARCHITECTURE.md (8 phases, Waves 0–7, gates, decision deadlines, DoD, progress forecast) |
| v1.1 | 2026-09-25 | Owner issued the EXECUTION START prompt: the technical foundation (structure per ADR-024, Expo mobile scaffold, NestJS API scaffold, Prisma tooling, env templates, verification) was executed FIRST under that explicit instruction — ahead of Phase 1. Phase 1 (Data & API Design: ERD + schema + endpoint contracts) remains pending and still owns the database schema. Gate 0 is NOT marked approved. |
| v1.2 | 2026-09-25 | **Owner gate restructure:** "Complete phase 1, 2 and 3 at once… after that we have a gate." → Phases 1–3 were executed as ONE combined run (approved via prompt: "Yes — start now"); Gates 1+2+3 collapse into a single owner review afterwards. Phase 1: ERD + state-machine tables + Prisma schema + contracts + OpenAPI draft + event/error catalogs + seed/migration docs. Phase 2 remainder: `packages/contracts`, admin React shell, staging env skeletons, CI pipeline file, journey-test skeleton, mobile test harness. Phase 3: UI/UX design doc + annotated 3-role flows. Execution order followed the plan (data → contracts → UI/UX → structure/CI → verify). Gate 0 status unchanged (never marked approved). |

*Plan updates happen at gate completions and wave re-plans; every change is mirrored in `audit.md`.*
