# SWON — Project Progress

**Version:** V1
**Last Updated:** 2026-09-26

## Overall Progress

### 95%

How this is calculated: completed V1 modules ÷ total V1 modules (15 equal-weight modules) = **15 of 15 built**, plus the final ~5% of the project reserved for items only the owner can do (real SMS provider account + DLT registration, app-store accounts, launch sign-off). Everything that can be programmed is now programmed.

All fifteen modules are built and validated: **Authentication & Account**, **User & Profile Management**, **KYC & Verification** (ID number + consent + document photos, admin review queue, decisions delivered to the in-app notification inbox), **Job Management** (employers post drafts, edit, publish, cancel with confirmation, delete drafts — publishing requires verified identity), **Job Discovery** (workers browse a live feed with search, date/pay sorting, skill & experience badges, distance, and address hidden until hired), **Safety & Welfare** (employers declare welfare items per job — meals, drinking water, rest area… — from an admin-configurable catalog; workers filter and see them on every job), **Application Queue & Hiring** (workers apply and withdraw; employers shortlist, waitlist, reject and hire — hiring requires a verified worker, is race-safe and fills seats atomically), **Crew Management** (employer crew roster with seat counts; releasing a worker requires a recorded reason), **Attendance & Work Tracking** (rotating signed QR tokens with check-in windows, employer roster with manual marks, day approval, audited corrections, automatic checkout and no-show sweeps), **Payment & Earnings** (earnings computed from approved attendance when the job completes, employer approval, exact-match manual payouts that replay safely, and a worker earnings ledger), **Ratings & Reputation** (double-blind stars, tags and comments on completed jobs, per-person averages with distribution), **Workforce Matching** (server-scored candidate ranking with visible reasons and a logged scoring version), **Quick Match** (employers send timed offers to nearby open workers; workers accept or decline before the clock runs out — accepting creates the application instantly), **Complaints & Support** (users file cases with timelines and replies, payment problems hold the linked earning until resolved, admin decides with notes, sanctions and account reinstatement), and **Notifications** (in-app inbox plus per-user settings: push on/off, SMS on/off, quiet hours — login codes are always delivered).

---

## Completed

- Project foundation & requirements
- Full technical design (architecture) prepared — ready for review and approval
- Technical foundation initialized & verified (2026-09-25): project structure, mobile app shell, backend API shell with health check, environment configuration
- Phases 1–3 design & structure package prepared and verified (2026-09-25): database design (ERD + state machines + schema), API contracts & OpenAPI draft, UI/UX design (tokens, components, role flows), shared contracts package, admin web shell, CI pipeline, staging environment templates — awaiting owner gate review
- **Wave 1 (2026-09-25): sign-in & profiles module built and validated (13%)** — real database running, phone OTP login with expiry/cooldown/attempt rules, secure session handling with auto-renewal, role selection (worker or employer), profile setup with skills/availability/photo, welcome notification and audit trail; verified by automated tests (unit, integration, live end-to-end)
- **Wave 2 (2026-09-25): identity verification & notifications built and validated (20%)** — ID number + consent + document photos on the phone app, review queue in the admin console (approve/reject with reason, document views logged), verification status + result delivered through the in-app notification inbox; automated tests cover the whole flow twice, end to end, on a real database
- **Wave 3 (2026-09-25): job posting, discovery & welfare built and validated (40%)** — employers post jobs as drafts (title, dates, pay, skills, welfare items), edit, publish (publishing requires a verified identity), cancel with confirmation; workers browse a live feed with search, sort, skill/experience/verification badges and distance, with the full address hidden until hired; welfare items (meals, drinking water, rest area…) come from an admin-configurable catalog; verified by 72 unit tests + 40 end-to-end tests on a real database and a live browser click-through
- **Wave 5 (2026-09-25): attendance & payments closed (67%)** — QR token check-in/out with windows and replay guards, employer roster + day approval + corrections, auto-checkout/no-show sweeps, job completion finalizing earnings, exact-match record-only payouts with idempotent replay
- **Ratings, Quick Match, Complaints & notification settings built and validated (2026-09-26)** — rate a completed job (stars, tags, comment hidden until both sides rate or 48 hours pass), server-scored candidates with reasons, timed quick-match offers accepted from the phone, complaint cases with timelines/replies/holds, and per-user notification settings; every screen verified live in a browser
- **Admin console completed (2026-09-26)** — all eight tabs now show real data: dashboard counters, KYC queue, account search with suspend/ban/reinstate (sessions revoked on suspension), jobs moderation (hide from discovery with a reason / restore, fully audited), complaint case work, payments oversight with hold release, platform configuration, and the append-only audit trail with before/after values
- **Build complete (2026-09-26)** — 15 of 15 modules · 217 unit tests + 102 end-to-end tests, run twice clean · API document at 74 paths · all screens click-tested in a live browser

