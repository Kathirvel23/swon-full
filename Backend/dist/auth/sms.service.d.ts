import { PrismaService } from '../prisma/prisma.service.js';
export interface SmsPort {
    sendOtp(phone: string, code: string): Promise<void>;
}
export declare const SMS_PORT: unique symbol;
export declare class DevSmsAdapter implements SmsPort {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    sendOtp(phone: string, code: string): Promise<void>;
}
