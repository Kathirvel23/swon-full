import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ComplaintEventModel = runtime.Types.Result.DefaultSelection<Prisma.$ComplaintEventPayload>;
export type AggregateComplaintEvent = {
    _count: ComplaintEventCountAggregateOutputType | null;
    _avg: ComplaintEventAvgAggregateOutputType | null;
    _sum: ComplaintEventSumAggregateOutputType | null;
    _min: ComplaintEventMinAggregateOutputType | null;
    _max: ComplaintEventMaxAggregateOutputType | null;
};
export type ComplaintEventAvgAggregateOutputType = {
    id: number | null;
    complaintId: number | null;
    actorId: number | null;
};
export type ComplaintEventSumAggregateOutputType = {
    id: bigint | null;
    complaintId: bigint | null;
    actorId: bigint | null;
};
export type ComplaintEventMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    complaintId: bigint | null;
    actorId: bigint | null;
    kind: string | null;
    body: string | null;
    evidenceStorageKey: string | null;
    createdAt: Date | null;
};
export type ComplaintEventMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    complaintId: bigint | null;
    actorId: bigint | null;
    kind: string | null;
    body: string | null;
    evidenceStorageKey: string | null;
    createdAt: Date | null;
};
export type ComplaintEventCountAggregateOutputType = {
    id: number;
    publicId: number;
    complaintId: number;
    actorId: number;
    kind: number;
    body: number;
    evidenceStorageKey: number;
    createdAt: number;
    _all: number;
};
export type ComplaintEventAvgAggregateInputType = {
    id?: true;
    complaintId?: true;
    actorId?: true;
};
export type ComplaintEventSumAggregateInputType = {
    id?: true;
    complaintId?: true;
    actorId?: true;
};
export type ComplaintEventMinAggregateInputType = {
    id?: true;
    publicId?: true;
    complaintId?: true;
    actorId?: true;
    kind?: true;
    body?: true;
    evidenceStorageKey?: true;
    createdAt?: true;
};
export type ComplaintEventMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    complaintId?: true;
    actorId?: true;
    kind?: true;
    body?: true;
    evidenceStorageKey?: true;
    createdAt?: true;
};
export type ComplaintEventCountAggregateInputType = {
    id?: true;
    publicId?: true;
    complaintId?: true;
    actorId?: true;
    kind?: true;
    body?: true;
    evidenceStorageKey?: true;
    createdAt?: true;
    _all?: true;
};
export type ComplaintEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ComplaintEventWhereInput;
    orderBy?: Prisma.ComplaintEventOrderByWithRelationInput | Prisma.ComplaintEventOrderByWithRelationInput[];
    cursor?: Prisma.ComplaintEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ComplaintEventCountAggregateInputType;
    _avg?: ComplaintEventAvgAggregateInputType;
    _sum?: ComplaintEventSumAggregateInputType;
    _min?: ComplaintEventMinAggregateInputType;
    _max?: ComplaintEventMaxAggregateInputType;
};
export type GetComplaintEventAggregateType<T extends ComplaintEventAggregateArgs> = {
    [P in keyof T & keyof AggregateComplaintEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateComplaintEvent[P]> : Prisma.GetScalarType<T[P], AggregateComplaintEvent[P]>;
};
export type ComplaintEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ComplaintEventWhereInput;
    orderBy?: Prisma.ComplaintEventOrderByWithAggregationInput | Prisma.ComplaintEventOrderByWithAggregationInput[];
    by: Prisma.ComplaintEventScalarFieldEnum[] | Prisma.ComplaintEventScalarFieldEnum;
    having?: Prisma.ComplaintEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ComplaintEventCountAggregateInputType | true;
    _avg?: ComplaintEventAvgAggregateInputType;
    _sum?: ComplaintEventSumAggregateInputType;
    _min?: ComplaintEventMinAggregateInputType;
    _max?: ComplaintEventMaxAggregateInputType;
};
export type ComplaintEventGroupByOutputType = {
    id: bigint;
    publicId: string;
    complaintId: bigint;
    actorId: bigint;
    kind: string;
    body: string | null;
    evidenceStorageKey: string | null;
    createdAt: Date;
    _count: ComplaintEventCountAggregateOutputType | null;
    _avg: ComplaintEventAvgAggregateOutputType | null;
    _sum: ComplaintEventSumAggregateOutputType | null;
    _min: ComplaintEventMinAggregateOutputType | null;
    _max: ComplaintEventMaxAggregateOutputType | null;
};
export type GetComplaintEventGroupByPayload<T extends ComplaintEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ComplaintEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ComplaintEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ComplaintEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ComplaintEventGroupByOutputType[P]>;
}>>;
export type ComplaintEventWhereInput = {
    AND?: Prisma.ComplaintEventWhereInput | Prisma.ComplaintEventWhereInput[];
    OR?: Prisma.ComplaintEventWhereInput[];
    NOT?: Prisma.ComplaintEventWhereInput | Prisma.ComplaintEventWhereInput[];
    id?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    publicId?: Prisma.StringFilter<"ComplaintEvent"> | string;
    complaintId?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    actorId?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    kind?: Prisma.StringFilter<"ComplaintEvent"> | string;
    body?: Prisma.StringNullableFilter<"ComplaintEvent"> | string | null;
    evidenceStorageKey?: Prisma.StringNullableFilter<"ComplaintEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ComplaintEvent"> | Date | string;
    complaint?: Prisma.XOR<Prisma.ComplaintScalarRelationFilter, Prisma.ComplaintWhereInput>;
    actor?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type ComplaintEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    complaintId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    body?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    complaint?: Prisma.ComplaintOrderByWithRelationInput;
    actor?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.ComplaintEventOrderByRelevanceInput;
};
export type ComplaintEventWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    AND?: Prisma.ComplaintEventWhereInput | Prisma.ComplaintEventWhereInput[];
    OR?: Prisma.ComplaintEventWhereInput[];
    NOT?: Prisma.ComplaintEventWhereInput | Prisma.ComplaintEventWhereInput[];
    complaintId?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    actorId?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    kind?: Prisma.StringFilter<"ComplaintEvent"> | string;
    body?: Prisma.StringNullableFilter<"ComplaintEvent"> | string | null;
    evidenceStorageKey?: Prisma.StringNullableFilter<"ComplaintEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ComplaintEvent"> | Date | string;
    complaint?: Prisma.XOR<Prisma.ComplaintScalarRelationFilter, Prisma.ComplaintWhereInput>;
    actor?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "id" | "publicId">;
