import { type AuthenticatedRequest } from '../common/guards.js';
import { RatingsService } from './ratings.service.js';
import type { RatingCreate, RatingSummary } from '@workbridge/contracts';
export declare class RatingsController {
    private readonly ratings;
    constructor(ratings: RatingsService);
    create(req: AuthenticatedRequest, body: RatingCreate): Promise<{
        data: {
            publicId: string;
            score: number;
            tags: ("ON_TIME" | "SAFE_ENVIRONMENT" | "CLEAR_PAY" | "RESPECTFUL" | "GOOD_WORK" | "RELIABLE" | "NEEDS_IMPROVEMENT")[];
            commentVisible: boolean;
            jobPublicId: string;
            jobTitle: string;
            raterRole: "EMPLOYER" | "WORKER";
            rater: {
                publicId: string;
                displayName: string;
                revealed: boolean;
                photoUrl?: string | null | undefined;
            };
            ratee: {
                publicId: string;
                displayName: string;
                photoUrl?: string | null | undefined;
            };
            createdAt: string;
            comment?: string | null | undefined;
        };
    }>;
    summary(req: AuthenticatedRequest): Promise<{
        data: RatingSummary;
    }>;
    pending(req: AuthenticatedRequest): Promise<{
        data: {
            jobPublicId: string;
            jobTitle: string;
            ratee: {
                publicId: string;
                displayName: string;
            };
            rateeRole: "WORKER" | "EMPLOYER";
        }[];
    }>;
    list(req: AuthenticatedRequest, scope?: string): Promise<{
        data: {
            publicId: string;
            score: number;
            tags: ("ON_TIME" | "SAFE_ENVIRONMENT" | "CLEAR_PAY" | "RESPECTFUL" | "GOOD_WORK" | "RELIABLE" | "NEEDS_IMPROVEMENT")[];
            commentVisible: boolean;
            jobPublicId: string;
            jobTitle: string;
            raterRole: "EMPLOYER" | "WORKER";
            rater: {
                publicId: string;
                displayName: string;
                revealed: boolean;
                photoUrl?: string | null | undefined;
            };
            ratee: {
                publicId: string;
                displayName: string;
                photoUrl?: string | null | undefined;
            };
            createdAt: string;
            comment?: string | null | undefined;
        }[];
    }>;
}
