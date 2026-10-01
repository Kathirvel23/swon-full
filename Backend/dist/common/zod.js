import { createParamDecorator } from '@nestjs/common';
import { ApiError } from './api-error.js';
const parseWith = (key, schema, host) => {
    const req = host.switchToHttp().getRequest();
    const parsed = schema.safeParse(req[key]);
    if (!parsed.success) {
        throw new ApiError('VALIDATION_FAILED', 'Validation failed', parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })));
    }
    return parsed.data;
};
export const ZodBody = (schema) => createParamDecorator((_data, host) => parseWith('body', schema, host))();
export const ZodQuery = (schema) => createParamDecorator((_data, host) => parseWith('query', schema, host))();
export const ZodParams = (schema) => createParamDecorator((_data, host) => parseWith('params', schema, host))();
//# sourceMappingURL=zod.js.map