# SWON — EXISTING FRONTEND & UI/UX AUDIT

Scope: `C:\Users\kathi\WorkBridge\Mobile App` (the Expo/React Native client). Read-only audit — no code was modified.
Classification legend used throughout: [IMPLEMENTED], [PARTIALLY IMPLEMENTED], [PLACEHOLDER], [MOCK], [DOCUMENTED ONLY], [MISSING], [BROKEN], [UNCLEAR].

---

## 1. Executive Summary

SWON is a React Native + Expo mobile client for a temporary-workforce marketplace (workers + employers/hosts + a separate web Admin app). The client is broadly **feature-complete at the UI/API layer**: every major workflow (auth → role → profile → jobs → applications → hiring → attendance → payments → ratings → notifications → KYC) has a real screen wired to a real backend endpoint through a typed API client. There is no mock-data UI in the core flows.

The main gaps are **horizontal not vertical**: an SOS/emergency feature and location/maps are only in documentation, dark-mode tokens exist but are not switched on, the QR scanner is partially implemented (generation real, scanning limited), and there are several edge/dev screens. During recent work several systemic bugs were found and fixed at the root (React Compiler breaking controlled inputs; stale JWT role blocking job creation). The current build also ships with **React Compiler disabled** (`app.json` → `experiments.reactCompiler:false`) and **login re-enabled** on the entry path.

## 2. Repository / Technology Overview

- **Expo SDK `~57.0.25`**, **React Native `0.86.3`**, **React `19.2.3`** (`package.json`)
- **Routing:** `expo-router ~57.0.23`, entry `expo-router/entry`; file-based routes under `src/app/`
- **State:** `zustand ^5.0.15` (global session) + `@tanstack/react-query ^5.103.2` (server state, React Query)
- **Forms:** `react-hook-form ^7.88.0` (+ `zod` for schema/validation helpers)
- **Styling:** `StyleSheet` + a central design-token module `src/constants/theme.ts` (light+dark palettes). No Tailwind/NativeWind.
- **Icons:** `@expo/vector-icons` (Ionicons)
- **Animation:** `react-native-reanimated 4.5.1` (+ `react-native-worklets`), `expo-linear-gradient`, `expo-glass-effect`
- **Data fetching:** the fetch-based transport in `src/api/client.ts` (envelope unwrap + unified `AppError`)
- **Storage:** `expo-secure-store` for tokens; `@react-native-community/netinfo` for offline banner
- **Other natives:** `expo-image-picker` (uploads), `react-native-qrcode-svg` (QR generation), `@expo/ui`, `expo-symbols`, `expo-web-browser`, `expo-device`, `expo-system-ui`, `expo-font`
- **TypeScript:** strict; path alias `@/* → ./src/*`, `@/assets/* → ./assets/*` (`tsconfig.json`)
- **Lint:** `eslint-config-expo` flat config (`eslint.config.js`)
- **Tests:** `jest-expo`; a unit test exists at `src/store/__tests__/session.test.ts`

**Config (`app.json`):** name "SWON", slug `workbridge`, scheme `workbridge`, portrait, `userInterfaceStyle: "automatic"`, Android package `com.anonymous.workbridge` (legacy WorkBridge id), adaptive icon, splash on teal `#0B4540` with SWON wordmark. `experiments.reactCompiler: false` (was `true`; disabled to fix controlled-input focus bugs). New Architecture is the RN 0.86 default.

**Public env** (`src/config/env.ts` + `.env.example`): `EXPO_PUBLIC_API_URL` (prod `https://api.swon.in/api/v1`; localhost example), `EXPO_PUBLIC_APP_ENV`. Note: `.env.staging.example` uses `EXPO_PUBLIC_ENV`/`EXPO_PUBLIC_OTP_SIM_MODE`, which the code does not read — a config-template mismatch.

## 3. Current Application Architecture

- **Providers** (`src/app/_layout.tsx`): loads Manrope + Bricolage Grotesque fonts once, wraps app in `QueryClientProvider` → `SafeAreaProvider` → `StatusBar` → `OfflineBanner` → root `Stack` (`headerShown:false`). Session hydration via `useSession((s)=>s.hydrate)`.
- **Route groups:** `(auth)/` (pre-auth Stack: login, otp, role, profile), `worker/` (role stack), `employer/` (role stack). All layouts are thin `Stack` wrappers (`headerShown:false`).
- **Entry router** (`src/app/index.tsx`): after hydration — no token → `router.replace('/login')`; token + `/me` ok → role null ? `/role` : `/worker`|`/employer`; `/me` 401 → clear session → `/login`; transient network error → retry panel with a "Sign in" ghost action to `/login`.
- **Auth model:** phone → `POST /auth/otp/request` (dev/sim returns `devCode` on screen) → OTP screen → `POST /auth/otp/verify` returns token pair + account → stores in SecureStore, routes new/no-role accounts to `/role`.
- **Transport** (`src/api/client.ts`): attaches `Bearer` token, unwraps the `{ data }` envelope, maps failures to `AppError` (network/validation/auth/permission/not_found/conflict/rate_limit/server/unknown), and does a **silent refresh + single retry on `401` AND on `403 ROLE_REQUIRED`** (refresh re-reads role from the account row — this is how a freshly-onboarded employer can create a job on the same login token).
- **Session store** (`src/store/session.ts`): zustand; tokens in SecureStore on device, in-memory map on web; actions `hydrate`, `setTokens`, `setAccount`, `clearSession`.

