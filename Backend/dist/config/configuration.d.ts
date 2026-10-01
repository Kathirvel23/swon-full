declare const _default: () => {
    port: number;
    nodeEnv: string;
    corsOrigins: string[];
    apiVersion: string;
    auth: {
        accessSecret: string;
        accessTtlSec: number;
        refreshTtlDays: number;
    };
    otp: {
        cooldownSec: number;
        ttlSec: number;
        maxAttempts: number;
        sim: boolean;
    };
    kyc: {
        idSecret: string;
        maxBytes: number;
        maxAttempts: number;
        consentVersion: string;
    };
    admin: {
        phones: string[];
    };
};
export default _default;
