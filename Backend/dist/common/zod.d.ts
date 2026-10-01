import type { z } from 'zod';
export declare const ZodBody: <T extends z.ZodType>(schema: T) => ParameterDecorator;
export declare const ZodQuery: <T extends z.ZodType>(schema: T) => ParameterDecorator;
export declare const ZodParams: <T extends z.ZodType>(schema: T) => ParameterDecorator;
