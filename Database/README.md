# WorkBridge — Database

**Engine:** MySQL 8.0 (owner-confirmed direction).

## What lives here

- Design documents for the database: ERD, schema design notes, seed-data content (job categories, welfare taxonomy, Coimbatore/Tiruppur area reference data).
- Seed scripts once Phase 1 (Data & API Design) defines the schema.

## What does NOT live here

- The runtime schema/migrations tooling. Per ADR-024/ADR-007, migrations run through the backend tooling — Prisma is initialized inside `../Backend/` (schema: `Backend/prisma/schema.prisma`).

## Status

- **No tables exist yet.** The full schema is designed in Phase 1 of `Documentation/EXECUTION_PLAN.md` (Data & API Design) and only then implemented.
- Live MySQL connectivity is not configured on this machine yet (no MySQL server installed); `DATABASE_URL` structure is templated in `Backend/.env.example`.
