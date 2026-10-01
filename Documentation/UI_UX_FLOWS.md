# SWON — Annotated Screen Flows (Phase 3)

**Status:** DRAFT for owner gate review · **Date:** 2026-09-25
**Source:** architecture §11 (workflows — each flow below maps 1:1), §10 (nav). Tokens/components: `UI_UX_DESIGN.md`.
Format per screen: **Screen** → elements · states · copy · next/edge. (edge = failure path)

---

## A. Worker flows

### A1 · Registration (§11.1)
1. **Phone entry** → +91 masked input, numeric keypad · states: invalid, cooldown · copy: "We'll text you a 6-digit code" · → OTP. edge: SMS down → banner "Can't send SMS right now — try in a minute" (503).
2. **OTP verify** → 6 boxes + auto-read (Android), resend timer (cooldown from /config) · states: wrong (attempts left), expired, locked · copy: errors.OTP_INVALID "That code didn't match." · → Role select. edge: OTP_MAX_ATTEMPTS → wait message with time remaining.
3. **Role select** → two big cards: "I want work" / "I want to hire" · → profile setup. (one role per account, §36a #9 — switching later = support request)
4. **Minimal profile** → worker: name, area (city→area picker), skills (multi-chip), optional photo · employer: org name, type, address · states: draft autosave indicator · → Home with welcome sheet + KYC prompt (deferred per gate policy).
   - data: account ACTIVE, profile insert, audit `account.registered`.

### A2 · Discover & apply (§11.4–11.5)
1. **Jobs feed** → JobCards (pay, dates, headcount "3 of 6 filled", distance band, welfare chips) · states: skeletons, empty ("Widen your dates or area" + CTA), offline banner · filters sheet (category, area, date, pay min, sort) · cursor "Load more".
2. **Job detail** → title, pay prominently, day-wise time table, requirements, employer card (rating + KYC badge), eligibility line ("You're eligible" / reason: "Needs 2+ yrs experience"), address AREA ONLY (§18) · Apply button states: enabled / disabled "Already applied" / "Job filled" / KYC gate banner "Verify ID to get hired".
3. **Apply confirm sheet** → optional cover note · copy shows what employer will see · → success toast + card flips to "Applied" · Activity tab gains row.
   - edges: 409 JOB_ALREADY_FILLED → inline banner + "2 similar jobs nearby" list; conflict → shows conflicting job chip; network → retry with same Idempotency-Key (never double-apply).
4. **Withdraw** (post-apply, pre-hire) → confirm sheet with consequence ("Employer will see you withdrew").

### A3 · Quick Match offer (§11.12)
1. **Offer card** (push deep-link → Offer screen) → countdown ring (respondBy), job mini-card, requirement line, distance band · Accept (primary, full-width) / Decline (ghost).
2. **Accept** → spinner "Checking your slot…" → success → offer becomes "Hired" + job appears in Home/Work with address revealed (post-hire §18) · edge: 409 last-slot race → "Just filled — offer closed" + shortlist fallback note; conflict → reason card.
3. **Decline / expiry** → card greys "Expired" · copy neutral ("No problem — we'll show similar jobs").

### A4 · Attendance per day (§11.9)
1. **Home (active job)** → today's card: time window, big Check-in / Check-out button (location permission soft-ask first time), "Opens at 09:00" state before window.
2. **Scan** → camera screen (QR from employer display) → instant result sheet: ✓ Checked in 09:04 / ✓ Checked out 18:02 with duration · edge: token expired → "Ask employer to refresh the code"; wrong job → explicit message; duplicate → idempotent success "Already checked in at 09:04"; offline → queued banner (safe to retry, §24).
3. **Employer manual fallback** → worker shows "Show my name" → roster tap path (source=EMPLOYER, audited).
4. **Approval** (worker sees state only) → chip NOT_STARTED→CHECKED_IN→CHECKED_OUT→APPROVED + notification ATTENDANCE_APPROVED → earning becomes visible in Earnings.
   - edge: NO_SHOW (missed day) → chip + explanation; dispute → Complaint entry point inline.

### A5 · Earnings & payments (§11.10 — worker side)
1. **Earnings list** (Me → Earnings, or Activity) → rows: job, dates, amount ₹, status chip (PENDING→…→PAID), adjustment reason if any · states: empty ("Complete a job to see earnings here").
2. **Earning detail** → status timeline, approved/paid timestamps, payment reference (if PAID), "Something wrong?" → complaint pre-fill (type=PAYMENT, link=earning).
3. **ON_HOLD** → banner "On hold — a complaint is being reviewed" + case status link · never silent.

### A6 · Rate & complain (§11.11, §11.13)
1. **Rate prompt** (job COMPLETED → Activity) → stars + tag chips + optional comment (≤300) · copy: "Your rating is shared only after both sides submit (or after 48h)" (double-blind §22.8) · edge: submit fail → draft retained locally.
2. **Complaint wizard** → type select → link picker (job/application/earning context pre-filled when launched inline) → narrative (min 20 chars, guided placeholder) → evidence upload (≤5, presigned, progress) → review & submit → ack sheet "Case #… opened — we'll update you".
3. **Case timeline** → events list (status changes, admin notes, party replies) + reply box when WAITING_ON_PARTY.

---

## B. Employer flows

### B1 · Job creation wizard (§11.3)
1. **Step 1 Details** → title (suggestions), description, category chips, skills multi-select · autosave "Draft saved".
2. **Step 2 Schedule** → date range → day list derived (toggle each day), per-day time (defaults apply), headcount stepper · edge: past date → inline error.
3. **Step 3 Pay & welfare** → pay type (per hour/day/total), amount ₹ (paise math server-side), min experience, requirements note, welfare chips (catalog from /welfare/catalog — NOT hardcoded §26) + per-item note.
4. **Step 4 Location** → city → area → address line · optional "show map pin" toggle (§18: workers get band, not pin, pre-hire).
5. **Review & Publish** → full preview as workers see it · Publish → success + KYC gate error path (KYC_REQUIRED message states exactly what to do) · Save draft available anytime.
   - data: DRAFT rows any time; OPEN on publish; matching pre-warm silent.

### B2 · Application queue & hiring (§11.6–11.8)
1. **Queue screen** (Applications tab → job picker) → QueueRows (avatar, name, rating×count, distance band, KYC badge, applied time, CONFLICT chip if overlap) · filters chips: New/Shortlisted/Waitlisted · multi-select mode for bulk.
2. **Candidate sheet** → safe-view profile (worker_safe_view), notes, actions: Shortlist / Waitlist / Reject (note) / **Hire** / Release (when hired) · consequence copy on each.
3. **Hire** → confirm sheet: slot summary "4 of 6 filled after this hire", conflict re-check shown live · Idempotency-Key sent · success: row → HIRED, roster count updates, worker notified (HIRED, §22) · edge: 409 HIRE_RACE_LOST → auto queue refresh + banner "Last slot just taken"; CREW_DOUBLE_JOB → conflict reason shown inline.
4. **Bulk decisions** → per-row results summary "8 hired · 2 failed (reasons)" (§14: 422 per-row, never silent partial).
5. **Release** → reason required; blocked if worker checked in (edge copy directs to attendance/payment flow); success → slot freed + shortfall banner + Quick Match shortcut (§11.8).

### B3 · Attendance display & approvals (§11.9)
1. **Work tab → job → Attendance** → rotating QR (auto-refresh ≤60 s, "keep this screen open" hint), today's roster (status chips, times), manual mark buttons, offline indicator (manual marks still work, audited).
2. **Approve day** → pre-approve summary (N checked out, duration totals) → bulk Approve → earning rows flip ELIGIBLE + worker notified · edge: no-checkout rows shown as "auto-close at window end + confirm".
3. **Correction** → reason mandatory → source=CORRECTED with actor+reason (§12.3 guard) → audit.

### B4 · Payments (record-only ledger, §36a #6) (§11.10)
1. **Earnings for job** → rows grouped by status; "N ready to approve" attention card on Dashboard.
2. **Approve** (single/bulk) → confirm: total ₹ shown (sum from server) · → APPROVED.
3. **Mark paid** → reference (UTR/cash note), paidAt, optional receipt upload, **total echo field prefilled from server** → submit → PAID + worker notified (PAYMENT_RECORDED, SMS optional per matrix) · edge: 409 AMOUNT_MISMATCH → shows server total vs typed, asks re-check (never silent) · duplicates blocked by Idempotency-Key.
4. **Aging** → Dashboard banner "5 earnings waiting 3+ days" → deep link.

### B5 · Quick Match launch (§11.12)
1. **From job** → "Quick Hire" → form: headcount needed, window (start/end), requirement snapshot text, radius (≤25 km), wave size (default from config) → **Preview candidates** (M1 score list with reason chips) → Launch.
2. **Wave monitor** → progress "4 accepted · 3 declined · 2 pending (expires 00:45)" · next wave auto-suggests when pool allows · shortfall state → explicit CTA: "Widen radius / Raise pay / Open full queue".

---

## C. Admin flows (separate React web app)

### C1 · Login → dashboard
- Auth: owner decision pending (§15: email+2FA vs invite-only — flagged at gate; V1 shell uses OTP like apps, swap when decided) · Dashboard: queue cards (KYC overdue, complaints open, payments flagged, SMS/push failures, unmatched jobs, overdue KYC) + day counters — operational only (§14 row 16).

### C2 · KYC review (§11.14)
- Queue (status filter, wait-time sort) → submission detail: masked ID, documents via presigned viewer (**every open logged** — document_access_log) → decision VERIFIED/REJECTED(+reason, requires "ID matches" attestation) → attempt counter shown → resubmission path caps at maxAttempts (KYC_ATTEMPT_CAP) → badge/gates update + notification (KYC_DECISION).

### C3 · Users & moderation
- Search (phone/name/id) → user drawer: role, status, KYC, jobs/applications history, sanctions → actions: WARN/SUSPEND/BAN (reason required, endsAt optional) → sessions invalid at next refresh (§15) + ACCOUNT_SUSPENDED notification · job moderation: HIDE/RESTORE with reason.

### C4 · Complaints case work (§11.13)
- Severity-sorted queue → case: linked entity + timeline + evidence → status moves UNDER_REVIEW → WAITING_ON_PARTY (message to parties) → RESOLVED (outcome note + optional sanction/payment hold-release) or DISMISSED · every action audited; both parties notified (COMPLAINT_OUTCOME).

### C5 · Config, matching weights & audit
- Flags/config editor (key → JSON value, version bump) → **Match weights** editor: 7 sliders (proximity, skill, reliability, rating, recency, availability, overlap) with live "sum = 1.000" validator; save = new weights version + immediate visible effect on next match_run (§16 explainability) · Audit view: filters (entity/actor/date) → append-only rows, before/after JSON viewer.

---

## D · Flow-to-test traceability (Wave testing note)
Each flow section cites its §11 workflow; journey tests (`Backend/test/journey.e2e-spec.ts`) mirror A1→A4→B2→B4 as the single scripted happy path; per-flow failure cases above become integration assertions (409s) and UI state tests (empty/error/offline) in Wave UI.
