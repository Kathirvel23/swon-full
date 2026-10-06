import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type JobStaffAssignmentModel = runtime.Types.Result.DefaultSelection<Prisma.$JobStaffAssignmentPayload>;
export type AggregateJobStaffAssignment = {
    _count: JobStaffAssignmentCountAggregateOutputType | null;
    _avg: JobStaffAssignmentAvgAggregateOutputType | null;
    _sum: JobStaffAssignmentSumAggregateOutputType | null;
    _min: JobStaffAssignmentMinAggregateOutputType | null;
    _max: JobStaffAssignmentMaxAggregateOutputType | null;
};
export type JobStaffAssignmentAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    workerProfileId: number | null;
    assignedByAccountId: number | null;
    incentivePct: runtime.Decimal | null;
};
export type JobStaffAssignmentSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    assignedByAccountId: bigint | null;
    incentivePct: runtime.Decimal | null;
};
export type JobStaffAssignmentMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    role: string | null;
    status: string | null;
    assignedByAccountId: bigint | null;
    incentivePct: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type JobStaffAssignmentMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    role: string | null;
    status: string | null;
    assignedByAccountId: bigint | null;
    incentivePct: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type JobStaffAssignmentCountAggregateOutputType = {
    id: number;
    publicId: number;
    jobId: number;
    workerProfileId: number;
    role: number;
    status: number;
    assignedByAccountId: number;
    incentivePct: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type JobStaffAssignmentAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    assignedByAccountId?: true;
    incentivePct?: true;
};
export type JobStaffAssignmentSumAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    assignedByAccountId?: true;
    incentivePct?: true;
};
export type JobStaffAssignmentMinAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    role?: true;
    status?: true;
    assignedByAccountId?: true;
    incentivePct?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type JobStaffAssignmentMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    role?: true;
    status?: true;
    assignedByAccountId?: true;
    incentivePct?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type JobStaffAssignmentCountAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    role?: true;
    status?: true;
    assignedByAccountId?: true;
    incentivePct?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type JobStaffAssignmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobStaffAssignmentWhereInput;
    orderBy?: Prisma.JobStaffAssignmentOrderByWithRelationInput | Prisma.JobStaffAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.JobStaffAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobStaffAssignmentCountAggregateInputType;
    _avg?: JobStaffAssignmentAvgAggregateInputType;
    _sum?: JobStaffAssignmentSumAggregateInputType;
    _min?: JobStaffAssignmentMinAggregateInputType;
    _max?: JobStaffAssignmentMaxAggregateInputType;
};
export type GetJobStaffAssignmentAggregateType<T extends JobStaffAssignmentAggregateArgs> = {
    [P in keyof T & keyof AggregateJobStaffAssignment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobStaffAssignment[P]> : Prisma.GetScalarType<T[P], AggregateJobStaffAssignment[P]>;
};
export type JobStaffAssignmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobStaffAssignmentWhereInput;
    orderBy?: Prisma.JobStaffAssignmentOrderByWithAggregationInput | Prisma.JobStaffAssignmentOrderByWithAggregationInput[];
    by: Prisma.JobStaffAssignmentScalarFieldEnum[] | Prisma.JobStaffAssignmentScalarFieldEnum;
    having?: Prisma.JobStaffAssignmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobStaffAssignmentCountAggregateInputType | true;
    _avg?: JobStaffAssignmentAvgAggregateInputType;
    _sum?: JobStaffAssignmentSumAggregateInputType;
    _min?: JobStaffAssignmentMinAggregateInputType;
    _max?: JobStaffAssignmentMaxAggregateInputType;
};
export type JobStaffAssignmentGroupByOutputType = {
    id: bigint;
    publicId: string;
    jobId: bigint;
    workerProfileId: bigint;
    role: string;
    status: string;
    assignedByAccountId: bigint | null;
    incentivePct: runtime.Decimal | null;
    createdAt: Date;
    updatedAt: Date;
    _count: JobStaffAssignmentCountAggregateOutputType | null;
    _avg: JobStaffAssignmentAvgAggregateOutputType | null;
    _sum: JobStaffAssignmentSumAggregateOutputType | null;
    _min: JobStaffAssignmentMinAggregateOutputType | null;
    _max: JobStaffAssignmentMaxAggregateOutputType | null;
};
export type GetJobStaffAssignmentGroupByPayload<T extends JobStaffAssignmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobStaffAssignmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobStaffAssignmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobStaffAssignmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobStaffAssignmentGroupByOutputType[P]>;
}>>;
export type JobStaffAssignmentWhereInput = {
    AND?: Prisma.JobStaffAssignmentWhereInput | Prisma.JobStaffAssignmentWhereInput[];
    OR?: Prisma.JobStaffAssignmentWhereInput[];
    NOT?: Prisma.JobStaffAssignmentWhereInput | Prisma.JobStaffAssignmentWhereInput[];
    id?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    publicId?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    jobId?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    role?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    status?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    assignedByAccountId?: Prisma.BigIntNullableFilter<"JobStaffAssignment"> | bigint | number | null;
    incentivePct?: Prisma.DecimalNullableFilter<"JobStaffAssignment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"JobStaffAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"JobStaffAssignment"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    worker?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
};
export type JobStaffAssignmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    incentivePct?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    worker?: Prisma.WorkerProfileOrderByWithRelationInput;
    _relevance?: Prisma.JobStaffAssignmentOrderByRelevanceInput;
};
export type JobStaffAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    jobId_workerProfileId_role?: Prisma.JobStaffAssignmentJobIdWorkerProfileIdRoleCompoundUniqueInput;
    AND?: Prisma.JobStaffAssignmentWhereInput | Prisma.JobStaffAssignmentWhereInput[];
    OR?: Prisma.JobStaffAssignmentWhereInput[];
    NOT?: Prisma.JobStaffAssignmentWhereInput | Prisma.JobStaffAssignmentWhereInput[];
    jobId?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    role?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    status?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    assignedByAccountId?: Prisma.BigIntNullableFilter<"JobStaffAssignment"> | bigint | number | null;
    incentivePct?: Prisma.DecimalNullableFilter<"JobStaffAssignment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"JobStaffAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"JobStaffAssignment"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    worker?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
}, "id" | "publicId" | "jobId_workerProfileId_role">;
export type JobStaffAssignmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    incentivePct?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.JobStaffAssignmentCountOrderByAggregateInput;
    _avg?: Prisma.JobStaffAssignmentAvgOrderByAggregateInput;
    _max?: Prisma.JobStaffAssignmentMaxOrderByAggregateInput;
    _min?: Prisma.JobStaffAssignmentMinOrderByAggregateInput;
    _sum?: Prisma.JobStaffAssignmentSumOrderByAggregateInput;
};
export type JobStaffAssignmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobStaffAssignmentScalarWhereWithAggregatesInput | Prisma.JobStaffAssignmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobStaffAssignmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobStaffAssignmentScalarWhereWithAggregatesInput | Prisma.JobStaffAssignmentScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"JobStaffAssignment"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"JobStaffAssignment"> | string;
    jobId?: Prisma.BigIntWithAggregatesFilter<"JobStaffAssignment"> | bigint | number;
    workerProfileId?: Prisma.BigIntWithAggregatesFilter<"JobStaffAssignment"> | bigint | number;
    role?: Prisma.StringWithAggregatesFilter<"JobStaffAssignment"> | string;
    status?: Prisma.StringWithAggregatesFilter<"JobStaffAssignment"> | string;
    assignedByAccountId?: Prisma.BigIntNullableWithAggregatesFilter<"JobStaffAssignment"> | bigint | number | null;
    incentivePct?: Prisma.DecimalNullableWithAggregatesFilter<"JobStaffAssignment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"JobStaffAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"JobStaffAssignment"> | Date | string;
};
export type JobStaffAssignmentCreateInput = {
    id?: bigint | number;
    publicId?: string;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutStaffAssignmentsInput;
    worker: Prisma.WorkerProfileCreateNestedOneWithoutStaffAssignmentsInput;
};
export type JobStaffAssignmentUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobStaffAssignmentUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutStaffAssignmentsNestedInput;
    worker?: Prisma.WorkerProfileUpdateOneRequiredWithoutStaffAssignmentsNestedInput;
};
export type JobStaffAssignmentUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobStaffAssignmentCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobStaffAssignmentUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobStaffAssignmentUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobStaffAssignmentListRelationFilter = {
    every?: Prisma.JobStaffAssignmentWhereInput;
    some?: Prisma.JobStaffAssignmentWhereInput;
    none?: Prisma.JobStaffAssignmentWhereInput;
};
export type JobStaffAssignmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobStaffAssignmentOrderByRelevanceInput = {
    fields: Prisma.JobStaffAssignmentOrderByRelevanceFieldEnum | Prisma.JobStaffAssignmentOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type JobStaffAssignmentJobIdWorkerProfileIdRoleCompoundUniqueInput = {
    jobId: bigint | number;
    workerProfileId: bigint | number;
    role: string;
};
export type JobStaffAssignmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedByAccountId?: Prisma.SortOrder;
    incentivePct?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JobStaffAssignmentAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    assignedByAccountId?: Prisma.SortOrder;
    incentivePct?: Prisma.SortOrder;
};
export type JobStaffAssignmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedByAccountId?: Prisma.SortOrder;
    incentivePct?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JobStaffAssignmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedByAccountId?: Prisma.SortOrder;
    incentivePct?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JobStaffAssignmentSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    assignedByAccountId?: Prisma.SortOrder;
    incentivePct?: Prisma.SortOrder;
};
export type JobStaffAssignmentCreateNestedManyWithoutWorkerInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput> | Prisma.JobStaffAssignmentCreateWithoutWorkerInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyWorkerInputEnvelope;
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
};
export type JobStaffAssignmentUncheckedCreateNestedManyWithoutWorkerInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput> | Prisma.JobStaffAssignmentCreateWithoutWorkerInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyWorkerInputEnvelope;
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
};
export type JobStaffAssignmentUpdateManyWithoutWorkerNestedInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput> | Prisma.JobStaffAssignmentCreateWithoutWorkerInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput[];
    upsert?: Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutWorkerInput | Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutWorkerInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyWorkerInputEnvelope;
    set?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    disconnect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    delete?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    update?: Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutWorkerInput | Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutWorkerInput[];
    updateMany?: Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutWorkerInput | Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutWorkerInput[];
    deleteMany?: Prisma.JobStaffAssignmentScalarWhereInput | Prisma.JobStaffAssignmentScalarWhereInput[];
};
export type JobStaffAssignmentUncheckedUpdateManyWithoutWorkerNestedInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput> | Prisma.JobStaffAssignmentCreateWithoutWorkerInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutWorkerInput[];
    upsert?: Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutWorkerInput | Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutWorkerInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyWorkerInputEnvelope;
    set?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    disconnect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    delete?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    update?: Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutWorkerInput | Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutWorkerInput[];
    updateMany?: Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutWorkerInput | Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutWorkerInput[];
    deleteMany?: Prisma.JobStaffAssignmentScalarWhereInput | Prisma.JobStaffAssignmentScalarWhereInput[];
};
export type JobStaffAssignmentCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput> | Prisma.JobStaffAssignmentCreateWithoutJobInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyJobInputEnvelope;
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
};
export type JobStaffAssignmentUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput> | Prisma.JobStaffAssignmentCreateWithoutJobInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyJobInputEnvelope;
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
};
export type JobStaffAssignmentUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput> | Prisma.JobStaffAssignmentCreateWithoutJobInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutJobInput | Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyJobInputEnvelope;
    set?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    disconnect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    delete?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    update?: Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutJobInput | Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutJobInput | Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobStaffAssignmentScalarWhereInput | Prisma.JobStaffAssignmentScalarWhereInput[];
};
export type JobStaffAssignmentUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput> | Prisma.JobStaffAssignmentCreateWithoutJobInput[] | Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput | Prisma.JobStaffAssignmentCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutJobInput | Prisma.JobStaffAssignmentUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobStaffAssignmentCreateManyJobInputEnvelope;
    set?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    disconnect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    delete?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    connect?: Prisma.JobStaffAssignmentWhereUniqueInput | Prisma.JobStaffAssignmentWhereUniqueInput[];
    update?: Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutJobInput | Prisma.JobStaffAssignmentUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutJobInput | Prisma.JobStaffAssignmentUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobStaffAssignmentScalarWhereInput | Prisma.JobStaffAssignmentScalarWhereInput[];
};
export type JobStaffAssignmentCreateWithoutWorkerInput = {
    id?: bigint | number;
    publicId?: string;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutStaffAssignmentsInput;
};
export type JobStaffAssignmentUncheckedCreateWithoutWorkerInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobStaffAssignmentCreateOrConnectWithoutWorkerInput = {
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput>;
};
export type JobStaffAssignmentCreateManyWorkerInputEnvelope = {
    data: Prisma.JobStaffAssignmentCreateManyWorkerInput | Prisma.JobStaffAssignmentCreateManyWorkerInput[];
    skipDuplicates?: boolean;
};
export type JobStaffAssignmentUpsertWithWhereUniqueWithoutWorkerInput = {
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobStaffAssignmentUpdateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedUpdateWithoutWorkerInput>;
    create: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutWorkerInput>;
};
export type JobStaffAssignmentUpdateWithWhereUniqueWithoutWorkerInput = {
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobStaffAssignmentUpdateWithoutWorkerInput, Prisma.JobStaffAssignmentUncheckedUpdateWithoutWorkerInput>;
};
export type JobStaffAssignmentUpdateManyWithWhereWithoutWorkerInput = {
    where: Prisma.JobStaffAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.JobStaffAssignmentUpdateManyMutationInput, Prisma.JobStaffAssignmentUncheckedUpdateManyWithoutWorkerInput>;
};
export type JobStaffAssignmentScalarWhereInput = {
    AND?: Prisma.JobStaffAssignmentScalarWhereInput | Prisma.JobStaffAssignmentScalarWhereInput[];
    OR?: Prisma.JobStaffAssignmentScalarWhereInput[];
    NOT?: Prisma.JobStaffAssignmentScalarWhereInput | Prisma.JobStaffAssignmentScalarWhereInput[];
    id?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    publicId?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    jobId?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"JobStaffAssignment"> | bigint | number;
    role?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    status?: Prisma.StringFilter<"JobStaffAssignment"> | string;
    assignedByAccountId?: Prisma.BigIntNullableFilter<"JobStaffAssignment"> | bigint | number | null;
    incentivePct?: Prisma.DecimalNullableFilter<"JobStaffAssignment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"JobStaffAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"JobStaffAssignment"> | Date | string;
};
export type JobStaffAssignmentCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    worker: Prisma.WorkerProfileCreateNestedOneWithoutStaffAssignmentsInput;
};
export type JobStaffAssignmentUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobStaffAssignmentCreateOrConnectWithoutJobInput = {
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput>;
};
export type JobStaffAssignmentCreateManyJobInputEnvelope = {
    data: Prisma.JobStaffAssignmentCreateManyJobInput | Prisma.JobStaffAssignmentCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type JobStaffAssignmentUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobStaffAssignmentUpdateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.JobStaffAssignmentCreateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedCreateWithoutJobInput>;
};
export type JobStaffAssignmentUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobStaffAssignmentUpdateWithoutJobInput, Prisma.JobStaffAssignmentUncheckedUpdateWithoutJobInput>;
};
export type JobStaffAssignmentUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.JobStaffAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.JobStaffAssignmentUpdateManyMutationInput, Prisma.JobStaffAssignmentUncheckedUpdateManyWithoutJobInput>;
};
export type JobStaffAssignmentCreateManyWorkerInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobStaffAssignmentUpdateWithoutWorkerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutStaffAssignmentsNestedInput;
};
export type JobStaffAssignmentUncheckedUpdateWithoutWorkerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobStaffAssignmentUncheckedUpdateManyWithoutWorkerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobStaffAssignmentCreateManyJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    role?: string;
    status?: string;
    assignedByAccountId?: bigint | number | null;
    incentivePct?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobStaffAssignmentUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    worker?: Prisma.WorkerProfileUpdateOneRequiredWithoutStaffAssignmentsNestedInput;
};
export type JobStaffAssignmentUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobStaffAssignmentUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    incentivePct?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobStaffAssignmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    role?: boolean;
    status?: boolean;
    assignedByAccountId?: boolean;
    incentivePct?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    worker?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobStaffAssignment"]>;
