import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Account: "Account";
    readonly WorkerProfile: "WorkerProfile";
    readonly EmployerProfile: "EmployerProfile";
    readonly KycSubmission: "KycSubmission";
    readonly KycDocument: "KycDocument";
    readonly KycConsent: "KycConsent";
    readonly DocumentAccessLog: "DocumentAccessLog";
    readonly Session: "Session";
    readonly OtpChallenge: "OtpChallenge";
    readonly PushToken: "PushToken";
    readonly Area: "Area";
    readonly JobCategory: "JobCategory";
    readonly Skill: "Skill";
    readonly WelfareItem: "WelfareItem";
    readonly WorkerSkill: "WorkerSkill";
    readonly Job: "Job";
    readonly JobWorkDay: "JobWorkDay";
    readonly JobSkill: "JobSkill";
    readonly JobWelfare: "JobWelfare";
    readonly Application: "Application";
    readonly QuickMatchOffer: "QuickMatchOffer";
    readonly CrewMember: "CrewMember";
    readonly JobStaffAssignment: "JobStaffAssignment";
    readonly AttendanceRecord: "AttendanceRecord";
    readonly Earning: "Earning";
    readonly PaymentTransaction: "PaymentTransaction";
    readonly PaymentEarning: "PaymentEarning";
    readonly Rating: "Rating";
    readonly Notification: "Notification";
    readonly Complaint: "Complaint";
    readonly ComplaintEvent: "ComplaintEvent";
    readonly AvailabilitySlot: "AvailabilitySlot";
    readonly NotificationOutbox: "NotificationOutbox";
    readonly NotificationDelivery: "NotificationDelivery";
    readonly NotificationPref: "NotificationPref";
    readonly SmsLog: "SmsLog";
    readonly AuditLog: "AuditLog";
    readonly Sanction: "Sanction";
    readonly PlatformConfig: "PlatformConfig";
    readonly IdempotencyKey: "IdempotencyKey";
    readonly MatchLog: "MatchLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "account" | "workerProfile" | "employerProfile" | "kycSubmission" | "kycDocument" | "kycConsent" | "documentAccessLog" | "session" | "otpChallenge" | "pushToken" | "area" | "jobCategory" | "skill" | "welfareItem" | "workerSkill" | "job" | "jobWorkDay" | "jobSkill" | "jobWelfare" | "application" | "quickMatchOffer" | "crewMember" | "jobStaffAssignment" | "attendanceRecord" | "earning" | "paymentTransaction" | "paymentEarning" | "rating" | "notification" | "complaint" | "complaintEvent" | "availabilitySlot" | "notificationOutbox" | "notificationDelivery" | "notificationPref" | "smsLog" | "auditLog" | "sanction" | "platformConfig" | "idempotencyKey" | "matchLog";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Account: {
            payload: Prisma.$AccountPayload<ExtArgs>;
            fields: Prisma.AccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findFirst: {
                    args: Prisma.AccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findMany: {
                    args: Prisma.AccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                create: {
                    args: Prisma.AccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                createMany: {
                    args: Prisma.AccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                update: {
                    args: Prisma.AccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                deleteMany: {
                    args: Prisma.AccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                aggregate: {
                    args: Prisma.AccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccount>;
                };
                groupBy: {
                    args: Prisma.AccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountCountAggregateOutputType> | number;
                };
            };
        };
        WorkerProfile: {
            payload: Prisma.$WorkerProfilePayload<ExtArgs>;
            fields: Prisma.WorkerProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkerProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkerProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload>;
                };
                findFirst: {
                    args: Prisma.WorkerProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkerProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload>;
                };
                findMany: {
                    args: Prisma.WorkerProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload>[];
                };
                create: {
                    args: Prisma.WorkerProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload>;
                };
                createMany: {
                    args: Prisma.WorkerProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.WorkerProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload>;
                };
                update: {
                    args: Prisma.WorkerProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkerProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkerProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.WorkerProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerProfilePayload>;
                };
                aggregate: {
                    args: Prisma.WorkerProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkerProfile>;
                };
                groupBy: {
                    args: Prisma.WorkerProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkerProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkerProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkerProfileCountAggregateOutputType> | number;
                };
            };
        };
        EmployerProfile: {
            payload: Prisma.$EmployerProfilePayload<ExtArgs>;
            fields: Prisma.EmployerProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmployerProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmployerProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload>;
                };
                findFirst: {
                    args: Prisma.EmployerProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmployerProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload>;
                };
                findMany: {
                    args: Prisma.EmployerProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload>[];
                };
                create: {
                    args: Prisma.EmployerProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload>;
                };
                createMany: {
                    args: Prisma.EmployerProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.EmployerProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload>;
                };
                update: {
                    args: Prisma.EmployerProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.EmployerProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmployerProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.EmployerProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployerProfilePayload>;
                };
                aggregate: {
                    args: Prisma.EmployerProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmployerProfile>;
                };
                groupBy: {
                    args: Prisma.EmployerProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmployerProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmployerProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmployerProfileCountAggregateOutputType> | number;
                };
            };
        };
        KycSubmission: {
            payload: Prisma.$KycSubmissionPayload<ExtArgs>;
            fields: Prisma.KycSubmissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KycSubmissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KycSubmissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload>;
                };
                findFirst: {
                    args: Prisma.KycSubmissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KycSubmissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload>;
                };
                findMany: {
                    args: Prisma.KycSubmissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload>[];
                };
                create: {
                    args: Prisma.KycSubmissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload>;
                };
                createMany: {
                    args: Prisma.KycSubmissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.KycSubmissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload>;
                };
                update: {
                    args: Prisma.KycSubmissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload>;
                };
                deleteMany: {
                    args: Prisma.KycSubmissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KycSubmissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.KycSubmissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycSubmissionPayload>;
                };
                aggregate: {
                    args: Prisma.KycSubmissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKycSubmission>;
                };
                groupBy: {
                    args: Prisma.KycSubmissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KycSubmissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KycSubmissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KycSubmissionCountAggregateOutputType> | number;
                };
            };
        };
        KycDocument: {
            payload: Prisma.$KycDocumentPayload<ExtArgs>;
            fields: Prisma.KycDocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KycDocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KycDocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload>;
                };
                findFirst: {
                    args: Prisma.KycDocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KycDocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload>;
                };
                findMany: {
                    args: Prisma.KycDocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload>[];
                };
                create: {
                    args: Prisma.KycDocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload>;
                };
                createMany: {
                    args: Prisma.KycDocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.KycDocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload>;
                };
                update: {
                    args: Prisma.KycDocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.KycDocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KycDocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.KycDocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycDocumentPayload>;
                };
                aggregate: {
                    args: Prisma.KycDocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKycDocument>;
                };
                groupBy: {
                    args: Prisma.KycDocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KycDocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KycDocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KycDocumentCountAggregateOutputType> | number;
                };
            };
        };
        KycConsent: {
            payload: Prisma.$KycConsentPayload<ExtArgs>;
            fields: Prisma.KycConsentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KycConsentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KycConsentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload>;
                };
                findFirst: {
                    args: Prisma.KycConsentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KycConsentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload>;
                };
                findMany: {
                    args: Prisma.KycConsentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload>[];
                };
                create: {
                    args: Prisma.KycConsentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload>;
                };
                createMany: {
                    args: Prisma.KycConsentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.KycConsentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload>;
                };
                update: {
                    args: Prisma.KycConsentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload>;
                };
                deleteMany: {
                    args: Prisma.KycConsentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KycConsentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.KycConsentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KycConsentPayload>;
                };
                aggregate: {
                    args: Prisma.KycConsentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKycConsent>;
                };
                groupBy: {
                    args: Prisma.KycConsentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KycConsentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KycConsentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KycConsentCountAggregateOutputType> | number;
                };
            };
        };
        DocumentAccessLog: {
            payload: Prisma.$DocumentAccessLogPayload<ExtArgs>;
            fields: Prisma.DocumentAccessLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DocumentAccessLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DocumentAccessLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>;
                };
                findFirst: {
                    args: Prisma.DocumentAccessLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DocumentAccessLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>;
                };
                findMany: {
                    args: Prisma.DocumentAccessLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>[];
                };
                create: {
                    args: Prisma.DocumentAccessLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>;
                };
                createMany: {
                    args: Prisma.DocumentAccessLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.DocumentAccessLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>;
                };
                update: {
                    args: Prisma.DocumentAccessLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>;
                };
                deleteMany: {
                    args: Prisma.DocumentAccessLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DocumentAccessLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.DocumentAccessLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>;
                };
                aggregate: {
                    args: Prisma.DocumentAccessLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDocumentAccessLog>;
                };
                groupBy: {
                    args: Prisma.DocumentAccessLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentAccessLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DocumentAccessLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentAccessLogCountAggregateOutputType> | number;
                };
            };
        };
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        OtpChallenge: {
            payload: Prisma.$OtpChallengePayload<ExtArgs>;
            fields: Prisma.OtpChallengeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OtpChallengeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OtpChallengeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload>;
                };
                findFirst: {
                    args: Prisma.OtpChallengeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OtpChallengeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload>;
                };
                findMany: {
                    args: Prisma.OtpChallengeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload>[];
                };
                create: {
                    args: Prisma.OtpChallengeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload>;
                };
                createMany: {
                    args: Prisma.OtpChallengeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.OtpChallengeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload>;
                };
                update: {
                    args: Prisma.OtpChallengeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload>;
                };
                deleteMany: {
                    args: Prisma.OtpChallengeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OtpChallengeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.OtpChallengeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OtpChallengePayload>;
                };
                aggregate: {
                    args: Prisma.OtpChallengeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOtpChallenge>;
                };
                groupBy: {
                    args: Prisma.OtpChallengeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OtpChallengeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OtpChallengeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OtpChallengeCountAggregateOutputType> | number;
                };
            };
        };
        PushToken: {
            payload: Prisma.$PushTokenPayload<ExtArgs>;
            fields: Prisma.PushTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PushTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PushTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload>;
                };
                findFirst: {
                    args: Prisma.PushTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PushTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload>;
                };
                findMany: {
                    args: Prisma.PushTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload>[];
                };
                create: {
                    args: Prisma.PushTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload>;
                };
                createMany: {
                    args: Prisma.PushTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PushTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload>;
                };
                update: {
                    args: Prisma.PushTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.PushTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PushTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PushTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushTokenPayload>;
                };
                aggregate: {
                    args: Prisma.PushTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePushToken>;
                };
                groupBy: {
                    args: Prisma.PushTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PushTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PushTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PushTokenCountAggregateOutputType> | number;
                };
            };
        };
        Area: {
            payload: Prisma.$AreaPayload<ExtArgs>;
            fields: Prisma.AreaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AreaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AreaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload>;
                };
                findFirst: {
                    args: Prisma.AreaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AreaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload>;
                };
                findMany: {
                    args: Prisma.AreaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload>[];
                };
                create: {
                    args: Prisma.AreaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload>;
                };
                createMany: {
                    args: Prisma.AreaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AreaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload>;
                };
                update: {
                    args: Prisma.AreaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload>;
                };
                deleteMany: {
                    args: Prisma.AreaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AreaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AreaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AreaPayload>;
                };
                aggregate: {
                    args: Prisma.AreaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateArea>;
                };
                groupBy: {
                    args: Prisma.AreaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AreaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AreaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AreaCountAggregateOutputType> | number;
                };
            };
        };
        JobCategory: {
            payload: Prisma.$JobCategoryPayload<ExtArgs>;
            fields: Prisma.JobCategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobCategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobCategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload>;
                };
                findFirst: {
                    args: Prisma.JobCategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobCategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload>;
                };
                findMany: {
                    args: Prisma.JobCategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload>[];
                };
                create: {
                    args: Prisma.JobCategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload>;
                };
                createMany: {
                    args: Prisma.JobCategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.JobCategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload>;
                };
                update: {
                    args: Prisma.JobCategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.JobCategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobCategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.JobCategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobCategoryPayload>;
                };
                aggregate: {
                    args: Prisma.JobCategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobCategory>;
                };
                groupBy: {
                    args: Prisma.JobCategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobCategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobCategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobCategoryCountAggregateOutputType> | number;
                };
            };
        };
        Skill: {
            payload: Prisma.$SkillPayload<ExtArgs>;
            fields: Prisma.SkillFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SkillFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload>;
                };
                findFirst: {
                    args: Prisma.SkillFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload>;
                };
                findMany: {
                    args: Prisma.SkillFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload>[];
                };
                create: {
                    args: Prisma.SkillCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload>;
                };
                createMany: {
                    args: Prisma.SkillCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SkillDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload>;
                };
                update: {
                    args: Prisma.SkillUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload>;
                };
                deleteMany: {
                    args: Prisma.SkillDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SkillUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SkillUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SkillPayload>;
                };
                aggregate: {
                    args: Prisma.SkillAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSkill>;
                };
                groupBy: {
                    args: Prisma.SkillGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SkillGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SkillCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SkillCountAggregateOutputType> | number;
                };
            };
        };
        WelfareItem: {
            payload: Prisma.$WelfareItemPayload<ExtArgs>;
            fields: Prisma.WelfareItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WelfareItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WelfareItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload>;
                };
                findFirst: {
                    args: Prisma.WelfareItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WelfareItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload>;
                };
                findMany: {
                    args: Prisma.WelfareItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload>[];
                };
                create: {
                    args: Prisma.WelfareItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload>;
                };
                createMany: {
                    args: Prisma.WelfareItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.WelfareItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload>;
                };
                update: {
                    args: Prisma.WelfareItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload>;
                };
                deleteMany: {
                    args: Prisma.WelfareItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WelfareItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.WelfareItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WelfareItemPayload>;
                };
                aggregate: {
                    args: Prisma.WelfareItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWelfareItem>;
                };
                groupBy: {
                    args: Prisma.WelfareItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WelfareItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WelfareItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WelfareItemCountAggregateOutputType> | number;
                };
            };
        };
        WorkerSkill: {
            payload: Prisma.$WorkerSkillPayload<ExtArgs>;
            fields: Prisma.WorkerSkillFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkerSkillFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkerSkillFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload>;
                };
                findFirst: {
                    args: Prisma.WorkerSkillFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkerSkillFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload>;
                };
                findMany: {
                    args: Prisma.WorkerSkillFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload>[];
                };
                create: {
                    args: Prisma.WorkerSkillCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload>;
                };
                createMany: {
                    args: Prisma.WorkerSkillCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.WorkerSkillDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload>;
                };
                update: {
                    args: Prisma.WorkerSkillUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkerSkillDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkerSkillUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.WorkerSkillUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkerSkillPayload>;
                };
                aggregate: {
                    args: Prisma.WorkerSkillAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkerSkill>;
                };
                groupBy: {
                    args: Prisma.WorkerSkillGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkerSkillGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkerSkillCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkerSkillCountAggregateOutputType> | number;
                };
            };
        };
        Job: {
            payload: Prisma.$JobPayload<ExtArgs>;
            fields: Prisma.JobFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                findFirst: {
                    args: Prisma.JobFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                findMany: {
                    args: Prisma.JobFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>[];
                };
                create: {
                    args: Prisma.JobCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                createMany: {
                    args: Prisma.JobCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.JobDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                update: {
                    args: Prisma.JobUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                deleteMany: {
                    args: Prisma.JobDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.JobUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobPayload>;
                };
                aggregate: {
                    args: Prisma.JobAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJob>;
                };
                groupBy: {
                    args: Prisma.JobGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobCountAggregateOutputType> | number;
                };
            };
        };
        JobWorkDay: {
            payload: Prisma.$JobWorkDayPayload<ExtArgs>;
            fields: Prisma.JobWorkDayFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobWorkDayFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobWorkDayFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload>;
                };
                findFirst: {
                    args: Prisma.JobWorkDayFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobWorkDayFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload>;
                };
                findMany: {
                    args: Prisma.JobWorkDayFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload>[];
                };
                create: {
                    args: Prisma.JobWorkDayCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload>;
                };
                createMany: {
                    args: Prisma.JobWorkDayCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.JobWorkDayDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload>;
                };
                update: {
                    args: Prisma.JobWorkDayUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload>;
                };
                deleteMany: {
                    args: Prisma.JobWorkDayDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobWorkDayUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.JobWorkDayUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWorkDayPayload>;
                };
                aggregate: {
                    args: Prisma.JobWorkDayAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobWorkDay>;
                };
                groupBy: {
                    args: Prisma.JobWorkDayGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobWorkDayGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobWorkDayCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobWorkDayCountAggregateOutputType> | number;
                };
            };
        };
        JobSkill: {
            payload: Prisma.$JobSkillPayload<ExtArgs>;
            fields: Prisma.JobSkillFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobSkillFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobSkillFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload>;
                };
                findFirst: {
                    args: Prisma.JobSkillFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobSkillFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload>;
                };
                findMany: {
                    args: Prisma.JobSkillFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload>[];
                };
                create: {
                    args: Prisma.JobSkillCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload>;
                };
                createMany: {
                    args: Prisma.JobSkillCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.JobSkillDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload>;
                };
                update: {
                    args: Prisma.JobSkillUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload>;
                };
                deleteMany: {
                    args: Prisma.JobSkillDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobSkillUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.JobSkillUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobSkillPayload>;
                };
                aggregate: {
                    args: Prisma.JobSkillAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobSkill>;
                };
                groupBy: {
                    args: Prisma.JobSkillGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobSkillGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobSkillCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobSkillCountAggregateOutputType> | number;
                };
            };
        };
        JobWelfare: {
            payload: Prisma.$JobWelfarePayload<ExtArgs>;
            fields: Prisma.JobWelfareFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobWelfareFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobWelfareFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload>;
                };
                findFirst: {
                    args: Prisma.JobWelfareFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobWelfareFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload>;
                };
                findMany: {
                    args: Prisma.JobWelfareFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload>[];
                };
                create: {
                    args: Prisma.JobWelfareCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload>;
                };
                createMany: {
                    args: Prisma.JobWelfareCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.JobWelfareDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload>;
                };
                update: {
                    args: Prisma.JobWelfareUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload>;
                };
                deleteMany: {
                    args: Prisma.JobWelfareDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobWelfareUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.JobWelfareUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobWelfarePayload>;
                };
                aggregate: {
                    args: Prisma.JobWelfareAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobWelfare>;
                };
                groupBy: {
                    args: Prisma.JobWelfareGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobWelfareGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobWelfareCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobWelfareCountAggregateOutputType> | number;
                };
            };
        };
        Application: {
            payload: Prisma.$ApplicationPayload<ExtArgs>;
            fields: Prisma.ApplicationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ApplicationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload>;
                };
                findFirst: {
                    args: Prisma.ApplicationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload>;
                };
                findMany: {
                    args: Prisma.ApplicationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload>[];
                };
                create: {
                    args: Prisma.ApplicationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload>;
                };
                createMany: {
                    args: Prisma.ApplicationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ApplicationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload>;
                };
                update: {
                    args: Prisma.ApplicationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload>;
                };
                deleteMany: {
                    args: Prisma.ApplicationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ApplicationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ApplicationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApplicationPayload>;
                };
                aggregate: {
                    args: Prisma.ApplicationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateApplication>;
                };
                groupBy: {
                    args: Prisma.ApplicationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ApplicationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ApplicationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ApplicationCountAggregateOutputType> | number;
                };
            };
        };
        QuickMatchOffer: {
            payload: Prisma.$QuickMatchOfferPayload<ExtArgs>;
            fields: Prisma.QuickMatchOfferFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QuickMatchOfferFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QuickMatchOfferFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload>;
                };
                findFirst: {
                    args: Prisma.QuickMatchOfferFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QuickMatchOfferFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload>;
                };
                findMany: {
                    args: Prisma.QuickMatchOfferFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload>[];
                };
                create: {
                    args: Prisma.QuickMatchOfferCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload>;
                };
                createMany: {
                    args: Prisma.QuickMatchOfferCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.QuickMatchOfferDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload>;
                };
                update: {
                    args: Prisma.QuickMatchOfferUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload>;
                };
                deleteMany: {
                    args: Prisma.QuickMatchOfferDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QuickMatchOfferUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.QuickMatchOfferUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuickMatchOfferPayload>;
                };
                aggregate: {
                    args: Prisma.QuickMatchOfferAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQuickMatchOffer>;
                };
                groupBy: {
                    args: Prisma.QuickMatchOfferGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuickMatchOfferGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QuickMatchOfferCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuickMatchOfferCountAggregateOutputType> | number;
                };
            };
        };
        CrewMember: {
            payload: Prisma.$CrewMemberPayload<ExtArgs>;
            fields: Prisma.CrewMemberFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CrewMemberFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CrewMemberFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload>;
                };
                findFirst: {
                    args: Prisma.CrewMemberFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CrewMemberFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload>;
                };
                findMany: {
                    args: Prisma.CrewMemberFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload>[];
                };
                create: {
                    args: Prisma.CrewMemberCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload>;
                };
                createMany: {
                    args: Prisma.CrewMemberCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.CrewMemberDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload>;
                };
                update: {
                    args: Prisma.CrewMemberUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload>;
                };
                deleteMany: {
                    args: Prisma.CrewMemberDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CrewMemberUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.CrewMemberUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CrewMemberPayload>;
                };
                aggregate: {
                    args: Prisma.CrewMemberAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCrewMember>;
                };
                groupBy: {
                    args: Prisma.CrewMemberGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CrewMemberGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CrewMemberCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CrewMemberCountAggregateOutputType> | number;
                };
            };
        };
        JobStaffAssignment: {
            payload: Prisma.$JobStaffAssignmentPayload<ExtArgs>;
            fields: Prisma.JobStaffAssignmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JobStaffAssignmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JobStaffAssignmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload>;
                };
                findFirst: {
                    args: Prisma.JobStaffAssignmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JobStaffAssignmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload>;
                };
                findMany: {
                    args: Prisma.JobStaffAssignmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload>[];
                };
                create: {
                    args: Prisma.JobStaffAssignmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload>;
                };
                createMany: {
                    args: Prisma.JobStaffAssignmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.JobStaffAssignmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload>;
                };
                update: {
                    args: Prisma.JobStaffAssignmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload>;
                };
                deleteMany: {
                    args: Prisma.JobStaffAssignmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JobStaffAssignmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.JobStaffAssignmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JobStaffAssignmentPayload>;
                };
                aggregate: {
                    args: Prisma.JobStaffAssignmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJobStaffAssignment>;
                };
                groupBy: {
                    args: Prisma.JobStaffAssignmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobStaffAssignmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JobStaffAssignmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JobStaffAssignmentCountAggregateOutputType> | number;
                };
            };
        };
        AttendanceRecord: {
            payload: Prisma.$AttendanceRecordPayload<ExtArgs>;
            fields: Prisma.AttendanceRecordFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AttendanceRecordFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
                };
                findFirst: {
                    args: Prisma.AttendanceRecordFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AttendanceRecordFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
                };
                findMany: {
                    args: Prisma.AttendanceRecordFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[];
                };
                create: {
                    args: Prisma.AttendanceRecordCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
                };
                createMany: {
                    args: Prisma.AttendanceRecordCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AttendanceRecordDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
                };
                update: {
                    args: Prisma.AttendanceRecordUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
                };
                deleteMany: {
                    args: Prisma.AttendanceRecordDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AttendanceRecordUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AttendanceRecordUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
                };
                aggregate: {
                    args: Prisma.AttendanceRecordAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAttendanceRecord>;
                };
                groupBy: {
                    args: Prisma.AttendanceRecordGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttendanceRecordGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AttendanceRecordCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttendanceRecordCountAggregateOutputType> | number;
                };
            };
        };
        Earning: {
            payload: Prisma.$EarningPayload<ExtArgs>;
            fields: Prisma.EarningFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EarningFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EarningFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload>;
                };
                findFirst: {
                    args: Prisma.EarningFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EarningFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload>;
                };
                findMany: {
                    args: Prisma.EarningFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload>[];
                };
                create: {
                    args: Prisma.EarningCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload>;
                };
                createMany: {
                    args: Prisma.EarningCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.EarningDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload>;
                };
                update: {
                    args: Prisma.EarningUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload>;
                };
                deleteMany: {
                    args: Prisma.EarningDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EarningUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.EarningUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EarningPayload>;
                };
                aggregate: {
                    args: Prisma.EarningAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEarning>;
                };
                groupBy: {
                    args: Prisma.EarningGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EarningGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EarningCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EarningCountAggregateOutputType> | number;
                };
            };
        };
        PaymentTransaction: {
            payload: Prisma.$PaymentTransactionPayload<ExtArgs>;
            fields: Prisma.PaymentTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                findMany: {
                    args: Prisma.PaymentTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[];
                };
                create: {
                    args: Prisma.PaymentTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                createMany: {
                    args: Prisma.PaymentTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PaymentTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                update: {
                    args: Prisma.PaymentTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PaymentTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePaymentTransaction>;
                };
                groupBy: {
                    args: Prisma.PaymentTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentTransactionCountAggregateOutputType> | number;
                };
            };
        };
        PaymentEarning: {
            payload: Prisma.$PaymentEarningPayload<ExtArgs>;
            fields: Prisma.PaymentEarningFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentEarningFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentEarningFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentEarningFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentEarningFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload>;
                };
                findMany: {
                    args: Prisma.PaymentEarningFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload>[];
                };
                create: {
                    args: Prisma.PaymentEarningCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload>;
                };
                createMany: {
                    args: Prisma.PaymentEarningCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PaymentEarningDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload>;
                };
                update: {
                    args: Prisma.PaymentEarningUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentEarningDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentEarningUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PaymentEarningUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentEarningPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentEarningAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePaymentEarning>;
                };
                groupBy: {
                    args: Prisma.PaymentEarningGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentEarningGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentEarningCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentEarningCountAggregateOutputType> | number;
                };
            };
        };
        Rating: {
            payload: Prisma.$RatingPayload<ExtArgs>;
            fields: Prisma.RatingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RatingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                findFirst: {
                    args: Prisma.RatingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                findMany: {
                    args: Prisma.RatingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>[];
                };
                create: {
                    args: Prisma.RatingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                createMany: {
                    args: Prisma.RatingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.RatingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                update: {
                    args: Prisma.RatingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                deleteMany: {
                    args: Prisma.RatingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RatingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.RatingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                aggregate: {
                    args: Prisma.RatingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRating>;
                };
                groupBy: {
                    args: Prisma.RatingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RatingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        Complaint: {
            payload: Prisma.$ComplaintPayload<ExtArgs>;
            fields: Prisma.ComplaintFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ComplaintFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ComplaintFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload>;
                };
                findFirst: {
                    args: Prisma.ComplaintFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ComplaintFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload>;
                };
                findMany: {
                    args: Prisma.ComplaintFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload>[];
                };
                create: {
                    args: Prisma.ComplaintCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload>;
                };
                createMany: {
                    args: Prisma.ComplaintCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ComplaintDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload>;
                };
                update: {
                    args: Prisma.ComplaintUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload>;
                };
                deleteMany: {
                    args: Prisma.ComplaintDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ComplaintUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ComplaintUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintPayload>;
                };
                aggregate: {
                    args: Prisma.ComplaintAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateComplaint>;
                };
                groupBy: {
                    args: Prisma.ComplaintGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ComplaintGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ComplaintCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ComplaintCountAggregateOutputType> | number;
                };
            };
        };
        ComplaintEvent: {
            payload: Prisma.$ComplaintEventPayload<ExtArgs>;
            fields: Prisma.ComplaintEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ComplaintEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ComplaintEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload>;
                };
                findFirst: {
                    args: Prisma.ComplaintEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ComplaintEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload>;
                };
                findMany: {
                    args: Prisma.ComplaintEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload>[];
                };
                create: {
                    args: Prisma.ComplaintEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload>;
                };
                createMany: {
                    args: Prisma.ComplaintEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ComplaintEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload>;
                };
                update: {
                    args: Prisma.ComplaintEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload>;
                };
                deleteMany: {
                    args: Prisma.ComplaintEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ComplaintEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ComplaintEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComplaintEventPayload>;
                };
                aggregate: {
                    args: Prisma.ComplaintEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateComplaintEvent>;
                };
                groupBy: {
                    args: Prisma.ComplaintEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ComplaintEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ComplaintEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ComplaintEventCountAggregateOutputType> | number;
                };
            };
        };
        AvailabilitySlot: {
            payload: Prisma.$AvailabilitySlotPayload<ExtArgs>;
            fields: Prisma.AvailabilitySlotFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AvailabilitySlotFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AvailabilitySlotFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload>;
                };
                findFirst: {
                    args: Prisma.AvailabilitySlotFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AvailabilitySlotFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload>;
                };
                findMany: {
                    args: Prisma.AvailabilitySlotFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload>[];
                };
                create: {
                    args: Prisma.AvailabilitySlotCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload>;
                };
                createMany: {
                    args: Prisma.AvailabilitySlotCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AvailabilitySlotDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload>;
                };
                update: {
                    args: Prisma.AvailabilitySlotUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload>;
                };
                deleteMany: {
                    args: Prisma.AvailabilitySlotDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AvailabilitySlotUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AvailabilitySlotUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvailabilitySlotPayload>;
                };
                aggregate: {
                    args: Prisma.AvailabilitySlotAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAvailabilitySlot>;
                };
                groupBy: {
                    args: Prisma.AvailabilitySlotGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AvailabilitySlotGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AvailabilitySlotCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AvailabilitySlotCountAggregateOutputType> | number;
                };
            };
        };
        NotificationOutbox: {
            payload: Prisma.$NotificationOutboxPayload<ExtArgs>;
            fields: Prisma.NotificationOutboxFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationOutboxFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationOutboxFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationOutboxFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationOutboxFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload>;
                };
                findMany: {
                    args: Prisma.NotificationOutboxFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload>[];
                };
                create: {
                    args: Prisma.NotificationOutboxCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload>;
                };
                createMany: {
                    args: Prisma.NotificationOutboxCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.NotificationOutboxDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload>;
                };
                update: {
                    args: Prisma.NotificationOutboxUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationOutboxDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationOutboxUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.NotificationOutboxUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationOutboxPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationOutboxAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationOutbox>;
                };
                groupBy: {
                    args: Prisma.NotificationOutboxGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationOutboxGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationOutboxCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationOutboxCountAggregateOutputType> | number;
                };
            };
        };
        NotificationDelivery: {
            payload: Prisma.$NotificationDeliveryPayload<ExtArgs>;
            fields: Prisma.NotificationDeliveryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationDeliveryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationDeliveryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationDeliveryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationDeliveryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                findMany: {
                    args: Prisma.NotificationDeliveryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>[];
                };
                create: {
                    args: Prisma.NotificationDeliveryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                createMany: {
                    args: Prisma.NotificationDeliveryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.NotificationDeliveryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                update: {
                    args: Prisma.NotificationDeliveryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeliveryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationDeliveryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.NotificationDeliveryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationDeliveryPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationDeliveryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationDelivery>;
                };
                groupBy: {
                    args: Prisma.NotificationDeliveryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationDeliveryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationDeliveryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationDeliveryCountAggregateOutputType> | number;
                };
            };
        };
        NotificationPref: {
            payload: Prisma.$NotificationPrefPayload<ExtArgs>;
            fields: Prisma.NotificationPrefFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationPrefFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationPrefFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationPrefFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationPrefFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload>;
                };
                findMany: {
                    args: Prisma.NotificationPrefFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload>[];
                };
                create: {
                    args: Prisma.NotificationPrefCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload>;
                };
                createMany: {
                    args: Prisma.NotificationPrefCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.NotificationPrefDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload>;
                };
                update: {
                    args: Prisma.NotificationPrefUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationPrefDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationPrefUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.NotificationPrefUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPrefPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationPrefAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationPref>;
                };
                groupBy: {
                    args: Prisma.NotificationPrefGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPrefGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationPrefCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPrefCountAggregateOutputType> | number;
                };
            };
        };
        SmsLog: {
            payload: Prisma.$SmsLogPayload<ExtArgs>;
            fields: Prisma.SmsLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SmsLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SmsLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload>;
                };
                findFirst: {
                    args: Prisma.SmsLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SmsLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload>;
                };
                findMany: {
                    args: Prisma.SmsLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload>[];
                };
                create: {
                    args: Prisma.SmsLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload>;
                };
                createMany: {
                    args: Prisma.SmsLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SmsLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload>;
                };
                update: {
                    args: Prisma.SmsLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload>;
                };
                deleteMany: {
                    args: Prisma.SmsLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SmsLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SmsLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SmsLogPayload>;
                };
                aggregate: {
                    args: Prisma.SmsLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSmsLog>;
                };
                groupBy: {
                    args: Prisma.SmsLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SmsLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SmsLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SmsLogCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        Sanction: {
            payload: Prisma.$SanctionPayload<ExtArgs>;
            fields: Prisma.SanctionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SanctionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SanctionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload>;
                };
                findFirst: {
                    args: Prisma.SanctionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SanctionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload>;
                };
                findMany: {
                    args: Prisma.SanctionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload>[];
                };
                create: {
                    args: Prisma.SanctionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload>;
                };
                createMany: {
                    args: Prisma.SanctionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SanctionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload>;
                };
                update: {
                    args: Prisma.SanctionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload>;
                };
                deleteMany: {
                    args: Prisma.SanctionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SanctionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SanctionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SanctionPayload>;
                };
                aggregate: {
                    args: Prisma.SanctionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSanction>;
                };
                groupBy: {
                    args: Prisma.SanctionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SanctionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SanctionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SanctionCountAggregateOutputType> | number;
                };
            };
        };
        PlatformConfig: {
            payload: Prisma.$PlatformConfigPayload<ExtArgs>;
            fields: Prisma.PlatformConfigFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlatformConfigFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlatformConfigFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload>;
                };
                findFirst: {
                    args: Prisma.PlatformConfigFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlatformConfigFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload>;
                };
                findMany: {
                    args: Prisma.PlatformConfigFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload>[];
                };
                create: {
                    args: Prisma.PlatformConfigCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload>;
                };
                createMany: {
                    args: Prisma.PlatformConfigCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PlatformConfigDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload>;
                };
                update: {
                    args: Prisma.PlatformConfigUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload>;
                };
                deleteMany: {
                    args: Prisma.PlatformConfigDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlatformConfigUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PlatformConfigUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformConfigPayload>;
                };
                aggregate: {
                    args: Prisma.PlatformConfigAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlatformConfig>;
                };
                groupBy: {
                    args: Prisma.PlatformConfigGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformConfigGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlatformConfigCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformConfigCountAggregateOutputType> | number;
                };
            };
        };
        IdempotencyKey: {
            payload: Prisma.$IdempotencyKeyPayload<ExtArgs>;
            fields: Prisma.IdempotencyKeyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdempotencyKeyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdempotencyKeyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload>;
                };
                findFirst: {
                    args: Prisma.IdempotencyKeyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdempotencyKeyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload>;
                };
                findMany: {
                    args: Prisma.IdempotencyKeyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload>[];
                };
                create: {
                    args: Prisma.IdempotencyKeyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload>;
                };
                createMany: {
                    args: Prisma.IdempotencyKeyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.IdempotencyKeyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload>;
                };
                update: {
                    args: Prisma.IdempotencyKeyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload>;
                };
                deleteMany: {
                    args: Prisma.IdempotencyKeyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdempotencyKeyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.IdempotencyKeyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdempotencyKeyPayload>;
                };
                aggregate: {
                    args: Prisma.IdempotencyKeyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdempotencyKey>;
                };
                groupBy: {
                    args: Prisma.IdempotencyKeyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdempotencyKeyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdempotencyKeyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdempotencyKeyCountAggregateOutputType> | number;
                };
            };
        };
        MatchLog: {
            payload: Prisma.$MatchLogPayload<ExtArgs>;
            fields: Prisma.MatchLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MatchLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MatchLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload>;
                };
                findFirst: {
                    args: Prisma.MatchLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MatchLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload>;
                };
                findMany: {
                    args: Prisma.MatchLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload>[];
                };
                create: {
                    args: Prisma.MatchLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload>;
                };
                createMany: {
                    args: Prisma.MatchLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.MatchLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload>;
                };
                update: {
                    args: Prisma.MatchLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload>;
                };
                deleteMany: {
                    args: Prisma.MatchLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MatchLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.MatchLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MatchLogPayload>;
                };
                aggregate: {
                    args: Prisma.MatchLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMatchLog>;
                };
                groupBy: {
                    args: Prisma.MatchLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MatchLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MatchLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MatchLogCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly phone: "phone";
    readonly role: "role";
    readonly status: "status";
    readonly phoneVerifiedAt: "phoneVerifiedAt";
    readonly lastLoginAt: "lastLoginAt";
    readonly closedAt: "closedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const WorkerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly accountId: "accountId";
    readonly fullName: "fullName";
    readonly photoStorageKey: "photoStorageKey";
    readonly city: "city";
    readonly areaId: "areaId";
    readonly bio: "bio";
    readonly experienceYears: "experienceYears";
    readonly openToWork: "openToWork";
    readonly avgRatingMilli: "avgRatingMilli";
    readonly ratingsCount: "ratingsCount";
    readonly jobsDoneCount: "jobsDoneCount";
    readonly attendanceRateMilli: "attendanceRateMilli";
    readonly profileCompletePct: "profileCompletePct";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkerProfileScalarFieldEnum = (typeof WorkerProfileScalarFieldEnum)[keyof typeof WorkerProfileScalarFieldEnum];
export declare const EmployerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly accountId: "accountId";
    readonly orgName: "orgName";
    readonly orgType: "orgType";
    readonly contactName: "contactName";
    readonly city: "city";
    readonly areaId: "areaId";
    readonly addressLine: "addressLine";
    readonly panRef: "panRef";
    readonly gstin: "gstin";
    readonly verificationStatus: "verificationStatus";
    readonly welfareDefaults: "welfareDefaults";
    readonly avgRatingMilli: "avgRatingMilli";
    readonly ratingsCount: "ratingsCount";
    readonly jobsPostedCount: "jobsPostedCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EmployerProfileScalarFieldEnum = (typeof EmployerProfileScalarFieldEnum)[keyof typeof EmployerProfileScalarFieldEnum];
export declare const KycSubmissionScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly accountId: "accountId";
    readonly status: "status";
    readonly idType: "idType";
    readonly idNumberEnc: "idNumberEnc";
    readonly idNumberHash: "idNumberHash";
    readonly attempts: "attempts";
    readonly rejectionReason: "rejectionReason";
    readonly submittedAt: "submittedAt";
    readonly decidedAt: "decidedAt";
    readonly decidedByAccountId: "decidedByAccountId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type KycSubmissionScalarFieldEnum = (typeof KycSubmissionScalarFieldEnum)[keyof typeof KycSubmissionScalarFieldEnum];
export declare const KycDocumentScalarFieldEnum: {
    readonly id: "id";
    readonly submissionId: "submissionId";
    readonly docType: "docType";
    readonly storageKey: "storageKey";
    readonly contentSha: "contentSha";
    readonly mime: "mime";
    readonly sizeBytes: "sizeBytes";
    readonly createdAt: "createdAt";
};
export type KycDocumentScalarFieldEnum = (typeof KycDocumentScalarFieldEnum)[keyof typeof KycDocumentScalarFieldEnum];
export declare const KycConsentScalarFieldEnum: {
    readonly id: "id";
    readonly submissionId: "submissionId";
    readonly consentVer: "consentVer";
    readonly grantedAt: "grantedAt";
    readonly ipHash: "ipHash";
    readonly textSnapshot: "textSnapshot";
};
export type KycConsentScalarFieldEnum = (typeof KycConsentScalarFieldEnum)[keyof typeof KycConsentScalarFieldEnum];
export declare const DocumentAccessLogScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly actorId: "actorId";
    readonly action: "action";
    readonly at: "at";
    readonly ipHash: "ipHash";
};
export type DocumentAccessLogScalarFieldEnum = (typeof DocumentAccessLogScalarFieldEnum)[keyof typeof DocumentAccessLogScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly accountId: "accountId";
    readonly refreshTokenHash: "refreshTokenHash";
    readonly familyId: "familyId";
    readonly userAgent: "userAgent";
    readonly ipHash: "ipHash";
    readonly issuedAt: "issuedAt";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly lastUsedAt: "lastUsedAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const OtpChallengeScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly phone: "phone";
    readonly purpose: "purpose";
    readonly codeHash: "codeHash";
    readonly attempts: "attempts";
    readonly maxAttempts: "maxAttempts";
    readonly expiresAt: "expiresAt";
    readonly cooldownUntil: "cooldownUntil";
    readonly consumedAt: "consumedAt";
    readonly createdAt: "createdAt";
};
export type OtpChallengeScalarFieldEnum = (typeof OtpChallengeScalarFieldEnum)[keyof typeof OtpChallengeScalarFieldEnum];
export declare const PushTokenScalarFieldEnum: {
    readonly id: "id";
    readonly accountId: "accountId";
    readonly platform: "platform";
    readonly token: "token";
    readonly active: "active";
    readonly lastSeenAt: "lastSeenAt";
    readonly createdAt: "createdAt";
};
export type PushTokenScalarFieldEnum = (typeof PushTokenScalarFieldEnum)[keyof typeof PushTokenScalarFieldEnum];
export declare const AreaScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly city: "city";
    readonly name: "name";
    readonly nameTa: "nameTa";
    readonly lat: "lat";
    readonly lng: "lng";
    readonly active: "active";
    readonly sortOrder: "sortOrder";
};
export type AreaScalarFieldEnum = (typeof AreaScalarFieldEnum)[keyof typeof AreaScalarFieldEnum];
export declare const JobCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly code: "code";
    readonly name: "name";
    readonly nameTa: "nameTa";
    readonly parentId: "parentId";
    readonly sortOrder: "sortOrder";
    readonly active: "active";
    readonly suggestedPayMinPaise: "suggestedPayMinPaise";
};
export type JobCategoryScalarFieldEnum = (typeof JobCategoryScalarFieldEnum)[keyof typeof JobCategoryScalarFieldEnum];
export declare const SkillScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly code: "code";
    readonly name: "name";
    readonly nameTa: "nameTa";
    readonly categoryId: "categoryId";
    readonly active: "active";
    readonly sortOrder: "sortOrder";
};
export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum];
export declare const WelfareItemScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly code: "code";
    readonly label: "label";
    readonly labelTa: "labelTa";
    readonly sortOrder: "sortOrder";
    readonly active: "active";
};
export type WelfareItemScalarFieldEnum = (typeof WelfareItemScalarFieldEnum)[keyof typeof WelfareItemScalarFieldEnum];
export declare const WorkerSkillScalarFieldEnum: {
    readonly id: "id";
    readonly workerProfileId: "workerProfileId";
    readonly skillId: "skillId";
    readonly yearsHint: "yearsHint";
};
export type WorkerSkillScalarFieldEnum = (typeof WorkerSkillScalarFieldEnum)[keyof typeof WorkerSkillScalarFieldEnum];
export declare const JobScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly employerProfileId: "employerProfileId";
    readonly title: "title";
    readonly description: "description";
    readonly categoryId: "categoryId";
    readonly city: "city";
    readonly areaId: "areaId";
    readonly addressLine: "addressLine";
    readonly lat: "lat";
    readonly lng: "lng";
    readonly timezone: "timezone";
    readonly startsOn: "startsOn";
    readonly endsOn: "endsOn";
    readonly dayStartTime: "dayStartTime";
    readonly dayEndTime: "dayEndTime";
    readonly payType: "payType";
    readonly payAmountPaise: "payAmountPaise";
    readonly currency: "currency";
    readonly headcountRequired: "headcountRequired";
    readonly hiredCount: "hiredCount";
    readonly applicationCount: "applicationCount";
    readonly status: "status";
    readonly minExperienceYears: "minExperienceYears";
    readonly requirementsNote: "requirementsNote";
    readonly publishedAt: "publishedAt";
    readonly hiddenAt: "hiddenAt";
    readonly hiddenReason: "hiddenReason";
    readonly cancelledAt: "cancelledAt";
    readonly cancelReason: "cancelReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum];
