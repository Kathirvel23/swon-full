/**
 * Environment configuration with fail-fast validation (architecture §30).
 * Invalid or missing values crash boot with a clear message — never a silent
 * default that only bites production. Secrets are read from env only.
 */
export default () => {
  const portRaw = process.env.PORT ?? '3000';
  const port = Number(portRaw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT "${portRaw}" — expected an integer between 1 and 65535`);
  }

  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const allowedEnvs = ['development', 'staging', 'production', 'test'];
  if (!allowedEnvs.includes(nodeEnv)) {
    throw new Error(`Invalid NODE_ENV "${nodeEnv}" — expected one of: ${allowedEnvs.join(', ')}`);
  }

  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:8081,http://localhost:8080')
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  // Access-token signing secret — fail-fast, no silent default (§30).
  const accessSecret = process.env.JWT_ACCESS_SECRET ?? '';
  if (accessSecret.length < 32) {
    throw new Error('JWT_ACCESS_SECRET missing or too short — generate: openssl rand -hex 32');
  }

  const intEnv = (name: string, fallback: number): number => {
    const raw = process.env[name];
    if (raw === undefined || raw === '') return fallback;
    const value = Number(raw);
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(`Invalid ${name} "${raw}" — expected a non-negative integer`);
    }
    return value;
  };

  // Simulated OTP: codes surface in logs/responses outside production only.
  const otpSim = nodeEnv !== 'production' && (process.env.OTP_SIM ?? 'true') !== 'false';

  // KYC identity encryption + dedupe-hash key (§20) — fail-fast like the JWT secret.
  const kycIdSecret = process.env.KYC_ID_SECRET ?? '';
  if (kycIdSecret.length < 32) {
    throw new Error('KYC_ID_SECRET missing or too short — generate: openssl rand -hex 32');
  }

  // Server-side admin grant (#4 CONFIRMED): OTP from these phones ⇒ role admin.
  const adminPhones = (process.env.ADMIN_PHONES ?? '')
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return {
    port,
    nodeEnv,
    corsOrigins,
    apiVersion: 'v1',
    auth: {
      accessSecret,
      accessTtlSec: intEnv('ACCESS_TTL_SEC', 900), // §15: ~15 min
      refreshTtlDays: intEnv('REFRESH_TTL_DAYS', 30), // §15: ~30 d, rotates
    },
    otp: {
      cooldownSec: intEnv('OTP_COOLDOWN_SEC', 60), // SEED platform_config
      ttlSec: intEnv('OTP_TTL_SEC', 120),
      maxAttempts: intEnv('OTP_MAX_ATTEMPTS', 5),
      sim: otpSim,
    },
    kyc: {
      idSecret: kycIdSecret,
      maxBytes: intEnv('KYC_MAX_BYTES', 5 * 1024 * 1024),
      maxAttempts: intEnv('KYC_MAX_ATTEMPTS', 3), // M5 attempt cap (K1/K5)
      consentVersion: process.env.KYC_CONSENT_VERSION ?? '2026-09-v1',
    },
    admin: { phones: adminPhones },
  };
};