## 4. Complete Screen Inventory

36 route files under `src/app/`. (IDs are synthetic for the audit.)

| ID | Route (file) | Screen / export | Role | Status |
|---|---|---|---|---|
| R0 | `/` (`index.tsx`) | `Index` entry router | – | [IMPLEMENTED] |
| R1 | `/login` (`(auth)/login.tsx`) | `LoginScreen` — phone → OTP | – | [IMPLEMENTED] |
| R2 | `/otp` (`(auth)/otp.tsx`) | `OtpScreen` — 6-digit code, dev hint | – | [IMPLEMENTED] |
| R3 | `/role` (`(auth)/role.tsx`) | `RoleScreen` — worker/host pick | – | [IMPLEMENTED] |
| R4 | `/profile` (`(auth)/profile.tsx`) | `ProfileScreen` — minimal profile + role commit (`POST /me/onboarding`) | both | [IMPLEMENTED] |
| R5 | `/worker` (`worker/index.tsx`) | `WorkerHomeScreen` — marketplace home, 5-tab | worker | [IMPLEMENTED] |
| R6 | `/worker/profile` (`worker/profile.tsx`) | `WorkerProfileScreen` — about/skills/availability/photo | worker | [IMPLEMENTED] |
| R7 | `/jobs` (`jobs.tsx`) | `JobsFeedScreen` — discovery feed + filters | worker | [IMPLEMENTED] |
| R8 | `/job/[publicId]` (`job/[publicId].tsx`) | `JobDetailScreen` | worker | [IMPLEMENTED] |
| R9 | `/applications` (`applications.tsx`) | `ApplicationsScreen` — my applications | worker | [IMPLEMENTED] |
| R10 | `/offers` (`offers.tsx`) | `OffersScreen` — FlashMatch offers | worker | [IMPLEMENTED] |
| R11 | `/earnings` (`earnings.tsx`) | `EarningsScreen` — my earnings | worker | [IMPLEMENTED] |
| R12 | `/attendance` (`attendance.tsx`) | `TodayScreen` — "My Work" today + QR | worker | [PARTIALLY IMPLEMENTED] (scan) |
| R13 | `/rate` (`rate.tsx`) | `RateScreen` — double-blind rating | both | [IMPLEMENTED] |
| R14 | `/complaints` (`complaints.tsx`) | `ComplaintsScreen` | both | [IMPLEMENTED] |
| R15 | `/inbox` (`inbox.tsx`) | `InboxScreen` — notifications | both | [IMPLEMENTED] |
| R16 | `/prefs` (`prefs.tsx`) | `PrefsScreen` — notification prefs | both | [IMPLEMENTED] |
| R17 | `/verify` (`verify.tsx`) | `VerifyScreen` — KYC flow | both | [IMPLEMENTED] |
| R18 | `/employer` (`employer/index.tsx`) | `EmployerHomeScreen` — host dashboard | host | [IMPLEMENTED] |
| R19 | `/employer/jobs` (`employer/jobs.tsx`) | `EmployerJobsScreen` — my opportunities | host | [IMPLEMENTED] |
| R20 | `/employer/post` (`employer/post.tsx`) | `PostJobScreen` — create/publish job | host | [IMPLEMENTED] |
| R21 | `/employer/quickhire` (`employer/quickhire.tsx`) | `QuickHireScreen` — thin hub reusing endpoints | host | [IMPLEMENTED] (thin) |
| R22 | `/employer/workers` (`employer/workers.tsx`) | `HostWorkersScreen` — roster | host | [IMPLEMENTED] |
| R23 | `/employer/payments` (`employer/payments.tsx`) | `HostPaymentsScreen` | host | [IMPLEMENTED] |
| R24 | `/employer/profile` (`employer/profile.tsx`) | `EmployerProfileScreen` | host | [IMPLEMENTED] |
| R25 | `/employer/queue/[publicId]` | `EmployerQueueScreen` — apps + crew | host | [IMPLEMENTED] |
| R26 | `/employer/quickmatch/[publicId]` | `QuickMatchLaunchScreen` | host | [IMPLEMENTED] |
| R27 | `/employer/candidates/[publicId]` | `CandidatesScreen` — matched workers | host | [IMPLEMENTED] |
| R28 | `/employer/attendance/[publicId]` | `EmployerAttendanceScreen` | host | [IMPLEMENTED] |
| R29 | `/employer/earnings/[publicId]` | `EmployerEarningsScreen` | host | [IMPLEMENTED] |
| R30 | `/dev` (`dev.tsx`) | `DevHubScreen` — TEMPORARY dev hub | – | [PLACEHOLDER] (dev-only) |
| R31 | `/design-kit` (`design-kit.tsx`) | `DesignKitScreen` — token/component gallery | – | [PLACEHOLDER] (intentional demo) |

