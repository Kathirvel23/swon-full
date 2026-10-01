# SWON — UI/UX Design (Phase 3)

**Status:** DRAFT for owner gate review · **Date:** 2026-09-25
**Sources:** architecture §10 (navigation), §11 (workflows), §18 (location privacy), §25 (notifications UX), §26 (config, not hardcoding), §22 (event catalog). Companion: `UI_UX_FLOWS.md` (annotated screen flows).
**Note:** This is the design sheet (tokens, components, flows, copy). Component *code* lands in Wave UI (Phase 4) — nothing here is implemented yet.

---

## 0. Owner decisions on visual direction

- **2026-09-28 — "Rich & polished" (owner, explicit choice).** Keep this sheet's structure (tokens, components, flows, copy) but add visual punch wherever it says flat/minimal:
  1. **Brand-colored header blocks** — screens open on a teal header block with white title (not plain black-on-white text).
  2. **Soft card shadows** instead of flat 1px borders alone (subtle: 0/1/3 at ~8% slate — still low-end-GPU friendly).
  3. **Hero-weight money typography** — pay figures get the largest bold treatment on job cards/details.
  4. **Icon-led illustration slots** — empty/first-run states use large glyphs in tinted circles, not bare text.
  Limits that still apply: sunlight-readable contrast, 48dp targets, no heavy imagery, no infinite animation. Amendments are folded into §2 below; where this section and the older "flat + 1px border default" wording disagree, this section wins.

- **2026-09-29 — "Vibrant & Dynamic" (V3), owner-approved implementation direction.** The owner approved the rebuilt prototype (`UI_PROTOTYPE.html`, 19 screens: "Super") and asked for the app implementation plan. V3 **extends** "Rich & polished" (its four points still stand) and wins wherever older wording disagrees. V3 adds:
  1. **Warm canvas & ink** — `#F6F3EC` background, `#10201E` text, `#4F5F5C` muted (replaces slate surfaces in light mode).
  2. **Contextual accents** — orange `#F97316`, amber `#F59E0B`, yellow `#FDE047`, coral `#EF5B47`, green `#16A34A`, blue `#2563EB`, lavender `#8B7CF6`; used by meaning (FlashMatch=warm, money=green, urgent=coral, today=blue), never rainbow.
  3. **Controlled gradients** — teal→deep (headers), warm (FlashMatch), money (earnings), radial home hero; plus wing-motif and map-dot brand backgrounds.
  4. **Typography** — display face **Bricolage Grotesque** (headings, money, numbers) + **Manrope** body (font bundling = plan §4 decision 7).
  5. **Marketplace imagery** — photo-backed opportunity cards, category shortcut icons (plan §4 decision 8).
  6. **Navigation V3** — worker 5 tabs (Home · Explore · My Work · Earnings · Profile), host 5 tabs (Home · Opportunities · Workers · Payments · Profile); FlashMatch/Hired/Formation/Attendance are contextual stacks, not tabs.
  7. **New surfaces** — marketplace home, live Work Mode, Hired moment, worker Formation, full-screen FlashMatch.

  §2/§3/§4 below are re-synced to V3 as the first build step of the implementation plan (U0).

---

## 1. Design principles

1. **Outdoor-first, one-hand.** Workers use mid/low-end Android in bright sun; min touch target 48×48 dp, primary actions in the thumb zone (bottom 40%), contrast AA+ for key text.
2. **Money and time are sacred.** Pay (₹ + period) and date/time are never truncated, never behind an icon, always in job cards + details. Dates carry day names; times carry AM/PM + IST.
3. **Plain language, two languages.** English + Tamil (Tamil-first copy for worker flows where possible). No jargon: "₹750 / day" not "75000 paise", "3 of 6 filled" not "headcount 3/6".
4. **Every screen has all five states.** loading (skeleton) · empty (with the ONE action that fills it) · error (cause + retry + requestId on system errors, §24) · offline (banner + queued retry for drafts) · success (state visibly changed).
5. **Consequences explained before they happen.** Hire shows the conflict check result; cancel shows who gets notified; release asks for reason; KYC gate messages say exactly what unlocks.
6. **Server is the authority; UI mirrors it.** Buttons disable on 409 with the server's reason (e.g. "Job just filled — 2 alternatives nearby"), never optimistic-pretend for hire/pay.
7. **Privacy by default (§18).** Exact home addresses/coordinates shared only post-hire; workers see distance bands pre-hire; photos via short-lived URLs.

## 2. Design tokens

