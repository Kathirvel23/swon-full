import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PushTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$PushTokenPayload>;
export type AggregatePushToken = {
    _count: PushTokenCountAggregateOutputType | null;
    _avg: PushTokenAvgAggregateOutputType | null;
    _sum: PushTokenSumAggregateOutputType | null;
    _min: PushTokenMinAggregateOutputType | null;
    _max: PushTokenMaxAggregateOutputType | null;
};
export type PushTokenAvgAggregateOutputType = {
    id: number | null;
    accountId: number | null;
};
export type PushTokenSumAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
};
export type PushTokenMinAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
    platform: string | null;
    token: string | null;
    active: boolean | null;
    lastSeenAt: Date | null;
    createdAt: Date | null;
};
export type PushTokenMaxAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
    platform: string | null;
    token: string | null;
    active: boolean | null;
    lastSeenAt: Date | null;
    createdAt: Date | null;
};
export type PushTokenCountAggregateOutputType = {
    id: number;
    accountId: number;
    platform: number;
    token: number;
    active: number;
    lastSeenAt: number;
    createdAt: number;
    _all: number;
};
export type PushTokenAvgAggregateInputType = {
    id?: true;
    accountId?: true;
};
export type PushTokenSumAggregateInputType = {
    id?: true;
    accountId?: true;
};
export type PushTokenMinAggregateInputType = {
    id?: true;
    accountId?: true;
    platform?: true;
    token?: true;
    active?: true;
    lastSeenAt?: true;
    createdAt?: true;
};
export type PushTokenMaxAggregateInputType = {
    id?: true;
    accountId?: true;
    platform?: true;
    token?: true;
    active?: true;
    lastSeenAt?: true;
    createdAt?: true;
};
export type PushTokenCountAggregateInputType = {
    id?: true;
    accountId?: true;
    platform?: true;
    token?: true;
    active?: true;
    lastSeenAt?: true;
    createdAt?: true;
    _all?: true;
};
export type PushTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PushTokenWhereInput;
    orderBy?: Prisma.PushTokenOrderByWithRelationInput | Prisma.PushTokenOrderByWithRelationInput[];
    cursor?: Prisma.PushTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PushTokenCountAggregateInputType;
    _avg?: PushTokenAvgAggregateInputType;
    _sum?: PushTokenSumAggregateInputType;
    _min?: PushTokenMinAggregateInputType;
    _max?: PushTokenMaxAggregateInputType;
};
export type GetPushTokenAggregateType<T extends PushTokenAggregateArgs> = {
    [P in keyof T & keyof AggregatePushToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePushToken[P]> : Prisma.GetScalarType<T[P], AggregatePushToken[P]>;
};
export type PushTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PushTokenWhereInput;
    orderBy?: Prisma.PushTokenOrderByWithAggregationInput | Prisma.PushTokenOrderByWithAggregationInput[];
    by: Prisma.PushTokenScalarFieldEnum[] | Prisma.PushTokenScalarFieldEnum;
    having?: Prisma.PushTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PushTokenCountAggregateInputType | true;
    _avg?: PushTokenAvgAggregateInputType;
    _sum?: PushTokenSumAggregateInputType;
    _min?: PushTokenMinAggregateInputType;
    _max?: PushTokenMaxAggregateInputType;
};
export type PushTokenGroupByOutputType = {
    id: bigint;
    accountId: bigint;
    platform: string;
    token: string;
    active: boolean;
    lastSeenAt: Date;
    createdAt: Date;
    _count: PushTokenCountAggregateOutputType | null;
    _avg: PushTokenAvgAggregateOutputType | null;
    _sum: PushTokenSumAggregateOutputType | null;
    _min: PushTokenMinAggregateOutputType | null;
    _max: PushTokenMaxAggregateOutputType | null;
};
export type GetPushTokenGroupByPayload<T extends PushTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PushTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PushTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PushTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PushTokenGroupByOutputType[P]>;
}>>;
export type PushTokenWhereInput = {
    AND?: Prisma.PushTokenWhereInput | Prisma.PushTokenWhereInput[];
    OR?: Prisma.PushTokenWhereInput[];
    NOT?: Prisma.PushTokenWhereInput | Prisma.PushTokenWhereInput[];
    id?: Prisma.BigIntFilter<"PushToken"> | bigint | number;
    accountId?: Prisma.BigIntFilter<"PushToken"> | bigint | number;
    platform?: Prisma.StringFilter<"PushToken"> | string;
    token?: Prisma.StringFilter<"PushToken"> | string;
    active?: Prisma.BoolFilter<"PushToken"> | boolean;
    lastSeenAt?: Prisma.DateTimeFilter<"PushToken"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PushToken"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type PushTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.PushTokenOrderByRelevanceInput;
};
export type PushTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    accountId_token?: Prisma.PushTokenAccountIdTokenCompoundUniqueInput;
    AND?: Prisma.PushTokenWhereInput | Prisma.PushTokenWhereInput[];
    OR?: Prisma.PushTokenWhereInput[];
    NOT?: Prisma.PushTokenWhereInput | Prisma.PushTokenWhereInput[];
    accountId?: Prisma.BigIntFilter<"PushToken"> | bigint | number;
    platform?: Prisma.StringFilter<"PushToken"> | string;
    token?: Prisma.StringFilter<"PushToken"> | string;
    active?: Prisma.BoolFilter<"PushToken"> | boolean;
    lastSeenAt?: Prisma.DateTimeFilter<"PushToken"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PushToken"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "id" | "accountId_token">;
