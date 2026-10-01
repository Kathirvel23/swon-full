/**
 * Profile completeness (§9 H1/H2, §11.1 onboarding nudge).
 * Percentages are shown in the app ("Profile 65%") and drive the
 * profileCompletePct column. Weights are deterministic and tested.
 *
 * Worker  (total 100): fullName 25 · photo 15 · area 15 · skills≥1 20 ·
 *                      availability≥1 15 · bio 5 · experience 5
 * Employer (total 100): orgName 20 · contactName 15 · city 15 · area 25 ·
 *                       address 15 · orgType 10   (PAN/GST optional → not scored)
 */

export interface WorkerCompletenessInput {
  fullName: string | null | undefined;
  photoStorageKey: string | null | undefined;
  areaId: string | bigint | null | undefined;
  bio: string | null | undefined;
  experienceYears: number | null | undefined;
  skillsCount: number;
  availabilityCount: number;
}

export function computeWorkerCompletePct(i: WorkerCompletenessInput): number {
  let pct = 0;
  if (i.fullName && i.fullName.trim().length >= 2) pct += 25;
  if (i.photoStorageKey) pct += 15;
  if (i.areaId) pct += 15;
  if (i.skillsCount >= 1) pct += 20;
  if (i.availabilityCount >= 1) pct += 15;
  if (i.bio && i.bio.trim().length > 0) pct += 5;
  if (i.experienceYears != null) pct += 5;
  return Math.min(100, pct);
}

export interface EmployerCompletenessInput {
  orgName: string | null | undefined;
  orgType: string | null | undefined;
  contactName: string | null | undefined;
  city: string | null | undefined;
  areaId: string | bigint | null | undefined;
  addressLine: string | null | undefined;
}

export function computeEmployerCompletePct(i: EmployerCompletenessInput): number {
  let pct = 0;
  if (i.orgName && i.orgName.trim().length >= 2) pct += 20;
  if (i.contactName && i.contactName.trim().length >= 2) pct += 15;
  if (i.city && i.city.trim().length >= 2) pct += 15;
  if (i.areaId) pct += 25;
  if (i.addressLine && i.addressLine.trim().length >= 3) pct += 15;
  if (i.orgType) pct += 10;
  return Math.min(100, pct);
}
