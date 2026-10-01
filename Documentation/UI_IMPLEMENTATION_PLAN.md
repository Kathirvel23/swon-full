# SWON — UI Implementation Plan (design → shipped UI)

**Status:** PROPOSED for owner review · **Date:** 2026-09-28 · **V3 amendment:** 2026-09-29 (owner approved the "Vibrant & Dynamic" prototype and requested this plan)
**Goal:** every UI/UX factor ≥ 9/10 (baseline scored today, see §1).
**Sources:** `UI_UX_DESIGN.md` (§0 direction — V3 wins over older wording; tokens §2, inventory §3, navigation §4, copy §5) · `UI_PROTOTYPE.html` (**V3, 19 screens — the visual source** for every batch below) · architecture §10/§18/§25/§26.
**Scope:** presentation layer only. No API, state-machine, permission or data changes (§3 guard rails).

---

## 1. Scorecard & acceptance tests (how each ≥9 is proven)

Baseline scored 2026-09-28 from the shipped code (all 28 screens, theme file, components, admin CSS). Every row is re-checked the same way at the end — a score is only claimed when its proof runs green.

| # | Factor | Now | Target | Acceptance test (re-runnable proof) |
|---|--------|-----|--------|-------------------------------------|
| 1 | Theme / visual identity | 2 | 9 | `grep` finds **0 hex colors outside `src/constants/theme.ts`**; brand + semantic + status→color tokens **+ V3 warm canvas, accents and gradient definitions** live in that one file; dark mode follows the system setting; key text/background pairs pass WCAG AA |
| 2 | Button design | 3 | 9 | 4 variants (primary/secondary/ghost/danger) × states default/pressed/disabled/loading × 2 sizes all rendered in the gallery route; min tap target 48dp; every async action shows a loading state |
| 3 | Component library | 2 | 9 | All design §3 components **as re-synced to V3** exist — incl. the marketplace set (OpportunityCard, MatchRing, WhiteWingBadge, TrustScore, FormationAvatars, SeatDots, MoneyDisplay, AttentionBanner, SearchBar, CategoryShortcut, CountdownRing, ProgressRing, EarningsChart) — with their listed state variants, each visible in `/design-kit`; screens drop to ~0 inline color/style literals (`grep 'style={{'` trend → 0 colored) |
| 4 | Navigation | 3 | 9 | Worker **5 tabs** (Home · Explore · My Work · Earnings · Profile) + host **5 tabs** (Home · Opportunities · Workers · Payments · Profile) exactly per design §4-V3 (FlashMatch/Hired/Formation/Attendance = contextual stacks); titled headers with back on detail screens; decisions use bottom sheets; deep links `job/:id`, `application/:id`, `quickmatch/:offerId` still land (e2e + live click-through) |
| 5 | Animation / motion | 0 | 9 | Skeletons on every async list/detail; 150–200 ms ease-out transitions; press feedback on every pressable; Quick-Match/QR countdown ring, **match count-up, FlashMatch pulse, live work-timer ring**; reduced-motion respected; grep shows motion code in use, no spinner-only screen >1 s |
| 6 | Graphics / iconography | 1 | 9 | Icon on every tab, status chip and primary action; avatars with initials fallback; employer QR rendered as a real scannable code; **category/opportunity imagery on job cards**; admin dashboard charts; zero text-only statuses remain |
| 7 | State handling | 4 | 9 | All five states (loading/empty/error/offline/success) designed per design principle 4 on every screen: global offline banner, error = cause + retry + requestId on 5xx, pull-to-refresh on every list |
| 8 | Accessibility | 4 | 9 | 48dp targets everywhere (spot audit), AA contrast, labels/hints complete, keyboard-safe forms (`KeyboardAvoidingView`), screen-reader walk of the core journey login → job → apply → check-in → earnings |
| 9 | Localization | 3 | 9 | `ta` locale file exists with **key-for-key parity** with `en` (script-compared counts), runtime language switch, Tamil-first labels on worker flows; admin stays English |
| 10 | Worker perspective | 3 | 9 | Worker home = **marketplace** per prototype v3 (greeting + location + search + category shortcuts + Recommended + Nearby rail + FlashMatch strip + week earnings preview); **pay is the hero + photo + match %** on opportunity cards; full worker journey click-through reviewed with screenshots |
| 11 | Employer perspective | 3 | 9 | **Workforce-today hero (seat dots) + attention banners + live opportunities**; worker cards with match ring, WhiteWing, skills, conflict block and **BOND**; roster with QR countdown + manual mark; payments **approve → record** states — all per prototype v3 |
| 12 | Admin web | 5 | 9 | Shared component set (table, filter bar, badge, dialog, toast, empty/loading states) replaces inline styles; charts on dashboard; same brand tokens as mobile |

