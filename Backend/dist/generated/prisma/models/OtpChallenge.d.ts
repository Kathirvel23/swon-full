import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OtpChallengeModel = runtime.Types.Result.DefaultSelection<Prisma.$OtpChallengePayload>;
export type AggregateOtpChallenge = {
    _count: OtpChallengeCountAggregateOutputType | null;
    _avg: OtpChallengeAvgAggregateOutputType | null;
    _sum: OtpChallengeSumAggregateOutputType | null;
    _min: OtpChallengeMinAggregateOutputType | null;
    _max: OtpChallengeMaxAggregateOutputType | null;
};
export type OtpChallengeAvgAggregateOutputType = {
    id: number | null;
    attempts: number | null;
    maxAttempts: number | null;
};
export type OtpChallengeSumAggregateOutputType = {
    id: bigint | null;
    attempts: number | null;
    maxAttempts: number | null;
};
export type OtpChallengeMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    phone: string | null;
    purpose: string | null;
    codeHash: string | null;
    attempts: number | null;
    maxAttempts: number | null;
    expiresAt: Date | null;
    cooldownUntil: Date | null;
    consumedAt: Date | null;
    createdAt: Date | null;
};
export type OtpChallengeMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    phone: string | null;
    purpose: string | null;
    codeHash: string | null;
    attempts: number | null;
    maxAttempts: number | null;
    expiresAt: Date | null;
    cooldownUntil: Date | null;
    consumedAt: Date | null;
    createdAt: Date | null;
};
export type OtpChallengeCountAggregateOutputType = {
    id: number;
    publicId: number;
    phone: number;
    purpose: number;
    codeHash: number;
    attempts: number;
    maxAttempts: number;
    expiresAt: number;
    cooldownUntil: number;
    consumedAt: number;
    createdAt: number;
    _all: number;
};
export type OtpChallengeAvgAggregateInputType = {
    id?: true;
    attempts?: true;
    maxAttempts?: true;
};
export type OtpChallengeSumAggregateInputType = {
    id?: true;
    attempts?: true;
    maxAttempts?: true;
};
export type OtpChallengeMinAggregateInputType = {
    id?: true;
    publicId?: true;
    phone?: true;
    purpose?: true;
    codeHash?: true;
    attempts?: true;
    maxAttempts?: true;
    expiresAt?: true;
    cooldownUntil?: true;
    consumedAt?: true;
    createdAt?: true;
};
export type OtpChallengeMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    phone?: true;
    purpose?: true;
    codeHash?: true;
    attempts?: true;
    maxAttempts?: true;
    expiresAt?: true;
    cooldownUntil?: true;
    consumedAt?: true;
    createdAt?: true;
};
export type OtpChallengeCountAggregateInputType = {
    id?: true;
    publicId?: true;
    phone?: true;
    purpose?: true;
    codeHash?: true;
    attempts?: true;
    maxAttempts?: true;
    expiresAt?: true;
    cooldownUntil?: true;
    consumedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type OtpChallengeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OtpChallengeWhereInput;
    orderBy?: Prisma.OtpChallengeOrderByWithRelationInput | Prisma.OtpChallengeOrderByWithRelationInput[];
    cursor?: Prisma.OtpChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OtpChallengeCountAggregateInputType;
    _avg?: OtpChallengeAvgAggregateInputType;
    _sum?: OtpChallengeSumAggregateInputType;
    _min?: OtpChallengeMinAggregateInputType;
    _max?: OtpChallengeMaxAggregateInputType;
};
export type GetOtpChallengeAggregateType<T extends OtpChallengeAggregateArgs> = {
    [P in keyof T & keyof AggregateOtpChallenge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOtpChallenge[P]> : Prisma.GetScalarType<T[P], AggregateOtpChallenge[P]>;
};
export type OtpChallengeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OtpChallengeWhereInput;
    orderBy?: Prisma.OtpChallengeOrderByWithAggregationInput | Prisma.OtpChallengeOrderByWithAggregationInput[];
    by: Prisma.OtpChallengeScalarFieldEnum[] | Prisma.OtpChallengeScalarFieldEnum;
    having?: Prisma.OtpChallengeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OtpChallengeCountAggregateInputType | true;
    _avg?: OtpChallengeAvgAggregateInputType;
    _sum?: OtpChallengeSumAggregateInputType;
    _min?: OtpChallengeMinAggregateInputType;
    _max?: OtpChallengeMaxAggregateInputType;
};
export type OtpChallengeGroupByOutputType = {
    id: bigint;
    publicId: string;
    phone: string;
    purpose: string;
    codeHash: string;
    attempts: number;
    maxAttempts: number;
    expiresAt: Date;
    cooldownUntil: Date | null;
    consumedAt: Date | null;
    createdAt: Date;
    _count: OtpChallengeCountAggregateOutputType | null;
    _avg: OtpChallengeAvgAggregateOutputType | null;
    _sum: OtpChallengeSumAggregateOutputType | null;
    _min: OtpChallengeMinAggregateOutputType | null;
    _max: OtpChallengeMaxAggregateOutputType | null;
};
export type GetOtpChallengeGroupByPayload<T extends OtpChallengeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OtpChallengeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OtpChallengeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OtpChallengeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OtpChallengeGroupByOutputType[P]>;
}>>;
export type OtpChallengeWhereInput = {
    AND?: Prisma.OtpChallengeWhereInput | Prisma.OtpChallengeWhereInput[];
    OR?: Prisma.OtpChallengeWhereInput[];
    NOT?: Prisma.OtpChallengeWhereInput | Prisma.OtpChallengeWhereInput[];
    id?: Prisma.BigIntFilter<"OtpChallenge"> | bigint | number;
    publicId?: Prisma.StringFilter<"OtpChallenge"> | string;
    phone?: Prisma.StringFilter<"OtpChallenge"> | string;
    purpose?: Prisma.StringFilter<"OtpChallenge"> | string;
    codeHash?: Prisma.StringFilter<"OtpChallenge"> | string;
    attempts?: Prisma.IntFilter<"OtpChallenge"> | number;
    maxAttempts?: Prisma.IntFilter<"OtpChallenge"> | number;
    expiresAt?: Prisma.DateTimeFilter<"OtpChallenge"> | Date | string;
    cooldownUntil?: Prisma.DateTimeNullableFilter<"OtpChallenge"> | Date | string | null;
    consumedAt?: Prisma.DateTimeNullableFilter<"OtpChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OtpChallenge"> | Date | string;
};
export type OtpChallengeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    maxAttempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    cooldownUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _relevance?: Prisma.OtpChallengeOrderByRelevanceInput;
};
export type OtpChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    AND?: Prisma.OtpChallengeWhereInput | Prisma.OtpChallengeWhereInput[];
    OR?: Prisma.OtpChallengeWhereInput[];
    NOT?: Prisma.OtpChallengeWhereInput | Prisma.OtpChallengeWhereInput[];
    phone?: Prisma.StringFilter<"OtpChallenge"> | string;
    purpose?: Prisma.StringFilter<"OtpChallenge"> | string;
    codeHash?: Prisma.StringFilter<"OtpChallenge"> | string;
    attempts?: Prisma.IntFilter<"OtpChallenge"> | number;
    maxAttempts?: Prisma.IntFilter<"OtpChallenge"> | number;
    expiresAt?: Prisma.DateTimeFilter<"OtpChallenge"> | Date | string;
    cooldownUntil?: Prisma.DateTimeNullableFilter<"OtpChallenge"> | Date | string | null;
    consumedAt?: Prisma.DateTimeNullableFilter<"OtpChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OtpChallenge"> | Date | string;
}, "id" | "publicId">;
export type OtpChallengeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    maxAttempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    cooldownUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OtpChallengeCountOrderByAggregateInput;
    _avg?: Prisma.OtpChallengeAvgOrderByAggregateInput;
    _max?: Prisma.OtpChallengeMaxOrderByAggregateInput;
    _min?: Prisma.OtpChallengeMinOrderByAggregateInput;
    _sum?: Prisma.OtpChallengeSumOrderByAggregateInput;
};
export type OtpChallengeScalarWhereWithAggregatesInput = {
    AND?: Prisma.OtpChallengeScalarWhereWithAggregatesInput | Prisma.OtpChallengeScalarWhereWithAggregatesInput[];
    OR?: Prisma.OtpChallengeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OtpChallengeScalarWhereWithAggregatesInput | Prisma.OtpChallengeScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"OtpChallenge"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"OtpChallenge"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"OtpChallenge"> | string;
    purpose?: Prisma.StringWithAggregatesFilter<"OtpChallenge"> | string;
    codeHash?: Prisma.StringWithAggregatesFilter<"OtpChallenge"> | string;
    attempts?: Prisma.IntWithAggregatesFilter<"OtpChallenge"> | number;
    maxAttempts?: Prisma.IntWithAggregatesFilter<"OtpChallenge"> | number;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"OtpChallenge"> | Date | string;
    cooldownUntil?: Prisma.DateTimeNullableWithAggregatesFilter<"OtpChallenge"> | Date | string | null;
    consumedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"OtpChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OtpChallenge"> | Date | string;
};
export type OtpChallengeCreateInput = {
    id?: bigint | number;
    publicId?: string;
    phone: string;
    purpose?: string;
    codeHash: string;
    attempts?: number;
    maxAttempts?: number;
    expiresAt: Date | string;
    cooldownUntil?: Date | string | null;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpChallengeUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    phone: string;
    purpose?: string;
    codeHash: string;
    attempts?: number;
    maxAttempts?: number;
    expiresAt: Date | string;
    cooldownUntil?: Date | string | null;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpChallengeUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    maxAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cooldownUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpChallengeUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    maxAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cooldownUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpChallengeCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    phone: string;
    purpose?: string;
    codeHash: string;
    attempts?: number;
    maxAttempts?: number;
    expiresAt: Date | string;
    cooldownUntil?: Date | string | null;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpChallengeUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    maxAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cooldownUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpChallengeUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    maxAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cooldownUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpChallengeOrderByRelevanceInput = {
    fields: Prisma.OtpChallengeOrderByRelevanceFieldEnum | Prisma.OtpChallengeOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type OtpChallengeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    maxAttempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    cooldownUntil?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OtpChallengeAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    maxAttempts?: Prisma.SortOrder;
};
export type OtpChallengeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    maxAttempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    cooldownUntil?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OtpChallengeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    maxAttempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    cooldownUntil?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OtpChallengeSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    maxAttempts?: Prisma.SortOrder;
};
export type OtpChallengeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    phone?: boolean;
    purpose?: boolean;
    codeHash?: boolean;
    attempts?: boolean;
    maxAttempts?: boolean;
    expiresAt?: boolean;
    cooldownUntil?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["otpChallenge"]>;