## Currently Working On

- **Nothing in code — the build is complete.** The project now moves to owner testing:
  - App: http://localhost:8081 → sign in with any phone (the dev build shows the code on screen) → worker: find work → apply → **Today's shift** → **My earnings** → **Rate your shift** → **Your offers** (quick match) → **My reports** (complaints); employer: **My jobs → Applications & crew** (queue, hire) → **Quick match** → **See candidates** → **Attendance** → **Earnings & payouts**
  - Admin console: http://localhost:5173 → sign in with an admin phone (code shown on screen) → all eight tabs
  - Login codes are simulated in development (shown on screen) — real SMS arrives after the provider step below

## Upcoming (owner actions before deployment)

1. **Pick the SMS provider and register for DLT** (MSG91 / Exotel / Twilio — recommendation prepared) — needed only for real users receiving login codes by text
2. **App-store accounts** — Google Play Console (one-time ~$25) and Apple Developer (~$99/year), in the owner's name
3. **Approve the consent wording** shown to users during identity verification (draft is stored with each submission)
4. **Owner testing pass** — the intensive hands-on testing the owner planned, before any launch sign-off
5. **Deployment** — a server + domain choice (the code is deployment-ready; this is a hosting decision, not new code)

---

## Module Progress

| Module | Status | Progress |
|---|---|---:|
| Authentication & Account | Completed | 100% |
| User & Profile Management | Completed | 100% |
| KYC & Verification | Completed | 100% |
| Job Management | Completed | 100% |
| Job Discovery | Completed | 100% |
| Application Queue & Hiring | Completed | 100% |
| Crew Management | Completed | 100% |
| Attendance & Work Tracking | Completed | 100% |
| Payment & Earnings | Completed | 100% |
| Workforce Matching | Completed | 100% |
| Quick Match | Completed | 100% |
| Notifications | Completed | 100% |
| Ratings & Reputation | Completed | 100% |
| Safety & Welfare | Completed | 100% |
| Complaints & Support | Completed | 100% |

Status meanings: **Completed** = built and validated · **In Progress** = actively being built · **Planned** = approved, not started · **Deferred** = not in this cycle.

---

## Milestones

- ✔ Requirements & project foundation — 2026-09-24
- ✔ Complete technical design prepared for approval — 2026-09-24
- ✔ Technical foundation initialized & verified (app structure, API shell, env setup) — 2026-09-25
- ✔ Phases 1–3 package prepared: data & API design, UI/UX design, structure/CI (2026-09-25)
- ✔ Wave 1 complete: sign-in (phone OTP) + profiles module built & validated → **13%** (2026-09-25)
- ✔ Wave 2 complete: identity verification (KYC) + notification inbox built & validated → **20%** (2026-09-25)
- ✔ All 15 modules built & validated → **95% overall** (2026-09-26)
- ○ Owner testing pass (intensive hands-on testing)
- ○ SMS provider + DLT registration, app-store accounts (the reserved final 5%)
- ○ Owner gate approval / launch sign-off (Gate 0)
- ○ Core transaction flow live (job → hiring → attendance → payment → rating)
