import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AreaModel = runtime.Types.Result.DefaultSelection<Prisma.$AreaPayload>;
export type AggregateArea = {
    _count: AreaCountAggregateOutputType | null;
    _avg: AreaAvgAggregateOutputType | null;
    _sum: AreaSumAggregateOutputType | null;
    _min: AreaMinAggregateOutputType | null;
    _max: AreaMaxAggregateOutputType | null;
};
export type AreaAvgAggregateOutputType = {
    id: number | null;
    lat: runtime.Decimal | null;
    lng: runtime.Decimal | null;
    sortOrder: number | null;
};
export type AreaSumAggregateOutputType = {
    id: bigint | null;
    lat: runtime.Decimal | null;
    lng: runtime.Decimal | null;
    sortOrder: number | null;
};
export type AreaMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    city: string | null;
    name: string | null;
    nameTa: string | null;
    lat: runtime.Decimal | null;
    lng: runtime.Decimal | null;
    active: boolean | null;
    sortOrder: number | null;
};
export type AreaMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    city: string | null;
    name: string | null;
    nameTa: string | null;
    lat: runtime.Decimal | null;
    lng: runtime.Decimal | null;
    active: boolean | null;
    sortOrder: number | null;
};
export type AreaCountAggregateOutputType = {
    id: number;
    publicId: number;
    city: number;
    name: number;
    nameTa: number;
    lat: number;
    lng: number;
    active: number;
    sortOrder: number;
    _all: number;
};
export type AreaAvgAggregateInputType = {
    id?: true;
    lat?: true;
    lng?: true;
    sortOrder?: true;
};
export type AreaSumAggregateInputType = {
    id?: true;
    lat?: true;
    lng?: true;
    sortOrder?: true;
};
export type AreaMinAggregateInputType = {
    id?: true;
    publicId?: true;
    city?: true;
    name?: true;
    nameTa?: true;
    lat?: true;
    lng?: true;
    active?: true;
    sortOrder?: true;
};
export type AreaMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    city?: true;
    name?: true;
    nameTa?: true;
    lat?: true;
    lng?: true;
    active?: true;
    sortOrder?: true;
};
export type AreaCountAggregateInputType = {
    id?: true;
    publicId?: true;
    city?: true;
    name?: true;
    nameTa?: true;
    lat?: true;
    lng?: true;
    active?: true;
    sortOrder?: true;
    _all?: true;
};
export type AreaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AreaWhereInput;
    orderBy?: Prisma.AreaOrderByWithRelationInput | Prisma.AreaOrderByWithRelationInput[];
    cursor?: Prisma.AreaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AreaCountAggregateInputType;
    _avg?: AreaAvgAggregateInputType;
    _sum?: AreaSumAggregateInputType;
    _min?: AreaMinAggregateInputType;
    _max?: AreaMaxAggregateInputType;
};
export type GetAreaAggregateType<T extends AreaAggregateArgs> = {
    [P in keyof T & keyof AggregateArea]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateArea[P]> : Prisma.GetScalarType<T[P], AggregateArea[P]>;
};
export type AreaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AreaWhereInput;
    orderBy?: Prisma.AreaOrderByWithAggregationInput | Prisma.AreaOrderByWithAggregationInput[];
    by: Prisma.AreaScalarFieldEnum[] | Prisma.AreaScalarFieldEnum;
    having?: Prisma.AreaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AreaCountAggregateInputType | true;
    _avg?: AreaAvgAggregateInputType;
    _sum?: AreaSumAggregateInputType;
    _min?: AreaMinAggregateInputType;
    _max?: AreaMaxAggregateInputType;
};
export type AreaGroupByOutputType = {
    id: bigint;
    publicId: string;
    city: string;
    name: string;
    nameTa: string | null;
    lat: runtime.Decimal | null;
    lng: runtime.Decimal | null;
    active: boolean;
    sortOrder: number;
    _count: AreaCountAggregateOutputType | null;
    _avg: AreaAvgAggregateOutputType | null;
    _sum: AreaSumAggregateOutputType | null;
    _min: AreaMinAggregateOutputType | null;
    _max: AreaMaxAggregateOutputType | null;
};
export type GetAreaGroupByPayload<T extends AreaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AreaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AreaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AreaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AreaGroupByOutputType[P]>;
}>>;
export type AreaWhereInput = {
    AND?: Prisma.AreaWhereInput | Prisma.AreaWhereInput[];
    OR?: Prisma.AreaWhereInput[];
    NOT?: Prisma.AreaWhereInput | Prisma.AreaWhereInput[];
    id?: Prisma.BigIntFilter<"Area"> | bigint | number;
    publicId?: Prisma.StringFilter<"Area"> | string;
    city?: Prisma.StringFilter<"Area"> | string;
    name?: Prisma.StringFilter<"Area"> | string;
    nameTa?: Prisma.StringNullableFilter<"Area"> | string | null;
    lat?: Prisma.DecimalNullableFilter<"Area"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.DecimalNullableFilter<"Area"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFilter<"Area"> | boolean;
    sortOrder?: Prisma.IntFilter<"Area"> | number;
    workerProfiles?: Prisma.WorkerProfileListRelationFilter;
    employerProfiles?: Prisma.EmployerProfileListRelationFilter;
    jobs?: Prisma.JobListRelationFilter;
    availability?: Prisma.AvailabilitySlotListRelationFilter;
};
export type AreaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    lat?: Prisma.SortOrderInput | Prisma.SortOrder;
    lng?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    workerProfiles?: Prisma.WorkerProfileOrderByRelationAggregateInput;
    employerProfiles?: Prisma.EmployerProfileOrderByRelationAggregateInput;
    jobs?: Prisma.JobOrderByRelationAggregateInput;
    availability?: Prisma.AvailabilitySlotOrderByRelationAggregateInput;
    _relevance?: Prisma.AreaOrderByRelevanceInput;
};
export type AreaWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    city_name?: Prisma.AreaCityNameCompoundUniqueInput;
    AND?: Prisma.AreaWhereInput | Prisma.AreaWhereInput[];
    OR?: Prisma.AreaWhereInput[];
    NOT?: Prisma.AreaWhereInput | Prisma.AreaWhereInput[];
    city?: Prisma.StringFilter<"Area"> | string;
    name?: Prisma.StringFilter<"Area"> | string;
    nameTa?: Prisma.StringNullableFilter<"Area"> | string | null;
    lat?: Prisma.DecimalNullableFilter<"Area"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.DecimalNullableFilter<"Area"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFilter<"Area"> | boolean;
    sortOrder?: Prisma.IntFilter<"Area"> | number;
    workerProfiles?: Prisma.WorkerProfileListRelationFilter;
    employerProfiles?: Prisma.EmployerProfileListRelationFilter;
    jobs?: Prisma.JobListRelationFilter;
    availability?: Prisma.AvailabilitySlotListRelationFilter;
}, "id" | "publicId" | "city_name">;
export type AreaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    lat?: Prisma.SortOrderInput | Prisma.SortOrder;
    lng?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    _count?: Prisma.AreaCountOrderByAggregateInput;
    _avg?: Prisma.AreaAvgOrderByAggregateInput;
    _max?: Prisma.AreaMaxOrderByAggregateInput;
    _min?: Prisma.AreaMinOrderByAggregateInput;
    _sum?: Prisma.AreaSumOrderByAggregateInput;
};
export type AreaScalarWhereWithAggregatesInput = {
    AND?: Prisma.AreaScalarWhereWithAggregatesInput | Prisma.AreaScalarWhereWithAggregatesInput[];
    OR?: Prisma.AreaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AreaScalarWhereWithAggregatesInput | Prisma.AreaScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Area"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"Area"> | string;
    city?: Prisma.StringWithAggregatesFilter<"Area"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Area"> | string;
    nameTa?: Prisma.StringNullableWithAggregatesFilter<"Area"> | string | null;
    lat?: Prisma.DecimalNullableWithAggregatesFilter<"Area"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.DecimalNullableWithAggregatesFilter<"Area"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolWithAggregatesFilter<"Area"> | boolean;
    sortOrder?: Prisma.IntWithAggregatesFilter<"Area"> | number;
};
export type AreaCreateInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileCreateNestedManyWithoutAreaInput;
    employerProfiles?: Prisma.EmployerProfileCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotCreateNestedManyWithoutAreaInput;
};
export type AreaUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileUncheckedCreateNestedManyWithoutAreaInput;
    employerProfiles?: Prisma.EmployerProfileUncheckedCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotUncheckedCreateNestedManyWithoutAreaInput;
};
export type AreaUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUpdateManyWithoutAreaNestedInput;
    employerProfiles?: Prisma.EmployerProfileUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUpdateManyWithoutAreaNestedInput;
};
export type AreaUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    employerProfiles?: Prisma.EmployerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUncheckedUpdateManyWithoutAreaNestedInput;
};
export type AreaCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
};
export type AreaUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AreaUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AreaNullableScalarRelationFilter = {
    is?: Prisma.AreaWhereInput | null;
    isNot?: Prisma.AreaWhereInput | null;
};
export type AreaScalarRelationFilter = {
    is?: Prisma.AreaWhereInput;
    isNot?: Prisma.AreaWhereInput;
};
export type AreaOrderByRelevanceInput = {
    fields: Prisma.AreaOrderByRelevanceFieldEnum | Prisma.AreaOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AreaCityNameCompoundUniqueInput = {
    city: string;
    name: string;
};
export type AreaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type AreaAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type AreaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type AreaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type AreaSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type AreaCreateNestedOneWithoutWorkerProfilesInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutWorkerProfilesInput, Prisma.AreaUncheckedCreateWithoutWorkerProfilesInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutWorkerProfilesInput;
    connect?: Prisma.AreaWhereUniqueInput;
};
export type AreaUpdateOneWithoutWorkerProfilesNestedInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutWorkerProfilesInput, Prisma.AreaUncheckedCreateWithoutWorkerProfilesInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutWorkerProfilesInput;
    upsert?: Prisma.AreaUpsertWithoutWorkerProfilesInput;
    disconnect?: Prisma.AreaWhereInput | boolean;
    delete?: Prisma.AreaWhereInput | boolean;
    connect?: Prisma.AreaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AreaUpdateToOneWithWhereWithoutWorkerProfilesInput, Prisma.AreaUpdateWithoutWorkerProfilesInput>, Prisma.AreaUncheckedUpdateWithoutWorkerProfilesInput>;
};
export type AreaCreateNestedOneWithoutEmployerProfilesInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutEmployerProfilesInput, Prisma.AreaUncheckedCreateWithoutEmployerProfilesInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutEmployerProfilesInput;
    connect?: Prisma.AreaWhereUniqueInput;
};
export type AreaUpdateOneRequiredWithoutEmployerProfilesNestedInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutEmployerProfilesInput, Prisma.AreaUncheckedCreateWithoutEmployerProfilesInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutEmployerProfilesInput;
    upsert?: Prisma.AreaUpsertWithoutEmployerProfilesInput;
    connect?: Prisma.AreaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AreaUpdateToOneWithWhereWithoutEmployerProfilesInput, Prisma.AreaUpdateWithoutEmployerProfilesInput>, Prisma.AreaUncheckedUpdateWithoutEmployerProfilesInput>;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type AreaCreateNestedOneWithoutJobsInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutJobsInput, Prisma.AreaUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutJobsInput;
    connect?: Prisma.AreaWhereUniqueInput;
};
export type AreaUpdateOneRequiredWithoutJobsNestedInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutJobsInput, Prisma.AreaUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutJobsInput;
    upsert?: Prisma.AreaUpsertWithoutJobsInput;
    connect?: Prisma.AreaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AreaUpdateToOneWithWhereWithoutJobsInput, Prisma.AreaUpdateWithoutJobsInput>, Prisma.AreaUncheckedUpdateWithoutJobsInput>;
};
export type AreaCreateNestedOneWithoutAvailabilityInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutAvailabilityInput, Prisma.AreaUncheckedCreateWithoutAvailabilityInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutAvailabilityInput;
    connect?: Prisma.AreaWhereUniqueInput;
};
export type AreaUpdateOneWithoutAvailabilityNestedInput = {
    create?: Prisma.XOR<Prisma.AreaCreateWithoutAvailabilityInput, Prisma.AreaUncheckedCreateWithoutAvailabilityInput>;
    connectOrCreate?: Prisma.AreaCreateOrConnectWithoutAvailabilityInput;
    upsert?: Prisma.AreaUpsertWithoutAvailabilityInput;
    disconnect?: Prisma.AreaWhereInput | boolean;
    delete?: Prisma.AreaWhereInput | boolean;
    connect?: Prisma.AreaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AreaUpdateToOneWithWhereWithoutAvailabilityInput, Prisma.AreaUpdateWithoutAvailabilityInput>, Prisma.AreaUncheckedUpdateWithoutAvailabilityInput>;
};
export type AreaCreateWithoutWorkerProfilesInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    employerProfiles?: Prisma.EmployerProfileCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotCreateNestedManyWithoutAreaInput;
};
export type AreaUncheckedCreateWithoutWorkerProfilesInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    employerProfiles?: Prisma.EmployerProfileUncheckedCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotUncheckedCreateNestedManyWithoutAreaInput;
};
export type AreaCreateOrConnectWithoutWorkerProfilesInput = {
    where: Prisma.AreaWhereUniqueInput;
    create: Prisma.XOR<Prisma.AreaCreateWithoutWorkerProfilesInput, Prisma.AreaUncheckedCreateWithoutWorkerProfilesInput>;
};
export type AreaUpsertWithoutWorkerProfilesInput = {
    update: Prisma.XOR<Prisma.AreaUpdateWithoutWorkerProfilesInput, Prisma.AreaUncheckedUpdateWithoutWorkerProfilesInput>;
    create: Prisma.XOR<Prisma.AreaCreateWithoutWorkerProfilesInput, Prisma.AreaUncheckedCreateWithoutWorkerProfilesInput>;
    where?: Prisma.AreaWhereInput;
};
export type AreaUpdateToOneWithWhereWithoutWorkerProfilesInput = {
    where?: Prisma.AreaWhereInput;
    data: Prisma.XOR<Prisma.AreaUpdateWithoutWorkerProfilesInput, Prisma.AreaUncheckedUpdateWithoutWorkerProfilesInput>;
};
export type AreaUpdateWithoutWorkerProfilesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    employerProfiles?: Prisma.EmployerProfileUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUpdateManyWithoutAreaNestedInput;
};
export type AreaUncheckedUpdateWithoutWorkerProfilesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    employerProfiles?: Prisma.EmployerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUncheckedUpdateManyWithoutAreaNestedInput;
};
export type AreaCreateWithoutEmployerProfilesInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotCreateNestedManyWithoutAreaInput;
};
export type AreaUncheckedCreateWithoutEmployerProfilesInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileUncheckedCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotUncheckedCreateNestedManyWithoutAreaInput;
};
export type AreaCreateOrConnectWithoutEmployerProfilesInput = {
    where: Prisma.AreaWhereUniqueInput;
    create: Prisma.XOR<Prisma.AreaCreateWithoutEmployerProfilesInput, Prisma.AreaUncheckedCreateWithoutEmployerProfilesInput>;
};
export type AreaUpsertWithoutEmployerProfilesInput = {
    update: Prisma.XOR<Prisma.AreaUpdateWithoutEmployerProfilesInput, Prisma.AreaUncheckedUpdateWithoutEmployerProfilesInput>;
    create: Prisma.XOR<Prisma.AreaCreateWithoutEmployerProfilesInput, Prisma.AreaUncheckedCreateWithoutEmployerProfilesInput>;
    where?: Prisma.AreaWhereInput;
};
export type AreaUpdateToOneWithWhereWithoutEmployerProfilesInput = {
    where?: Prisma.AreaWhereInput;
    data: Prisma.XOR<Prisma.AreaUpdateWithoutEmployerProfilesInput, Prisma.AreaUncheckedUpdateWithoutEmployerProfilesInput>;
};
export type AreaUpdateWithoutEmployerProfilesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUpdateManyWithoutAreaNestedInput;
};
export type AreaUncheckedUpdateWithoutEmployerProfilesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUncheckedUpdateManyWithoutAreaNestedInput;
};
export type AreaCreateWithoutJobsInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileCreateNestedManyWithoutAreaInput;
    employerProfiles?: Prisma.EmployerProfileCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotCreateNestedManyWithoutAreaInput;
};
export type AreaUncheckedCreateWithoutJobsInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileUncheckedCreateNestedManyWithoutAreaInput;
    employerProfiles?: Prisma.EmployerProfileUncheckedCreateNestedManyWithoutAreaInput;
    availability?: Prisma.AvailabilitySlotUncheckedCreateNestedManyWithoutAreaInput;
};
export type AreaCreateOrConnectWithoutJobsInput = {
    where: Prisma.AreaWhereUniqueInput;
    create: Prisma.XOR<Prisma.AreaCreateWithoutJobsInput, Prisma.AreaUncheckedCreateWithoutJobsInput>;
};
export type AreaUpsertWithoutJobsInput = {
    update: Prisma.XOR<Prisma.AreaUpdateWithoutJobsInput, Prisma.AreaUncheckedUpdateWithoutJobsInput>;
    create: Prisma.XOR<Prisma.AreaCreateWithoutJobsInput, Prisma.AreaUncheckedCreateWithoutJobsInput>;
    where?: Prisma.AreaWhereInput;
};
export type AreaUpdateToOneWithWhereWithoutJobsInput = {
    where?: Prisma.AreaWhereInput;
    data: Prisma.XOR<Prisma.AreaUpdateWithoutJobsInput, Prisma.AreaUncheckedUpdateWithoutJobsInput>;
};
export type AreaUpdateWithoutJobsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUpdateManyWithoutAreaNestedInput;
    employerProfiles?: Prisma.EmployerProfileUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUpdateManyWithoutAreaNestedInput;
};
export type AreaUncheckedUpdateWithoutJobsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    employerProfiles?: Prisma.EmployerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    availability?: Prisma.AvailabilitySlotUncheckedUpdateManyWithoutAreaNestedInput;
};
export type AreaCreateWithoutAvailabilityInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileCreateNestedManyWithoutAreaInput;
    employerProfiles?: Prisma.EmployerProfileCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobCreateNestedManyWithoutAreaInput;
};
export type AreaUncheckedCreateWithoutAvailabilityInput = {
    id?: bigint | number;
    publicId?: string;
    city: string;
    name: string;
    nameTa?: string | null;
    lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: boolean;
    sortOrder?: number;
    workerProfiles?: Prisma.WorkerProfileUncheckedCreateNestedManyWithoutAreaInput;
    employerProfiles?: Prisma.EmployerProfileUncheckedCreateNestedManyWithoutAreaInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutAreaInput;
};
export type AreaCreateOrConnectWithoutAvailabilityInput = {
    where: Prisma.AreaWhereUniqueInput;
    create: Prisma.XOR<Prisma.AreaCreateWithoutAvailabilityInput, Prisma.AreaUncheckedCreateWithoutAvailabilityInput>;
};
export type AreaUpsertWithoutAvailabilityInput = {
    update: Prisma.XOR<Prisma.AreaUpdateWithoutAvailabilityInput, Prisma.AreaUncheckedUpdateWithoutAvailabilityInput>;
    create: Prisma.XOR<Prisma.AreaCreateWithoutAvailabilityInput, Prisma.AreaUncheckedCreateWithoutAvailabilityInput>;
    where?: Prisma.AreaWhereInput;
};
export type AreaUpdateToOneWithWhereWithoutAvailabilityInput = {
    where?: Prisma.AreaWhereInput;
    data: Prisma.XOR<Prisma.AreaUpdateWithoutAvailabilityInput, Prisma.AreaUncheckedUpdateWithoutAvailabilityInput>;
};
export type AreaUpdateWithoutAvailabilityInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUpdateManyWithoutAreaNestedInput;
    employerProfiles?: Prisma.EmployerProfileUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutAreaNestedInput;
};
export type AreaUncheckedUpdateWithoutAvailabilityInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerProfiles?: Prisma.WorkerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    employerProfiles?: Prisma.EmployerProfileUncheckedUpdateManyWithoutAreaNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutAreaNestedInput;
};
export type AreaCountOutputType = {
    workerProfiles: number;
    employerProfiles: number;
    jobs: number;
    availability: number;
};
export type AreaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workerProfiles?: boolean | AreaCountOutputTypeCountWorkerProfilesArgs;
    employerProfiles?: boolean | AreaCountOutputTypeCountEmployerProfilesArgs;
    jobs?: boolean | AreaCountOutputTypeCountJobsArgs;
    availability?: boolean | AreaCountOutputTypeCountAvailabilityArgs;
};
export type AreaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaCountOutputTypeSelect<ExtArgs> | null;
};
export type AreaCountOutputTypeCountWorkerProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerProfileWhereInput;
};
export type AreaCountOutputTypeCountEmployerProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmployerProfileWhereInput;
};
export type AreaCountOutputTypeCountJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWhereInput;
};
export type AreaCountOutputTypeCountAvailabilityArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilitySlotWhereInput;
};
export type AreaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    city?: boolean;
    name?: boolean;
    nameTa?: boolean;
    lat?: boolean;
    lng?: boolean;
    active?: boolean;
    sortOrder?: boolean;
    workerProfiles?: boolean | Prisma.Area$workerProfilesArgs<ExtArgs>;
    employerProfiles?: boolean | Prisma.Area$employerProfilesArgs<ExtArgs>;
    jobs?: boolean | Prisma.Area$jobsArgs<ExtArgs>;
    availability?: boolean | Prisma.Area$availabilityArgs<ExtArgs>;
    _count?: boolean | Prisma.AreaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["area"]>;
