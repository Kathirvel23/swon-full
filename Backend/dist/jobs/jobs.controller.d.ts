import { type JobCancel, type JobCreate, type JobMineQuery, type JobPatch, type JobSearch } from '@workbridge/contracts';
import { type AuthenticatedRequest } from '../common/guards.js';
import { JobsService } from './jobs.service.js';
export declare class JobsController {
    private readonly jobs;
    constructor(jobs: JobsService);
    create(req: AuthenticatedRequest, body: JobCreate): Promise<{
        data: {
            publicId: string;
            title: string;
            description: string;
            status: "CLOSED" | "DRAFT" | "IN_PROGRESS" | "CANCELLED" | "OPEN" | "HIRING" | "FILLED" | "COMPLETED" | "EXPIRED";
            category: {
                publicId: string;
                code: string;
                name: string;
            };
            city: string;
            area: {
                publicId: string;
                name: string;
            };
            addressLine: string;
            coordinatesAvailable: boolean;
            startsOn: string;
            endsOn: string;
            dayStartTime: string;
            dayEndTime: string;
            workDays: {
                date: string;
                startTime: string;
                endTime: string;
            }[];
            payType: "DAY" | "HOUR" | "TOTAL";
            payAmountPaise: number;
            currency: "INR";
            payLabel: string;
            headcountRequired: number;
            hiredCount: number;
            applicationCount: number;
            skills: {
                skillId: string;
                name: string;
            }[];
            welfare: {
                code: string;
                label: string;
                note?: string | null | undefined;
            }[];
            employer: {
                publicId: string;
                orgName: string;
                orgType: string;
                avgRatingMilli: number;
                ratingsCount: number;
                kycBadge: boolean;
            };
            createdAt: string;
            minExperienceYears?: number | null | undefined;
            requirementsNote?: string | null | undefined;
            publishedAt?: string | null | undefined;
            cancelReason?: string | null | undefined;
            viewerState?: {
                applied: boolean;
                hasCrewSeat: boolean;
                isOwner: boolean;
                applicationStatus?: string | undefined;
            } | undefined;
            distanceKm?: number | null | undefined;
            viewerBadges?: {
                matchesSkills: boolean;
                experienceOk: boolean;
                kycOk: boolean;
            } | undefined;
        };
    }>;
    update(req: AuthenticatedRequest, publicId: string, body: JobPatch): Promise<{
        data: {
            publicId: string;
            title: string;
            description: string;
            status: "CLOSED" | "DRAFT" | "IN_PROGRESS" | "CANCELLED" | "OPEN" | "HIRING" | "FILLED" | "COMPLETED" | "EXPIRED";
            category: {
                publicId: string;
                code: string;
                name: string;
            };
            city: string;
            area: {
                publicId: string;
                name: string;
            };
            addressLine: string;
            coordinatesAvailable: boolean;
            startsOn: string;
            endsOn: string;
            dayStartTime: string;
            dayEndTime: string;
            workDays: {
                date: string;
                startTime: string;
                endTime: string;
            }[];
            payType: "DAY" | "HOUR" | "TOTAL";
            payAmountPaise: number;
            currency: "INR";
            payLabel: string;
            headcountRequired: number;
            hiredCount: number;
            applicationCount: number;
            skills: {
                skillId: string;
                name: string;
            }[];
            welfare: {
                code: string;
                label: string;
                note?: string | null | undefined;
            }[];
            employer: {
                publicId: string;
                orgName: string;
                orgType: string;
                avgRatingMilli: number;
                ratingsCount: number;
                kycBadge: boolean;
            };
            createdAt: string;
            minExperienceYears?: number | null | undefined;
            requirementsNote?: string | null | undefined;
            publishedAt?: string | null | undefined;
            cancelReason?: string | null | undefined;
            viewerState?: {
                applied: boolean;
                hasCrewSeat: boolean;
                isOwner: boolean;
                applicationStatus?: string | undefined;
            } | undefined;
            distanceKm?: number | null | undefined;
            viewerBadges?: {
                matchesSkills: boolean;
                experienceOk: boolean;
                kycOk: boolean;
            } | undefined;
        };
    }>;
    mine(req: AuthenticatedRequest, query: JobMineQuery): Promise<{
        data: {
            publicId: string;
            title: string;
            description: string;
            status: "CLOSED" | "DRAFT" | "IN_PROGRESS" | "CANCELLED" | "OPEN" | "HIRING" | "FILLED" | "COMPLETED" | "EXPIRED";
            category: {
                publicId: string;
                code: string;
                name: string;
            };
            city: string;
            area: {
                publicId: string;
                name: string;
            };
            addressLine: string;
            coordinatesAvailable: boolean;
            startsOn: string;
            endsOn: string;
            dayStartTime: string;
            dayEndTime: string;
            workDays: {
                date: string;
                startTime: string;
                endTime: string;
            }[];
            payType: "DAY" | "HOUR" | "TOTAL";
            payAmountPaise: number;
            currency: "INR";
            payLabel: string;
            headcountRequired: number;
            hiredCount: number;
            applicationCount: number;
            skills: {
                skillId: string;
                name: string;
            }[];
            welfare: {
                code: string;
                label: string;
                note?: string | null | undefined;
            }[];
            employer: {
                publicId: string;
                orgName: string;
                orgType: string;
                avgRatingMilli: number;
                ratingsCount: number;
                kycBadge: boolean;
            };
            createdAt: string;
            minExperienceYears?: number | null | undefined;
            requirementsNote?: string | null | undefined;
            publishedAt?: string | null | undefined;
            cancelReason?: string | null | undefined;
            viewerState?: {
                applied: boolean;
                hasCrewSeat: boolean;
                isOwner: boolean;
                applicationStatus?: string | undefined;
            } | undefined;
            distanceKm?: number | null | undefined;
            viewerBadges?: {
                matchesSkills: boolean;
                experienceOk: boolean;
                kycOk: boolean;
            } | undefined;
        }[];
        meta: {
            next: string | null;
            count: number;
        };
    }>;
    publish(req: AuthenticatedRequest, publicId: string): Promise<{
        data: {
            publicId: string;
            status: "OPEN";
        };
    }>;
    cancel(req: AuthenticatedRequest, publicId: string, body: JobCancel): Promise<{
        data: {
            publicId: string;
            status: "CANCELLED";
        };
    }>;
    complete(req: AuthenticatedRequest, publicId: string): Promise<{
        data: {
            publicId: string;
            status: "COMPLETED";
            earnings: {
                eligible: number;
                cancelled: number;
            };
        };
    }>;
    remove(req: AuthenticatedRequest, publicId: string): Promise<{
        data: {
            publicId: string;
            deleted: boolean;
        };
    }>;
    feed(req: AuthenticatedRequest, query: JobSearch): Promise<{
        data: {
            publicId: string;
            title: string;
            description: string;
            status: "CLOSED" | "DRAFT" | "IN_PROGRESS" | "CANCELLED" | "OPEN" | "HIRING" | "FILLED" | "COMPLETED" | "EXPIRED";
            category: {
                publicId: string;
                code: string;
                name: string;
            };
            city: string;
            area: {
                publicId: string;
                name: string;
            };
            addressLine: string;
            coordinatesAvailable: boolean;
            startsOn: string;
            endsOn: string;
            dayStartTime: string;
            dayEndTime: string;
            workDays: {
                date: string;
                startTime: string;
                endTime: string;
            }[];
            payType: "DAY" | "HOUR" | "TOTAL";
            payAmountPaise: number;
            currency: "INR";
            payLabel: string;
            headcountRequired: number;
            hiredCount: number;
            applicationCount: number;
            skills: {
                skillId: string;
                name: string;
            }[];
            welfare: {
                code: string;
                label: string;
                note?: string | null | undefined;
            }[];
            employer: {
                publicId: string;
                orgName: string;
                orgType: string;
                avgRatingMilli: number;
                ratingsCount: number;
                kycBadge: boolean;
            };
            createdAt: string;
            minExperienceYears?: number | null | undefined;
            requirementsNote?: string | null | undefined;
            publishedAt?: string | null | undefined;
            cancelReason?: string | null | undefined;
            viewerState?: {
                applied: boolean;
                hasCrewSeat: boolean;
                isOwner: boolean;
                applicationStatus?: string | undefined;
            } | undefined;
            distanceKm?: number | null | undefined;
            viewerBadges?: {
                matchesSkills: boolean;
                experienceOk: boolean;
                kycOk: boolean;
            } | undefined;
        }[];
        meta: {
            next: string | null;
            count: number;
        };
    }>;
    detail(req: AuthenticatedRequest, publicId: string): Promise<{
        data: {
            publicId: string;
            title: string;
            description: string;
            status: "CLOSED" | "DRAFT" | "IN_PROGRESS" | "CANCELLED" | "OPEN" | "HIRING" | "FILLED" | "COMPLETED" | "EXPIRED";
            category: {
                publicId: string;
                code: string;
                name: string;
            };
            city: string;
            area: {
                publicId: string;
                name: string;
            };
            addressLine: string;
            coordinatesAvailable: boolean;
            startsOn: string;
            endsOn: string;
            dayStartTime: string;
            dayEndTime: string;
            workDays: {
                date: string;
                startTime: string;
                endTime: string;
            }[];
            payType: "DAY" | "HOUR" | "TOTAL";
            payAmountPaise: number;
            currency: "INR";
            payLabel: string;
            headcountRequired: number;
            hiredCount: number;
            applicationCount: number;
            skills: {
                skillId: string;
                name: string;
            }[];
            welfare: {
                code: string;
                label: string;
                note?: string | null | undefined;
            }[];
            employer: {
                publicId: string;
                orgName: string;
                orgType: string;
                avgRatingMilli: number;
                ratingsCount: number;
                kycBadge: boolean;
            };
            createdAt: string;
            minExperienceYears?: number | null | undefined;
            requirementsNote?: string | null | undefined;
            publishedAt?: string | null | undefined;
            cancelReason?: string | null | undefined;
            viewerState?: {
                applied: boolean;
                hasCrewSeat: boolean;
                isOwner: boolean;
                applicationStatus?: string | undefined;
            } | undefined;
            distanceKm?: number | null | undefined;
            viewerBadges?: {
                matchesSkills: boolean;
                experienceOk: boolean;
                kycOk: boolean;
            } | undefined;
        };
    }>;
}
export declare class AdminJobsController {
    private readonly jobs;
    constructor(jobs: JobsService);
    sweep(): Promise<{
        data: {
            expired: number;
        };
    }>;
}