export declare const JobWorkDayScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly workDate: "workDate";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly headcount: "headcount";
};
export type JobWorkDayScalarFieldEnum = (typeof JobWorkDayScalarFieldEnum)[keyof typeof JobWorkDayScalarFieldEnum];
export declare const JobSkillScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly skillId: "skillId";
};
export type JobSkillScalarFieldEnum = (typeof JobSkillScalarFieldEnum)[keyof typeof JobSkillScalarFieldEnum];
export declare const JobWelfareScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly welfareItemId: "welfareItemId";
    readonly note: "note";
};
export type JobWelfareScalarFieldEnum = (typeof JobWelfareScalarFieldEnum)[keyof typeof JobWelfareScalarFieldEnum];
export declare const ApplicationScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly workerProfileId: "workerProfileId";
    readonly status: "status";
    readonly source: "source";
    readonly quickMatchOfferId: "quickMatchOfferId";
    readonly coverNote: "coverNote";
    readonly decisionNote: "decisionNote";
    readonly decidedAt: "decidedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum];
export declare const QuickMatchOfferScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly workerProfileId: "workerProfileId";
    readonly status: "status";
    readonly waveNo: "waveNo";
    readonly requiredHeadcount: "requiredHeadcount";
    readonly respondBy: "respondBy";
    readonly respondedAt: "respondedAt";
    readonly requirementSnapshot: "requirementSnapshot";
    readonly windowStart: "windowStart";
    readonly windowEnd: "windowEnd";
    readonly distanceBand: "distanceBand";
    readonly createdAt: "createdAt";
};
export type QuickMatchOfferScalarFieldEnum = (typeof QuickMatchOfferScalarFieldEnum)[keyof typeof QuickMatchOfferScalarFieldEnum];
export declare const CrewMemberScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly applicationId: "applicationId";
    readonly workerProfileId: "workerProfileId";
    readonly status: "status";
    readonly releasedReason: "releasedReason";
    readonly hiredAt: "hiredAt";
    readonly releasedAt: "releasedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CrewMemberScalarFieldEnum = (typeof CrewMemberScalarFieldEnum)[keyof typeof CrewMemberScalarFieldEnum];
