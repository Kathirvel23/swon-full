import { type AuthenticatedRequest } from '../common/guards.js';
import { ProfilesService } from './profiles.service.js';
export declare class ProfilesController {
    private readonly profiles;
    constructor(profiles: ProfilesService);
    me(req: AuthenticatedRequest): Promise<{
        data: {
            account: {
                publicId: string;
                role: "worker" | "employer" | "admin" | null;
                phoneMasked: string;
                status: string;
            };
            workerProfile: {
                publicId: string;
                fullName: string;
                openToWork: boolean;
                skills: {
                    skillId: string;
                    name: string;
                    yearsHint?: number | null | undefined;
                }[];
                avgRatingMilli: number;
                ratingsCount: number;
                jobsDoneCount: number;
                profileCompletePct: number;
                kycBadge: boolean;
                availability: {
                    publicId: string;
                    date: string;
                    fromTime: string;
                    toTime: string;
                    areaId?: string | null | undefined;
                }[];
                photoUrl?: string | null | undefined;
                city?: string | null | undefined;
                area?: {
                    publicId: string;
                    name: string;
                } | null | undefined;
                bio?: string | null | undefined;
                experienceYears?: number | null | undefined;
            } | null;
            org: {
                publicId: string;
                orgName: string;
                orgType: "INDIVIDUAL" | "FIRM" | "COMPANY" | "GOVT" | "NGO";
                contactName: string;
                city: string;
                area: {
                    publicId: string;
                    name: string;
                };
                addressLine: string;
                verificationStatus: string;
                avgRatingMilli: number;
                ratingsCount: number;
                jobsPostedCount: number;
                completenessPct: number;
            } | null;
            notificationPrefs: {
                pushEnabled: boolean;
                smsEnabled: boolean;
                quietHours?: string | null | undefined;
            };
        };
    }>;
    onboard(body: Parameters<ProfilesService['onboard']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            role: string;
            account: {
                publicId: string;
                role: "worker" | "employer" | "admin" | null;
                phoneMasked: string;
                status: string;
            };
            workerProfile: {
                publicId: string;
                fullName: string;
                openToWork: boolean;
                skills: {
                    skillId: string;
                    name: string;
                    yearsHint?: number | null | undefined;
                }[];
                avgRatingMilli: number;
                ratingsCount: number;
                jobsDoneCount: number;
                profileCompletePct: number;
                kycBadge: boolean;
                availability: {
                    publicId: string;
                    date: string;
                    fromTime: string;
                    toTime: string;
                    areaId?: string | null | undefined;
                }[];
                photoUrl?: string | null | undefined;
                city?: string | null | undefined;
                area?: {
                    publicId: string;
                    name: string;
                } | null | undefined;
                bio?: string | null | undefined;
                experienceYears?: number | null | undefined;
            } | null;
            org: {
                publicId: string;
                orgName: string;
                orgType: "INDIVIDUAL" | "FIRM" | "COMPANY" | "GOVT" | "NGO";
                contactName: string;
                city: string;
                area: {
                    publicId: string;
                    name: string;
                };
                addressLine: string;
                verificationStatus: string;
                avgRatingMilli: number;
                ratingsCount: number;
                jobsPostedCount: number;
                completenessPct: number;
            } | null;
            notificationPrefs: {
                pushEnabled: boolean;
                smsEnabled: boolean;
                quietHours?: string | null | undefined;
            };
        };
    }>;
    patchWorker(body: Parameters<ProfilesService['patchWorker']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            publicId: string;
            fullName: string;
            openToWork: boolean;
            skills: {
                skillId: string;
                name: string;
                yearsHint?: number | null | undefined;
            }[];
            avgRatingMilli: number;
            ratingsCount: number;
            jobsDoneCount: number;
            profileCompletePct: number;
            kycBadge: boolean;
            availability: {
                publicId: string;
                date: string;
                fromTime: string;
                toTime: string;
                areaId?: string | null | undefined;
            }[];
            photoUrl?: string | null | undefined;
            city?: string | null | undefined;
            area?: {
                publicId: string;
                name: string;
            } | null | undefined;
            bio?: string | null | undefined;
            experienceYears?: number | null | undefined;
        };
    }>;
    patchOrg(body: Parameters<ProfilesService['patchOrg']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            publicId: string;
            orgName: string;
            orgType: "INDIVIDUAL" | "FIRM" | "COMPANY" | "GOVT" | "NGO";
            contactName: string;
            city: string;
            area: {
                publicId: string;
                name: string;
            };
            addressLine: string;
            verificationStatus: string;
            avgRatingMilli: number;
            ratingsCount: number;
            jobsPostedCount: number;
            completenessPct: number;
        };
    }>;
    putSkills(body: Parameters<ProfilesService['putSkills']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            publicId: string;
            fullName: string;
            openToWork: boolean;
            skills: {
                skillId: string;
                name: string;
                yearsHint?: number | null | undefined;
            }[];
            avgRatingMilli: number;
            ratingsCount: number;
            jobsDoneCount: number;
            profileCompletePct: number;
            kycBadge: boolean;
            availability: {
                publicId: string;
                date: string;
                fromTime: string;
                toTime: string;
                areaId?: string | null | undefined;
            }[];
            photoUrl?: string | null | undefined;
            city?: string | null | undefined;
            area?: {
                publicId: string;
                name: string;
            } | null | undefined;
            bio?: string | null | undefined;
            experienceYears?: number | null | undefined;
        };
    }>;
    putAvailability(body: Parameters<ProfilesService['putAvailability']>[1], req: AuthenticatedRequest): Promise<{
        data: {
            publicId: string;
            fullName: string;
            openToWork: boolean;
            skills: {
                skillId: string;
                name: string;
                yearsHint?: number | null | undefined;
            }[];
            avgRatingMilli: number;
            ratingsCount: number;
            jobsDoneCount: number;
            profileCompletePct: number;
            kycBadge: boolean;
            availability: {
                publicId: string;
                date: string;
                fromTime: string;
                toTime: string;
                areaId?: string | null | undefined;
            }[];
            photoUrl?: string | null | undefined;
            city?: string | null | undefined;
            area?: {
                publicId: string;
                name: string;
            } | null | undefined;
            bio?: string | null | undefined;
            experienceYears?: number | null | undefined;
        };
    }>;
    uploadPhoto(file: {
        originalname: string;
        mimetype: string;
        buffer: Buffer;
    } | undefined, req: AuthenticatedRequest): Promise<{
        data: {
            photoUrl: string;
            storageKey: string;
        };
    }>;
}
