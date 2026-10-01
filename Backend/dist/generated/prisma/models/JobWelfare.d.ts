import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type JobWelfareModel = runtime.Types.Result.DefaultSelection<Prisma.$JobWelfarePayload>;
export type AggregateJobWelfare = {
    _count: JobWelfareCountAggregateOutputType | null;
    _avg: JobWelfareAvgAggregateOutputType | null;
    _sum: JobWelfareSumAggregateOutputType | null;
    _min: JobWelfareMinAggregateOutputType | null;
    _max: JobWelfareMaxAggregateOutputType | null;
};
export type JobWelfareAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    welfareItemId: number | null;
};
export type JobWelfareSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    welfareItemId: bigint | null;
};
export type JobWelfareMinAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    welfareItemId: bigint | null;
    note: string | null;
};
export type JobWelfareMaxAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    welfareItemId: bigint | null;
    note: string | null;
};
export type JobWelfareCountAggregateOutputType = {
    id: number;
    jobId: number;
    welfareItemId: number;
    note: number;
    _all: number;
};
export type JobWelfareAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    welfareItemId?: true;
};
export type JobWelfareSumAggregateInputType = {
    id?: true;
    jobId?: true;
    welfareItemId?: true;
};
export type JobWelfareMinAggregateInputType = {
    id?: true;
    jobId?: true;
    welfareItemId?: true;
    note?: true;
};
export type JobWelfareMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    welfareItemId?: true;
    note?: true;
};
export type JobWelfareCountAggregateInputType = {
    id?: true;
    jobId?: true;
    welfareItemId?: true;
    note?: true;
    _all?: true;
};
export type JobWelfareAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWelfareWhereInput;
    orderBy?: Prisma.JobWelfareOrderByWithRelationInput | Prisma.JobWelfareOrderByWithRelationInput[];
    cursor?: Prisma.JobWelfareWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobWelfareCountAggregateInputType;
    _avg?: JobWelfareAvgAggregateInputType;
    _sum?: JobWelfareSumAggregateInputType;
    _min?: JobWelfareMinAggregateInputType;
    _max?: JobWelfareMaxAggregateInputType;
};
export type GetJobWelfareAggregateType<T extends JobWelfareAggregateArgs> = {
    [P in keyof T & keyof AggregateJobWelfare]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobWelfare[P]> : Prisma.GetScalarType<T[P], AggregateJobWelfare[P]>;
};
export type JobWelfareGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWelfareWhereInput;
    orderBy?: Prisma.JobWelfareOrderByWithAggregationInput | Prisma.JobWelfareOrderByWithAggregationInput[];
    by: Prisma.JobWelfareScalarFieldEnum[] | Prisma.JobWelfareScalarFieldEnum;
    having?: Prisma.JobWelfareScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobWelfareCountAggregateInputType | true;
    _avg?: JobWelfareAvgAggregateInputType;
    _sum?: JobWelfareSumAggregateInputType;
    _min?: JobWelfareMinAggregateInputType;
    _max?: JobWelfareMaxAggregateInputType;
};
export type JobWelfareGroupByOutputType = {
    id: bigint;
    jobId: bigint;
    welfareItemId: bigint;
    note: string | null;
    _count: JobWelfareCountAggregateOutputType | null;
    _avg: JobWelfareAvgAggregateOutputType | null;
    _sum: JobWelfareSumAggregateOutputType | null;
    _min: JobWelfareMinAggregateOutputType | null;
    _max: JobWelfareMaxAggregateOutputType | null;
};
export type GetJobWelfareGroupByPayload<T extends JobWelfareGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobWelfareGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobWelfareGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobWelfareGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobWelfareGroupByOutputType[P]>;
}>>;
export type JobWelfareWhereInput = {
    AND?: Prisma.JobWelfareWhereInput | Prisma.JobWelfareWhereInput[];
    OR?: Prisma.JobWelfareWhereInput[];
    NOT?: Prisma.JobWelfareWhereInput | Prisma.JobWelfareWhereInput[];
    id?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    jobId?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    welfareItemId?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    note?: Prisma.StringNullableFilter<"JobWelfare"> | string | null;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    welfareItem?: Prisma.XOR<Prisma.WelfareItemScalarRelationFilter, Prisma.WelfareItemWhereInput>;
};
export type JobWelfareOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    welfareItemId?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    welfareItem?: Prisma.WelfareItemOrderByWithRelationInput;
    _relevance?: Prisma.JobWelfareOrderByRelevanceInput;
};
export type JobWelfareWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    jobId_welfareItemId?: Prisma.JobWelfareJobIdWelfareItemIdCompoundUniqueInput;
    AND?: Prisma.JobWelfareWhereInput | Prisma.JobWelfareWhereInput[];
    OR?: Prisma.JobWelfareWhereInput[];
    NOT?: Prisma.JobWelfareWhereInput | Prisma.JobWelfareWhereInput[];
    jobId?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    welfareItemId?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    note?: Prisma.StringNullableFilter<"JobWelfare"> | string | null;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    welfareItem?: Prisma.XOR<Prisma.WelfareItemScalarRelationFilter, Prisma.WelfareItemWhereInput>;
}, "id" | "jobId_welfareItemId">;
export type JobWelfareOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    welfareItemId?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.JobWelfareCountOrderByAggregateInput;
    _avg?: Prisma.JobWelfareAvgOrderByAggregateInput;
    _max?: Prisma.JobWelfareMaxOrderByAggregateInput;
    _min?: Prisma.JobWelfareMinOrderByAggregateInput;
    _sum?: Prisma.JobWelfareSumOrderByAggregateInput;
};
export type JobWelfareScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobWelfareScalarWhereWithAggregatesInput | Prisma.JobWelfareScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobWelfareScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobWelfareScalarWhereWithAggregatesInput | Prisma.JobWelfareScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"JobWelfare"> | bigint | number;
    jobId?: Prisma.BigIntWithAggregatesFilter<"JobWelfare"> | bigint | number;
    welfareItemId?: Prisma.BigIntWithAggregatesFilter<"JobWelfare"> | bigint | number;
    note?: Prisma.StringNullableWithAggregatesFilter<"JobWelfare"> | string | null;
};
export type JobWelfareCreateInput = {
    id?: bigint | number;
    note?: string | null;
    job: Prisma.JobCreateNestedOneWithoutWelfareInput;
    welfareItem: Prisma.WelfareItemCreateNestedOneWithoutJobWelfareInput;
};
export type JobWelfareUncheckedCreateInput = {
    id?: bigint | number;
    jobId: bigint | number;
    welfareItemId: bigint | number;
    note?: string | null;
};
export type JobWelfareUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    job?: Prisma.JobUpdateOneRequiredWithoutWelfareNestedInput;
    welfareItem?: Prisma.WelfareItemUpdateOneRequiredWithoutJobWelfareNestedInput;
};
export type JobWelfareUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    welfareItemId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JobWelfareCreateManyInput = {
    id?: bigint | number;
    jobId: bigint | number;
    welfareItemId: bigint | number;
    note?: string | null;
};
export type JobWelfareUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JobWelfareUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    welfareItemId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JobWelfareListRelationFilter = {
    every?: Prisma.JobWelfareWhereInput;
    some?: Prisma.JobWelfareWhereInput;
    none?: Prisma.JobWelfareWhereInput;
};
export type JobWelfareOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobWelfareOrderByRelevanceInput = {
    fields: Prisma.JobWelfareOrderByRelevanceFieldEnum | Prisma.JobWelfareOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type JobWelfareJobIdWelfareItemIdCompoundUniqueInput = {
    jobId: bigint | number;
    welfareItemId: bigint | number;
};
export type JobWelfareCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    welfareItemId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
};
export type JobWelfareAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    welfareItemId?: Prisma.SortOrder;
};
export type JobWelfareMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    welfareItemId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
};
export type JobWelfareMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    welfareItemId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
};
export type JobWelfareSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    welfareItemId?: Prisma.SortOrder;
};
export type JobWelfareCreateNestedManyWithoutWelfareItemInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput> | Prisma.JobWelfareCreateWithoutWelfareItemInput[] | Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput | Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput[];
    createMany?: Prisma.JobWelfareCreateManyWelfareItemInputEnvelope;
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
};
export type JobWelfareUncheckedCreateNestedManyWithoutWelfareItemInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput> | Prisma.JobWelfareCreateWithoutWelfareItemInput[] | Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput | Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput[];
    createMany?: Prisma.JobWelfareCreateManyWelfareItemInputEnvelope;
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
};
export type JobWelfareUpdateManyWithoutWelfareItemNestedInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput> | Prisma.JobWelfareCreateWithoutWelfareItemInput[] | Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput | Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput[];
    upsert?: Prisma.JobWelfareUpsertWithWhereUniqueWithoutWelfareItemInput | Prisma.JobWelfareUpsertWithWhereUniqueWithoutWelfareItemInput[];
    createMany?: Prisma.JobWelfareCreateManyWelfareItemInputEnvelope;
    set?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    disconnect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    delete?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    update?: Prisma.JobWelfareUpdateWithWhereUniqueWithoutWelfareItemInput | Prisma.JobWelfareUpdateWithWhereUniqueWithoutWelfareItemInput[];
    updateMany?: Prisma.JobWelfareUpdateManyWithWhereWithoutWelfareItemInput | Prisma.JobWelfareUpdateManyWithWhereWithoutWelfareItemInput[];
    deleteMany?: Prisma.JobWelfareScalarWhereInput | Prisma.JobWelfareScalarWhereInput[];
};
export type JobWelfareUncheckedUpdateManyWithoutWelfareItemNestedInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput> | Prisma.JobWelfareCreateWithoutWelfareItemInput[] | Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput | Prisma.JobWelfareCreateOrConnectWithoutWelfareItemInput[];
    upsert?: Prisma.JobWelfareUpsertWithWhereUniqueWithoutWelfareItemInput | Prisma.JobWelfareUpsertWithWhereUniqueWithoutWelfareItemInput[];
    createMany?: Prisma.JobWelfareCreateManyWelfareItemInputEnvelope;
    set?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    disconnect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    delete?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    update?: Prisma.JobWelfareUpdateWithWhereUniqueWithoutWelfareItemInput | Prisma.JobWelfareUpdateWithWhereUniqueWithoutWelfareItemInput[];
    updateMany?: Prisma.JobWelfareUpdateManyWithWhereWithoutWelfareItemInput | Prisma.JobWelfareUpdateManyWithWhereWithoutWelfareItemInput[];
    deleteMany?: Prisma.JobWelfareScalarWhereInput | Prisma.JobWelfareScalarWhereInput[];
};
export type JobWelfareCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutJobInput, Prisma.JobWelfareUncheckedCreateWithoutJobInput> | Prisma.JobWelfareCreateWithoutJobInput[] | Prisma.JobWelfareUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutJobInput | Prisma.JobWelfareCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobWelfareCreateManyJobInputEnvelope;
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
};
export type JobWelfareUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutJobInput, Prisma.JobWelfareUncheckedCreateWithoutJobInput> | Prisma.JobWelfareCreateWithoutJobInput[] | Prisma.JobWelfareUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutJobInput | Prisma.JobWelfareCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobWelfareCreateManyJobInputEnvelope;
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
};
export type JobWelfareUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutJobInput, Prisma.JobWelfareUncheckedCreateWithoutJobInput> | Prisma.JobWelfareCreateWithoutJobInput[] | Prisma.JobWelfareUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutJobInput | Prisma.JobWelfareCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobWelfareUpsertWithWhereUniqueWithoutJobInput | Prisma.JobWelfareUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobWelfareCreateManyJobInputEnvelope;
    set?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    disconnect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    delete?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    update?: Prisma.JobWelfareUpdateWithWhereUniqueWithoutJobInput | Prisma.JobWelfareUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobWelfareUpdateManyWithWhereWithoutJobInput | Prisma.JobWelfareUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobWelfareScalarWhereInput | Prisma.JobWelfareScalarWhereInput[];
};
export type JobWelfareUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobWelfareCreateWithoutJobInput, Prisma.JobWelfareUncheckedCreateWithoutJobInput> | Prisma.JobWelfareCreateWithoutJobInput[] | Prisma.JobWelfareUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWelfareCreateOrConnectWithoutJobInput | Prisma.JobWelfareCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobWelfareUpsertWithWhereUniqueWithoutJobInput | Prisma.JobWelfareUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobWelfareCreateManyJobInputEnvelope;
    set?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    disconnect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    delete?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    connect?: Prisma.JobWelfareWhereUniqueInput | Prisma.JobWelfareWhereUniqueInput[];
    update?: Prisma.JobWelfareUpdateWithWhereUniqueWithoutJobInput | Prisma.JobWelfareUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobWelfareUpdateManyWithWhereWithoutJobInput | Prisma.JobWelfareUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobWelfareScalarWhereInput | Prisma.JobWelfareScalarWhereInput[];
};
export type JobWelfareCreateWithoutWelfareItemInput = {
    id?: bigint | number;
    note?: string | null;
    job: Prisma.JobCreateNestedOneWithoutWelfareInput;
};
export type JobWelfareUncheckedCreateWithoutWelfareItemInput = {
    id?: bigint | number;
    jobId: bigint | number;
    note?: string | null;
};
export type JobWelfareCreateOrConnectWithoutWelfareItemInput = {
    where: Prisma.JobWelfareWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobWelfareCreateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput>;
};
export type JobWelfareCreateManyWelfareItemInputEnvelope = {
    data: Prisma.JobWelfareCreateManyWelfareItemInput | Prisma.JobWelfareCreateManyWelfareItemInput[];
    skipDuplicates?: boolean;
};
export type JobWelfareUpsertWithWhereUniqueWithoutWelfareItemInput = {
    where: Prisma.JobWelfareWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobWelfareUpdateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedUpdateWithoutWelfareItemInput>;
    create: Prisma.XOR<Prisma.JobWelfareCreateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedCreateWithoutWelfareItemInput>;
};
export type JobWelfareUpdateWithWhereUniqueWithoutWelfareItemInput = {
    where: Prisma.JobWelfareWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobWelfareUpdateWithoutWelfareItemInput, Prisma.JobWelfareUncheckedUpdateWithoutWelfareItemInput>;
};
export type JobWelfareUpdateManyWithWhereWithoutWelfareItemInput = {
    where: Prisma.JobWelfareScalarWhereInput;
    data: Prisma.XOR<Prisma.JobWelfareUpdateManyMutationInput, Prisma.JobWelfareUncheckedUpdateManyWithoutWelfareItemInput>;
};
export type JobWelfareScalarWhereInput = {
    AND?: Prisma.JobWelfareScalarWhereInput | Prisma.JobWelfareScalarWhereInput[];
    OR?: Prisma.JobWelfareScalarWhereInput[];
    NOT?: Prisma.JobWelfareScalarWhereInput | Prisma.JobWelfareScalarWhereInput[];
    id?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    jobId?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    welfareItemId?: Prisma.BigIntFilter<"JobWelfare"> | bigint | number;
    note?: Prisma.StringNullableFilter<"JobWelfare"> | string | null;
};
export type JobWelfareCreateWithoutJobInput = {
    id?: bigint | number;
    note?: string | null;
    welfareItem: Prisma.WelfareItemCreateNestedOneWithoutJobWelfareInput;
};
export type JobWelfareUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    welfareItemId: bigint | number;
    note?: string | null;
};
export type JobWelfareCreateOrConnectWithoutJobInput = {
    where: Prisma.JobWelfareWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobWelfareCreateWithoutJobInput, Prisma.JobWelfareUncheckedCreateWithoutJobInput>;
};
export type JobWelfareCreateManyJobInputEnvelope = {
    data: Prisma.JobWelfareCreateManyJobInput | Prisma.JobWelfareCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type JobWelfareUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobWelfareWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobWelfareUpdateWithoutJobInput, Prisma.JobWelfareUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.JobWelfareCreateWithoutJobInput, Prisma.JobWelfareUncheckedCreateWithoutJobInput>;
};
export type JobWelfareUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobWelfareWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobWelfareUpdateWithoutJobInput, Prisma.JobWelfareUncheckedUpdateWithoutJobInput>;
};
export type JobWelfareUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.JobWelfareScalarWhereInput;
    data: Prisma.XOR<Prisma.JobWelfareUpdateManyMutationInput, Prisma.JobWelfareUncheckedUpdateManyWithoutJobInput>;
};
export type JobWelfareCreateManyWelfareItemInput = {
    id?: bigint | number;
    jobId: bigint | number;
    note?: string | null;
};
export type JobWelfareUpdateWithoutWelfareItemInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    job?: Prisma.JobUpdateOneRequiredWithoutWelfareNestedInput;
};
export type JobWelfareUncheckedUpdateWithoutWelfareItemInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JobWelfareUncheckedUpdateManyWithoutWelfareItemInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JobWelfareCreateManyJobInput = {
    id?: bigint | number;
    welfareItemId: bigint | number;
    note?: string | null;
};
export type JobWelfareUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    welfareItem?: Prisma.WelfareItemUpdateOneRequiredWithoutJobWelfareNestedInput;
};
export type JobWelfareUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    welfareItemId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JobWelfareUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    welfareItemId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JobWelfareSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    welfareItemId?: boolean;
    note?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    welfareItem?: boolean | Prisma.WelfareItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobWelfare"]>;