### 5. Complete Navigation Map

```
APP (Stack, headerShown:false)  [_layout.tsx: providers + fonts]
├── "/" index (entry router)
├── (auth) Stack
│   ├── /login ──push──> /otp ──replace──> /role | /worker | /employer
│   ├── /role ──push──> /profile
│   └── /profile ──replace──> /worker | /employer
│
├── Worker (Stack) — 5-tab bar (Screen `tab`)
│   /worker (home) · /jobs (explore) · /attendance (work) · /earnings · /worker/profile
│   -> detail pushes: /job/[id] · /applications · /offers · /rate · /complaints · /verify · /inbox · /prefs
│
├── Employer (Stack) — 5-tab bar
│   /employer · /employer/jobs · /employer/workers · /employer/payments · /employer/profile
│   -> pushes: /employer/post · /employer/quickhire · /employer/queue/[id] · /employer/quickmatch/[id]
│             /employer/candidates/[id] · /employer/attendance/[id] · /employer/earnings/[id] · /verify · /complaints · /inbox
│
└── Shared: /applications /attendance /complaints /earnings /inbox /job/[id] /jobs /offers /prefs /rate /verify
            /dev /design-kit
```

- **Tab definitions** (`src/components/TabBar.tsx`): Worker `home/explore/work/earnings/profile` → `/worker`,`/jobs`,`/attendance`,`/earnings`,`/worker/profile`; Host `home/opportunities/workers/payments/profile` → `/employer`,`/employer/jobs`,`/employer/workers`,`/employer/payments`,`/employer/profile`. Each tab row is a `Pressable` → `router.push(href)`; detail/stack screens render no tab bar.
- **Role/auth gating:** There is **no route-level guard component**. Routing to worker/employer is decided by the entry router (`index.tsx`) and by `otp.tsx`/`profile.tsx` after onboarding. Any authenticated/role screen reached out-of-place would still call authenticated, role-guarded endpoints (backend 403). `/dev` and `/design-kit` are reachable by direct URL only (no tab/home link; `index.tsx` routes the `admin` role to `/dev`, "admin console lives in the Admin app").
- **Orphan/dead routes:** `/design-kit` is linked only inside its own file (no navigator entry). `/dev` is reached only via the admin-role branch of the entry router. `job/[publicId]` is pushed from feed/worker home; complaint/earnings/attendance detail links exist. No duplicate route paths found.
- **Auth-redirect behavior (`index.tsx`):** no token → `/login`; `/me` 401 → clear + `/login`; `/me` network error → inline retry card (not auto-redirect). [IMPLEMENTED]

## 6. Worker User Journey (as implemented)

1. Login → OTP → (new) `/role` → (worker) `/profile` → **onboard** (`POST /me/onboarding`) → `router.replace('/worker')` — GREEN
2. Worker home (`/worker`) loads `/me` + `GET /jobs?...` feed (DATE_DESC) + offers + earnings + unread badge — GREEN
3. Discover (`/jobs` feed, search, sort chips, filters) → GREEN
4. Job detail (`/job/[publicId]`) — apply action → `POST` apply → goes to `/applications` — GREEN
5. Applications (`/applications`, `['my-apps']`) — status list — GREEN
6. Offers (FlashMatch `['my-offers']`) — accept/reject mutation — GREEN
7. Work today (`/attendance`, `['attendance-today']` + `/attendance/check`) — present **QR** for host scanning; worker-side check-in/out — YELLOW (scanning side lives with host)
8. Earnings (`/earnings`, `['my-earnings', filter]`, `/earnings/approve` via attendanceApi/paymentsApi) — GREEN; rating `['ratings-pending']` + submit — GREEN
9. Complaints, inbox, prefs, verify(KYC) — GREEN

## 7. Employer User Journey (as implemented)

