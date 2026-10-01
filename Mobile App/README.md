# SWON — Mobile App

React Native + Expo + TypeScript client (ADR-001). Part of the SWON repository — see `../README.md` for the full structure and `../Documentation/architecture.md` for the blueprint.

## Run

```bash
npm install              # first time
cp .env.example .env     # local config (a dev .env already exists)
npx expo start           # dev server → Expo Go / Android emulator / web preview
```

## Checks

```bash
npx tsc --noEmit                        # TypeScript (strict)
npx expo lint                           # ESLint
npx expo export --platform android      # headless bundle validation
```

## Structure

- `src/app/` — routes: root dev hub (`index.tsx`), `(auth)/` group, `worker/`, `employer/` role stacks *(structure mapping note in `../Documentation/audit.md`)*
- `src/api/` — typed HTTP client: base URL, auth header, error envelope → `AppError`
- `src/store/` — Zustand session store, SecureStore-backed (no auth flow yet — H1)
- `src/config/` — public env config (`EXPO_PUBLIC_*` only)
- `src/i18n/` — externalized string tables (ADR-023)
- `src/components/` — plain foundation layout primitives (production design system comes with UI/UX)
- `AGENTS.md` — Expo-specific agent instructions (SDK 57): use `npx expo install`, run typecheck + lint before finishing any task

## Current state

**Technical foundation only.** The visible screens are temporary development screens that prove: app launches, TypeScript compiles, Expo Router navigates, and every approved dependency resolves and works. No production features yet — those arrive module by module per `../Documentation/EXECUTION_PLAN.md` (Waves 0–7).
