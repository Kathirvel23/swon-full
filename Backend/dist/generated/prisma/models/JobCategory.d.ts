import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type JobCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$JobCategoryPayload>;
export type AggregateJobCategory = {
    _count: JobCategoryCountAggregateOutputType | null;
    _avg: JobCategoryAvgAggregateOutputType | null;
    _sum: JobCategorySumAggregateOutputType | null;
    _min: JobCategoryMinAggregateOutputType | null;
    _max: JobCategoryMaxAggregateOutputType | null;
};
export type JobCategoryAvgAggregateOutputType = {
    id: number | null;
    parentId: number | null;
    sortOrder: number | null;
    suggestedPayMinPaise: number | null;
};
export type JobCategorySumAggregateOutputType = {
    id: bigint | null;
    parentId: bigint | null;
    sortOrder: number | null;
    suggestedPayMinPaise: bigint | null;
};
export type JobCategoryMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    code: string | null;
    name: string | null;
    nameTa: string | null;
    parentId: bigint | null;
    sortOrder: number | null;
    active: boolean | null;
    suggestedPayMinPaise: bigint | null;
};
export type JobCategoryMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    code: string | null;
    name: string | null;
    nameTa: string | null;
    parentId: bigint | null;
    sortOrder: number | null;
    active: boolean | null;
    suggestedPayMinPaise: bigint | null;
};
export type JobCategoryCountAggregateOutputType = {
    id: number;
    publicId: number;
    code: number;
    name: number;
    nameTa: number;
    parentId: number;
    sortOrder: number;
    active: number;
    suggestedPayMinPaise: number;
    _all: number;
};
export type JobCategoryAvgAggregateInputType = {
    id?: true;
    parentId?: true;
    sortOrder?: true;
    suggestedPayMinPaise?: true;
};
export type JobCategorySumAggregateInputType = {
    id?: true;
    parentId?: true;
    sortOrder?: true;
    suggestedPayMinPaise?: true;
};
export type JobCategoryMinAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    name?: true;
    nameTa?: true;
    parentId?: true;
    sortOrder?: true;
    active?: true;
    suggestedPayMinPaise?: true;
};
export type JobCategoryMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    name?: true;
    nameTa?: true;
    parentId?: true;
    sortOrder?: true;
    active?: true;
    suggestedPayMinPaise?: true;
};
export type JobCategoryCountAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    name?: true;
    nameTa?: true;
    parentId?: true;
    sortOrder?: true;
    active?: true;
    suggestedPayMinPaise?: true;
    _all?: true;
};
export type JobCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobCategoryWhereInput;
    orderBy?: Prisma.JobCategoryOrderByWithRelationInput | Prisma.JobCategoryOrderByWithRelationInput[];
    cursor?: Prisma.JobCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobCategoryCountAggregateInputType;
    _avg?: JobCategoryAvgAggregateInputType;
    _sum?: JobCategorySumAggregateInputType;
    _min?: JobCategoryMinAggregateInputType;
    _max?: JobCategoryMaxAggregateInputType;
};
export type GetJobCategoryAggregateType<T extends JobCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateJobCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobCategory[P]> : Prisma.GetScalarType<T[P], AggregateJobCategory[P]>;
};
export type JobCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobCategoryWhereInput;
    orderBy?: Prisma.JobCategoryOrderByWithAggregationInput | Prisma.JobCategoryOrderByWithAggregationInput[];
    by: Prisma.JobCategoryScalarFieldEnum[] | Prisma.JobCategoryScalarFieldEnum;
    having?: Prisma.JobCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobCategoryCountAggregateInputType | true;
    _avg?: JobCategoryAvgAggregateInputType;
    _sum?: JobCategorySumAggregateInputType;
    _min?: JobCategoryMinAggregateInputType;
    _max?: JobCategoryMaxAggregateInputType;
};
export type JobCategoryGroupByOutputType = {
    id: bigint;
    publicId: string;
    code: string;
    name: string;
    nameTa: string | null;
    parentId: bigint | null;
    sortOrder: number;
    active: boolean;
    suggestedPayMinPaise: bigint | null;
    _count: JobCategoryCountAggregateOutputType | null;
    _avg: JobCategoryAvgAggregateOutputType | null;
    _sum: JobCategorySumAggregateOutputType | null;
    _min: JobCategoryMinAggregateOutputType | null;
    _max: JobCategoryMaxAggregateOutputType | null;
};
export type GetJobCategoryGroupByPayload<T extends JobCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobCategoryGroupByOutputType[P]>;
}>>;
export type JobCategoryWhereInput = {
    AND?: Prisma.JobCategoryWhereInput | Prisma.JobCategoryWhereInput[];
    OR?: Prisma.JobCategoryWhereInput[];
    NOT?: Prisma.JobCategoryWhereInput | Prisma.JobCategoryWhereInput[];
    id?: Prisma.BigIntFilter<"JobCategory"> | bigint | number;
    publicId?: Prisma.StringFilter<"JobCategory"> | string;
    code?: Prisma.StringFilter<"JobCategory"> | string;
    name?: Prisma.StringFilter<"JobCategory"> | string;
    nameTa?: Prisma.StringNullableFilter<"JobCategory"> | string | null;
    parentId?: Prisma.BigIntNullableFilter<"JobCategory"> | bigint | number | null;
    sortOrder?: Prisma.IntFilter<"JobCategory"> | number;
    active?: Prisma.BoolFilter<"JobCategory"> | boolean;
    suggestedPayMinPaise?: Prisma.BigIntNullableFilter<"JobCategory"> | bigint | number | null;
    parent?: Prisma.XOR<Prisma.JobCategoryNullableScalarRelationFilter, Prisma.JobCategoryWhereInput> | null;
    children?: Prisma.JobCategoryListRelationFilter;
    jobs?: Prisma.JobListRelationFilter;
    skills?: Prisma.SkillListRelationFilter;
};
export type JobCategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    suggestedPayMinPaise?: Prisma.SortOrderInput | Prisma.SortOrder;
    parent?: Prisma.JobCategoryOrderByWithRelationInput;
    children?: Prisma.JobCategoryOrderByRelationAggregateInput;
    jobs?: Prisma.JobOrderByRelationAggregateInput;
    skills?: Prisma.SkillOrderByRelationAggregateInput;
    _relevance?: Prisma.JobCategoryOrderByRelevanceInput;
};
export type JobCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    code?: string;
    AND?: Prisma.JobCategoryWhereInput | Prisma.JobCategoryWhereInput[];
    OR?: Prisma.JobCategoryWhereInput[];
    NOT?: Prisma.JobCategoryWhereInput | Prisma.JobCategoryWhereInput[];
    name?: Prisma.StringFilter<"JobCategory"> | string;
    nameTa?: Prisma.StringNullableFilter<"JobCategory"> | string | null;
    parentId?: Prisma.BigIntNullableFilter<"JobCategory"> | bigint | number | null;
    sortOrder?: Prisma.IntFilter<"JobCategory"> | number;
    active?: Prisma.BoolFilter<"JobCategory"> | boolean;
    suggestedPayMinPaise?: Prisma.BigIntNullableFilter<"JobCategory"> | bigint | number | null;
    parent?: Prisma.XOR<Prisma.JobCategoryNullableScalarRelationFilter, Prisma.JobCategoryWhereInput> | null;
    children?: Prisma.JobCategoryListRelationFilter;
    jobs?: Prisma.JobListRelationFilter;
    skills?: Prisma.SkillListRelationFilter;
}, "id" | "publicId" | "code">;
export type JobCategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    suggestedPayMinPaise?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.JobCategoryCountOrderByAggregateInput;
    _avg?: Prisma.JobCategoryAvgOrderByAggregateInput;
    _max?: Prisma.JobCategoryMaxOrderByAggregateInput;
    _min?: Prisma.JobCategoryMinOrderByAggregateInput;
    _sum?: Prisma.JobCategorySumOrderByAggregateInput;
};
export type JobCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobCategoryScalarWhereWithAggregatesInput | Prisma.JobCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobCategoryScalarWhereWithAggregatesInput | Prisma.JobCategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"JobCategory"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"JobCategory"> | string;
    code?: Prisma.StringWithAggregatesFilter<"JobCategory"> | string;
    name?: Prisma.StringWithAggregatesFilter<"JobCategory"> | string;
    nameTa?: Prisma.StringNullableWithAggregatesFilter<"JobCategory"> | string | null;
    parentId?: Prisma.BigIntNullableWithAggregatesFilter<"JobCategory"> | bigint | number | null;
    sortOrder?: Prisma.IntWithAggregatesFilter<"JobCategory"> | number;
    active?: Prisma.BoolWithAggregatesFilter<"JobCategory"> | boolean;
    suggestedPayMinPaise?: Prisma.BigIntNullableWithAggregatesFilter<"JobCategory"> | bigint | number | null;
};
export type JobCategoryCreateInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    parent?: Prisma.JobCategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.JobCategoryCreateNestedManyWithoutParentInput;
    jobs?: Prisma.JobCreateNestedManyWithoutCategoryInput;
    skills?: Prisma.SkillCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    parentId?: bigint | number | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    children?: Prisma.JobCategoryUncheckedCreateNestedManyWithoutParentInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutCategoryInput;
    skills?: Prisma.SkillUncheckedCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    parent?: Prisma.JobCategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.JobCategoryUpdateManyWithoutParentNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutCategoryNestedInput;
    skills?: Prisma.SkillUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    children?: Prisma.JobCategoryUncheckedUpdateManyWithoutParentNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutCategoryNestedInput;
    skills?: Prisma.SkillUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    parentId?: bigint | number | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
};
export type JobCategoryUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
};
export type JobCategoryUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
};
export type JobCategoryNullableScalarRelationFilter = {
    is?: Prisma.JobCategoryWhereInput | null;
    isNot?: Prisma.JobCategoryWhereInput | null;
};
export type JobCategoryListRelationFilter = {
    every?: Prisma.JobCategoryWhereInput;
    some?: Prisma.JobCategoryWhereInput;
    none?: Prisma.JobCategoryWhereInput;
};
export type JobCategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobCategoryOrderByRelevanceInput = {
    fields: Prisma.JobCategoryOrderByRelevanceFieldEnum | Prisma.JobCategoryOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type JobCategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    suggestedPayMinPaise?: Prisma.SortOrder;
};
export type JobCategoryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    suggestedPayMinPaise?: Prisma.SortOrder;
};
export type JobCategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    suggestedPayMinPaise?: Prisma.SortOrder;
};
export type JobCategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    suggestedPayMinPaise?: Prisma.SortOrder;
};
export type JobCategorySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    suggestedPayMinPaise?: Prisma.SortOrder;
};
export type JobCategoryScalarRelationFilter = {
    is?: Prisma.JobCategoryWhereInput;
    isNot?: Prisma.JobCategoryWhereInput;
};
export type JobCategoryCreateNestedOneWithoutChildrenInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutChildrenInput, Prisma.JobCategoryUncheckedCreateWithoutChildrenInput>;
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutChildrenInput;
    connect?: Prisma.JobCategoryWhereUniqueInput;
};
export type JobCategoryCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutParentInput, Prisma.JobCategoryUncheckedCreateWithoutParentInput> | Prisma.JobCategoryCreateWithoutParentInput[] | Prisma.JobCategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutParentInput | Prisma.JobCategoryCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.JobCategoryCreateManyParentInputEnvelope;
    connect?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
};
export type JobCategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutParentInput, Prisma.JobCategoryUncheckedCreateWithoutParentInput> | Prisma.JobCategoryCreateWithoutParentInput[] | Prisma.JobCategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutParentInput | Prisma.JobCategoryCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.JobCategoryCreateManyParentInputEnvelope;
    connect?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
};
export type JobCategoryUpdateOneWithoutChildrenNestedInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutChildrenInput, Prisma.JobCategoryUncheckedCreateWithoutChildrenInput>;
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutChildrenInput;
    upsert?: Prisma.JobCategoryUpsertWithoutChildrenInput;
    disconnect?: Prisma.JobCategoryWhereInput | boolean;
    delete?: Prisma.JobCategoryWhereInput | boolean;
    connect?: Prisma.JobCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.JobCategoryUpdateToOneWithWhereWithoutChildrenInput, Prisma.JobCategoryUpdateWithoutChildrenInput>, Prisma.JobCategoryUncheckedUpdateWithoutChildrenInput>;
};
export type JobCategoryUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutParentInput, Prisma.JobCategoryUncheckedCreateWithoutParentInput> | Prisma.JobCategoryCreateWithoutParentInput[] | Prisma.JobCategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutParentInput | Prisma.JobCategoryCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.JobCategoryUpsertWithWhereUniqueWithoutParentInput | Prisma.JobCategoryUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.JobCategoryCreateManyParentInputEnvelope;
    set?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    disconnect?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    delete?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    connect?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    update?: Prisma.JobCategoryUpdateWithWhereUniqueWithoutParentInput | Prisma.JobCategoryUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.JobCategoryUpdateManyWithWhereWithoutParentInput | Prisma.JobCategoryUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.JobCategoryScalarWhereInput | Prisma.JobCategoryScalarWhereInput[];
};
export type JobCategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutParentInput, Prisma.JobCategoryUncheckedCreateWithoutParentInput> | Prisma.JobCategoryCreateWithoutParentInput[] | Prisma.JobCategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutParentInput | Prisma.JobCategoryCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.JobCategoryUpsertWithWhereUniqueWithoutParentInput | Prisma.JobCategoryUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.JobCategoryCreateManyParentInputEnvelope;
    set?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    disconnect?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    delete?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    connect?: Prisma.JobCategoryWhereUniqueInput | Prisma.JobCategoryWhereUniqueInput[];
    update?: Prisma.JobCategoryUpdateWithWhereUniqueWithoutParentInput | Prisma.JobCategoryUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.JobCategoryUpdateManyWithWhereWithoutParentInput | Prisma.JobCategoryUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.JobCategoryScalarWhereInput | Prisma.JobCategoryScalarWhereInput[];
};
export type JobCategoryCreateNestedOneWithoutSkillsInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutSkillsInput, Prisma.JobCategoryUncheckedCreateWithoutSkillsInput>;
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutSkillsInput;
    connect?: Prisma.JobCategoryWhereUniqueInput;
};
export type JobCategoryUpdateOneWithoutSkillsNestedInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutSkillsInput, Prisma.JobCategoryUncheckedCreateWithoutSkillsInput>;
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutSkillsInput;
    upsert?: Prisma.JobCategoryUpsertWithoutSkillsInput;
    disconnect?: Prisma.JobCategoryWhereInput | boolean;
    delete?: Prisma.JobCategoryWhereInput | boolean;
    connect?: Prisma.JobCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.JobCategoryUpdateToOneWithWhereWithoutSkillsInput, Prisma.JobCategoryUpdateWithoutSkillsInput>, Prisma.JobCategoryUncheckedUpdateWithoutSkillsInput>;
};
export type JobCategoryCreateNestedOneWithoutJobsInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutJobsInput, Prisma.JobCategoryUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutJobsInput;
    connect?: Prisma.JobCategoryWhereUniqueInput;
};
export type JobCategoryUpdateOneRequiredWithoutJobsNestedInput = {
    create?: Prisma.XOR<Prisma.JobCategoryCreateWithoutJobsInput, Prisma.JobCategoryUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.JobCategoryCreateOrConnectWithoutJobsInput;
    upsert?: Prisma.JobCategoryUpsertWithoutJobsInput;
    connect?: Prisma.JobCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.JobCategoryUpdateToOneWithWhereWithoutJobsInput, Prisma.JobCategoryUpdateWithoutJobsInput>, Prisma.JobCategoryUncheckedUpdateWithoutJobsInput>;
};
export type JobCategoryCreateWithoutChildrenInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    parent?: Prisma.JobCategoryCreateNestedOneWithoutChildrenInput;
    jobs?: Prisma.JobCreateNestedManyWithoutCategoryInput;
    skills?: Prisma.SkillCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryUncheckedCreateWithoutChildrenInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    parentId?: bigint | number | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutCategoryInput;
    skills?: Prisma.SkillUncheckedCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryCreateOrConnectWithoutChildrenInput = {
    where: Prisma.JobCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutChildrenInput, Prisma.JobCategoryUncheckedCreateWithoutChildrenInput>;
};
export type JobCategoryCreateWithoutParentInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    children?: Prisma.JobCategoryCreateNestedManyWithoutParentInput;
    jobs?: Prisma.JobCreateNestedManyWithoutCategoryInput;
    skills?: Prisma.SkillCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryUncheckedCreateWithoutParentInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    children?: Prisma.JobCategoryUncheckedCreateNestedManyWithoutParentInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutCategoryInput;
    skills?: Prisma.SkillUncheckedCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryCreateOrConnectWithoutParentInput = {
    where: Prisma.JobCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutParentInput, Prisma.JobCategoryUncheckedCreateWithoutParentInput>;
};
export type JobCategoryCreateManyParentInputEnvelope = {
    data: Prisma.JobCategoryCreateManyParentInput | Prisma.JobCategoryCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type JobCategoryUpsertWithoutChildrenInput = {
    update: Prisma.XOR<Prisma.JobCategoryUpdateWithoutChildrenInput, Prisma.JobCategoryUncheckedUpdateWithoutChildrenInput>;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutChildrenInput, Prisma.JobCategoryUncheckedCreateWithoutChildrenInput>;
    where?: Prisma.JobCategoryWhereInput;
};
export type JobCategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: Prisma.JobCategoryWhereInput;
    data: Prisma.XOR<Prisma.JobCategoryUpdateWithoutChildrenInput, Prisma.JobCategoryUncheckedUpdateWithoutChildrenInput>;
};
export type JobCategoryUpdateWithoutChildrenInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    parent?: Prisma.JobCategoryUpdateOneWithoutChildrenNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutCategoryNestedInput;
    skills?: Prisma.SkillUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryUncheckedUpdateWithoutChildrenInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutCategoryNestedInput;
    skills?: Prisma.SkillUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.JobCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobCategoryUpdateWithoutParentInput, Prisma.JobCategoryUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutParentInput, Prisma.JobCategoryUncheckedCreateWithoutParentInput>;
};
export type JobCategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.JobCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobCategoryUpdateWithoutParentInput, Prisma.JobCategoryUncheckedUpdateWithoutParentInput>;
};
export type JobCategoryUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.JobCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.JobCategoryUpdateManyMutationInput, Prisma.JobCategoryUncheckedUpdateManyWithoutParentInput>;
};
export type JobCategoryScalarWhereInput = {
    AND?: Prisma.JobCategoryScalarWhereInput | Prisma.JobCategoryScalarWhereInput[];
    OR?: Prisma.JobCategoryScalarWhereInput[];
    NOT?: Prisma.JobCategoryScalarWhereInput | Prisma.JobCategoryScalarWhereInput[];
    id?: Prisma.BigIntFilter<"JobCategory"> | bigint | number;
    publicId?: Prisma.StringFilter<"JobCategory"> | string;
    code?: Prisma.StringFilter<"JobCategory"> | string;
    name?: Prisma.StringFilter<"JobCategory"> | string;
    nameTa?: Prisma.StringNullableFilter<"JobCategory"> | string | null;
    parentId?: Prisma.BigIntNullableFilter<"JobCategory"> | bigint | number | null;
    sortOrder?: Prisma.IntFilter<"JobCategory"> | number;
    active?: Prisma.BoolFilter<"JobCategory"> | boolean;
    suggestedPayMinPaise?: Prisma.BigIntNullableFilter<"JobCategory"> | bigint | number | null;
};
export type JobCategoryCreateWithoutSkillsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    parent?: Prisma.JobCategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.JobCategoryCreateNestedManyWithoutParentInput;
    jobs?: Prisma.JobCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryUncheckedCreateWithoutSkillsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    parentId?: bigint | number | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    children?: Prisma.JobCategoryUncheckedCreateNestedManyWithoutParentInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryCreateOrConnectWithoutSkillsInput = {
    where: Prisma.JobCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutSkillsInput, Prisma.JobCategoryUncheckedCreateWithoutSkillsInput>;
};
export type JobCategoryUpsertWithoutSkillsInput = {
    update: Prisma.XOR<Prisma.JobCategoryUpdateWithoutSkillsInput, Prisma.JobCategoryUncheckedUpdateWithoutSkillsInput>;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutSkillsInput, Prisma.JobCategoryUncheckedCreateWithoutSkillsInput>;
    where?: Prisma.JobCategoryWhereInput;
};
export type JobCategoryUpdateToOneWithWhereWithoutSkillsInput = {
    where?: Prisma.JobCategoryWhereInput;
    data: Prisma.XOR<Prisma.JobCategoryUpdateWithoutSkillsInput, Prisma.JobCategoryUncheckedUpdateWithoutSkillsInput>;
};
export type JobCategoryUpdateWithoutSkillsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    parent?: Prisma.JobCategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.JobCategoryUpdateManyWithoutParentNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryUncheckedUpdateWithoutSkillsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    children?: Prisma.JobCategoryUncheckedUpdateManyWithoutParentNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryCreateWithoutJobsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    parent?: Prisma.JobCategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.JobCategoryCreateNestedManyWithoutParentInput;
    skills?: Prisma.SkillCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryUncheckedCreateWithoutJobsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    parentId?: bigint | number | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
    children?: Prisma.JobCategoryUncheckedCreateNestedManyWithoutParentInput;
    skills?: Prisma.SkillUncheckedCreateNestedManyWithoutCategoryInput;
};
export type JobCategoryCreateOrConnectWithoutJobsInput = {
    where: Prisma.JobCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutJobsInput, Prisma.JobCategoryUncheckedCreateWithoutJobsInput>;
};
export type JobCategoryUpsertWithoutJobsInput = {
    update: Prisma.XOR<Prisma.JobCategoryUpdateWithoutJobsInput, Prisma.JobCategoryUncheckedUpdateWithoutJobsInput>;
    create: Prisma.XOR<Prisma.JobCategoryCreateWithoutJobsInput, Prisma.JobCategoryUncheckedCreateWithoutJobsInput>;
    where?: Prisma.JobCategoryWhereInput;
};
export type JobCategoryUpdateToOneWithWhereWithoutJobsInput = {
    where?: Prisma.JobCategoryWhereInput;
    data: Prisma.XOR<Prisma.JobCategoryUpdateWithoutJobsInput, Prisma.JobCategoryUncheckedUpdateWithoutJobsInput>;
};
export type JobCategoryUpdateWithoutJobsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    parent?: Prisma.JobCategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.JobCategoryUpdateManyWithoutParentNestedInput;
    skills?: Prisma.SkillUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryUncheckedUpdateWithoutJobsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    children?: Prisma.JobCategoryUncheckedUpdateManyWithoutParentNestedInput;
    skills?: Prisma.SkillUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryCreateManyParentInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    suggestedPayMinPaise?: bigint | number | null;
};
export type JobCategoryUpdateWithoutParentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    children?: Prisma.JobCategoryUpdateManyWithoutParentNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutCategoryNestedInput;
    skills?: Prisma.SkillUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryUncheckedUpdateWithoutParentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    children?: Prisma.JobCategoryUncheckedUpdateManyWithoutParentNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutCategoryNestedInput;
    skills?: Prisma.SkillUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type JobCategoryUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suggestedPayMinPaise?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
};
export type JobCategoryCountOutputType = {
    children: number;
    jobs: number;
    skills: number;
};
export type JobCategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    children?: boolean | JobCategoryCountOutputTypeCountChildrenArgs;
    jobs?: boolean | JobCategoryCountOutputTypeCountJobsArgs;
    skills?: boolean | JobCategoryCountOutputTypeCountSkillsArgs;
};
export type JobCategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type JobCategoryCountOutputTypeCountChildrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobCategoryWhereInput;
};
export type JobCategoryCountOutputTypeCountJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWhereInput;
};
export type JobCategoryCountOutputTypeCountSkillsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SkillWhereInput;
};
export type JobCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    code?: boolean;
    name?: boolean;
    nameTa?: boolean;
    parentId?: boolean;
    sortOrder?: boolean;
    active?: boolean;
    suggestedPayMinPaise?: boolean;
    parent?: boolean | Prisma.JobCategory$parentArgs<ExtArgs>;
    children?: boolean | Prisma.JobCategory$childrenArgs<ExtArgs>;
    jobs?: boolean | Prisma.JobCategory$jobsArgs<ExtArgs>;
    skills?: boolean | Prisma.JobCategory$skillsArgs<ExtArgs>;
    _count?: boolean | Prisma.JobCategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobCategory"]>;