export declare const JobStaffAssignmentScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly workerProfileId: "workerProfileId";
    readonly role: "role";
    readonly status: "status";
    readonly assignedByAccountId: "assignedByAccountId";
    readonly incentivePct: "incentivePct";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JobStaffAssignmentScalarFieldEnum = (typeof JobStaffAssignmentScalarFieldEnum)[keyof typeof JobStaffAssignmentScalarFieldEnum];
export declare const AttendanceRecordScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly workDayId: "workDayId";
    readonly workerProfileId: "workerProfileId";
    readonly crewMemberId: "crewMemberId";
    readonly status: "status";
    readonly checkInAt: "checkInAt";
    readonly checkOutAt: "checkOutAt";
    readonly checkSource: "checkSource";
    readonly checkTokenId: "checkTokenId";
    readonly sourceLat: "sourceLat";
    readonly sourceLng: "sourceLng";
    readonly durationMinutes: "durationMinutes";
    readonly correctionReason: "correctionReason";
    readonly correctedByAccountId: "correctedByAccountId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AttendanceRecordScalarFieldEnum = (typeof AttendanceRecordScalarFieldEnum)[keyof typeof AttendanceRecordScalarFieldEnum];
export declare const EarningScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly workerProfileId: "workerProfileId";
    readonly status: "status";
    readonly amountPaise: "amountPaise";
    readonly currency: "currency";
    readonly adjustmentPaise: "adjustmentPaise";
    readonly adjustmentReason: "adjustmentReason";
    readonly holdComplaintId: "holdComplaintId";
    readonly approvedAt: "approvedAt";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EarningScalarFieldEnum = (typeof EarningScalarFieldEnum)[keyof typeof EarningScalarFieldEnum];
