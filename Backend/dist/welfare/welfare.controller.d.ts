import { WelfareService } from './welfare.service.js';
export declare class WelfareController {
    private readonly welfare;
    constructor(welfare: WelfareService);
    catalog(query: {
        activeOnly: boolean;
    }): Promise<{
        data: {
            code: string;
            label: string;
            category: "SAFETY" | "OTHER" | "FOOD" | "TRANSPORT" | "FACILITY";
            active: boolean;
            sortOrder: number;
            labelTa?: string | null | undefined;
        }[];
    }>;
}
