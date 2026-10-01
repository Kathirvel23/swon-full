import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/all-exceptions.filter.js';
import { RequestIdInterceptor } from './common/request-id.interceptor.js';
export const API_PREFIX = 'api/v1';
export function configureApp(app) {
    const config = app.get(ConfigService);
    app.setGlobalPrefix(API_PREFIX);
    app.enableCors({
        origin: config.get('corsOrigins') ?? [],
        exposedHeaders: ['x-request-id'],
    });
    app.useGlobalInterceptors(new RequestIdInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());
}
//# sourceMappingURL=bootstrap.js.map