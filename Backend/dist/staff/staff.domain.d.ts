export type UiStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'NOT_MARKED';
export declare const LATE_GRACE_MIN = 10;
export declare const WRITABLE: readonly UiStatus[];
export declare function uiStatus(record: {
    status: string;
    checkInAt: Date | null;
} | null, dayStart: Date | null, graceMin?: number): UiStatus;
export declare function statusToStored(ui: UiStatus): 'CHECKED_IN' | 'NO_SHOW' | 'NOT_STARTED';
export declare function summarise(statuses: readonly UiStatus[]): {
    total: number;
    present: number;
    late: number;
    absent: number;
    notMarked: number;
};
export declare function normalisePct(raw: unknown): number;
export declare function pctFromConfig(value: unknown): number;
export declare function computeIncentivePaise(basePaise: number, pct: number): number;
