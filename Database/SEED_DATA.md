# WorkBridge — Seed Data Requirements (Phase 1)

**Status:** DRAFT — content marked *(owner to confirm)* · **Date:** 2026-09-25
Seeds are code-reviewed migration files (`migrations/0002_seed_reference.sql` order), never runtime inserts. Re-seeding is idempotent (`INSERT … ON DUPLICATE KEY UPDATE` / public_id-stable).

---

## 1. Job categories *(owner to confirm list — launch market: Coimbatore + Tiruppur)*

| code | label (en) | label_ta (optional) | children (examples) |
|---|---|---|---|
| EVENT | Events & Weddings | நிகழ்வுகள் | Catering Service, Waiter/Service, Decoration, Sound/AV Helper, Photography Helper, Housekeeping (event) |
| HOSPITALITY | Hotels & Catering | உணவகம் | Kitchen Helper, Steward, Room Attendant, Dishwasher |
| RETAIL | Retail & Showroom | சில்லறை வியாபாரம் | Sales Assistant, Promoter, Cashier Helper, Stock Count |
| WAREHOUSE | Warehouse & Loading | கிடங்கு | Loader/Unloader, Packer, Forklift Helper, Inventory Count |
| LOGISTICS | Delivery & Logistics | போக்குவரத்து | Delivery Executive, Loader, Vehicle Cleaner |
| CONSTRUCTION | Construction & Labour | கட்டுமானம் | Mason Helper, Painter Helper, Electrician Helper, Plumber Helper |
| MANUFACTURING | Manufacturing & Units | தொழிற்சாலை | Machine Operator, Packing Operator, Quality Checker, Shift Helper |
| HOUSEKEEPING | Housekeeping & Cleaning | துப்புரவு | Cleaner, Sanitation Worker, Office Boy |
| HEALTHCARE_SUPPORT | Healthcare Support | சுகாதார உதவி | Patient Attendant, Ward Helper, Ambulance Helper |
| SECURITY | Security & Surveillance | பாதுகாப்பு | Security Guard, Bouncer |
| PROMOTION | Promotions & Field Sales | விளம்பரம் | Flyer Distributor, Brand Promoter, Survey Collector |
| TRANSPORT | Drivers & Transport | வாகனம் | Delivery Driver, Loader-driver, Auto/Tempo Helper |

Rules: parents have no pay defaults; each leaf category may carry `suggested_pay_min_paise` hints *(owner to confirm — shown only as guidance, employer always sets the real pay)*.

## 2. Welfare taxonomy (M5 — fixed codes, employer picks + optional note per job)

| code | label |
|---|---|
| MEAL_PROVIDED | Meal provided |
| DRINKING_WATER | Drinking water provided |
| REST_AREA | Rest area available |
| FIRST_AID | First-aid available |
| SAFE_TRANSPORT | Safe transport home (late shift) |
| SHOE_GLOVE_REQUIRED | Safety shoes/gloves required (given) |
| POSH_AWARE | Workplace conduct rules displayed |
| SHADE_BREAK | Shade + regular breaks (outdoor work) |
| PAY_DAY_INFO | Pay day clearly stated |

*(owner to confirm final set — must stay small and plain-language for low-literacy users.)*

## 3. Location reference (`area` seed)

- **Coimbatore:** Singanallur, Ganapathy, Peelamedu, R.S. Puram, Saibaba Colony, Kuniamuthur, Pollachi Road, SIDCO Kurichi, Vadavalli, Race Course, Gandhipuram, Ukkadam, Kuniamuthur IDC, Perur, Sulur *(owner to confirm launch list)*
- **Tiruppur:** Avinashi, Kangayam Road, Nehru Nagar, Thirumuruganpoondi, Palladam Road, Porcupillai, Mangalam, Udumalpet Road, Kangeyam, Dharapuram Road *(owner to confirm)*
- City rows: `Coimbatore`, `Tiruppur` (+ Tamil names: கோயம்புத்தூர், திருப்பூர்).

## 4. Skills (starter set — leaves of the taxonomy, extensible)

Catering Service · Waiter · Kitchen Helper · Dishwasher · Housekeeping · Cleaning · Mopping · Decoration · Sound/AV · Photography Helper · Loading · Unloading · Packing · Cleaning · Packer · Forklift Helper · Sales · Promoter · Flyer Distribution · Survey · Mason Helper · Painter Helper · Electrician Helper · Plumber Helper · Machine Operator · Quality Check · Packing Operator · Security Guard · Bouncer · Patient Attendant · Delivery · Driving (LMV) · Steward · Room Attendant · Inventory Count · Cashier · Data-entry Helper · Office Boy *(owner to confirm additions — Tamil labels optional field).*

## 5. Platform config seeds (`platform_config`)

| key | seeded value | notes |
|---|---|---|
| MATCH_WEIGHTS | {location:30, availability:25, skills:20, rating:15, reliability:10} | sums 100 (§16 proposal — **owner sign-off at gate**) |
| QUICKMATCH_EXPIRY_SEC | 1800 | 30 min (§36a #16 proposal) |
| QUICKMATCH_WAVE_MULTIPLIER | 2, cap 10 | |
| OTP_MAX_ATTEMPTS / OTP_TTL_SEC | 5 / 120 | |
| OTP_COOLDOWN_SEC | 60 | |
| KYC_ATTEMPT_CAP | 3 | |
| RATING_WINDOW_DAYS | 14 | after COMPLETED |
| GRACE_DAYS_CLOSE | 7 | job COMPLETED→CLOSED grace |
| ATTENDANCE_TOKEN_TTL_SEC | 60 | rotating QR |
| ATTENDANCE_AUTO_CLOSE_GRACE_MIN | 30 | |
| COMPLAINT_PARTY_TIMEOUT_DAYS | 7 | CLOSED_TIMEOUT sweep |
| SUPPORT_CONTACT | *owner to supply* | shown in app |

## 6. Out of scope for seeds

Pay defaults are NOT seeded (employer always sets pay). No fake employers/workers/jobs in production seeds — dev-only fixtures live in `prisma/seed.dev.ts` (excluded from production migration path).
