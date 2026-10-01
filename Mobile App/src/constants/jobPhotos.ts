/**
 * Bundled opportunity imagery (plan U7 — decision 8: default yes, flagged
 * reversible). Six CC-licensed photos ship inside the app (no runtime
 * network); credits + licenses in `assets/jobs/CREDITS.md` — owner confirms
 * final attribution before store release.
 *
 * Screens pick a photo via `photoForCategory(job.category.code|name)` and
 * fall back to the tinted icon placeholder when it returns null.
 */
export const JOB_PHOTOS = {
  construction: require('../../assets/jobs/construction.jpg'),
  warehouse: require('../../assets/jobs/warehouse.jpg'),
  event: require('../../assets/jobs/event.jpg'),
  delivery: require('../../assets/jobs/delivery.jpg'),
  cleaning: require('../../assets/jobs/cleaning.jpg'),
  hospitality: require('../../assets/jobs/hospitality.jpg'),
} as const;

export type JobPhotoKey = keyof typeof JOB_PHOTOS;

const MATCHERS: [JobPhotoKey, string[]][] = [
  ['construction', ['CONSTRUCT', 'BUILD', 'MASON', 'SITE']],
  ['warehouse', ['WARE', 'PACK', 'LOGISTIC', 'INVENTORY', 'STORE']],
  ['event', ['EVENT', 'STAGE', 'CATERING CREW', 'EXHIBIT', 'PROMOT', 'SHOWROOM', 'FESTIVAL']],
  ['delivery', ['DELIV', 'RIDE', 'RIDES', 'ZIP', 'TRANSPORT']],
  ['cleaning', ['CLEAN', 'HOUSEKEEP', 'JANITOR']],
  ['hospitality', ['KITCH', 'FOOD', 'COOK', 'RESTAURANT', 'HOSPITALITY', 'HOTEL']],
];

/**
 * Best-effort category → photo. Accepts the job's category code or name
 * (any case); returns null when nothing matches so callers keep the
 * designed placeholder instead of a wrong-industry photo.
 */
export function photoForCategory(codeOrName: string | null | undefined): JobPhotoKey | null {
  if (!codeOrName) return null;
  const probe = codeOrName.toUpperCase();
  for (const [key, needles] of MATCHERS) {
    for (const n of needles) {
      if (probe.includes(n)) return key;
    }
  }
  return null;
}

/** require()-id form for `<Image source={...}>` consumers (OpportunityCard.photoSource). */
export function photoSourceForCategory(codeOrName: string | null | undefined): number | null {
  const key = photoForCategory(codeOrName);
  return key ? JOB_PHOTOS[key] : null;
}
