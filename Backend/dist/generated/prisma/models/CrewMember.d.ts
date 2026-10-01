import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CrewMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$CrewMemberPayload>;
export type AggregateCrewMember = {
    _count: CrewMemberCountAggregateOutputType | null;
    _avg: CrewMemberAvgAggregateOutputType | null;
    _sum: CrewMemberSumAggregateOutputType | null;
    _min: CrewMemberMinAggregateOutputType | null;
    _max: CrewMemberMaxAggregateOutputType | null;
};
export type CrewMemberAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    applicationId: number | null;
    workerProfileId: number | null;
};
export type CrewMemberSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    applicationId: bigint | null;
    workerProfileId: bigint | null;
};
export type CrewMemberMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    applicationId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    releasedReason: string | null;
    hiredAt: Date | null;
    releasedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CrewMemberMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    applicationId: bigint | null;
    workerProfileId: bigint | null;
    status: string | null;
    releasedReason: string | null;
    hiredAt: Date | null;
    releasedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CrewMemberCountAggregateOutputType = {
    id: number;
    publicId: number;
    jobId: number;
    applicationId: number;
    workerProfileId: number;
    status: number;
    releasedReason: number;
    hiredAt: number;
    releasedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CrewMemberAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    applicationId?: true;
    workerProfileId?: true;
};
export type CrewMemberSumAggregateInputType = {
    id?: true;
    jobId?: true;
    applicationId?: true;
    workerProfileId?: true;
};
export type CrewMemberMinAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    applicationId?: true;
    workerProfileId?: true;
    status?: true;
    releasedReason?: true;
    hiredAt?: true;
    releasedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CrewMemberMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    applicationId?: true;
    workerProfileId?: true;
    status?: true;
    releasedReason?: true;
    hiredAt?: true;
    releasedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CrewMemberCountAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    applicationId?: true;
    workerProfileId?: true;
    status?: true;
    releasedReason?: true;
    hiredAt?: true;
    releasedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CrewMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CrewMemberWhereInput;
    orderBy?: Prisma.CrewMemberOrderByWithRelationInput | Prisma.CrewMemberOrderByWithRelationInput[];
    cursor?: Prisma.CrewMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CrewMemberCountAggregateInputType;
    _avg?: CrewMemberAvgAggregateInputType;
    _sum?: CrewMemberSumAggregateInputType;
    _min?: CrewMemberMinAggregateInputType;
    _max?: CrewMemberMaxAggregateInputType;
};
export type GetCrewMemberAggregateType<T extends CrewMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateCrewMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCrewMember[P]> : Prisma.GetScalarType<T[P], AggregateCrewMember[P]>;
};
export type CrewMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CrewMemberWhereInput;
    orderBy?: Prisma.CrewMemberOrderByWithAggregationInput | Prisma.CrewMemberOrderByWithAggregationInput[];
    by: Prisma.CrewMemberScalarFieldEnum[] | Prisma.CrewMemberScalarFieldEnum;
    having?: Prisma.CrewMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CrewMemberCountAggregateInputType | true;
    _avg?: CrewMemberAvgAggregateInputType;
    _sum?: CrewMemberSumAggregateInputType;
    _min?: CrewMemberMinAggregateInputType;
    _max?: CrewMemberMaxAggregateInputType;
};
export type CrewMemberGroupByOutputType = {
    id: bigint;
    publicId: string;
    jobId: bigint;
    applicationId: bigint;
    workerProfileId: bigint;
    status: string;
    releasedReason: string | null;
    hiredAt: Date;
    releasedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CrewMemberCountAggregateOutputType | null;
    _avg: CrewMemberAvgAggregateOutputType | null;
    _sum: CrewMemberSumAggregateOutputType | null;
    _min: CrewMemberMinAggregateOutputType | null;
    _max: CrewMemberMaxAggregateOutputType | null;
};
export type GetCrewMemberGroupByPayload<T extends CrewMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CrewMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CrewMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CrewMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CrewMemberGroupByOutputType[P]>;
}>>;
export type CrewMemberWhereInput = {
    AND?: Prisma.CrewMemberWhereInput | Prisma.CrewMemberWhereInput[];
    OR?: Prisma.CrewMemberWhereInput[];
    NOT?: Prisma.CrewMemberWhereInput | Prisma.CrewMemberWhereInput[];
    id?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    publicId?: Prisma.StringFilter<"CrewMember"> | string;
    jobId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    applicationId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    status?: Prisma.StringFilter<"CrewMember"> | string;
    releasedReason?: Prisma.StringNullableFilter<"CrewMember"> | string | null;
    hiredAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    releasedAt?: Prisma.DateTimeNullableFilter<"CrewMember"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    application?: Prisma.XOR<Prisma.ApplicationScalarRelationFilter, Prisma.ApplicationWhereInput>;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    attendances?: Prisma.AttendanceRecordListRelationFilter;
};
export type CrewMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    releasedReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiredAt?: Prisma.SortOrder;
    releasedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    application?: Prisma.ApplicationOrderByWithRelationInput;
    workerProfile?: Prisma.WorkerProfileOrderByWithRelationInput;
    attendances?: Prisma.AttendanceRecordOrderByRelationAggregateInput;
    _relevance?: Prisma.CrewMemberOrderByRelevanceInput;
};
export type CrewMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    applicationId?: bigint | number;
    jobId_workerProfileId?: Prisma.CrewMemberJobIdWorkerProfileIdCompoundUniqueInput;
    AND?: Prisma.CrewMemberWhereInput | Prisma.CrewMemberWhereInput[];
    OR?: Prisma.CrewMemberWhereInput[];
    NOT?: Prisma.CrewMemberWhereInput | Prisma.CrewMemberWhereInput[];
    jobId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    status?: Prisma.StringFilter<"CrewMember"> | string;
    releasedReason?: Prisma.StringNullableFilter<"CrewMember"> | string | null;
    hiredAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    releasedAt?: Prisma.DateTimeNullableFilter<"CrewMember"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    application?: Prisma.XOR<Prisma.ApplicationScalarRelationFilter, Prisma.ApplicationWhereInput>;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    attendances?: Prisma.AttendanceRecordListRelationFilter;
}, "id" | "publicId" | "applicationId" | "jobId_workerProfileId">;
export type CrewMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    releasedReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiredAt?: Prisma.SortOrder;
    releasedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CrewMemberCountOrderByAggregateInput;
    _avg?: Prisma.CrewMemberAvgOrderByAggregateInput;
    _max?: Prisma.CrewMemberMaxOrderByAggregateInput;
    _min?: Prisma.CrewMemberMinOrderByAggregateInput;
    _sum?: Prisma.CrewMemberSumOrderByAggregateInput;
};
export type CrewMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.CrewMemberScalarWhereWithAggregatesInput | Prisma.CrewMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.CrewMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CrewMemberScalarWhereWithAggregatesInput | Prisma.CrewMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"CrewMember"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"CrewMember"> | string;
    jobId?: Prisma.BigIntWithAggregatesFilter<"CrewMember"> | bigint | number;
    applicationId?: Prisma.BigIntWithAggregatesFilter<"CrewMember"> | bigint | number;
    workerProfileId?: Prisma.BigIntWithAggregatesFilter<"CrewMember"> | bigint | number;
    status?: Prisma.StringWithAggregatesFilter<"CrewMember"> | string;
    releasedReason?: Prisma.StringNullableWithAggregatesFilter<"CrewMember"> | string | null;
    hiredAt?: Prisma.DateTimeWithAggregatesFilter<"CrewMember"> | Date | string;
    releasedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CrewMember"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CrewMember"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CrewMember"> | Date | string;
};
export type CrewMemberCreateInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutCrewInput;
    application: Prisma.ApplicationCreateNestedOneWithoutCrewMemberInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutCrewMembershipsInput;
    attendances?: Prisma.AttendanceRecordCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    applicationId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutCrewNestedInput;
    application?: Prisma.ApplicationUpdateOneRequiredWithoutCrewMemberNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutCrewMembershipsNestedInput;
    attendances?: Prisma.AttendanceRecordUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    applicationId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    applicationId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CrewMemberUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CrewMemberUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    applicationId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CrewMemberListRelationFilter = {
    every?: Prisma.CrewMemberWhereInput;
    some?: Prisma.CrewMemberWhereInput;
    none?: Prisma.CrewMemberWhereInput;
};
export type CrewMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CrewMemberNullableScalarRelationFilter = {
    is?: Prisma.CrewMemberWhereInput | null;
    isNot?: Prisma.CrewMemberWhereInput | null;
};
export type CrewMemberOrderByRelevanceInput = {
    fields: Prisma.CrewMemberOrderByRelevanceFieldEnum | Prisma.CrewMemberOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type CrewMemberJobIdWorkerProfileIdCompoundUniqueInput = {
    jobId: bigint | number;
    workerProfileId: bigint | number;
};
export type CrewMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    releasedReason?: Prisma.SortOrder;
    hiredAt?: Prisma.SortOrder;
    releasedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CrewMemberAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
};
export type CrewMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    releasedReason?: Prisma.SortOrder;
    hiredAt?: Prisma.SortOrder;
    releasedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CrewMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    releasedReason?: Prisma.SortOrder;
    hiredAt?: Prisma.SortOrder;
    releasedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CrewMemberSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
};
export type CrewMemberScalarRelationFilter = {
    is?: Prisma.CrewMemberWhereInput;
    isNot?: Prisma.CrewMemberWhereInput;
};
export type CrewMemberCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput> | Prisma.CrewMemberCreateWithoutWorkerProfileInput[] | Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput | Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.CrewMemberCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
};
export type CrewMemberUncheckedCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput> | Prisma.CrewMemberCreateWithoutWorkerProfileInput[] | Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput | Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.CrewMemberCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
};
export type CrewMemberUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput> | Prisma.CrewMemberCreateWithoutWorkerProfileInput[] | Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput | Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.CrewMemberUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.CrewMemberUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.CrewMemberCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    disconnect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    delete?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    update?: Prisma.CrewMemberUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.CrewMemberUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.CrewMemberUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.CrewMemberUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.CrewMemberScalarWhereInput | Prisma.CrewMemberScalarWhereInput[];
};
export type CrewMemberUncheckedUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput> | Prisma.CrewMemberCreateWithoutWorkerProfileInput[] | Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput | Prisma.CrewMemberCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.CrewMemberUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.CrewMemberUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.CrewMemberCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    disconnect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    delete?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    update?: Prisma.CrewMemberUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.CrewMemberUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.CrewMemberUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.CrewMemberUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.CrewMemberScalarWhereInput | Prisma.CrewMemberScalarWhereInput[];
};
export type CrewMemberCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutJobInput, Prisma.CrewMemberUncheckedCreateWithoutJobInput> | Prisma.CrewMemberCreateWithoutJobInput[] | Prisma.CrewMemberUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutJobInput | Prisma.CrewMemberCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.CrewMemberCreateManyJobInputEnvelope;
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
};
export type CrewMemberUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutJobInput, Prisma.CrewMemberUncheckedCreateWithoutJobInput> | Prisma.CrewMemberCreateWithoutJobInput[] | Prisma.CrewMemberUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutJobInput | Prisma.CrewMemberCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.CrewMemberCreateManyJobInputEnvelope;
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
};
export type CrewMemberUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutJobInput, Prisma.CrewMemberUncheckedCreateWithoutJobInput> | Prisma.CrewMemberCreateWithoutJobInput[] | Prisma.CrewMemberUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutJobInput | Prisma.CrewMemberCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.CrewMemberUpsertWithWhereUniqueWithoutJobInput | Prisma.CrewMemberUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.CrewMemberCreateManyJobInputEnvelope;
    set?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    disconnect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    delete?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    update?: Prisma.CrewMemberUpdateWithWhereUniqueWithoutJobInput | Prisma.CrewMemberUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.CrewMemberUpdateManyWithWhereWithoutJobInput | Prisma.CrewMemberUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.CrewMemberScalarWhereInput | Prisma.CrewMemberScalarWhereInput[];
};
export type CrewMemberUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutJobInput, Prisma.CrewMemberUncheckedCreateWithoutJobInput> | Prisma.CrewMemberCreateWithoutJobInput[] | Prisma.CrewMemberUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutJobInput | Prisma.CrewMemberCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.CrewMemberUpsertWithWhereUniqueWithoutJobInput | Prisma.CrewMemberUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.CrewMemberCreateManyJobInputEnvelope;
    set?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    disconnect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    delete?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    connect?: Prisma.CrewMemberWhereUniqueInput | Prisma.CrewMemberWhereUniqueInput[];
    update?: Prisma.CrewMemberUpdateWithWhereUniqueWithoutJobInput | Prisma.CrewMemberUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.CrewMemberUpdateManyWithWhereWithoutJobInput | Prisma.CrewMemberUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.CrewMemberScalarWhereInput | Prisma.CrewMemberScalarWhereInput[];
};
export type CrewMemberCreateNestedOneWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutApplicationInput, Prisma.CrewMemberUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutApplicationInput;
    connect?: Prisma.CrewMemberWhereUniqueInput;
};
export type CrewMemberUncheckedCreateNestedOneWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutApplicationInput, Prisma.CrewMemberUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutApplicationInput;
    connect?: Prisma.CrewMemberWhereUniqueInput;
};
export type CrewMemberUpdateOneWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutApplicationInput, Prisma.CrewMemberUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutApplicationInput;
    upsert?: Prisma.CrewMemberUpsertWithoutApplicationInput;
    disconnect?: Prisma.CrewMemberWhereInput | boolean;
    delete?: Prisma.CrewMemberWhereInput | boolean;
    connect?: Prisma.CrewMemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CrewMemberUpdateToOneWithWhereWithoutApplicationInput, Prisma.CrewMemberUpdateWithoutApplicationInput>, Prisma.CrewMemberUncheckedUpdateWithoutApplicationInput>;
};
export type CrewMemberUncheckedUpdateOneWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutApplicationInput, Prisma.CrewMemberUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutApplicationInput;
    upsert?: Prisma.CrewMemberUpsertWithoutApplicationInput;
    disconnect?: Prisma.CrewMemberWhereInput | boolean;
    delete?: Prisma.CrewMemberWhereInput | boolean;
    connect?: Prisma.CrewMemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CrewMemberUpdateToOneWithWhereWithoutApplicationInput, Prisma.CrewMemberUpdateWithoutApplicationInput>, Prisma.CrewMemberUncheckedUpdateWithoutApplicationInput>;
};
export type CrewMemberCreateNestedOneWithoutAttendancesInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutAttendancesInput, Prisma.CrewMemberUncheckedCreateWithoutAttendancesInput>;
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutAttendancesInput;
    connect?: Prisma.CrewMemberWhereUniqueInput;
};
export type CrewMemberUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: Prisma.XOR<Prisma.CrewMemberCreateWithoutAttendancesInput, Prisma.CrewMemberUncheckedCreateWithoutAttendancesInput>;
    connectOrCreate?: Prisma.CrewMemberCreateOrConnectWithoutAttendancesInput;
    upsert?: Prisma.CrewMemberUpsertWithoutAttendancesInput;
    connect?: Prisma.CrewMemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CrewMemberUpdateToOneWithWhereWithoutAttendancesInput, Prisma.CrewMemberUpdateWithoutAttendancesInput>, Prisma.CrewMemberUncheckedUpdateWithoutAttendancesInput>;
};
export type CrewMemberCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutCrewInput;
    application: Prisma.ApplicationCreateNestedOneWithoutCrewMemberInput;
    attendances?: Prisma.AttendanceRecordCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberUncheckedCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    applicationId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberCreateOrConnectWithoutWorkerProfileInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput>;
};
export type CrewMemberCreateManyWorkerProfileInputEnvelope = {
    data: Prisma.CrewMemberCreateManyWorkerProfileInput | Prisma.CrewMemberCreateManyWorkerProfileInput[];
    skipDuplicates?: boolean;
};
export type CrewMemberUpsertWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.CrewMemberUpdateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedUpdateWithoutWorkerProfileInput>;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedCreateWithoutWorkerProfileInput>;
};
export type CrewMemberUpdateWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.CrewMemberUpdateWithoutWorkerProfileInput, Prisma.CrewMemberUncheckedUpdateWithoutWorkerProfileInput>;
};
export type CrewMemberUpdateManyWithWhereWithoutWorkerProfileInput = {
    where: Prisma.CrewMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.CrewMemberUpdateManyMutationInput, Prisma.CrewMemberUncheckedUpdateManyWithoutWorkerProfileInput>;
};
export type CrewMemberScalarWhereInput = {
    AND?: Prisma.CrewMemberScalarWhereInput | Prisma.CrewMemberScalarWhereInput[];
    OR?: Prisma.CrewMemberScalarWhereInput[];
    NOT?: Prisma.CrewMemberScalarWhereInput | Prisma.CrewMemberScalarWhereInput[];
    id?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    publicId?: Prisma.StringFilter<"CrewMember"> | string;
    jobId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    applicationId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"CrewMember"> | bigint | number;
    status?: Prisma.StringFilter<"CrewMember"> | string;
    releasedReason?: Prisma.StringNullableFilter<"CrewMember"> | string | null;
    hiredAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    releasedAt?: Prisma.DateTimeNullableFilter<"CrewMember"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CrewMember"> | Date | string;
};
export type CrewMemberCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    application: Prisma.ApplicationCreateNestedOneWithoutCrewMemberInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutCrewMembershipsInput;
    attendances?: Prisma.AttendanceRecordCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    applicationId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberCreateOrConnectWithoutJobInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutJobInput, Prisma.CrewMemberUncheckedCreateWithoutJobInput>;
};
export type CrewMemberCreateManyJobInputEnvelope = {
    data: Prisma.CrewMemberCreateManyJobInput | Prisma.CrewMemberCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type CrewMemberUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.CrewMemberUpdateWithoutJobInput, Prisma.CrewMemberUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutJobInput, Prisma.CrewMemberUncheckedCreateWithoutJobInput>;
};
export type CrewMemberUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.CrewMemberUpdateWithoutJobInput, Prisma.CrewMemberUncheckedUpdateWithoutJobInput>;
};
export type CrewMemberUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.CrewMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.CrewMemberUpdateManyMutationInput, Prisma.CrewMemberUncheckedUpdateManyWithoutJobInput>;
};
export type CrewMemberCreateWithoutApplicationInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutCrewInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutCrewMembershipsInput;
    attendances?: Prisma.AttendanceRecordCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberUncheckedCreateWithoutApplicationInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedCreateNestedManyWithoutCrewMemberInput;
};
export type CrewMemberCreateOrConnectWithoutApplicationInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutApplicationInput, Prisma.CrewMemberUncheckedCreateWithoutApplicationInput>;
};
export type CrewMemberUpsertWithoutApplicationInput = {
    update: Prisma.XOR<Prisma.CrewMemberUpdateWithoutApplicationInput, Prisma.CrewMemberUncheckedUpdateWithoutApplicationInput>;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutApplicationInput, Prisma.CrewMemberUncheckedCreateWithoutApplicationInput>;
    where?: Prisma.CrewMemberWhereInput;
};
export type CrewMemberUpdateToOneWithWhereWithoutApplicationInput = {
    where?: Prisma.CrewMemberWhereInput;
    data: Prisma.XOR<Prisma.CrewMemberUpdateWithoutApplicationInput, Prisma.CrewMemberUncheckedUpdateWithoutApplicationInput>;
};
export type CrewMemberUpdateWithoutApplicationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutCrewNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutCrewMembershipsNestedInput;
    attendances?: Prisma.AttendanceRecordUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberUncheckedUpdateWithoutApplicationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberCreateWithoutAttendancesInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutCrewInput;
    application: Prisma.ApplicationCreateNestedOneWithoutCrewMemberInput;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutCrewMembershipsInput;
};
export type CrewMemberUncheckedCreateWithoutAttendancesInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    applicationId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CrewMemberCreateOrConnectWithoutAttendancesInput = {
    where: Prisma.CrewMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutAttendancesInput, Prisma.CrewMemberUncheckedCreateWithoutAttendancesInput>;
};
export type CrewMemberUpsertWithoutAttendancesInput = {
    update: Prisma.XOR<Prisma.CrewMemberUpdateWithoutAttendancesInput, Prisma.CrewMemberUncheckedUpdateWithoutAttendancesInput>;
    create: Prisma.XOR<Prisma.CrewMemberCreateWithoutAttendancesInput, Prisma.CrewMemberUncheckedCreateWithoutAttendancesInput>;
    where?: Prisma.CrewMemberWhereInput;
};
export type CrewMemberUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: Prisma.CrewMemberWhereInput;
    data: Prisma.XOR<Prisma.CrewMemberUpdateWithoutAttendancesInput, Prisma.CrewMemberUncheckedUpdateWithoutAttendancesInput>;
};
export type CrewMemberUpdateWithoutAttendancesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutCrewNestedInput;
    application?: Prisma.ApplicationUpdateOneRequiredWithoutCrewMemberNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutCrewMembershipsNestedInput;
};
export type CrewMemberUncheckedUpdateWithoutAttendancesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    applicationId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CrewMemberCreateManyWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    applicationId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CrewMemberUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutCrewNestedInput;
    application?: Prisma.ApplicationUpdateOneRequiredWithoutCrewMemberNestedInput;
    attendances?: Prisma.AttendanceRecordUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberUncheckedUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    applicationId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberUncheckedUpdateManyWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    applicationId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CrewMemberCreateManyJobInput = {
    id?: bigint | number;
    publicId?: string;
    applicationId: bigint | number;
    workerProfileId: bigint | number;
    status?: string;
    releasedReason?: string | null;
    hiredAt?: Date | string;
    releasedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CrewMemberUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    application?: Prisma.ApplicationUpdateOneRequiredWithoutCrewMemberNestedInput;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutCrewMembershipsNestedInput;
    attendances?: Prisma.AttendanceRecordUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attendances?: Prisma.AttendanceRecordUncheckedUpdateManyWithoutCrewMemberNestedInput;
};
export type CrewMemberUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    releasedReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    releasedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CrewMemberCountOutputType = {
    attendances: number;
};
export type CrewMemberCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attendances?: boolean | CrewMemberCountOutputTypeCountAttendancesArgs;
};
export type CrewMemberCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberCountOutputTypeSelect<ExtArgs> | null;
};
export type CrewMemberCountOutputTypeCountAttendancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceRecordWhereInput;
};
export type CrewMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    applicationId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    releasedReason?: boolean;
    hiredAt?: boolean;
    releasedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    attendances?: boolean | Prisma.CrewMember$attendancesArgs<ExtArgs>;
    _count?: boolean | Prisma.CrewMemberCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["crewMember"]>;
