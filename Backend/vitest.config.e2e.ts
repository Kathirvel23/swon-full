import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // All suites share one MySQL — file-level parallelism races the shared
    // job/notification tables (journey + jobs both write jobs). Serialize.
    fileParallelism: false,
    // Integration runs against the REAL MySQL test database — these values
    // exist only for vitest (process.env wins over .env in @nestjs/config).
    // test/e2e never touches workbridge_dev; OTP cooldown is disabled so
    // suites can request codes back-to-back.
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'mysql://root:@127.0.0.1:3307/workbridge_test',
      JWT_ACCESS_SECRET: 'e2e-only-secret-0123456789abcdefghijklmnop',
      OTP_COOLDOWN_SEC: '0',
      OTP_TTL_SEC: '120',
      OTP_MAX_ATTEMPTS: '5',
      KYC_ID_SECRET: 'e2e-kyc-secret-0123456789abcdef0123456789abcdef',
      ATTENDANCE_TOKEN_SECRET: 'e2e-attendance-secret-0123456789abcdef0123456',
      ADMIN_PHONES: '+919000000009',
    },
  },
});
