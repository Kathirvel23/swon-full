import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SanctionModel = runtime.Types.Result.DefaultSelection<Prisma.$SanctionPayload>;
export type AggregateSanction = {
    _count: SanctionCountAggregateOutputType | null;
    _avg: SanctionAvgAggregateOutputType | null;
    _sum: SanctionSumAggregateOutputType | null;
    _min: SanctionMinAggregateOutputType | null;
    _max: SanctionMaxAggregateOutputType | null;
};
export type SanctionAvgAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    linkedComplaintId: number | null;
    issuedByAccountId: number | null;
};
export type SanctionSumAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
    linkedComplaintId: bigint | null;
    issuedByAccountId: bigint | null;
};
export type SanctionMinAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
    type: string | null;
    reason: string | null;
    linkedComplaintId: bigint | null;
    issuedByAccountId: bigint | null;
    startsAt: Date | null;
    endsAt: Date | null;
    liftedAt: Date | null;
    createdAt: Date | null;
};
export type SanctionMaxAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
    type: string | null;
    reason: string | null;
    linkedComplaintId: bigint | null;
    issuedByAccountId: bigint | null;
    startsAt: Date | null;
    endsAt: Date | null;
    liftedAt: Date | null;
    createdAt: Date | null;
};
export type SanctionCountAggregateOutputType = {
    id: number;
    accountId: number;
    type: number;
    reason: number;
    linkedComplaintId: number;
    issuedByAccountId: number;
    startsAt: number;
    endsAt: number;
    liftedAt: number;
    createdAt: number;
    _all: number;
};
export type SanctionAvgAggregateInputType = {
    id?: true;
    accountId?: true;
    linkedComplaintId?: true;
    issuedByAccountId?: true;
};
export type SanctionSumAggregateInputType = {
    id?: true;
    accountId?: true;
    linkedComplaintId?: true;
    issuedByAccountId?: true;
};
export type SanctionMinAggregateInputType = {
    id?: true;
    accountId?: true;
    type?: true;
    reason?: true;
    linkedComplaintId?: true;
    issuedByAccountId?: true;
    startsAt?: true;
    endsAt?: true;
    liftedAt?: true;
    createdAt?: true;
};
export type SanctionMaxAggregateInputType = {
    id?: true;
    accountId?: true;
    type?: true;
    reason?: true;
    linkedComplaintId?: true;
    issuedByAccountId?: true;
    startsAt?: true;
    endsAt?: true;
    liftedAt?: true;
    createdAt?: true;
};
export type SanctionCountAggregateInputType = {
    id?: true;
    accountId?: true;
    type?: true;
    reason?: true;
    linkedComplaintId?: true;
    issuedByAccountId?: true;
    startsAt?: true;
    endsAt?: true;
    liftedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type SanctionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SanctionCountAggregateInputType;
    _avg?: SanctionAvgAggregateInputType;
    _sum?: SanctionSumAggregateInputType;
    _min?: SanctionMinAggregateInputType;
    _max?: SanctionMaxAggregateInputType;
};
export type GetSanctionAggregateType<T extends SanctionAggregateArgs> = {
    [P in keyof T & keyof AggregateSanction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSanction[P]> : Prisma.GetScalarType<T[P], AggregateSanction[P]>;
};
export type SanctionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithAggregationInput | Prisma.SanctionOrderByWithAggregationInput[];
    by: Prisma.SanctionScalarFieldEnum[] | Prisma.SanctionScalarFieldEnum;
    having?: Prisma.SanctionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SanctionCountAggregateInputType | true;
    _avg?: SanctionAvgAggregateInputType;
    _sum?: SanctionSumAggregateInputType;
    _min?: SanctionMinAggregateInputType;
    _max?: SanctionMaxAggregateInputType;
};
export type SanctionGroupByOutputType = {
    id: bigint;
    accountId: bigint;
    type: string;
    reason: string;
    linkedComplaintId: bigint | null;
    issuedByAccountId: bigint;
    startsAt: Date;
    endsAt: Date | null;
    liftedAt: Date | null;
    createdAt: Date;
    _count: SanctionCountAggregateOutputType | null;
    _avg: SanctionAvgAggregateOutputType | null;
    _sum: SanctionSumAggregateOutputType | null;
    _min: SanctionMinAggregateOutputType | null;
    _max: SanctionMaxAggregateOutputType | null;
};
export type GetSanctionGroupByPayload<T extends SanctionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SanctionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SanctionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SanctionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SanctionGroupByOutputType[P]>;
}>>;
export type SanctionWhereInput = {
    AND?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    OR?: Prisma.SanctionWhereInput[];
    NOT?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    id?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    accountId?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    type?: Prisma.StringFilter<"Sanction"> | string;
    reason?: Prisma.StringFilter<"Sanction"> | string;
    linkedComplaintId?: Prisma.BigIntNullableFilter<"Sanction"> | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    startsAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    liftedAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    target?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    issuer?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    complaint?: Prisma.XOR<Prisma.ComplaintNullableScalarRelationFilter, Prisma.ComplaintWhereInput> | null;
};
export type SanctionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    linkedComplaintId?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedByAccountId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    liftedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    target?: Prisma.AccountOrderByWithRelationInput;
    issuer?: Prisma.AccountOrderByWithRelationInput;
    complaint?: Prisma.ComplaintOrderByWithRelationInput;
    _relevance?: Prisma.SanctionOrderByRelevanceInput;
};
export type SanctionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    OR?: Prisma.SanctionWhereInput[];
    NOT?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    accountId?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    type?: Prisma.StringFilter<"Sanction"> | string;
    reason?: Prisma.StringFilter<"Sanction"> | string;
    linkedComplaintId?: Prisma.BigIntNullableFilter<"Sanction"> | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    startsAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    liftedAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    target?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    issuer?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    complaint?: Prisma.XOR<Prisma.ComplaintNullableScalarRelationFilter, Prisma.ComplaintWhereInput> | null;
}, "id">;
export type SanctionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    linkedComplaintId?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedByAccountId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    liftedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SanctionCountOrderByAggregateInput;
    _avg?: Prisma.SanctionAvgOrderByAggregateInput;
    _max?: Prisma.SanctionMaxOrderByAggregateInput;
    _min?: Prisma.SanctionMinOrderByAggregateInput;
    _sum?: Prisma.SanctionSumOrderByAggregateInput;
};
export type SanctionScalarWhereWithAggregatesInput = {
    AND?: Prisma.SanctionScalarWhereWithAggregatesInput | Prisma.SanctionScalarWhereWithAggregatesInput[];
    OR?: Prisma.SanctionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SanctionScalarWhereWithAggregatesInput | Prisma.SanctionScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Sanction"> | bigint | number;
    accountId?: Prisma.BigIntWithAggregatesFilter<"Sanction"> | bigint | number;
    type?: Prisma.StringWithAggregatesFilter<"Sanction"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"Sanction"> | string;
    linkedComplaintId?: Prisma.BigIntNullableWithAggregatesFilter<"Sanction"> | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntWithAggregatesFilter<"Sanction"> | bigint | number;
    startsAt?: Prisma.DateTimeWithAggregatesFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Sanction"> | Date | string | null;
    liftedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Sanction"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Sanction"> | Date | string;
};
export type SanctionCreateInput = {
    id?: bigint | number;
    type: string;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
    target: Prisma.AccountCreateNestedOneWithoutSanctionsInput;
    issuer: Prisma.AccountCreateNestedOneWithoutSanctionsIssuedInput;
    complaint?: Prisma.ComplaintCreateNestedOneWithoutSanctionsInput;
};
export type SanctionUncheckedCreateInput = {
    id?: bigint | number;
    accountId: bigint | number;
    type: string;
    reason: string;
    linkedComplaintId?: bigint | number | null;
    issuedByAccountId: bigint | number;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    target?: Prisma.AccountUpdateOneRequiredWithoutSanctionsNestedInput;
    issuer?: Prisma.AccountUpdateOneRequiredWithoutSanctionsIssuedNestedInput;
    complaint?: Prisma.ComplaintUpdateOneWithoutSanctionsNestedInput;
};
export type SanctionUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionCreateManyInput = {
    id?: bigint | number;
    accountId: bigint | number;
    type: string;
    reason: string;
    linkedComplaintId?: bigint | number | null;
    issuedByAccountId: bigint | number;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionListRelationFilter = {
    every?: Prisma.SanctionWhereInput;
    some?: Prisma.SanctionWhereInput;
    none?: Prisma.SanctionWhereInput;
};
export type SanctionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SanctionOrderByRelevanceInput = {
    fields: Prisma.SanctionOrderByRelevanceFieldEnum | Prisma.SanctionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SanctionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    linkedComplaintId?: Prisma.SortOrder;
    issuedByAccountId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    liftedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SanctionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    linkedComplaintId?: Prisma.SortOrder;
    issuedByAccountId?: Prisma.SortOrder;
};
export type SanctionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    linkedComplaintId?: Prisma.SortOrder;
    issuedByAccountId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    liftedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SanctionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    linkedComplaintId?: Prisma.SortOrder;
    issuedByAccountId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    liftedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SanctionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    linkedComplaintId?: Prisma.SortOrder;
    issuedByAccountId?: Prisma.SortOrder;
};
export type SanctionCreateNestedManyWithoutTargetInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutTargetInput, Prisma.SanctionUncheckedCreateWithoutTargetInput> | Prisma.SanctionCreateWithoutTargetInput[] | Prisma.SanctionUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutTargetInput | Prisma.SanctionCreateOrConnectWithoutTargetInput[];
    createMany?: Prisma.SanctionCreateManyTargetInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionCreateNestedManyWithoutIssuerInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuerInput, Prisma.SanctionUncheckedCreateWithoutIssuerInput> | Prisma.SanctionCreateWithoutIssuerInput[] | Prisma.SanctionUncheckedCreateWithoutIssuerInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuerInput | Prisma.SanctionCreateOrConnectWithoutIssuerInput[];
    createMany?: Prisma.SanctionCreateManyIssuerInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUncheckedCreateNestedManyWithoutTargetInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutTargetInput, Prisma.SanctionUncheckedCreateWithoutTargetInput> | Prisma.SanctionCreateWithoutTargetInput[] | Prisma.SanctionUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutTargetInput | Prisma.SanctionCreateOrConnectWithoutTargetInput[];
    createMany?: Prisma.SanctionCreateManyTargetInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUncheckedCreateNestedManyWithoutIssuerInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuerInput, Prisma.SanctionUncheckedCreateWithoutIssuerInput> | Prisma.SanctionCreateWithoutIssuerInput[] | Prisma.SanctionUncheckedCreateWithoutIssuerInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuerInput | Prisma.SanctionCreateOrConnectWithoutIssuerInput[];
    createMany?: Prisma.SanctionCreateManyIssuerInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUpdateManyWithoutTargetNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutTargetInput, Prisma.SanctionUncheckedCreateWithoutTargetInput> | Prisma.SanctionCreateWithoutTargetInput[] | Prisma.SanctionUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutTargetInput | Prisma.SanctionCreateOrConnectWithoutTargetInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutTargetInput | Prisma.SanctionUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: Prisma.SanctionCreateManyTargetInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutTargetInput | Prisma.SanctionUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutTargetInput | Prisma.SanctionUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUpdateManyWithoutIssuerNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuerInput, Prisma.SanctionUncheckedCreateWithoutIssuerInput> | Prisma.SanctionCreateWithoutIssuerInput[] | Prisma.SanctionUncheckedCreateWithoutIssuerInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuerInput | Prisma.SanctionCreateOrConnectWithoutIssuerInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutIssuerInput | Prisma.SanctionUpsertWithWhereUniqueWithoutIssuerInput[];
    createMany?: Prisma.SanctionCreateManyIssuerInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutIssuerInput | Prisma.SanctionUpdateWithWhereUniqueWithoutIssuerInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutIssuerInput | Prisma.SanctionUpdateManyWithWhereWithoutIssuerInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutTargetInput, Prisma.SanctionUncheckedCreateWithoutTargetInput> | Prisma.SanctionCreateWithoutTargetInput[] | Prisma.SanctionUncheckedCreateWithoutTargetInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutTargetInput | Prisma.SanctionCreateOrConnectWithoutTargetInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutTargetInput | Prisma.SanctionUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: Prisma.SanctionCreateManyTargetInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutTargetInput | Prisma.SanctionUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutTargetInput | Prisma.SanctionUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUncheckedUpdateManyWithoutIssuerNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuerInput, Prisma.SanctionUncheckedCreateWithoutIssuerInput> | Prisma.SanctionCreateWithoutIssuerInput[] | Prisma.SanctionUncheckedCreateWithoutIssuerInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuerInput | Prisma.SanctionCreateOrConnectWithoutIssuerInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutIssuerInput | Prisma.SanctionUpsertWithWhereUniqueWithoutIssuerInput[];
    createMany?: Prisma.SanctionCreateManyIssuerInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutIssuerInput | Prisma.SanctionUpdateWithWhereUniqueWithoutIssuerInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutIssuerInput | Prisma.SanctionUpdateManyWithWhereWithoutIssuerInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionCreateNestedManyWithoutComplaintInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutComplaintInput, Prisma.SanctionUncheckedCreateWithoutComplaintInput> | Prisma.SanctionCreateWithoutComplaintInput[] | Prisma.SanctionUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutComplaintInput | Prisma.SanctionCreateOrConnectWithoutComplaintInput[];
    createMany?: Prisma.SanctionCreateManyComplaintInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutComplaintInput, Prisma.SanctionUncheckedCreateWithoutComplaintInput> | Prisma.SanctionCreateWithoutComplaintInput[] | Prisma.SanctionUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutComplaintInput | Prisma.SanctionCreateOrConnectWithoutComplaintInput[];
    createMany?: Prisma.SanctionCreateManyComplaintInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUpdateManyWithoutComplaintNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutComplaintInput, Prisma.SanctionUncheckedCreateWithoutComplaintInput> | Prisma.SanctionCreateWithoutComplaintInput[] | Prisma.SanctionUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutComplaintInput | Prisma.SanctionCreateOrConnectWithoutComplaintInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutComplaintInput | Prisma.SanctionUpsertWithWhereUniqueWithoutComplaintInput[];
    createMany?: Prisma.SanctionCreateManyComplaintInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutComplaintInput | Prisma.SanctionUpdateWithWhereUniqueWithoutComplaintInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutComplaintInput | Prisma.SanctionUpdateManyWithWhereWithoutComplaintInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutComplaintInput, Prisma.SanctionUncheckedCreateWithoutComplaintInput> | Prisma.SanctionCreateWithoutComplaintInput[] | Prisma.SanctionUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutComplaintInput | Prisma.SanctionCreateOrConnectWithoutComplaintInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutComplaintInput | Prisma.SanctionUpsertWithWhereUniqueWithoutComplaintInput[];
    createMany?: Prisma.SanctionCreateManyComplaintInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutComplaintInput | Prisma.SanctionUpdateWithWhereUniqueWithoutComplaintInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutComplaintInput | Prisma.SanctionUpdateManyWithWhereWithoutComplaintInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionCreateWithoutTargetInput = {
    id?: bigint | number;
    type: string;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
    issuer: Prisma.AccountCreateNestedOneWithoutSanctionsIssuedInput;
    complaint?: Prisma.ComplaintCreateNestedOneWithoutSanctionsInput;
};
export type SanctionUncheckedCreateWithoutTargetInput = {
    id?: bigint | number;
    type: string;
    reason: string;
    linkedComplaintId?: bigint | number | null;
    issuedByAccountId: bigint | number;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionCreateOrConnectWithoutTargetInput = {
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutTargetInput, Prisma.SanctionUncheckedCreateWithoutTargetInput>;
};
export type SanctionCreateManyTargetInputEnvelope = {
    data: Prisma.SanctionCreateManyTargetInput | Prisma.SanctionCreateManyTargetInput[];
    skipDuplicates?: boolean;
};
export type SanctionCreateWithoutIssuerInput = {
    id?: bigint | number;
    type: string;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
    target: Prisma.AccountCreateNestedOneWithoutSanctionsInput;
    complaint?: Prisma.ComplaintCreateNestedOneWithoutSanctionsInput;
};
export type SanctionUncheckedCreateWithoutIssuerInput = {
    id?: bigint | number;
    accountId: bigint | number;
    type: string;
    reason: string;
    linkedComplaintId?: bigint | number | null;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionCreateOrConnectWithoutIssuerInput = {
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutIssuerInput, Prisma.SanctionUncheckedCreateWithoutIssuerInput>;
};
export type SanctionCreateManyIssuerInputEnvelope = {
    data: Prisma.SanctionCreateManyIssuerInput | Prisma.SanctionCreateManyIssuerInput[];
    skipDuplicates?: boolean;
};
export type SanctionUpsertWithWhereUniqueWithoutTargetInput = {
    where: Prisma.SanctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SanctionUpdateWithoutTargetInput, Prisma.SanctionUncheckedUpdateWithoutTargetInput>;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutTargetInput, Prisma.SanctionUncheckedCreateWithoutTargetInput>;
};
export type SanctionUpdateWithWhereUniqueWithoutTargetInput = {
    where: Prisma.SanctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SanctionUpdateWithoutTargetInput, Prisma.SanctionUncheckedUpdateWithoutTargetInput>;
};
export type SanctionUpdateManyWithWhereWithoutTargetInput = {
    where: Prisma.SanctionScalarWhereInput;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyWithoutTargetInput>;
};
export type SanctionScalarWhereInput = {
    AND?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
    OR?: Prisma.SanctionScalarWhereInput[];
    NOT?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
    id?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    accountId?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    type?: Prisma.StringFilter<"Sanction"> | string;
    reason?: Prisma.StringFilter<"Sanction"> | string;
    linkedComplaintId?: Prisma.BigIntNullableFilter<"Sanction"> | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntFilter<"Sanction"> | bigint | number;
    startsAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    liftedAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
};
export type SanctionUpsertWithWhereUniqueWithoutIssuerInput = {
    where: Prisma.SanctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SanctionUpdateWithoutIssuerInput, Prisma.SanctionUncheckedUpdateWithoutIssuerInput>;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutIssuerInput, Prisma.SanctionUncheckedCreateWithoutIssuerInput>;
};
export type SanctionUpdateWithWhereUniqueWithoutIssuerInput = {
    where: Prisma.SanctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SanctionUpdateWithoutIssuerInput, Prisma.SanctionUncheckedUpdateWithoutIssuerInput>;
};
export type SanctionUpdateManyWithWhereWithoutIssuerInput = {
    where: Prisma.SanctionScalarWhereInput;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyWithoutIssuerInput>;
};
export type SanctionCreateWithoutComplaintInput = {
    id?: bigint | number;
    type: string;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
    target: Prisma.AccountCreateNestedOneWithoutSanctionsInput;
    issuer: Prisma.AccountCreateNestedOneWithoutSanctionsIssuedInput;
};
export type SanctionUncheckedCreateWithoutComplaintInput = {
    id?: bigint | number;
    accountId: bigint | number;
    type: string;
    reason: string;
    issuedByAccountId: bigint | number;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionCreateOrConnectWithoutComplaintInput = {
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutComplaintInput, Prisma.SanctionUncheckedCreateWithoutComplaintInput>;
};
export type SanctionCreateManyComplaintInputEnvelope = {
    data: Prisma.SanctionCreateManyComplaintInput | Prisma.SanctionCreateManyComplaintInput[];
    skipDuplicates?: boolean;
};
export type SanctionUpsertWithWhereUniqueWithoutComplaintInput = {
    where: Prisma.SanctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SanctionUpdateWithoutComplaintInput, Prisma.SanctionUncheckedUpdateWithoutComplaintInput>;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutComplaintInput, Prisma.SanctionUncheckedCreateWithoutComplaintInput>;
};
export type SanctionUpdateWithWhereUniqueWithoutComplaintInput = {
    where: Prisma.SanctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SanctionUpdateWithoutComplaintInput, Prisma.SanctionUncheckedUpdateWithoutComplaintInput>;
};
export type SanctionUpdateManyWithWhereWithoutComplaintInput = {
    where: Prisma.SanctionScalarWhereInput;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyWithoutComplaintInput>;
};
export type SanctionCreateManyTargetInput = {
    id?: bigint | number;
    type: string;
    reason: string;
    linkedComplaintId?: bigint | number | null;
    issuedByAccountId: bigint | number;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionCreateManyIssuerInput = {
    id?: bigint | number;
    accountId: bigint | number;
    type: string;
    reason: string;
    linkedComplaintId?: bigint | number | null;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateWithoutTargetInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    issuer?: Prisma.AccountUpdateOneRequiredWithoutSanctionsIssuedNestedInput;
    complaint?: Prisma.ComplaintUpdateOneWithoutSanctionsNestedInput;
};
export type SanctionUncheckedUpdateWithoutTargetInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyWithoutTargetInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    issuedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUpdateWithoutIssuerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    target?: Prisma.AccountUpdateOneRequiredWithoutSanctionsNestedInput;
    complaint?: Prisma.ComplaintUpdateOneWithoutSanctionsNestedInput;
};
export type SanctionUncheckedUpdateWithoutIssuerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyWithoutIssuerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionCreateManyComplaintInput = {
    id?: bigint | number;
    accountId: bigint | number;
    type: string;
    reason: string;
    issuedByAccountId: bigint | number;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    liftedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateWithoutComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    target?: Prisma.AccountUpdateOneRequiredWithoutSanctionsNestedInput;
    issuer?: Prisma.AccountUpdateOneRequiredWithoutSanctionsIssuedNestedInput;
};
export type SanctionUncheckedUpdateWithoutComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyWithoutComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liftedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    type?: boolean;
    reason?: boolean;
    linkedComplaintId?: boolean;
    issuedByAccountId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    liftedAt?: boolean;
    createdAt?: boolean;
    target?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    issuer?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    complaint?: boolean | Prisma.Sanction$complaintArgs<ExtArgs>;
}, ExtArgs["result"]["sanction"]>;
export type SanctionSelectScalar = {
    id?: boolean;
    accountId?: boolean;
    type?: boolean;
    reason?: boolean;
    linkedComplaintId?: boolean;
    issuedByAccountId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    liftedAt?: boolean;
    createdAt?: boolean;
};
export type SanctionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accountId" | "type" | "reason" | "linkedComplaintId" | "issuedByAccountId" | "startsAt" | "endsAt" | "liftedAt" | "createdAt", ExtArgs["result"]["sanction"]>;
export type SanctionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    target?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    issuer?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    complaint?: boolean | Prisma.Sanction$complaintArgs<ExtArgs>;
};
export type $SanctionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sanction";
    objects: {
        target: Prisma.$AccountPayload<ExtArgs>;
        issuer: Prisma.$AccountPayload<ExtArgs>;
        complaint: Prisma.$ComplaintPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        accountId: bigint;
        type: string;
        reason: string;
        linkedComplaintId: bigint | null;
        issuedByAccountId: bigint;
        startsAt: Date;
        endsAt: Date | null;
        liftedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["sanction"]>;
    composites: {};
};
export type SanctionGetPayload<S extends boolean | null | undefined | SanctionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SanctionPayload, S>;
export type SanctionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SanctionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SanctionCountAggregateInputType | true;
};
export interface SanctionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sanction'];
        meta: {
            name: 'Sanction';
        };
    };
    findUnique<T extends SanctionFindUniqueArgs>(args: Prisma.SelectSubset<T, SanctionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SanctionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SanctionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SanctionFindFirstArgs>(args?: Prisma.SelectSubset<T, SanctionFindFirstArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SanctionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SanctionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SanctionFindManyArgs>(args?: Prisma.SelectSubset<T, SanctionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SanctionCreateArgs>(args: Prisma.SelectSubset<T, SanctionCreateArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SanctionCreateManyArgs>(args?: Prisma.SelectSubset<T, SanctionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SanctionDeleteArgs>(args: Prisma.SelectSubset<T, SanctionDeleteArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SanctionUpdateArgs>(args: Prisma.SelectSubset<T, SanctionUpdateArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SanctionDeleteManyArgs>(args?: Prisma.SelectSubset<T, SanctionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SanctionUpdateManyArgs>(args: Prisma.SelectSubset<T, SanctionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SanctionUpsertArgs>(args: Prisma.SelectSubset<T, SanctionUpsertArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SanctionCountArgs>(args?: Prisma.Subset<T, SanctionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SanctionCountAggregateOutputType> : number>;
    aggregate<T extends SanctionAggregateArgs>(args: Prisma.Subset<T, SanctionAggregateArgs>): Prisma.PrismaPromise<GetSanctionAggregateType<T>>;
    groupBy<T extends SanctionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SanctionGroupByArgs['orderBy'];
    } : {
        orderBy?: SanctionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SanctionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSanctionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SanctionFieldRefs;
}
export interface Prisma__SanctionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    target<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    issuer<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    complaint<T extends Prisma.Sanction$complaintArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Sanction$complaintArgs<ExtArgs>>): Prisma.Prisma__ComplaintClient<runtime.Types.Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SanctionFieldRefs {
    readonly id: Prisma.FieldRef<"Sanction", 'BigInt'>;
    readonly accountId: Prisma.FieldRef<"Sanction", 'BigInt'>;
    readonly type: Prisma.FieldRef<"Sanction", 'String'>;
    readonly reason: Prisma.FieldRef<"Sanction", 'String'>;
    readonly linkedComplaintId: Prisma.FieldRef<"Sanction", 'BigInt'>;
    readonly issuedByAccountId: Prisma.FieldRef<"Sanction", 'BigInt'>;
    readonly startsAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
    readonly liftedAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
}
export type SanctionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctionScalarFieldEnum | Prisma.SanctionScalarFieldEnum[];
};
export type SanctionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctionScalarFieldEnum | Prisma.SanctionScalarFieldEnum[];
};
export type SanctionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctionScalarFieldEnum | Prisma.SanctionScalarFieldEnum[];
};
export type SanctionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctionCreateInput, Prisma.SanctionUncheckedCreateInput>;
};
export type SanctionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SanctionCreateManyInput | Prisma.SanctionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SanctionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctionUpdateInput, Prisma.SanctionUncheckedUpdateInput>;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyInput>;
    where?: Prisma.SanctionWhereInput;
    limit?: number;
};
export type SanctionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateInput, Prisma.SanctionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SanctionUpdateInput, Prisma.SanctionUncheckedUpdateInput>;
};
export type SanctionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctionWhereInput;
    limit?: number;
};
export type Sanction$complaintArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintOmit<ExtArgs> | null;
    include?: Prisma.ComplaintInclude<ExtArgs> | null;
    where?: Prisma.ComplaintWhereInput;
};
export type SanctionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
};