1. Login → OTP → `/role` → (host) `/profile` → **onboard** (`POST /me/onboarding` employer w/ area dropdown) → `router.replace('/employer')` — GREEN
2. Host home (`/employer`) — `/me` + `POST`/`GET /jobs/mine`, quick actions — GREEN
3. My opportunities (`/employer/jobs`) — `['jobs-mine']`, filters — GREEN
4. **Create/publish job** (`/employer/post`): `POST /jobs` (draft) then `POST /jobs/:id/publish`; publishing without verified KYC surfaces the server KYC gate inline; form uses RHF + the new `Dropdown` (category/area/pay-type) and `DateField` (calendar) components — GREEN. (Draft/save + publish both run full client validation; the backend creates DRAFT then publish enforces KYC.)
5. Applications/crew (`/employer/queue/[publicId]`) — `['queue']`, `['crew']`, decisions/hire — GREEN
6. Quick Hire (`/employer/quickhire` + `/employer/quickmatch/[publicId]`) — thin screens reusing `/jobs/mine` and matching `/quick-match` availability — GREEN (thin)
7. Candidates (`/employer/candidates/[publicId]`, `['candidates',id]`) — matched/scored workers — GREEN
8. Crew attendance (`/employer/attendance/[publicId]`, `['attendance-token',id,date]`, `/attendance/approve`, `/attendance/check`) — host scans worker QR, approves — YELLOW (scanning)
9. Payments/earnings (`/employer/payments`, `/employer/earnings/[id]`, `/earnings/approve`, `/earnings/mark-paid`) — GREEN
10. Host profile (`/employer/profile`) — `/me`, catalog, sessions; org edit via `/me/org` — GREEN

## 8. Authentication & Onboarding

- Login (`login.tsx`): phone regex `^[6-9][0-9]{9}$`, RHF Controller, `POST /auth/otp/request`. Dev/sim returns `devCode` shown inline. [IMPLEMENTED]
- OTP (`otp.tsx`): 6-digit boxes over one hidden input, `POST /auth/otp/verify`, cooldown countdown + resend, 5-attempt lockout surfaced server-side, then routes new/no-role → `/role`. [IMPLEMENTED]
- Role (`role.tsx`): worker/host cards → `/profile`. [IMPLEMENTED]
- Profile/onboarding (`(auth)/profile.tsx`): worker (fullName,bio,experienceYears) or host (orgName,contactName,city,address,area-dropdown); `POST /me/onboarding` writes role (one per account); employer area is a `Dropdown` (was chip+search). [IMPLEMENTED]
- Session persistence via SecureStore; silent refresh wired in `client.ts`. [IMPLEMENTED]
- **Known nuance:** a new token minted at verify carries role `null`; onboarding updates the DB role, and the FIRST role-gated call (e.g. `POST /jobs`) hits `403 ROLE_REQUIRED`, which `client.ts` auto-refreshes and retries — this is the designed (and now verified) behavior.

## 9. KYC Flow (`verify.tsx` + `kycGate.tsx` + `src/api/kyc.ts`)

Step: pick ID type (PAN/VOTER/DRIVING/PASSPORT) → ID number + consent (`2026-09-v1`) → Start (`POST /kyc` → DRAFT) → upload ID front, ID back, selfie via presigned ticket (`POST /kyc/documents/upload-ticket` → multipart PUT) → Submit (`POST /kyc/submit` → SUBMITTED/UNDER_REVIEW) → admin decides → VERIFIED or REJECTED (reason + retry, max attempts). Status banner + WhiteWing badge once verified. `kycGate.tsx` gates apply/FlashMatch/publish actions behind `KYC_REQUIRED` (403) and deep-links to `/verify`. **Admin review happens in the separate Admin web app** (not this repo). — [IMPLEMENTED] (mobile side)

## 10. Job Marketplace Flow

- Feed (`/jobs`): `['jobs-feed', q, sort]`, `GET /jobs?…`, search + sort chips + welfare filters. [IMPLEMENTED]
- Detail (`/job/[publicId]`): `['job', id]`, `GET /jobs/:id`; apply → applications; complaint deep-link. Only shows welfare/eligibility from real `JobCard`. [IMPLEMENTED]
- Post (`employer/post.tsx`): real `POST /jobs` + publish; catalog/welfare fetched real. New `Dropdown`+`DateField`. [IMPLEMENTED]

## 11. Application & Hiring Flow

- Worker: `applications.tsx` `['my-apps']`/`['my-apps-active']`; apply from job detail. [IMPLEMENTED]
- Host: `queue/[publicId]` `['queue']`, `['crew']`; quickmatch `['quick-hire-availability']`; candidates `['candidates',id]` (`/quick-match`). Decisions/hire mutations present. [IMPLEMENTED]

## 12. Crew / Attendance / Work Completion

- Worker `/attendance`: `GET /attendance/today` + check mutation + QR presentation. [PARTIALLY IMPLEMENTED]
- Host `/employer/attendance/[id]`: token TTL ring, QR scan card, `/attendance/approve`, `/attendance/check`. [PARTIALLY IMPLEMENTED] — **no camera/scanner library installed** (`react-native-qrcode-svg` generates; there is no camera/scanner to decode), so physical QR scanning is not fully functional in this repo. Work completion is implied by attendance + earnings approval endpoints.

## 13. Payment Flow

- Worker `/earnings` (`['my-earnings',filter]`), host `/employer/payments` + `/employer/earnings/[id]`. Real endpoints `/earnings/approve`, `/earnings/mark-paid`. Funds/fints integration: [UNCLEAR] — no external payment SDK installed; payment recording is backend-managed.

