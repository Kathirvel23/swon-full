import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import type { JobCreate, JobSearch, JobCancel, JobMineQuery } from '@workbridge/contracts';
export declare const decodeOffset: (cursor?: string) => number;
export declare class JobsService implements OnModuleInit {
    private readonly prisma;
    private readonly dispatcher;
    private readonly payments;
    private readonly logger;
    private timer?;
    constructor(prisma: PrismaService, dispatcher: DispatcherService, payments: PaymentsService);
    onModuleInit(): void;
    private employerProfile;
    private kycStatusOf;
    private workerBadgeContext;
    private viewerContext;
    private toDto;
    private audit;
    private resolveRefs;
    create(accountId: bigint, input: JobCreate): Promise<{
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
    }>;
    update(accountId: bigint, publicId: string, patch: Partial<JobCreate>): Promise<{
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
    }>;
    mine(accountId: bigint, query: JobMineQuery): Promise<{
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
    publish(accountId: bigint, publicId: string): Promise<{
        publicId: string;
        status: "OPEN";
    }>;
    cancel(accountId: bigint, publicId: string, input: JobCancel): Promise<{
        publicId: string;
        status: "CANCELLED";
    }>;
    complete(accountId: bigint, publicId: string): Promise<{
        publicId: string;
        status: "COMPLETED";
        earnings: {
            eligible: number;
            cancelled: number;
        };
    }>;
    remove(accountId: bigint, publicId: string): Promise<{
        publicId: string;
        deleted: boolean;
    }>;
    feed(accountId: bigint, query: JobSearch): Promise<{
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
    detail(accountId: bigint, publicId: string): Promise<{
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
    }>;
    expireSweep(): Promise<{
        expired: number;
    }>;
}
