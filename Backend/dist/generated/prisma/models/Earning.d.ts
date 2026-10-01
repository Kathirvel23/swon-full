import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EarningModel = runtime.Types.Result.DefaultSelection<Prisma.$EarningPayload>;
export type AggregateEarning = {
    _count: EarningCountAggregateOutputType | null;
    _avg: EarningAvgAggregateOutputType | null;
    _sum: EarningSumAggregateOutputType | null;
    _min: EarningMinAggregateOutputType | null;
    _max: EarningMaxAggregateOutputType | null;
};
export type EarningAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    workerProfileId: number | null;
    amountPaise: number | null;
    adjustmentPaise: number | null;
    holdComplaintId: number | null;
};
export type EarningSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    amountPaise: bigint | null;
    adjustmentPaise: bigint | null;
    holdComplaintId: bigint | null;
};
export type EarningMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    amountPaise: bigint | null;
    currency: string | null;
    adjustmentPaise: bigint | null;
    adjustmentReason: string | null;
    holdComplaintId: bigint | null;
    approvedAt: Date | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EarningMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    amountPaise: bigint | null;
    currency: string | null;
    adjustmentPaise: bigint | null;
    adjustmentReason: string | null;
    holdComplaintId: bigint | null;
    approvedAt: Date | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EarningCountAggregateOutputType = {
    id: number;
    publicId: number;
    jobId: number;
    workerProfileId: number;
    status: number;
    amountPaise: number;
    currency: number;
    adjustmentPaise: number;
    adjustmentReason: number;
    holdComplaintId: number;
    approvedAt: number;
    paidAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EarningAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    amountPaise?: true;
    adjustmentPaise?: true;
    holdComplaintId?: true;
};
export type EarningSumAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    amountPaise?: true;
    adjustmentPaise?: true;
    holdComplaintId?: true;
};
export type EarningMinAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    amountPaise?: true;
    currency?: true;
    adjustmentPaise?: true;
    adjustmentReason?: true;
    holdComplaintId?: true;
    approvedAt?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EarningMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    amountPaise?: true;
    currency?: true;
    adjustmentPaise?: true;
    adjustmentReason?: true;
    holdComplaintId?: true;
    approvedAt?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EarningCountAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    amountPaise?: true;
    currency?: true;
    adjustmentPaise?: true;
    adjustmentReason?: true;
    holdComplaintId?: true;
    approvedAt?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EarningAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EarningWhereInput;
    orderBy?: Prisma.EarningOrderByWithRelationInput | Prisma.EarningOrderByWithRelationInput[];
    cursor?: Prisma.EarningWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EarningCountAggregateInputType;
    _avg?: EarningAvgAggregateInputType;
    _sum?: EarningSumAggregateInputType;
    _min?: EarningMinAggregateInputType;
    _max?: EarningMaxAggregateInputType;
};
export type GetEarningAggregateType<T extends EarningAggregateArgs> = {
    [P in keyof T & keyof AggregateEarning]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEarning[P]> : Prisma.GetScalarType<T[P], AggregateEarning[P]>;
};
export type EarningGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EarningWhereInput;
    orderBy?: Prisma.EarningOrderByWithAggregationInput | Prisma.EarningOrderByWithAggregationInput[];
    by: Prisma.EarningScalarFieldEnum[] | Prisma.EarningScalarFieldEnum;
    having?: Prisma.EarningScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EarningCountAggregateInputType | true;
    _avg?: EarningAvgAggregateInputType;
    _sum?: EarningSumAggregateInputType;
    _min?: EarningMinAggregateInputType;
    _max?: EarningMaxAggregateInputType;
};
export type EarningGroupByOutputType = {
    id: bigint;
    publicId: string;
    jobId: bigint;
    workerProfileId: bigint;
    status: string;
    amountPaise: bigint;
    currency: string;
    adjustmentPaise: bigint;
    adjustmentReason: string | null;
    holdComplaintId: bigint | null;
    approvedAt: Date | null;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: EarningCountAggregateOutputType | null;
    _avg: EarningAvgAggregateOutputType | null;
    _sum: EarningSumAggregateOutputType | null;
    _min: EarningMinAggregateOutputType | null;
    _max: EarningMaxAggregateOutputType | null;
};
export type GetEarningGroupByPayload<T extends EarningGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EarningGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EarningGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EarningGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EarningGroupByOutputType[P]>;
}>>;
export type EarningWhereInput = {
    AND?: Prisma.EarningWhereInput | Prisma.EarningWhereInput[];
    OR?: Prisma.EarningWhereInput[];
    NOT?: Prisma.EarningWhereInput | Prisma.EarningWhereInput[];
    id?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    publicId?: Prisma.StringFilter<"Earning"> | string;
    jobId?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    status?: Prisma.StringFilter<"Earning"> | string;
    amountPaise?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    currency?: Prisma.StringFilter<"Earning"> | string;
    adjustmentPaise?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    adjustmentReason?: Prisma.StringNullableFilter<"Earning"> | string | null;
    holdComplaintId?: Prisma.BigIntNullableFilter<"Earning"> | bigint | number | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"Earning"> | Date | string | null;
    paidAt?: Prisma.DateTimeNullableFilter<"Earning"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Earning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Earning"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    worker?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    holdComplaint?: Prisma.XOR<Prisma.ComplaintNullableScalarRelationFilter, Prisma.ComplaintWhereInput> | null;
    payments?: Prisma.PaymentEarningListRelationFilter;
};
export type EarningOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    adjustmentPaise?: Prisma.SortOrder;
    adjustmentReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    holdComplaintId?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    worker?: Prisma.WorkerProfileOrderByWithRelationInput;
    holdComplaint?: Prisma.ComplaintOrderByWithRelationInput;
    payments?: Prisma.PaymentEarningOrderByRelationAggregateInput;
    _relevance?: Prisma.EarningOrderByRelevanceInput;
};
export type EarningWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    jobId_workerProfileId?: Prisma.EarningJobIdWorkerProfileIdCompoundUniqueInput;
    AND?: Prisma.EarningWhereInput | Prisma.EarningWhereInput[];
    OR?: Prisma.EarningWhereInput[];
    NOT?: Prisma.EarningWhereInput | Prisma.EarningWhereInput[];
    jobId?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    status?: Prisma.StringFilter<"Earning"> | string;
    amountPaise?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    currency?: Prisma.StringFilter<"Earning"> | string;
    adjustmentPaise?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    adjustmentReason?: Prisma.StringNullableFilter<"Earning"> | string | null;
    holdComplaintId?: Prisma.BigIntNullableFilter<"Earning"> | bigint | number | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"Earning"> | Date | string | null;
    paidAt?: Prisma.DateTimeNullableFilter<"Earning"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Earning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Earning"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    worker?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    holdComplaint?: Prisma.XOR<Prisma.ComplaintNullableScalarRelationFilter, Prisma.ComplaintWhereInput> | null;
    payments?: Prisma.PaymentEarningListRelationFilter;
}, "id" | "publicId" | "jobId_workerProfileId">;
export type EarningOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    adjustmentPaise?: Prisma.SortOrder;
    adjustmentReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    holdComplaintId?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EarningCountOrderByAggregateInput;
    _avg?: Prisma.EarningAvgOrderByAggregateInput;
    _max?: Prisma.EarningMaxOrderByAggregateInput;
    _min?: Prisma.EarningMinOrderByAggregateInput;
    _sum?: Prisma.EarningSumOrderByAggregateInput;
};
export type EarningScalarWhereWithAggregatesInput = {
    AND?: Prisma.EarningScalarWhereWithAggregatesInput | Prisma.EarningScalarWhereWithAggregatesInput[];
    OR?: Prisma.EarningScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EarningScalarWhereWithAggregatesInput | Prisma.EarningScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Earning"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"Earning"> | string;
    jobId?: Prisma.BigIntWithAggregatesFilter<"Earning"> | bigint | number;
    workerProfileId?: Prisma.BigIntWithAggregatesFilter<"Earning"> | bigint | number;
    status?: Prisma.StringWithAggregatesFilter<"Earning"> | string;
    amountPaise?: Prisma.BigIntWithAggregatesFilter<"Earning"> | bigint | number;
    currency?: Prisma.StringWithAggregatesFilter<"Earning"> | string;
    adjustmentPaise?: Prisma.BigIntWithAggregatesFilter<"Earning"> | bigint | number;
    adjustmentReason?: Prisma.StringNullableWithAggregatesFilter<"Earning"> | string | null;
    holdComplaintId?: Prisma.BigIntNullableWithAggregatesFilter<"Earning"> | bigint | number | null;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Earning"> | Date | string | null;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Earning"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Earning"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Earning"> | Date | string;
};
export type EarningCreateInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutEarningsInput;
    worker: Prisma.WorkerProfileCreateNestedOneWithoutEarningsInput;
    holdComplaint?: Prisma.ComplaintCreateNestedOneWithoutHeldEarningsInput;
    payments?: Prisma.PaymentEarningCreateNestedManyWithoutEarningInput;
};
export type EarningUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    holdComplaintId?: bigint | number | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentEarningUncheckedCreateNestedManyWithoutEarningInput;
};
export type EarningUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutEarningsNestedInput;
    worker?: Prisma.WorkerProfileUpdateOneRequiredWithoutEarningsNestedInput;
    holdComplaint?: Prisma.ComplaintUpdateOneWithoutHeldEarningsNestedInput;
    payments?: Prisma.PaymentEarningUpdateManyWithoutEarningNestedInput;
};
export type EarningUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    holdComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentEarningUncheckedUpdateManyWithoutEarningNestedInput;
};
export type EarningCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    holdComplaintId?: bigint | number | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EarningUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EarningUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    holdComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EarningListRelationFilter = {
    every?: Prisma.EarningWhereInput;
    some?: Prisma.EarningWhereInput;
    none?: Prisma.EarningWhereInput;
};
export type EarningOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EarningOrderByRelevanceInput = {
    fields: Prisma.EarningOrderByRelevanceFieldEnum | Prisma.EarningOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type EarningJobIdWorkerProfileIdCompoundUniqueInput = {
    jobId: bigint | number;
    workerProfileId: bigint | number;
};
export type EarningCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    adjustmentPaise?: Prisma.SortOrder;
    adjustmentReason?: Prisma.SortOrder;
    holdComplaintId?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EarningAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    adjustmentPaise?: Prisma.SortOrder;
    holdComplaintId?: Prisma.SortOrder;
};
export type EarningMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    adjustmentPaise?: Prisma.SortOrder;
    adjustmentReason?: Prisma.SortOrder;
    holdComplaintId?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EarningMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    adjustmentPaise?: Prisma.SortOrder;
    adjustmentReason?: Prisma.SortOrder;
    holdComplaintId?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EarningSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    adjustmentPaise?: Prisma.SortOrder;
    holdComplaintId?: Prisma.SortOrder;
};
export type EarningScalarRelationFilter = {
    is?: Prisma.EarningWhereInput;
    isNot?: Prisma.EarningWhereInput;
};
export type EarningCreateNestedManyWithoutWorkerInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutWorkerInput, Prisma.EarningUncheckedCreateWithoutWorkerInput> | Prisma.EarningCreateWithoutWorkerInput[] | Prisma.EarningUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutWorkerInput | Prisma.EarningCreateOrConnectWithoutWorkerInput[];
    createMany?: Prisma.EarningCreateManyWorkerInputEnvelope;
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
};
export type EarningUncheckedCreateNestedManyWithoutWorkerInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutWorkerInput, Prisma.EarningUncheckedCreateWithoutWorkerInput> | Prisma.EarningCreateWithoutWorkerInput[] | Prisma.EarningUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutWorkerInput | Prisma.EarningCreateOrConnectWithoutWorkerInput[];
    createMany?: Prisma.EarningCreateManyWorkerInputEnvelope;
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
};
export type EarningUpdateManyWithoutWorkerNestedInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutWorkerInput, Prisma.EarningUncheckedCreateWithoutWorkerInput> | Prisma.EarningCreateWithoutWorkerInput[] | Prisma.EarningUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutWorkerInput | Prisma.EarningCreateOrConnectWithoutWorkerInput[];
    upsert?: Prisma.EarningUpsertWithWhereUniqueWithoutWorkerInput | Prisma.EarningUpsertWithWhereUniqueWithoutWorkerInput[];
    createMany?: Prisma.EarningCreateManyWorkerInputEnvelope;
    set?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    disconnect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    delete?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    update?: Prisma.EarningUpdateWithWhereUniqueWithoutWorkerInput | Prisma.EarningUpdateWithWhereUniqueWithoutWorkerInput[];
    updateMany?: Prisma.EarningUpdateManyWithWhereWithoutWorkerInput | Prisma.EarningUpdateManyWithWhereWithoutWorkerInput[];
    deleteMany?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
};
export type EarningUncheckedUpdateManyWithoutWorkerNestedInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutWorkerInput, Prisma.EarningUncheckedCreateWithoutWorkerInput> | Prisma.EarningCreateWithoutWorkerInput[] | Prisma.EarningUncheckedCreateWithoutWorkerInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutWorkerInput | Prisma.EarningCreateOrConnectWithoutWorkerInput[];
    upsert?: Prisma.EarningUpsertWithWhereUniqueWithoutWorkerInput | Prisma.EarningUpsertWithWhereUniqueWithoutWorkerInput[];
    createMany?: Prisma.EarningCreateManyWorkerInputEnvelope;
    set?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    disconnect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    delete?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    update?: Prisma.EarningUpdateWithWhereUniqueWithoutWorkerInput | Prisma.EarningUpdateWithWhereUniqueWithoutWorkerInput[];
    updateMany?: Prisma.EarningUpdateManyWithWhereWithoutWorkerInput | Prisma.EarningUpdateManyWithWhereWithoutWorkerInput[];
    deleteMany?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
};
export type EarningCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutJobInput, Prisma.EarningUncheckedCreateWithoutJobInput> | Prisma.EarningCreateWithoutJobInput[] | Prisma.EarningUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutJobInput | Prisma.EarningCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.EarningCreateManyJobInputEnvelope;
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
};
export type EarningUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutJobInput, Prisma.EarningUncheckedCreateWithoutJobInput> | Prisma.EarningCreateWithoutJobInput[] | Prisma.EarningUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutJobInput | Prisma.EarningCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.EarningCreateManyJobInputEnvelope;
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
};
export type EarningUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutJobInput, Prisma.EarningUncheckedCreateWithoutJobInput> | Prisma.EarningCreateWithoutJobInput[] | Prisma.EarningUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutJobInput | Prisma.EarningCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.EarningUpsertWithWhereUniqueWithoutJobInput | Prisma.EarningUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.EarningCreateManyJobInputEnvelope;
    set?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    disconnect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    delete?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    update?: Prisma.EarningUpdateWithWhereUniqueWithoutJobInput | Prisma.EarningUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.EarningUpdateManyWithWhereWithoutJobInput | Prisma.EarningUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
};
export type EarningUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutJobInput, Prisma.EarningUncheckedCreateWithoutJobInput> | Prisma.EarningCreateWithoutJobInput[] | Prisma.EarningUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutJobInput | Prisma.EarningCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.EarningUpsertWithWhereUniqueWithoutJobInput | Prisma.EarningUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.EarningCreateManyJobInputEnvelope;
    set?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    disconnect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    delete?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    update?: Prisma.EarningUpdateWithWhereUniqueWithoutJobInput | Prisma.EarningUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.EarningUpdateManyWithWhereWithoutJobInput | Prisma.EarningUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
};
export type EarningCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutPaymentsInput, Prisma.EarningUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.EarningWhereUniqueInput;
};
export type EarningUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutPaymentsInput, Prisma.EarningUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.EarningUpsertWithoutPaymentsInput;
    connect?: Prisma.EarningWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EarningUpdateToOneWithWhereWithoutPaymentsInput, Prisma.EarningUpdateWithoutPaymentsInput>, Prisma.EarningUncheckedUpdateWithoutPaymentsInput>;
};
export type EarningCreateNestedManyWithoutHoldComplaintInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutHoldComplaintInput, Prisma.EarningUncheckedCreateWithoutHoldComplaintInput> | Prisma.EarningCreateWithoutHoldComplaintInput[] | Prisma.EarningUncheckedCreateWithoutHoldComplaintInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutHoldComplaintInput | Prisma.EarningCreateOrConnectWithoutHoldComplaintInput[];
    createMany?: Prisma.EarningCreateManyHoldComplaintInputEnvelope;
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
};
export type EarningUncheckedCreateNestedManyWithoutHoldComplaintInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutHoldComplaintInput, Prisma.EarningUncheckedCreateWithoutHoldComplaintInput> | Prisma.EarningCreateWithoutHoldComplaintInput[] | Prisma.EarningUncheckedCreateWithoutHoldComplaintInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutHoldComplaintInput | Prisma.EarningCreateOrConnectWithoutHoldComplaintInput[];
    createMany?: Prisma.EarningCreateManyHoldComplaintInputEnvelope;
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
};
export type EarningUpdateManyWithoutHoldComplaintNestedInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutHoldComplaintInput, Prisma.EarningUncheckedCreateWithoutHoldComplaintInput> | Prisma.EarningCreateWithoutHoldComplaintInput[] | Prisma.EarningUncheckedCreateWithoutHoldComplaintInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutHoldComplaintInput | Prisma.EarningCreateOrConnectWithoutHoldComplaintInput[];
    upsert?: Prisma.EarningUpsertWithWhereUniqueWithoutHoldComplaintInput | Prisma.EarningUpsertWithWhereUniqueWithoutHoldComplaintInput[];
    createMany?: Prisma.EarningCreateManyHoldComplaintInputEnvelope;
    set?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    disconnect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    delete?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    update?: Prisma.EarningUpdateWithWhereUniqueWithoutHoldComplaintInput | Prisma.EarningUpdateWithWhereUniqueWithoutHoldComplaintInput[];
    updateMany?: Prisma.EarningUpdateManyWithWhereWithoutHoldComplaintInput | Prisma.EarningUpdateManyWithWhereWithoutHoldComplaintInput[];
    deleteMany?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
};
export type EarningUncheckedUpdateManyWithoutHoldComplaintNestedInput = {
    create?: Prisma.XOR<Prisma.EarningCreateWithoutHoldComplaintInput, Prisma.EarningUncheckedCreateWithoutHoldComplaintInput> | Prisma.EarningCreateWithoutHoldComplaintInput[] | Prisma.EarningUncheckedCreateWithoutHoldComplaintInput[];
    connectOrCreate?: Prisma.EarningCreateOrConnectWithoutHoldComplaintInput | Prisma.EarningCreateOrConnectWithoutHoldComplaintInput[];
    upsert?: Prisma.EarningUpsertWithWhereUniqueWithoutHoldComplaintInput | Prisma.EarningUpsertWithWhereUniqueWithoutHoldComplaintInput[];
    createMany?: Prisma.EarningCreateManyHoldComplaintInputEnvelope;
    set?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    disconnect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    delete?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    connect?: Prisma.EarningWhereUniqueInput | Prisma.EarningWhereUniqueInput[];
    update?: Prisma.EarningUpdateWithWhereUniqueWithoutHoldComplaintInput | Prisma.EarningUpdateWithWhereUniqueWithoutHoldComplaintInput[];
    updateMany?: Prisma.EarningUpdateManyWithWhereWithoutHoldComplaintInput | Prisma.EarningUpdateManyWithWhereWithoutHoldComplaintInput[];
    deleteMany?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
};
export type EarningCreateWithoutWorkerInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutEarningsInput;
    holdComplaint?: Prisma.ComplaintCreateNestedOneWithoutHeldEarningsInput;
    payments?: Prisma.PaymentEarningCreateNestedManyWithoutEarningInput;
};
export type EarningUncheckedCreateWithoutWorkerInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    holdComplaintId?: bigint | number | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentEarningUncheckedCreateNestedManyWithoutEarningInput;
};
export type EarningCreateOrConnectWithoutWorkerInput = {
    where: Prisma.EarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.EarningCreateWithoutWorkerInput, Prisma.EarningUncheckedCreateWithoutWorkerInput>;
};
export type EarningCreateManyWorkerInputEnvelope = {
    data: Prisma.EarningCreateManyWorkerInput | Prisma.EarningCreateManyWorkerInput[];
    skipDuplicates?: boolean;
};
export type EarningUpsertWithWhereUniqueWithoutWorkerInput = {
    where: Prisma.EarningWhereUniqueInput;
    update: Prisma.XOR<Prisma.EarningUpdateWithoutWorkerInput, Prisma.EarningUncheckedUpdateWithoutWorkerInput>;
    create: Prisma.XOR<Prisma.EarningCreateWithoutWorkerInput, Prisma.EarningUncheckedCreateWithoutWorkerInput>;
};
export type EarningUpdateWithWhereUniqueWithoutWorkerInput = {
    where: Prisma.EarningWhereUniqueInput;
    data: Prisma.XOR<Prisma.EarningUpdateWithoutWorkerInput, Prisma.EarningUncheckedUpdateWithoutWorkerInput>;
};
export type EarningUpdateManyWithWhereWithoutWorkerInput = {
    where: Prisma.EarningScalarWhereInput;
    data: Prisma.XOR<Prisma.EarningUpdateManyMutationInput, Prisma.EarningUncheckedUpdateManyWithoutWorkerInput>;
};
export type EarningScalarWhereInput = {
    AND?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
    OR?: Prisma.EarningScalarWhereInput[];
    NOT?: Prisma.EarningScalarWhereInput | Prisma.EarningScalarWhereInput[];
    id?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    publicId?: Prisma.StringFilter<"Earning"> | string;
    jobId?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    status?: Prisma.StringFilter<"Earning"> | string;
    amountPaise?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    currency?: Prisma.StringFilter<"Earning"> | string;
    adjustmentPaise?: Prisma.BigIntFilter<"Earning"> | bigint | number;
    adjustmentReason?: Prisma.StringNullableFilter<"Earning"> | string | null;
    holdComplaintId?: Prisma.BigIntNullableFilter<"Earning"> | bigint | number | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"Earning"> | Date | string | null;
    paidAt?: Prisma.DateTimeNullableFilter<"Earning"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Earning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Earning"> | Date | string;
};
export type EarningCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    worker: Prisma.WorkerProfileCreateNestedOneWithoutEarningsInput;
    holdComplaint?: Prisma.ComplaintCreateNestedOneWithoutHeldEarningsInput;
    payments?: Prisma.PaymentEarningCreateNestedManyWithoutEarningInput;
};
export type EarningUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    holdComplaintId?: bigint | number | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentEarningUncheckedCreateNestedManyWithoutEarningInput;
};
export type EarningCreateOrConnectWithoutJobInput = {
    where: Prisma.EarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.EarningCreateWithoutJobInput, Prisma.EarningUncheckedCreateWithoutJobInput>;
};
export type EarningCreateManyJobInputEnvelope = {
    data: Prisma.EarningCreateManyJobInput | Prisma.EarningCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type EarningUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.EarningWhereUniqueInput;
    update: Prisma.XOR<Prisma.EarningUpdateWithoutJobInput, Prisma.EarningUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.EarningCreateWithoutJobInput, Prisma.EarningUncheckedCreateWithoutJobInput>;
};
export type EarningUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.EarningWhereUniqueInput;
    data: Prisma.XOR<Prisma.EarningUpdateWithoutJobInput, Prisma.EarningUncheckedUpdateWithoutJobInput>;
};
export type EarningUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.EarningScalarWhereInput;
    data: Prisma.XOR<Prisma.EarningUpdateManyMutationInput, Prisma.EarningUncheckedUpdateManyWithoutJobInput>;
};
export type EarningCreateWithoutPaymentsInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutEarningsInput;
    worker: Prisma.WorkerProfileCreateNestedOneWithoutEarningsInput;
    holdComplaint?: Prisma.ComplaintCreateNestedOneWithoutHeldEarningsInput;
};
export type EarningUncheckedCreateWithoutPaymentsInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    holdComplaintId?: bigint | number | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EarningCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.EarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.EarningCreateWithoutPaymentsInput, Prisma.EarningUncheckedCreateWithoutPaymentsInput>;
};
export type EarningUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.EarningUpdateWithoutPaymentsInput, Prisma.EarningUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.EarningCreateWithoutPaymentsInput, Prisma.EarningUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.EarningWhereInput;
};
export type EarningUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.EarningWhereInput;
    data: Prisma.XOR<Prisma.EarningUpdateWithoutPaymentsInput, Prisma.EarningUncheckedUpdateWithoutPaymentsInput>;
};
export type EarningUpdateWithoutPaymentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutEarningsNestedInput;
    worker?: Prisma.WorkerProfileUpdateOneRequiredWithoutEarningsNestedInput;
    holdComplaint?: Prisma.ComplaintUpdateOneWithoutHeldEarningsNestedInput;
};
export type EarningUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    holdComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EarningCreateWithoutHoldComplaintInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutEarningsInput;
    worker: Prisma.WorkerProfileCreateNestedOneWithoutEarningsInput;
    payments?: Prisma.PaymentEarningCreateNestedManyWithoutEarningInput;
};
export type EarningUncheckedCreateWithoutHoldComplaintInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentEarningUncheckedCreateNestedManyWithoutEarningInput;
};
export type EarningCreateOrConnectWithoutHoldComplaintInput = {
    where: Prisma.EarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.EarningCreateWithoutHoldComplaintInput, Prisma.EarningUncheckedCreateWithoutHoldComplaintInput>;
};
export type EarningCreateManyHoldComplaintInputEnvelope = {
    data: Prisma.EarningCreateManyHoldComplaintInput | Prisma.EarningCreateManyHoldComplaintInput[];
    skipDuplicates?: boolean;
};
export type EarningUpsertWithWhereUniqueWithoutHoldComplaintInput = {
    where: Prisma.EarningWhereUniqueInput;
    update: Prisma.XOR<Prisma.EarningUpdateWithoutHoldComplaintInput, Prisma.EarningUncheckedUpdateWithoutHoldComplaintInput>;
    create: Prisma.XOR<Prisma.EarningCreateWithoutHoldComplaintInput, Prisma.EarningUncheckedCreateWithoutHoldComplaintInput>;
};
export type EarningUpdateWithWhereUniqueWithoutHoldComplaintInput = {
    where: Prisma.EarningWhereUniqueInput;
    data: Prisma.XOR<Prisma.EarningUpdateWithoutHoldComplaintInput, Prisma.EarningUncheckedUpdateWithoutHoldComplaintInput>;
};
export type EarningUpdateManyWithWhereWithoutHoldComplaintInput = {
    where: Prisma.EarningScalarWhereInput;
    data: Prisma.XOR<Prisma.EarningUpdateManyMutationInput, Prisma.EarningUncheckedUpdateManyWithoutHoldComplaintInput>;
};
export type EarningCreateManyWorkerInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    holdComplaintId?: bigint | number | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EarningUpdateWithoutWorkerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutEarningsNestedInput;
    holdComplaint?: Prisma.ComplaintUpdateOneWithoutHeldEarningsNestedInput;
    payments?: Prisma.PaymentEarningUpdateManyWithoutEarningNestedInput;
};
export type EarningUncheckedUpdateWithoutWorkerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    holdComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentEarningUncheckedUpdateManyWithoutEarningNestedInput;
};
export type EarningUncheckedUpdateManyWithoutWorkerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    holdComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EarningCreateManyJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    holdComplaintId?: bigint | number | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EarningUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    worker?: Prisma.WorkerProfileUpdateOneRequiredWithoutEarningsNestedInput;
    holdComplaint?: Prisma.ComplaintUpdateOneWithoutHeldEarningsNestedInput;
    payments?: Prisma.PaymentEarningUpdateManyWithoutEarningNestedInput;
};
export type EarningUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    holdComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentEarningUncheckedUpdateManyWithoutEarningNestedInput;
};
export type EarningUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    holdComplaintId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EarningCreateManyHoldComplaintInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    amountPaise?: bigint | number;
    currency?: string;
    adjustmentPaise?: bigint | number;
    adjustmentReason?: string | null;
    approvedAt?: Date | string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EarningUpdateWithoutHoldComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutEarningsNestedInput;
    worker?: Prisma.WorkerProfileUpdateOneRequiredWithoutEarningsNestedInput;
    payments?: Prisma.PaymentEarningUpdateManyWithoutEarningNestedInput;
};
export type EarningUncheckedUpdateWithoutHoldComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentEarningUncheckedUpdateManyWithoutEarningNestedInput;
};
export type EarningUncheckedUpdateManyWithoutHoldComplaintInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    adjustmentPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjustmentReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EarningCountOutputType = {
    payments: number;
};
export type EarningCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    payments?: boolean | EarningCountOutputTypeCountPaymentsArgs;
};
export type EarningCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningCountOutputTypeSelect<ExtArgs> | null;
};
export type EarningCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentEarningWhereInput;
};
export type EarningSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    amountPaise?: boolean;
    currency?: boolean;
    adjustmentPaise?: boolean;
    adjustmentReason?: boolean;
    holdComplaintId?: boolean;
    approvedAt?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    worker?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    holdComplaint?: boolean | Prisma.Earning$holdComplaintArgs<ExtArgs>;
    payments?: boolean | Prisma.Earning$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.EarningCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["earning"]>;
