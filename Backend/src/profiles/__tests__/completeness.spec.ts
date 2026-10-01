import { describe, expect, it } from 'vitest';

import { computeEmployerCompletePct, computeWorkerCompletePct } from '../completeness.js';

describe('profile completeness (drives profileCompletePct + onboarding nudge)', () => {
  it('worker: empty profile is 0', () => {
    expect(
      computeWorkerCompletePct({
        fullName: '',
        photoStorageKey: null,
        areaId: null,
        bio: null,
        experienceYears: null,
        skillsCount: 0,
        availabilityCount: 0,
      }),
    ).toBe(0);
  });

  it('worker: full profile is exactly 100', () => {
    expect(
      computeWorkerCompletePct({
        fullName: 'Asha R',
        photoStorageKey: 'photo/1.jpg',
        areaId: 'area_cbe_gandhipuram',
        bio: 'Five years in event setup.',
        experienceYears: 5,
        skillsCount: 3,
        availabilityCount: 4,
      }),
    ).toBe(100);
  });

  it('worker: skills and availability both required for a complete profile', () => {
    const base = {
      fullName: 'Asha R',
      photoStorageKey: 'photo/1.jpg',
      areaId: 'area_cbe_gandhipuram',
      bio: 'x',
      experienceYears: 2,
      skillsCount: 0,
      availabilityCount: 0,
    };
    const pct = computeWorkerCompletePct(base);
    expect(pct).toBe(100 - 20 - 15); // missing skills (20) + availability (15)
  });

  it('employer: minimal required org data scores 100', () => {
    expect(
      computeEmployerCompletePct({
        orgName: 'Sri Traders',
        orgType: 'FIRM',
        contactName: 'Ravi K',
        city: 'Coimbatore',
        areaId: 'area_cbe_gandhipuram',
        addressLine: '12, Big Bazaar Street',
      }),
    ).toBe(100);
  });

  it('employer: missing address and area is never 100', () => {
    const pct = computeEmployerCompletePct({
      orgName: 'Sri Traders',
      orgType: 'INDIVIDUAL',
      contactName: 'Ravi K',
      city: 'Coimbatore',
      areaId: null,
      addressLine: '',
    });
    expect(pct).toBe(100 - 25 - 15); // area (25) + address (15 missing? -> defined below)
    expect(pct).toBeLessThan(100);
  });
});
