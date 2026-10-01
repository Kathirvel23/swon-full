import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MatchLogModel = runtime.Types.Result.DefaultSelection<Prisma.$MatchLogPayload>;
export type AggregateMatchLog = {
    _count: MatchLogCountAggregateOutputType | null;
    _avg: MatchLogAvgAggregateOutputType | null;
    _sum: MatchLogSumAggregateOutputType | null;
    _min: MatchLogMinAggregateOutputType | null;
    _max: MatchLogMaxAggregateOutputType | null;
};
export type MatchLogAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    requestedByAccountId: number | null;
    weightsVersion: number | null;
};
export type MatchLogSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    requestedByAccountId: bigint | null;
    weightsVersion: number | null;
};
export type MatchLogMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    requestedByAccountId: bigint | null;
    weightsVersion: number | null;
    createdAt: Date | null;
};
export type MatchLogMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    requestedByAccountId: bigint | null;
    weightsVersion: number | null;
    createdAt: Date | null;
};
export type MatchLogCountAggregateOutputType = {
    id: number;
    publicId: number;
    jobId: number;
    requestedByAccountId: number;
    candidatesJson: number;
    weightsVersion: number;
    createdAt: number;
    _all: number;
};
export type MatchLogAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    requestedByAccountId?: true;
    weightsVersion?: true;
};
export type MatchLogSumAggregateInputType = {
    id?: true;
    jobId?: true;
    requestedByAccountId?: true;
    weightsVersion?: true;
};
export type MatchLogMinAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    requestedByAccountId?: true;
    weightsVersion?: true;
    createdAt?: true;
};
export type MatchLogMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    requestedByAccountId?: true;
    weightsVersion?: true;
    createdAt?: true;
};
export type MatchLogCountAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    requestedByAccountId?: true;
    candidatesJson?: true;
    weightsVersion?: true;
    createdAt?: true;
    _all?: true;
};
export type MatchLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MatchLogWhereInput;
    orderBy?: Prisma.MatchLogOrderByWithRelationInput | Prisma.MatchLogOrderByWithRelationInput[];
    cursor?: Prisma.MatchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MatchLogCountAggregateInputType;
    _avg?: MatchLogAvgAggregateInputType;
    _sum?: MatchLogSumAggregateInputType;
    _min?: MatchLogMinAggregateInputType;
    _max?: MatchLogMaxAggregateInputType;
};
export type GetMatchLogAggregateType<T extends MatchLogAggregateArgs> = {
    [P in keyof T & keyof AggregateMatchLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMatchLog[P]> : Prisma.GetScalarType<T[P], AggregateMatchLog[P]>;
};
export type MatchLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MatchLogWhereInput;
    orderBy?: Prisma.MatchLogOrderByWithAggregationInput | Prisma.MatchLogOrderByWithAggregationInput[];
    by: Prisma.MatchLogScalarFieldEnum[] | Prisma.MatchLogScalarFieldEnum;
    having?: Prisma.MatchLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MatchLogCountAggregateInputType | true;
    _avg?: MatchLogAvgAggregateInputType;
    _sum?: MatchLogSumAggregateInputType;
    _min?: MatchLogMinAggregateInputType;
    _max?: MatchLogMaxAggregateInputType;
};
export type MatchLogGroupByOutputType = {
    id: bigint;
    publicId: string;
    jobId: bigint;
    requestedByAccountId: bigint;
    candidatesJson: runtime.JsonValue;
    weightsVersion: number;
    createdAt: Date;
    _count: MatchLogCountAggregateOutputType | null;
    _avg: MatchLogAvgAggregateOutputType | null;
    _sum: MatchLogSumAggregateOutputType | null;
    _min: MatchLogMinAggregateOutputType | null;
    _max: MatchLogMaxAggregateOutputType | null;
};
export type GetMatchLogGroupByPayload<T extends MatchLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MatchLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MatchLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MatchLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MatchLogGroupByOutputType[P]>;
}>>;
export type MatchLogWhereInput = {
    AND?: Prisma.MatchLogWhereInput | Prisma.MatchLogWhereInput[];
    OR?: Prisma.MatchLogWhereInput[];
    NOT?: Prisma.MatchLogWhereInput | Prisma.MatchLogWhereInput[];
    id?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    publicId?: Prisma.StringFilter<"MatchLog"> | string;
    jobId?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    requestedByAccountId?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    candidatesJson?: Prisma.JsonFilter<"MatchLog">;
    weightsVersion?: Prisma.IntFilter<"MatchLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"MatchLog"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    requester?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type MatchLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    requestedByAccountId?: Prisma.SortOrder;
    candidatesJson?: Prisma.SortOrder;
    weightsVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    requester?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.MatchLogOrderByRelevanceInput;
};
export type MatchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    AND?: Prisma.MatchLogWhereInput | Prisma.MatchLogWhereInput[];
    OR?: Prisma.MatchLogWhereInput[];
    NOT?: Prisma.MatchLogWhereInput | Prisma.MatchLogWhereInput[];
    jobId?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    requestedByAccountId?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    candidatesJson?: Prisma.JsonFilter<"MatchLog">;
    weightsVersion?: Prisma.IntFilter<"MatchLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"MatchLog"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    requester?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "id" | "publicId">;
