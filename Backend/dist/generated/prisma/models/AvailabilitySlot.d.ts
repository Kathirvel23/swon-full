import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AvailabilitySlotModel = runtime.Types.Result.DefaultSelection<Prisma.$AvailabilitySlotPayload>;
export type AggregateAvailabilitySlot = {
    _count: AvailabilitySlotCountAggregateOutputType | null;
    _avg: AvailabilitySlotAvgAggregateOutputType | null;
    _sum: AvailabilitySlotSumAggregateOutputType | null;
    _min: AvailabilitySlotMinAggregateOutputType | null;
    _max: AvailabilitySlotMaxAggregateOutputType | null;
};
export type AvailabilitySlotAvgAggregateOutputType = {
    id: number | null;
    workerProfileId: number | null;
    areaId: number | null;
};
export type AvailabilitySlotSumAggregateOutputType = {
    id: bigint | null;
    workerProfileId: bigint | null;
    areaId: bigint | null;
};
export type AvailabilitySlotMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    workerProfileId: bigint | null;
    workDate: Date | null;
    fromTime: Date | null;
    toTime: Date | null;
    areaId: bigint | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AvailabilitySlotMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    workerProfileId: bigint | null;
    workDate: Date | null;
    fromTime: Date | null;
    toTime: Date | null;
    areaId: bigint | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AvailabilitySlotCountAggregateOutputType = {
    id: number;
    publicId: number;
    workerProfileId: number;
    workDate: number;
    fromTime: number;
    toTime: number;
    areaId: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AvailabilitySlotAvgAggregateInputType = {
    id?: true;
    workerProfileId?: true;
    areaId?: true;
};
export type AvailabilitySlotSumAggregateInputType = {
    id?: true;
    workerProfileId?: true;
    areaId?: true;
};
export type AvailabilitySlotMinAggregateInputType = {
    id?: true;
    publicId?: true;
    workerProfileId?: true;
    workDate?: true;
    fromTime?: true;
    toTime?: true;
    areaId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AvailabilitySlotMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    workerProfileId?: true;
    workDate?: true;
    fromTime?: true;
    toTime?: true;
    areaId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AvailabilitySlotCountAggregateInputType = {
    id?: true;
    publicId?: true;
    workerProfileId?: true;
    workDate?: true;
    fromTime?: true;
    toTime?: true;
    areaId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AvailabilitySlotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilitySlotWhereInput;
    orderBy?: Prisma.AvailabilitySlotOrderByWithRelationInput | Prisma.AvailabilitySlotOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AvailabilitySlotCountAggregateInputType;
    _avg?: AvailabilitySlotAvgAggregateInputType;
    _sum?: AvailabilitySlotSumAggregateInputType;
    _min?: AvailabilitySlotMinAggregateInputType;
    _max?: AvailabilitySlotMaxAggregateInputType;
};
export type GetAvailabilitySlotAggregateType<T extends AvailabilitySlotAggregateArgs> = {
    [P in keyof T & keyof AggregateAvailabilitySlot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAvailabilitySlot[P]> : Prisma.GetScalarType<T[P], AggregateAvailabilitySlot[P]>;
};
export type AvailabilitySlotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilitySlotWhereInput;
    orderBy?: Prisma.AvailabilitySlotOrderByWithAggregationInput | Prisma.AvailabilitySlotOrderByWithAggregationInput[];
    by: Prisma.AvailabilitySlotScalarFieldEnum[] | Prisma.AvailabilitySlotScalarFieldEnum;
    having?: Prisma.AvailabilitySlotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AvailabilitySlotCountAggregateInputType | true;
    _avg?: AvailabilitySlotAvgAggregateInputType;
    _sum?: AvailabilitySlotSumAggregateInputType;
    _min?: AvailabilitySlotMinAggregateInputType;
    _max?: AvailabilitySlotMaxAggregateInputType;
};
export type AvailabilitySlotGroupByOutputType = {
    id: bigint;
    publicId: string;
    workerProfileId: bigint;
    workDate: Date;
    fromTime: Date;
    toTime: Date;
    areaId: bigint | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: AvailabilitySlotCountAggregateOutputType | null;
    _avg: AvailabilitySlotAvgAggregateOutputType | null;
    _sum: AvailabilitySlotSumAggregateOutputType | null;
    _min: AvailabilitySlotMinAggregateOutputType | null;
    _max: AvailabilitySlotMaxAggregateOutputType | null;
};
export type GetAvailabilitySlotGroupByPayload<T extends AvailabilitySlotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AvailabilitySlotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AvailabilitySlotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AvailabilitySlotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AvailabilitySlotGroupByOutputType[P]>;
}>>;
export type AvailabilitySlotWhereInput = {
    AND?: Prisma.AvailabilitySlotWhereInput | Prisma.AvailabilitySlotWhereInput[];
    OR?: Prisma.AvailabilitySlotWhereInput[];
    NOT?: Prisma.AvailabilitySlotWhereInput | Prisma.AvailabilitySlotWhereInput[];
    id?: Prisma.BigIntFilter<"AvailabilitySlot"> | bigint | number;
    publicId?: Prisma.StringFilter<"AvailabilitySlot"> | string;
    workerProfileId?: Prisma.BigIntFilter<"AvailabilitySlot"> | bigint | number;
    workDate?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    fromTime?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    toTime?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    areaId?: Prisma.BigIntNullableFilter<"AvailabilitySlot"> | bigint | number | null;
    status?: Prisma.StringFilter<"AvailabilitySlot"> | string;
    createdAt?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    area?: Prisma.XOR<Prisma.AreaNullableScalarRelationFilter, Prisma.AreaWhereInput> | null;
};
export type AvailabilitySlotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    fromTime?: Prisma.SortOrder;
    toTime?: Prisma.SortOrder;
    areaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workerProfile?: Prisma.WorkerProfileOrderByWithRelationInput;
    area?: Prisma.AreaOrderByWithRelationInput;
    _relevance?: Prisma.AvailabilitySlotOrderByRelevanceInput;
};
export type AvailabilitySlotWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    workerProfileId_workDate_fromTime_toTime?: Prisma.AvailabilitySlotWorkerProfileIdWorkDateFromTimeToTimeCompoundUniqueInput;
    AND?: Prisma.AvailabilitySlotWhereInput | Prisma.AvailabilitySlotWhereInput[];
    OR?: Prisma.AvailabilitySlotWhereInput[];
    NOT?: Prisma.AvailabilitySlotWhereInput | Prisma.AvailabilitySlotWhereInput[];
    workerProfileId?: Prisma.BigIntFilter<"AvailabilitySlot"> | bigint | number;
    workDate?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    fromTime?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    toTime?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    areaId?: Prisma.BigIntNullableFilter<"AvailabilitySlot"> | bigint | number | null;
    status?: Prisma.StringFilter<"AvailabilitySlot"> | string;
    createdAt?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    area?: Prisma.XOR<Prisma.AreaNullableScalarRelationFilter, Prisma.AreaWhereInput> | null;
}, "id" | "publicId" | "workerProfileId_workDate_fromTime_toTime">;
export type AvailabilitySlotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    fromTime?: Prisma.SortOrder;
    toTime?: Prisma.SortOrder;
    areaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AvailabilitySlotCountOrderByAggregateInput;
    _avg?: Prisma.AvailabilitySlotAvgOrderByAggregateInput;
    _max?: Prisma.AvailabilitySlotMaxOrderByAggregateInput;
    _min?: Prisma.AvailabilitySlotMinOrderByAggregateInput;
    _sum?: Prisma.AvailabilitySlotSumOrderByAggregateInput;
};
export type AvailabilitySlotScalarWhereWithAggregatesInput = {
    AND?: Prisma.AvailabilitySlotScalarWhereWithAggregatesInput | Prisma.AvailabilitySlotScalarWhereWithAggregatesInput[];
    OR?: Prisma.AvailabilitySlotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AvailabilitySlotScalarWhereWithAggregatesInput | Prisma.AvailabilitySlotScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"AvailabilitySlot"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"AvailabilitySlot"> | string;
    workerProfileId?: Prisma.BigIntWithAggregatesFilter<"AvailabilitySlot"> | bigint | number;
    workDate?: Prisma.DateTimeWithAggregatesFilter<"AvailabilitySlot"> | Date | string;
    fromTime?: Prisma.DateTimeWithAggregatesFilter<"AvailabilitySlot"> | Date | string;
    toTime?: Prisma.DateTimeWithAggregatesFilter<"AvailabilitySlot"> | Date | string;
    areaId?: Prisma.BigIntNullableWithAggregatesFilter<"AvailabilitySlot"> | bigint | number | null;
    status?: Prisma.StringWithAggregatesFilter<"AvailabilitySlot"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AvailabilitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AvailabilitySlot"> | Date | string;
};
export type AvailabilitySlotCreateInput = {
    id?: bigint | number;
    publicId?: string;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutAvailabilityInput;
    area?: Prisma.AreaCreateNestedOneWithoutAvailabilityInput;
};
export type AvailabilitySlotUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    areaId?: bigint | number | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilitySlotUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutAvailabilityNestedInput;
    area?: Prisma.AreaUpdateOneWithoutAvailabilityNestedInput;
};
export type AvailabilitySlotUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    areaId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySlotCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    areaId?: bigint | number | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilitySlotUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySlotUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    areaId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySlotListRelationFilter = {
    every?: Prisma.AvailabilitySlotWhereInput;
    some?: Prisma.AvailabilitySlotWhereInput;
    none?: Prisma.AvailabilitySlotWhereInput;
};
export type AvailabilitySlotOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AvailabilitySlotOrderByRelevanceInput = {
    fields: Prisma.AvailabilitySlotOrderByRelevanceFieldEnum | Prisma.AvailabilitySlotOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AvailabilitySlotWorkerProfileIdWorkDateFromTimeToTimeCompoundUniqueInput = {
    workerProfileId: bigint | number;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
};
export type AvailabilitySlotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    fromTime?: Prisma.SortOrder;
    toTime?: Prisma.SortOrder;
    areaId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AvailabilitySlotAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    areaId?: Prisma.SortOrder;
};
export type AvailabilitySlotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    fromTime?: Prisma.SortOrder;
    toTime?: Prisma.SortOrder;
    areaId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AvailabilitySlotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    fromTime?: Prisma.SortOrder;
    toTime?: Prisma.SortOrder;
    areaId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AvailabilitySlotSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    areaId?: Prisma.SortOrder;
};
export type AvailabilitySlotCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput> | Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput | Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
};
export type AvailabilitySlotUncheckedCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput> | Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput | Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
};
export type AvailabilitySlotUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput> | Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput | Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    disconnect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    delete?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    update?: Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.AvailabilitySlotUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.AvailabilitySlotUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.AvailabilitySlotScalarWhereInput | Prisma.AvailabilitySlotScalarWhereInput[];
};
export type AvailabilitySlotUncheckedUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput> | Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput | Prisma.AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    disconnect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    delete?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    update?: Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.AvailabilitySlotUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.AvailabilitySlotUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.AvailabilitySlotScalarWhereInput | Prisma.AvailabilitySlotScalarWhereInput[];
};
export type AvailabilitySlotCreateNestedManyWithoutAreaInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput> | Prisma.AvailabilitySlotCreateWithoutAreaInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput | Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyAreaInputEnvelope;
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
};
export type AvailabilitySlotUncheckedCreateNestedManyWithoutAreaInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput> | Prisma.AvailabilitySlotCreateWithoutAreaInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput | Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyAreaInputEnvelope;
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
};
export type AvailabilitySlotUpdateManyWithoutAreaNestedInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput> | Prisma.AvailabilitySlotCreateWithoutAreaInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput | Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput[];
    upsert?: Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutAreaInput | Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutAreaInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyAreaInputEnvelope;
    set?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    disconnect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    delete?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    update?: Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutAreaInput | Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutAreaInput[];
    updateMany?: Prisma.AvailabilitySlotUpdateManyWithWhereWithoutAreaInput | Prisma.AvailabilitySlotUpdateManyWithWhereWithoutAreaInput[];
    deleteMany?: Prisma.AvailabilitySlotScalarWhereInput | Prisma.AvailabilitySlotScalarWhereInput[];
};
export type AvailabilitySlotUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput> | Prisma.AvailabilitySlotCreateWithoutAreaInput[] | Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput[];
    connectOrCreate?: Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput | Prisma.AvailabilitySlotCreateOrConnectWithoutAreaInput[];
    upsert?: Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutAreaInput | Prisma.AvailabilitySlotUpsertWithWhereUniqueWithoutAreaInput[];
    createMany?: Prisma.AvailabilitySlotCreateManyAreaInputEnvelope;
    set?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    disconnect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    delete?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    connect?: Prisma.AvailabilitySlotWhereUniqueInput | Prisma.AvailabilitySlotWhereUniqueInput[];
    update?: Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutAreaInput | Prisma.AvailabilitySlotUpdateWithWhereUniqueWithoutAreaInput[];
    updateMany?: Prisma.AvailabilitySlotUpdateManyWithWhereWithoutAreaInput | Prisma.AvailabilitySlotUpdateManyWithWhereWithoutAreaInput[];
    deleteMany?: Prisma.AvailabilitySlotScalarWhereInput | Prisma.AvailabilitySlotScalarWhereInput[];
};
export type AvailabilitySlotCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    area?: Prisma.AreaCreateNestedOneWithoutAvailabilityInput;
};
export type AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    areaId?: bigint | number | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilitySlotCreateOrConnectWithoutWorkerProfileInput = {
    where: Prisma.AvailabilitySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput>;
};
export type AvailabilitySlotCreateManyWorkerProfileInputEnvelope = {
    data: Prisma.AvailabilitySlotCreateManyWorkerProfileInput | Prisma.AvailabilitySlotCreateManyWorkerProfileInput[];
    skipDuplicates?: boolean;
};
export type AvailabilitySlotUpsertWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.AvailabilitySlotWhereUniqueInput;
    update: Prisma.XOR<Prisma.AvailabilitySlotUpdateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedUpdateWithoutWorkerProfileInput>;
    create: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedCreateWithoutWorkerProfileInput>;
};
export type AvailabilitySlotUpdateWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.AvailabilitySlotWhereUniqueInput;
    data: Prisma.XOR<Prisma.AvailabilitySlotUpdateWithoutWorkerProfileInput, Prisma.AvailabilitySlotUncheckedUpdateWithoutWorkerProfileInput>;
};
export type AvailabilitySlotUpdateManyWithWhereWithoutWorkerProfileInput = {
    where: Prisma.AvailabilitySlotScalarWhereInput;
    data: Prisma.XOR<Prisma.AvailabilitySlotUpdateManyMutationInput, Prisma.AvailabilitySlotUncheckedUpdateManyWithoutWorkerProfileInput>;
};
export type AvailabilitySlotScalarWhereInput = {
    AND?: Prisma.AvailabilitySlotScalarWhereInput | Prisma.AvailabilitySlotScalarWhereInput[];
    OR?: Prisma.AvailabilitySlotScalarWhereInput[];
    NOT?: Prisma.AvailabilitySlotScalarWhereInput | Prisma.AvailabilitySlotScalarWhereInput[];
    id?: Prisma.BigIntFilter<"AvailabilitySlot"> | bigint | number;
    publicId?: Prisma.StringFilter<"AvailabilitySlot"> | string;
    workerProfileId?: Prisma.BigIntFilter<"AvailabilitySlot"> | bigint | number;
    workDate?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    fromTime?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    toTime?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    areaId?: Prisma.BigIntNullableFilter<"AvailabilitySlot"> | bigint | number | null;
    status?: Prisma.StringFilter<"AvailabilitySlot"> | string;
    createdAt?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AvailabilitySlot"> | Date | string;
};
export type AvailabilitySlotCreateWithoutAreaInput = {
    id?: bigint | number;
    publicId?: string;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutAvailabilityInput;
};
export type AvailabilitySlotUncheckedCreateWithoutAreaInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilitySlotCreateOrConnectWithoutAreaInput = {
    where: Prisma.AvailabilitySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput>;
};
export type AvailabilitySlotCreateManyAreaInputEnvelope = {
    data: Prisma.AvailabilitySlotCreateManyAreaInput | Prisma.AvailabilitySlotCreateManyAreaInput[];
    skipDuplicates?: boolean;
};
export type AvailabilitySlotUpsertWithWhereUniqueWithoutAreaInput = {
    where: Prisma.AvailabilitySlotWhereUniqueInput;
    update: Prisma.XOR<Prisma.AvailabilitySlotUpdateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedUpdateWithoutAreaInput>;
    create: Prisma.XOR<Prisma.AvailabilitySlotCreateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedCreateWithoutAreaInput>;
};
export type AvailabilitySlotUpdateWithWhereUniqueWithoutAreaInput = {
    where: Prisma.AvailabilitySlotWhereUniqueInput;
    data: Prisma.XOR<Prisma.AvailabilitySlotUpdateWithoutAreaInput, Prisma.AvailabilitySlotUncheckedUpdateWithoutAreaInput>;
};
export type AvailabilitySlotUpdateManyWithWhereWithoutAreaInput = {
    where: Prisma.AvailabilitySlotScalarWhereInput;
    data: Prisma.XOR<Prisma.AvailabilitySlotUpdateManyMutationInput, Prisma.AvailabilitySlotUncheckedUpdateManyWithoutAreaInput>;
};
export type AvailabilitySlotCreateManyWorkerProfileInput = {
    id?: bigint | number;
    publicId?: string;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    areaId?: bigint | number | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilitySlotUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    area?: Prisma.AreaUpdateOneWithoutAvailabilityNestedInput;
};
export type AvailabilitySlotUncheckedUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    areaId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySlotUncheckedUpdateManyWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    areaId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySlotCreateManyAreaInput = {
    id?: bigint | number;
    publicId?: string;
    workerProfileId: bigint | number;
    workDate: Date | string;
    fromTime: Date | string;
    toTime: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilitySlotUpdateWithoutAreaInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutAvailabilityNestedInput;
};
export type AvailabilitySlotUncheckedUpdateWithoutAreaInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySlotUncheckedUpdateManyWithoutAreaInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySlotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    workerProfileId?: boolean;
    workDate?: boolean;
    fromTime?: boolean;
    toTime?: boolean;
    areaId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    area?: boolean | Prisma.AvailabilitySlot$areaArgs<ExtArgs>;
}, ExtArgs["result"]["availabilitySlot"]>;
export type AvailabilitySlotSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    workerProfileId?: boolean;
    workDate?: boolean;
    fromTime?: boolean;
    toTime?: boolean;
    areaId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AvailabilitySlotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "workerProfileId" | "workDate" | "fromTime" | "toTime" | "areaId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["availabilitySlot"]>;
