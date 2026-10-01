export type JobStatus = 'DRAFT' | 'OPEN' | 'HIRING' | 'FILLED' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED' | 'CANCELLED' | 'EXPIRED';
export type JobActor = 'EMPLOYER' | 'ADMIN' | 'WORKER' | 'SYSTEM';
export interface JobGuards {
    crewHandlingConfirmed?: boolean;
    attendanceResolved?: boolean;
    earningsSettled?: boolean;
    kycStatus?: string | null;
}
export type JobEvent = 'PUBLISH' | 'FIRST_APPLICATION' | 'STAFFED' | 'SHORTFALL' | 'RELEASE_ALL' | 'START' | 'COMPLETE' | 'CLOSE' | 'CANCEL' | 'EXPIRE' | 'DELETE';
export declare function assertJobAction(current: JobStatus, event: JobEvent, actor: JobActor, guards?: JobGuards): JobStatus | 'DELETED';
export interface WorkDay {
    date: string;
    startTime: string;
    endTime: string;
}
export declare function deriveWorkDays(startsOn: string, endsOn: string, dayStartTime: string, dayEndTime: string, explicit?: {
    date: string;
    startTime?: string;
    endTime?: string;
    headcount?: number;
}[]): WorkDay[];
export declare function payLabel(payType: 'HOUR' | 'DAY' | 'TOTAL', payAmountPaise: number): string;
