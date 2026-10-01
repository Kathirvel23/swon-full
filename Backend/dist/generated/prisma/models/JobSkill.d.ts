import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type JobSkillModel = runtime.Types.Result.DefaultSelection<Prisma.$JobSkillPayload>;
export type AggregateJobSkill = {
    _count: JobSkillCountAggregateOutputType | null;
    _avg: JobSkillAvgAggregateOutputType | null;
    _sum: JobSkillSumAggregateOutputType | null;
    _min: JobSkillMinAggregateOutputType | null;
    _max: JobSkillMaxAggregateOutputType | null;
};
export type JobSkillAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    skillId: number | null;
};
export type JobSkillSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    skillId: bigint | null;
};
export type JobSkillMinAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    skillId: bigint | null;
};
export type JobSkillMaxAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    skillId: bigint | null;
};
export type JobSkillCountAggregateOutputType = {
    id: number;
    jobId: number;
    skillId: number;
    _all: number;
};
export type JobSkillAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    skillId?: true;
};
export type JobSkillSumAggregateInputType = {
    id?: true;
    jobId?: true;
    skillId?: true;
};
export type JobSkillMinAggregateInputType = {
    id?: true;
    jobId?: true;
    skillId?: true;
};
export type JobSkillMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    skillId?: true;
};
export type JobSkillCountAggregateInputType = {
    id?: true;
    jobId?: true;
    skillId?: true;
    _all?: true;
};
export type JobSkillAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobSkillWhereInput;
    orderBy?: Prisma.JobSkillOrderByWithRelationInput | Prisma.JobSkillOrderByWithRelationInput[];
    cursor?: Prisma.JobSkillWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobSkillCountAggregateInputType;
    _avg?: JobSkillAvgAggregateInputType;
    _sum?: JobSkillSumAggregateInputType;
    _min?: JobSkillMinAggregateInputType;
    _max?: JobSkillMaxAggregateInputType;
};
export type GetJobSkillAggregateType<T extends JobSkillAggregateArgs> = {
    [P in keyof T & keyof AggregateJobSkill]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobSkill[P]> : Prisma.GetScalarType<T[P], AggregateJobSkill[P]>;
};
export type JobSkillGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobSkillWhereInput;
    orderBy?: Prisma.JobSkillOrderByWithAggregationInput | Prisma.JobSkillOrderByWithAggregationInput[];
    by: Prisma.JobSkillScalarFieldEnum[] | Prisma.JobSkillScalarFieldEnum;
    having?: Prisma.JobSkillScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobSkillCountAggregateInputType | true;
    _avg?: JobSkillAvgAggregateInputType;
    _sum?: JobSkillSumAggregateInputType;
    _min?: JobSkillMinAggregateInputType;
    _max?: JobSkillMaxAggregateInputType;
};
export type JobSkillGroupByOutputType = {
    id: bigint;
    jobId: bigint;
    skillId: bigint;
    _count: JobSkillCountAggregateOutputType | null;
    _avg: JobSkillAvgAggregateOutputType | null;
    _sum: JobSkillSumAggregateOutputType | null;
    _min: JobSkillMinAggregateOutputType | null;
    _max: JobSkillMaxAggregateOutputType | null;
};
export type GetJobSkillGroupByPayload<T extends JobSkillGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobSkillGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobSkillGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobSkillGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobSkillGroupByOutputType[P]>;
}>>;
export type JobSkillWhereInput = {
    AND?: Prisma.JobSkillWhereInput | Prisma.JobSkillWhereInput[];
    OR?: Prisma.JobSkillWhereInput[];
    NOT?: Prisma.JobSkillWhereInput | Prisma.JobSkillWhereInput[];
    id?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
    jobId?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
    skillId?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    skill?: Prisma.XOR<Prisma.SkillScalarRelationFilter, Prisma.SkillWhereInput>;
};
export type JobSkillOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    skill?: Prisma.SkillOrderByWithRelationInput;
};
export type JobSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    jobId_skillId?: Prisma.JobSkillJobIdSkillIdCompoundUniqueInput;
    AND?: Prisma.JobSkillWhereInput | Prisma.JobSkillWhereInput[];
    OR?: Prisma.JobSkillWhereInput[];
    NOT?: Prisma.JobSkillWhereInput | Prisma.JobSkillWhereInput[];
    jobId?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
    skillId?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    skill?: Prisma.XOR<Prisma.SkillScalarRelationFilter, Prisma.SkillWhereInput>;
}, "id" | "jobId_skillId">;
export type JobSkillOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
    _count?: Prisma.JobSkillCountOrderByAggregateInput;
    _avg?: Prisma.JobSkillAvgOrderByAggregateInput;
    _max?: Prisma.JobSkillMaxOrderByAggregateInput;
    _min?: Prisma.JobSkillMinOrderByAggregateInput;
    _sum?: Prisma.JobSkillSumOrderByAggregateInput;
};
export type JobSkillScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobSkillScalarWhereWithAggregatesInput | Prisma.JobSkillScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobSkillScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobSkillScalarWhereWithAggregatesInput | Prisma.JobSkillScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"JobSkill"> | bigint | number;
    jobId?: Prisma.BigIntWithAggregatesFilter<"JobSkill"> | bigint | number;
    skillId?: Prisma.BigIntWithAggregatesFilter<"JobSkill"> | bigint | number;
};
export type JobSkillCreateInput = {
    id?: bigint | number;
    job: Prisma.JobCreateNestedOneWithoutSkillsInput;
    skill: Prisma.SkillCreateNestedOneWithoutJobSkillsInput;
};
export type JobSkillUncheckedCreateInput = {
    id?: bigint | number;
    jobId: bigint | number;
    skillId: bigint | number;
};
export type JobSkillUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    job?: Prisma.JobUpdateOneRequiredWithoutSkillsNestedInput;
    skill?: Prisma.SkillUpdateOneRequiredWithoutJobSkillsNestedInput;
};
export type JobSkillUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type JobSkillCreateManyInput = {
    id?: bigint | number;
    jobId: bigint | number;
    skillId: bigint | number;
};
export type JobSkillUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type JobSkillUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type JobSkillListRelationFilter = {
    every?: Prisma.JobSkillWhereInput;
    some?: Prisma.JobSkillWhereInput;
    none?: Prisma.JobSkillWhereInput;
};
export type JobSkillOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobSkillJobIdSkillIdCompoundUniqueInput = {
    jobId: bigint | number;
    skillId: bigint | number;
};
export type JobSkillCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
};
export type JobSkillAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
};
export type JobSkillMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
};
export type JobSkillMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
};
export type JobSkillSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    skillId?: Prisma.SortOrder;
};
export type JobSkillCreateNestedManyWithoutSkillInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutSkillInput, Prisma.JobSkillUncheckedCreateWithoutSkillInput> | Prisma.JobSkillCreateWithoutSkillInput[] | Prisma.JobSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutSkillInput | Prisma.JobSkillCreateOrConnectWithoutSkillInput[];
    createMany?: Prisma.JobSkillCreateManySkillInputEnvelope;
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
};
export type JobSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutSkillInput, Prisma.JobSkillUncheckedCreateWithoutSkillInput> | Prisma.JobSkillCreateWithoutSkillInput[] | Prisma.JobSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutSkillInput | Prisma.JobSkillCreateOrConnectWithoutSkillInput[];
    createMany?: Prisma.JobSkillCreateManySkillInputEnvelope;
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
};
export type JobSkillUpdateManyWithoutSkillNestedInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutSkillInput, Prisma.JobSkillUncheckedCreateWithoutSkillInput> | Prisma.JobSkillCreateWithoutSkillInput[] | Prisma.JobSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutSkillInput | Prisma.JobSkillCreateOrConnectWithoutSkillInput[];
    upsert?: Prisma.JobSkillUpsertWithWhereUniqueWithoutSkillInput | Prisma.JobSkillUpsertWithWhereUniqueWithoutSkillInput[];
    createMany?: Prisma.JobSkillCreateManySkillInputEnvelope;
    set?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    disconnect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    delete?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    update?: Prisma.JobSkillUpdateWithWhereUniqueWithoutSkillInput | Prisma.JobSkillUpdateWithWhereUniqueWithoutSkillInput[];
    updateMany?: Prisma.JobSkillUpdateManyWithWhereWithoutSkillInput | Prisma.JobSkillUpdateManyWithWhereWithoutSkillInput[];
    deleteMany?: Prisma.JobSkillScalarWhereInput | Prisma.JobSkillScalarWhereInput[];
};
export type JobSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutSkillInput, Prisma.JobSkillUncheckedCreateWithoutSkillInput> | Prisma.JobSkillCreateWithoutSkillInput[] | Prisma.JobSkillUncheckedCreateWithoutSkillInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutSkillInput | Prisma.JobSkillCreateOrConnectWithoutSkillInput[];
    upsert?: Prisma.JobSkillUpsertWithWhereUniqueWithoutSkillInput | Prisma.JobSkillUpsertWithWhereUniqueWithoutSkillInput[];
    createMany?: Prisma.JobSkillCreateManySkillInputEnvelope;
    set?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    disconnect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    delete?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    update?: Prisma.JobSkillUpdateWithWhereUniqueWithoutSkillInput | Prisma.JobSkillUpdateWithWhereUniqueWithoutSkillInput[];
    updateMany?: Prisma.JobSkillUpdateManyWithWhereWithoutSkillInput | Prisma.JobSkillUpdateManyWithWhereWithoutSkillInput[];
    deleteMany?: Prisma.JobSkillScalarWhereInput | Prisma.JobSkillScalarWhereInput[];
};
export type JobSkillCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutJobInput, Prisma.JobSkillUncheckedCreateWithoutJobInput> | Prisma.JobSkillCreateWithoutJobInput[] | Prisma.JobSkillUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutJobInput | Prisma.JobSkillCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobSkillCreateManyJobInputEnvelope;
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
};
export type JobSkillUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutJobInput, Prisma.JobSkillUncheckedCreateWithoutJobInput> | Prisma.JobSkillCreateWithoutJobInput[] | Prisma.JobSkillUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutJobInput | Prisma.JobSkillCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobSkillCreateManyJobInputEnvelope;
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
};
export type JobSkillUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutJobInput, Prisma.JobSkillUncheckedCreateWithoutJobInput> | Prisma.JobSkillCreateWithoutJobInput[] | Prisma.JobSkillUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutJobInput | Prisma.JobSkillCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobSkillUpsertWithWhereUniqueWithoutJobInput | Prisma.JobSkillUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobSkillCreateManyJobInputEnvelope;
    set?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    disconnect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    delete?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    update?: Prisma.JobSkillUpdateWithWhereUniqueWithoutJobInput | Prisma.JobSkillUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobSkillUpdateManyWithWhereWithoutJobInput | Prisma.JobSkillUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobSkillScalarWhereInput | Prisma.JobSkillScalarWhereInput[];
};
export type JobSkillUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobSkillCreateWithoutJobInput, Prisma.JobSkillUncheckedCreateWithoutJobInput> | Prisma.JobSkillCreateWithoutJobInput[] | Prisma.JobSkillUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobSkillCreateOrConnectWithoutJobInput | Prisma.JobSkillCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobSkillUpsertWithWhereUniqueWithoutJobInput | Prisma.JobSkillUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobSkillCreateManyJobInputEnvelope;
    set?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    disconnect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    delete?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    connect?: Prisma.JobSkillWhereUniqueInput | Prisma.JobSkillWhereUniqueInput[];
    update?: Prisma.JobSkillUpdateWithWhereUniqueWithoutJobInput | Prisma.JobSkillUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobSkillUpdateManyWithWhereWithoutJobInput | Prisma.JobSkillUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobSkillScalarWhereInput | Prisma.JobSkillScalarWhereInput[];
};
export type JobSkillCreateWithoutSkillInput = {
    id?: bigint | number;
    job: Prisma.JobCreateNestedOneWithoutSkillsInput;
};
export type JobSkillUncheckedCreateWithoutSkillInput = {
    id?: bigint | number;
    jobId: bigint | number;
};
export type JobSkillCreateOrConnectWithoutSkillInput = {
    where: Prisma.JobSkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobSkillCreateWithoutSkillInput, Prisma.JobSkillUncheckedCreateWithoutSkillInput>;
};
export type JobSkillCreateManySkillInputEnvelope = {
    data: Prisma.JobSkillCreateManySkillInput | Prisma.JobSkillCreateManySkillInput[];
    skipDuplicates?: boolean;
};
export type JobSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: Prisma.JobSkillWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobSkillUpdateWithoutSkillInput, Prisma.JobSkillUncheckedUpdateWithoutSkillInput>;
    create: Prisma.XOR<Prisma.JobSkillCreateWithoutSkillInput, Prisma.JobSkillUncheckedCreateWithoutSkillInput>;
};
export type JobSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: Prisma.JobSkillWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobSkillUpdateWithoutSkillInput, Prisma.JobSkillUncheckedUpdateWithoutSkillInput>;
};
export type JobSkillUpdateManyWithWhereWithoutSkillInput = {
    where: Prisma.JobSkillScalarWhereInput;
    data: Prisma.XOR<Prisma.JobSkillUpdateManyMutationInput, Prisma.JobSkillUncheckedUpdateManyWithoutSkillInput>;
};
export type JobSkillScalarWhereInput = {
    AND?: Prisma.JobSkillScalarWhereInput | Prisma.JobSkillScalarWhereInput[];
    OR?: Prisma.JobSkillScalarWhereInput[];
    NOT?: Prisma.JobSkillScalarWhereInput | Prisma.JobSkillScalarWhereInput[];
    id?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
    jobId?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
    skillId?: Prisma.BigIntFilter<"JobSkill"> | bigint | number;
};
export type JobSkillCreateWithoutJobInput = {
    id?: bigint | number;
    skill: Prisma.SkillCreateNestedOneWithoutJobSkillsInput;
};
export type JobSkillUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    skillId: bigint | number;
};
export type JobSkillCreateOrConnectWithoutJobInput = {
    where: Prisma.JobSkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobSkillCreateWithoutJobInput, Prisma.JobSkillUncheckedCreateWithoutJobInput>;
};
export type JobSkillCreateManyJobInputEnvelope = {
    data: Prisma.JobSkillCreateManyJobInput | Prisma.JobSkillCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type JobSkillUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobSkillWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobSkillUpdateWithoutJobInput, Prisma.JobSkillUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.JobSkillCreateWithoutJobInput, Prisma.JobSkillUncheckedCreateWithoutJobInput>;
};
export type JobSkillUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobSkillWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobSkillUpdateWithoutJobInput, Prisma.JobSkillUncheckedUpdateWithoutJobInput>;
};
export type JobSkillUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.JobSkillScalarWhereInput;
    data: Prisma.XOR<Prisma.JobSkillUpdateManyMutationInput, Prisma.JobSkillUncheckedUpdateManyWithoutJobInput>;
};
export type JobSkillCreateManySkillInput = {
    id?: bigint | number;
    jobId: bigint | number;
};
export type JobSkillUpdateWithoutSkillInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    job?: Prisma.JobUpdateOneRequiredWithoutSkillsNestedInput;
};
export type JobSkillUncheckedUpdateWithoutSkillInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type JobSkillUncheckedUpdateManyWithoutSkillInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type JobSkillCreateManyJobInput = {
    id?: bigint | number;
    skillId: bigint | number;
};
export type JobSkillUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skill?: Prisma.SkillUpdateOneRequiredWithoutJobSkillsNestedInput;
};
export type JobSkillUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type JobSkillUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    skillId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type JobSkillSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    skillId?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    skill?: boolean | Prisma.SkillDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobSkill"]>;
export type JobSkillSelectScalar = {
    id?: boolean;
    jobId?: boolean;
    skillId?: boolean;
};
export type JobSkillOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "skillId", ExtArgs["result"]["jobSkill"]>;
export type JobSkillInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    skill?: boolean | Prisma.SkillDefaultArgs<ExtArgs>;
};
export type $JobSkillPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobSkill";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        skill: Prisma.$SkillPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        jobId: bigint;
        skillId: bigint;
    }, ExtArgs["result"]["jobSkill"]>;
    composites: {};
};
export type JobSkillGetPayload<S extends boolean | null | undefined | JobSkillDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobSkillPayload, S>;
export type JobSkillCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobSkillCountAggregateInputType | true;
};
export interface JobSkillDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobSkill'];
        meta: {
            name: 'JobSkill';
        };
    };
    findUnique<T extends JobSkillFindUniqueArgs>(args: Prisma.SelectSubset<T, JobSkillFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobSkillFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobSkillFindFirstArgs>(args?: Prisma.SelectSubset<T, JobSkillFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobSkillFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobSkillFindManyArgs>(args?: Prisma.SelectSubset<T, JobSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobSkillCreateArgs>(args: Prisma.SelectSubset<T, JobSkillCreateArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobSkillCreateManyArgs>(args?: Prisma.SelectSubset<T, JobSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends JobSkillDeleteArgs>(args: Prisma.SelectSubset<T, JobSkillDeleteArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobSkillUpdateArgs>(args: Prisma.SelectSubset<T, JobSkillUpdateArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobSkillDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobSkillUpdateManyArgs>(args: Prisma.SelectSubset<T, JobSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends JobSkillUpsertArgs>(args: Prisma.SelectSubset<T, JobSkillUpsertArgs<ExtArgs>>): Prisma.Prisma__JobSkillClient<runtime.Types.Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobSkillCountArgs>(args?: Prisma.Subset<T, JobSkillCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobSkillCountAggregateOutputType> : number>;
    aggregate<T extends JobSkillAggregateArgs>(args: Prisma.Subset<T, JobSkillAggregateArgs>): Prisma.PrismaPromise<GetJobSkillAggregateType<T>>;
    groupBy<T extends JobSkillGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobSkillGroupByArgs['orderBy'];
    } : {
        orderBy?: JobSkillGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobSkillFieldRefs;
}
export interface Prisma__JobSkillClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    skill<T extends Prisma.SkillDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SkillDefaultArgs<ExtArgs>>): Prisma.Prisma__SkillClient<runtime.Types.Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobSkillFieldRefs {
    readonly id: Prisma.FieldRef<"JobSkill", 'BigInt'>;
    readonly jobId: Prisma.FieldRef<"JobSkill", 'BigInt'>;
    readonly skillId: Prisma.FieldRef<"JobSkill", 'BigInt'>;
}
export type JobSkillFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
    where: Prisma.JobSkillWhereUniqueInput;
};
export type JobSkillFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
    where: Prisma.JobSkillWhereUniqueInput;
};
export type JobSkillFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type JobSkillFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type JobSkillFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type JobSkillCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobSkillCreateInput, Prisma.JobSkillUncheckedCreateInput>;
};
export type JobSkillCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobSkillCreateManyInput | Prisma.JobSkillCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobSkillUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobSkillUpdateInput, Prisma.JobSkillUncheckedUpdateInput>;
    where: Prisma.JobSkillWhereUniqueInput;
};
export type JobSkillUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobSkillUpdateManyMutationInput, Prisma.JobSkillUncheckedUpdateManyInput>;
    where?: Prisma.JobSkillWhereInput;
    limit?: number;
};
export type JobSkillUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
    where: Prisma.JobSkillWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobSkillCreateInput, Prisma.JobSkillUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobSkillUpdateInput, Prisma.JobSkillUncheckedUpdateInput>;
};
export type JobSkillDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
    where: Prisma.JobSkillWhereUniqueInput;
};
export type JobSkillDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobSkillWhereInput;
    limit?: number;
};
export type JobSkillDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSkillSelect<ExtArgs> | null;
    omit?: Prisma.JobSkillOmit<ExtArgs> | null;
    include?: Prisma.JobSkillInclude<ExtArgs> | null;
};