## 14. Rating / Reputation

- `rate.tsx`: double-blind; `['ratings-pending']`, submit `POST /ratings`, summary `['rating-summary']` / `GET /me/rating-summary`. TrustScore ring on host/worker profile. [IMPLEMENTED]

## 15. Notification System

- `inbox.tsx` (`['inbox']`, `['inbox-unread']`, `POST /notifications/read` mark-all), `prefs.tsx` (`['notification-prefs']` push/SMS mute + quiet hours), unread badges on worker home. Push transport/SMS provider: [UNCLEAR] / [DOCUMENTED ONLY] (no FCM/Expo-push client code found).

## 16. Safety / Welfare / SOS

- **Welfare** (job benefits: food/transport/safety) is real in the job domain (`welfare` catalog + chips on post, badges on job cards). [IMPLEMENTED]
- **SOS / emergency / panic:** only a string match inside `employer/quickmatch/[publicId].tsx`, no feature code. **No SOS/emergency screen or flow.** [DOCUMENTED ONLY / MISSING].
- **Location/maps/geolocation:** **no `expo-location` / map SDK installed**. "Location" appears only as consent copy on login/otp/role and text on job/attendance screens. [DOCUMENTED ONLY / MISSING].

## 17. Admin UI

- **Not in this mobile repo.** The product has a separate web **Admin** console at the repo root (`/c/Users/kathi/WorkBridge/Admin`). In mobile, `/dev` is a temporary dev hub and the entry router routes the `admin` role → `/dev` with the note "admin console lives in the Admin app." [PLACEHOLDER for admin within mobile; Admin app is separate]

## 18. Existing Design System

**Color system (light, `src/constants/theme.ts`):**
- text `#10201E` · background (warm canvas) `#F6F3EC` · card `#FFFFFF` · border `#E4DDD0` · line `#EFEAE0` · textMuted `#4F5F5C`
- primary (teal) `#0F766E` · primaryDark `#115E59` · primaryDeep `#0B4540` · primaryLight `#CCFBF1` · tint `#EFFCF9` · onPrimary `#FFFFFF`
- success `#15803D` · warning `#B45309` · danger `#B91C1C` · info `#1D4ED8`
- accents: orange `#F97316` · amber `#F59E09` · yellow `#FDE047` · coral `#EF5B47` · green `#16A34A` · blue `#2563EB` · lavender `#8B7CF6`
- `status` map (fg/bg) for every job + employment + attendance + payment status; overlay `rgba(15,23,42,0.45)`; scrim `rgba(16,32,30,0.45)`; barSurface, onBrandSurface/`rgba(255,255,255,0.16)`, onBrandBorder, onPrimarySoft; disabledBg `#A7BDB9`; dangerSoft `#FEE2E2`; coralSoft `#FFF1ED`; warningSoft `#FFF7ED`.
- **Dark palette is fully defined** (`Colors.dark`) but **not wired** — `statusColors`/screens read `light`; no `useColorScheme` switch active.

**Typography:** display = `BricolageGrotesque_800ExtraBold` (600 = `displaySemi`); body = `Manrope` (400/600/700/800). `TypeScale`: caption 12/16, bodySm 14/20, body 16/24, titleSm 18/24, title 22/28, display 30/36, heroAmount 34/40, mega 44/48. Design principle: min body 16.

**Spacing (4-grid):** half 2, one 4, two 8, mid 12, three 16, four 24, five 32, six 64. **Radius:** sm8 · md12 · btn14 · lg18 · xl24 · xxl30 · pill999. **Touch min:** 48. **MaxContentWidth:** 800.

**Gradients:** teal `[#0F766E,#0B4540]`, warm `[#F97316,#F59E0B]`, money `[#16A34A,#0F766E]`, deep `[#0B4540,#10201E]`, sun `[#FDE047,#F97316]`, arc (white fade). **Elevation:** card/lift/btn/barTop/pop/sheet (Platform-specific). **Motion:** fast140 · base220 · enter250 · count750, `ease-out`.

## 19. Component Inventory

`src/components/`:
- **screen.tsx** — `Screen` (header + ScrollView + optional TabBar), `Card`, `Button` (variants primary/secondary/ghost/danger/warm/money/onDark, md/lg, pressed/disabled/loading)
- **ui.tsx** — `SearchBar`, `Chip`, `TextField`, `CategoryShortcut`, `IconButton`, `Avatar`, `StatusChip` + more
- **inputs.tsx** — `Dropdown` (modal single-select), `DateField` (month calendar modal) — new
- **motion.tsx** — `Enter` (FadeInDown), `Skeleton`, `useCountUp`
- **TabBar.tsx** — 5-tab bars (worker/host)
- **brandLogo.tsx**, **wingMotif.tsx** — brand lockup + motif
- **marketplace.tsx** — job cards / HomeCard / eligibility + photo-source helpers (used by worker home + job detail)
- **kycGate.tsx** — KYC action gate sheet
- **feedback.tsx**, **OfflineBanner.tsx**, **QR.tsx** — feedback UI, netinfo banner, QR view
- All marked [IMPLEMENTED] (QRScan capability [PARTIAL]).

