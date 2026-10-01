/**
 * Public runtime configuration for the mobile app.
 *
 * EXPO_PUBLIC_* values are inlined into the app bundle at build time — they are
 * PUBLIC by definition. Secrets must never live here (architecture §30).
 */

const rawApiBaseUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

/** Versioned API base, no trailing slash. */
export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, '');

/** Runtime environment label (development / staging / production). */
export const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV ?? 'development';
