import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SkillModel = runtime.Types.Result.DefaultSelection<Prisma.$SkillPayload>;
export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null;
    _avg: SkillAvgAggregateOutputType | null;
    _sum: SkillSumAggregateOutputType | null;
    _min: SkillMinAggregateOutputType | null;
    _max: SkillMaxAggregateOutputType | null;
};
export type SkillAvgAggregateOutputType = {
    id: number | null;
    categoryId: number | null;
    sortOrder: number | null;
};
export type SkillSumAggregateOutputType = {
    id: bigint | null;
    categoryId: bigint | null;
    sortOrder: number | null;
};
export type SkillMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    code: string | null;
    name: string | null;
    nameTa: string | null;
    categoryId: bigint | null;
    active: boolean | null;
    sortOrder: number | null;
};
export type SkillMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    code: string | null;
    name: string | null;
    nameTa: string | null;
    categoryId: bigint | null;
    active: boolean | null;
    sortOrder: number | null;
};
export type SkillCountAggregateOutputType = {
    id: number;
    publicId: number;
    code: number;
    name: number;
    nameTa: number;
    categoryId: number;
    active: number;
    sortOrder: number;
    _all: number;
};
export type SkillAvgAggregateInputType = {
    id?: true;
    categoryId?: true;
    sortOrder?: true;
};
export type SkillSumAggregateInputType = {
    id?: true;
    categoryId?: true;
    sortOrder?: true;
};
export type SkillMinAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    name?: true;
    nameTa?: true;
    categoryId?: true;
    active?: true;
    sortOrder?: true;
};
export type SkillMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    name?: true;
    nameTa?: true;
    categoryId?: true;
    active?: true;
    sortOrder?: true;
};
export type SkillCountAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    name?: true;
    nameTa?: true;
    categoryId?: true;
    active?: true;
    sortOrder?: true;
    _all?: true;
};
export type SkillAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SkillWhereInput;
    orderBy?: Prisma.SkillOrderByWithRelationInput | Prisma.SkillOrderByWithRelationInput[];
    cursor?: Prisma.SkillWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SkillCountAggregateInputType;
    _avg?: SkillAvgAggregateInputType;
    _sum?: SkillSumAggregateInputType;
    _min?: SkillMinAggregateInputType;
    _max?: SkillMaxAggregateInputType;
};
export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
    [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSkill[P]> : Prisma.GetScalarType<T[P], AggregateSkill[P]>;
};
export type SkillGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SkillWhereInput;
    orderBy?: Prisma.SkillOrderByWithAggregationInput | Prisma.SkillOrderByWithAggregationInput[];
    by: Prisma.SkillScalarFieldEnum[] | Prisma.SkillScalarFieldEnum;
    having?: Prisma.SkillScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SkillCountAggregateInputType | true;
    _avg?: SkillAvgAggregateInputType;
    _sum?: SkillSumAggregateInputType;
    _min?: SkillMinAggregateInputType;
    _max?: SkillMaxAggregateInputType;
};
export type SkillGroupByOutputType = {
    id: bigint;
    publicId: string;
    code: string;
    name: string;
    nameTa: string | null;
    categoryId: bigint | null;
    active: boolean;
    sortOrder: number;
    _count: SkillCountAggregateOutputType | null;
    _avg: SkillAvgAggregateOutputType | null;
    _sum: SkillSumAggregateOutputType | null;
    _min: SkillMinAggregateOutputType | null;
    _max: SkillMaxAggregateOutputType | null;
};
export type GetSkillGroupByPayload<T extends SkillGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SkillGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SkillGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SkillGroupByOutputType[P]>;
}>>;
export type SkillWhereInput = {
    AND?: Prisma.SkillWhereInput | Prisma.SkillWhereInput[];
    OR?: Prisma.SkillWhereInput[];
    NOT?: Prisma.SkillWhereInput | Prisma.SkillWhereInput[];
    id?: Prisma.BigIntFilter<"Skill"> | bigint | number;
    publicId?: Prisma.StringFilter<"Skill"> | string;
    code?: Prisma.StringFilter<"Skill"> | string;
    name?: Prisma.StringFilter<"Skill"> | string;
    nameTa?: Prisma.StringNullableFilter<"Skill"> | string | null;
    categoryId?: Prisma.BigIntNullableFilter<"Skill"> | bigint | number | null;
    active?: Prisma.BoolFilter<"Skill"> | boolean;
    sortOrder?: Prisma.IntFilter<"Skill"> | number;
    jobSkills?: Prisma.JobSkillListRelationFilter;
    workerSkills?: Prisma.WorkerSkillListRelationFilter;
    category?: Prisma.XOR<Prisma.JobCategoryNullableScalarRelationFilter, Prisma.JobCategoryWhereInput> | null;
};
export type SkillOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    jobSkills?: Prisma.JobSkillOrderByRelationAggregateInput;
    workerSkills?: Prisma.WorkerSkillOrderByRelationAggregateInput;
    category?: Prisma.JobCategoryOrderByWithRelationInput;
    _relevance?: Prisma.SkillOrderByRelevanceInput;
};
export type SkillWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    code?: string;
    AND?: Prisma.SkillWhereInput | Prisma.SkillWhereInput[];
    OR?: Prisma.SkillWhereInput[];
    NOT?: Prisma.SkillWhereInput | Prisma.SkillWhereInput[];
    name?: Prisma.StringFilter<"Skill"> | string;
    nameTa?: Prisma.StringNullableFilter<"Skill"> | string | null;
    categoryId?: Prisma.BigIntNullableFilter<"Skill"> | bigint | number | null;
    active?: Prisma.BoolFilter<"Skill"> | boolean;
    sortOrder?: Prisma.IntFilter<"Skill"> | number;
    jobSkills?: Prisma.JobSkillListRelationFilter;
    workerSkills?: Prisma.WorkerSkillListRelationFilter;
    category?: Prisma.XOR<Prisma.JobCategoryNullableScalarRelationFilter, Prisma.JobCategoryWhereInput> | null;
}, "id" | "publicId" | "code">;
export type SkillOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    _count?: Prisma.SkillCountOrderByAggregateInput;
    _avg?: Prisma.SkillAvgOrderByAggregateInput;
    _max?: Prisma.SkillMaxOrderByAggregateInput;
    _min?: Prisma.SkillMinOrderByAggregateInput;
    _sum?: Prisma.SkillSumOrderByAggregateInput;
};
export type SkillScalarWhereWithAggregatesInput = {
    AND?: Prisma.SkillScalarWhereWithAggregatesInput | Prisma.SkillScalarWhereWithAggregatesInput[];
    OR?: Prisma.SkillScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SkillScalarWhereWithAggregatesInput | Prisma.SkillScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Skill"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"Skill"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Skill"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Skill"> | string;
    nameTa?: Prisma.StringNullableWithAggregatesFilter<"Skill"> | string | null;
    categoryId?: Prisma.BigIntNullableWithAggregatesFilter<"Skill"> | bigint | number | null;
    active?: Prisma.BoolWithAggregatesFilter<"Skill"> | boolean;
    sortOrder?: Prisma.IntWithAggregatesFilter<"Skill"> | number;
};
export type SkillCreateInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    active?: boolean;
    sortOrder?: number;
    jobSkills?: Prisma.JobSkillCreateNestedManyWithoutSkillInput;
    workerSkills?: Prisma.WorkerSkillCreateNestedManyWithoutSkillInput;
    category?: Prisma.JobCategoryCreateNestedOneWithoutSkillsInput;
};
export type SkillUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    categoryId?: bigint | number | null;
    active?: boolean;
    sortOrder?: number;
    jobSkills?: Prisma.JobSkillUncheckedCreateNestedManyWithoutSkillInput;
    workerSkills?: Prisma.WorkerSkillUncheckedCreateNestedManyWithoutSkillInput;
};
export type SkillUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    jobSkills?: Prisma.JobSkillUpdateManyWithoutSkillNestedInput;
    workerSkills?: Prisma.WorkerSkillUpdateManyWithoutSkillNestedInput;
    category?: Prisma.JobCategoryUpdateOneWithoutSkillsNestedInput;
};
export type SkillUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    jobSkills?: Prisma.JobSkillUncheckedUpdateManyWithoutSkillNestedInput;
    workerSkills?: Prisma.WorkerSkillUncheckedUpdateManyWithoutSkillNestedInput;
};
export type SkillCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    categoryId?: bigint | number | null;
    active?: boolean;
    sortOrder?: number;
};
export type SkillUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SkillUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SkillListRelationFilter = {
    every?: Prisma.SkillWhereInput;
    some?: Prisma.SkillWhereInput;
    none?: Prisma.SkillWhereInput;
};
export type SkillOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SkillOrderByRelevanceInput = {
    fields: Prisma.SkillOrderByRelevanceFieldEnum | Prisma.SkillOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SkillCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type SkillAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type SkillMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type SkillMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTa?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type SkillSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type SkillScalarRelationFilter = {
    is?: Prisma.SkillWhereInput;
    isNot?: Prisma.SkillWhereInput;
};
export type SkillCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutCategoryInput, Prisma.SkillUncheckedCreateWithoutCategoryInput> | Prisma.SkillCreateWithoutCategoryInput[] | Prisma.SkillUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutCategoryInput | Prisma.SkillCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.SkillCreateManyCategoryInputEnvelope;
    connect?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
};
export type SkillUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutCategoryInput, Prisma.SkillUncheckedCreateWithoutCategoryInput> | Prisma.SkillCreateWithoutCategoryInput[] | Prisma.SkillUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutCategoryInput | Prisma.SkillCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.SkillCreateManyCategoryInputEnvelope;
    connect?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
};
export type SkillUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutCategoryInput, Prisma.SkillUncheckedCreateWithoutCategoryInput> | Prisma.SkillCreateWithoutCategoryInput[] | Prisma.SkillUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutCategoryInput | Prisma.SkillCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.SkillUpsertWithWhereUniqueWithoutCategoryInput | Prisma.SkillUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.SkillCreateManyCategoryInputEnvelope;
    set?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    disconnect?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    delete?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    connect?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    update?: Prisma.SkillUpdateWithWhereUniqueWithoutCategoryInput | Prisma.SkillUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.SkillUpdateManyWithWhereWithoutCategoryInput | Prisma.SkillUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.SkillScalarWhereInput | Prisma.SkillScalarWhereInput[];
};
export type SkillUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutCategoryInput, Prisma.SkillUncheckedCreateWithoutCategoryInput> | Prisma.SkillCreateWithoutCategoryInput[] | Prisma.SkillUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutCategoryInput | Prisma.SkillCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.SkillUpsertWithWhereUniqueWithoutCategoryInput | Prisma.SkillUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.SkillCreateManyCategoryInputEnvelope;
    set?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    disconnect?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    delete?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    connect?: Prisma.SkillWhereUniqueInput | Prisma.SkillWhereUniqueInput[];
    update?: Prisma.SkillUpdateWithWhereUniqueWithoutCategoryInput | Prisma.SkillUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.SkillUpdateManyWithWhereWithoutCategoryInput | Prisma.SkillUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.SkillScalarWhereInput | Prisma.SkillScalarWhereInput[];
};
export type SkillCreateNestedOneWithoutWorkerSkillsInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutWorkerSkillsInput, Prisma.SkillUncheckedCreateWithoutWorkerSkillsInput>;
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutWorkerSkillsInput;
    connect?: Prisma.SkillWhereUniqueInput;
};
export type SkillUpdateOneRequiredWithoutWorkerSkillsNestedInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutWorkerSkillsInput, Prisma.SkillUncheckedCreateWithoutWorkerSkillsInput>;
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutWorkerSkillsInput;
    upsert?: Prisma.SkillUpsertWithoutWorkerSkillsInput;
    connect?: Prisma.SkillWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SkillUpdateToOneWithWhereWithoutWorkerSkillsInput, Prisma.SkillUpdateWithoutWorkerSkillsInput>, Prisma.SkillUncheckedUpdateWithoutWorkerSkillsInput>;
};
export type SkillCreateNestedOneWithoutJobSkillsInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutJobSkillsInput, Prisma.SkillUncheckedCreateWithoutJobSkillsInput>;
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutJobSkillsInput;
    connect?: Prisma.SkillWhereUniqueInput;
};
export type SkillUpdateOneRequiredWithoutJobSkillsNestedInput = {
    create?: Prisma.XOR<Prisma.SkillCreateWithoutJobSkillsInput, Prisma.SkillUncheckedCreateWithoutJobSkillsInput>;
    connectOrCreate?: Prisma.SkillCreateOrConnectWithoutJobSkillsInput;
    upsert?: Prisma.SkillUpsertWithoutJobSkillsInput;
    connect?: Prisma.SkillWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SkillUpdateToOneWithWhereWithoutJobSkillsInput, Prisma.SkillUpdateWithoutJobSkillsInput>, Prisma.SkillUncheckedUpdateWithoutJobSkillsInput>;
};
export type SkillCreateWithoutCategoryInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    active?: boolean;
    sortOrder?: number;
    jobSkills?: Prisma.JobSkillCreateNestedManyWithoutSkillInput;
    workerSkills?: Prisma.WorkerSkillCreateNestedManyWithoutSkillInput;
};
export type SkillUncheckedCreateWithoutCategoryInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    active?: boolean;
    sortOrder?: number;
    jobSkills?: Prisma.JobSkillUncheckedCreateNestedManyWithoutSkillInput;
    workerSkills?: Prisma.WorkerSkillUncheckedCreateNestedManyWithoutSkillInput;
};
export type SkillCreateOrConnectWithoutCategoryInput = {
    where: Prisma.SkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.SkillCreateWithoutCategoryInput, Prisma.SkillUncheckedCreateWithoutCategoryInput>;
};
export type SkillCreateManyCategoryInputEnvelope = {
    data: Prisma.SkillCreateManyCategoryInput | Prisma.SkillCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type SkillUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.SkillWhereUniqueInput;
    update: Prisma.XOR<Prisma.SkillUpdateWithoutCategoryInput, Prisma.SkillUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.SkillCreateWithoutCategoryInput, Prisma.SkillUncheckedCreateWithoutCategoryInput>;
};
export type SkillUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.SkillWhereUniqueInput;
    data: Prisma.XOR<Prisma.SkillUpdateWithoutCategoryInput, Prisma.SkillUncheckedUpdateWithoutCategoryInput>;
};
export type SkillUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.SkillScalarWhereInput;
    data: Prisma.XOR<Prisma.SkillUpdateManyMutationInput, Prisma.SkillUncheckedUpdateManyWithoutCategoryInput>;
};
export type SkillScalarWhereInput = {
    AND?: Prisma.SkillScalarWhereInput | Prisma.SkillScalarWhereInput[];
    OR?: Prisma.SkillScalarWhereInput[];
    NOT?: Prisma.SkillScalarWhereInput | Prisma.SkillScalarWhereInput[];
    id?: Prisma.BigIntFilter<"Skill"> | bigint | number;
    publicId?: Prisma.StringFilter<"Skill"> | string;
    code?: Prisma.StringFilter<"Skill"> | string;
    name?: Prisma.StringFilter<"Skill"> | string;
    nameTa?: Prisma.StringNullableFilter<"Skill"> | string | null;
    categoryId?: Prisma.BigIntNullableFilter<"Skill"> | bigint | number | null;
    active?: Prisma.BoolFilter<"Skill"> | boolean;
    sortOrder?: Prisma.IntFilter<"Skill"> | number;
};
export type SkillCreateWithoutWorkerSkillsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    active?: boolean;
    sortOrder?: number;
    jobSkills?: Prisma.JobSkillCreateNestedManyWithoutSkillInput;
    category?: Prisma.JobCategoryCreateNestedOneWithoutSkillsInput;
};
export type SkillUncheckedCreateWithoutWorkerSkillsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    categoryId?: bigint | number | null;
    active?: boolean;
    sortOrder?: number;
    jobSkills?: Prisma.JobSkillUncheckedCreateNestedManyWithoutSkillInput;
};
export type SkillCreateOrConnectWithoutWorkerSkillsInput = {
    where: Prisma.SkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.SkillCreateWithoutWorkerSkillsInput, Prisma.SkillUncheckedCreateWithoutWorkerSkillsInput>;
};
export type SkillUpsertWithoutWorkerSkillsInput = {
    update: Prisma.XOR<Prisma.SkillUpdateWithoutWorkerSkillsInput, Prisma.SkillUncheckedUpdateWithoutWorkerSkillsInput>;
    create: Prisma.XOR<Prisma.SkillCreateWithoutWorkerSkillsInput, Prisma.SkillUncheckedCreateWithoutWorkerSkillsInput>;
    where?: Prisma.SkillWhereInput;
};
export type SkillUpdateToOneWithWhereWithoutWorkerSkillsInput = {
    where?: Prisma.SkillWhereInput;
    data: Prisma.XOR<Prisma.SkillUpdateWithoutWorkerSkillsInput, Prisma.SkillUncheckedUpdateWithoutWorkerSkillsInput>;
};
export type SkillUpdateWithoutWorkerSkillsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    jobSkills?: Prisma.JobSkillUpdateManyWithoutSkillNestedInput;
    category?: Prisma.JobCategoryUpdateOneWithoutSkillsNestedInput;
};
export type SkillUncheckedUpdateWithoutWorkerSkillsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    jobSkills?: Prisma.JobSkillUncheckedUpdateManyWithoutSkillNestedInput;
};
export type SkillCreateWithoutJobSkillsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    active?: boolean;
    sortOrder?: number;
    workerSkills?: Prisma.WorkerSkillCreateNestedManyWithoutSkillInput;
    category?: Prisma.JobCategoryCreateNestedOneWithoutSkillsInput;
};
export type SkillUncheckedCreateWithoutJobSkillsInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    categoryId?: bigint | number | null;
    active?: boolean;
    sortOrder?: number;
    workerSkills?: Prisma.WorkerSkillUncheckedCreateNestedManyWithoutSkillInput;
};
export type SkillCreateOrConnectWithoutJobSkillsInput = {
    where: Prisma.SkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.SkillCreateWithoutJobSkillsInput, Prisma.SkillUncheckedCreateWithoutJobSkillsInput>;
};
export type SkillUpsertWithoutJobSkillsInput = {
    update: Prisma.XOR<Prisma.SkillUpdateWithoutJobSkillsInput, Prisma.SkillUncheckedUpdateWithoutJobSkillsInput>;
    create: Prisma.XOR<Prisma.SkillCreateWithoutJobSkillsInput, Prisma.SkillUncheckedCreateWithoutJobSkillsInput>;
    where?: Prisma.SkillWhereInput;
};
export type SkillUpdateToOneWithWhereWithoutJobSkillsInput = {
    where?: Prisma.SkillWhereInput;
    data: Prisma.XOR<Prisma.SkillUpdateWithoutJobSkillsInput, Prisma.SkillUncheckedUpdateWithoutJobSkillsInput>;
};
export type SkillUpdateWithoutJobSkillsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerSkills?: Prisma.WorkerSkillUpdateManyWithoutSkillNestedInput;
    category?: Prisma.JobCategoryUpdateOneWithoutSkillsNestedInput;
};
export type SkillUncheckedUpdateWithoutJobSkillsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    workerSkills?: Prisma.WorkerSkillUncheckedUpdateManyWithoutSkillNestedInput;
};
export type SkillCreateManyCategoryInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    name: string;
    nameTa?: string | null;
    active?: boolean;
    sortOrder?: number;
};
export type SkillUpdateWithoutCategoryInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    jobSkills?: Prisma.JobSkillUpdateManyWithoutSkillNestedInput;
    workerSkills?: Prisma.WorkerSkillUpdateManyWithoutSkillNestedInput;
};
export type SkillUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    jobSkills?: Prisma.JobSkillUncheckedUpdateManyWithoutSkillNestedInput;
    workerSkills?: Prisma.WorkerSkillUncheckedUpdateManyWithoutSkillNestedInput;
};
export type SkillUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SkillCountOutputType = {
    jobSkills: number;
    workerSkills: number;
};
export type SkillCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jobSkills?: boolean | SkillCountOutputTypeCountJobSkillsArgs;
    workerSkills?: boolean | SkillCountOutputTypeCountWorkerSkillsArgs;
};
export type SkillCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillCountOutputTypeSelect<ExtArgs> | null;
};
export type SkillCountOutputTypeCountJobSkillsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobSkillWhereInput;
};
export type SkillCountOutputTypeCountWorkerSkillsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerSkillWhereInput;
};
export type SkillSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    code?: boolean;
    name?: boolean;
    nameTa?: boolean;
    categoryId?: boolean;
    active?: boolean;
    sortOrder?: boolean;
    jobSkills?: boolean | Prisma.Skill$jobSkillsArgs<ExtArgs>;
    workerSkills?: boolean | Prisma.Skill$workerSkillsArgs<ExtArgs>;
    category?: boolean | Prisma.Skill$categoryArgs<ExtArgs>;
    _count?: boolean | Prisma.SkillCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["skill"]>;
