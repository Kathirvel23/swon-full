export function computeWorkerCompletePct(i) {
    let pct = 0;
    if (i.fullName && i.fullName.trim().length >= 2)
        pct += 25;
    if (i.photoStorageKey)
        pct += 15;
    if (i.areaId)
        pct += 15;
    if (i.skillsCount >= 1)
        pct += 20;
    if (i.availabilityCount >= 1)
        pct += 15;
    if (i.bio && i.bio.trim().length > 0)
        pct += 5;
    if (i.experienceYears != null)
        pct += 5;
    return Math.min(100, pct);
}
export function computeEmployerCompletePct(i) {
    let pct = 0;
    if (i.orgName && i.orgName.trim().length >= 2)
        pct += 20;
    if (i.contactName && i.contactName.trim().length >= 2)
        pct += 15;
    if (i.city && i.city.trim().length >= 2)
        pct += 15;
    if (i.areaId)
        pct += 25;
    if (i.addressLine && i.addressLine.trim().length >= 3)
        pct += 15;
    if (i.orgType)
        pct += 10;
    return Math.min(100, pct);
}
//# sourceMappingURL=completeness.js.map