export type PushTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PushTokenCountOrderByAggregateInput;
    _avg?: Prisma.PushTokenAvgOrderByAggregateInput;
    _max?: Prisma.PushTokenMaxOrderByAggregateInput;
    _min?: Prisma.PushTokenMinOrderByAggregateInput;
    _sum?: Prisma.PushTokenSumOrderByAggregateInput;
};
export type PushTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.PushTokenScalarWhereWithAggregatesInput | Prisma.PushTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.PushTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PushTokenScalarWhereWithAggregatesInput | Prisma.PushTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"PushToken"> | bigint | number;
    accountId?: Prisma.BigIntWithAggregatesFilter<"PushToken"> | bigint | number;
    platform?: Prisma.StringWithAggregatesFilter<"PushToken"> | string;
    token?: Prisma.StringWithAggregatesFilter<"PushToken"> | string;
    active?: Prisma.BoolWithAggregatesFilter<"PushToken"> | boolean;
    lastSeenAt?: Prisma.DateTimeWithAggregatesFilter<"PushToken"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PushToken"> | Date | string;
};
export type PushTokenCreateInput = {
    id?: bigint | number;
    platform: string;
    token: string;
    active?: boolean;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutPushTokensInput;
};
export type PushTokenUncheckedCreateInput = {
    id?: bigint | number;
    accountId: bigint | number;
    platform: string;
    token: string;
    active?: boolean;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushTokenUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutPushTokensNestedInput;
};
export type PushTokenUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushTokenCreateManyInput = {
    id?: bigint | number;
    accountId: bigint | number;
    platform: string;
    token: string;
    active?: boolean;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushTokenUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushTokenUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushTokenListRelationFilter = {
    every?: Prisma.PushTokenWhereInput;
    some?: Prisma.PushTokenWhereInput;
    none?: Prisma.PushTokenWhereInput;
};
export type PushTokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PushTokenOrderByRelevanceInput = {
    fields: Prisma.PushTokenOrderByRelevanceFieldEnum | Prisma.PushTokenOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PushTokenAccountIdTokenCompoundUniqueInput = {
    accountId: bigint | number;
    token: string;
};
export type PushTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PushTokenAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
};
export type PushTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PushTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PushTokenSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
};
export type PushTokenCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.PushTokenCreateWithoutAccountInput, Prisma.PushTokenUncheckedCreateWithoutAccountInput> | Prisma.PushTokenCreateWithoutAccountInput[] | Prisma.PushTokenUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.PushTokenCreateOrConnectWithoutAccountInput | Prisma.PushTokenCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.PushTokenCreateManyAccountInputEnvelope;
    connect?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
};
export type PushTokenUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.PushTokenCreateWithoutAccountInput, Prisma.PushTokenUncheckedCreateWithoutAccountInput> | Prisma.PushTokenCreateWithoutAccountInput[] | Prisma.PushTokenUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.PushTokenCreateOrConnectWithoutAccountInput | Prisma.PushTokenCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.PushTokenCreateManyAccountInputEnvelope;
    connect?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
};
export type PushTokenUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.PushTokenCreateWithoutAccountInput, Prisma.PushTokenUncheckedCreateWithoutAccountInput> | Prisma.PushTokenCreateWithoutAccountInput[] | Prisma.PushTokenUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.PushTokenCreateOrConnectWithoutAccountInput | Prisma.PushTokenCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.PushTokenUpsertWithWhereUniqueWithoutAccountInput | Prisma.PushTokenUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.PushTokenCreateManyAccountInputEnvelope;
    set?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    disconnect?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    delete?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    connect?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    update?: Prisma.PushTokenUpdateWithWhereUniqueWithoutAccountInput | Prisma.PushTokenUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.PushTokenUpdateManyWithWhereWithoutAccountInput | Prisma.PushTokenUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.PushTokenScalarWhereInput | Prisma.PushTokenScalarWhereInput[];
};
export type PushTokenUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.PushTokenCreateWithoutAccountInput, Prisma.PushTokenUncheckedCreateWithoutAccountInput> | Prisma.PushTokenCreateWithoutAccountInput[] | Prisma.PushTokenUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.PushTokenCreateOrConnectWithoutAccountInput | Prisma.PushTokenCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.PushTokenUpsertWithWhereUniqueWithoutAccountInput | Prisma.PushTokenUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.PushTokenCreateManyAccountInputEnvelope;
    set?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    disconnect?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    delete?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    connect?: Prisma.PushTokenWhereUniqueInput | Prisma.PushTokenWhereUniqueInput[];
    update?: Prisma.PushTokenUpdateWithWhereUniqueWithoutAccountInput | Prisma.PushTokenUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.PushTokenUpdateManyWithWhereWithoutAccountInput | Prisma.PushTokenUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.PushTokenScalarWhereInput | Prisma.PushTokenScalarWhereInput[];
};
export type PushTokenCreateWithoutAccountInput = {
    id?: bigint | number;
    platform: string;
    token: string;
    active?: boolean;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushTokenUncheckedCreateWithoutAccountInput = {
    id?: bigint | number;
    platform: string;
    token: string;
    active?: boolean;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushTokenCreateOrConnectWithoutAccountInput = {
    where: Prisma.PushTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.PushTokenCreateWithoutAccountInput, Prisma.PushTokenUncheckedCreateWithoutAccountInput>;
};
export type PushTokenCreateManyAccountInputEnvelope = {
    data: Prisma.PushTokenCreateManyAccountInput | Prisma.PushTokenCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type PushTokenUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.PushTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.PushTokenUpdateWithoutAccountInput, Prisma.PushTokenUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.PushTokenCreateWithoutAccountInput, Prisma.PushTokenUncheckedCreateWithoutAccountInput>;
};
export type PushTokenUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.PushTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.PushTokenUpdateWithoutAccountInput, Prisma.PushTokenUncheckedUpdateWithoutAccountInput>;
};
export type PushTokenUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.PushTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.PushTokenUpdateManyMutationInput, Prisma.PushTokenUncheckedUpdateManyWithoutAccountInput>;
};
export type PushTokenScalarWhereInput = {
    AND?: Prisma.PushTokenScalarWhereInput | Prisma.PushTokenScalarWhereInput[];
    OR?: Prisma.PushTokenScalarWhereInput[];
    NOT?: Prisma.PushTokenScalarWhereInput | Prisma.PushTokenScalarWhereInput[];
    id?: Prisma.BigIntFilter<"PushToken"> | bigint | number;
    accountId?: Prisma.BigIntFilter<"PushToken"> | bigint | number;
    platform?: Prisma.StringFilter<"PushToken"> | string;
    token?: Prisma.StringFilter<"PushToken"> | string;
    active?: Prisma.BoolFilter<"PushToken"> | boolean;
    lastSeenAt?: Prisma.DateTimeFilter<"PushToken"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PushToken"> | Date | string;
};
export type PushTokenCreateManyAccountInput = {
    id?: bigint | number;
    platform: string;
    token: string;
    active?: boolean;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushTokenUpdateWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushTokenUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushTokenUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    platform?: boolean;
    token?: boolean;
    active?: boolean;
    lastSeenAt?: boolean;
    createdAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pushToken"]>;
export type PushTokenSelectScalar = {
    id?: boolean;
    accountId?: boolean;
    platform?: boolean;
    token?: boolean;
    active?: boolean;
    lastSeenAt?: boolean;
    createdAt?: boolean;
};
export type PushTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accountId" | "platform" | "token" | "active" | "lastSeenAt" | "createdAt", ExtArgs["result"]["pushToken"]>;
export type PushTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $PushTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PushToken";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        accountId: bigint;
        platform: string;
        token: string;
        active: boolean;
        lastSeenAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["pushToken"]>;
    composites: {};
};
export type PushTokenGetPayload<S extends boolean | null | undefined | PushTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PushTokenPayload, S>;
export type PushTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PushTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PushTokenCountAggregateInputType | true;
};
export interface PushTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PushToken'];
        meta: {
            name: 'PushToken';
        };
    };
    findUnique<T extends PushTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, PushTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PushTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PushTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PushTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, PushTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PushTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PushTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PushTokenFindManyArgs>(args?: Prisma.SelectSubset<T, PushTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PushTokenCreateArgs>(args: Prisma.SelectSubset<T, PushTokenCreateArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PushTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, PushTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PushTokenDeleteArgs>(args: Prisma.SelectSubset<T, PushTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PushTokenUpdateArgs>(args: Prisma.SelectSubset<T, PushTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PushTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, PushTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PushTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, PushTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PushTokenUpsertArgs>(args: Prisma.SelectSubset<T, PushTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__PushTokenClient<runtime.Types.Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PushTokenCountArgs>(args?: Prisma.Subset<T, PushTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PushTokenCountAggregateOutputType> : number>;
    aggregate<T extends PushTokenAggregateArgs>(args: Prisma.Subset<T, PushTokenAggregateArgs>): Prisma.PrismaPromise<GetPushTokenAggregateType<T>>;
    groupBy<T extends PushTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PushTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: PushTokenGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PushTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPushTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PushTokenFieldRefs;
}
export interface Prisma__PushTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PushTokenFieldRefs {
    readonly id: Prisma.FieldRef<"PushToken", 'BigInt'>;
    readonly accountId: Prisma.FieldRef<"PushToken", 'BigInt'>;
    readonly platform: Prisma.FieldRef<"PushToken", 'String'>;
    readonly token: Prisma.FieldRef<"PushToken", 'String'>;
    readonly active: Prisma.FieldRef<"PushToken", 'Boolean'>;
    readonly lastSeenAt: Prisma.FieldRef<"PushToken", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PushToken", 'DateTime'>;
}
export type PushTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    where: Prisma.PushTokenWhereUniqueInput;
};
export type PushTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    where: Prisma.PushTokenWhereUniqueInput;
};
export type PushTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    where?: Prisma.PushTokenWhereInput;
    orderBy?: Prisma.PushTokenOrderByWithRelationInput | Prisma.PushTokenOrderByWithRelationInput[];
    cursor?: Prisma.PushTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PushTokenScalarFieldEnum | Prisma.PushTokenScalarFieldEnum[];
};
export type PushTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    where?: Prisma.PushTokenWhereInput;
    orderBy?: Prisma.PushTokenOrderByWithRelationInput | Prisma.PushTokenOrderByWithRelationInput[];
    cursor?: Prisma.PushTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PushTokenScalarFieldEnum | Prisma.PushTokenScalarFieldEnum[];
};
export type PushTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    where?: Prisma.PushTokenWhereInput;
    orderBy?: Prisma.PushTokenOrderByWithRelationInput | Prisma.PushTokenOrderByWithRelationInput[];
    cursor?: Prisma.PushTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PushTokenScalarFieldEnum | Prisma.PushTokenScalarFieldEnum[];
};
export type PushTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PushTokenCreateInput, Prisma.PushTokenUncheckedCreateInput>;
};
export type PushTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PushTokenCreateManyInput | Prisma.PushTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PushTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PushTokenUpdateInput, Prisma.PushTokenUncheckedUpdateInput>;
    where: Prisma.PushTokenWhereUniqueInput;
};
export type PushTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PushTokenUpdateManyMutationInput, Prisma.PushTokenUncheckedUpdateManyInput>;
    where?: Prisma.PushTokenWhereInput;
    limit?: number;
};
export type PushTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    where: Prisma.PushTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.PushTokenCreateInput, Prisma.PushTokenUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PushTokenUpdateInput, Prisma.PushTokenUncheckedUpdateInput>;
};
export type PushTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
    where: Prisma.PushTokenWhereUniqueInput;
};
export type PushTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PushTokenWhereInput;
    limit?: number;
};
export type PushTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushTokenSelect<ExtArgs> | null;
    omit?: Prisma.PushTokenOmit<ExtArgs> | null;
    include?: Prisma.PushTokenInclude<ExtArgs> | null;
};
