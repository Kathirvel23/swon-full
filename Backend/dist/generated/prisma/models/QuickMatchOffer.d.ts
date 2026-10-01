import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuickMatchOfferModel = runtime.Types.Result.DefaultSelection<Prisma.$QuickMatchOfferPayload>;
export type AggregateQuickMatchOffer = {
    _count: QuickMatchOfferCountAggregateOutputType | null;
    _avg: QuickMatchOfferAvgAggregateOutputType | null;
    _sum: QuickMatchOfferSumAggregateOutputType | null;
    _min: QuickMatchOfferMinAggregateOutputType | null;
    _max: QuickMatchOfferMaxAggregateOutputType | null;
};
export type QuickMatchOfferAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    workerProfileId: number | null;
    waveNo: number | null;
    requiredHeadcount: number | null;
};
export type QuickMatchOfferSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    waveNo: number | null;
    requiredHeadcount: number | null;
};
export type QuickMatchOfferMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    waveNo: number | null;
    requiredHeadcount: number | null;
    respondBy: Date | null;
    respondedAt: Date | null;
    requirementSnapshot: string | null;
    windowStart: Date | null;
    windowEnd: Date | null;
    distanceBand: string | null;
    createdAt: Date | null;
};
export type QuickMatchOfferMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    waveNo: number | null;
    requiredHeadcount: number | null;
    respondBy: Date | null;
    respondedAt: Date | null;
    requirementSnapshot: string | null;
    windowStart: Date | null;
    windowEnd: Date | null;
    distanceBand: string | null;
    createdAt: Date | null;
};
export type QuickMatchOfferCountAggregateOutputType = {
    id: number;
    publicId: number;
    jobId: number;
    workerProfileId: number;
    status: number;
    waveNo: number;
    requiredHeadcount: number;
    respondBy: number;
    respondedAt: number;
    requirementSnapshot: number;
    windowStart: number;
    windowEnd: number;
    distanceBand: number;
    createdAt: number;
    _all: number;
};
export type QuickMatchOfferAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    waveNo?: true;
    requiredHeadcount?: true;
};
export type QuickMatchOfferSumAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    waveNo?: true;
    requiredHeadcount?: true;
};
export type QuickMatchOfferMinAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    waveNo?: true;
    requiredHeadcount?: true;
    respondBy?: true;
    respondedAt?: true;
    requirementSnapshot?: true;
    windowStart?: true;
    windowEnd?: true;
    distanceBand?: true;
    createdAt?: true;
};
export type QuickMatchOfferMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    waveNo?: true;
    requiredHeadcount?: true;
    respondBy?: true;
    respondedAt?: true;
    requirementSnapshot?: true;
    windowStart?: true;
    windowEnd?: true;
    distanceBand?: true;
    createdAt?: true;
};
export type QuickMatchOfferCountAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    waveNo?: true;
    requiredHeadcount?: true;
    respondBy?: true;
    respondedAt?: true;
    requirementSnapshot?: true;
    windowStart?: true;
    windowEnd?: true;
    distanceBand?: true;
    createdAt?: true;
    _all?: true;
};
export type QuickMatchOfferAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuickMatchOfferWhereInput;
    orderBy?: Prisma.QuickMatchOfferOrderByWithRelationInput | Prisma.QuickMatchOfferOrderByWithRelationInput[];
    cursor?: Prisma.QuickMatchOfferWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuickMatchOfferCountAggregateInputType;
    _avg?: QuickMatchOfferAvgAggregateInputType;
    _sum?: QuickMatchOfferSumAggregateInputType;
    _min?: QuickMatchOfferMinAggregateInputType;
    _max?: QuickMatchOfferMaxAggregateInputType;
};
export type GetQuickMatchOfferAggregateType<T extends QuickMatchOfferAggregateArgs> = {
    [P in keyof T & keyof AggregateQuickMatchOffer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuickMatchOffer[P]> : Prisma.GetScalarType<T[P], AggregateQuickMatchOffer[P]>;
};
export type QuickMatchOfferGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuickMatchOfferWhereInput;
    orderBy?: Prisma.QuickMatchOfferOrderByWithAggregationInput | Prisma.QuickMatchOfferOrderByWithAggregationInput[];
    by: Prisma.QuickMatchOfferScalarFieldEnum[] | Prisma.QuickMatchOfferScalarFieldEnum;
    having?: Prisma.QuickMatchOfferScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuickMatchOfferCountAggregateInputType | true;
    _avg?: QuickMatchOfferAvgAggregateInputType;
    _sum?: QuickMatchOfferSumAggregateInputType;
    _min?: QuickMatchOfferMinAggregateInputType;
    _max?: QuickMatchOfferMaxAggregateInputType;
};
export type QuickMatchOfferGroupByOutputType = {
    id: bigint;
    publicId: string;
    jobId: bigint;
    workerProfileId: bigint;
    status: string;
    waveNo: number;
    requiredHeadcount: number;
    respondBy: Date;
    respondedAt: Date | null;
    requirementSnapshot: string | null;
    windowStart: Date | null;
    windowEnd: Date | null;
    distanceBand: string;
    createdAt: Date;
    _count: QuickMatchOfferCountAggregateOutputType | null;
    _avg: QuickMatchOfferAvgAggregateOutputType | null;
    _sum: QuickMatchOfferSumAggregateOutputType | null;
    _min: QuickMatchOfferMinAggregateOutputType | null;
    _max: QuickMatchOfferMaxAggregateOutputType | null;
};
export type GetQuickMatchOfferGroupByPayload<T extends QuickMatchOfferGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuickMatchOfferGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuickMatchOfferGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuickMatchOfferGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuickMatchOfferGroupByOutputType[P]>;
}>>;
export type QuickMatchOfferWhereInput = {
    AND?: Prisma.QuickMatchOfferWhereInput | Prisma.QuickMatchOfferWhereInput[];
    OR?: Prisma.QuickMatchOfferWhereInput[];
    NOT?: Prisma.QuickMatchOfferWhereInput | Prisma.QuickMatchOfferWhereInput[];
    id?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    publicId?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    jobId?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    status?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    waveNo?: Prisma.IntFilter<"QuickMatchOffer"> | number;
    requiredHeadcount?: Prisma.IntFilter<"QuickMatchOffer"> | number;
    respondBy?: Prisma.DateTimeFilter<"QuickMatchOffer"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    requirementSnapshot?: Prisma.StringNullableFilter<"QuickMatchOffer"> | string | null;
    windowStart?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    windowEnd?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    distanceBand?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    createdAt?: Prisma.DateTimeFilter<"QuickMatchOffer"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    application?: Prisma.XOR<Prisma.ApplicationNullableScalarRelationFilter, Prisma.ApplicationWhereInput> | null;
};
export type QuickMatchOfferOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    waveNo?: Prisma.SortOrder;
    requiredHeadcount?: Prisma.SortOrder;
    respondBy?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    requirementSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    windowStart?: Prisma.SortOrderInput | Prisma.SortOrder;
    windowEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    distanceBand?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    workerProfile?: Prisma.WorkerProfileOrderByWithRelationInput;
    application?: Prisma.ApplicationOrderByWithRelationInput;
    _relevance?: Prisma.QuickMatchOfferOrderByRelevanceInput;
};
export type QuickMatchOfferWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    jobId_workerProfileId?: Prisma.QuickMatchOfferJobIdWorkerProfileIdCompoundUniqueInput;
    AND?: Prisma.QuickMatchOfferWhereInput | Prisma.QuickMatchOfferWhereInput[];
    OR?: Prisma.QuickMatchOfferWhereInput[];
    NOT?: Prisma.QuickMatchOfferWhereInput | Prisma.QuickMatchOfferWhereInput[];
    jobId?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    status?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    waveNo?: Prisma.IntFilter<"QuickMatchOffer"> | number;
    requiredHeadcount?: Prisma.IntFilter<"QuickMatchOffer"> | number;
    respondBy?: Prisma.DateTimeFilter<"QuickMatchOffer"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    requirementSnapshot?: Prisma.StringNullableFilter<"QuickMatchOffer"> | string | null;
    windowStart?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    windowEnd?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    distanceBand?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    createdAt?: Prisma.DateTimeFilter<"QuickMatchOffer"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    application?: Prisma.XOR<Prisma.ApplicationNullableScalarRelationFilter, Prisma.ApplicationWhereInput> | null;
}, "id" | "publicId" | "jobId_workerProfileId">;
export type QuickMatchOfferOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    waveNo?: Prisma.SortOrder;
    requiredHeadcount?: Prisma.SortOrder;
    respondBy?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    requirementSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    windowStart?: Prisma.SortOrderInput | Prisma.SortOrder;
    windowEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    distanceBand?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.QuickMatchOfferCountOrderByAggregateInput;
    _avg?: Prisma.QuickMatchOfferAvgOrderByAggregateInput;
    _max?: Prisma.QuickMatchOfferMaxOrderByAggregateInput;
    _min?: Prisma.QuickMatchOfferMinOrderByAggregateInput;
    _sum?: Prisma.QuickMatchOfferSumOrderByAggregateInput;
};
export type QuickMatchOfferScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuickMatchOfferScalarWhereWithAggregatesInput | Prisma.QuickMatchOfferScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuickMatchOfferScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuickMatchOfferScalarWhereWithAggregatesInput | Prisma.QuickMatchOfferScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"QuickMatchOffer"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"QuickMatchOffer"> | string;
    jobId?: Prisma.BigIntWithAggregatesFilter<"QuickMatchOffer"> | bigint | number;
    workerProfileId?: Prisma.BigIntWithAggregatesFilter<"QuickMatchOffer"> | bigint | number;
    status?: Prisma.StringWithAggregatesFilter<"QuickMatchOffer"> | string;
    waveNo?: Prisma.IntWithAggregatesFilter<"QuickMatchOffer"> | number;
    requiredHeadcount?: Prisma.IntWithAggregatesFilter<"QuickMatchOffer"> | number;
    respondBy?: Prisma.DateTimeWithAggregatesFilter<"QuickMatchOffer"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QuickMatchOffer"> | Date | string | null;
    requirementSnapshot?: Prisma.StringNullableWithAggregatesFilter<"QuickMatchOffer"> | string | null;
    windowStart?: Prisma.DateTimeNullableWithAggregatesFilter<"QuickMatchOffer"> | Date | string | null;
    windowEnd?: Prisma.DateTimeNullableWithAggregatesFilter<"QuickMatchOffer"> | Date | string | null;
    distanceBand?: Prisma.StringWithAggregatesFilter<"QuickMatchOffer"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"QuickMatchOffer"> | Date | string;
};
export type QuickMatchOfferCreateInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutOffersInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutOffersInput;
    application?: Prisma.ApplicationCreateNestedOneWithoutQuickMatchOfferInput;
};
export type QuickMatchOfferUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
    application?: Prisma.ApplicationUncheckedCreateNestedOneWithoutQuickMatchOfferInput;
};
export type QuickMatchOfferUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutOffersNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutOffersNestedInput;
    application?: Prisma.ApplicationUpdateOneWithoutQuickMatchOfferNestedInput;
};
export type QuickMatchOfferUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    application?: Prisma.ApplicationUncheckedUpdateOneWithoutQuickMatchOfferNestedInput;
};
export type QuickMatchOfferCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
};
export type QuickMatchOfferUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuickMatchOfferUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuickMatchOfferListRelationFilter = {
    every?: Prisma.QuickMatchOfferWhereInput;
    some?: Prisma.QuickMatchOfferWhereInput;
    none?: Prisma.QuickMatchOfferWhereInput;
};
export type QuickMatchOfferOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuickMatchOfferNullableScalarRelationFilter = {
    is?: Prisma.QuickMatchOfferWhereInput | null;
    isNot?: Prisma.QuickMatchOfferWhereInput | null;
};
export type QuickMatchOfferOrderByRelevanceInput = {
    fields: Prisma.QuickMatchOfferOrderByRelevanceFieldEnum | Prisma.QuickMatchOfferOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type QuickMatchOfferJobIdWorkerProfileIdCompoundUniqueInput = {
    jobId: bigint | number;
    workerProfileId: bigint | number;
};
export type QuickMatchOfferCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    waveNo?: Prisma.SortOrder;
    requiredHeadcount?: Prisma.SortOrder;
    respondBy?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    requirementSnapshot?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    windowEnd?: Prisma.SortOrder;
    distanceBand?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QuickMatchOfferAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    waveNo?: Prisma.SortOrder;
    requiredHeadcount?: Prisma.SortOrder;
};
export type QuickMatchOfferMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    waveNo?: Prisma.SortOrder;
    requiredHeadcount?: Prisma.SortOrder;
    respondBy?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    requirementSnapshot?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    windowEnd?: Prisma.SortOrder;
    distanceBand?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QuickMatchOfferMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    waveNo?: Prisma.SortOrder;
    requiredHeadcount?: Prisma.SortOrder;
    respondBy?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    requirementSnapshot?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    windowEnd?: Prisma.SortOrder;
    distanceBand?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QuickMatchOfferSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    waveNo?: Prisma.SortOrder;
    requiredHeadcount?: Prisma.SortOrder;
};
export type QuickMatchOfferCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput> | Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput | Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
};
export type QuickMatchOfferUncheckedCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput> | Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput | Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
};
export type QuickMatchOfferUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput> | Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput | Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    disconnect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    delete?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    update?: Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.QuickMatchOfferUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.QuickMatchOfferUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.QuickMatchOfferScalarWhereInput | Prisma.QuickMatchOfferScalarWhereInput[];
};
export type QuickMatchOfferUncheckedUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput> | Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput | Prisma.QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    disconnect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    delete?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    update?: Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.QuickMatchOfferUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.QuickMatchOfferUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.QuickMatchOfferScalarWhereInput | Prisma.QuickMatchOfferScalarWhereInput[];
};
export type QuickMatchOfferCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutJobInput, Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput> | Prisma.QuickMatchOfferCreateWithoutJobInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput | Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyJobInputEnvelope;
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
};
export type QuickMatchOfferUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutJobInput, Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput> | Prisma.QuickMatchOfferCreateWithoutJobInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput | Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyJobInputEnvelope;
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
};
export type QuickMatchOfferUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutJobInput, Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput> | Prisma.QuickMatchOfferCreateWithoutJobInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput | Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutJobInput | Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyJobInputEnvelope;
    set?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    disconnect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    delete?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    update?: Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutJobInput | Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.QuickMatchOfferUpdateManyWithWhereWithoutJobInput | Prisma.QuickMatchOfferUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.QuickMatchOfferScalarWhereInput | Prisma.QuickMatchOfferScalarWhereInput[];
};
export type QuickMatchOfferUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutJobInput, Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput> | Prisma.QuickMatchOfferCreateWithoutJobInput[] | Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput | Prisma.QuickMatchOfferCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutJobInput | Prisma.QuickMatchOfferUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.QuickMatchOfferCreateManyJobInputEnvelope;
    set?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    disconnect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    delete?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    connect?: Prisma.QuickMatchOfferWhereUniqueInput | Prisma.QuickMatchOfferWhereUniqueInput[];
    update?: Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutJobInput | Prisma.QuickMatchOfferUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.QuickMatchOfferUpdateManyWithWhereWithoutJobInput | Prisma.QuickMatchOfferUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.QuickMatchOfferScalarWhereInput | Prisma.QuickMatchOfferScalarWhereInput[];
};
export type QuickMatchOfferCreateNestedOneWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutApplicationInput, Prisma.QuickMatchOfferUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutApplicationInput;
    connect?: Prisma.QuickMatchOfferWhereUniqueInput;
};
export type QuickMatchOfferUpdateOneWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutApplicationInput, Prisma.QuickMatchOfferUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.QuickMatchOfferCreateOrConnectWithoutApplicationInput;
    upsert?: Prisma.QuickMatchOfferUpsertWithoutApplicationInput;
    disconnect?: Prisma.QuickMatchOfferWhereInput | boolean;
    delete?: Prisma.QuickMatchOfferWhereInput | boolean;
    connect?: Prisma.QuickMatchOfferWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuickMatchOfferUpdateToOneWithWhereWithoutApplicationInput, Prisma.QuickMatchOfferUpdateWithoutApplicationInput>, Prisma.QuickMatchOfferUncheckedUpdateWithoutApplicationInput>;
};
export type QuickMatchOfferCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutOffersInput;
    application?: Prisma.ApplicationCreateNestedOneWithoutQuickMatchOfferInput;
};
export type QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
    application?: Prisma.ApplicationUncheckedCreateNestedOneWithoutQuickMatchOfferInput;
};
export type QuickMatchOfferCreateOrConnectWithoutWorkerProfileInput = {
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput>;
};
export type QuickMatchOfferCreateManyWorkerProfileInputEnvelope = {
    data: Prisma.QuickMatchOfferCreateManyWorkerProfileInput | Prisma.QuickMatchOfferCreateManyWorkerProfileInput[];
    skipDuplicates?: boolean;
};
export type QuickMatchOfferUpsertWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuickMatchOfferUpdateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedUpdateWithoutWorkerProfileInput>;
    create: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedCreateWithoutWorkerProfileInput>;
};
export type QuickMatchOfferUpdateWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuickMatchOfferUpdateWithoutWorkerProfileInput, Prisma.QuickMatchOfferUncheckedUpdateWithoutWorkerProfileInput>;
};
export type QuickMatchOfferUpdateManyWithWhereWithoutWorkerProfileInput = {
    where: Prisma.QuickMatchOfferScalarWhereInput;
    data: Prisma.XOR<Prisma.QuickMatchOfferUpdateManyMutationInput, Prisma.QuickMatchOfferUncheckedUpdateManyWithoutWorkerProfileInput>;
};
export type QuickMatchOfferScalarWhereInput = {
    AND?: Prisma.QuickMatchOfferScalarWhereInput | Prisma.QuickMatchOfferScalarWhereInput[];
    OR?: Prisma.QuickMatchOfferScalarWhereInput[];
    NOT?: Prisma.QuickMatchOfferScalarWhereInput | Prisma.QuickMatchOfferScalarWhereInput[];
    id?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    publicId?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    jobId?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"QuickMatchOffer"> | bigint | number;
    status?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    waveNo?: Prisma.IntFilter<"QuickMatchOffer"> | number;
    requiredHeadcount?: Prisma.IntFilter<"QuickMatchOffer"> | number;
    respondBy?: Prisma.DateTimeFilter<"QuickMatchOffer"> | Date | string;
    respondedAt?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    requirementSnapshot?: Prisma.StringNullableFilter<"QuickMatchOffer"> | string | null;
    windowStart?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    windowEnd?: Prisma.DateTimeNullableFilter<"QuickMatchOffer"> | Date | string | null;
    distanceBand?: Prisma.StringFilter<"QuickMatchOffer"> | string;
    createdAt?: Prisma.DateTimeFilter<"QuickMatchOffer"> | Date | string;
};
export type QuickMatchOfferCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutOffersInput;
    application?: Prisma.ApplicationCreateNestedOneWithoutQuickMatchOfferInput;
};
export type QuickMatchOfferUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
    application?: Prisma.ApplicationUncheckedCreateNestedOneWithoutQuickMatchOfferInput;
};
export type QuickMatchOfferCreateOrConnectWithoutJobInput = {
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutJobInput, Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput>;
};
export type QuickMatchOfferCreateManyJobInputEnvelope = {
    data: Prisma.QuickMatchOfferCreateManyJobInput | Prisma.QuickMatchOfferCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type QuickMatchOfferUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuickMatchOfferUpdateWithoutJobInput, Prisma.QuickMatchOfferUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutJobInput, Prisma.QuickMatchOfferUncheckedCreateWithoutJobInput>;
};
export type QuickMatchOfferUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuickMatchOfferUpdateWithoutJobInput, Prisma.QuickMatchOfferUncheckedUpdateWithoutJobInput>;
};
export type QuickMatchOfferUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.QuickMatchOfferScalarWhereInput;
    data: Prisma.XOR<Prisma.QuickMatchOfferUpdateManyMutationInput, Prisma.QuickMatchOfferUncheckedUpdateManyWithoutJobInput>;
};
export type QuickMatchOfferCreateWithoutApplicationInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutOffersInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutOffersInput;
};
export type QuickMatchOfferUncheckedCreateWithoutApplicationInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
};
export type QuickMatchOfferCreateOrConnectWithoutApplicationInput = {
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutApplicationInput, Prisma.QuickMatchOfferUncheckedCreateWithoutApplicationInput>;
};
export type QuickMatchOfferUpsertWithoutApplicationInput = {
    update: Prisma.XOR<Prisma.QuickMatchOfferUpdateWithoutApplicationInput, Prisma.QuickMatchOfferUncheckedUpdateWithoutApplicationInput>;
    create: Prisma.XOR<Prisma.QuickMatchOfferCreateWithoutApplicationInput, Prisma.QuickMatchOfferUncheckedCreateWithoutApplicationInput>;
    where?: Prisma.QuickMatchOfferWhereInput;
};
export type QuickMatchOfferUpdateToOneWithWhereWithoutApplicationInput = {
    where?: Prisma.QuickMatchOfferWhereInput;
    data: Prisma.XOR<Prisma.QuickMatchOfferUpdateWithoutApplicationInput, Prisma.QuickMatchOfferUncheckedUpdateWithoutApplicationInput>;
};
export type QuickMatchOfferUpdateWithoutApplicationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutOffersNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutOffersNestedInput;
};
export type QuickMatchOfferUncheckedUpdateWithoutApplicationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuickMatchOfferCreateManyWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
};
export type QuickMatchOfferUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutOffersNestedInput;
    application?: Prisma.ApplicationUpdateOneWithoutQuickMatchOfferNestedInput;
};
export type QuickMatchOfferUncheckedUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    application?: Prisma.ApplicationUncheckedUpdateOneWithoutQuickMatchOfferNestedInput;
};
export type QuickMatchOfferUncheckedUpdateManyWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuickMatchOfferCreateManyJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    status?: string;
    waveNo?: number;
    requiredHeadcount: number;
    respondBy: Date | string;
    respondedAt?: Date | string | null;
    requirementSnapshot?: string | null;
    windowStart?: Date | string | null;
    windowEnd?: Date | string | null;
    distanceBand?: string;
    createdAt?: Date | string;
};
export type QuickMatchOfferUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutOffersNestedInput;
    application?: Prisma.ApplicationUpdateOneWithoutQuickMatchOfferNestedInput;
};
export type QuickMatchOfferUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    application?: Prisma.ApplicationUncheckedUpdateOneWithoutQuickMatchOfferNestedInput;
};
export type QuickMatchOfferUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    waveNo?: Prisma.IntFieldUpdateOperationsInput | number;
    requiredHeadcount?: Prisma.IntFieldUpdateOperationsInput | number;
    respondBy?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requirementSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    windowStart?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    windowEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    distanceBand?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuickMatchOfferSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    waveNo?: boolean;
    requiredHeadcount?: boolean;
    respondBy?: boolean;
    respondedAt?: boolean;
    requirementSnapshot?: boolean;
    windowStart?: boolean;
    windowEnd?: boolean;
    distanceBand?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    application?: boolean | Prisma.QuickMatchOffer$applicationArgs<ExtArgs>;
}, ExtArgs["result"]["quickMatchOffer"]>;
export type QuickMatchOfferSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    waveNo?: boolean;
    requiredHeadcount?: boolean;
    respondBy?: boolean;
    respondedAt?: boolean;
    requirementSnapshot?: boolean;
    windowStart?: boolean;
    windowEnd?: boolean;
    distanceBand?: boolean;
    createdAt?: boolean;
};
export type QuickMatchOfferOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "jobId" | "workerProfileId" | "status" | "waveNo" | "requiredHeadcount" | "respondBy" | "respondedAt" | "requirementSnapshot" | "windowStart" | "windowEnd" | "distanceBand" | "createdAt", ExtArgs["result"]["quickMatchOffer"]>;
export type QuickMatchOfferInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    application?: boolean | Prisma.QuickMatchOffer$applicationArgs<ExtArgs>;
};
export type $QuickMatchOfferPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuickMatchOffer";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        workerProfile: Prisma.$WorkerProfilePayload<ExtArgs>;
        application: Prisma.$ApplicationPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        jobId: bigint;
        workerProfileId: bigint;
        status: string;
        waveNo: number;
        requiredHeadcount: number;
        respondBy: Date;
        respondedAt: Date | null;
        requirementSnapshot: string | null;
        windowStart: Date | null;
        windowEnd: Date | null;
        distanceBand: string;
        createdAt: Date;
    }, ExtArgs["result"]["quickMatchOffer"]>;
    composites: {};
};
export type QuickMatchOfferGetPayload<S extends boolean | null | undefined | QuickMatchOfferDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload, S>;
export type QuickMatchOfferCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuickMatchOfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuickMatchOfferCountAggregateInputType | true;
};
export interface QuickMatchOfferDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuickMatchOffer'];
        meta: {
            name: 'QuickMatchOffer';
        };
    };
    findUnique<T extends QuickMatchOfferFindUniqueArgs>(args: Prisma.SelectSubset<T, QuickMatchOfferFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuickMatchOfferFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuickMatchOfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuickMatchOfferFindFirstArgs>(args?: Prisma.SelectSubset<T, QuickMatchOfferFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuickMatchOfferFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuickMatchOfferFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuickMatchOfferFindManyArgs>(args?: Prisma.SelectSubset<T, QuickMatchOfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuickMatchOfferCreateArgs>(args: Prisma.SelectSubset<T, QuickMatchOfferCreateArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuickMatchOfferCreateManyArgs>(args?: Prisma.SelectSubset<T, QuickMatchOfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends QuickMatchOfferDeleteArgs>(args: Prisma.SelectSubset<T, QuickMatchOfferDeleteArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuickMatchOfferUpdateArgs>(args: Prisma.SelectSubset<T, QuickMatchOfferUpdateArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuickMatchOfferDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuickMatchOfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuickMatchOfferUpdateManyArgs>(args: Prisma.SelectSubset<T, QuickMatchOfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends QuickMatchOfferUpsertArgs>(args: Prisma.SelectSubset<T, QuickMatchOfferUpsertArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuickMatchOfferCountArgs>(args?: Prisma.Subset<T, QuickMatchOfferCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuickMatchOfferCountAggregateOutputType> : number>;
    aggregate<T extends QuickMatchOfferAggregateArgs>(args: Prisma.Subset<T, QuickMatchOfferAggregateArgs>): Prisma.PrismaPromise<GetQuickMatchOfferAggregateType<T>>;
    groupBy<T extends QuickMatchOfferGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuickMatchOfferGroupByArgs['orderBy'];
    } : {
        orderBy?: QuickMatchOfferGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuickMatchOfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuickMatchOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuickMatchOfferFieldRefs;
}
export interface Prisma__QuickMatchOfferClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    workerProfile<T extends Prisma.WorkerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkerProfileClient<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    application<T extends Prisma.QuickMatchOffer$applicationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuickMatchOffer$applicationArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuickMatchOfferFieldRefs {
    readonly id: Prisma.FieldRef<"QuickMatchOffer", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"QuickMatchOffer", 'String'>;
    readonly jobId: Prisma.FieldRef<"QuickMatchOffer", 'BigInt'>;
    readonly workerProfileId: Prisma.FieldRef<"QuickMatchOffer", 'BigInt'>;
    readonly status: Prisma.FieldRef<"QuickMatchOffer", 'String'>;
    readonly waveNo: Prisma.FieldRef<"QuickMatchOffer", 'Int'>;
    readonly requiredHeadcount: Prisma.FieldRef<"QuickMatchOffer", 'Int'>;
    readonly respondBy: Prisma.FieldRef<"QuickMatchOffer", 'DateTime'>;
    readonly respondedAt: Prisma.FieldRef<"QuickMatchOffer", 'DateTime'>;
    readonly requirementSnapshot: Prisma.FieldRef<"QuickMatchOffer", 'String'>;
    readonly windowStart: Prisma.FieldRef<"QuickMatchOffer", 'DateTime'>;
    readonly windowEnd: Prisma.FieldRef<"QuickMatchOffer", 'DateTime'>;
    readonly distanceBand: Prisma.FieldRef<"QuickMatchOffer", 'String'>;
    readonly createdAt: Prisma.FieldRef<"QuickMatchOffer", 'DateTime'>;
}
export type QuickMatchOfferFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where: Prisma.QuickMatchOfferWhereUniqueInput;
};
export type QuickMatchOfferFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where: Prisma.QuickMatchOfferWhereUniqueInput;
};
export type QuickMatchOfferFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where?: Prisma.QuickMatchOfferWhereInput;
    orderBy?: Prisma.QuickMatchOfferOrderByWithRelationInput | Prisma.QuickMatchOfferOrderByWithRelationInput[];
    cursor?: Prisma.QuickMatchOfferWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuickMatchOfferScalarFieldEnum | Prisma.QuickMatchOfferScalarFieldEnum[];
};
export type QuickMatchOfferFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where?: Prisma.QuickMatchOfferWhereInput;
    orderBy?: Prisma.QuickMatchOfferOrderByWithRelationInput | Prisma.QuickMatchOfferOrderByWithRelationInput[];
    cursor?: Prisma.QuickMatchOfferWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuickMatchOfferScalarFieldEnum | Prisma.QuickMatchOfferScalarFieldEnum[];
};
export type QuickMatchOfferFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where?: Prisma.QuickMatchOfferWhereInput;
    orderBy?: Prisma.QuickMatchOfferOrderByWithRelationInput | Prisma.QuickMatchOfferOrderByWithRelationInput[];
    cursor?: Prisma.QuickMatchOfferWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuickMatchOfferScalarFieldEnum | Prisma.QuickMatchOfferScalarFieldEnum[];
};
export type QuickMatchOfferCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuickMatchOfferCreateInput, Prisma.QuickMatchOfferUncheckedCreateInput>;
};
export type QuickMatchOfferCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuickMatchOfferCreateManyInput | Prisma.QuickMatchOfferCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuickMatchOfferUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuickMatchOfferUpdateInput, Prisma.QuickMatchOfferUncheckedUpdateInput>;
    where: Prisma.QuickMatchOfferWhereUniqueInput;
};
export type QuickMatchOfferUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuickMatchOfferUpdateManyMutationInput, Prisma.QuickMatchOfferUncheckedUpdateManyInput>;
    where?: Prisma.QuickMatchOfferWhereInput;
    limit?: number;
};
export type QuickMatchOfferUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where: Prisma.QuickMatchOfferWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuickMatchOfferCreateInput, Prisma.QuickMatchOfferUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuickMatchOfferUpdateInput, Prisma.QuickMatchOfferUncheckedUpdateInput>;
};
export type QuickMatchOfferDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where: Prisma.QuickMatchOfferWhereUniqueInput;
};
export type QuickMatchOfferDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuickMatchOfferWhereInput;
    limit?: number;
};
export type QuickMatchOffer$applicationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where?: Prisma.ApplicationWhereInput;
};
export type QuickMatchOfferDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
};