export type ComplaintEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    complaintId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    body?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ComplaintEventCountOrderByAggregateInput;
    _avg?: Prisma.ComplaintEventAvgOrderByAggregateInput;
    _max?: Prisma.ComplaintEventMaxOrderByAggregateInput;
    _min?: Prisma.ComplaintEventMinOrderByAggregateInput;
    _sum?: Prisma.ComplaintEventSumOrderByAggregateInput;
};
export type ComplaintEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.ComplaintEventScalarWhereWithAggregatesInput | Prisma.ComplaintEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.ComplaintEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ComplaintEventScalarWhereWithAggregatesInput | Prisma.ComplaintEventScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"ComplaintEvent"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"ComplaintEvent"> | string;
    complaintId?: Prisma.BigIntWithAggregatesFilter<"ComplaintEvent"> | bigint | number;
    actorId?: Prisma.BigIntWithAggregatesFilter<"ComplaintEvent"> | bigint | number;
    kind?: Prisma.StringWithAggregatesFilter<"ComplaintEvent"> | string;
    body?: Prisma.StringNullableWithAggregatesFilter<"ComplaintEvent"> | string | null;
    evidenceStorageKey?: Prisma.StringNullableWithAggregatesFilter<"ComplaintEvent"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ComplaintEvent"> | Date | string;
};
export type ComplaintEventCreateInput = {
    id?: bigint | number;
    publicId?: string;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
    complaint: Prisma.ComplaintCreateNestedOneWithoutEventsInput;
    actor: Prisma.AccountCreateNestedOneWithoutComplaintEventsInput;
};
export type ComplaintEventUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    complaintId: bigint | number;
    actorId: bigint | number;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
};
export type ComplaintEventUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    complaint?: Prisma.ComplaintUpdateOneRequiredWithoutEventsNestedInput;
    actor?: Prisma.AccountUpdateOneRequiredWithoutComplaintEventsNestedInput;
};
export type ComplaintEventUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    complaintId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplaintEventCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    complaintId: bigint | number;
    actorId: bigint | number;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
};
export type ComplaintEventUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplaintEventUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    complaintId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplaintEventListRelationFilter = {
    every?: Prisma.ComplaintEventWhereInput;
    some?: Prisma.ComplaintEventWhereInput;
    none?: Prisma.ComplaintEventWhereInput;
};
export type ComplaintEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ComplaintEventOrderByRelevanceInput = {
    fields: Prisma.ComplaintEventOrderByRelevanceFieldEnum | Prisma.ComplaintEventOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ComplaintEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    complaintId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ComplaintEventAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    complaintId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
};
export type ComplaintEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    complaintId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ComplaintEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    complaintId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ComplaintEventSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    complaintId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
};
export type ComplaintEventCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutActorInput, Prisma.ComplaintEventUncheckedCreateWithoutActorInput> | Prisma.ComplaintEventCreateWithoutActorInput[] | Prisma.ComplaintEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutActorInput | Prisma.ComplaintEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.ComplaintEventCreateManyActorInputEnvelope;
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
};
export type ComplaintEventUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutActorInput, Prisma.ComplaintEventUncheckedCreateWithoutActorInput> | Prisma.ComplaintEventCreateWithoutActorInput[] | Prisma.ComplaintEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutActorInput | Prisma.ComplaintEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.ComplaintEventCreateManyActorInputEnvelope;
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
};
export type ComplaintEventUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutActorInput, Prisma.ComplaintEventUncheckedCreateWithoutActorInput> | Prisma.ComplaintEventCreateWithoutActorInput[] | Prisma.ComplaintEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutActorInput | Prisma.ComplaintEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.ComplaintEventUpsertWithWhereUniqueWithoutActorInput | Prisma.ComplaintEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.ComplaintEventCreateManyActorInputEnvelope;
    set?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    disconnect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    delete?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    update?: Prisma.ComplaintEventUpdateWithWhereUniqueWithoutActorInput | Prisma.ComplaintEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.ComplaintEventUpdateManyWithWhereWithoutActorInput | Prisma.ComplaintEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.ComplaintEventScalarWhereInput | Prisma.ComplaintEventScalarWhereInput[];
};
export type ComplaintEventUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutActorInput, Prisma.ComplaintEventUncheckedCreateWithoutActorInput> | Prisma.ComplaintEventCreateWithoutActorInput[] | Prisma.ComplaintEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutActorInput | Prisma.ComplaintEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.ComplaintEventUpsertWithWhereUniqueWithoutActorInput | Prisma.ComplaintEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.ComplaintEventCreateManyActorInputEnvelope;
    set?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    disconnect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    delete?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    update?: Prisma.ComplaintEventUpdateWithWhereUniqueWithoutActorInput | Prisma.ComplaintEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.ComplaintEventUpdateManyWithWhereWithoutActorInput | Prisma.ComplaintEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.ComplaintEventScalarWhereInput | Prisma.ComplaintEventScalarWhereInput[];
};
export type ComplaintEventCreateNestedManyWithoutComplaintInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutComplaintInput, Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput> | Prisma.ComplaintEventCreateWithoutComplaintInput[] | Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput | Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput[];
    createMany?: Prisma.ComplaintEventCreateManyComplaintInputEnvelope;
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
};
export type ComplaintEventUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutComplaintInput, Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput> | Prisma.ComplaintEventCreateWithoutComplaintInput[] | Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput | Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput[];
    createMany?: Prisma.ComplaintEventCreateManyComplaintInputEnvelope;
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
};
export type ComplaintEventUpdateManyWithoutComplaintNestedInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutComplaintInput, Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput> | Prisma.ComplaintEventCreateWithoutComplaintInput[] | Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput | Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput[];
    upsert?: Prisma.ComplaintEventUpsertWithWhereUniqueWithoutComplaintInput | Prisma.ComplaintEventUpsertWithWhereUniqueWithoutComplaintInput[];
    createMany?: Prisma.ComplaintEventCreateManyComplaintInputEnvelope;
    set?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    disconnect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    delete?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    update?: Prisma.ComplaintEventUpdateWithWhereUniqueWithoutComplaintInput | Prisma.ComplaintEventUpdateWithWhereUniqueWithoutComplaintInput[];
    updateMany?: Prisma.ComplaintEventUpdateManyWithWhereWithoutComplaintInput | Prisma.ComplaintEventUpdateManyWithWhereWithoutComplaintInput[];
    deleteMany?: Prisma.ComplaintEventScalarWhereInput | Prisma.ComplaintEventScalarWhereInput[];
};
export type ComplaintEventUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: Prisma.XOR<Prisma.ComplaintEventCreateWithoutComplaintInput, Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput> | Prisma.ComplaintEventCreateWithoutComplaintInput[] | Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput[];
    connectOrCreate?: Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput | Prisma.ComplaintEventCreateOrConnectWithoutComplaintInput[];
    upsert?: Prisma.ComplaintEventUpsertWithWhereUniqueWithoutComplaintInput | Prisma.ComplaintEventUpsertWithWhereUniqueWithoutComplaintInput[];
    createMany?: Prisma.ComplaintEventCreateManyComplaintInputEnvelope;
    set?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    disconnect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    delete?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    connect?: Prisma.ComplaintEventWhereUniqueInput | Prisma.ComplaintEventWhereUniqueInput[];
    update?: Prisma.ComplaintEventUpdateWithWhereUniqueWithoutComplaintInput | Prisma.ComplaintEventUpdateWithWhereUniqueWithoutComplaintInput[];
    updateMany?: Prisma.ComplaintEventUpdateManyWithWhereWithoutComplaintInput | Prisma.ComplaintEventUpdateManyWithWhereWithoutComplaintInput[];
    deleteMany?: Prisma.ComplaintEventScalarWhereInput | Prisma.ComplaintEventScalarWhereInput[];
};
export type ComplaintEventCreateWithoutActorInput = {
    id?: bigint | number;
    publicId?: string;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
    complaint: Prisma.ComplaintCreateNestedOneWithoutEventsInput;
};
export type ComplaintEventUncheckedCreateWithoutActorInput = {
    id?: bigint | number;
    publicId?: string;
    complaintId: bigint | number;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
};
export type ComplaintEventCreateOrConnectWithoutActorInput = {
    where: Prisma.ComplaintEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.ComplaintEventCreateWithoutActorInput, Prisma.ComplaintEventUncheckedCreateWithoutActorInput>;
};
export type ComplaintEventCreateManyActorInputEnvelope = {
    data: Prisma.ComplaintEventCreateManyActorInput | Prisma.ComplaintEventCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type ComplaintEventUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.ComplaintEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.ComplaintEventUpdateWithoutActorInput, Prisma.ComplaintEventUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.ComplaintEventCreateWithoutActorInput, Prisma.ComplaintEventUncheckedCreateWithoutActorInput>;
};
export type ComplaintEventUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.ComplaintEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.ComplaintEventUpdateWithoutActorInput, Prisma.ComplaintEventUncheckedUpdateWithoutActorInput>;
};
export type ComplaintEventUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.ComplaintEventScalarWhereInput;
    data: Prisma.XOR<Prisma.ComplaintEventUpdateManyMutationInput, Prisma.ComplaintEventUncheckedUpdateManyWithoutActorInput>;
};
export type ComplaintEventScalarWhereInput = {
    AND?: Prisma.ComplaintEventScalarWhereInput | Prisma.ComplaintEventScalarWhereInput[];
    OR?: Prisma.ComplaintEventScalarWhereInput[];
    NOT?: Prisma.ComplaintEventScalarWhereInput | Prisma.ComplaintEventScalarWhereInput[];
    id?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    publicId?: Prisma.StringFilter<"ComplaintEvent"> | string;
    complaintId?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    actorId?: Prisma.BigIntFilter<"ComplaintEvent"> | bigint | number;
    kind?: Prisma.StringFilter<"ComplaintEvent"> | string;
    body?: Prisma.StringNullableFilter<"ComplaintEvent"> | string | null;
    evidenceStorageKey?: Prisma.StringNullableFilter<"ComplaintEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ComplaintEvent"> | Date | string;
};
export type ComplaintEventCreateWithoutComplaintInput = {
    id?: bigint | number;
    publicId?: string;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
    actor: Prisma.AccountCreateNestedOneWithoutComplaintEventsInput;
};
export type ComplaintEventUncheckedCreateWithoutComplaintInput = {
    id?: bigint | number;
    publicId?: string;
    actorId: bigint | number;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
};
export type ComplaintEventCreateOrConnectWithoutComplaintInput = {
    where: Prisma.ComplaintEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.ComplaintEventCreateWithoutComplaintInput, Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput>;
};
export type ComplaintEventCreateManyComplaintInputEnvelope = {
    data: Prisma.ComplaintEventCreateManyComplaintInput | Prisma.ComplaintEventCreateManyComplaintInput[];
    skipDuplicates?: boolean;
};
export type ComplaintEventUpsertWithWhereUniqueWithoutComplaintInput = {
    where: Prisma.ComplaintEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.ComplaintEventUpdateWithoutComplaintInput, Prisma.ComplaintEventUncheckedUpdateWithoutComplaintInput>;
    create: Prisma.XOR<Prisma.ComplaintEventCreateWithoutComplaintInput, Prisma.ComplaintEventUncheckedCreateWithoutComplaintInput>;
};
export type ComplaintEventUpdateWithWhereUniqueWithoutComplaintInput = {
    where: Prisma.ComplaintEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.ComplaintEventUpdateWithoutComplaintInput, Prisma.ComplaintEventUncheckedUpdateWithoutComplaintInput>;
};
export type ComplaintEventUpdateManyWithWhereWithoutComplaintInput = {
    where: Prisma.ComplaintEventScalarWhereInput;
    data: Prisma.XOR<Prisma.ComplaintEventUpdateManyMutationInput, Prisma.ComplaintEventUncheckedUpdateManyWithoutComplaintInput>;
};
export type ComplaintEventCreateManyActorInput = {
    id?: bigint | number;
    publicId?: string;
    complaintId: bigint | number;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
};
export type ComplaintEventUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    complaint?: Prisma.ComplaintUpdateOneRequiredWithoutEventsNestedInput;
};
export type ComplaintEventUncheckedUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    complaintId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplaintEventUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    complaintId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplaintEventCreateManyComplaintInput = {
    id?: bigint | number;
    publicId?: string;
    actorId: bigint | number;
    kind: string;
    body?: string | null;
    evidenceStorageKey?: string | null;
    createdAt?: Date | string;
};
export type ComplaintEventUpdateWithoutComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.AccountUpdateOneRequiredWithoutComplaintEventsNestedInput;
};
export type ComplaintEventUncheckedUpdateWithoutComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplaintEventUncheckedUpdateManyWithoutComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplaintEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    complaintId?: boolean;
    actorId?: boolean;
    kind?: boolean;
    body?: boolean;
    evidenceStorageKey?: boolean;
    createdAt?: boolean;
    complaint?: boolean | Prisma.ComplaintDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["complaintEvent"]>;