export type SkillSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    code?: boolean;
    name?: boolean;
    nameTa?: boolean;
    categoryId?: boolean;
    active?: boolean;
    sortOrder?: boolean;
};
export type SkillOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "code" | "name" | "nameTa" | "categoryId" | "active" | "sortOrder", ExtArgs["result"]["skill"]>;
export type SkillInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jobSkills?: boolean | Prisma.Skill$jobSkillsArgs<ExtArgs>;
    workerSkills?: boolean | Prisma.Skill$workerSkillsArgs<ExtArgs>;
    category?: boolean | Prisma.Skill$categoryArgs<ExtArgs>;
    _count?: boolean | Prisma.SkillCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $SkillPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Skill";
    objects: {
        jobSkills: Prisma.$JobSkillPayload<ExtArgs>[];
        workerSkills: Prisma.$WorkerSkillPayload<ExtArgs>[];
        category: Prisma.$JobCategoryPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        code: string;
        name: string;
        nameTa: string | null;
        categoryId: bigint | null;
        active: boolean;
        sortOrder: number;
    }, ExtArgs["result"]["skill"]>;
    composites: {};
};
export type SkillGetPayload<S extends boolean | null | undefined | SkillDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SkillPayload, S>;
export type SkillCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SkillCountAggregateInputType | true;
};
export interface SkillDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Skill'];
        meta: {
            name: 'Skill';
        };
    };
    findUnique<T extends SkillFindUniqueArgs>(args: Prisma.SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SkillFindFirstArgs>(args?: Prisma.SelectSubset<T, SkillFindFirstArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SkillFindManyArgs>(args?: Prisma.SelectSubset<T, SkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SkillCreateArgs>(args: Prisma.SelectSubset<T, SkillCreateArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SkillCreateManyArgs>(args?: Prisma.SelectSubset<T, SkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SkillDeleteArgs>(args: Prisma.SelectSubset<T, SkillDeleteArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SkillUpdateArgs>(args: Prisma.SelectSubset<T, SkillUpdateArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SkillDeleteManyArgs>(args?: Prisma.SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SkillUpdateManyArgs>(args: Prisma.SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SkillUpsertArgs>(args: Prisma.SelectSubset<T, SkillUpsertArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SkillCountArgs>(args?: Prisma.Subset<T, SkillCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SkillCountAggregateOutputType> : number>;
    aggregate<T extends SkillAggregateArgs>(args: Prisma.Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>;
    groupBy<T extends SkillGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SkillGroupByArgs['orderBy'];
    } : {
        orderBy?: SkillGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SkillFieldRefs;
}
export interface Prisma__SkillClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    jobSkills<T extends Prisma.Skill$jobSkillsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Skill$jobSkillsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    workerSkills<T extends Prisma.Skill$workerSkillsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Skill$workerSkillsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    category<T extends Prisma.Skill$categoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Skill$categoryArgs<ExtArgs>>): Prisma.Prisma__JobCategoryClient<runtime.Types.Result.GetResult<Prisma.$JobCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SkillFieldRefs {
    readonly id: Prisma.FieldRef<"Skill", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"Skill", 'String'>;
    readonly code: Prisma.FieldRef<"Skill", 'String'>;
    readonly name: Prisma.FieldRef<"Skill", 'String'>;
    readonly nameTa: Prisma.FieldRef<"Skill", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Skill", 'BigInt'>;
    readonly active: Prisma.FieldRef<"Skill", 'Boolean'>;
    readonly sortOrder: Prisma.FieldRef<"Skill", 'Int'>;
}
export type SkillFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
    where: Prisma.SkillWhereUniqueInput;
};
export type SkillFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
    where: Prisma.SkillWhereUniqueInput;
};
export type SkillFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SkillFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SkillFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SkillCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SkillCreateInput, Prisma.SkillUncheckedCreateInput>;
};
export type SkillCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SkillCreateManyInput | Prisma.SkillCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SkillUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SkillUpdateInput, Prisma.SkillUncheckedUpdateInput>;
    where: Prisma.SkillWhereUniqueInput;
};
export type SkillUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SkillUpdateManyMutationInput, Prisma.SkillUncheckedUpdateManyInput>;
    where?: Prisma.SkillWhereInput;
    limit?: number;
};
export type SkillUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
    where: Prisma.SkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.SkillCreateInput, Prisma.SkillUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SkillUpdateInput, Prisma.SkillUncheckedUpdateInput>;
};
export type SkillDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
    where: Prisma.SkillWhereUniqueInput;
};
export type SkillDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SkillWhereInput;
    limit?: number;
};
export type Skill$jobSkillsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
    where?: Prisma.JobSkillWhereInput;
    orderBy?: Prisma.JobSkillOrderByWithRelationInput | Prisma.JobSkillOrderByWithRelationInput[];
    cursor?: Prisma.JobSkillWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobSkillScalarFieldEnum | Prisma.JobSkillScalarFieldEnum[];
};
export type Skill$workerSkillsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
    where?: Prisma.WorkerSkillWhereInput;
    orderBy?: Prisma.WorkerSkillOrderByWithRelationInput | Prisma.WorkerSkillOrderByWithRelationInput[];
    cursor?: Prisma.WorkerSkillWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkerSkillScalarFieldEnum | Prisma.WorkerSkillScalarFieldEnum[];
};
export type Skill$categoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobCategorySelect<ExtArgs> | null;
    omit?: Prisma.JobCategoryOmit<ExtArgs> | null;
    include?: Prisma.JobCategoryInclude<ExtArgs> | null;
    where?: Prisma.JobCategoryWhereInput;
};
export type SkillDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SkillSelect<ExtArgs> | null;
    omit?: Prisma.SkillOmit<ExtArgs> | null;
    include?: Prisma.SkillInclude<ExtArgs> | null;
};
