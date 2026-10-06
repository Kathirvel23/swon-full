# SWON Production API — 502 / HTTPS Down — Fix Plan

**Priority:** P0 (blocks all authentication)
**Date:** 2026-10-03
**Owner:** Backend / DevOps (server-side)
**App change required:** None. Production API must stay `https://api.swon.in/api/v1`.

---

## 1. Symptom

- On the standalone Android app, the login screen works and accepts a 10-digit number.
- Tapping **Continue** shows the app's error: **"Network request failed. Check your connection and try again."**
- The app never reaches the OTP screen.

## 2. Evidence (captured 2026-10-03)

| Check | Result |
|---|---|
| `Resolve-DnsName api.swon.in` | → `201.18.212.164` (Hostinger, `srv2025691.hstgr.cloud`) |
| Phone → `ping api.swon.in` | ✅ replies (~88 ms) |
| PC → `Test-NetConnection api.swon.in -Port 443` | ❌ False / TCP connect timeout |
| PC → `POST https://api.swon.in/api/v1/auth/otp/request` | ❌ timed out (20s) |
| PC → `GET http://api.swon.in/` (port 80) | ⚠️ opens, returns **502 Bad Gateway** |
| PC → `GET https://www.google.com` (control) | ✅ 200 (PC/network healthy) |

## 3. Root Cause

The API is **not being served**:
- **Port 80:** reverse proxy is up but its **upstream returns 502 Bad Gateway** → the backend application process is down or not listening.
- **Port 443:** **nothing is accepting TCP** → nginx/Caddy is not listening on 443 (or TLS is disabled / firewall blocks 443).

App-side is correct: it submits the request and reports a network failure. Phone network is fine.

## 4. Fix Plan (server-side only)

### Step 0 — Access & triage (5–10 min)
- SSH into `srv2025691.hstgr.cloud` (201.18.212.164).
- `uptime`, `df -h`, `free -m` (rule out disk/OOM).

### Step 1 — Check the reverse proxy (5–10 min)
- `systemctl status nginx` (or `caddy`) → running?
- `ss -lntp | grep -E ':(80|443)'` → confirm a listener on **both** 80 and 443.
- `nginx -t` → config valid?
- Inspect the site config: `proxy_pass` target (e.g. `http://127.0.0.1:3000`).
- Check the 443 server block exists and has a valid TLS cert (see Step 3).

### Step 2 — Check the backend app (5–15 min)
- Find the process manager: `pm2 status` / `systemctl status swon-api` / `docker ps`.
- `ss -lntp | grep <app-port>` → is the upstream port listening?
- Check app logs (`pm2 logs`, `journalctl -u swon-api -n 200`) for crash/env errors.
- Confirm env/DB connectivity the app needs (`.env`, DB up, migrations).
- Restart it: `pm2 restart <name>` / `systemctl restart swon-api` / `docker compose up -d`.

### Step 3 — Fix HTTPS / TLS on 443 (5–15 min)
- If nginx isn’t listening on 443: add/enable the `listen 443 ssl http2;` server block.
- If the cert is missing/expired: `certbot renew` / `certbot --nginx -d api.swon.in`.
- If a firewall blocks 443: `ufw allow 443` / check cloud provider firewall + Hostinger panel.

### Step 4 — Verify locally on the server (2 min)
- `curl -i http://127.0.0.1:<app-port>/api/v1/health`
- `curl -i https://api.swon.in/api/v1/health` (should be **200**, not 502/timeout)

### Step 5 — Verify externally (2 min)
- From this PC:
  - `Test-NetConnection api.swon.in -Port 443` → **True**
  - `Invoke-WebRequest https://api.swon.in/api/v1/health` → **200**
  - `POST https://api.swon.in/api/v1/auth/otp/request` with `{"phone":"+919XXXXXXXXX"}` → valid JSON (not 502/timeout)

### Step 6 — Verify the app end-to-end (2 min)
- On the phone, type a valid 10-digit number → tap **Continue**.
- Expect: request succeeds → navigate to the **OTP screen**.

## 5. Acceptance Criteria

- `https://api.swon.in/api/v1/health` returns **200**.
- Port **443** accepts TLS connections (TCP connect OK).
- `POST /api/v1/auth/otp/request` returns a valid response (no 502/timeout).
- App flow: login → Continue → **OTP screen** appears.

## 6. Rollback

- Keep a copy of the working nginx config before edits (`cp` backup + `nginx -t` before reload).
- If a change breaks the site: restore the backup config and `systemctl reload nginx`; restart the previous app process/commit.

## 7. ETA

| Scenario | Time |
|---|---|
| Backend process simply down (restart) + nginx already has 443 | **~15–20 min** |
| Needs nginx 443 server block / certbot cert | **~30–45 min** |
| Firewall / provider / DNS / DB issues | **+15–30 min** |

## 8. Notes / Guardrails

- **Do not** change the app’s API base URL (must remain `https://api.swon.in/api/v1`).
- **Do not** switch the app to localhost.
- No app code change is required for this incident.
- Optional (app-side, separate task): add a **client request timeout** in `src/api/client.ts` so a dead server fails fast instead of hanging on "Sending…".