## 20. UI Consistency Audit

- **Headers:** auth screens (login/otp/role) build their own full-bleed teal+grapheme shells, while `Screen` renders a compact header with a shirtless gradient header block; customer screens use `Screen`. Consistent within each family; two patterns by design.
- **Inputs:** `TextField` (ui.tsx) uses borderWidth 1, focus **recolor-only** (`fieldBoxFocus`); `PillField`s in `profile.tsx` (`collapsable={false}`, recolor-only focus); auth `login` focus recolor-only; `post.tsx` `Field` uses borderWidth 1 no focus style. Consistent after the New-Architecture focus-gate. `verify.tsx` TextInput uses borderWidth 1. Minor radius variance: PillField `Radius.pill` vs TextField `Radius.md` vs `post` `Radius.md` — [INCONSISTENT] radius per-field but deliberate per design sheet.
- **Buttons:** single shared `Button` for primary CTAs everywhere; several screens also have raw `Pressable`+Text pseudo-buttons (tab, chips) — consistent enough.
- **Cards:** `Card` (screen.tsx) + bespoke `marketplace`/home cards; auth forms use inline `View` cards with `Elevation.pop`. Consistent styling token-wise.
- **StatusChip:** centralized (theme `status` map) — highly consistent.
- Overall token adherence is strong (design plan: zero hex literals outside `theme.ts`).

## 21. Responsive / Device Audit

- Portrait-only; uses `SafeAreaView`/`useSafeAreaInsets`; tab bar pads bottom safe-area; ScrollViews on all screens; `keyboardShouldPersistTaps` on auth ScrollViews. MaxContentWidth 800 for center-column on large screens. Fixed `maxWidth`/heights on OTP boxes, avatar tiles, tab glyphs (intentional). Forms are mostly flex column — small-phone friendly. **Notches/landscape** not explicitly handled (portrait assumption ok). Large-text accessibility sizing not specially handled (TypeScale fixed px). [Good baseline; orientation/large-phones untested in repo]

## 22. Accessibility Audit

- Accessible roles/labels on most interactive elements (`accessibilityRole`, `accessibilityLabel`, `accessibilityState`) — TabBar, buttons, chips, role cards, OTP. Touch targets generally ≥48. **Issues:** several hex pairs may fall short of AA on text-muted/border at small sizes (not tested); `TextInput` focus rings are color-only for most fields (fieldBoxFocus borderColor/backgroundColor — no icon/label change); no dynamic-type scaling (fs are fixed); some raw `Pressable` + `Text` pseudo-buttons lack a11y label; color-only status conveyed also by labels (good). No screen-reader focus-order audit.

## 23. Animation / Motion Audit

- `Enter` (FadeInDown, default 240ms, `reduced-motion` honored) — used for headers/cards/list entrances (screen.tsx header, worker/employer lists).
- `brandLogo` entrance; `useCountUp` (money/figures, 750ms); Skeleton shimmer; attendance live-dot blink; FlashMatch pulse (Reanimated). All lightweight; driven by `react-native-reanimated` — consistent, brand-appropriate, reduced-motion-guarded. No heavy per-frame work found. [Performance: fine]

## 24. UI ↔ State ↔ API Connectivity

All core flows → React Query (`useQuery`) → typed API client → fetch → backend.
- Auth: `authApi` — REAL (11 endpoints)
- Jobs: `jobsApi` — REAL (feed/detail/mine/create/publish/cancel/remove/welfare)
- Applications: `applicationsApi` — REAL (`/applications`)
- Attendance/Payments: `attendanceApi`/`paymentsApi` — REAL (check/today/approve, earnings/approve, mark-paid)
- Complaints: `complaintsApi` — REAL (`/complaints`)
- KYC + notifications: `kycApi`+`notificationsApi` — REAL
- Matching: `matchingApi` — REAL (`/quick-match`)
- Ratings: `ratingsApi` — REAL
- **Mock/static UI:** only dev/dev-kit. Quick hire is real-data (thin). No hardcoded product data in main flows. **Documented-only:** SOS, maps/location, push/SMS delivery.

## 25. Form Audit