export type JobCategorySelectScalar = {
    id?: boolean;
    publicId?: boolean;
    code?: boolean;
    name?: boolean;
    nameTa?: boolean;
    parentId?: boolean;
    sortOrder?: boolean;
    active?: boolean;
    suggestedPayMinPaise?: boolean;
};
export type JobCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "code" | "name" | "nameTa" | "parentId" | "sortOrder" | "active" | "suggestedPayMinPaise", ExtArgs["result"]["jobCategory"]>;
export type JobCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.JobCategory$parentArgs<ExtArgs>;
    children?: boolean | Prisma.JobCategory$childrenArgs<ExtArgs>;
    jobs?: boolean | Prisma.JobCategory$jobsArgs<ExtArgs>;
    skills?: boolean | Prisma.JobCategory$skillsArgs<ExtArgs>;
    _count?: boolean | Prisma.JobCategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $JobCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobCategory";
    objects: {
        parent: Prisma.$JobCategoryPayload<ExtArgs> | null;
        children: Prisma.$JobCategoryPayload<ExtArgs>[];
        jobs: Prisma.$JobPayload<ExtArgs>[];
        skills: Prisma.$SkillPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        code: string;
        name: string;
        nameTa: string | null;
        parentId: bigint | null;
        sortOrder: number;
        active: boolean;
        suggestedPayMinPaise: bigint | null;
    }, ExtArgs["result"]["jobCategory"]>;
    composites: {};
};
export type JobCategoryGetPayload<S extends boolean | null | undefined | JobCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload, S>;
export type JobCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobCategoryCountAggregateInputType | true;
};
export interface JobCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobCategory'];
        meta: {
            name: 'JobCategory';
        };
    };
    findUnique<T extends JobCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, JobCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, JobCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, JobCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobCategoryCreateArgs>(args: Prisma.SelectSubset<T, JobCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, JobCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends JobCategoryDeleteArgs>(args: Prisma.SelectSubset<T, JobCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobCategoryUpdateArgs>(args: Prisma.SelectSubset<T, JobCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, JobCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends JobCategoryUpsertArgs>(args: Prisma.SelectSubset<T, JobCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobCategoryCountArgs>(args?: Prisma.Subset<T, JobCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobCategoryCountAggregateOutputType> : number>;
    aggregate<T extends JobCategoryAggregateArgs>(args: Prisma.Subset<T, JobCategoryAggregateArgs>): Prisma.PrismaPromise<GetJobCategoryAggregateType<T>>;
    groupBy<T extends JobCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: JobCategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobCategoryFieldRefs;
}
export interface Prisma__JobCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Prisma.JobCategory$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobCategory$parentArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    children<T extends Prisma.JobCategory$childrenArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobCategory$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    jobs<T extends Prisma.JobCategory$jobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobCategory$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    skills<T extends Prisma.JobCategory$skillsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobCategory$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobCategoryFieldRefs {
    readonly id: Prisma.FieldRef<"JobCategory", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"JobCategory", 'String'>;
    readonly code: Prisma.FieldRef<"JobCategory", 'String'>;
    readonly name: Prisma.FieldRef<"JobCategory", 'String'>;
    readonly nameTa: Prisma.FieldRef<"JobCategory", 'String'>;
    readonly parentId: Prisma.FieldRef<"JobCategory", 'BigInt'>;
    readonly sortOrder: Prisma.FieldRef<"JobCategory", 'Int'>;
    readonly active: Prisma.FieldRef<"JobCategory", 'Boolean'>;
    readonly suggestedPayMinPaise: Prisma.FieldRef<"JobCategory", 'BigInt'>;
}
export type JobCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where: Prisma.JobCategoryWhereUniqueInput;
};
export type JobCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where: Prisma.JobCategoryWhereUniqueInput;
};
export type JobCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where?: Prisma.JobCategoryWhereInput;
    orderBy?: Prisma.JobCategoryOrderByWithRelationInput | Prisma.JobCategoryOrderByWithRelationInput[];
    cursor?: Prisma.JobCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobCategoryScalarFieldEnum | Prisma.JobCategoryScalarFieldEnum[];
};
export type JobCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where?: Prisma.JobCategoryWhereInput;
    orderBy?: Prisma.JobCategoryOrderByWithRelationInput | Prisma.JobCategoryOrderByWithRelationInput[];
    cursor?: Prisma.JobCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobCategoryScalarFieldEnum | Prisma.JobCategoryScalarFieldEnum[];
};
export type JobCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where?: Prisma.JobCategoryWhereInput;
    orderBy?: Prisma.JobCategoryOrderByWithRelationInput | Prisma.JobCategoryOrderByWithRelationInput[];
    cursor?: Prisma.JobCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobCategoryScalarFieldEnum | Prisma.JobCategoryScalarFieldEnum[];
};
export type JobCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobCategoryCreateInput, Prisma.JobCategoryUncheckedCreateInput>;
};
export type JobCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobCategoryCreateManyInput | Prisma.JobCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobCategoryUpdateInput, Prisma.JobCategoryUncheckedUpdateInput>;
    where: Prisma.JobCategoryWhereUniqueInput;
};
export type JobCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobCategoryUpdateManyMutationInput, Prisma.JobCategoryUncheckedUpdateManyInput>;
    where?: Prisma.JobCategoryWhereInput;
    limit?: number;
};
export type JobCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where: Prisma.JobCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobCategoryCreateInput, Prisma.JobCategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobCategoryUpdateInput, Prisma.JobCategoryUncheckedUpdateInput>;
};
export type JobCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where: Prisma.JobCategoryWhereUniqueInput;
};
export type JobCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobCategoryWhereInput;
    limit?: number;
};
export type JobCategory$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where?: Prisma.JobCategoryWhereInput;
};
export type JobCategory$childrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where?: Prisma.JobCategoryWhereInput;
    orderBy?: Prisma.JobCategoryOrderByWithRelationInput | Prisma.JobCategoryOrderByWithRelationInput[];
    cursor?: Prisma.JobCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobCategoryScalarFieldEnum | Prisma.JobCategoryScalarFieldEnum[];
};
export type JobCategory$jobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type JobCategory$skillsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
    where?: Prisma.SkillWhereInput;
    orderBy?: Prisma.SkillOrderByWithRelationInput | Prisma.SkillOrderByWithRelationInput[];
    cursor?: Prisma.SkillWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SkillScalarFieldEnum | Prisma.SkillScalarFieldEnum[];
};
export type JobCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
};
