# WorkBridge — Migration Plan (Phase 1)

**Status:** DRAFT for gate review · **Date:** 2026-09-25 · Engine: MySQL 8 / Prisma Migrate (forward-only, §8/§31)

---

## 1. Principles

1. **Forward-only, numbered, reviewed.** Production rollback = a new corrective migration; down-migrations exist only for local dev (`prisma migrate diff`).
2. **Never ad-hoc at runtime.** Migrations apply via CI/release (`prisma migrate deploy`), never from app boot.
3. **Schema split:** Prisma owns tables/columns/FKs/indexes/uniques. **CHECK constraints are applied as post-SQL** inside the initial migration (Prisma cannot express CHECK; the state machine remains authoritative, CHECK is the backstop).
4. One database per environment (`workbridge_dev` / `workbridge_staging` / `workbridge_prod`).

## 2. Migration sequence (planned)

| # | Migration | Contents | Depends on |
|---|---|---|---|
| 0001 | `init_schema` | All tables from `ERD.md` + `ERD_supporting.md` (Prisma-generated baseline) + post-SQL: every `CHECK` (status lists, score 1..5, pay>0, headcount>0, ends≥starts) | — |
| 0002 | `seed_reference` | Areas, categories, welfare items, skills, platform_config (`SEED_DATA.md`) | 0001 |
| 0003 | `app_role_grants` | Create app DB role: `SELECT/INSERT/UPDATE` on business tables; **no `UPDATE`/`DELETE` on `audit_log`**; no DDL | 0001 |
| 0004+ | feature migrations | Only when a Wave needs a schema change (reviewed per wave) | — |

## 3. Procedure

```bash
# one-time setup (requires MySQL running — currently NOT installed on this host)
mysql -e "CREATE DATABASE workbridge_dev CHARACTER SET utf8mb4"
cd Backend
npx prisma migrate dev --name init_schema     # generates SQL, applies, seeds .env DATABASE_URL
npx prisma migrate deploy                      # CI/staging/production path
npm run test:integration                        # runs against ephemeral DB (CI job)
```

**Blocked on this machine today:** no MySQL server → `migrate dev` cannot run here yet. The schema is still verified via `prisma validate` + `prisma format`. First live run happens when MySQL (or Docker) is available — the CI integration job uses a MySQL service container, so CI covers it even if the local machine stays bare.

## 4. CHECK constraint inventory (applied in 0001 post-SQL)

account.role, account.status · employer_profile.org_type · kyc_submission.status/id_type · kyc_document.doc_type · job.status/pay_type, (ends_on >= starts_on), pay_amount_paise > 0, headcount_required > 0 · application.status, quick_match_offer.status/source · crew_member.status · attendance_record.status/check_source + UNIQUE(job,worker,work_day) · earning.status + currency='INR' · payment_transaction.status · rating.score BETWEEN 1 AND 5 + UNIQUE(job,rater,ratee) · complaint.status/type/severity + (link_type,link_public_id) consistent · complaint_event.kind · notification_delivery.channel/status · outbox.status · session/account soft rules.

## 5. Data-safety rules baked into migrations

- No destructive column drops without an approved ADR + owner call.
- Money columns: `BIGINT` only; adding a money column requires default 0 + backfill note.
- Every migration file: `-- up` reviewed in PR; checksum recorded by Prisma; applied exactly once per environment.
- PII columns (`phone`, `id_number_enc`) never selected by reporting queries — reporting reads exports/replicas later (§2).

## 6. Environment wiring

| Env | DATABASE_URL shape | Applied by |
|---|---|---|
| local dev | `mysql://root@localhost:3306/workbridge_dev` | `prisma migrate dev` (developer) |
| staging | secret-managed (`DATABASE_URL` injected) | `prisma migrate deploy` via CI |
| production | secret-managed | `prisma migrate deploy` via release pipeline (manual approve) |

`.env.example` already carries the local shape (Backend). Staging skeleton added in Phase 2 work (`Backend/.env.staging.example`).
