/**
 * @workbridge/contracts — shared API contracts (Phase 1 design artifact).
 *
 * Source of truth chain: architecture.md §14 → these schemas → (at build time)
 * NestJS ValidationPipe on the server, Zod guards on the clients. The OpenAPI
 * draft lives in Documentation/openapi.yaml and must not drift from here.
 */
export * from './common.js';
export * from './errors.js';
export * from './events.js';
export * from './auth.js';
export * from './profiles.js';
export * from './kyc.js';
export * from './jobs.js';
export * from './applications.js';
export * from './crew.js';
export * from './attendance.js';
export * from './payments.js';
export * from './matching.js';
export * from './notifications.js';
export * from './ratings.js';
export * from './welfare.js';
export * from './complaints.js';
export * from './admin.js';
export * from './config.js';