export type ComplaintEventSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    complaintId?: boolean;
    actorId?: boolean;
    kind?: boolean;
    body?: boolean;
    evidenceStorageKey?: boolean;
    createdAt?: boolean;
};
export type ComplaintEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "complaintId" | "actorId" | "kind" | "body" | "evidenceStorageKey" | "createdAt", ExtArgs["result"]["complaintEvent"]>;
export type ComplaintEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    complaint?: boolean | Prisma.ComplaintDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $ComplaintEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ComplaintEvent";
    objects: {
        complaint: Prisma.$ComplaintPayload<ExtArgs>;
        actor: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        complaintId: bigint;
        actorId: bigint;
        kind: string;
        body: string | null;
        evidenceStorageKey: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["complaintEvent"]>;
    composites: {};
};
export type ComplaintEventGetPayload<S extends boolean | null | undefined | ComplaintEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload, S>;
export type ComplaintEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ComplaintEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ComplaintEventCountAggregateInputType | true;
};
export interface ComplaintEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ComplaintEvent'];
        meta: {
            name: 'ComplaintEvent';
        };
    };
    findUnique<T extends ComplaintEventFindUniqueArgs>(args: Prisma.SelectSubset<T, ComplaintEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ComplaintEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ComplaintEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ComplaintEventFindFirstArgs>(args?: Prisma.SelectSubset<T, ComplaintEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ComplaintEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ComplaintEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ComplaintEventFindManyArgs>(args?: Prisma.SelectSubset<T, ComplaintEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ComplaintEventCreateArgs>(args: Prisma.SelectSubset<T, ComplaintEventCreateArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ComplaintEventCreateManyArgs>(args?: Prisma.SelectSubset<T, ComplaintEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ComplaintEventDeleteArgs>(args: Prisma.SelectSubset<T, ComplaintEventDeleteArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ComplaintEventUpdateArgs>(args: Prisma.SelectSubset<T, ComplaintEventUpdateArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ComplaintEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, ComplaintEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ComplaintEventUpdateManyArgs>(args: Prisma.SelectSubset<T, ComplaintEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ComplaintEventUpsertArgs>(args: Prisma.SelectSubset<T, ComplaintEventUpsertArgs<ExtArgs>>): Prisma.Prisma__ComplaintEventClient<runtime.Types.Result.GetResult<Prisma.$ComplaintEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ComplaintEventCountArgs>(args?: Prisma.Subset<T, ComplaintEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ComplaintEventCountAggregateOutputType> : number>;
    aggregate<T extends ComplaintEventAggregateArgs>(args: Prisma.Subset<T, ComplaintEventAggregateArgs>): Prisma.PrismaPromise<GetComplaintEventAggregateType<T>>;
    groupBy<T extends ComplaintEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ComplaintEventGroupByArgs['orderBy'];
    } : {
        orderBy?: ComplaintEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ComplaintEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ComplaintEventFieldRefs;
}
export interface Prisma__ComplaintEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    complaint<T extends Prisma.ComplaintDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ComplaintDefaultArgs<ExtArgs>>): Prisma.Prisma__ComplaintClient<runtime.Types.Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ComplaintEventFieldRefs {
    readonly id: Prisma.FieldRef<"ComplaintEvent", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"ComplaintEvent", 'String'>;
    readonly complaintId: Prisma.FieldRef<"ComplaintEvent", 'BigInt'>;
    readonly actorId: Prisma.FieldRef<"ComplaintEvent", 'BigInt'>;
    readonly kind: Prisma.FieldRef<"ComplaintEvent", 'String'>;
    readonly body: Prisma.FieldRef<"ComplaintEvent", 'String'>;
    readonly evidenceStorageKey: Prisma.FieldRef<"ComplaintEvent", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ComplaintEvent", 'DateTime'>;
}
export type ComplaintEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    where: Prisma.ComplaintEventWhereUniqueInput;
};
export type ComplaintEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    where: Prisma.ComplaintEventWhereUniqueInput;
};
export type ComplaintEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    where?: Prisma.ComplaintEventWhereInput;
    orderBy?: Prisma.ComplaintEventOrderByWithRelationInput | Prisma.ComplaintEventOrderByWithRelationInput[];
    cursor?: Prisma.ComplaintEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ComplaintEventScalarFieldEnum | Prisma.ComplaintEventScalarFieldEnum[];
};
export type ComplaintEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    where?: Prisma.ComplaintEventWhereInput;
    orderBy?: Prisma.ComplaintEventOrderByWithRelationInput | Prisma.ComplaintEventOrderByWithRelationInput[];
    cursor?: Prisma.ComplaintEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ComplaintEventScalarFieldEnum | Prisma.ComplaintEventScalarFieldEnum[];
};
export type ComplaintEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    where?: Prisma.ComplaintEventWhereInput;
    orderBy?: Prisma.ComplaintEventOrderByWithRelationInput | Prisma.ComplaintEventOrderByWithRelationInput[];
    cursor?: Prisma.ComplaintEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ComplaintEventScalarFieldEnum | Prisma.ComplaintEventScalarFieldEnum[];
};
export type ComplaintEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ComplaintEventCreateInput, Prisma.ComplaintEventUncheckedCreateInput>;
};
export type ComplaintEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ComplaintEventCreateManyInput | Prisma.ComplaintEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ComplaintEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ComplaintEventUpdateInput, Prisma.ComplaintEventUncheckedUpdateInput>;
    where: Prisma.ComplaintEventWhereUniqueInput;
};
export type ComplaintEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ComplaintEventUpdateManyMutationInput, Prisma.ComplaintEventUncheckedUpdateManyInput>;
    where?: Prisma.ComplaintEventWhereInput;
    limit?: number;
};
export type ComplaintEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    where: Prisma.ComplaintEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.ComplaintEventCreateInput, Prisma.ComplaintEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ComplaintEventUpdateInput, Prisma.ComplaintEventUncheckedUpdateInput>;
};
export type ComplaintEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
    where: Prisma.ComplaintEventWhereUniqueInput;
};
export type ComplaintEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ComplaintEventWhereInput;
    limit?: number;
};
export type ComplaintEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintEventSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintEventOmit<ExtArgs> | null;
    include?: Prisma.ComplaintEventInclude<ExtArgs> | null;
};