export type MatchLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    requestedByAccountId?: Prisma.SortOrder;
    candidatesJson?: Prisma.SortOrder;
    weightsVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MatchLogCountOrderByAggregateInput;
    _avg?: Prisma.MatchLogAvgOrderByAggregateInput;
    _max?: Prisma.MatchLogMaxOrderByAggregateInput;
    _min?: Prisma.MatchLogMinOrderByAggregateInput;
    _sum?: Prisma.MatchLogSumOrderByAggregateInput;
};
export type MatchLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.MatchLogScalarWhereWithAggregatesInput | Prisma.MatchLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.MatchLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MatchLogScalarWhereWithAggregatesInput | Prisma.MatchLogScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"MatchLog"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"MatchLog"> | string;
    jobId?: Prisma.BigIntWithAggregatesFilter<"MatchLog"> | bigint | number;
    requestedByAccountId?: Prisma.BigIntWithAggregatesFilter<"MatchLog"> | bigint | number;
    candidatesJson?: Prisma.JsonWithAggregatesFilter<"MatchLog">;
    weightsVersion?: Prisma.IntWithAggregatesFilter<"MatchLog"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MatchLog"> | Date | string;
};
export type MatchLogCreateInput = {
    id?: bigint | number;
    publicId?: string;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutMatchLogsInput;
    requester: Prisma.AccountCreateNestedOneWithoutMatchLogsInput;
};
export type MatchLogUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    requestedByAccountId: bigint | number;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
};
export type MatchLogUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutMatchLogsNestedInput;
    requester?: Prisma.AccountUpdateOneRequiredWithoutMatchLogsNestedInput;
};
export type MatchLogUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    requestedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MatchLogCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    requestedByAccountId: bigint | number;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
};
export type MatchLogUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MatchLogUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    requestedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MatchLogListRelationFilter = {
    every?: Prisma.MatchLogWhereInput;
    some?: Prisma.MatchLogWhereInput;
    none?: Prisma.MatchLogWhereInput;
};
export type MatchLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MatchLogOrderByRelevanceInput = {
    fields: Prisma.MatchLogOrderByRelevanceFieldEnum | Prisma.MatchLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type MatchLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    requestedByAccountId?: Prisma.SortOrder;
    candidatesJson?: Prisma.SortOrder;
    weightsVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MatchLogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    requestedByAccountId?: Prisma.SortOrder;
    weightsVersion?: Prisma.SortOrder;
};
export type MatchLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    requestedByAccountId?: Prisma.SortOrder;
    weightsVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MatchLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    requestedByAccountId?: Prisma.SortOrder;
    weightsVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MatchLogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    requestedByAccountId?: Prisma.SortOrder;
    weightsVersion?: Prisma.SortOrder;
};
export type MatchLogCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutRequesterInput, Prisma.MatchLogUncheckedCreateWithoutRequesterInput> | Prisma.MatchLogCreateWithoutRequesterInput[] | Prisma.MatchLogUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutRequesterInput | Prisma.MatchLogCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.MatchLogCreateManyRequesterInputEnvelope;
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
};
export type MatchLogUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutRequesterInput, Prisma.MatchLogUncheckedCreateWithoutRequesterInput> | Prisma.MatchLogCreateWithoutRequesterInput[] | Prisma.MatchLogUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutRequesterInput | Prisma.MatchLogCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.MatchLogCreateManyRequesterInputEnvelope;
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
};
export type MatchLogUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutRequesterInput, Prisma.MatchLogUncheckedCreateWithoutRequesterInput> | Prisma.MatchLogCreateWithoutRequesterInput[] | Prisma.MatchLogUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutRequesterInput | Prisma.MatchLogCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.MatchLogUpsertWithWhereUniqueWithoutRequesterInput | Prisma.MatchLogUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.MatchLogCreateManyRequesterInputEnvelope;
    set?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    disconnect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    delete?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    update?: Prisma.MatchLogUpdateWithWhereUniqueWithoutRequesterInput | Prisma.MatchLogUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.MatchLogUpdateManyWithWhereWithoutRequesterInput | Prisma.MatchLogUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.MatchLogScalarWhereInput | Prisma.MatchLogScalarWhereInput[];
};
export type MatchLogUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutRequesterInput, Prisma.MatchLogUncheckedCreateWithoutRequesterInput> | Prisma.MatchLogCreateWithoutRequesterInput[] | Prisma.MatchLogUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutRequesterInput | Prisma.MatchLogCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.MatchLogUpsertWithWhereUniqueWithoutRequesterInput | Prisma.MatchLogUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.MatchLogCreateManyRequesterInputEnvelope;
    set?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    disconnect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    delete?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    update?: Prisma.MatchLogUpdateWithWhereUniqueWithoutRequesterInput | Prisma.MatchLogUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.MatchLogUpdateManyWithWhereWithoutRequesterInput | Prisma.MatchLogUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.MatchLogScalarWhereInput | Prisma.MatchLogScalarWhereInput[];
};
export type MatchLogCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutJobInput, Prisma.MatchLogUncheckedCreateWithoutJobInput> | Prisma.MatchLogCreateWithoutJobInput[] | Prisma.MatchLogUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutJobInput | Prisma.MatchLogCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.MatchLogCreateManyJobInputEnvelope;
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
};
export type MatchLogUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutJobInput, Prisma.MatchLogUncheckedCreateWithoutJobInput> | Prisma.MatchLogCreateWithoutJobInput[] | Prisma.MatchLogUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutJobInput | Prisma.MatchLogCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.MatchLogCreateManyJobInputEnvelope;
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
};
export type MatchLogUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutJobInput, Prisma.MatchLogUncheckedCreateWithoutJobInput> | Prisma.MatchLogCreateWithoutJobInput[] | Prisma.MatchLogUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutJobInput | Prisma.MatchLogCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.MatchLogUpsertWithWhereUniqueWithoutJobInput | Prisma.MatchLogUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.MatchLogCreateManyJobInputEnvelope;
    set?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    disconnect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    delete?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    update?: Prisma.MatchLogUpdateWithWhereUniqueWithoutJobInput | Prisma.MatchLogUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.MatchLogUpdateManyWithWhereWithoutJobInput | Prisma.MatchLogUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.MatchLogScalarWhereInput | Prisma.MatchLogScalarWhereInput[];
};
export type MatchLogUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.MatchLogCreateWithoutJobInput, Prisma.MatchLogUncheckedCreateWithoutJobInput> | Prisma.MatchLogCreateWithoutJobInput[] | Prisma.MatchLogUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.MatchLogCreateOrConnectWithoutJobInput | Prisma.MatchLogCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.MatchLogUpsertWithWhereUniqueWithoutJobInput | Prisma.MatchLogUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.MatchLogCreateManyJobInputEnvelope;
    set?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    disconnect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    delete?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    connect?: Prisma.MatchLogWhereUniqueInput | Prisma.MatchLogWhereUniqueInput[];
    update?: Prisma.MatchLogUpdateWithWhereUniqueWithoutJobInput | Prisma.MatchLogUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.MatchLogUpdateManyWithWhereWithoutJobInput | Prisma.MatchLogUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.MatchLogScalarWhereInput | Prisma.MatchLogScalarWhereInput[];
};
export type MatchLogCreateWithoutRequesterInput = {
    id?: bigint | number;
    publicId?: string;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutMatchLogsInput;
};
export type MatchLogUncheckedCreateWithoutRequesterInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
};
export type MatchLogCreateOrConnectWithoutRequesterInput = {
    where: Prisma.MatchLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.MatchLogCreateWithoutRequesterInput, Prisma.MatchLogUncheckedCreateWithoutRequesterInput>;
};
export type MatchLogCreateManyRequesterInputEnvelope = {
    data: Prisma.MatchLogCreateManyRequesterInput | Prisma.MatchLogCreateManyRequesterInput[];
    skipDuplicates?: boolean;
};
export type MatchLogUpsertWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.MatchLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.MatchLogUpdateWithoutRequesterInput, Prisma.MatchLogUncheckedUpdateWithoutRequesterInput>;
    create: Prisma.XOR<Prisma.MatchLogCreateWithoutRequesterInput, Prisma.MatchLogUncheckedCreateWithoutRequesterInput>;
};
export type MatchLogUpdateWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.MatchLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.MatchLogUpdateWithoutRequesterInput, Prisma.MatchLogUncheckedUpdateWithoutRequesterInput>;
};
export type MatchLogUpdateManyWithWhereWithoutRequesterInput = {
    where: Prisma.MatchLogScalarWhereInput;
    data: Prisma.XOR<Prisma.MatchLogUpdateManyMutationInput, Prisma.MatchLogUncheckedUpdateManyWithoutRequesterInput>;
};
export type MatchLogScalarWhereInput = {
    AND?: Prisma.MatchLogScalarWhereInput | Prisma.MatchLogScalarWhereInput[];
    OR?: Prisma.MatchLogScalarWhereInput[];
    NOT?: Prisma.MatchLogScalarWhereInput | Prisma.MatchLogScalarWhereInput[];
    id?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    publicId?: Prisma.StringFilter<"MatchLog"> | string;
    jobId?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    requestedByAccountId?: Prisma.BigIntFilter<"MatchLog"> | bigint | number;
    candidatesJson?: Prisma.JsonFilter<"MatchLog">;
    weightsVersion?: Prisma.IntFilter<"MatchLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"MatchLog"> | Date | string;
};
export type MatchLogCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
    requester: Prisma.AccountCreateNestedOneWithoutMatchLogsInput;
};
export type MatchLogUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    requestedByAccountId: bigint | number;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
};
export type MatchLogCreateOrConnectWithoutJobInput = {
    where: Prisma.MatchLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.MatchLogCreateWithoutJobInput, Prisma.MatchLogUncheckedCreateWithoutJobInput>;
};
export type MatchLogCreateManyJobInputEnvelope = {
    data: Prisma.MatchLogCreateManyJobInput | Prisma.MatchLogCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type MatchLogUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.MatchLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.MatchLogUpdateWithoutJobInput, Prisma.MatchLogUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.MatchLogCreateWithoutJobInput, Prisma.MatchLogUncheckedCreateWithoutJobInput>;
};
export type MatchLogUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.MatchLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.MatchLogUpdateWithoutJobInput, Prisma.MatchLogUncheckedUpdateWithoutJobInput>;
};
export type MatchLogUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.MatchLogScalarWhereInput;
    data: Prisma.XOR<Prisma.MatchLogUpdateManyMutationInput, Prisma.MatchLogUncheckedUpdateManyWithoutJobInput>;
};
export type MatchLogCreateManyRequesterInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
};
export type MatchLogUpdateWithoutRequesterInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutMatchLogsNestedInput;
};
export type MatchLogUncheckedUpdateWithoutRequesterInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MatchLogUncheckedUpdateManyWithoutRequesterInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MatchLogCreateManyJobInput = {
    id?: bigint | number;
    publicId?: string;
    requestedByAccountId: bigint | number;
    candidatesJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion: number;
    createdAt?: Date | string;
};
export type MatchLogUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    requester?: Prisma.AccountUpdateOneRequiredWithoutMatchLogsNestedInput;
};
export type MatchLogUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MatchLogUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedByAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    candidatesJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    weightsVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MatchLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    requestedByAccountId?: boolean;
    candidatesJson?: boolean;
    weightsVersion?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["matchLog"]>;