Overall: 3/10 → 9+/10, re-scored by re-running this exact table.

---

## 2. Build order (12 workstreams, each ends green + committed)

Sizes are planning grades only (S/M/L), per `EXECUTION_PLAN.md` — calendar dates come after the first measured batch, never invented up front.

| # | Workstream | Size | What it delivers | Exit check |
|---|-----------|------|------------------|------------|
| U0 | Sync design source | S | Re-sync design sheet §2 (tokens), §3 (inventory), §4 (nav) to V3 exactly as §0 records it — the verbatim source U1– U5 code from | §2/§3/§4 match prototype v3 (spot-check list) · plan rows unchanged after |
| U1 | Tokens & theme | S | Rewrite `src/constants/theme.ts` from design §2 **as re-synced to V3**: brand/semantic/surfaces **+ warm canvas & ink + contextual accents + gradient definitions + V3 radius/shadow/motion + display-font stack**, spacing 4–32, type scale 12–34 hero, single status→color map, light **and** dark scheme; `npx expo install expo-linear-gradient` (Expo-official, tiny) | 0 stray hex (grep) · tsc 0 · jest green · lint 0 |
| U2 | Design-kit gallery | S | `/design-kit` dev route rendering every component in every state, MOCK badge — the owner's visual review surface (replaces reading code) | Route loads live, all states visible |
| U3 | Component library | L | The design §3 inventory **as re-synced to V3** (~30 components), 3 batches: (a) actions & inputs (Button incl. warm/money/on-dark variants, IconButton, TextField, OTPInput, ProgressHeader, **SearchBar, Chip, CategoryShortcut**) · (b) marketplace & people (**OpportunityCard ×5 variants, MatchRing, WhiteWingBadge, TrustScore, FormationAvatars, SeatDots, MoneyDisplay, AttentionBanner**, JobCard, ApplicationCard, QueueRow, RosterRow, EarningRow, OfferCard, Avatar, RatingStars, StatusChip, KYCBadge, AddressReveal) · (c) feedback & overlays (Sheet, Modal, Toast, Skeleton, Empty/Error art, Banner, QR, **CountdownRing, ProgressRing, Timeline, EarningsChart**; `npx expo install react-native-svg` for rings/QR/charts) | Each batch: gallery shows every variant + state; tsc/jest/lint green |
| U4 | Navigation shell | M | Convert both role stacks into tab layouts per design §4-V3: worker **5 tabs**, host **5 tabs**, icon + active-pill tab bar, contextual stacks for FlashMatch/Hired/Formation/Attendance/queue detail, titled headers with back, bottom sheets for decisions, deep links preserved | Full e2e run **×2 green** (route paths unchanged) + live click-through of both role shells |
| U5 | Screen migration | L | All **28 screens** re-skinned onto the library **plus the V3-only surfaces (marketplace home, My Work live mode, Hired moment, worker Formation, full-screen FlashMatch)**, 4 batches: (a) auth + entry (login, otp, role, profile, index, dev) · (b) worker core (marketplace home, jobs, job detail, My Work/work mode, hired, formation, applications, attendance, earnings, offers, rate, complaints, prefs, inbox, verify, worker profile) · (c) employer (all 9 — workforce hero dashboard, jobs, queue+crew, candidates, attendance, payments, post, quickmatch, profile) · (d) sweep + cleanup of leftover inline styles | Per batch: tsc 0 · jest green · lint 0 · live click-through of the batch's screens |
| U6 | Motion & skeletons | M | Skeletons, screen transitions, press feedback, countdown ring, pull-to-refresh, reduced-motion | Factor-5 acceptance test passes |
| U7 | Icons, imagery, avatars, QR, charts | M | Icon set everywhere, **bundled category/opportunity photos** on job cards (`expo-image` caching; set source = plan §4 decision 8), initials-fallback avatars, employer QR as real code (+ worker scan path), admin charts | Factor-6 acceptance test passes |
| U8 | States & offline | M | Global offline banner, error states with requestId, empty states with the ONE action, success feedback | Factor-7 acceptance test passes |
| U9 | Accessibility pass | M | 48dp audit, AA contrast, labels, keyboard avoidance, screen-reader walk | Factor-8 acceptance test passes |
| U10 | Tamil | M | `ta` locale with key parity, language switch, Tamil-first worker copy (agent drafts, owner approves wording) | Parity script: en count == ta count; spot check on worker flows |
| U11 | Admin web | M | Component-based tables/forms/dialogs/toasts, loading+empty+error states, charts, mobile-matched tokens | Factor-12 acceptance test passes; admin tsc 0 + build 0 |
| U12 | Final verification & re-rate | S | Re-run the full §1 table with evidence (grep counts, screenshots, test outputs), update audit + client-visible notes | Every row ≥9 or explicitly listed as a known exception |

