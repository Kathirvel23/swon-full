import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workerProfile(): Prisma.WorkerProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get employerProfile(): Prisma.EmployerProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get kycSubmission(): Prisma.KycSubmissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get kycDocument(): Prisma.KycDocumentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get kycConsent(): Prisma.KycConsentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get documentAccessLog(): Prisma.DocumentAccessLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get otpChallenge(): Prisma.OtpChallengeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pushToken(): Prisma.PushTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get area(): Prisma.AreaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get jobCategory(): Prisma.JobCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get skill(): Prisma.SkillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get welfareItem(): Prisma.WelfareItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workerSkill(): Prisma.WorkerSkillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get job(): Prisma.JobDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get jobWorkDay(): Prisma.JobWorkDayDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get jobSkill(): Prisma.JobSkillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get jobWelfare(): Prisma.JobWelfareDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get application(): Prisma.ApplicationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get quickMatchOffer(): Prisma.QuickMatchOfferDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get crewMember(): Prisma.CrewMemberDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get attendanceRecord(): Prisma.AttendanceRecordDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get earning(): Prisma.EarningDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get paymentTransaction(): Prisma.PaymentTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get paymentEarning(): Prisma.PaymentEarningDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rating(): Prisma.RatingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get complaint(): Prisma.ComplaintDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get complaintEvent(): Prisma.ComplaintEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get availabilitySlot(): Prisma.AvailabilitySlotDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationOutbox(): Prisma.NotificationOutboxDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationDelivery(): Prisma.NotificationDeliveryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationPref(): Prisma.NotificationPrefDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get smsLog(): Prisma.SmsLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sanction(): Prisma.SanctionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get platformConfig(): Prisma.PlatformConfigDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get idempotencyKey(): Prisma.IdempotencyKeyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get matchLog(): Prisma.MatchLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