export type AreaSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    city?: boolean;
    name?: boolean;
    nameTa?: boolean;
    lat?: boolean;
    lng?: boolean;
    active?: boolean;
    sortOrder?: boolean;
};
export type AreaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "city" | "name" | "nameTa" | "lat" | "lng" | "active" | "sortOrder", ExtArgs["result"]["area"]>;
export type AreaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workerProfiles?: boolean | Prisma.Area$workerProfilesArgs<ExtArgs>;
    employerProfiles?: boolean | Prisma.Area$employerProfilesArgs<ExtArgs>;
    jobs?: boolean | Prisma.Area$jobsArgs<ExtArgs>;
    availability?: boolean | Prisma.Area$availabilityArgs<ExtArgs>;
    _count?: boolean | Prisma.AreaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $AreaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Area";
    objects: {
        workerProfiles: Prisma.$WorkerProfilePayload<ExtArgs>[];
        employerProfiles: Prisma.$EmployerProfilePayload<ExtArgs>[];
        jobs: Prisma.$JobPayload<ExtArgs>[];
        availability: Prisma.$AvailabilitySlotPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        city: string;
        name: string;
        nameTa: string | null;
        lat: runtime.Decimal | null;
        lng: runtime.Decimal | null;
        active: boolean;
        sortOrder: number;
    }, ExtArgs["result"]["area"]>;
    composites: {};
};
export type AreaGetPayload<S extends boolean | null | undefined | AreaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AreaPayload, S>;
export type AreaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AreaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AreaCountAggregateInputType | true;
};
export interface AreaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Area'];
        meta: {
            name: 'Area';
        };
    };
    findUnique<T extends AreaFindUniqueArgs>(args: Prisma.SelectSubset<T, AreaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AreaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AreaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AreaFindFirstArgs>(args?: Prisma.SelectSubset<T, AreaFindFirstArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AreaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AreaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AreaFindManyArgs>(args?: Prisma.SelectSubset<T, AreaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AreaCreateArgs>(args: Prisma.SelectSubset<T, AreaCreateArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AreaCreateManyArgs>(args?: Prisma.SelectSubset<T, AreaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends AreaDeleteArgs>(args: Prisma.SelectSubset<T, AreaDeleteArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AreaUpdateArgs>(args: Prisma.SelectSubset<T, AreaUpdateArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AreaDeleteManyArgs>(args?: Prisma.SelectSubset<T, AreaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AreaUpdateManyArgs>(args: Prisma.SelectSubset<T, AreaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends AreaUpsertArgs>(args: Prisma.SelectSubset<T, AreaUpsertArgs<ExtArgs>>): Prisma.Prisma__AreaClient<runtime.Types.Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AreaCountArgs>(args?: Prisma.Subset<T, AreaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AreaCountAggregateOutputType> : number>;
    aggregate<T extends AreaAggregateArgs>(args: Prisma.Subset<T, AreaAggregateArgs>): Prisma.PrismaPromise<GetAreaAggregateType<T>>;
    groupBy<T extends AreaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AreaGroupByArgs['orderBy'];
    } : {
        orderBy?: AreaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AreaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAreaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AreaFieldRefs;
}
export interface Prisma__AreaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workerProfiles<T extends Prisma.Area$workerProfilesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Area$workerProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    employerProfiles<T extends Prisma.Area$employerProfilesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Area$employerProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmployerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    jobs<T extends Prisma.Area$jobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Area$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    availability<T extends Prisma.Area$availabilityArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Area$availabilityArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvailabilitySlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AreaFieldRefs {
    readonly id: Prisma.FieldRef<"Area", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"Area", 'String'>;
    readonly city: Prisma.FieldRef<"Area", 'String'>;
    readonly name: Prisma.FieldRef<"Area", 'String'>;
    readonly nameTa: Prisma.FieldRef<"Area", 'String'>;
    readonly lat: Prisma.FieldRef<"Area", 'Decimal'>;
    readonly lng: Prisma.FieldRef<"Area", 'Decimal'>;
    readonly active: Prisma.FieldRef<"Area", 'Boolean'>;
    readonly sortOrder: Prisma.FieldRef<"Area", 'Int'>;
}
export type AreaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where: Prisma.AreaWhereUniqueInput;
};
export type AreaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where: Prisma.AreaWhereUniqueInput;
};
export type AreaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where?: Prisma.AreaWhereInput;
    orderBy?: Prisma.AreaOrderByWithRelationInput | Prisma.AreaOrderByWithRelationInput[];
    cursor?: Prisma.AreaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AreaScalarFieldEnum | Prisma.AreaScalarFieldEnum[];
};
export type AreaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where?: Prisma.AreaWhereInput;
    orderBy?: Prisma.AreaOrderByWithRelationInput | Prisma.AreaOrderByWithRelationInput[];
    cursor?: Prisma.AreaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AreaScalarFieldEnum | Prisma.AreaScalarFieldEnum[];
};
export type AreaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where?: Prisma.AreaWhereInput;
    orderBy?: Prisma.AreaOrderByWithRelationInput | Prisma.AreaOrderByWithRelationInput[];
    cursor?: Prisma.AreaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AreaScalarFieldEnum | Prisma.AreaScalarFieldEnum[];
};
export type AreaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AreaCreateInput, Prisma.AreaUncheckedCreateInput>;
};
export type AreaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AreaCreateManyInput | Prisma.AreaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AreaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AreaUpdateInput, Prisma.AreaUncheckedUpdateInput>;
    where: Prisma.AreaWhereUniqueInput;
};
export type AreaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AreaUpdateManyMutationInput, Prisma.AreaUncheckedUpdateManyInput>;
    where?: Prisma.AreaWhereInput;
    limit?: number;
};
export type AreaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where: Prisma.AreaWhereUniqueInput;
    create: Prisma.XOR<Prisma.AreaCreateInput, Prisma.AreaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AreaUpdateInput, Prisma.AreaUncheckedUpdateInput>;
};
export type AreaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
    where: Prisma.AreaWhereUniqueInput;
};
export type AreaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AreaWhereInput;
    limit?: number;
};
export type Area$workerProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerProfileSelect<ExtArgs> | null;
    omit?: Prisma.WorkerProfileOmit<ExtArgs> | null;
    include?: Prisma.WorkerProfileInclude<ExtArgs> | null;
    where?: Prisma.WorkerProfileWhereInput;
    orderBy?: Prisma.WorkerProfileOrderByWithRelationInput | Prisma.WorkerProfileOrderByWithRelationInput[];
    cursor?: Prisma.WorkerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkerProfileScalarFieldEnum | Prisma.WorkerProfileScalarFieldEnum[];
};
export type Area$employerProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmployerProfileSelect<ExtArgs> | null;
    omit?: Prisma.EmployerProfileOmit<ExtArgs> | null;
    include?: Prisma.EmployerProfileInclude<ExtArgs> | null;
    where?: Prisma.EmployerProfileWhereInput;
    orderBy?: Prisma.EmployerProfileOrderByWithRelationInput | Prisma.EmployerProfileOrderByWithRelationInput[];
    cursor?: Prisma.EmployerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmployerProfileScalarFieldEnum | Prisma.EmployerProfileScalarFieldEnum[];
};
export type Area$jobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[];
    cursor?: Prisma.JobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobScalarFieldEnum | Prisma.JobScalarFieldEnum[];
};
export type Area$availabilityArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AreaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AreaSelect<ExtArgs> | null;
    omit?: Prisma.AreaOmit<ExtArgs> | null;
    include?: Prisma.AreaInclude<ExtArgs> | null;
};
