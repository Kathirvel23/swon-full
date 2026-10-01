import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AuditLogPayload>;
export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null;
    _avg: AuditLogAvgAggregateOutputType | null;
    _sum: AuditLogSumAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type AuditLogAvgAggregateOutputType = {
    id: number | null;
    actorAccountId: number | null;
};
export type AuditLogSumAggregateOutputType = {
    id: bigint | null;
    actorAccountId: bigint | null;
};
export type AuditLogMinAggregateOutputType = {
    id: bigint | null;
    at: Date | null;
    actorAccountId: bigint | null;
    actorRole: string | null;
    action: string | null;
    entityType: string | null;
    entityPublicId: string | null;
    requestId: string | null;
    ipHash: string | null;
};
export type AuditLogMaxAggregateOutputType = {
    id: bigint | null;
    at: Date | null;
    actorAccountId: bigint | null;
    actorRole: string | null;
    action: string | null;
    entityType: string | null;
    entityPublicId: string | null;
    requestId: string | null;
    ipHash: string | null;
};
export type AuditLogCountAggregateOutputType = {
    id: number;
    at: number;
    actorAccountId: number;
    actorRole: number;
    action: number;
    entityType: number;
    entityPublicId: number;
    beforeJson: number;
    afterJson: number;
    requestId: number;
    ipHash: number;
    _all: number;
};
export type AuditLogAvgAggregateInputType = {
    id?: true;
    actorAccountId?: true;
};
export type AuditLogSumAggregateInputType = {
    id?: true;
    actorAccountId?: true;
};
export type AuditLogMinAggregateInputType = {
    id?: true;
    at?: true;
    actorAccountId?: true;
    actorRole?: true;
    action?: true;
    entityType?: true;
    entityPublicId?: true;
    requestId?: true;
    ipHash?: true;
};
export type AuditLogMaxAggregateInputType = {
    id?: true;
    at?: true;
    actorAccountId?: true;
    actorRole?: true;
    action?: true;
    entityType?: true;
    entityPublicId?: true;
    requestId?: true;
    ipHash?: true;
};
export type AuditLogCountAggregateInputType = {
    id?: true;
    at?: true;
    actorAccountId?: true;
    actorRole?: true;
    action?: true;
    entityType?: true;
    entityPublicId?: true;
    beforeJson?: true;
    afterJson?: true;
    requestId?: true;
    ipHash?: true;
    _all?: true;
};
export type AuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuditLogCountAggregateInputType;
    _avg?: AuditLogAvgAggregateInputType;
    _sum?: AuditLogSumAggregateInputType;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateAuditLog[P]>;
};
export type AuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithAggregationInput | Prisma.AuditLogOrderByWithAggregationInput[];
    by: Prisma.AuditLogScalarFieldEnum[] | Prisma.AuditLogScalarFieldEnum;
    having?: Prisma.AuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditLogCountAggregateInputType | true;
    _avg?: AuditLogAvgAggregateInputType;
    _sum?: AuditLogSumAggregateInputType;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type AuditLogGroupByOutputType = {
    id: bigint;
    at: Date;
    actorAccountId: bigint | null;
    actorRole: string | null;
    action: string;
    entityType: string;
    entityPublicId: string;
    beforeJson: runtime.JsonValue | null;
    afterJson: runtime.JsonValue | null;
    requestId: string | null;
    ipHash: string | null;
    _count: AuditLogCountAggregateOutputType | null;
    _avg: AuditLogAvgAggregateOutputType | null;
    _sum: AuditLogSumAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]>;
}>>;
export type AuditLogWhereInput = {
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    id?: Prisma.BigIntFilter<"AuditLog"> | bigint | number;
    at?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    actorAccountId?: Prisma.BigIntNullableFilter<"AuditLog"> | bigint | number | null;
    actorRole?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    entityType?: Prisma.StringFilter<"AuditLog"> | string;
    entityPublicId?: Prisma.StringFilter<"AuditLog"> | string;
    beforeJson?: Prisma.JsonNullableFilter<"AuditLog">;
    afterJson?: Prisma.JsonNullableFilter<"AuditLog">;
    requestId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    ipHash?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    actor?: Prisma.XOR<Prisma.AccountNullableScalarRelationFilter, Prisma.AccountWhereInput> | null;
};
export type AuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    actorAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    actorRole?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityPublicId?: Prisma.SortOrder;
    beforeJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    afterJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestId?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    actor?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.AuditLogOrderByRelevanceInput;
};
export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    at?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    actorAccountId?: Prisma.BigIntNullableFilter<"AuditLog"> | bigint | number | null;
    actorRole?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    entityType?: Prisma.StringFilter<"AuditLog"> | string;
    entityPublicId?: Prisma.StringFilter<"AuditLog"> | string;
    beforeJson?: Prisma.JsonNullableFilter<"AuditLog">;
    afterJson?: Prisma.JsonNullableFilter<"AuditLog">;
    requestId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    ipHash?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    actor?: Prisma.XOR<Prisma.AccountNullableScalarRelationFilter, Prisma.AccountWhereInput> | null;
}, "id">;
export type AuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    actorAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    actorRole?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityPublicId?: Prisma.SortOrder;
    beforeJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    afterJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestId?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AuditLogCountOrderByAggregateInput;
    _avg?: Prisma.AuditLogAvgOrderByAggregateInput;
    _max?: Prisma.AuditLogMaxOrderByAggregateInput;
    _min?: Prisma.AuditLogMinOrderByAggregateInput;
    _sum?: Prisma.AuditLogSumOrderByAggregateInput;
};
export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"AuditLog"> | bigint | number;
    at?: Prisma.DateTimeWithAggregatesFilter<"AuditLog"> | Date | string;
    actorAccountId?: Prisma.BigIntNullableWithAggregatesFilter<"AuditLog"> | bigint | number | null;
    actorRole?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    action?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    entityType?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    entityPublicId?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    beforeJson?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    afterJson?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    requestId?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    ipHash?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
};
export type AuditLogCreateInput = {
    id?: bigint | number;
    at?: Date | string;
    actorRole?: string | null;
    action: string;
    entityType: string;
    entityPublicId: string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: string | null;
    ipHash?: string | null;
    actor?: Prisma.AccountCreateNestedOneWithoutAuditActorInput;
};
export type AuditLogUncheckedCreateInput = {
    id?: bigint | number;
    at?: Date | string;
    actorAccountId?: bigint | number | null;
    actorRole?: string | null;
    action: string;
    entityType: string;
    entityPublicId: string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: string | null;
    ipHash?: string | null;
};
export type AuditLogUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actorRole?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityPublicId?: Prisma.StringFieldUpdateOperationsInput | string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actor?: Prisma.AccountUpdateOneWithoutAuditActorNestedInput;
};
export type AuditLogUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actorAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    actorRole?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityPublicId?: Prisma.StringFieldUpdateOperationsInput | string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuditLogCreateManyInput = {
    id?: bigint | number;
    at?: Date | string;
    actorAccountId?: bigint | number | null;
    actorRole?: string | null;
    action: string;
    entityType: string;
    entityPublicId: string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: string | null;
    ipHash?: string | null;
};
export type AuditLogUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actorRole?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityPublicId?: Prisma.StringFieldUpdateOperationsInput | string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuditLogUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actorAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    actorRole?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityPublicId?: Prisma.StringFieldUpdateOperationsInput | string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuditLogListRelationFilter = {
    every?: Prisma.AuditLogWhereInput;
    some?: Prisma.AuditLogWhereInput;
    none?: Prisma.AuditLogWhereInput;
};
export type AuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuditLogOrderByRelevanceInput = {
    fields: Prisma.AuditLogOrderByRelevanceFieldEnum | Prisma.AuditLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    actorAccountId?: Prisma.SortOrder;
    actorRole?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityPublicId?: Prisma.SortOrder;
    beforeJson?: Prisma.SortOrder;
    afterJson?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type AuditLogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorAccountId?: Prisma.SortOrder;
};
export type AuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    actorAccountId?: Prisma.SortOrder;
    actorRole?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityPublicId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type AuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    actorAccountId?: Prisma.SortOrder;
    actorRole?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityPublicId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type AuditLogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorAccountId?: Prisma.SortOrder;
};
export type AuditLogCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorInput, Prisma.AuditLogUncheckedCreateWithoutActorInput> | Prisma.AuditLogCreateWithoutActorInput[] | Prisma.AuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorInput | Prisma.AuditLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.AuditLogCreateManyActorInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorInput, Prisma.AuditLogUncheckedCreateWithoutActorInput> | Prisma.AuditLogCreateWithoutActorInput[] | Prisma.AuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorInput | Prisma.AuditLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.AuditLogCreateManyActorInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorInput, Prisma.AuditLogUncheckedCreateWithoutActorInput> | Prisma.AuditLogCreateWithoutActorInput[] | Prisma.AuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorInput | Prisma.AuditLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutActorInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.AuditLogCreateManyActorInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutActorInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutActorInput | Prisma.AuditLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutActorInput, Prisma.AuditLogUncheckedCreateWithoutActorInput> | Prisma.AuditLogCreateWithoutActorInput[] | Prisma.AuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutActorInput | Prisma.AuditLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutActorInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.AuditLogCreateManyActorInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutActorInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutActorInput | Prisma.AuditLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogCreateWithoutActorInput = {
    id?: bigint | number;
    at?: Date | string;
    actorRole?: string | null;
    action: string;
    entityType: string;
    entityPublicId: string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: string | null;
    ipHash?: string | null;
};
export type AuditLogUncheckedCreateWithoutActorInput = {
    id?: bigint | number;
    at?: Date | string;
    actorRole?: string | null;
    action: string;
    entityType: string;
    entityPublicId: string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: string | null;
    ipHash?: string | null;
};
export type AuditLogCreateOrConnectWithoutActorInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutActorInput, Prisma.AuditLogUncheckedCreateWithoutActorInput>;
};
export type AuditLogCreateManyActorInputEnvelope = {
    data: Prisma.AuditLogCreateManyActorInput | Prisma.AuditLogCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutActorInput, Prisma.AuditLogUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutActorInput, Prisma.AuditLogUncheckedCreateWithoutActorInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutActorInput, Prisma.AuditLogUncheckedUpdateWithoutActorInput>;
};
export type AuditLogUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutActorInput>;
};
export type AuditLogScalarWhereInput = {
    AND?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    OR?: Prisma.AuditLogScalarWhereInput[];
    NOT?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    id?: Prisma.BigIntFilter<"AuditLog"> | bigint | number;
    at?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    actorAccountId?: Prisma.BigIntNullableFilter<"AuditLog"> | bigint | number | null;
    actorRole?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    entityType?: Prisma.StringFilter<"AuditLog"> | string;
    entityPublicId?: Prisma.StringFilter<"AuditLog"> | string;
    beforeJson?: Prisma.JsonNullableFilter<"AuditLog">;
    afterJson?: Prisma.JsonNullableFilter<"AuditLog">;
    requestId?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    ipHash?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
};
export type AuditLogCreateManyActorInput = {
    id?: bigint | number;
    at?: Date | string;
    actorRole?: string | null;
    action: string;
    entityType: string;
    entityPublicId: string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: string | null;
    ipHash?: string | null;
};
export type AuditLogUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actorRole?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityPublicId?: Prisma.StringFieldUpdateOperationsInput | string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuditLogUncheckedUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actorRole?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityPublicId?: Prisma.StringFieldUpdateOperationsInput | string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuditLogUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actorRole?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityPublicId?: Prisma.StringFieldUpdateOperationsInput | string;
    beforeJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    afterJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    requestId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    at?: boolean;
    actorAccountId?: boolean;
    actorRole?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityPublicId?: boolean;
    beforeJson?: boolean;
    afterJson?: boolean;
    requestId?: boolean;
    ipHash?: boolean;
    actor?: boolean | Prisma.AuditLog$actorArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectScalar = {
    id?: boolean;
    at?: boolean;
    actorAccountId?: boolean;
    actorRole?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityPublicId?: boolean;
    beforeJson?: boolean;
    afterJson?: boolean;
    requestId?: boolean;
    ipHash?: boolean;
};
export type AuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "at" | "actorAccountId" | "actorRole" | "action" | "entityType" | "entityPublicId" | "beforeJson" | "afterJson" | "requestId" | "ipHash", ExtArgs["result"]["auditLog"]>;
export type AuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actor?: boolean | Prisma.AuditLog$actorArgs<ExtArgs>;
};
export type $AuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuditLog";
    objects: {
        actor: Prisma.$AccountPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        at: Date;
        actorAccountId: bigint | null;
        actorRole: string | null;
        action: string;
        entityType: string;
        entityPublicId: string;
        beforeJson: runtime.JsonValue | null;
        afterJson: runtime.JsonValue | null;
        requestId: string | null;
        ipHash: string | null;
    }, ExtArgs["result"]["auditLog"]>;
    composites: {};
};
export type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuditLogPayload, S>;
export type AuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuditLogCountAggregateInputType | true;
};
export interface AuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'];
        meta: {
            name: 'AuditLog';
        };
    };
    findUnique<T extends AuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuditLogCreateArgs>(args: Prisma.SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends AuditLogDeleteArgs>(args: Prisma.SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuditLogUpdateArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends AuditLogUpsertArgs>(args: Prisma.SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuditLogCountArgs>(args?: Prisma.Subset<T, AuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuditLogCountAggregateOutputType> : number>;
    aggregate<T extends AuditLogAggregateArgs>(args: Prisma.Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>;
    groupBy<T extends AuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuditLogFieldRefs;
}
export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    actor<T extends Prisma.AuditLog$actorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuditLog$actorArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"AuditLog", 'BigInt'>;
    readonly at: Prisma.FieldRef<"AuditLog", 'DateTime'>;
    readonly actorAccountId: Prisma.FieldRef<"AuditLog", 'BigInt'>;
    readonly actorRole: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly entityType: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly entityPublicId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly beforeJson: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly afterJson: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly requestId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly ipHash: Prisma.FieldRef<"AuditLog", 'String'>;
}
export type AuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
};
export type AuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
};
export type AuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLog$actorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
};
export type AuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
};