Admiral `react-hook-form` + `Controller` + zod. Notable forms:
- **Login:** 1 field (phone, `^[6-9]\d{9}$`), RHF, keyboard phone-pad.
- **OTP:** 6-digit hidden input over boxes; cooldown + resend; server attempt lockout.
- **Profile/onboarding:** worker 3 fields (fullName/bio/experienceYears) & host 5 (org/contact/city/address + area **Dropdown**); onboarding POST.
- **Post job:** title/description/address/payAmount/headcount (text), **Dropdown** category/area/pay-type, **DateField** start/end, times; full validation; Save draft + publish both gate on client validation; publish surfaces KYC gate.
- **Worker profile:** about + skills chips + availability slots + photo upload (`/me/photo`).
- **Host profile:** org fields, area dropdown, `/me/org`.
- **KYC:** id type tags + id number + consent switch + doc uploads; server-enforced transitions.
- **Verify/rate/complaints/inbox/prefs:** real forms/mutations.
- Input masking: phone free-text (validated); years/headcount numeric-masked (`\D`); OTP numeric. Validation errors inline via RHF `errors`.

## 26. Loading / Empty / Error States

- React Query errors surface via `errorMessage` + retry on main screens; skeleton/loading indicators on home/detail; well-crafted empty states (worker home "No offers", host "No opportunities", applications/earnings empties). Offline banner (NetInfo). **Gaps:** no shared skeleton pattern everywhere (some screens just `ActivityIndicator`/null), no optimistic/offline write UX. Mostly adequate for V1.

## 27. Performance Audit

- React Query caching + invalidation (good); tokenized styling (good). **Risks:** `/jobs` and `/jobs/mine` feed lists are `map` inside ScrollView (no `FlatList` virtualization) — large lists could drop frames; repeated full-screen re-renders on some home screens (several overlapping queries). Reanimated count-up runs per frame only when visible. No memoization on some heavy screens. **No FlatList/List optimization found.** (Not blocking for V1 scale.)

## 28. Code / Frontend Architecture Audit

- **Component reuse:** GOOD (shared Screen/Card/Button/Chip/StatusChip/Dropdown/DateField). Some duplication remains (several per-screen `PillField`/field styles).
- **Organization/theme:** EXCELLENT (single token module, zero hex literals outside it).
- **Navigation:** GOOD (Expo Router groups; no route guard component — screens rely on backend role enforcement).
- **State/API:** GOOD (zustand session + RQ server state + typed client + envelope/error taxonomy + silent refresh).
- **Duplication:** GOOD overall; magic numbers are few; TODO/FIXME: none found in `src/` (search clean; only false positives in `package-lock.json`).
- **DX:** platform-locked RN/Expo against stale SDK knowledge — an `AGENTS.md` codifies the "trust the docs, not memory" rule (good).

## 29. Feature Completion Matrix (from code evidence)

| Feature | Role | Status in code |
|---|---|---|
| Authentication (OTP) | all | [IMPLEMENTED] |
| Onboarding / role | all | [IMPLEMENTED] |
| Profile (worker+host) | both | [IMPLEMENTED] |
| KYC | both | [IMPLEMENTED] (mobile; admin review in Admin web) |
| Jobs (discovery/detail/post/publish) | both | [IMPLEMENTED] |
| Apply / applications | worker | [IMPLEMENTED] |
| Queue / crew / hire | host | [IMPLEMENTED] |
| Attendance (worker+host, QR) | both | [PARTIALLY IMPLEMENTED] (QR decode) |
| Payments / earnings | both | [IMPLEMENTED] (backend recording; no payout SDK) |
| Ratings | both | [IMPLEMENTED] |
| Notifications / prefs | both | [PARTIALLY IMPLEMENTED] (in-app + prefs; delivery SDK unclear) |
| Welfare | both | [IMPLEMENTED] |
| SOS / emergency | both | [MISSING / DOCUMENTED ONLY] |
| Location / maps | both | [MISSING / DOCUMENTED ONLY] |
| Emergency replacement | host | [UNCLEAR] (search found none in src) |
| Admin UI | admin | [PLACEHOLDER in mobile] — real admin in separate web app |

## 30. Current Completion Estimate (evidence-based, not the docs' 95%)

- Frontend/UI implementation: ~85% (all main screens + tokens; dev/flow/detail/QR gaps)
- Navigation: ~90% (fully wired; no route guards; a couple of dev-only reachable screens)
- Backend connectivity: ~90% (all main flows hit real endpoints; seamless refresh handled)
- Worker flow: ~85% (attendance QR decode gap)
- Employer flow: ~85% (quickhire thin; QR decode gap)
- Admin flow: ~5% inside this repo (separate web app)
- **Overall mobile-client functional completeness: ~85%.** The remaining ~15% is horizontal (SOS, maps, real push/SMS, dark-mode switch, QR decode, admin-in-app, polish) rather than missing core work.

## 31. Critical Issues (MUST FIX / MUST COMPLETE)

**MUST FIX (blocking/quality):**
1. Attendance QR **scan** is not truly functional (no camera/QR-decoder library) — worker/host check-in flow is incomplete at the scan step. [PARTIALLY IMPLEMENTED]
2. Dark-mode tokens exist but no mode switch — screens always render `light`; on a dark OS the app can look wrong. [PARTIAL]
3. Staging env template uses keys the code doesn't read (`.env.staging.example`), and prod config only defines `API_URL`/`APP_ENV` — env drift risk.