export type CrewMemberSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    applicationId?: boolean;
    workerProfileId?: boolean;
    status?: boolean;
    releasedReason?: boolean;
    hiredAt?: boolean;
    releasedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CrewMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "jobId" | "applicationId" | "workerProfileId" | "status" | "releasedReason" | "hiredAt" | "releasedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["crewMember"]>;
export type CrewMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    attendances?: boolean | Prisma.CrewMember$attendancesArgs<ExtArgs>;
    _count?: boolean | Prisma.CrewMemberCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $CrewMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CrewMember";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        application: Prisma.$ApplicationPayload<ExtArgs>;
        workerProfile: Prisma.$WorkerProfilePayload<ExtArgs>;
        attendances: Prisma.$AttendanceRecordPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        jobId: bigint;
        applicationId: bigint;
        workerProfileId: bigint;
        status: string;
        releasedReason: string | null;
        hiredAt: Date;
        releasedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["crewMember"]>;
    composites: {};
};
export type CrewMemberGetPayload<S extends boolean | null | undefined | CrewMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload, S>;
export type CrewMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CrewMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CrewMemberCountAggregateInputType | true;
};
export interface CrewMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CrewMember'];
        meta: {
            name: 'CrewMember';
        };
    };
    findUnique<T extends CrewMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, CrewMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CrewMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CrewMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CrewMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, CrewMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CrewMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CrewMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CrewMemberFindManyArgs>(args?: Prisma.SelectSubset<T, CrewMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CrewMemberCreateArgs>(args: Prisma.SelectSubset<T, CrewMemberCreateArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CrewMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, CrewMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends CrewMemberDeleteArgs>(args: Prisma.SelectSubset<T, CrewMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CrewMemberUpdateArgs>(args: Prisma.SelectSubset<T, CrewMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CrewMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, CrewMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CrewMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, CrewMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends CrewMemberUpsertArgs>(args: Prisma.SelectSubset<T, CrewMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__CrewMemberClient<runtime.Types.Result.GetResult<Prisma.$CrewMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CrewMemberCountArgs>(args?: Prisma.Subset<T, CrewMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CrewMemberCountAggregateOutputType> : number>;
    aggregate<T extends CrewMemberAggregateArgs>(args: Prisma.Subset<T, CrewMemberAggregateArgs>): Prisma.PrismaPromise<GetCrewMemberAggregateType<T>>;
    groupBy<T extends CrewMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CrewMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: CrewMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CrewMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrewMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CrewMemberFieldRefs;
}
export interface Prisma__CrewMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    application<T extends Prisma.ApplicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ApplicationDefaultArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    workerProfile<T extends Prisma.WorkerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkerProfileClient<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    attendances<T extends Prisma.CrewMember$attendancesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CrewMember$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CrewMemberFieldRefs {
    readonly id: Prisma.FieldRef<"CrewMember", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"CrewMember", 'String'>;
    readonly jobId: Prisma.FieldRef<"CrewMember", 'BigInt'>;
    readonly applicationId: Prisma.FieldRef<"CrewMember", 'BigInt'>;
    readonly workerProfileId: Prisma.FieldRef<"CrewMember", 'BigInt'>;
    readonly status: Prisma.FieldRef<"CrewMember", 'String'>;
    readonly releasedReason: Prisma.FieldRef<"CrewMember", 'String'>;
    readonly hiredAt: Prisma.FieldRef<"CrewMember", 'DateTime'>;
    readonly releasedAt: Prisma.FieldRef<"CrewMember", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CrewMember", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CrewMember", 'DateTime'>;
}
export type CrewMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where: Prisma.CrewMemberWhereUniqueInput;
};
export type CrewMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where: Prisma.CrewMemberWhereUniqueInput;
};
export type CrewMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where?: Prisma.CrewMemberWhereInput;
    orderBy?: Prisma.CrewMemberOrderByWithRelationInput | Prisma.CrewMemberOrderByWithRelationInput[];
    cursor?: Prisma.CrewMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CrewMemberScalarFieldEnum | Prisma.CrewMemberScalarFieldEnum[];
};
export type CrewMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where?: Prisma.CrewMemberWhereInput;
    orderBy?: Prisma.CrewMemberOrderByWithRelationInput | Prisma.CrewMemberOrderByWithRelationInput[];
    cursor?: Prisma.CrewMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CrewMemberScalarFieldEnum | Prisma.CrewMemberScalarFieldEnum[];
};
export type CrewMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where?: Prisma.CrewMemberWhereInput;
    orderBy?: Prisma.CrewMemberOrderByWithRelationInput | Prisma.CrewMemberOrderByWithRelationInput[];
    cursor?: Prisma.CrewMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CrewMemberScalarFieldEnum | Prisma.CrewMemberScalarFieldEnum[];
};
export type CrewMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CrewMemberCreateInput, Prisma.CrewMemberUncheckedCreateInput>;
};
export type CrewMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CrewMemberCreateManyInput | Prisma.CrewMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CrewMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CrewMemberUpdateInput, Prisma.CrewMemberUncheckedUpdateInput>;
    where: Prisma.CrewMemberWhereUniqueInput;
};
export type CrewMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CrewMemberUpdateManyMutationInput, Prisma.CrewMemberUncheckedUpdateManyInput>;
    where?: Prisma.CrewMemberWhereInput;
    limit?: number;
};
export type CrewMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where: Prisma.CrewMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.CrewMemberCreateInput, Prisma.CrewMemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CrewMemberUpdateInput, Prisma.CrewMemberUncheckedUpdateInput>;
};
export type CrewMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
    where: Prisma.CrewMemberWhereUniqueInput;
};
export type CrewMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CrewMemberWhereInput;
    limit?: number;
};
export type CrewMember$attendancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceRecordSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceRecordOmit<ExtArgs> | null;
    include?: Prisma.AttendanceRecordInclude<ExtArgs> | null;
    where?: Prisma.AttendanceRecordWhereInput;
    orderBy?: Prisma.AttendanceRecordOrderByWithRelationInput | Prisma.AttendanceRecordOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendanceRecordScalarFieldEnum | Prisma.AttendanceRecordScalarFieldEnum[];
};
export type CrewMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrewMemberSelect<ExtArgs> | null;
    omit?: Prisma.CrewMemberOmit<ExtArgs> | null;
    include?: Prisma.CrewMemberInclude<ExtArgs> | null;
};