export type JobStaffAssignmentSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    role?: boolean;
    status?: boolean;
    assignedByAccountId?: boolean;
    incentivePct?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type JobStaffAssignmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "jobId" | "workerProfileId" | "role" | "status" | "assignedByAccountId" | "incentivePct" | "createdAt" | "updatedAt", ExtArgs["result"]["jobStaffAssignment"]>;
export type JobStaffAssignmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    worker?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
};
export type $JobStaffAssignmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobStaffAssignment";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        worker: Prisma.$WorkerProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        jobId: bigint;
        workerProfileId: bigint;
        role: string;
        status: string;
        assignedByAccountId: bigint | null;
        incentivePct: runtime.Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["jobStaffAssignment"]>;
    composites: {};
};
export type JobStaffAssignmentGetPayload<S extends boolean | null | undefined | JobStaffAssignmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload, S>;
export type JobStaffAssignmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobStaffAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobStaffAssignmentCountAggregateInputType | true;
};
export interface JobStaffAssignmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobStaffAssignment'];
        meta: {
            name: 'JobStaffAssignment';
        };
    };
    findUnique<T extends JobStaffAssignmentFindUniqueArgs>(args: Prisma.SelectSubset<T, JobStaffAssignmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobStaffAssignmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobStaffAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobStaffAssignmentFindFirstArgs>(args?: Prisma.SelectSubset<T, JobStaffAssignmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobStaffAssignmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobStaffAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobStaffAssignmentFindManyArgs>(args?: Prisma.SelectSubset<T, JobStaffAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobStaffAssignmentCreateArgs>(args: Prisma.SelectSubset<T, JobStaffAssignmentCreateArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobStaffAssignmentCreateManyArgs>(args?: Prisma.SelectSubset<T, JobStaffAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends JobStaffAssignmentDeleteArgs>(args: Prisma.SelectSubset<T, JobStaffAssignmentDeleteArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobStaffAssignmentUpdateArgs>(args: Prisma.SelectSubset<T, JobStaffAssignmentUpdateArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobStaffAssignmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobStaffAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobStaffAssignmentUpdateManyArgs>(args: Prisma.SelectSubset<T, JobStaffAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends JobStaffAssignmentUpsertArgs>(args: Prisma.SelectSubset<T, JobStaffAssignmentUpsertArgs<ExtArgs>>): Prisma.Prisma__JobStaffAssignmentClient<runtime.Types.Result.GetResult<Prisma.$JobStaffAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobStaffAssignmentCountArgs>(args?: Prisma.Subset<T, JobStaffAssignmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobStaffAssignmentCountAggregateOutputType> : number>;
    aggregate<T extends JobStaffAssignmentAggregateArgs>(args: Prisma.Subset<T, JobStaffAssignmentAggregateArgs>): Prisma.PrismaPromise<GetJobStaffAssignmentAggregateType<T>>;
    groupBy<T extends JobStaffAssignmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobStaffAssignmentGroupByArgs['orderBy'];
    } : {
        orderBy?: JobStaffAssignmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobStaffAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobStaffAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobStaffAssignmentFieldRefs;
}
export interface Prisma__JobStaffAssignmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    worker<T extends Prisma.WorkerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkerProfileClient<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobStaffAssignmentFieldRefs {
    readonly id: Prisma.FieldRef<"JobStaffAssignment", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"JobStaffAssignment", 'String'>;
    readonly jobId: Prisma.FieldRef<"JobStaffAssignment", 'BigInt'>;
    readonly workerProfileId: Prisma.FieldRef<"JobStaffAssignment", 'BigInt'>;
    readonly role: Prisma.FieldRef<"JobStaffAssignment", 'String'>;
    readonly status: Prisma.FieldRef<"JobStaffAssignment", 'String'>;
    readonly assignedByAccountId: Prisma.FieldRef<"JobStaffAssignment", 'BigInt'>;
    readonly incentivePct: Prisma.FieldRef<"JobStaffAssignment", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"JobStaffAssignment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"JobStaffAssignment", 'DateTime'>;
}
export type JobStaffAssignmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
};
export type JobStaffAssignmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
};
export type JobStaffAssignmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    where?: Prisma.JobStaffAssignmentWhereInput;
    orderBy?: Prisma.JobStaffAssignmentOrderByWithRelationInput | Prisma.JobStaffAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.JobStaffAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobStaffAssignmentScalarFieldEnum | Prisma.JobStaffAssignmentScalarFieldEnum[];
};
export type JobStaffAssignmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    where?: Prisma.JobStaffAssignmentWhereInput;
    orderBy?: Prisma.JobStaffAssignmentOrderByWithRelationInput | Prisma.JobStaffAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.JobStaffAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobStaffAssignmentScalarFieldEnum | Prisma.JobStaffAssignmentScalarFieldEnum[];
};
export type JobStaffAssignmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    where?: Prisma.JobStaffAssignmentWhereInput;
    orderBy?: Prisma.JobStaffAssignmentOrderByWithRelationInput | Prisma.JobStaffAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.JobStaffAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobStaffAssignmentScalarFieldEnum | Prisma.JobStaffAssignmentScalarFieldEnum[];
};
export type JobStaffAssignmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobStaffAssignmentCreateInput, Prisma.JobStaffAssignmentUncheckedCreateInput>;
};
export type JobStaffAssignmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobStaffAssignmentCreateManyInput | Prisma.JobStaffAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobStaffAssignmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobStaffAssignmentUpdateInput, Prisma.JobStaffAssignmentUncheckedUpdateInput>;
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
};
export type JobStaffAssignmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobStaffAssignmentUpdateManyMutationInput, Prisma.JobStaffAssignmentUncheckedUpdateManyInput>;
    where?: Prisma.JobStaffAssignmentWhereInput;
    limit?: number;
};
export type JobStaffAssignmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobStaffAssignmentCreateInput, Prisma.JobStaffAssignmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobStaffAssignmentUpdateInput, Prisma.JobStaffAssignmentUncheckedUpdateInput>;
};
export type JobStaffAssignmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
    where: Prisma.JobStaffAssignmentWhereUniqueInput;
};
export type JobStaffAssignmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobStaffAssignmentWhereInput;
    limit?: number;
};
export type JobStaffAssignmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobStaffAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.JobStaffAssignmentOmit<ExtArgs> | null;
    include?: Prisma.JobStaffAssignmentInclude<ExtArgs> | null;
};
