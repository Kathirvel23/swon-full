# SWON

Temporary workforce marketplace & workforce-management platform. **Product name: SWON.** The repository folder (`WorkBridge/`) and package names (`workbridge-*`) keep the original technical prefix — they are identifiers, not branding. See `Documentation/BRANDING.md`.

**Mobile:** React Native + Expo + TypeScript · **Backend:** Node.js LTS + NestJS + REST `/api/v1` · **Database:** MySQL 8 (Prisma; schema now exists — design docs in `Database/`) · **Admin:** separate lightweight React web app (shell scaffolded).

## Repository structure (ADR-024)

```
WorkBridge/
├── Mobile App/       # Expo Router RN app (ADR-021's /mobile)
│   └── src/
│       ├── app/        # routes: index (dev hub), (auth)/, worker/, employer/
│       ├── api/        # typed HTTP client (success/error envelope, AppError)
│       ├── store/      # Zustand session store (SecureStore-backed) + jest tests
│       ├── config/     # EXPO_PUBLIC_* env
│       ├── i18n/       # string tables (single source for all copy)
│       ├── components/ # foundation layout primitives
│       └── constants/  # design tokens (colors/spacing/typography)
├── Backend/          # NestJS API (ADR-021's /backend)
│   ├── prisma/        # schema.prisma — 40 models (Phase 1 deliverable)
│   ├── src/           # main, bootstrap, config, common (request-id, error filter), health/
│   └── test/          # app.e2e-spec + journey.e2e-spec (§4 journey skeleton)
├── Admin/            # admin web shell (Vite + React 19) — placeholder pages, builds green
├── Database/         # design docs: ERD, ERD_supporting, STATE_MACHINES, SEED_DATA, MIGRATION_PLAN
├── packages/
│   └── contracts/    # shared Zod schemas, error-code catalog, notification event catalog
├── Documentation/    # architecture.md (WHAT/WHY), EXECUTION_PLAN.md (WHEN/ORDER),
│                     # openapi.yaml (draft), UI_UX_DESIGN/UI_UX_FLOWS, audit, client-progress
└── .github/workflows # ci.yml (lint/build/tests; integration stage stubbed until MySQL exists)
```

Structure mapping notes:
- Route group `(auth)` is a URL-clean group; `worker/` and `employer/` are plain directories (URLs `/worker`, `/employer`) because multiple group `index` routes would collide at `/` — same role-gated-stack behavior as architecture §10.
- `packages/contracts` is consumed by backend + admin + (later) mobile; wire-up happens with Wave 1 endpoints.

## Run

```bash
# Mobile (dev server + web preview / Expo Go)
cd "Mobile App" && npm install && npx expo start

# Backend
cd Backend && npm install && npm run start:dev   # http://localhost:3000/api/v1/health

# Admin (proxies /api → backend)
cd Admin && npm install && npm run dev           # http://localhost:5173
```

Environment templates: `Mobile App/.env.example`, `Backend/.env.example` (copy to `.env`; real `.env` files are gitignored). Staging templates: `*.env.staging.example`.

## Checks

```bash
# Mobile
cd "Mobile App" && npx tsc --noEmit && npm run lint && npm test && npx expo export --platform android

# Backend
cd Backend && npx prisma validate && npm run lint && npm run build && npm test && npm run test:e2e

# Contracts / Admin
cd packages/contracts && npm run typecheck
cd Admin && npm run build
```

CI: `.github/workflows/ci.yml` runs the same checks (needs a git remote to actually execute).

## Status

Technical foundation verified (2026-09-25) · **Phases 1–3 combined run complete** (data & API design, structure/CI remainder, UI/UX design) — awaiting the owner's single combined gate review. Temporary dev screens only; **0% of V1 modules complete**. Details: `Documentation/audit.md`; client-safe view: `Documentation/client-progress.md`.
