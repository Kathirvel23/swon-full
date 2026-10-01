import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdempotencyKeyModel = runtime.Types.Result.DefaultSelection<Prisma.$IdempotencyKeyPayload>;
export type AggregateIdempotencyKey = {
    _count: IdempotencyKeyCountAggregateOutputType | null;
    _avg: IdempotencyKeyAvgAggregateOutputType | null;
    _sum: IdempotencyKeySumAggregateOutputType | null;
    _min: IdempotencyKeyMinAggregateOutputType | null;
    _max: IdempotencyKeyMaxAggregateOutputType | null;
};
export type IdempotencyKeyAvgAggregateOutputType = {
    accountId: number | null;
};
export type IdempotencyKeySumAggregateOutputType = {
    accountId: bigint | null;
};
export type IdempotencyKeyMinAggregateOutputType = {
    key: string | null;
    accountId: bigint | null;
    requestHash: string | null;
    status: string | null;
    createdAt: Date | null;
    expiresAt: Date | null;
};
export type IdempotencyKeyMaxAggregateOutputType = {
    key: string | null;
    accountId: bigint | null;
    requestHash: string | null;
    status: string | null;
    createdAt: Date | null;
    expiresAt: Date | null;
};
export type IdempotencyKeyCountAggregateOutputType = {
    key: number;
    accountId: number;
    requestHash: number;
    responseJson: number;
    status: number;
    createdAt: number;
    expiresAt: number;
    _all: number;
};
export type IdempotencyKeyAvgAggregateInputType = {
    accountId?: true;
};
export type IdempotencyKeySumAggregateInputType = {
    accountId?: true;
};
export type IdempotencyKeyMinAggregateInputType = {
    key?: true;
    accountId?: true;
    requestHash?: true;
    status?: true;
    createdAt?: true;
    expiresAt?: true;
};
export type IdempotencyKeyMaxAggregateInputType = {
    key?: true;
    accountId?: true;
    requestHash?: true;
    status?: true;
    createdAt?: true;
    expiresAt?: true;
};
export type IdempotencyKeyCountAggregateInputType = {
    key?: true;
    accountId?: true;
    requestHash?: true;
    responseJson?: true;
    status?: true;
    createdAt?: true;
    expiresAt?: true;
    _all?: true;
};
export type IdempotencyKeyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdempotencyKeyWhereInput;
    orderBy?: Prisma.IdempotencyKeyOrderByWithRelationInput | Prisma.IdempotencyKeyOrderByWithRelationInput[];
    cursor?: Prisma.IdempotencyKeyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdempotencyKeyCountAggregateInputType;
    _avg?: IdempotencyKeyAvgAggregateInputType;
    _sum?: IdempotencyKeySumAggregateInputType;
    _min?: IdempotencyKeyMinAggregateInputType;
    _max?: IdempotencyKeyMaxAggregateInputType;
};
export type GetIdempotencyKeyAggregateType<T extends IdempotencyKeyAggregateArgs> = {
    [P in keyof T & keyof AggregateIdempotencyKey]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdempotencyKey[P]> : Prisma.GetScalarType<T[P], AggregateIdempotencyKey[P]>;
};
export type IdempotencyKeyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdempotencyKeyWhereInput;
    orderBy?: Prisma.IdempotencyKeyOrderByWithAggregationInput | Prisma.IdempotencyKeyOrderByWithAggregationInput[];
    by: Prisma.IdempotencyKeyScalarFieldEnum[] | Prisma.IdempotencyKeyScalarFieldEnum;
    having?: Prisma.IdempotencyKeyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdempotencyKeyCountAggregateInputType | true;
    _avg?: IdempotencyKeyAvgAggregateInputType;
    _sum?: IdempotencyKeySumAggregateInputType;
    _min?: IdempotencyKeyMinAggregateInputType;
    _max?: IdempotencyKeyMaxAggregateInputType;
};
export type IdempotencyKeyGroupByOutputType = {
    key: string;
    accountId: bigint;
    requestHash: string;
    responseJson: runtime.JsonValue | null;
    status: string;
    createdAt: Date;
    expiresAt: Date;
    _count: IdempotencyKeyCountAggregateOutputType | null;
    _avg: IdempotencyKeyAvgAggregateOutputType | null;
    _sum: IdempotencyKeySumAggregateOutputType | null;
    _min: IdempotencyKeyMinAggregateOutputType | null;
    _max: IdempotencyKeyMaxAggregateOutputType | null;
};
export type GetIdempotencyKeyGroupByPayload<T extends IdempotencyKeyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdempotencyKeyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdempotencyKeyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdempotencyKeyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdempotencyKeyGroupByOutputType[P]>;
}>>;
export type IdempotencyKeyWhereInput = {
    AND?: Prisma.IdempotencyKeyWhereInput | Prisma.IdempotencyKeyWhereInput[];
    OR?: Prisma.IdempotencyKeyWhereInput[];
    NOT?: Prisma.IdempotencyKeyWhereInput | Prisma.IdempotencyKeyWhereInput[];
    key?: Prisma.StringFilter<"IdempotencyKey"> | string;
    accountId?: Prisma.BigIntFilter<"IdempotencyKey"> | bigint | number;
    requestHash?: Prisma.StringFilter<"IdempotencyKey"> | string;
    responseJson?: Prisma.JsonNullableFilter<"IdempotencyKey">;
    status?: Prisma.StringFilter<"IdempotencyKey"> | string;
    createdAt?: Prisma.DateTimeFilter<"IdempotencyKey"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"IdempotencyKey"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type IdempotencyKeyOrderByWithRelationInput = {
    key?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    requestHash?: Prisma.SortOrder;
    responseJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.IdempotencyKeyOrderByRelevanceInput;
};
export type IdempotencyKeyWhereUniqueInput = Prisma.AtLeast<{
    key?: string;
    AND?: Prisma.IdempotencyKeyWhereInput | Prisma.IdempotencyKeyWhereInput[];
    OR?: Prisma.IdempotencyKeyWhereInput[];
    NOT?: Prisma.IdempotencyKeyWhereInput | Prisma.IdempotencyKeyWhereInput[];
    accountId?: Prisma.BigIntFilter<"IdempotencyKey"> | bigint | number;
    requestHash?: Prisma.StringFilter<"IdempotencyKey"> | string;
    responseJson?: Prisma.JsonNullableFilter<"IdempotencyKey">;
    status?: Prisma.StringFilter<"IdempotencyKey"> | string;
    createdAt?: Prisma.DateTimeFilter<"IdempotencyKey"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"IdempotencyKey"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "key">;
export type IdempotencyKeyOrderByWithAggregationInput = {
    key?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    requestHash?: Prisma.SortOrder;
    responseJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    _count?: Prisma.IdempotencyKeyCountOrderByAggregateInput;
    _avg?: Prisma.IdempotencyKeyAvgOrderByAggregateInput;
    _max?: Prisma.IdempotencyKeyMaxOrderByAggregateInput;
    _min?: Prisma.IdempotencyKeyMinOrderByAggregateInput;
    _sum?: Prisma.IdempotencyKeySumOrderByAggregateInput;
};
export type IdempotencyKeyScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdempotencyKeyScalarWhereWithAggregatesInput | Prisma.IdempotencyKeyScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdempotencyKeyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdempotencyKeyScalarWhereWithAggregatesInput | Prisma.IdempotencyKeyScalarWhereWithAggregatesInput[];
    key?: Prisma.StringWithAggregatesFilter<"IdempotencyKey"> | string;
    accountId?: Prisma.BigIntWithAggregatesFilter<"IdempotencyKey"> | bigint | number;
    requestHash?: Prisma.StringWithAggregatesFilter<"IdempotencyKey"> | string;
    responseJson?: Prisma.JsonNullableWithAggregatesFilter<"IdempotencyKey">;
    status?: Prisma.StringWithAggregatesFilter<"IdempotencyKey"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"IdempotencyKey"> | Date | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdempotencyKey"> | Date | string;
};
export type IdempotencyKeyCreateInput = {
    key: string;
    requestHash: string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutIdemKeysInput;
};
export type IdempotencyKeyUncheckedCreateInput = {
    key: string;
    accountId: bigint | number;
    requestHash: string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type IdempotencyKeyUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    requestHash?: Prisma.StringFieldUpdateOperationsInput | string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutIdemKeysNestedInput;
};
export type IdempotencyKeyUncheckedUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    requestHash?: Prisma.StringFieldUpdateOperationsInput | string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdempotencyKeyCreateManyInput = {
    key: string;
    accountId: bigint | number;
    requestHash: string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type IdempotencyKeyUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    requestHash?: Prisma.StringFieldUpdateOperationsInput | string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdempotencyKeyUncheckedUpdateManyInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    requestHash?: Prisma.StringFieldUpdateOperationsInput | string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdempotencyKeyListRelationFilter = {
    every?: Prisma.IdempotencyKeyWhereInput;
    some?: Prisma.IdempotencyKeyWhereInput;
    none?: Prisma.IdempotencyKeyWhereInput;
};
export type IdempotencyKeyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IdempotencyKeyOrderByRelevanceInput = {
    fields: Prisma.IdempotencyKeyOrderByRelevanceFieldEnum | Prisma.IdempotencyKeyOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type IdempotencyKeyCountOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    requestHash?: Prisma.SortOrder;
    responseJson?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdempotencyKeyAvgOrderByAggregateInput = {
    accountId?: Prisma.SortOrder;
};
export type IdempotencyKeyMaxOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    requestHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdempotencyKeyMinOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    requestHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdempotencyKeySumOrderByAggregateInput = {
    accountId?: Prisma.SortOrder;
};
export type IdempotencyKeyCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.IdempotencyKeyCreateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput> | Prisma.IdempotencyKeyCreateWithoutAccountInput[] | Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput | Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.IdempotencyKeyCreateManyAccountInputEnvelope;
    connect?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
};
export type IdempotencyKeyUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.IdempotencyKeyCreateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput> | Prisma.IdempotencyKeyCreateWithoutAccountInput[] | Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput | Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.IdempotencyKeyCreateManyAccountInputEnvelope;
    connect?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
};
export type IdempotencyKeyUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.IdempotencyKeyCreateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput> | Prisma.IdempotencyKeyCreateWithoutAccountInput[] | Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput | Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.IdempotencyKeyUpsertWithWhereUniqueWithoutAccountInput | Prisma.IdempotencyKeyUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.IdempotencyKeyCreateManyAccountInputEnvelope;
    set?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    disconnect?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    delete?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    connect?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    update?: Prisma.IdempotencyKeyUpdateWithWhereUniqueWithoutAccountInput | Prisma.IdempotencyKeyUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.IdempotencyKeyUpdateManyWithWhereWithoutAccountInput | Prisma.IdempotencyKeyUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.IdempotencyKeyScalarWhereInput | Prisma.IdempotencyKeyScalarWhereInput[];
};
export type IdempotencyKeyUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.IdempotencyKeyCreateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput> | Prisma.IdempotencyKeyCreateWithoutAccountInput[] | Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput | Prisma.IdempotencyKeyCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.IdempotencyKeyUpsertWithWhereUniqueWithoutAccountInput | Prisma.IdempotencyKeyUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.IdempotencyKeyCreateManyAccountInputEnvelope;
    set?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    disconnect?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    delete?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    connect?: Prisma.IdempotencyKeyWhereUniqueInput | Prisma.IdempotencyKeyWhereUniqueInput[];
    update?: Prisma.IdempotencyKeyUpdateWithWhereUniqueWithoutAccountInput | Prisma.IdempotencyKeyUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.IdempotencyKeyUpdateManyWithWhereWithoutAccountInput | Prisma.IdempotencyKeyUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.IdempotencyKeyScalarWhereInput | Prisma.IdempotencyKeyScalarWhereInput[];
};
export type IdempotencyKeyCreateWithoutAccountInput = {
    key: string;
    requestHash: string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type IdempotencyKeyUncheckedCreateWithoutAccountInput = {
    key: string;
    requestHash: string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type IdempotencyKeyCreateOrConnectWithoutAccountInput = {
    where: Prisma.IdempotencyKeyWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdempotencyKeyCreateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput>;
};
export type IdempotencyKeyCreateManyAccountInputEnvelope = {
    data: Prisma.IdempotencyKeyCreateManyAccountInput | Prisma.IdempotencyKeyCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type IdempotencyKeyUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.IdempotencyKeyWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdempotencyKeyUpdateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.IdempotencyKeyCreateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedCreateWithoutAccountInput>;
};
export type IdempotencyKeyUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.IdempotencyKeyWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdempotencyKeyUpdateWithoutAccountInput, Prisma.IdempotencyKeyUncheckedUpdateWithoutAccountInput>;
};
export type IdempotencyKeyUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.IdempotencyKeyScalarWhereInput;
    data: Prisma.XOR<Prisma.IdempotencyKeyUpdateManyMutationInput, Prisma.IdempotencyKeyUncheckedUpdateManyWithoutAccountInput>;
};
export type IdempotencyKeyScalarWhereInput = {
    AND?: Prisma.IdempotencyKeyScalarWhereInput | Prisma.IdempotencyKeyScalarWhereInput[];
    OR?: Prisma.IdempotencyKeyScalarWhereInput[];
    NOT?: Prisma.IdempotencyKeyScalarWhereInput | Prisma.IdempotencyKeyScalarWhereInput[];
    key?: Prisma.StringFilter<"IdempotencyKey"> | string;
    accountId?: Prisma.BigIntFilter<"IdempotencyKey"> | bigint | number;
    requestHash?: Prisma.StringFilter<"IdempotencyKey"> | string;
    responseJson?: Prisma.JsonNullableFilter<"IdempotencyKey">;
    status?: Prisma.StringFilter<"IdempotencyKey"> | string;
    createdAt?: Prisma.DateTimeFilter<"IdempotencyKey"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"IdempotencyKey"> | Date | string;
};
export type IdempotencyKeyCreateManyAccountInput = {
    key: string;
    requestHash: string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type IdempotencyKeyUpdateWithoutAccountInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    requestHash?: Prisma.StringFieldUpdateOperationsInput | string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdempotencyKeyUncheckedUpdateWithoutAccountInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    requestHash?: Prisma.StringFieldUpdateOperationsInput | string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdempotencyKeyUncheckedUpdateManyWithoutAccountInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    requestHash?: Prisma.StringFieldUpdateOperationsInput | string;
    responseJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdempotencyKeySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    accountId?: boolean;
    requestHash?: boolean;
    responseJson?: boolean;
    status?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["idempotencyKey"]>;
export type IdempotencyKeySelectScalar = {
    key?: boolean;
    accountId?: boolean;
    requestHash?: boolean;
    responseJson?: boolean;
    status?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
};
export type IdempotencyKeyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"key" | "accountId" | "requestHash" | "responseJson" | "status" | "createdAt" | "expiresAt", ExtArgs["result"]["idempotencyKey"]>;
export type IdempotencyKeyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $IdempotencyKeyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdempotencyKey";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        key: string;
        accountId: bigint;
        requestHash: string;
        responseJson: runtime.JsonValue | null;
        status: string;
        createdAt: Date;
        expiresAt: Date;
    }, ExtArgs["result"]["idempotencyKey"]>;
    composites: {};
};
export type IdempotencyKeyGetPayload<S extends boolean | null | undefined | IdempotencyKeyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload, S>;
export type IdempotencyKeyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdempotencyKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdempotencyKeyCountAggregateInputType | true;
};
export interface IdempotencyKeyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdempotencyKey'];
        meta: {
            name: 'IdempotencyKey';
        };
    };
    findUnique<T extends IdempotencyKeyFindUniqueArgs>(args: Prisma.SelectSubset<T, IdempotencyKeyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdempotencyKeyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdempotencyKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdempotencyKeyFindFirstArgs>(args?: Prisma.SelectSubset<T, IdempotencyKeyFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdempotencyKeyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdempotencyKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdempotencyKeyFindManyArgs>(args?: Prisma.SelectSubset<T, IdempotencyKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdempotencyKeyCreateArgs>(args: Prisma.SelectSubset<T, IdempotencyKeyCreateArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdempotencyKeyCreateManyArgs>(args?: Prisma.SelectSubset<T, IdempotencyKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends IdempotencyKeyDeleteArgs>(args: Prisma.SelectSubset<T, IdempotencyKeyDeleteArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdempotencyKeyUpdateArgs>(args: Prisma.SelectSubset<T, IdempotencyKeyUpdateArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdempotencyKeyDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdempotencyKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdempotencyKeyUpdateManyArgs>(args: Prisma.SelectSubset<T, IdempotencyKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends IdempotencyKeyUpsertArgs>(args: Prisma.SelectSubset<T, IdempotencyKeyUpsertArgs<ExtArgs>>): Prisma.Prisma__IdempotencyKeyClient<runtime.Types.Result.GetResult<Prisma.$IdempotencyKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdempotencyKeyCountArgs>(args?: Prisma.Subset<T, IdempotencyKeyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdempotencyKeyCountAggregateOutputType> : number>;
    aggregate<T extends IdempotencyKeyAggregateArgs>(args: Prisma.Subset<T, IdempotencyKeyAggregateArgs>): Prisma.PrismaPromise<GetIdempotencyKeyAggregateType<T>>;
    groupBy<T extends IdempotencyKeyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdempotencyKeyGroupByArgs['orderBy'];
    } : {
        orderBy?: IdempotencyKeyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdempotencyKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdempotencyKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdempotencyKeyFieldRefs;
}
export interface Prisma__IdempotencyKeyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdempotencyKeyFieldRefs {
    readonly key: Prisma.FieldRef<"IdempotencyKey", 'String'>;
    readonly accountId: Prisma.FieldRef<"IdempotencyKey", 'BigInt'>;
    readonly requestHash: Prisma.FieldRef<"IdempotencyKey", 'String'>;
    readonly responseJson: Prisma.FieldRef<"IdempotencyKey", 'Json'>;
    readonly status: Prisma.FieldRef<"IdempotencyKey", 'String'>;
    readonly createdAt: Prisma.FieldRef<"IdempotencyKey", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"IdempotencyKey", 'DateTime'>;
}
export type IdempotencyKeyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    where: Prisma.IdempotencyKeyWhereUniqueInput;
};
export type IdempotencyKeyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    where: Prisma.IdempotencyKeyWhereUniqueInput;
};
export type IdempotencyKeyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    where?: Prisma.IdempotencyKeyWhereInput;
    orderBy?: Prisma.IdempotencyKeyOrderByWithRelationInput | Prisma.IdempotencyKeyOrderByWithRelationInput[];
    cursor?: Prisma.IdempotencyKeyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdempotencyKeyScalarFieldEnum | Prisma.IdempotencyKeyScalarFieldEnum[];
};
export type IdempotencyKeyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    where?: Prisma.IdempotencyKeyWhereInput;
    orderBy?: Prisma.IdempotencyKeyOrderByWithRelationInput | Prisma.IdempotencyKeyOrderByWithRelationInput[];
    cursor?: Prisma.IdempotencyKeyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdempotencyKeyScalarFieldEnum | Prisma.IdempotencyKeyScalarFieldEnum[];
};
export type IdempotencyKeyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    where?: Prisma.IdempotencyKeyWhereInput;
    orderBy?: Prisma.IdempotencyKeyOrderByWithRelationInput | Prisma.IdempotencyKeyOrderByWithRelationInput[];
    cursor?: Prisma.IdempotencyKeyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdempotencyKeyScalarFieldEnum | Prisma.IdempotencyKeyScalarFieldEnum[];
};
export type IdempotencyKeyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdempotencyKeyCreateInput, Prisma.IdempotencyKeyUncheckedCreateInput>;
};
export type IdempotencyKeyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdempotencyKeyCreateManyInput | Prisma.IdempotencyKeyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdempotencyKeyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdempotencyKeyUpdateInput, Prisma.IdempotencyKeyUncheckedUpdateInput>;
    where: Prisma.IdempotencyKeyWhereUniqueInput;
};
export type IdempotencyKeyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdempotencyKeyUpdateManyMutationInput, Prisma.IdempotencyKeyUncheckedUpdateManyInput>;
    where?: Prisma.IdempotencyKeyWhereInput;
    limit?: number;
};
export type IdempotencyKeyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    where: Prisma.IdempotencyKeyWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdempotencyKeyCreateInput, Prisma.IdempotencyKeyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdempotencyKeyUpdateInput, Prisma.IdempotencyKeyUncheckedUpdateInput>;
};
export type IdempotencyKeyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
    where: Prisma.IdempotencyKeyWhereUniqueInput;
};
export type IdempotencyKeyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdempotencyKeyWhereInput;
    limit?: number;
};
export type IdempotencyKeyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdempotencyKeySelect<ExtArgs> | null;
    omit?: Prisma.IdempotencyKeyOmit<ExtArgs> | null;
    include?: Prisma.IdempotencyKeyInclude<ExtArgs> | null;
};