export declare const PaymentTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly status: "status";
    readonly amountPaise: "amountPaise";
    readonly currency: "currency";
    readonly reference: "reference";
    readonly evidenceStorageKey: "evidenceStorageKey";
    readonly recordedByAccountId: "recordedByAccountId";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
};
export type PaymentTransactionScalarFieldEnum = (typeof PaymentTransactionScalarFieldEnum)[keyof typeof PaymentTransactionScalarFieldEnum];
export declare const PaymentEarningScalarFieldEnum: {
    readonly earningId: "earningId";
    readonly paymentTransactionId: "paymentTransactionId";
    readonly amountPaise: "amountPaise";
};
export type PaymentEarningScalarFieldEnum = (typeof PaymentEarningScalarFieldEnum)[keyof typeof PaymentEarningScalarFieldEnum];
export declare const RatingScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly raterAccountId: "raterAccountId";
    readonly rateeAccountId: "rateeAccountId";
    readonly raterRole: "raterRole";
    readonly score: "score";
    readonly tags: "tags";
    readonly comment: "comment";
    readonly createdAt: "createdAt";
};
export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly recipientAccountId: "recipientAccountId";
    readonly eventKey: "eventKey";
    readonly titleKey: "titleKey";
    readonly bodyParams: "bodyParams";
    readonly contextType: "contextType";
    readonly contextPublicId: "contextPublicId";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const ComplaintScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly submitterAccountId: "submitterAccountId";
    readonly type: "type";
    readonly severity: "severity";
    readonly status: "status";
    readonly linkType: "linkType";
    readonly linkPublicId: "linkPublicId";
    readonly narrative: "narrative";
    readonly resolutionNote: "resolutionNote";
    readonly resolvedByAccountId: "resolvedByAccountId";
    readonly resolvedAt: "resolvedAt";
    readonly reopenedAt: "reopenedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ComplaintScalarFieldEnum = (typeof ComplaintScalarFieldEnum)[keyof typeof ComplaintScalarFieldEnum];