Implementation home (exists already): `Mobile App/src/constants/theme.ts` (extend, don't fork).

| Token group | Values (V3) | Notes |
|---|---|---|
| Color — brand | `primary #0F766E`, `primaryDark #115E59`, `primaryDeep #0B4540`, `primaryLight #CCFBF1`, `tint #EFFCF9` | teal identity, locked |
| Color — semantic | `success #15803D`, `warning #B45309`, `danger #B91C1C`, `info #1D4ED8` | status badges map to these |
| Color — surfaces (V3 warm) | `bg #F6F3EC`, `card #FFFFFF`, `line #EFEAE0`, `border #E4DDD0`, `text #10201E`, `muted #4F5F5C` | warm canvas replaces slate (V3 §0.1) |
| Color — contextual accents (V3 §0.2) | `orange #F97316` FlashMatch · `amber #F59E09` warning/urgent · `yellow #FDE047` highlights · `coral #EF5B47` urgent · `green #16A34A` money · `blue #2563EB` today/info · `lavender #8B7CF6` part-time | contextual only — never rainbow |
| Gradients (V3 §0.3) | `teal #0F766E→#0B4540` headers · `warm #F97316→#F59E0B` FlashMatch · `money #16A34A→#0F766E` earnings · `deep #0B4540→#10201E` work mode · `sun #FDE047→#F97316` accents · home hero = teal base + warm corner overlay | `expo-linear-gradient` (linear); home hero layered |
| Typography (V3 §0.4) | **display: Bricolage Grotesque** 600–800 (headings, money, numbers) · **body: Manrope** 400–800 | bundled via `@expo-google-fonts/*` + `expo-font` (plan §4 decision 7) |
| Status chips | DRAFT grey · OPEN green · HIRING amber · FILLED teal · CANCELLED red · COMPLETED blue · **PAID green (money)** | status→color map lives in one shared file (M5/M9 use it too) |
| Spacing | 4 / 8 / 12 / 16 / 24 / 32 | 4dp grid |
| Radius (V3) | sm 8 · md 12 · lg 18 · xl 24 · xxl 30 · pill 999 | cards lg(18), sheets/headers xl(24), heroes xxl(30) |
| Type scale | 12 caption · 14 body-sm · 16 body · 18 title-sm · 22 title · 30 display · **34 hero-amount (money)** · 44 mega (work timer) | min body 16 (readability) |
| Elevation (V3) | card: `0 1px 3px rgba(16,32,30,0.10)` · lift: `0 12px 26px -14px rgba(16,32,30,0.35)` · button: teal-tinted · sheet/pop: deep-teal-tinted | still low-end-GPU friendly |
| Screen header (V3) | **gradient teal→deep block, white title, 24dp bottom radius, wing-motif strokes** (owner §0); home hero = layered gradient + map-dot texture, 30dp | one consistent header language |
| Motion | 150–200 ms ease-out; card entrance fade+rise 10px; match count-up 0→N 750ms; FlashMatch pulse; live timer ring; reduced-motion honored | engine: `react-native-reanimated` (installed) |
| Iconography | single line set, 24dp, tab bar 24dp + active pill (`primaryLight` bg, `primaryDark` icon) | consistent glyph per status |

## 3. Component inventory (with state variants)

Every component below ships with: default · pressed · disabled · loading · error(inline) where applicable — this table is the build checklist for Wave UI.

| Component | Variants / states |
|---|---|
| **Button** | primary, secondary, ghost, danger; sizes md/lg; states: default/pressed/disabled/loading |
| **IconButton** | 48dp target; badge counter (notifications) |
| **TextField** | label, hint, error (inline), prefix/suffix (₹, +91), secure? (n/a V1), multiline |
| **OTPInput** | 6 boxes, paste-aware, resend cooldown timer, attempt-lock message |
| **OpportunityCard** (V3; replaces JobCard) | variants: recommended · nearby · urgent · compact · featured; hierarchy IMAGE → match/status → title → host (+rating/WhiteWing) → location+time → **PAY (hero)** → skills chips → CTA; states: saved(fav on), loading(skeleton), pressed |
| **SearchBar** (V3) | marketplace search pill, icon + placeholder "Search work, skills or location", focus state, overlay on hero |
| **CategoryShortcut** (V3) | 52dp tinted icon tile + label, single-select, pressed scale; categories: Nearby/Today/High Pay/Part Time/Events/Warehouse/Construction/Delivery |
| **MatchRing** (V3) | circular conic-fill badge 0–100% + count-up; lg variant with ✓ breakdown list (skill/location/availability/experience) |
| **WhiteWingBadge** (V3) | pill `tint` bg + wing icon + "WhiteWing"; on cards, profiles, queue, formation |
| **TrustScore** (V3) | ring (score/5) + stat tiles (completed/attendance/reviews) + 4 breakdown bars; never credit-score styling |
| **FormationAvatars** (V3) | avatar cluster w/ confirmed/pending status dots + legend; member rows below |
| **SeatDots** (V3) | headcount `●●●○○○ 3 of 6` + count label |
| **MoneyDisplay** (V3) | display-face ₹ figure with size variants (md/hero/mega) + unit suffix + delta chip |
| **AttentionBanner** (V3) | icon tile + text + arrow; variants: info/money/warn/hot; full-row tap target |
| **CountdownRing** (V3) | conic ring + mm:ss (FlashMatch offer, QR refresh); pulse variant |
| **ProgressRing** (V3) | work-mode shift progress + live timer center; check-in/out states |
| **EarningsChart** (V3) | 7-column bar chart w/ peak highlight; static data, animated height |
| **Timeline** (V3) | done/wait/pending dots + connector; used in payment states + hired next-steps |
| **TopHeader / HomeHero** (V3) | gradient brand header (title/sub/action) and marketplace hero (greeting+location+bell) per §2 header tokens |
| **ApplicationCard** | status chip + job summary + next-step hint ("Employer reviewing") |
| **QueueRow** | avatar, name, rating, distance, KYC badge, conflict warning; selected state for bulk |
| **RosterRow** | avatar, status chip, check-in/out times, manual mark button, approve toggle |
| **EarningRow** | amount (paise→₹ formatter once), status chip, job + dates, adjustment reason if any |
| **OfferCard (Quick Match)** | countdown timer ring, respond-by time, Accept/Decline (large), expiring-soon pulse |
| **StatusChip** | all statuses above; single color map |
| **KYCBadge** | verified check / pending clock / rejected cross — never color alone (icon + label) |
| **Sheet (bottom)** | filters, decisions, reasons, role select; swipe + button dismiss |
| **Modal (dialog)** | confirmations with consequence copy (cancel/release/suspend) |
| **Toast/Snackbar** | success/info/error; retry affordance when safe (§24) |
| **Skeleton** | list + detail variants; pulse, never spinner-only |
| **EmptyState** | illustration slot + explanation + ONE CTA ("No jobs yet — try widening dates") |
| **ErrorState** | cause text + retry + requestId (5xx only) + support link |
| **Banner** | offline, maintenance (503), KYC gate ("Verify to get hired") |
| **Avatar** | initials fallback; photo URL short-lived |
| **RatingStars** | read (×.5) + input (tap + label "4 of 5"); tags multi-select chips |
| **QR display / scanner** | employer: auto-rotating QR + manual roster fallback; worker: camera scan → result sheet (in/out, time) |
| **ProgressHeader** | job creation wizard steps (details → workdays → pay → review) with draft-saved indicator |
| **AddressReveal** | locked until hire (§18); unlocked card shows full address + map link |

## 4. Navigation — final check vs architecture §10

- **Worker (5 tabs, V3):** Home (marketplace: greeting + location + search + categories + Recommended + Nearby + FlashMatch strip + week earnings preview) · Explore (opportunity feed + filters) · My Work (today's shift + live Work Mode: check-in → timer → check-out) · Earnings (month hero + chart + payment history) · Me (profile, TrustScore, skills, availability, KYC, prefs). Activity/Flight Requests opens from the Home bell (stack, not tab); FlashMatch opens contextually from Home/banner (stack).
- **Host (5 tabs, V3):** Home (workforce-today hero + seat dots + attention banners + live opportunities) · Opportunities (own + create + manage) · Workers (application queue + worker discovery + crew; attendance/roster opens from here per job) · Payments (approve → record states; per-job earnings detail) · Me (org profile, TrustScore, KYC, prefs). Queue ≠ crew preserved inside Workers; Attendance, Post, Candidates, QuickMatch stay contextual stacks.
- **Admin (separate web app):** sidebar — Dashboard · KYC queue · Users · Jobs moderation · Complaints · Payments oversight · Config & flags · Audit view (admin-only). ✓ matches §10.
- **Stacks:** auth stack (phone → OTP → role → first-run) sits before tabs; each tab keeps its own stack (detail screens push over their tab); bottom sheets for decisions; deep links: `job/:id`, `application/:id`, `quickmatch/:offerId`, `notification/:id` → context screen.
- **Route names implemented so far (foundation):** `src/app/index.tsx` (dev hub), `(auth)/login`, `worker/*`, `employer/*` — route structure follows §10; admin web separate (`Admin/`).

## 5. Copy guidelines & string keys

- **Rules:** sentences ≤ 12 words; second person ("You're hired"); cause-first errors ("Job already filled" before apology); numbers localized (₹1,500 with Indian grouping); no server jargon ever (no "409", no "undefined") — codes map to strings.
- **String keys:** `common.*` (buttons/labels) · `errors.<CODE>` (one per error catalog code — §24) · `job.*` · `application.*` · `attendance.*` · `payment.*` · `kyc.*` · `complaint.*` · `rating.*` · `event.<eventKey>` (notification titles from contracts/events.ts). File: `Mobile App/src/i18n/strings.ts` (grows into en/ta locale files at Wave UI); **Tamil required for: worker tab labels, job cards, apply/hire/attendance/payment flows** (workers see this daily); admin stays English.
- **Example mapping:** `errors.JOB_ALREADY_FILLED` → "This job is just full." + inline suggestion "2 similar jobs nearby".