export type EarningSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    amountPaise?: boolean;
    currency?: boolean;
    adjustmentPaise?: boolean;
    adjustmentReason?: boolean;
    holdComplaintId?: boolean;
    approvedAt?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EarningOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "jobId" | "workerProfileId" | "status" | "amountPaise" | "currency" | "adjustmentPaise" | "adjustmentReason" | "holdComplaintId" | "approvedAt" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["earning"]>;
export type EarningInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    worker?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    holdComplaint?: boolean | Prisma.Earning$holdComplaintArgs<ExtArgs>;
    payments?: boolean | Prisma.Earning$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.EarningCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $EarningPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Earning";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        worker: Prisma.$WorkerProfilePayload<ExtArgs>;
        holdComplaint: Prisma.$ComplaintPayload<ExtArgs> | null;
        payments: Prisma.$PaymentEarningPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        jobId: bigint;
        workerProfileId: bigint;
        status: string;
        amountPaise: bigint;
        currency: string;
        adjustmentPaise: bigint;
        adjustmentReason: string | null;
        holdComplaintId: bigint | null;
        approvedAt: Date | null;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["earning"]>;
    composites: {};
};
export type EarningGetPayload<S extends boolean | null | undefined | EarningDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EarningPayload, S>;
export type EarningCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EarningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EarningCountAggregateInputType | true;
};
export interface EarningDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Earning'];
        meta: {
            name: 'Earning';
        };
    };
    findUnique<T extends EarningFindUniqueArgs>(args: Prisma.SelectSubset<T, EarningFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EarningFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EarningFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EarningFindFirstArgs>(args?: Prisma.SelectSubset<T, EarningFindFirstArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EarningFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EarningFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EarningFindManyArgs>(args?: Prisma.SelectSubset<T, EarningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EarningCreateArgs>(args: Prisma.SelectSubset<T, EarningCreateArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EarningCreateManyArgs>(args?: Prisma.SelectSubset<T, EarningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends EarningDeleteArgs>(args: Prisma.SelectSubset<T, EarningDeleteArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EarningUpdateArgs>(args: Prisma.SelectSubset<T, EarningUpdateArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EarningDeleteManyArgs>(args?: Prisma.SelectSubset<T, EarningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EarningUpdateManyArgs>(args: Prisma.SelectSubset<T, EarningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends EarningUpsertArgs>(args: Prisma.SelectSubset<T, EarningUpsertArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EarningCountArgs>(args?: Prisma.Subset<T, EarningCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EarningCountAggregateOutputType> : number>;
    aggregate<T extends EarningAggregateArgs>(args: Prisma.Subset<T, EarningAggregateArgs>): Prisma.PrismaPromise<GetEarningAggregateType<T>>;
    groupBy<T extends EarningGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EarningGroupByArgs['orderBy'];
    } : {
        orderBy?: EarningGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EarningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEarningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EarningFieldRefs;
}
export interface Prisma__EarningClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    worker<T extends Prisma.WorkerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkerProfileClient<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    holdComplaint<T extends Prisma.Earning$holdComplaintArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Earning$holdComplaintArgs<ExtArgs>>): Prisma.Prisma__ComplaintClient<runtime.Types.Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    payments<T extends Prisma.Earning$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Earning$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EarningFieldRefs {
    readonly id: Prisma.FieldRef<"Earning", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"Earning", 'String'>;
    readonly jobId: Prisma.FieldRef<"Earning", 'BigInt'>;
    readonly workerProfileId: Prisma.FieldRef<"Earning", 'BigInt'>;
    readonly status: Prisma.FieldRef<"Earning", 'String'>;
    readonly amountPaise: Prisma.FieldRef<"Earning", 'BigInt'>;
    readonly currency: Prisma.FieldRef<"Earning", 'String'>;
    readonly adjustmentPaise: Prisma.FieldRef<"Earning", 'BigInt'>;
    readonly adjustmentReason: Prisma.FieldRef<"Earning", 'String'>;
    readonly holdComplaintId: Prisma.FieldRef<"Earning", 'BigInt'>;
    readonly approvedAt: Prisma.FieldRef<"Earning", 'DateTime'>;
    readonly paidAt: Prisma.FieldRef<"Earning", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Earning", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Earning", 'DateTime'>;
}
export type EarningFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    where: Prisma.EarningWhereUniqueInput;
};
export type EarningFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    where: Prisma.EarningWhereUniqueInput;
};
export type EarningFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    where?: Prisma.EarningWhereInput;
    orderBy?: Prisma.EarningOrderByWithRelationInput | Prisma.EarningOrderByWithRelationInput[];
    cursor?: Prisma.EarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EarningScalarFieldEnum | Prisma.EarningScalarFieldEnum[];
};
export type EarningFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    where?: Prisma.EarningWhereInput;
    orderBy?: Prisma.EarningOrderByWithRelationInput | Prisma.EarningOrderByWithRelationInput[];
    cursor?: Prisma.EarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EarningScalarFieldEnum | Prisma.EarningScalarFieldEnum[];
};
export type EarningFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    where?: Prisma.EarningWhereInput;
    orderBy?: Prisma.EarningOrderByWithRelationInput | Prisma.EarningOrderByWithRelationInput[];
    cursor?: Prisma.EarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EarningScalarFieldEnum | Prisma.EarningScalarFieldEnum[];
};
export type EarningCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EarningCreateInput, Prisma.EarningUncheckedCreateInput>;
};
export type EarningCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EarningCreateManyInput | Prisma.EarningCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EarningUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EarningUpdateInput, Prisma.EarningUncheckedUpdateInput>;
    where: Prisma.EarningWhereUniqueInput;
};
export type EarningUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EarningUpdateManyMutationInput, Prisma.EarningUncheckedUpdateManyInput>;
    where?: Prisma.EarningWhereInput;
    limit?: number;
};
export type EarningUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    where: Prisma.EarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.EarningCreateInput, Prisma.EarningUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EarningUpdateInput, Prisma.EarningUncheckedUpdateInput>;
};
export type EarningDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
    where: Prisma.EarningWhereUniqueInput;
};
export type EarningDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EarningWhereInput;
    limit?: number;
};
export type Earning$holdComplaintArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComplaintSelect<ExtArgs> | null;
    omit?: Prisma.ComplaintOmit<ExtArgs> | null;
    include?: Prisma.ComplaintInclude<ExtArgs> | null;
    where?: Prisma.ComplaintWhereInput;
};
export type Earning$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    where?: Prisma.PaymentEarningWhereInput;
    orderBy?: Prisma.PaymentEarningOrderByWithRelationInput | Prisma.PaymentEarningOrderByWithRelationInput[];
    cursor?: Prisma.PaymentEarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentEarningScalarFieldEnum | Prisma.PaymentEarningScalarFieldEnum[];
};
export type EarningDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EarningSelect<ExtArgs> | null;
    omit?: Prisma.EarningOmit<ExtArgs> | null;
    include?: Prisma.EarningInclude<ExtArgs> | null;
};
