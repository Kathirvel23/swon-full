import { ConfigService } from '@nestjs/config';
import type { PublicConfig } from '@workbridge/contracts';
export declare class ConfigController {
    private readonly config;
    constructor(config: ConfigService);
    getConfig(): {
        data: PublicConfig;
    };
}