export type MatchLogSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    requestedByAccountId?: boolean;
    candidatesJson?: boolean;
    weightsVersion?: boolean;
    createdAt?: boolean;
};
export type MatchLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "jobId" | "requestedByAccountId" | "candidatesJson" | "weightsVersion" | "createdAt", ExtArgs["result"]["matchLog"]>;
export type MatchLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $MatchLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MatchLog";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        requester: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        jobId: bigint;
        requestedByAccountId: bigint;
        candidatesJson: runtime.JsonValue;
        weightsVersion: number;
        createdAt: Date;
    }, ExtArgs["result"]["matchLog"]>;
    composites: {};
};
export type MatchLogGetPayload<S extends boolean | null | undefined | MatchLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MatchLogPayload, S>;
export type MatchLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MatchLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MatchLogCountAggregateInputType | true;
};
export interface MatchLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MatchLog'];
        meta: {
            name: 'MatchLog';
        };
    };
    findUnique<T extends MatchLogFindUniqueArgs>(args: Prisma.SelectSubset<T, MatchLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MatchLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MatchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MatchLogFindFirstArgs>(args?: Prisma.SelectSubset<T, MatchLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MatchLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MatchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MatchLogFindManyArgs>(args?: Prisma.SelectSubset<T, MatchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MatchLogCreateArgs>(args: Prisma.SelectSubset<T, MatchLogCreateArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MatchLogCreateManyArgs>(args?: Prisma.SelectSubset<T, MatchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends MatchLogDeleteArgs>(args: Prisma.SelectSubset<T, MatchLogDeleteArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MatchLogUpdateArgs>(args: Prisma.SelectSubset<T, MatchLogUpdateArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MatchLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, MatchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MatchLogUpdateManyArgs>(args: Prisma.SelectSubset<T, MatchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends MatchLogUpsertArgs>(args: Prisma.SelectSubset<T, MatchLogUpsertArgs<ExtArgs>>): Prisma.Prisma__MatchLogClient<runtime.Types.Result.GetResult<Prisma.$MatchLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MatchLogCountArgs>(args?: Prisma.Subset<T, MatchLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MatchLogCountAggregateOutputType> : number>;
    aggregate<T extends MatchLogAggregateArgs>(args: Prisma.Subset<T, MatchLogAggregateArgs>): Prisma.PrismaPromise<GetMatchLogAggregateType<T>>;
    groupBy<T extends MatchLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MatchLogGroupByArgs['orderBy'];
    } : {
        orderBy?: MatchLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MatchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MatchLogFieldRefs;
}
export interface Prisma__MatchLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requester<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MatchLogFieldRefs {
    readonly id: Prisma.FieldRef<"MatchLog", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"MatchLog", 'String'>;
    readonly jobId: Prisma.FieldRef<"MatchLog", 'BigInt'>;
    readonly requestedByAccountId: Prisma.FieldRef<"MatchLog", 'BigInt'>;
    readonly candidatesJson: Prisma.FieldRef<"MatchLog", 'Json'>;
    readonly weightsVersion: Prisma.FieldRef<"MatchLog", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"MatchLog", 'DateTime'>;
}
export type MatchLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    where: Prisma.MatchLogWhereUniqueInput;
};
export type MatchLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    where: Prisma.MatchLogWhereUniqueInput;
};
export type MatchLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    where?: Prisma.MatchLogWhereInput;
    orderBy?: Prisma.MatchLogOrderByWithRelationInput | Prisma.MatchLogOrderByWithRelationInput[];
    cursor?: Prisma.MatchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MatchLogScalarFieldEnum | Prisma.MatchLogScalarFieldEnum[];
};
export type MatchLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    where?: Prisma.MatchLogWhereInput;
    orderBy?: Prisma.MatchLogOrderByWithRelationInput | Prisma.MatchLogOrderByWithRelationInput[];
    cursor?: Prisma.MatchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MatchLogScalarFieldEnum | Prisma.MatchLogScalarFieldEnum[];
};
export type MatchLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    where?: Prisma.MatchLogWhereInput;
    orderBy?: Prisma.MatchLogOrderByWithRelationInput | Prisma.MatchLogOrderByWithRelationInput[];
    cursor?: Prisma.MatchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MatchLogScalarFieldEnum | Prisma.MatchLogScalarFieldEnum[];
};
export type MatchLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MatchLogCreateInput, Prisma.MatchLogUncheckedCreateInput>;
};
export type MatchLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MatchLogCreateManyInput | Prisma.MatchLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MatchLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MatchLogUpdateInput, Prisma.MatchLogUncheckedUpdateInput>;
    where: Prisma.MatchLogWhereUniqueInput;
};
export type MatchLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MatchLogUpdateManyMutationInput, Prisma.MatchLogUncheckedUpdateManyInput>;
    where?: Prisma.MatchLogWhereInput;
    limit?: number;
};
export type MatchLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    where: Prisma.MatchLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.MatchLogCreateInput, Prisma.MatchLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MatchLogUpdateInput, Prisma.MatchLogUncheckedUpdateInput>;
};
export type MatchLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
    where: Prisma.MatchLogWhereUniqueInput;
};
export type MatchLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MatchLogWhereInput;
    limit?: number;
};
export type MatchLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MatchLogSelect<ExtArgs> | null;
    omit?: Prisma.MatchLogOmit<ExtArgs> | null;
    include?: Prisma.MatchLogInclude<ExtArgs> | null;
};
