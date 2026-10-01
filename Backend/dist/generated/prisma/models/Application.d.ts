import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ApplicationModel = runtime.Types.Result.DefaultSelection<Prisma.$ApplicationPayload>;
export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null;
    _avg: ApplicationAvgAggregateOutputType | null;
    _sum: ApplicationSumAggregateOutputType | null;
    _min: ApplicationMinAggregateOutputType | null;
    _max: ApplicationMaxAggregateOutputType | null;
};
export type ApplicationAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    workerProfileId: number | null;
    quickMatchOfferId: number | null;
};
export type ApplicationSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    quickMatchOfferId: bigint | null;
};
export type ApplicationMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    source: string | null;
    quickMatchOfferId: bigint | null;
    coverNote: string | null;
    decisionNote: string | null;
    decidedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ApplicationMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    source: string | null;
    quickMatchOfferId: bigint | null;
    coverNote: string | null;
    decisionNote: string | null;
    decidedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ApplicationCountAggregateOutputType = {
    id: number;
    publicId: number;
    jobId: number;
    workerProfileId: number;
    status: number;
    source: number;
    quickMatchOfferId: number;
    coverNote: number;
    decisionNote: number;
    decidedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ApplicationAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    quickMatchOfferId?: true;
};
export type ApplicationSumAggregateInputType = {
    id?: true;
    jobId?: true;
    workerProfileId?: true;
    quickMatchOfferId?: true;
};
export type ApplicationMinAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    source?: true;
    quickMatchOfferId?: true;
    coverNote?: true;
    decisionNote?: true;
    decidedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ApplicationMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    source?: true;
    quickMatchOfferId?: true;
    coverNote?: true;
    decisionNote?: true;
    decidedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ApplicationCountAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    workerProfileId?: true;
    status?: true;
    source?: true;
    quickMatchOfferId?: true;
    coverNote?: true;
    decisionNote?: true;
    decidedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ApplicationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApplicationWhereInput;
    orderBy?: Prisma.ApplicationOrderByWithRelationInput | Prisma.ApplicationOrderByWithRelationInput[];
    cursor?: Prisma.ApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ApplicationCountAggregateInputType;
    _avg?: ApplicationAvgAggregateInputType;
    _sum?: ApplicationSumAggregateInputType;
    _min?: ApplicationMinAggregateInputType;
    _max?: ApplicationMaxAggregateInputType;
};
export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
    [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateApplication[P]> : Prisma.GetScalarType<T[P], AggregateApplication[P]>;
};
export type ApplicationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApplicationWhereInput;
    orderBy?: Prisma.ApplicationOrderByWithAggregationInput | Prisma.ApplicationOrderByWithAggregationInput[];
    by: Prisma.ApplicationScalarFieldEnum[] | Prisma.ApplicationScalarFieldEnum;
    having?: Prisma.ApplicationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ApplicationCountAggregateInputType | true;
    _avg?: ApplicationAvgAggregateInputType;
    _sum?: ApplicationSumAggregateInputType;
    _min?: ApplicationMinAggregateInputType;
    _max?: ApplicationMaxAggregateInputType;
};
export type ApplicationGroupByOutputType = {
    id: bigint;
    publicId: string;
    jobId: bigint;
    workerProfileId: bigint;
    status: string;
    source: string;
    quickMatchOfferId: bigint | null;
    coverNote: string | null;
    decisionNote: string | null;
    decidedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ApplicationCountAggregateOutputType | null;
    _avg: ApplicationAvgAggregateOutputType | null;
    _sum: ApplicationSumAggregateOutputType | null;
    _min: ApplicationMinAggregateOutputType | null;
    _max: ApplicationMaxAggregateOutputType | null;
};
export type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ApplicationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ApplicationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ApplicationGroupByOutputType[P]>;
}>>;
export type ApplicationWhereInput = {
    AND?: Prisma.ApplicationWhereInput | Prisma.ApplicationWhereInput[];
    OR?: Prisma.ApplicationWhereInput[];
    NOT?: Prisma.ApplicationWhereInput | Prisma.ApplicationWhereInput[];
    id?: Prisma.BigIntFilter<"Application"> | bigint | number;
    publicId?: Prisma.StringFilter<"Application"> | string;
    jobId?: Prisma.BigIntFilter<"Application"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"Application"> | bigint | number;
    status?: Prisma.StringFilter<"Application"> | string;
    source?: Prisma.StringFilter<"Application"> | string;
    quickMatchOfferId?: Prisma.BigIntNullableFilter<"Application"> | bigint | number | null;
    coverNote?: Prisma.StringNullableFilter<"Application"> | string | null;
    decisionNote?: Prisma.StringNullableFilter<"Application"> | string | null;
    decidedAt?: Prisma.DateTimeNullableFilter<"Application"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Application"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Application"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    quickMatchOffer?: Prisma.XOR<Prisma.QuickMatchOfferNullableScalarRelationFilter, Prisma.QuickMatchOfferWhereInput> | null;
    crewMember?: Prisma.XOR<Prisma.CrewMemberNullableScalarRelationFilter, Prisma.CrewMemberWhereInput> | null;
};
export type ApplicationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    quickMatchOfferId?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    decisionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    decidedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    workerProfile?: Prisma.WorkerProfileOrderByWithRelationInput;
    quickMatchOffer?: Prisma.QuickMatchOfferOrderByWithRelationInput;
    crewMember?: Prisma.CrewMemberOrderByWithRelationInput;
    _relevance?: Prisma.ApplicationOrderByRelevanceInput;
};
export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    quickMatchOfferId?: bigint | number;
    jobId_workerProfileId?: Prisma.ApplicationJobIdWorkerProfileIdCompoundUniqueInput;
    AND?: Prisma.ApplicationWhereInput | Prisma.ApplicationWhereInput[];
    OR?: Prisma.ApplicationWhereInput[];
    NOT?: Prisma.ApplicationWhereInput | Prisma.ApplicationWhereInput[];
    jobId?: Prisma.BigIntFilter<"Application"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"Application"> | bigint | number;
    status?: Prisma.StringFilter<"Application"> | string;
    source?: Prisma.StringFilter<"Application"> | string;
    coverNote?: Prisma.StringNullableFilter<"Application"> | string | null;
    decisionNote?: Prisma.StringNullableFilter<"Application"> | string | null;
    decidedAt?: Prisma.DateTimeNullableFilter<"Application"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Application"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Application"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    quickMatchOffer?: Prisma.XOR<Prisma.QuickMatchOfferNullableScalarRelationFilter, Prisma.QuickMatchOfferWhereInput> | null;
    crewMember?: Prisma.XOR<Prisma.CrewMemberNullableScalarRelationFilter, Prisma.CrewMemberWhereInput> | null;
}, "id" | "publicId" | "quickMatchOfferId" | "jobId_workerProfileId">;
export type ApplicationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    quickMatchOfferId?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    decisionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    decidedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ApplicationCountOrderByAggregateInput;
    _avg?: Prisma.ApplicationAvgOrderByAggregateInput;
    _max?: Prisma.ApplicationMaxOrderByAggregateInput;
    _min?: Prisma.ApplicationMinOrderByAggregateInput;
    _sum?: Prisma.ApplicationSumOrderByAggregateInput;
};
export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ApplicationScalarWhereWithAggregatesInput | Prisma.ApplicationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ApplicationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ApplicationScalarWhereWithAggregatesInput | Prisma.ApplicationScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Application"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"Application"> | string;
    jobId?: Prisma.BigIntWithAggregatesFilter<"Application"> | bigint | number;
    workerProfileId?: Prisma.BigIntWithAggregatesFilter<"Application"> | bigint | number;
    status?: Prisma.StringWithAggregatesFilter<"Application"> | string;
    source?: Prisma.StringWithAggregatesFilter<"Application"> | string;
    quickMatchOfferId?: Prisma.BigIntNullableWithAggregatesFilter<"Application"> | bigint | number | null;
    coverNote?: Prisma.StringNullableWithAggregatesFilter<"Application"> | string | null;
    decisionNote?: Prisma.StringNullableWithAggregatesFilter<"Application"> | string | null;
    decidedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Application"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Application"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Application"> | Date | string;
};
export type ApplicationCreateInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    source?: string;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutApplicationsInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutApplicationsInput;
    quickMatchOffer?: Prisma.QuickMatchOfferCreateNestedOneWithoutApplicationInput;
    crewMember?: Prisma.CrewMemberCreateNestedOneWithoutApplicationInput;
};
export type ApplicationUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    source?: string;
    quickMatchOfferId?: bigint | number | null;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    crewMember?: Prisma.CrewMemberUncheckedCreateNestedOneWithoutApplicationInput;
};
export type ApplicationUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutApplicationsNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutApplicationsNestedInput;
    quickMatchOffer?: Prisma.QuickMatchOfferUpdateOneWithoutApplicationNestedInput;
    crewMember?: Prisma.CrewMemberUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    quickMatchOfferId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crewMember?: Prisma.CrewMemberUncheckedUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    source?: string;
    quickMatchOfferId?: bigint | number | null;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApplicationUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApplicationUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    quickMatchOfferId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApplicationListRelationFilter = {
    every?: Prisma.ApplicationWhereInput;
    some?: Prisma.ApplicationWhereInput;
    none?: Prisma.ApplicationWhereInput;
};
export type ApplicationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ApplicationOrderByRelevanceInput = {
    fields: Prisma.ApplicationOrderByRelevanceFieldEnum | Prisma.ApplicationOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ApplicationJobIdWorkerProfileIdCompoundUniqueInput = {
    jobId: bigint | number;
    workerProfileId: bigint | number;
};
export type ApplicationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    quickMatchOfferId?: Prisma.SortOrder;
    coverNote?: Prisma.SortOrder;
    decisionNote?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ApplicationAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    quickMatchOfferId?: Prisma.SortOrder;
};
export type ApplicationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    quickMatchOfferId?: Prisma.SortOrder;
    coverNote?: Prisma.SortOrder;
    decisionNote?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ApplicationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    quickMatchOfferId?: Prisma.SortOrder;
    coverNote?: Prisma.SortOrder;
    decisionNote?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ApplicationSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    quickMatchOfferId?: Prisma.SortOrder;
};
export type ApplicationNullableScalarRelationFilter = {
    is?: Prisma.ApplicationWhereInput | null;
    isNot?: Prisma.ApplicationWhereInput | null;
};
export type ApplicationScalarRelationFilter = {
    is?: Prisma.ApplicationWhereInput;
    isNot?: Prisma.ApplicationWhereInput;
};
export type ApplicationCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput> | Prisma.ApplicationCreateWithoutWorkerProfileInput[] | Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput | Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.ApplicationCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
};
export type ApplicationUncheckedCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput> | Prisma.ApplicationCreateWithoutWorkerProfileInput[] | Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput | Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.ApplicationCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
};
export type ApplicationUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput> | Prisma.ApplicationCreateWithoutWorkerProfileInput[] | Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput | Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.ApplicationUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.ApplicationUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.ApplicationCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    disconnect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    delete?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    update?: Prisma.ApplicationUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.ApplicationUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.ApplicationUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.ApplicationUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.ApplicationScalarWhereInput | Prisma.ApplicationScalarWhereInput[];
};
export type ApplicationUncheckedUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput> | Prisma.ApplicationCreateWithoutWorkerProfileInput[] | Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput | Prisma.ApplicationCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.ApplicationUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.ApplicationUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.ApplicationCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    disconnect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    delete?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    update?: Prisma.ApplicationUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.ApplicationUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.ApplicationUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.ApplicationUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.ApplicationScalarWhereInput | Prisma.ApplicationScalarWhereInput[];
};
export type ApplicationCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutJobInput, Prisma.ApplicationUncheckedCreateWithoutJobInput> | Prisma.ApplicationCreateWithoutJobInput[] | Prisma.ApplicationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutJobInput | Prisma.ApplicationCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.ApplicationCreateManyJobInputEnvelope;
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
};
export type ApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutJobInput, Prisma.ApplicationUncheckedCreateWithoutJobInput> | Prisma.ApplicationCreateWithoutJobInput[] | Prisma.ApplicationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutJobInput | Prisma.ApplicationCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.ApplicationCreateManyJobInputEnvelope;
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
};
export type ApplicationUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutJobInput, Prisma.ApplicationUncheckedCreateWithoutJobInput> | Prisma.ApplicationCreateWithoutJobInput[] | Prisma.ApplicationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutJobInput | Prisma.ApplicationCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.ApplicationUpsertWithWhereUniqueWithoutJobInput | Prisma.ApplicationUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.ApplicationCreateManyJobInputEnvelope;
    set?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    disconnect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    delete?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    update?: Prisma.ApplicationUpdateWithWhereUniqueWithoutJobInput | Prisma.ApplicationUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.ApplicationUpdateManyWithWhereWithoutJobInput | Prisma.ApplicationUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.ApplicationScalarWhereInput | Prisma.ApplicationScalarWhereInput[];
};
export type ApplicationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutJobInput, Prisma.ApplicationUncheckedCreateWithoutJobInput> | Prisma.ApplicationCreateWithoutJobInput[] | Prisma.ApplicationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutJobInput | Prisma.ApplicationCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.ApplicationUpsertWithWhereUniqueWithoutJobInput | Prisma.ApplicationUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.ApplicationCreateManyJobInputEnvelope;
    set?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    disconnect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    delete?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    connect?: Prisma.ApplicationWhereUniqueInput | Prisma.ApplicationWhereUniqueInput[];
    update?: Prisma.ApplicationUpdateWithWhereUniqueWithoutJobInput | Prisma.ApplicationUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.ApplicationUpdateManyWithWhereWithoutJobInput | Prisma.ApplicationUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.ApplicationScalarWhereInput | Prisma.ApplicationScalarWhereInput[];
};
export type ApplicationCreateNestedOneWithoutQuickMatchOfferInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedCreateWithoutQuickMatchOfferInput>;
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutQuickMatchOfferInput;
    connect?: Prisma.ApplicationWhereUniqueInput;
};
export type ApplicationUncheckedCreateNestedOneWithoutQuickMatchOfferInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedCreateWithoutQuickMatchOfferInput>;
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutQuickMatchOfferInput;
    connect?: Prisma.ApplicationWhereUniqueInput;
};
export type ApplicationUpdateOneWithoutQuickMatchOfferNestedInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedCreateWithoutQuickMatchOfferInput>;
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutQuickMatchOfferInput;
    upsert?: Prisma.ApplicationUpsertWithoutQuickMatchOfferInput;
    disconnect?: Prisma.ApplicationWhereInput | boolean;
    delete?: Prisma.ApplicationWhereInput | boolean;
    connect?: Prisma.ApplicationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ApplicationUpdateToOneWithWhereWithoutQuickMatchOfferInput, Prisma.ApplicationUpdateWithoutQuickMatchOfferInput>, Prisma.ApplicationUncheckedUpdateWithoutQuickMatchOfferInput>;
};
export type ApplicationUncheckedUpdateOneWithoutQuickMatchOfferNestedInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedCreateWithoutQuickMatchOfferInput>;
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutQuickMatchOfferInput;
    upsert?: Prisma.ApplicationUpsertWithoutQuickMatchOfferInput;
    disconnect?: Prisma.ApplicationWhereInput | boolean;
    delete?: Prisma.ApplicationWhereInput | boolean;
    connect?: Prisma.ApplicationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ApplicationUpdateToOneWithWhereWithoutQuickMatchOfferInput, Prisma.ApplicationUpdateWithoutQuickMatchOfferInput>, Prisma.ApplicationUncheckedUpdateWithoutQuickMatchOfferInput>;
};
export type ApplicationCreateNestedOneWithoutCrewMemberInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutCrewMemberInput, Prisma.ApplicationUncheckedCreateWithoutCrewMemberInput>;
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutCrewMemberInput;
    connect?: Prisma.ApplicationWhereUniqueInput;
};
export type ApplicationUpdateOneRequiredWithoutCrewMemberNestedInput = {
    create?: Prisma.XOR<Prisma.ApplicationCreateWithoutCrewMemberInput, Prisma.ApplicationUncheckedCreateWithoutCrewMemberInput>;
    connectOrCreate?: Prisma.ApplicationCreateOrConnectWithoutCrewMemberInput;
    upsert?: Prisma.ApplicationUpsertWithoutCrewMemberInput;
    connect?: Prisma.ApplicationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ApplicationUpdateToOneWithWhereWithoutCrewMemberInput, Prisma.ApplicationUpdateWithoutCrewMemberInput>, Prisma.ApplicationUncheckedUpdateWithoutCrewMemberInput>;
};
export type ApplicationCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    source?: string;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutApplicationsInput;
    quickMatchOffer?: Prisma.QuickMatchOfferCreateNestedOneWithoutApplicationInput;
    crewMember?: Prisma.CrewMemberCreateNestedOneWithoutApplicationInput;
};
export type ApplicationUncheckedCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    status?: string;
    source?: string;
    quickMatchOfferId?: bigint | number | null;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    crewMember?: Prisma.CrewMemberUncheckedCreateNestedOneWithoutApplicationInput;
};
export type ApplicationCreateOrConnectWithoutWorkerProfileInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput>;
};
export type ApplicationCreateManyWorkerProfileInputEnvelope = {
    data: Prisma.ApplicationCreateManyWorkerProfileInput | Prisma.ApplicationCreateManyWorkerProfileInput[];
    skipDuplicates?: boolean;
};
export type ApplicationUpsertWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ApplicationUpdateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedUpdateWithoutWorkerProfileInput>;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedCreateWithoutWorkerProfileInput>;
};
export type ApplicationUpdateWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ApplicationUpdateWithoutWorkerProfileInput, Prisma.ApplicationUncheckedUpdateWithoutWorkerProfileInput>;
};
export type ApplicationUpdateManyWithWhereWithoutWorkerProfileInput = {
    where: Prisma.ApplicationScalarWhereInput;
    data: Prisma.XOR<Prisma.ApplicationUpdateManyMutationInput, Prisma.ApplicationUncheckedUpdateManyWithoutWorkerProfileInput>;
};
export type ApplicationScalarWhereInput = {
    AND?: Prisma.ApplicationScalarWhereInput | Prisma.ApplicationScalarWhereInput[];
    OR?: Prisma.ApplicationScalarWhereInput[];
    NOT?: Prisma.ApplicationScalarWhereInput | Prisma.ApplicationScalarWhereInput[];
    id?: Prisma.BigIntFilter<"Application"> | bigint | number;
    publicId?: Prisma.StringFilter<"Application"> | string;
    jobId?: Prisma.BigIntFilter<"Application"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"Application"> | bigint | number;
    status?: Prisma.StringFilter<"Application"> | string;
    source?: Prisma.StringFilter<"Application"> | string;
    quickMatchOfferId?: Prisma.BigIntNullableFilter<"Application"> | bigint | number | null;
    coverNote?: Prisma.StringNullableFilter<"Application"> | string | null;
    decisionNote?: Prisma.StringNullableFilter<"Application"> | string | null;
    decidedAt?: Prisma.DateTimeNullableFilter<"Application"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Application"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Application"> | Date | string;
};
export type ApplicationCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    source?: string;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutApplicationsInput;
    quickMatchOffer?: Prisma.QuickMatchOfferCreateNestedOneWithoutApplicationInput;
    crewMember?: Prisma.CrewMemberCreateNestedOneWithoutApplicationInput;
};
export type ApplicationUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    status?: string;
    source?: string;
    quickMatchOfferId?: bigint | number | null;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    crewMember?: Prisma.CrewMemberUncheckedCreateNestedOneWithoutApplicationInput;
};
export type ApplicationCreateOrConnectWithoutJobInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutJobInput, Prisma.ApplicationUncheckedCreateWithoutJobInput>;
};
export type ApplicationCreateManyJobInputEnvelope = {
    data: Prisma.ApplicationCreateManyJobInput | Prisma.ApplicationCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type ApplicationUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ApplicationUpdateWithoutJobInput, Prisma.ApplicationUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutJobInput, Prisma.ApplicationUncheckedCreateWithoutJobInput>;
};
export type ApplicationUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ApplicationUpdateWithoutJobInput, Prisma.ApplicationUncheckedUpdateWithoutJobInput>;
};
export type ApplicationUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.ApplicationScalarWhereInput;
    data: Prisma.XOR<Prisma.ApplicationUpdateManyMutationInput, Prisma.ApplicationUncheckedUpdateManyWithoutJobInput>;
};
export type ApplicationCreateWithoutQuickMatchOfferInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    source?: string;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutApplicationsInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutApplicationsInput;
    crewMember?: Prisma.CrewMemberCreateNestedOneWithoutApplicationInput;
};
export type ApplicationUncheckedCreateWithoutQuickMatchOfferInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    source?: string;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    crewMember?: Prisma.CrewMemberUncheckedCreateNestedOneWithoutApplicationInput;
};
export type ApplicationCreateOrConnectWithoutQuickMatchOfferInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedCreateWithoutQuickMatchOfferInput>;
};
export type ApplicationUpsertWithoutQuickMatchOfferInput = {
    update: Prisma.XOR<Prisma.ApplicationUpdateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedUpdateWithoutQuickMatchOfferInput>;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedCreateWithoutQuickMatchOfferInput>;
    where?: Prisma.ApplicationWhereInput;
};
export type ApplicationUpdateToOneWithWhereWithoutQuickMatchOfferInput = {
    where?: Prisma.ApplicationWhereInput;
    data: Prisma.XOR<Prisma.ApplicationUpdateWithoutQuickMatchOfferInput, Prisma.ApplicationUncheckedUpdateWithoutQuickMatchOfferInput>;
};
export type ApplicationUpdateWithoutQuickMatchOfferInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutApplicationsNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutApplicationsNestedInput;
    crewMember?: Prisma.CrewMemberUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationUncheckedUpdateWithoutQuickMatchOfferInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crewMember?: Prisma.CrewMemberUncheckedUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationCreateWithoutCrewMemberInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    source?: string;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutApplicationsInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutApplicationsInput;
    quickMatchOffer?: Prisma.QuickMatchOfferCreateNestedOneWithoutApplicationInput;
};
export type ApplicationUncheckedCreateWithoutCrewMemberInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    source?: string;
    quickMatchOfferId?: bigint | number | null;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApplicationCreateOrConnectWithoutCrewMemberInput = {
    where: Prisma.ApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutCrewMemberInput, Prisma.ApplicationUncheckedCreateWithoutCrewMemberInput>;
};
export type ApplicationUpsertWithoutCrewMemberInput = {
    update: Prisma.XOR<Prisma.ApplicationUpdateWithoutCrewMemberInput, Prisma.ApplicationUncheckedUpdateWithoutCrewMemberInput>;
    create: Prisma.XOR<Prisma.ApplicationCreateWithoutCrewMemberInput, Prisma.ApplicationUncheckedCreateWithoutCrewMemberInput>;
    where?: Prisma.ApplicationWhereInput;
};
export type ApplicationUpdateToOneWithWhereWithoutCrewMemberInput = {
    where?: Prisma.ApplicationWhereInput;
    data: Prisma.XOR<Prisma.ApplicationUpdateWithoutCrewMemberInput, Prisma.ApplicationUncheckedUpdateWithoutCrewMemberInput>;
};
export type ApplicationUpdateWithoutCrewMemberInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutApplicationsNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutApplicationsNestedInput;
    quickMatchOffer?: Prisma.QuickMatchOfferUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationUncheckedUpdateWithoutCrewMemberInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    quickMatchOfferId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApplicationCreateManyWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    status?: string;
    source?: string;
    quickMatchOfferId?: bigint | number | null;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApplicationUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutApplicationsNestedInput;
    quickMatchOffer?: Prisma.QuickMatchOfferUpdateOneWithoutApplicationNestedInput;
    crewMember?: Prisma.CrewMemberUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationUncheckedUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    quickMatchOfferId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crewMember?: Prisma.CrewMemberUncheckedUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationUncheckedUpdateManyWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    quickMatchOfferId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApplicationCreateManyJobInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    status?: string;
    source?: string;
    quickMatchOfferId?: bigint | number | null;
    coverNote?: string | null;
    decisionNote?: string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApplicationUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutApplicationsNestedInput;
    quickMatchOffer?: Prisma.QuickMatchOfferUpdateOneWithoutApplicationNestedInput;
    crewMember?: Prisma.CrewMemberUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    quickMatchOfferId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crewMember?: Prisma.CrewMemberUncheckedUpdateOneWithoutApplicationNestedInput;
};
export type ApplicationUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    quickMatchOfferId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    coverNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApplicationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    source?: boolean;
    quickMatchOfferId?: boolean;
    coverNote?: boolean;
    decisionNote?: boolean;
    decidedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    quickMatchOffer?: boolean | Prisma.Application$quickMatchOfferArgs<ExtArgs>;
    crewMember?: boolean | Prisma.Application$crewMemberArgs<ExtArgs>;
}, ExtArgs["result"]["application"]>;
export type ApplicationSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    source?: boolean;
    quickMatchOfferId?: boolean;
    coverNote?: boolean;
    decisionNote?: boolean;
    decidedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ApplicationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "jobId" | "workerProfileId" | "status" | "source" | "quickMatchOfferId" | "coverNote" | "decisionNote" | "decidedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["application"]>;