export declare const ComplaintEventScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly complaintId: "complaintId";
    readonly actorId: "actorId";
    readonly kind: "kind";
    readonly body: "body";
    readonly evidenceStorageKey: "evidenceStorageKey";
    readonly createdAt: "createdAt";
};
export type ComplaintEventScalarFieldEnum = (typeof ComplaintEventScalarFieldEnum)[keyof typeof ComplaintEventScalarFieldEnum];
export declare const AvailabilitySlotScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly workerProfileId: "workerProfileId";
    readonly workDate: "workDate";
    readonly fromTime: "fromTime";
    readonly toTime: "toTime";
    readonly areaId: "areaId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AvailabilitySlotScalarFieldEnum = (typeof AvailabilitySlotScalarFieldEnum)[keyof typeof AvailabilitySlotScalarFieldEnum];
export declare const NotificationOutboxScalarFieldEnum: {
    readonly id: "id";
    readonly eventKey: "eventKey";
    readonly dedupeKey: "dedupeKey";
    readonly payload: "payload";
    readonly status: "status";
    readonly attempts: "attempts";
    readonly nextAttemptAt: "nextAttemptAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationOutboxScalarFieldEnum = (typeof NotificationOutboxScalarFieldEnum)[keyof typeof NotificationOutboxScalarFieldEnum];
export declare const NotificationDeliveryScalarFieldEnum: {
    readonly id: "id";
    readonly outboxId: "outboxId";
    readonly recipientAccountId: "recipientAccountId";
    readonly channel: "channel";
    readonly status: "status";
    readonly providerRef: "providerRef";
    readonly errorCode: "errorCode";
    readonly attemptedAt: "attemptedAt";
    readonly createdAt: "createdAt";
};
export type NotificationDeliveryScalarFieldEnum = (typeof NotificationDeliveryScalarFieldEnum)[keyof typeof NotificationDeliveryScalarFieldEnum];
export declare const NotificationPrefScalarFieldEnum: {
    readonly accountId: "accountId";
    readonly pushEnabled: "pushEnabled";
    readonly smsEnabled: "smsEnabled";
    readonly quietHours: "quietHours";
    readonly updatedAt: "updatedAt";
};
export type NotificationPrefScalarFieldEnum = (typeof NotificationPrefScalarFieldEnum)[keyof typeof NotificationPrefScalarFieldEnum];
export declare const SmsLogScalarFieldEnum: {
    readonly id: "id";
    readonly phoneHash: "phoneHash";
    readonly templateId: "templateId";
    readonly purpose: "purpose";
    readonly providerRef: "providerRef";
    readonly status: "status";
    readonly costPaise: "costPaise";
    readonly createdAt: "createdAt";
};
export type SmsLogScalarFieldEnum = (typeof SmsLogScalarFieldEnum)[keyof typeof SmsLogScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly at: "at";
    readonly actorAccountId: "actorAccountId";
    readonly actorRole: "actorRole";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityPublicId: "entityPublicId";
    readonly beforeJson: "beforeJson";
    readonly afterJson: "afterJson";
    readonly requestId: "requestId";
    readonly ipHash: "ipHash";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const SanctionScalarFieldEnum: {
    readonly id: "id";
    readonly accountId: "accountId";
    readonly type: "type";
    readonly reason: "reason";
    readonly linkedComplaintId: "linkedComplaintId";
    readonly issuedByAccountId: "issuedByAccountId";
    readonly startsAt: "startsAt";
    readonly endsAt: "endsAt";
    readonly liftedAt: "liftedAt";
    readonly createdAt: "createdAt";
};
export type SanctionScalarFieldEnum = (typeof SanctionScalarFieldEnum)[keyof typeof SanctionScalarFieldEnum];
export declare const PlatformConfigScalarFieldEnum: {
    readonly key: "key";
    readonly valueJson: "valueJson";
    readonly scope: "scope";
    readonly version: "version";
    readonly updatedByAccountId: "updatedByAccountId";
    readonly updatedAt: "updatedAt";
};
export type PlatformConfigScalarFieldEnum = (typeof PlatformConfigScalarFieldEnum)[keyof typeof PlatformConfigScalarFieldEnum];
export declare const IdempotencyKeyScalarFieldEnum: {
    readonly key: "key";
    readonly accountId: "accountId";
    readonly requestHash: "requestHash";
    readonly responseJson: "responseJson";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly expiresAt: "expiresAt";
};
export type IdempotencyKeyScalarFieldEnum = (typeof IdempotencyKeyScalarFieldEnum)[keyof typeof IdempotencyKeyScalarFieldEnum];
export declare const MatchLogScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly jobId: "jobId";
    readonly requestedByAccountId: "requestedByAccountId";
    readonly candidatesJson: "candidatesJson";
    readonly weightsVersion: "weightsVersion";
    readonly createdAt: "createdAt";
};
export type MatchLogScalarFieldEnum = (typeof MatchLogScalarFieldEnum)[keyof typeof MatchLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const AccountOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly phone: "phone";
    readonly role: "role";
    readonly status: "status";
};
export type AccountOrderByRelevanceFieldEnum = (typeof AccountOrderByRelevanceFieldEnum)[keyof typeof AccountOrderByRelevanceFieldEnum];
export declare const WorkerProfileOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly fullName: "fullName";
    readonly photoStorageKey: "photoStorageKey";
    readonly city: "city";
    readonly bio: "bio";
};
export type WorkerProfileOrderByRelevanceFieldEnum = (typeof WorkerProfileOrderByRelevanceFieldEnum)[keyof typeof WorkerProfileOrderByRelevanceFieldEnum];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const EmployerProfileOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly orgName: "orgName";
    readonly orgType: "orgType";
    readonly contactName: "contactName";
    readonly city: "city";
    readonly addressLine: "addressLine";
    readonly panRef: "panRef";
    readonly gstin: "gstin";
    readonly verificationStatus: "verificationStatus";
};
export type EmployerProfileOrderByRelevanceFieldEnum = (typeof EmployerProfileOrderByRelevanceFieldEnum)[keyof typeof EmployerProfileOrderByRelevanceFieldEnum];
export declare const KycSubmissionOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
    readonly idType: "idType";
    readonly idNumberHash: "idNumberHash";
    readonly rejectionReason: "rejectionReason";
};
export type KycSubmissionOrderByRelevanceFieldEnum = (typeof KycSubmissionOrderByRelevanceFieldEnum)[keyof typeof KycSubmissionOrderByRelevanceFieldEnum];
export declare const KycDocumentOrderByRelevanceFieldEnum: {
    readonly docType: "docType";
    readonly storageKey: "storageKey";
    readonly contentSha: "contentSha";
    readonly mime: "mime";
};
export type KycDocumentOrderByRelevanceFieldEnum = (typeof KycDocumentOrderByRelevanceFieldEnum)[keyof typeof KycDocumentOrderByRelevanceFieldEnum];
export declare const KycConsentOrderByRelevanceFieldEnum: {
    readonly consentVer: "consentVer";
    readonly ipHash: "ipHash";
};
export type KycConsentOrderByRelevanceFieldEnum = (typeof KycConsentOrderByRelevanceFieldEnum)[keyof typeof KycConsentOrderByRelevanceFieldEnum];
export declare const DocumentAccessLogOrderByRelevanceFieldEnum: {
    readonly action: "action";
    readonly ipHash: "ipHash";
};
export type DocumentAccessLogOrderByRelevanceFieldEnum = (typeof DocumentAccessLogOrderByRelevanceFieldEnum)[keyof typeof DocumentAccessLogOrderByRelevanceFieldEnum];
export declare const SessionOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly refreshTokenHash: "refreshTokenHash";
    readonly familyId: "familyId";
    readonly userAgent: "userAgent";
    readonly ipHash: "ipHash";
};
export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum];
export declare const OtpChallengeOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly phone: "phone";
    readonly purpose: "purpose";
    readonly codeHash: "codeHash";
};
export type OtpChallengeOrderByRelevanceFieldEnum = (typeof OtpChallengeOrderByRelevanceFieldEnum)[keyof typeof OtpChallengeOrderByRelevanceFieldEnum];
export declare const PushTokenOrderByRelevanceFieldEnum: {
    readonly platform: "platform";
    readonly token: "token";
};
export type PushTokenOrderByRelevanceFieldEnum = (typeof PushTokenOrderByRelevanceFieldEnum)[keyof typeof PushTokenOrderByRelevanceFieldEnum];
export declare const AreaOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly city: "city";
    readonly name: "name";
    readonly nameTa: "nameTa";
};
export type AreaOrderByRelevanceFieldEnum = (typeof AreaOrderByRelevanceFieldEnum)[keyof typeof AreaOrderByRelevanceFieldEnum];
export declare const JobCategoryOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly code: "code";
    readonly name: "name";
    readonly nameTa: "nameTa";
};
export type JobCategoryOrderByRelevanceFieldEnum = (typeof JobCategoryOrderByRelevanceFieldEnum)[keyof typeof JobCategoryOrderByRelevanceFieldEnum];
export declare const SkillOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly code: "code";
    readonly name: "name";
    readonly nameTa: "nameTa";
};
export type SkillOrderByRelevanceFieldEnum = (typeof SkillOrderByRelevanceFieldEnum)[keyof typeof SkillOrderByRelevanceFieldEnum];
export declare const WelfareItemOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly code: "code";
    readonly label: "label";
    readonly labelTa: "labelTa";
};
export type WelfareItemOrderByRelevanceFieldEnum = (typeof WelfareItemOrderByRelevanceFieldEnum)[keyof typeof WelfareItemOrderByRelevanceFieldEnum];
export declare const JobOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly title: "title";
    readonly description: "description";
    readonly city: "city";
    readonly addressLine: "addressLine";
    readonly timezone: "timezone";
    readonly payType: "payType";
    readonly currency: "currency";
    readonly status: "status";
    readonly requirementsNote: "requirementsNote";
    readonly hiddenReason: "hiddenReason";
    readonly cancelReason: "cancelReason";
};
export type JobOrderByRelevanceFieldEnum = (typeof JobOrderByRelevanceFieldEnum)[keyof typeof JobOrderByRelevanceFieldEnum];
export declare const JobWelfareOrderByRelevanceFieldEnum: {
    readonly note: "note";
};
export type JobWelfareOrderByRelevanceFieldEnum = (typeof JobWelfareOrderByRelevanceFieldEnum)[keyof typeof JobWelfareOrderByRelevanceFieldEnum];
export declare const ApplicationOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
    readonly source: "source";
    readonly coverNote: "coverNote";
    readonly decisionNote: "decisionNote";
};
export type ApplicationOrderByRelevanceFieldEnum = (typeof ApplicationOrderByRelevanceFieldEnum)[keyof typeof ApplicationOrderByRelevanceFieldEnum];
export declare const QuickMatchOfferOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
    readonly requirementSnapshot: "requirementSnapshot";
    readonly distanceBand: "distanceBand";
};
export type QuickMatchOfferOrderByRelevanceFieldEnum = (typeof QuickMatchOfferOrderByRelevanceFieldEnum)[keyof typeof QuickMatchOfferOrderByRelevanceFieldEnum];
export declare const CrewMemberOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
    readonly releasedReason: "releasedReason";
};
export type CrewMemberOrderByRelevanceFieldEnum = (typeof CrewMemberOrderByRelevanceFieldEnum)[keyof typeof CrewMemberOrderByRelevanceFieldEnum];
export declare const JobStaffAssignmentOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly role: "role";
    readonly status: "status";
};
export type JobStaffAssignmentOrderByRelevanceFieldEnum = (typeof JobStaffAssignmentOrderByRelevanceFieldEnum)[keyof typeof JobStaffAssignmentOrderByRelevanceFieldEnum];
export declare const AttendanceRecordOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
    readonly checkSource: "checkSource";
    readonly checkTokenId: "checkTokenId";
    readonly correctionReason: "correctionReason";
};
export type AttendanceRecordOrderByRelevanceFieldEnum = (typeof AttendanceRecordOrderByRelevanceFieldEnum)[keyof typeof AttendanceRecordOrderByRelevanceFieldEnum];
export declare const EarningOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
    readonly currency: "currency";
    readonly adjustmentReason: "adjustmentReason";
};
export type EarningOrderByRelevanceFieldEnum = (typeof EarningOrderByRelevanceFieldEnum)[keyof typeof EarningOrderByRelevanceFieldEnum];
export declare const PaymentTransactionOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
    readonly currency: "currency";
    readonly reference: "reference";
    readonly evidenceStorageKey: "evidenceStorageKey";
};
export type PaymentTransactionOrderByRelevanceFieldEnum = (typeof PaymentTransactionOrderByRelevanceFieldEnum)[keyof typeof PaymentTransactionOrderByRelevanceFieldEnum];
export declare const RatingOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly raterRole: "raterRole";
    readonly comment: "comment";
};
export type RatingOrderByRelevanceFieldEnum = (typeof RatingOrderByRelevanceFieldEnum)[keyof typeof RatingOrderByRelevanceFieldEnum];
export declare const NotificationOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly eventKey: "eventKey";
    readonly titleKey: "titleKey";
    readonly contextType: "contextType";
    readonly contextPublicId: "contextPublicId";
};
export type NotificationOrderByRelevanceFieldEnum = (typeof NotificationOrderByRelevanceFieldEnum)[keyof typeof NotificationOrderByRelevanceFieldEnum];
export declare const ComplaintOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly type: "type";
    readonly severity: "severity";
    readonly status: "status";
    readonly linkType: "linkType";
    readonly linkPublicId: "linkPublicId";
    readonly narrative: "narrative";
    readonly resolutionNote: "resolutionNote";
};
export type ComplaintOrderByRelevanceFieldEnum = (typeof ComplaintOrderByRelevanceFieldEnum)[keyof typeof ComplaintOrderByRelevanceFieldEnum];
export declare const ComplaintEventOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly kind: "kind";
    readonly body: "body";
    readonly evidenceStorageKey: "evidenceStorageKey";
};
export type ComplaintEventOrderByRelevanceFieldEnum = (typeof ComplaintEventOrderByRelevanceFieldEnum)[keyof typeof ComplaintEventOrderByRelevanceFieldEnum];
export declare const AvailabilitySlotOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
    readonly status: "status";
};
export type AvailabilitySlotOrderByRelevanceFieldEnum = (typeof AvailabilitySlotOrderByRelevanceFieldEnum)[keyof typeof AvailabilitySlotOrderByRelevanceFieldEnum];
export declare const NotificationOutboxOrderByRelevanceFieldEnum: {
    readonly eventKey: "eventKey";
    readonly dedupeKey: "dedupeKey";
    readonly status: "status";
};
export type NotificationOutboxOrderByRelevanceFieldEnum = (typeof NotificationOutboxOrderByRelevanceFieldEnum)[keyof typeof NotificationOutboxOrderByRelevanceFieldEnum];
export declare const NotificationDeliveryOrderByRelevanceFieldEnum: {
    readonly channel: "channel";
    readonly status: "status";
    readonly providerRef: "providerRef";
    readonly errorCode: "errorCode";
};
export type NotificationDeliveryOrderByRelevanceFieldEnum = (typeof NotificationDeliveryOrderByRelevanceFieldEnum)[keyof typeof NotificationDeliveryOrderByRelevanceFieldEnum];
export declare const NotificationPrefOrderByRelevanceFieldEnum: {
    readonly quietHours: "quietHours";
};
export type NotificationPrefOrderByRelevanceFieldEnum = (typeof NotificationPrefOrderByRelevanceFieldEnum)[keyof typeof NotificationPrefOrderByRelevanceFieldEnum];
export declare const SmsLogOrderByRelevanceFieldEnum: {
    readonly phoneHash: "phoneHash";
    readonly templateId: "templateId";
    readonly purpose: "purpose";
    readonly providerRef: "providerRef";
    readonly status: "status";
};
export type SmsLogOrderByRelevanceFieldEnum = (typeof SmsLogOrderByRelevanceFieldEnum)[keyof typeof SmsLogOrderByRelevanceFieldEnum];
export declare const AuditLogOrderByRelevanceFieldEnum: {
    readonly actorRole: "actorRole";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityPublicId: "entityPublicId";
    readonly requestId: "requestId";
    readonly ipHash: "ipHash";
};
export type AuditLogOrderByRelevanceFieldEnum = (typeof AuditLogOrderByRelevanceFieldEnum)[keyof typeof AuditLogOrderByRelevanceFieldEnum];
export declare const SanctionOrderByRelevanceFieldEnum: {
    readonly type: "type";
    readonly reason: "reason";
};
export type SanctionOrderByRelevanceFieldEnum = (typeof SanctionOrderByRelevanceFieldEnum)[keyof typeof SanctionOrderByRelevanceFieldEnum];
export declare const PlatformConfigOrderByRelevanceFieldEnum: {
    readonly key: "key";
    readonly scope: "scope";
};
export type PlatformConfigOrderByRelevanceFieldEnum = (typeof PlatformConfigOrderByRelevanceFieldEnum)[keyof typeof PlatformConfigOrderByRelevanceFieldEnum];
export declare const IdempotencyKeyOrderByRelevanceFieldEnum: {
    readonly key: "key";
    readonly requestHash: "requestHash";
    readonly status: "status";
};
export type IdempotencyKeyOrderByRelevanceFieldEnum = (typeof IdempotencyKeyOrderByRelevanceFieldEnum)[keyof typeof IdempotencyKeyOrderByRelevanceFieldEnum];
export declare const MatchLogOrderByRelevanceFieldEnum: {
    readonly publicId: "publicId";
};
export type MatchLogOrderByRelevanceFieldEnum = (typeof MatchLogOrderByRelevanceFieldEnum)[keyof typeof MatchLogOrderByRelevanceFieldEnum];
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    account?: Prisma.AccountOmit;
    workerProfile?: Prisma.WorkerProfileOmit;
    employerProfile?: Prisma.EmployerProfileOmit;
    kycSubmission?: Prisma.KycSubmissionOmit;
    kycDocument?: Prisma.KycDocumentOmit;
    kycConsent?: Prisma.KycConsentOmit;
    documentAccessLog?: Prisma.DocumentAccessLogOmit;
    session?: Prisma.SessionOmit;
    otpChallenge?: Prisma.OtpChallengeOmit;
    pushToken?: Prisma.PushTokenOmit;
    area?: Prisma.AreaOmit;
    jobCategory?: Prisma.JobCategoryOmit;
    skill?: Prisma.SkillOmit;
    welfareItem?: Prisma.WelfareItemOmit;
    workerSkill?: Prisma.WorkerSkillOmit;
    job?: Prisma.JobOmit;
    jobWorkDay?: Prisma.JobWorkDayOmit;
    jobSkill?: Prisma.JobSkillOmit;
    jobWelfare?: Prisma.JobWelfareOmit;
    application?: Prisma.ApplicationOmit;
    quickMatchOffer?: Prisma.QuickMatchOfferOmit;
    crewMember?: Prisma.CrewMemberOmit;
    jobStaffAssignment?: Prisma.JobStaffAssignmentOmit;
    attendanceRecord?: Prisma.AttendanceRecordOmit;
    earning?: Prisma.EarningOmit;
    paymentTransaction?: Prisma.PaymentTransactionOmit;
    paymentEarning?: Prisma.PaymentEarningOmit;
    rating?: Prisma.RatingOmit;
    notification?: Prisma.NotificationOmit;
    complaint?: Prisma.ComplaintOmit;
    complaintEvent?: Prisma.ComplaintEventOmit;
    availabilitySlot?: Prisma.AvailabilitySlotOmit;
    notificationOutbox?: Prisma.NotificationOutboxOmit;
    notificationDelivery?: Prisma.NotificationDeliveryOmit;
    notificationPref?: Prisma.NotificationPrefOmit;
    smsLog?: Prisma.SmsLogOmit;
    auditLog?: Prisma.AuditLogOmit;
    sanction?: Prisma.SanctionOmit;
    platformConfig?: Prisma.PlatformConfigOmit;
    idempotencyKey?: Prisma.IdempotencyKeyOmit;
    matchLog?: Prisma.MatchLogOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