export type OtpChallengeSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    phone?: boolean;
    purpose?: boolean;
    codeHash?: boolean;
    attempts?: boolean;
    maxAttempts?: boolean;
    expiresAt?: boolean;
    cooldownUntil?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
};
export type OtpChallengeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "phone" | "purpose" | "codeHash" | "attempts" | "maxAttempts" | "expiresAt" | "cooldownUntil" | "consumedAt" | "createdAt", ExtArgs["result"]["otpChallenge"]>;
export type $OtpChallengePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OtpChallenge";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        phone: string;
        purpose: string;
        codeHash: string;
        attempts: number;
        maxAttempts: number;
        expiresAt: Date;
        cooldownUntil: Date | null;
        consumedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["otpChallenge"]>;
    composites: {};
};
export type OtpChallengeGetPayload<S extends boolean | null | undefined | OtpChallengeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload, S>;
export type OtpChallengeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OtpChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OtpChallengeCountAggregateInputType | true;
};
export interface OtpChallengeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OtpChallenge'];
        meta: {
            name: 'OtpChallenge';
        };
    };
    findUnique<T extends OtpChallengeFindUniqueArgs>(args: Prisma.SelectSubset<T, OtpChallengeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OtpChallengeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OtpChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OtpChallengeFindFirstArgs>(args?: Prisma.SelectSubset<T, OtpChallengeFindFirstArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OtpChallengeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OtpChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OtpChallengeFindManyArgs>(args?: Prisma.SelectSubset<T, OtpChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OtpChallengeCreateArgs>(args: Prisma.SelectSubset<T, OtpChallengeCreateArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OtpChallengeCreateManyArgs>(args?: Prisma.SelectSubset<T, OtpChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends OtpChallengeDeleteArgs>(args: Prisma.SelectSubset<T, OtpChallengeDeleteArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OtpChallengeUpdateArgs>(args: Prisma.SelectSubset<T, OtpChallengeUpdateArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OtpChallengeDeleteManyArgs>(args?: Prisma.SelectSubset<T, OtpChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OtpChallengeUpdateManyArgs>(args: Prisma.SelectSubset<T, OtpChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends OtpChallengeUpsertArgs>(args: Prisma.SelectSubset<T, OtpChallengeUpsertArgs<ExtArgs>>): Prisma.Prisma__OtpChallengeClient<runtime.Types.Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OtpChallengeCountArgs>(args?: Prisma.Subset<T, OtpChallengeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OtpChallengeCountAggregateOutputType> : number>;
    aggregate<T extends OtpChallengeAggregateArgs>(args: Prisma.Subset<T, OtpChallengeAggregateArgs>): Prisma.PrismaPromise<GetOtpChallengeAggregateType<T>>;
    groupBy<T extends OtpChallengeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OtpChallengeGroupByArgs['orderBy'];
    } : {
        orderBy?: OtpChallengeGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OtpChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OtpChallengeFieldRefs;
}
export interface Prisma__OtpChallengeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OtpChallengeFieldRefs {
    readonly id: Prisma.FieldRef<"OtpChallenge", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"OtpChallenge", 'String'>;
    readonly phone: Prisma.FieldRef<"OtpChallenge", 'String'>;
    readonly purpose: Prisma.FieldRef<"OtpChallenge", 'String'>;
    readonly codeHash: Prisma.FieldRef<"OtpChallenge", 'String'>;
    readonly attempts: Prisma.FieldRef<"OtpChallenge", 'Int'>;
    readonly maxAttempts: Prisma.FieldRef<"OtpChallenge", 'Int'>;
    readonly expiresAt: Prisma.FieldRef<"OtpChallenge", 'DateTime'>;
    readonly cooldownUntil: Prisma.FieldRef<"OtpChallenge", 'DateTime'>;
    readonly consumedAt: Prisma.FieldRef<"OtpChallenge", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"OtpChallenge", 'DateTime'>;
}
export type OtpChallengeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    where: Prisma.OtpChallengeWhereUniqueInput;
};
export type OtpChallengeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    where: Prisma.OtpChallengeWhereUniqueInput;
};
export type OtpChallengeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    where?: Prisma.OtpChallengeWhereInput;
    orderBy?: Prisma.OtpChallengeOrderByWithRelationInput | Prisma.OtpChallengeOrderByWithRelationInput[];
    cursor?: Prisma.OtpChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OtpChallengeScalarFieldEnum | Prisma.OtpChallengeScalarFieldEnum[];
};
export type OtpChallengeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    where?: Prisma.OtpChallengeWhereInput;
    orderBy?: Prisma.OtpChallengeOrderByWithRelationInput | Prisma.OtpChallengeOrderByWithRelationInput[];
    cursor?: Prisma.OtpChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OtpChallengeScalarFieldEnum | Prisma.OtpChallengeScalarFieldEnum[];
};
export type OtpChallengeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    where?: Prisma.OtpChallengeWhereInput;
    orderBy?: Prisma.OtpChallengeOrderByWithRelationInput | Prisma.OtpChallengeOrderByWithRelationInput[];
    cursor?: Prisma.OtpChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OtpChallengeScalarFieldEnum | Prisma.OtpChallengeScalarFieldEnum[];
};
export type OtpChallengeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OtpChallengeCreateInput, Prisma.OtpChallengeUncheckedCreateInput>;
};
export type OtpChallengeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OtpChallengeCreateManyInput | Prisma.OtpChallengeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OtpChallengeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OtpChallengeUpdateInput, Prisma.OtpChallengeUncheckedUpdateInput>;
    where: Prisma.OtpChallengeWhereUniqueInput;
};
export type OtpChallengeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OtpChallengeUpdateManyMutationInput, Prisma.OtpChallengeUncheckedUpdateManyInput>;
    where?: Prisma.OtpChallengeWhereInput;
    limit?: number;
};
export type OtpChallengeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    where: Prisma.OtpChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OtpChallengeCreateInput, Prisma.OtpChallengeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OtpChallengeUpdateInput, Prisma.OtpChallengeUncheckedUpdateInput>;
};
export type OtpChallengeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
    where: Prisma.OtpChallengeWhereUniqueInput;
};
export type OtpChallengeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OtpChallengeWhereInput;
    limit?: number;
};
export type OtpChallengeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpChallengeSelect<ExtArgs> | null;
    omit?: Prisma.OtpChallengeOmit<ExtArgs> | null;
};