export type ApplicationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    quickMatchOffer?: boolean | Prisma.Application$quickMatchOfferArgs<ExtArgs>;
    crewMember?: boolean | Prisma.Application$crewMemberArgs<ExtArgs>;
};
export type $ApplicationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Application";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        workerProfile: Prisma.$WorkerProfilePayload<ExtArgs>;
        quickMatchOffer: Prisma.$QuickMatchOfferPayload<ExtArgs> | null;
        crewMember: Prisma.$CrewMemberPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        jobId: bigint;
        workerProfileId: bigint;
        status: string;
        source: string;
        quickMatchOfferId: bigint | null;
        coverNote: string | null;
        decisionNote: string | null;
        decidedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["application"]>;
    composites: {};
};
export type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ApplicationPayload, S>;
export type ApplicationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ApplicationCountAggregateInputType | true;
};
export interface ApplicationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Application'];
        meta: {
            name: 'Application';
        };
    };
    findUnique<T extends ApplicationFindUniqueArgs>(args: Prisma.SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ApplicationFindFirstArgs>(args?: Prisma.SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ApplicationFindManyArgs>(args?: Prisma.SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ApplicationCreateArgs>(args: Prisma.SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ApplicationCreateManyArgs>(args?: Prisma.SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ApplicationDeleteArgs>(args: Prisma.SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ApplicationUpdateArgs>(args: Prisma.SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ApplicationUpdateManyArgs>(args: Prisma.SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ApplicationUpsertArgs>(args: Prisma.SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ApplicationCountArgs>(args?: Prisma.Subset<T, ApplicationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ApplicationCountAggregateOutputType> : number>;
    aggregate<T extends ApplicationAggregateArgs>(args: Prisma.Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>;
    groupBy<T extends ApplicationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ApplicationGroupByArgs['orderBy'];
    } : {
        orderBy?: ApplicationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ApplicationFieldRefs;
}
export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    workerProfile<T extends Prisma.WorkerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkerProfileClient<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    quickMatchOffer<T extends Prisma.Application$quickMatchOfferArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Application$quickMatchOfferArgs<ExtArgs>>): Prisma.Prisma__QuickMatchOfferClient<runtime.Types.Result.GetResult<Prisma.$QuickMatchOfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    crewMember<T extends Prisma.Application$crewMemberArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Application$crewMemberArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ApplicationFieldRefs {
    readonly id: Prisma.FieldRef<"Application", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"Application", 'String'>;
    readonly jobId: Prisma.FieldRef<"Application", 'BigInt'>;
    readonly workerProfileId: Prisma.FieldRef<"Application", 'BigInt'>;
    readonly status: Prisma.FieldRef<"Application", 'String'>;
    readonly source: Prisma.FieldRef<"Application", 'String'>;
    readonly quickMatchOfferId: Prisma.FieldRef<"Application", 'BigInt'>;
    readonly coverNote: Prisma.FieldRef<"Application", 'String'>;
    readonly decisionNote: Prisma.FieldRef<"Application", 'String'>;
    readonly decidedAt: Prisma.FieldRef<"Application", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Application", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Application", 'DateTime'>;
}
export type ApplicationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where: Prisma.ApplicationWhereUniqueInput;
};
export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where: Prisma.ApplicationWhereUniqueInput;
};
export type ApplicationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where?: Prisma.ApplicationWhereInput;
    orderBy?: Prisma.ApplicationOrderByWithRelationInput | Prisma.ApplicationOrderByWithRelationInput[];
    cursor?: Prisma.ApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApplicationScalarFieldEnum | Prisma.ApplicationScalarFieldEnum[];
};
export type ApplicationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where?: Prisma.ApplicationWhereInput;
    orderBy?: Prisma.ApplicationOrderByWithRelationInput | Prisma.ApplicationOrderByWithRelationInput[];
    cursor?: Prisma.ApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApplicationScalarFieldEnum | Prisma.ApplicationScalarFieldEnum[];
};
export type ApplicationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where?: Prisma.ApplicationWhereInput;
    orderBy?: Prisma.ApplicationOrderByWithRelationInput | Prisma.ApplicationOrderByWithRelationInput[];
    cursor?: Prisma.ApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApplicationScalarFieldEnum | Prisma.ApplicationScalarFieldEnum[];
};
export type ApplicationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApplicationCreateInput, Prisma.ApplicationUncheckedCreateInput>;
};
export type ApplicationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ApplicationCreateManyInput | Prisma.ApplicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ApplicationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApplicationUpdateInput, Prisma.ApplicationUncheckedUpdateInput>;
    where: Prisma.ApplicationWhereUniqueInput;
};
export type ApplicationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ApplicationUpdateManyMutationInput, Prisma.ApplicationUncheckedUpdateManyInput>;
    where?: Prisma.ApplicationWhereInput;
    limit?: number;
};
export type ApplicationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where: Prisma.ApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApplicationCreateInput, Prisma.ApplicationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ApplicationUpdateInput, Prisma.ApplicationUncheckedUpdateInput>;
};
export type ApplicationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
    where: Prisma.ApplicationWhereUniqueInput;
};
export type ApplicationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApplicationWhereInput;
    limit?: number;
};
export type Application$quickMatchOfferArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuickMatchOfferSelect<ExtArgs> | null;
    omit?: Prisma.QuickMatchOfferOmit<ExtArgs> | null;
    include?: Prisma.QuickMatchOfferInclude<ExtArgs> | null;
    where?: Prisma.QuickMatchOfferWhereInput;
};
export type Application$crewMemberArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where?: Prisma.CrewMemberWhereInput;
};
export type ApplicationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicationSelect<ExtArgs> | null;
    omit?: Prisma.ApplicationOmit<ExtArgs> | null;
    include?: Prisma.ApplicationInclude<ExtArgs> | null;
};