Dependencies: U1 → U2 → U3 → U4 → U5 → (U6–U10) → U12, with U11 parallel once U1 lands. Nothing starts before its dependency's exit check is green.

## 3. Guard rails (what must not break)

1. **Presentation only.** No endpoint, state-machine, guard, permission or schema change rides this plan. The server stays the authority (design principle 6) — reskinning never fakes data.
2. **Green every batch.** `npx tsc --noEmit` · jest · lint after every batch; full e2e ×2 at U4 and U12; admin tsc + build at U11. A batch that turns a check red does not commit.
3. **Routes and copy keys stay.** Screen paths (deep links) and `i18n` keys are contracts — extend them, never rename silently.
4. **Tokens come from design §2 verbatim** (`extend, don't fork` theme.ts). Any deviation is written into `UI_UX_DESIGN.md` first, then coded.
5. **The design sheet moves from DRAFT to live source** as its parts land: U1 ticks §2 as implemented, U3 ticks §3 rows, U4 ticks §4.
6. **Owner reviews visually, not prose** — every batch ends with the gallery/click-through available to click and screenshots where a batch is remote.

## 4. Decisions I need from you (PROPOSED defaults — say yes / change)

1. **Icons:** use Expo's built-in icon set (`@expo/vector-icons`) — no extra native code, ships with Expo. *(default: yes)*
2. **QR codes:** employer attendance QR rendered as a real scannable image now; worker camera scanning needs `expo-camera` + a permission message — *(default: render now, camera scan in the same batch with English permission wording you approve later)*
3. **Dark mode:** follow the phone's setting (light+dark tokens already cost little once U1 is done). *(default: include)*
4. **Fonts:** keep system fonts — fastest on the mid/low-end Androids workers use; a branded display font can come later. *(default: system)*
5. **Tamil wording:** I draft the translation, you approve before it ships; consent/legal copy stays English until you supply the wording. *(default: yes)*
6. **Haptics (vibration taps):** skip in V1 (battery, low-end devices). *(default: skip)*

**Settled by the owner 2026-09-28:** the six defaults above proceed as proposed, **plus** the visual direction **"Rich & polished"** (brand header blocks, soft card shadows, hero money typography, icon-led illustrations) — recorded in `UI_UX_DESIGN.md` §0; component styling (U3) and screen migration (U5) follow that section where it overrides the older flat wording.

**V3 amendment decisions (PROPOSED 2026-09-29 — defaults run unless you change them):**
7. **Fonts:** bundle **Bricolage Grotesque + Manrope** locally (`@expo-google-fonts/*`; `expo-font` already installed) — the exact prototype look, loads offline, ~150 KB. *(default: bundle — supersedes decision 4's "system fonts", because V3's hierarchy is built on the display face)*
8. **Job imagery:** bundle ~6 licensed category photos in the app (`expo-image` already installed) — offline, consistent, ~1–2 MB. *(default: bundle; the prototype's CC photos are reference-only until license-checked for production)*

**No decision needed (already in place):** motion runs on `react-native-reanimated` 4.5.1 (installed, unused so far) — count-ups, card entrance, ring fills, FlashMatch pulse, reduced-motion; gradients on `expo-linear-gradient` and rings/QR/charts on `react-native-svg` (both Expo-official installs).

## 5. Progress accounting (honest note)

This track does **not** move the headline percentage: progress is frozen at completed V1 modules ÷ 15, and all 15 are built — the headline stays **95% (15/15 modules built, owner-only 5% outstanding)**. UI work is measured by the §1 scorecard instead. A polished app at 95% and a bare app at 95% are the same module count; this plan is what makes the second one look like the first.

## 6. Verification standard

- Per batch: tsc 0 · jest green · lint 0 · live pass over the touched screens (browser click-through with the backend + Expo web running, or Metro bundle-compile check when a screen needs data that the batch does not change).
- Per workstream: its §1 acceptance row proven by command output or screenshot, recorded in `audit.md`.
- Final (U12): the whole §1 table re-scored with fresh evidence, e2e ×2 green, admin build green — then the rating report goes to the owner factor by factor.

