import { type AuthenticatedRequest } from '../common/guards.js';
import { MatchingService } from './matching.service.js';
import type { QuickMatchCreate, QuickMatchRespond } from '@workbridge/contracts';
export declare class MatchingController {
    private readonly matching;
    constructor(matching: MatchingService);
    candidates(req: AuthenticatedRequest, publicId: string, limit?: string, includeApplied?: string): Promise<{
        data: {
            jobPublicId: string;
            weightsVersion: number;
            logId: string;
            candidates: {
                workerPublicId: string;
                score: number;
                distanceBand: string;
                signals: {
                    proximityMilli: number;
                    skillMatchMilli: number;
                    reliabilityMilli: number;
                    ratingMilli: number;
                    recencyMilli: number;
                    availabilityMilli: number;
                    overlapMilli: number;
                };
                reasonCodes: string[];
            }[];
            ignoredCount: number;
            takenMs: number;
        };
    }>;
    launch(req: AuthenticatedRequest, body: QuickMatchCreate, idemKey?: string): Promise<{
        data: {
            created: number;
            skipped: number;
            waveNo: number;
            respondBy: string;
        };
    }>;
    availability(req: AuthenticatedRequest, jobPublicId: string, radiusKm?: string): Promise<{
        data: {
            jobPublicId: string;
            radiusKm: number;
            availableNearby: number;
            matchingSkills: number;
            currentlyWorking: number;
            potentialMatches: number;
            bands: {
                band: string;
                count: number;
            }[];
        };
    }>;
    myOffers(req: AuthenticatedRequest, status?: string): Promise<{
        data: {
            publicId: string;
            status: "PENDING" | "CANCELLED" | "EXPIRED" | "ACCEPTED" | "DECLINED";
            job: {
                publicId: string;
                title: string;
                city: string;
                areaName: string;
                payAmountPaise: number;
                payType: string;
                employerName: string;
            };
            requirementSnapshot: string;
            windowStart: string;
            windowEnd: string;
            respondBy: string;
            distanceBand: string;
            expiringSoon: boolean;
            respondedAt?: string | null | undefined;
            reasonCodes?: string[] | undefined;
        }[];
    }>;
    respond(req: AuthenticatedRequest, publicId: string, body: QuickMatchRespond): Promise<{
        data: {
            status: "ACCEPTED";
            application: {
                publicId: string;
                status: string;
            };
        } | {
            status: "DECLINED";
            application: null;
        };
    }>;
}
