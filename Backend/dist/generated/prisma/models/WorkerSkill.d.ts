import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkerSkillModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkerSkillPayload>;
export type AggregateWorkerSkill = {
    _count: WorkerSkillCountAggregateOutputType | null;
    _avg: WorkerSkillAvgAggregateOutputType | null;
    _sum: WorkerSkillSumAggregateOutputType | null;
    _min: WorkerSkillMinAggregateOutputType | null;
    _max: WorkerSkillMaxAggregateOutputType | null;
};
export type WorkerSkillAvgAggregateOutputType = {
    id: number | null;
    workerProfileId: number | null;
    skillId: number | null;
    yearsHint: number | null;
};
export type WorkerSkillSumAggregateOutputType = {
    id: bigint | null;
    workerProfileId: bigint | null;
    skillId: bigint | null;
    yearsHint: number | null;
};
export type WorkerSkillMinAggregateOutputType = {
    id: bigint | null;
    workerProfileId: bigint | null;
    skillId: bigint | null;
    yearsHint: number | null;
};
export type WorkerSkillMaxAggregateOutputType = {
    id: bigint | null;
    workerProfileId: bigint | null;
    skillId: bigint | null;
    yearsHint: number | null;
};
export type WorkerSkillCountAggregateOutputType = {
    id: number;
    workerProfileId: number;
    skillId: number;
    yearsHint: number;
    _all: number;
};
export type WorkerSkillAvgAggregateInputType = {
    id?: true;
    workerProfileId?: true;
    skillId?: true;
    yearsHint?: true;
};
export type WorkerSkillSumAggregateInputType = {
    id?: true;
    workerProfileId?: true;
    skillId?: true;
    yearsHint?: true;
};
export type WorkerSkillMinAggregateInputType = {
    id?: true;
    workerProfileId?: true;
    skillId?: true;
    yearsHint?: true;
};
export type WorkerSkillMaxAggregateInputType = {
    id?: true;
    workerProfileId?: true;
    skillId?: true;
    yearsHint?: true;
};
export type WorkerSkillCountAggregateInputType = {
    id?: true;
    workerProfileId?: true;
    skillId?: true;
    yearsHint?: true;
    _all?: true;
};
export type WorkerSkillAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerSkillWhereInput;
    orderBy?: Prisma.WorkerSkillOrderByWithRelationInput | Prisma.WorkerSkillOrderByWithRelationInput[];
    cursor?: Prisma.WorkerSkillWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkerSkillCountAggregateInputType;
    _avg?: WorkerSkillAvgAggregateInputType;
    _sum?: WorkerSkillSumAggregateInputType;
    _min?: WorkerSkillMinAggregateInputType;
    _max?: WorkerSkillMaxAggregateInputType;
};
export type GetWorkerSkillAggregateType<T extends WorkerSkillAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkerSkill]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkerSkill[P]> : Prisma.GetScalarType<T[P], AggregateWorkerSkill[P]>;
};
export type WorkerSkillGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerSkillWhereInput;
    orderBy?: Prisma.WorkerSkillOrderByWithAggregationInput | Prisma.WorkerSkillOrderByWithAggregationInput[];
    by: Prisma.WorkerSkillScalarFieldEnum[] | Prisma.WorkerSkillScalarFieldEnum;
    having?: Prisma.WorkerSkillScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkerSkillCountAggregateInputType | true;
    _avg?: WorkerSkillAvgAggregateInputType;
    _sum?: WorkerSkillSumAggregateInputType;
    _min?: WorkerSkillMinAggregateInputType;
    _max?: WorkerSkillMaxAggregateInputType;
};
export type WorkerSkillGroupByOutputType = {
    id: bigint;
    workerProfileId: bigint;
    skillId: bigint;
    yearsHint: number | null;
    _count: WorkerSkillCountAggregateOutputType | null;
    _avg: WorkerSkillAvgAggregateOutputType | null;
    _sum: WorkerSkillSumAggregateOutputType | null;
    _min: WorkerSkillMinAggregateOutputType | null;
    _max: WorkerSkillMaxAggregateOutputType | null;
};
export type GetWorkerSkillGroupByPayload<T extends WorkerSkillGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkerSkillGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkerSkillGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkerSkillGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkerSkillGroupByOutputType[P]>;
}>>;
export type WorkerSkillWhereInput = {
    AND?: Prisma.WorkerSkillWhereInput | Prisma.WorkerSkillWhereInput[];
    OR?: Prisma.WorkerSkillWhereInput[];
    NOT?: Prisma.WorkerSkillWhereInput | Prisma.WorkerSkillWhereInput[];
    id?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    skillId?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    yearsHint?: Prisma.IntNullableFilter<"WorkerSkill"> | number | null;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    skill?: Prisma.XOR<Prisma.SkillScalarRelationFilter, Prisma.SkillWhereInput>;
};
export type WorkerSkillOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    yearsHint?: Prisma.SortOrderInput | Prisma.SortOrder;
    workerProfile?: Prisma.WorkerProfileOrderByWithRelationInput;
    skill?: Prisma.SkillOrderByWithRelationInput;
};
export type WorkerSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    workerProfileId_skillId?: Prisma.WorkerSkillWorkerProfileIdSkillIdCompoundUniqueInput;
    AND?: Prisma.WorkerSkillWhereInput | Prisma.WorkerSkillWhereInput[];
    OR?: Prisma.WorkerSkillWhereInput[];
    NOT?: Prisma.WorkerSkillWhereInput | Prisma.WorkerSkillWhereInput[];
    workerProfileId?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    skillId?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    yearsHint?: Prisma.IntNullableFilter<"WorkerSkill"> | number | null;
    workerProfile?: Prisma.XOR<Prisma.WorkerProfileScalarRelationFilter, Prisma.WorkerProfileWhereInput>;
    skill?: Prisma.XOR<Prisma.SkillScalarRelationFilter, Prisma.SkillWhereInput>;
}, "id" | "workerProfileId_skillId">;
export type WorkerSkillOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    yearsHint?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorkerSkillCountOrderByAggregateInput;
    _avg?: Prisma.WorkerSkillAvgOrderByAggregateInput;
    _max?: Prisma.WorkerSkillMaxOrderByAggregateInput;
    _min?: Prisma.WorkerSkillMinOrderByAggregateInput;
    _sum?: Prisma.WorkerSkillSumOrderByAggregateInput;
};
export type WorkerSkillScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkerSkillScalarWhereWithAggregatesInput | Prisma.WorkerSkillScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkerSkillScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkerSkillScalarWhereWithAggregatesInput | Prisma.WorkerSkillScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"WorkerSkill"> | bigint | number;
    workerProfileId?: Prisma.BigIntWithAggregatesFilter<"WorkerSkill"> | bigint | number;
    skillId?: Prisma.BigIntWithAggregatesFilter<"WorkerSkill"> | bigint | number;
    yearsHint?: Prisma.IntNullableWithAggregatesFilter<"WorkerSkill"> | number | null;
};
export type WorkerSkillCreateInput = {
    id?: bigint | number;
    yearsHint?: number | null;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutSkillsInput;
    skill: Prisma.SkillCreateNestedOneWithoutWorkerSkillsInput;
};
export type WorkerSkillUncheckedCreateInput = {
    id?: bigint | number;
    workerProfileId: bigint | number;
    skillId: bigint | number;
    yearsHint?: number | null;
};
export type WorkerSkillUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutSkillsNestedInput;
    skill?: Prisma.SkillUpdateOneRequiredWithoutWorkerSkillsNestedInput;
};
export type WorkerSkillUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkerSkillCreateManyInput = {
    id?: bigint | number;
    workerProfileId: bigint | number;
    skillId: bigint | number;
    yearsHint?: number | null;
};
export type WorkerSkillUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkerSkillUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkerSkillListRelationFilter = {
    every?: Prisma.WorkerSkillWhereInput;
    some?: Prisma.WorkerSkillWhereInput;
    none?: Prisma.WorkerSkillWhereInput;
};
export type WorkerSkillOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkerSkillWorkerProfileIdSkillIdCompoundUniqueInput = {
    workerProfileId: bigint | number;
    skillId: bigint | number;
};
export type WorkerSkillCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    yearsHint?: Prisma.SortOrder;
};
export type WorkerSkillAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    yearsHint?: Prisma.SortOrder;
};
export type WorkerSkillMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    yearsHint?: Prisma.SortOrder;
};
export type WorkerSkillMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    yearsHint?: Prisma.SortOrder;
};
export type WorkerSkillSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workerProfileId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    yearsHint?: Prisma.SortOrder;
};
export type WorkerSkillCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput> | Prisma.WorkerSkillCreateWithoutWorkerProfileInput[] | Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput | Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.WorkerSkillCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
};
export type WorkerSkillUncheckedCreateNestedManyWithoutWorkerProfileInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput> | Prisma.WorkerSkillCreateWithoutWorkerProfileInput[] | Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput | Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput[];
    createMany?: Prisma.WorkerSkillCreateManyWorkerProfileInputEnvelope;
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
};
export type WorkerSkillUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput> | Prisma.WorkerSkillCreateWithoutWorkerProfileInput[] | Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput | Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.WorkerSkillUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.WorkerSkillUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.WorkerSkillCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    disconnect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    delete?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    update?: Prisma.WorkerSkillUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.WorkerSkillUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.WorkerSkillUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.WorkerSkillUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.WorkerSkillScalarWhereInput | Prisma.WorkerSkillScalarWhereInput[];
};
export type WorkerSkillUncheckedUpdateManyWithoutWorkerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput> | Prisma.WorkerSkillCreateWithoutWorkerProfileInput[] | Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput | Prisma.WorkerSkillCreateOrConnectWithoutWorkerProfileInput[];
    upsert?: Prisma.WorkerSkillUpsertWithWhereUniqueWithoutWorkerProfileInput | Prisma.WorkerSkillUpsertWithWhereUniqueWithoutWorkerProfileInput[];
    createMany?: Prisma.WorkerSkillCreateManyWorkerProfileInputEnvelope;
    set?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    disconnect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    delete?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    update?: Prisma.WorkerSkillUpdateWithWhereUniqueWithoutWorkerProfileInput | Prisma.WorkerSkillUpdateWithWhereUniqueWithoutWorkerProfileInput[];
    updateMany?: Prisma.WorkerSkillUpdateManyWithWhereWithoutWorkerProfileInput | Prisma.WorkerSkillUpdateManyWithWhereWithoutWorkerProfileInput[];
    deleteMany?: Prisma.WorkerSkillScalarWhereInput | Prisma.WorkerSkillScalarWhereInput[];
};
export type WorkerSkillCreateNestedManyWithoutSkillInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutSkillInput, Prisma.WorkerSkillUncheckedCreateWithoutSkillInput> | Prisma.WorkerSkillCreateWithoutSkillInput[] | Prisma.WorkerSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutSkillInput | Prisma.WorkerSkillCreateOrConnectWithoutSkillInput[];
    createMany?: Prisma.WorkerSkillCreateManySkillInputEnvelope;
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
};
export type WorkerSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutSkillInput, Prisma.WorkerSkillUncheckedCreateWithoutSkillInput> | Prisma.WorkerSkillCreateWithoutSkillInput[] | Prisma.WorkerSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutSkillInput | Prisma.WorkerSkillCreateOrConnectWithoutSkillInput[];
    createMany?: Prisma.WorkerSkillCreateManySkillInputEnvelope;
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
};
export type WorkerSkillUpdateManyWithoutSkillNestedInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutSkillInput, Prisma.WorkerSkillUncheckedCreateWithoutSkillInput> | Prisma.WorkerSkillCreateWithoutSkillInput[] | Prisma.WorkerSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutSkillInput | Prisma.WorkerSkillCreateOrConnectWithoutSkillInput[];
    upsert?: Prisma.WorkerSkillUpsertWithWhereUniqueWithoutSkillInput | Prisma.WorkerSkillUpsertWithWhereUniqueWithoutSkillInput[];
    createMany?: Prisma.WorkerSkillCreateManySkillInputEnvelope;
    set?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    disconnect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    delete?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    update?: Prisma.WorkerSkillUpdateWithWhereUniqueWithoutSkillInput | Prisma.WorkerSkillUpdateWithWhereUniqueWithoutSkillInput[];
    updateMany?: Prisma.WorkerSkillUpdateManyWithWhereWithoutSkillInput | Prisma.WorkerSkillUpdateManyWithWhereWithoutSkillInput[];
    deleteMany?: Prisma.WorkerSkillScalarWhereInput | Prisma.WorkerSkillScalarWhereInput[];
};
export type WorkerSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: Prisma.XOR<Prisma.WorkerSkillCreateWithoutSkillInput, Prisma.WorkerSkillUncheckedCreateWithoutSkillInput> | Prisma.WorkerSkillCreateWithoutSkillInput[] | Prisma.WorkerSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.WorkerSkillCreateOrConnectWithoutSkillInput | Prisma.WorkerSkillCreateOrConnectWithoutSkillInput[];
    upsert?: Prisma.WorkerSkillUpsertWithWhereUniqueWithoutSkillInput | Prisma.WorkerSkillUpsertWithWhereUniqueWithoutSkillInput[];
    createMany?: Prisma.WorkerSkillCreateManySkillInputEnvelope;
    set?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    disconnect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    delete?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    connect?: Prisma.WorkerSkillWhereUniqueInput | Prisma.WorkerSkillWhereUniqueInput[];
    update?: Prisma.WorkerSkillUpdateWithWhereUniqueWithoutSkillInput | Prisma.WorkerSkillUpdateWithWhereUniqueWithoutSkillInput[];
    updateMany?: Prisma.WorkerSkillUpdateManyWithWhereWithoutSkillInput | Prisma.WorkerSkillUpdateManyWithWhereWithoutSkillInput[];
    deleteMany?: Prisma.WorkerSkillScalarWhereInput | Prisma.WorkerSkillScalarWhereInput[];
};
export type WorkerSkillCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    yearsHint?: number | null;
    skill: Prisma.SkillCreateNestedOneWithoutWorkerSkillsInput;
};
export type WorkerSkillUncheckedCreateWithoutWorkerProfileInput = {
    id?: bigint | number;
    skillId: bigint | number;
    yearsHint?: number | null;
};
export type WorkerSkillCreateOrConnectWithoutWorkerProfileInput = {
    where: Prisma.WorkerSkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkerSkillCreateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput>;
};
export type WorkerSkillCreateManyWorkerProfileInputEnvelope = {
    data: Prisma.WorkerSkillCreateManyWorkerProfileInput | Prisma.WorkerSkillCreateManyWorkerProfileInput[];
    skipDuplicates?: boolean;
};
export type WorkerSkillUpsertWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.WorkerSkillWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkerSkillUpdateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedUpdateWithoutWorkerProfileInput>;
    create: Prisma.XOR<Prisma.WorkerSkillCreateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedCreateWithoutWorkerProfileInput>;
};
export type WorkerSkillUpdateWithWhereUniqueWithoutWorkerProfileInput = {
    where: Prisma.WorkerSkillWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkerSkillUpdateWithoutWorkerProfileInput, Prisma.WorkerSkillUncheckedUpdateWithoutWorkerProfileInput>;
};
export type WorkerSkillUpdateManyWithWhereWithoutWorkerProfileInput = {
    where: Prisma.WorkerSkillScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkerSkillUpdateManyMutationInput, Prisma.WorkerSkillUncheckedUpdateManyWithoutWorkerProfileInput>;
};
export type WorkerSkillScalarWhereInput = {
    AND?: Prisma.WorkerSkillScalarWhereInput | Prisma.WorkerSkillScalarWhereInput[];
    OR?: Prisma.WorkerSkillScalarWhereInput[];
    NOT?: Prisma.WorkerSkillScalarWhereInput | Prisma.WorkerSkillScalarWhereInput[];
    id?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    workerProfileId?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    skillId?: Prisma.BigIntFilter<"WorkerSkill"> | bigint | number;
    yearsHint?: Prisma.IntNullableFilter<"WorkerSkill"> | number | null;
};
export type WorkerSkillCreateWithoutSkillInput = {
    id?: bigint | number;
    yearsHint?: number | null;
    workerProfile: Prisma.WorkerProfileCreateNestedOneWithoutSkillsInput;
};
export type WorkerSkillUncheckedCreateWithoutSkillInput = {
    id?: bigint | number;
    workerProfileId: bigint | number;
    yearsHint?: number | null;
};
export type WorkerSkillCreateOrConnectWithoutSkillInput = {
    where: Prisma.WorkerSkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkerSkillCreateWithoutSkillInput, Prisma.WorkerSkillUncheckedCreateWithoutSkillInput>;
};
export type WorkerSkillCreateManySkillInputEnvelope = {
    data: Prisma.WorkerSkillCreateManySkillInput | Prisma.WorkerSkillCreateManySkillInput[];
    skipDuplicates?: boolean;
};
export type WorkerSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: Prisma.WorkerSkillWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkerSkillUpdateWithoutSkillInput, Prisma.WorkerSkillUncheckedUpdateWithoutSkillInput>;
    create: Prisma.XOR<Prisma.WorkerSkillCreateWithoutSkillInput, Prisma.WorkerSkillUncheckedCreateWithoutSkillInput>;
};
export type WorkerSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: Prisma.WorkerSkillWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkerSkillUpdateWithoutSkillInput, Prisma.WorkerSkillUncheckedUpdateWithoutSkillInput>;
};
export type WorkerSkillUpdateManyWithWhereWithoutSkillInput = {
    where: Prisma.WorkerSkillScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkerSkillUpdateManyMutationInput, Prisma.WorkerSkillUncheckedUpdateManyWithoutSkillInput>;
};
export type WorkerSkillCreateManyWorkerProfileInput = {
    id?: bigint | number;
    skillId: bigint | number;
    yearsHint?: number | null;
};
export type WorkerSkillUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    skill?: Prisma.SkillUpdateOneRequiredWithoutWorkerSkillsNestedInput;
};
export type WorkerSkillUncheckedUpdateWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkerSkillUncheckedUpdateManyWithoutWorkerProfileInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkerSkillCreateManySkillInput = {
    id?: bigint | number;
    workerProfileId: bigint | number;
    yearsHint?: number | null;
};
export type WorkerSkillUpdateWithoutSkillInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workerProfile?: Prisma.WorkerProfileUpdateOneRequiredWithoutSkillsNestedInput;
};
export type WorkerSkillUncheckedUpdateWithoutSkillInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkerSkillUncheckedUpdateManyWithoutSkillInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workerProfileId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    yearsHint?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkerSkillSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workerProfileId?: boolean;
    skillId?: boolean;
    yearsHint?: boolean;
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    skill?: boolean | Prisma.SkillDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workerSkill"]>;
export type WorkerSkillSelectScalar = {
    id?: boolean;
    workerProfileId?: boolean;
    skillId?: boolean;
    yearsHint?: boolean;
};
export type WorkerSkillOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workerProfileId" | "skillId" | "yearsHint", ExtArgs["result"]["workerSkill"]>;
export type WorkerSkillInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workerProfile?: boolean | Prisma.WorkerProfileDefaultArgs<ExtArgs>;
    skill?: boolean | Prisma.SkillDefaultArgs<ExtArgs>;
};
export type $WorkerSkillPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkerSkill";
    objects: {
        workerProfile: Prisma.$WorkerProfilePayload<ExtArgs>;
        skill: Prisma.$SkillPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        workerProfileId: bigint;
        skillId: bigint;
        yearsHint: number | null;
    }, ExtArgs["result"]["workerSkill"]>;
    composites: {};
};
export type WorkerSkillGetPayload<S extends boolean | null | undefined | WorkerSkillDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload, S>;
export type WorkerSkillCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkerSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkerSkillCountAggregateInputType | true;
};
export interface WorkerSkillDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkerSkill'];
        meta: {
            name: 'WorkerSkill';
        };
    };
    findUnique<T extends WorkerSkillFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkerSkillFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkerSkillFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkerSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkerSkillFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkerSkillFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkerSkillFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkerSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkerSkillFindManyArgs>(args?: Prisma.SelectSubset<T, WorkerSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkerSkillCreateArgs>(args: Prisma.SelectSubset<T, WorkerSkillCreateArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkerSkillCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkerSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends WorkerSkillDeleteArgs>(args: Prisma.SelectSubset<T, WorkerSkillDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkerSkillUpdateArgs>(args: Prisma.SelectSubset<T, WorkerSkillUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkerSkillDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkerSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkerSkillUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkerSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends WorkerSkillUpsertArgs>(args: Prisma.SelectSubset<T, WorkerSkillUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkerSkillClient<runtime.Types.Result.GetResult<Prisma.$WorkerSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkerSkillCountArgs>(args?: Prisma.Subset<T, WorkerSkillCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkerSkillCountAggregateOutputType> : number>;
    aggregate<T extends WorkerSkillAggregateArgs>(args: Prisma.Subset<T, WorkerSkillAggregateArgs>): Prisma.PrismaPromise<GetWorkerSkillAggregateType<T>>;
    groupBy<T extends WorkerSkillGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkerSkillGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkerSkillGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkerSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkerSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkerSkillFieldRefs;
}
export interface Prisma__WorkerSkillClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workerProfile<T extends Prisma.WorkerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkerProfileClient<runtime.Types.Result.GetResult<Prisma.$WorkerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    skill<T extends Prisma.SkillDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SkillDefaultArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkerSkillFieldRefs {
    readonly id: Prisma.FieldRef<"WorkerSkill", 'BigInt'>;
    readonly workerProfileId: Prisma.FieldRef<"WorkerSkill", 'BigInt'>;
    readonly skillId: Prisma.FieldRef<"WorkerSkill", 'BigInt'>;
    readonly yearsHint: Prisma.FieldRef<"WorkerSkill", 'Int'>;
}
export type WorkerSkillFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
    where: Prisma.WorkerSkillWhereUniqueInput;
};
export type WorkerSkillFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
    where: Prisma.WorkerSkillWhereUniqueInput;
};
export type WorkerSkillFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkerSkillFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkerSkillFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkerSkillCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkerSkillCreateInput, Prisma.WorkerSkillUncheckedCreateInput>;
};
export type WorkerSkillCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkerSkillCreateManyInput | Prisma.WorkerSkillCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkerSkillUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkerSkillUpdateInput, Prisma.WorkerSkillUncheckedUpdateInput>;
    where: Prisma.WorkerSkillWhereUniqueInput;
};
export type WorkerSkillUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkerSkillUpdateManyMutationInput, Prisma.WorkerSkillUncheckedUpdateManyInput>;
    where?: Prisma.WorkerSkillWhereInput;
    limit?: number;
};
export type WorkerSkillUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
    where: Prisma.WorkerSkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkerSkillCreateInput, Prisma.WorkerSkillUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkerSkillUpdateInput, Prisma.WorkerSkillUncheckedUpdateInput>;
};
export type WorkerSkillDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
    where: Prisma.WorkerSkillWhereUniqueInput;
};
export type WorkerSkillDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkerSkillWhereInput;
    limit?: number;
};
export type WorkerSkillDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkerSkillSelect<ExtArgs> | null;
    omit?: Prisma.WorkerSkillOmit<ExtArgs> | null;
    include?: Prisma.WorkerSkillInclude<ExtArgs> | null;
};