**MUST COMPLETE (product-defined but not in code):**
4. SOS / emergency / safety flow (guided workflow, alert) — [MISSING] / [DOCUMENTED ONLY].
5. Location / maps (radius-aware discovery, geo for attendance) — [MISSING] / [DOCUMENTED ONLY].
6. Real push notification / SMS integration on the client (inbox + prefs exist; delivery transport is backend/cloud).
7. Emergency replacement / backfill (host) — [UNCLEAR]/[MISSING].

**NICE TO HAVE:**
8. FlatList virtualization on long feed lists; reduce overlapping re-renders on home screens.
9. Route-level auth/role guards (guard screens, not just backend).
10. Dynamic-type/scaling + a11y pass on text-muted contrast; screen-reader focus order.
11. Remove `/dev` and `/design-kit` from production routing (or gate them behind a flag).

## 32. Remaining Work

A. Must fix: QR scan capability; dark-mode wiring; env-template alignment.
B. Must complete: SOS/emergency; location/maps; push/SMS delivery wiring; emergency replacement (if scoped).
C. Nice to have: list virtualization, route guards, a11y/scaling, dev-screen gating, feedback polish.

## 33. Recommended Execution Order

1. Fix QR attendance scan (add a scanner lib or a manual code-entry fallback; verify end-to-end).
2. Wire dark mode (switch on `userInterfaceStyle` + implement mode provider from `Colors.dark`).
3. Align env templates and document prod config.
4. Implement SOS/emergency flow + (if scoped) location/maps.
5. Add route/auth guards and gate `/dev`,`/design-kit`.
6. Persuade gross-performance (FlatList) + a11y polish.

## 34. FINAL SOURCE OF TRUTH (read this first)

- **Stack:** Expo SDK 57 · RN 0.86 · React 19.2 · expo-router · React Query · zustand · react-hook-form+zod · StyleSheet + `theme.ts` tokens · Ionicons · Reanimated. New Architecture on; `reactCompiler:false` (disabled). Android pkg `com.anonymous.workbridge`.
- **Colors (light):** primary `#0F766E` teal, primaryDeep `#0B4540`, bg `#F6F3EC`, card `#FFFFFF`, text `#10201E`, muted `#4F5F5C`, border `#E4DDD0`; success `#15803D` / warning `#B45309` / danger `#B91C1C`; accents orange/amber/yellow/coral/green/blue/lavender; full `status` fg/bg map; dark palette defined but unused.
- **Type:** display `BricolageGrotesque 800/600`; body `Manrope 400/600/700/800`; TypeScale caption12–mega44; body min 16. **Space:** 4-grid (2…64). **Radius:** 8/12/14/18/24/30/pill. **Touch:** ≥48. **Motion:** Reanimated ease-out 140/220/250/750ms.
- **Navigation:** Expo Router — root Stack; `(auth)` Stack (login→otp→role→profile); worker 5-tab + host 5-tab; detail stacks. Entry router: no token→/login; token+me→/|/role|/worker|/employer; 401→clear→/login. No route guards.
- **Screens (36):** entry, login, otp, role, profile, worker home, worker profile, jobs feed, job detail, applications, offers, earnings, attendance(today), rate, complaints, inbox, prefs, verify(KYC), employer home, employer jobs, post, quickhire, workers, payments, employer profile, queue/[id], quickmatch/[id], candidates/[id], attendance/[id], earnings/[id] + dev, design-kit (dev/demo).
- **API (all REAL via fetch):** auth(otp req/verify/logout/sessions), /catalog, /me(onboarding/org/skills/availability/photo/rating-summary), /jobs(feed/detail/mine/create/publish/cancel/remove) + /welfare/catalog, /applications, /attendance(today/check/approve), /earnings(approve/mark-paid), /complaints, /kyc(create/ticket/submit) + /notifications(read/unread), /quick-match, /ratings(pending/submit/summary). Transport unwraps {data}, unified AppError, silent refresh on 401 and 403 ROLE_REQUIRED.
- **Incomplete areas:** QR scan, dark-mode switch, SOS/emergency, maps/location, push/SMS delivery, emergency replacement, admin-in-app (separate web app), list virtualization, route guards, a11y/scaling.
- **Critical bugs (fixed this cycle):** React Compiler breaking controlled inputs → disabled; stale-JWT role blocking `POST /jobs` → handled via auto-refresh-on-403 (verified 201 DRAFT); closed-input focus dropped under New Arch → `collapsable={false}` + recolor-only focus; area/date on the job form were chip/typed → now `Dropdown` + `DateField`.
- **Design inconsistencies:** two header patterns (auth full-bleed vs `Screen`), per-field radius variance (pill vs md), raw pseudo-buttons vs `Button`; otherwise strong token adherence.

---

*End of audit. Nothing in the project was modified.*