export type AvailabilitySlotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    area?: boolean | Prisma.AvailabilitySlot$areaArgs<ExtArgs>;
};
export type $AvailabilitySlotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AvailabilitySlot";
    objects: {
        workerProfile: Prisma.$WorkerProfilePayload<ExtArgs>;
        area: Prisma.$AreaPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        workerProfileId: bigint;
        workDate: Date;
        fromTime: Date;
        toTime: Date;
        areaId: bigint | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["availabilitySlot"]>;
    composites: {};
};
export type AvailabilitySlotGetPayload<S extends boolean | null | undefined | AvailabilitySlotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload, S>;
export type AvailabilitySlotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AvailabilitySlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AvailabilitySlotCountAggregateInputType | true;
};
export interface AvailabilitySlotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AvailabilitySlot'];
        meta: {
            name: 'AvailabilitySlot';
        };
    };
    findUnique<T extends AvailabilitySlotFindUniqueArgs>(args: Prisma.SelectSubset<T, AvailabilitySlotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AvailabilitySlotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AvailabilitySlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AvailabilitySlotFindFirstArgs>(args?: Prisma.SelectSubset<T, AvailabilitySlotFindFirstArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AvailabilitySlotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AvailabilitySlotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AvailabilitySlotFindManyArgs>(args?: Prisma.SelectSubset<T, AvailabilitySlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AvailabilitySlotCreateArgs>(args: Prisma.SelectSubset<T, AvailabilitySlotCreateArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AvailabilitySlotCreateManyArgs>(args?: Prisma.SelectSubset<T, AvailabilitySlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends AvailabilitySlotDeleteArgs>(args: Prisma.SelectSubset<T, AvailabilitySlotDeleteArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AvailabilitySlotUpdateArgs>(args: Prisma.SelectSubset<T, AvailabilitySlotUpdateArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AvailabilitySlotDeleteManyArgs>(args?: Prisma.SelectSubset<T, AvailabilitySlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AvailabilitySlotUpdateManyArgs>(args: Prisma.SelectSubset<T, AvailabilitySlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends AvailabilitySlotUpsertArgs>(args: Prisma.SelectSubset<T, AvailabilitySlotUpsertArgs<ExtArgs>>): Prisma.Prisma__AvailabilitySlotClient<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AvailabilitySlotCountArgs>(args?: Prisma.Subset<T, AvailabilitySlotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AvailabilitySlotCountAggregateOutputType> : number>;
    aggregate<T extends AvailabilitySlotAggregateArgs>(args: Prisma.Subset<T, AvailabilitySlotAggregateArgs>): Prisma.PrismaPromise<GetAvailabilitySlotAggregateType<T>>;
    groupBy<T extends AvailabilitySlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AvailabilitySlotGroupByArgs['orderBy'];
    } : {
        orderBy?: AvailabilitySlotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AvailabilitySlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailabilitySlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AvailabilitySlotFieldRefs;
}
export interface Prisma__AvailabilitySlotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workerProfile<T extends Prisma.WorkerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkerProfileClient<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    area<T extends Prisma.AvailabilitySlot$areaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AvailabilitySlot$areaArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AvailabilitySlotFieldRefs {
    readonly id: Prisma.FieldRef<"AvailabilitySlot", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"AvailabilitySlot", 'String'>;
    readonly workerProfileId: Prisma.FieldRef<"AvailabilitySlot", 'BigInt'>;
    readonly workDate: Prisma.FieldRef<"AvailabilitySlot", 'DateTime'>;
    readonly fromTime: Prisma.FieldRef<"AvailabilitySlot", 'DateTime'>;
    readonly toTime: Prisma.FieldRef<"AvailabilitySlot", 'DateTime'>;
    readonly areaId: Prisma.FieldRef<"AvailabilitySlot", 'BigInt'>;
    readonly status: Prisma.FieldRef<"AvailabilitySlot", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AvailabilitySlot", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AvailabilitySlot", 'DateTime'>;
}
export type AvailabilitySlotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    where: Prisma.AvailabilitySlotWhereUniqueInput;
};
export type AvailabilitySlotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    where: Prisma.AvailabilitySlotWhereUniqueInput;
};
export type AvailabilitySlotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    where?: Prisma.AvailabilitySlotWhereInput;
    orderBy?: Prisma.AvailabilitySlotOrderByWithRelationInput | Prisma.AvailabilitySlotOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilitySlotScalarFieldEnum | Prisma.AvailabilitySlotScalarFieldEnum[];
};
export type AvailabilitySlotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    where?: Prisma.AvailabilitySlotWhereInput;
    orderBy?: Prisma.AvailabilitySlotOrderByWithRelationInput | Prisma.AvailabilitySlotOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilitySlotScalarFieldEnum | Prisma.AvailabilitySlotScalarFieldEnum[];
};
export type AvailabilitySlotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    where?: Prisma.AvailabilitySlotWhereInput;
    orderBy?: Prisma.AvailabilitySlotOrderByWithRelationInput | Prisma.AvailabilitySlotOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilitySlotScalarFieldEnum | Prisma.AvailabilitySlotScalarFieldEnum[];
};
export type AvailabilitySlotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvailabilitySlotCreateInput, Prisma.AvailabilitySlotUncheckedCreateInput>;
};
export type AvailabilitySlotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AvailabilitySlotCreateManyInput | Prisma.AvailabilitySlotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AvailabilitySlotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvailabilitySlotUpdateInput, Prisma.AvailabilitySlotUncheckedUpdateInput>;
    where: Prisma.AvailabilitySlotWhereUniqueInput;
};
export type AvailabilitySlotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AvailabilitySlotUpdateManyMutationInput, Prisma.AvailabilitySlotUncheckedUpdateManyInput>;
    where?: Prisma.AvailabilitySlotWhereInput;
    limit?: number;
};
export type AvailabilitySlotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    where: Prisma.AvailabilitySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvailabilitySlotCreateInput, Prisma.AvailabilitySlotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AvailabilitySlotUpdateInput, Prisma.AvailabilitySlotUncheckedUpdateInput>;
};
export type AvailabilitySlotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
    where: Prisma.AvailabilitySlotWhereUniqueInput;
};
export type AvailabilitySlotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilitySlotWhereInput;
    limit?: number;
};
export type AvailabilitySlot$areaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where?: Prisma.AreaWhereInput;
};
export type AvailabilitySlotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySlotSelect<ExtArgs> | null;
    omit?: Prisma.AvailabilitySlotOmit<ExtArgs> | null;
    include?: Prisma.AvailabilitySlotInclude<ExtArgs> | null;
};