export type JobWelfareSelectScalar = {
    id?: boolean;
    jobId?: boolean;
    welfareItemId?: boolean;
    note?: boolean;
};
export type JobWelfareOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "welfareItemId" | "note", ExtArgs["result"]["jobWelfare"]>;
export type JobWelfareInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    welfareItem?: boolean | Prisma.WelfareItemDefaultArgs<ExtArgs>;
};
export type $JobWelfarePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobWelfare";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        welfareItem: Prisma.$WelfareItemPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        jobId: bigint;
        welfareItemId: bigint;
        note: string | null;
    }, ExtArgs["result"]["jobWelfare"]>;
    composites: {};
};
export type JobWelfareGetPayload<S extends boolean | null | undefined | JobWelfareDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload, S>;
export type JobWelfareCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobWelfareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobWelfareCountAggregateInputType | true;
};
export interface JobWelfareDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobWelfare'];
        meta: {
            name: 'JobWelfare';
        };
    };
    findUnique<T extends JobWelfareFindUniqueArgs>(args: Prisma.SelectSubset<T, JobWelfareFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobWelfareFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobWelfareFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobWelfareFindFirstArgs>(args?: Prisma.SelectSubset<T, JobWelfareFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobWelfareFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobWelfareFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobWelfareFindManyArgs>(args?: Prisma.SelectSubset<T, JobWelfareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobWelfareCreateArgs>(args: Prisma.SelectSubset<T, JobWelfareCreateArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobWelfareCreateManyArgs>(args?: Prisma.SelectSubset<T, JobWelfareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends JobWelfareDeleteArgs>(args: Prisma.SelectSubset<T, JobWelfareDeleteArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobWelfareUpdateArgs>(args: Prisma.SelectSubset<T, JobWelfareUpdateArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobWelfareDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobWelfareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobWelfareUpdateManyArgs>(args: Prisma.SelectSubset<T, JobWelfareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends JobWelfareUpsertArgs>(args: Prisma.SelectSubset<T, JobWelfareUpsertArgs<ExtArgs>>): Prisma.Prisma__JobWelfareClient<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobWelfareCountArgs>(args?: Prisma.Subset<T, JobWelfareCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobWelfareCountAggregateOutputType> : number>;
    aggregate<T extends JobWelfareAggregateArgs>(args: Prisma.Subset<T, JobWelfareAggregateArgs>): Prisma.PrismaPromise<GetJobWelfareAggregateType<T>>;
    groupBy<T extends JobWelfareGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobWelfareGroupByArgs['orderBy'];
    } : {
        orderBy?: JobWelfareGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobWelfareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobWelfareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobWelfareFieldRefs;
}
export interface Prisma__JobWelfareClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    welfareItem<T extends Prisma.WelfareItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WelfareItemDefaultArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobWelfareFieldRefs {
    readonly id: Prisma.FieldRef<"JobWelfare", 'BigInt'>;
    readonly jobId: Prisma.FieldRef<"JobWelfare", 'BigInt'>;
    readonly welfareItemId: Prisma.FieldRef<"JobWelfare", 'BigInt'>;
    readonly note: Prisma.FieldRef<"JobWelfare", 'String'>;
}
export type JobWelfareFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where: Prisma.JobWelfareWhereUniqueInput;
};
export type JobWelfareFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where: Prisma.JobWelfareWhereUniqueInput;
};
export type JobWelfareFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where?: Prisma.JobWelfareWhereInput;
    orderBy?: Prisma.JobWelfareOrderByWithRelationInput | Prisma.JobWelfareOrderByWithRelationInput[];
    cursor?: Prisma.JobWelfareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobWelfareScalarFieldEnum | Prisma.JobWelfareScalarFieldEnum[];
};
export type JobWelfareFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where?: Prisma.JobWelfareWhereInput;
    orderBy?: Prisma.JobWelfareOrderByWithRelationInput | Prisma.JobWelfareOrderByWithRelationInput[];
    cursor?: Prisma.JobWelfareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobWelfareScalarFieldEnum | Prisma.JobWelfareScalarFieldEnum[];
};
export type JobWelfareFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where?: Prisma.JobWelfareWhereInput;
    orderBy?: Prisma.JobWelfareOrderByWithRelationInput | Prisma.JobWelfareOrderByWithRelationInput[];
    cursor?: Prisma.JobWelfareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobWelfareScalarFieldEnum | Prisma.JobWelfareScalarFieldEnum[];
};
export type JobWelfareCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobWelfareCreateInput, Prisma.JobWelfareUncheckedCreateInput>;
};
export type JobWelfareCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobWelfareCreateManyInput | Prisma.JobWelfareCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobWelfareUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobWelfareUpdateInput, Prisma.JobWelfareUncheckedUpdateInput>;
    where: Prisma.JobWelfareWhereUniqueInput;
};
export type JobWelfareUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobWelfareUpdateManyMutationInput, Prisma.JobWelfareUncheckedUpdateManyInput>;
    where?: Prisma.JobWelfareWhereInput;
    limit?: number;
};
export type JobWelfareUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where: Prisma.JobWelfareWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobWelfareCreateInput, Prisma.JobWelfareUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobWelfareUpdateInput, Prisma.JobWelfareUncheckedUpdateInput>;
};
export type JobWelfareDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where: Prisma.JobWelfareWhereUniqueInput;
};
export type JobWelfareDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWelfareWhereInput;
    limit?: number;
};
export type JobWelfareDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
};
