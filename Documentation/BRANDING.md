# SWON — Product Branding Note

**Effective:** 2026-09-28 (owner-ordered rebrand; display + terminology only — no architecture, API, schema or logic changes)

## Product name

- **Product name: SWON** — always this capitalization. Never Swan / SWAN / Swon, and never prefixed to feature names (no "SWON Job", "SWON Match").
- **Admin web title:** SWON Admin.
- **Kept as technical identifiers (deliberately unchanged):** repository folder `WorkBridge/`, package names (`workbridge-mobile`, `workbridge-backend`, `workbridge-admin`, `@workbridge/contracts`), database names (`workbridge_dev` / `workbridge_test`), API health service id (`workbridge-api`), Expo `slug`/`scheme`, Android `package` (`com.anonymous.workbridge`), route paths (`/jobs`, `/employer/quickmatch/…`), and all code identifiers (models, endpoints, event keys, error codes). Changing these would break tests, deep links or deployments for zero user benefit.

## Product vocabulary (user-facing layer)

| Concept | SWON term | Notes |
|---|---|---|
| Worker community | **Flock** | community/group sense; the role label "Worker" stays |
| Employer | **Host** | role label, dashboards, copy |
| Job | **Opportunity** | UI copy only; API/DB keep `job` |
| Application | **Flight Request** | apply flow, list titles, notifications |
| Matching | **Pairing** | where it reads naturally |
| Hiring | **Bond** | hire action, HIRING/HIRED status display |
| Work crew | **Formation** | crew tab/roster copy |
| Referral | **Invite** | no referral feature exists yet — term reserved |
| Reward points | **Feathers** | no points system exists yet — term reserved, nothing to rename |
| Reputation score | **TrustScore** | no "reputation score" label exists yet — applies when the rating aggregate gets a label |
| Verification badge | **WhiteWing** | badge only — KYC logic, consent text and review flow untouched |
| Quick Match | **FlashMatch** | feature renamed everywhere user-facing; wave/offer logic untouched |
| Worker replacement | **WingSwap** | no replacement feature exists in V1 — term reserved |
| Emergency replacement | **RescueFlight** | no emergency-replacement feature exists in V1 — term reserved |

## Rules applied

- Branded where it adds identity, standard where it adds clarity: Payment, Attendance, KYC, Complaint, Account, Phone number, Settings, Date, Time, Location, Amount, Earnings stay standard.
- The KYC consent paragraph keeps its exact wording (`Mobile App/src/i18n/strings.ts` + `packages/contracts/src/kyc.ts` — must stay identical): consent is legal copy tied to stored consent records and is an owner approval item, not a branding item.
- Server error messages keep standard English ("…opportunity" appears only where the copy was already being touched); clients branch on error codes, never on message text.
- Technical docs (Database/, architecture history, audit log) keep historical `WorkBridge` references where they record a point-in-time fact.
