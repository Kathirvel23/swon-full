import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RatingModel = runtime.Types.Result.DefaultSelection<Prisma.$RatingPayload>;
export type AggregateRating = {
    _count: RatingCountAggregateOutputType | null;
    _avg: RatingAvgAggregateOutputType | null;
    _sum: RatingSumAggregateOutputType | null;
    _min: RatingMinAggregateOutputType | null;
    _max: RatingMaxAggregateOutputType | null;
};
export type RatingAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    raterAccountId: number | null;
    rateeAccountId: number | null;
    score: number | null;
};
export type RatingSumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    raterAccountId: bigint | null;
    rateeAccountId: bigint | null;
    score: number | null;
};
export type RatingMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    raterAccountId: bigint | null;
    rateeAccountId: bigint | null;
    raterRole: string | null;
    score: number | null;
    comment: string | null;
    createdAt: Date | null;
};
export type RatingMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    jobId: bigint | null;
    raterAccountId: bigint | null;
    rateeAccountId: bigint | null;
    raterRole: string | null;
    score: number | null;
    comment: string | null;
    createdAt: Date | null;
};
export type RatingCountAggregateOutputType = {
    id: number;
    publicId: number;
    jobId: number;
    raterAccountId: number;
    rateeAccountId: number;
    raterRole: number;
    score: number;
    tags: number;
    comment: number;
    createdAt: number;
    _all: number;
};
export type RatingAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    raterAccountId?: true;
    rateeAccountId?: true;
    score?: true;
};
export type RatingSumAggregateInputType = {
    id?: true;
    jobId?: true;
    raterAccountId?: true;
    rateeAccountId?: true;
    score?: true;
};
export type RatingMinAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    raterAccountId?: true;
    rateeAccountId?: true;
    raterRole?: true;
    score?: true;
    comment?: true;
    createdAt?: true;
};
export type RatingMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    raterAccountId?: true;
    rateeAccountId?: true;
    raterRole?: true;
    score?: true;
    comment?: true;
    createdAt?: true;
};
export type RatingCountAggregateInputType = {
    id?: true;
    publicId?: true;
    jobId?: true;
    raterAccountId?: true;
    rateeAccountId?: true;
    raterRole?: true;
    score?: true;
    tags?: true;
    comment?: true;
    createdAt?: true;
    _all?: true;
};
export type RatingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithRelationInput | Prisma.RatingOrderByWithRelationInput[];
    cursor?: Prisma.RatingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RatingCountAggregateInputType;
    _avg?: RatingAvgAggregateInputType;
    _sum?: RatingSumAggregateInputType;
    _min?: RatingMinAggregateInputType;
    _max?: RatingMaxAggregateInputType;
};
export type GetRatingAggregateType<T extends RatingAggregateArgs> = {
    [P in keyof T & keyof AggregateRating]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRating[P]> : Prisma.GetScalarType<T[P], AggregateRating[P]>;
};
export type RatingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithAggregationInput | Prisma.RatingOrderByWithAggregationInput[];
    by: Prisma.RatingScalarFieldEnum[] | Prisma.RatingScalarFieldEnum;
    having?: Prisma.RatingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RatingCountAggregateInputType | true;
    _avg?: RatingAvgAggregateInputType;
    _sum?: RatingSumAggregateInputType;
    _min?: RatingMinAggregateInputType;
    _max?: RatingMaxAggregateInputType;
};
export type RatingGroupByOutputType = {
    id: bigint;
    publicId: string;
    jobId: bigint;
    raterAccountId: bigint;
    rateeAccountId: bigint;
    raterRole: string;
    score: number;
    tags: runtime.JsonValue | null;
    comment: string | null;
    createdAt: Date;
    _count: RatingCountAggregateOutputType | null;
    _avg: RatingAvgAggregateOutputType | null;
    _sum: RatingSumAggregateOutputType | null;
    _min: RatingMinAggregateOutputType | null;
    _max: RatingMaxAggregateOutputType | null;
};
export type GetRatingGroupByPayload<T extends RatingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RatingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RatingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RatingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RatingGroupByOutputType[P]>;
}>>;
export type RatingWhereInput = {
    AND?: Prisma.RatingWhereInput | Prisma.RatingWhereInput[];
    OR?: Prisma.RatingWhereInput[];
    NOT?: Prisma.RatingWhereInput | Prisma.RatingWhereInput[];
    id?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    publicId?: Prisma.StringFilter<"Rating"> | string;
    jobId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    raterAccountId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    rateeAccountId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    raterRole?: Prisma.StringFilter<"Rating"> | string;
    score?: Prisma.IntFilter<"Rating"> | number;
    tags?: Prisma.JsonNullableFilter<"Rating">;
    comment?: Prisma.StringNullableFilter<"Rating"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Rating"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    rater?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    ratee?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type RatingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    raterAccountId?: Prisma.SortOrder;
    rateeAccountId?: Prisma.SortOrder;
    raterRole?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    tags?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    rater?: Prisma.AccountOrderByWithRelationInput;
    ratee?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.RatingOrderByRelevanceInput;
};
export type RatingWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    jobId_raterAccountId_rateeAccountId?: Prisma.RatingJobIdRaterAccountIdRateeAccountIdCompoundUniqueInput;
    AND?: Prisma.RatingWhereInput | Prisma.RatingWhereInput[];
    OR?: Prisma.RatingWhereInput[];
    NOT?: Prisma.RatingWhereInput | Prisma.RatingWhereInput[];
    jobId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    raterAccountId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    rateeAccountId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    raterRole?: Prisma.StringFilter<"Rating"> | string;
    score?: Prisma.IntFilter<"Rating"> | number;
    tags?: Prisma.JsonNullableFilter<"Rating">;
    comment?: Prisma.StringNullableFilter<"Rating"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Rating"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    rater?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    ratee?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "id" | "publicId" | "jobId_raterAccountId_rateeAccountId">;
export type RatingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    raterAccountId?: Prisma.SortOrder;
    rateeAccountId?: Prisma.SortOrder;
    raterRole?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    tags?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RatingCountOrderByAggregateInput;
    _avg?: Prisma.RatingAvgOrderByAggregateInput;
    _max?: Prisma.RatingMaxOrderByAggregateInput;
    _min?: Prisma.RatingMinOrderByAggregateInput;
    _sum?: Prisma.RatingSumOrderByAggregateInput;
};
export type RatingScalarWhereWithAggregatesInput = {
    AND?: Prisma.RatingScalarWhereWithAggregatesInput | Prisma.RatingScalarWhereWithAggregatesInput[];
    OR?: Prisma.RatingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RatingScalarWhereWithAggregatesInput | Prisma.RatingScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Rating"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"Rating"> | string;
    jobId?: Prisma.BigIntWithAggregatesFilter<"Rating"> | bigint | number;
    raterAccountId?: Prisma.BigIntWithAggregatesFilter<"Rating"> | bigint | number;
    rateeAccountId?: Prisma.BigIntWithAggregatesFilter<"Rating"> | bigint | number;
    raterRole?: Prisma.StringWithAggregatesFilter<"Rating"> | string;
    score?: Prisma.IntWithAggregatesFilter<"Rating"> | number;
    tags?: Prisma.JsonNullableWithAggregatesFilter<"Rating">;
    comment?: Prisma.StringNullableWithAggregatesFilter<"Rating"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Rating"> | Date | string;
};
export type RatingCreateInput = {
    id?: bigint | number;
    publicId?: string;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutRatingsInput;
    rater: Prisma.AccountCreateNestedOneWithoutRatingsGivenInput;
    ratee: Prisma.AccountCreateNestedOneWithoutRatingsReceivedInput;
};
export type RatingUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    raterAccountId: bigint | number;
    rateeAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutRatingsNestedInput;
    rater?: Prisma.AccountUpdateOneRequiredWithoutRatingsGivenNestedInput;
    ratee?: Prisma.AccountUpdateOneRequiredWithoutRatingsReceivedNestedInput;
};
export type RatingUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    rateeAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    raterAccountId: bigint | number;
    rateeAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    rateeAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingListRelationFilter = {
    every?: Prisma.RatingWhereInput;
    some?: Prisma.RatingWhereInput;
    none?: Prisma.RatingWhereInput;
};
export type RatingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RatingOrderByRelevanceInput = {
    fields: Prisma.RatingOrderByRelevanceFieldEnum | Prisma.RatingOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type RatingJobIdRaterAccountIdRateeAccountIdCompoundUniqueInput = {
    jobId: bigint | number;
    raterAccountId: bigint | number;
    rateeAccountId: bigint | number;
};
export type RatingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    raterAccountId?: Prisma.SortOrder;
    rateeAccountId?: Prisma.SortOrder;
    raterRole?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatingAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    raterAccountId?: Prisma.SortOrder;
    rateeAccountId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type RatingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    raterAccountId?: Prisma.SortOrder;
    rateeAccountId?: Prisma.SortOrder;
    raterRole?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    raterAccountId?: Prisma.SortOrder;
    rateeAccountId?: Prisma.SortOrder;
    raterRole?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatingSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    raterAccountId?: Prisma.SortOrder;
    rateeAccountId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type RatingCreateNestedManyWithoutRaterInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRaterInput, Prisma.RatingUncheckedCreateWithoutRaterInput> | Prisma.RatingCreateWithoutRaterInput[] | Prisma.RatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRaterInput | Prisma.RatingCreateOrConnectWithoutRaterInput[];
    createMany?: Prisma.RatingCreateManyRaterInputEnvelope;
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
};
export type RatingCreateNestedManyWithoutRateeInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRateeInput, Prisma.RatingUncheckedCreateWithoutRateeInput> | Prisma.RatingCreateWithoutRateeInput[] | Prisma.RatingUncheckedCreateWithoutRateeInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRateeInput | Prisma.RatingCreateOrConnectWithoutRateeInput[];
    createMany?: Prisma.RatingCreateManyRateeInputEnvelope;
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
};
export type RatingUncheckedCreateNestedManyWithoutRaterInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRaterInput, Prisma.RatingUncheckedCreateWithoutRaterInput> | Prisma.RatingCreateWithoutRaterInput[] | Prisma.RatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRaterInput | Prisma.RatingCreateOrConnectWithoutRaterInput[];
    createMany?: Prisma.RatingCreateManyRaterInputEnvelope;
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
};
export type RatingUncheckedCreateNestedManyWithoutRateeInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRateeInput, Prisma.RatingUncheckedCreateWithoutRateeInput> | Prisma.RatingCreateWithoutRateeInput[] | Prisma.RatingUncheckedCreateWithoutRateeInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRateeInput | Prisma.RatingCreateOrConnectWithoutRateeInput[];
    createMany?: Prisma.RatingCreateManyRateeInputEnvelope;
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
};
export type RatingUpdateManyWithoutRaterNestedInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRaterInput, Prisma.RatingUncheckedCreateWithoutRaterInput> | Prisma.RatingCreateWithoutRaterInput[] | Prisma.RatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRaterInput | Prisma.RatingCreateOrConnectWithoutRaterInput[];
    upsert?: Prisma.RatingUpsertWithWhereUniqueWithoutRaterInput | Prisma.RatingUpsertWithWhereUniqueWithoutRaterInput[];
    createMany?: Prisma.RatingCreateManyRaterInputEnvelope;
    set?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    disconnect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    delete?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    update?: Prisma.RatingUpdateWithWhereUniqueWithoutRaterInput | Prisma.RatingUpdateWithWhereUniqueWithoutRaterInput[];
    updateMany?: Prisma.RatingUpdateManyWithWhereWithoutRaterInput | Prisma.RatingUpdateManyWithWhereWithoutRaterInput[];
    deleteMany?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
};
export type RatingUpdateManyWithoutRateeNestedInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRateeInput, Prisma.RatingUncheckedCreateWithoutRateeInput> | Prisma.RatingCreateWithoutRateeInput[] | Prisma.RatingUncheckedCreateWithoutRateeInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRateeInput | Prisma.RatingCreateOrConnectWithoutRateeInput[];
    upsert?: Prisma.RatingUpsertWithWhereUniqueWithoutRateeInput | Prisma.RatingUpsertWithWhereUniqueWithoutRateeInput[];
    createMany?: Prisma.RatingCreateManyRateeInputEnvelope;
    set?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    disconnect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    delete?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    update?: Prisma.RatingUpdateWithWhereUniqueWithoutRateeInput | Prisma.RatingUpdateWithWhereUniqueWithoutRateeInput[];
    updateMany?: Prisma.RatingUpdateManyWithWhereWithoutRateeInput | Prisma.RatingUpdateManyWithWhereWithoutRateeInput[];
    deleteMany?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
};
export type RatingUncheckedUpdateManyWithoutRaterNestedInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRaterInput, Prisma.RatingUncheckedCreateWithoutRaterInput> | Prisma.RatingCreateWithoutRaterInput[] | Prisma.RatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRaterInput | Prisma.RatingCreateOrConnectWithoutRaterInput[];
    upsert?: Prisma.RatingUpsertWithWhereUniqueWithoutRaterInput | Prisma.RatingUpsertWithWhereUniqueWithoutRaterInput[];
    createMany?: Prisma.RatingCreateManyRaterInputEnvelope;
    set?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    disconnect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    delete?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    update?: Prisma.RatingUpdateWithWhereUniqueWithoutRaterInput | Prisma.RatingUpdateWithWhereUniqueWithoutRaterInput[];
    updateMany?: Prisma.RatingUpdateManyWithWhereWithoutRaterInput | Prisma.RatingUpdateManyWithWhereWithoutRaterInput[];
    deleteMany?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
};
export type RatingUncheckedUpdateManyWithoutRateeNestedInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutRateeInput, Prisma.RatingUncheckedCreateWithoutRateeInput> | Prisma.RatingCreateWithoutRateeInput[] | Prisma.RatingUncheckedCreateWithoutRateeInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutRateeInput | Prisma.RatingCreateOrConnectWithoutRateeInput[];
    upsert?: Prisma.RatingUpsertWithWhereUniqueWithoutRateeInput | Prisma.RatingUpsertWithWhereUniqueWithoutRateeInput[];
    createMany?: Prisma.RatingCreateManyRateeInputEnvelope;
    set?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    disconnect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    delete?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    update?: Prisma.RatingUpdateWithWhereUniqueWithoutRateeInput | Prisma.RatingUpdateWithWhereUniqueWithoutRateeInput[];
    updateMany?: Prisma.RatingUpdateManyWithWhereWithoutRateeInput | Prisma.RatingUpdateManyWithWhereWithoutRateeInput[];
    deleteMany?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
};
export type RatingCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutJobInput, Prisma.RatingUncheckedCreateWithoutJobInput> | Prisma.RatingCreateWithoutJobInput[] | Prisma.RatingUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutJobInput | Prisma.RatingCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.RatingCreateManyJobInputEnvelope;
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
};
export type RatingUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutJobInput, Prisma.RatingUncheckedCreateWithoutJobInput> | Prisma.RatingCreateWithoutJobInput[] | Prisma.RatingUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutJobInput | Prisma.RatingCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.RatingCreateManyJobInputEnvelope;
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
};
export type RatingUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutJobInput, Prisma.RatingUncheckedCreateWithoutJobInput> | Prisma.RatingCreateWithoutJobInput[] | Prisma.RatingUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutJobInput | Prisma.RatingCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.RatingUpsertWithWhereUniqueWithoutJobInput | Prisma.RatingUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.RatingCreateManyJobInputEnvelope;
    set?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    disconnect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    delete?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    update?: Prisma.RatingUpdateWithWhereUniqueWithoutJobInput | Prisma.RatingUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.RatingUpdateManyWithWhereWithoutJobInput | Prisma.RatingUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
};
export type RatingUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.RatingCreateWithoutJobInput, Prisma.RatingUncheckedCreateWithoutJobInput> | Prisma.RatingCreateWithoutJobInput[] | Prisma.RatingUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.RatingCreateOrConnectWithoutJobInput | Prisma.RatingCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.RatingUpsertWithWhereUniqueWithoutJobInput | Prisma.RatingUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.RatingCreateManyJobInputEnvelope;
    set?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    disconnect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    delete?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    connect?: Prisma.RatingWhereUniqueInput | Prisma.RatingWhereUniqueInput[];
    update?: Prisma.RatingUpdateWithWhereUniqueWithoutJobInput | Prisma.RatingUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.RatingUpdateManyWithWhereWithoutJobInput | Prisma.RatingUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
};
export type RatingCreateWithoutRaterInput = {
    id?: bigint | number;
    publicId?: string;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutRatingsInput;
    ratee: Prisma.AccountCreateNestedOneWithoutRatingsReceivedInput;
};
export type RatingUncheckedCreateWithoutRaterInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    rateeAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingCreateOrConnectWithoutRaterInput = {
    where: Prisma.RatingWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingCreateWithoutRaterInput, Prisma.RatingUncheckedCreateWithoutRaterInput>;
};
export type RatingCreateManyRaterInputEnvelope = {
    data: Prisma.RatingCreateManyRaterInput | Prisma.RatingCreateManyRaterInput[];
    skipDuplicates?: boolean;
};
export type RatingCreateWithoutRateeInput = {
    id?: bigint | number;
    publicId?: string;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutRatingsInput;
    rater: Prisma.AccountCreateNestedOneWithoutRatingsGivenInput;
};
export type RatingUncheckedCreateWithoutRateeInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    raterAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingCreateOrConnectWithoutRateeInput = {
    where: Prisma.RatingWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingCreateWithoutRateeInput, Prisma.RatingUncheckedCreateWithoutRateeInput>;
};
export type RatingCreateManyRateeInputEnvelope = {
    data: Prisma.RatingCreateManyRateeInput | Prisma.RatingCreateManyRateeInput[];
    skipDuplicates?: boolean;
};
export type RatingUpsertWithWhereUniqueWithoutRaterInput = {
    where: Prisma.RatingWhereUniqueInput;
    update: Prisma.XOR<Prisma.RatingUpdateWithoutRaterInput, Prisma.RatingUncheckedUpdateWithoutRaterInput>;
    create: Prisma.XOR<Prisma.RatingCreateWithoutRaterInput, Prisma.RatingUncheckedCreateWithoutRaterInput>;
};
export type RatingUpdateWithWhereUniqueWithoutRaterInput = {
    where: Prisma.RatingWhereUniqueInput;
    data: Prisma.XOR<Prisma.RatingUpdateWithoutRaterInput, Prisma.RatingUncheckedUpdateWithoutRaterInput>;
};
export type RatingUpdateManyWithWhereWithoutRaterInput = {
    where: Prisma.RatingScalarWhereInput;
    data: Prisma.XOR<Prisma.RatingUpdateManyMutationInput, Prisma.RatingUncheckedUpdateManyWithoutRaterInput>;
};
export type RatingScalarWhereInput = {
    AND?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
    OR?: Prisma.RatingScalarWhereInput[];
    NOT?: Prisma.RatingScalarWhereInput | Prisma.RatingScalarWhereInput[];
    id?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    publicId?: Prisma.StringFilter<"Rating"> | string;
    jobId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    raterAccountId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    rateeAccountId?: Prisma.BigIntFilter<"Rating"> | bigint | number;
    raterRole?: Prisma.StringFilter<"Rating"> | string;
    score?: Prisma.IntFilter<"Rating"> | number;
    tags?: Prisma.JsonNullableFilter<"Rating">;
    comment?: Prisma.StringNullableFilter<"Rating"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Rating"> | Date | string;
};
export type RatingUpsertWithWhereUniqueWithoutRateeInput = {
    where: Prisma.RatingWhereUniqueInput;
    update: Prisma.XOR<Prisma.RatingUpdateWithoutRateeInput, Prisma.RatingUncheckedUpdateWithoutRateeInput>;
    create: Prisma.XOR<Prisma.RatingCreateWithoutRateeInput, Prisma.RatingUncheckedCreateWithoutRateeInput>;
};
export type RatingUpdateWithWhereUniqueWithoutRateeInput = {
    where: Prisma.RatingWhereUniqueInput;
    data: Prisma.XOR<Prisma.RatingUpdateWithoutRateeInput, Prisma.RatingUncheckedUpdateWithoutRateeInput>;
};
export type RatingUpdateManyWithWhereWithoutRateeInput = {
    where: Prisma.RatingScalarWhereInput;
    data: Prisma.XOR<Prisma.RatingUpdateManyMutationInput, Prisma.RatingUncheckedUpdateManyWithoutRateeInput>;
};
export type RatingCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
    rater: Prisma.AccountCreateNestedOneWithoutRatingsGivenInput;
    ratee: Prisma.AccountCreateNestedOneWithoutRatingsReceivedInput;
};
export type RatingUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    publicId?: string;
    raterAccountId: bigint | number;
    rateeAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingCreateOrConnectWithoutJobInput = {
    where: Prisma.RatingWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingCreateWithoutJobInput, Prisma.RatingUncheckedCreateWithoutJobInput>;
};
export type RatingCreateManyJobInputEnvelope = {
    data: Prisma.RatingCreateManyJobInput | Prisma.RatingCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type RatingUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.RatingWhereUniqueInput;
    update: Prisma.XOR<Prisma.RatingUpdateWithoutJobInput, Prisma.RatingUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.RatingCreateWithoutJobInput, Prisma.RatingUncheckedCreateWithoutJobInput>;
};
export type RatingUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.RatingWhereUniqueInput;
    data: Prisma.XOR<Prisma.RatingUpdateWithoutJobInput, Prisma.RatingUncheckedUpdateWithoutJobInput>;
};
export type RatingUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.RatingScalarWhereInput;
    data: Prisma.XOR<Prisma.RatingUpdateManyMutationInput, Prisma.RatingUncheckedUpdateManyWithoutJobInput>;
};
export type RatingCreateManyRaterInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    rateeAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingCreateManyRateeInput = {
    id?: bigint | number;
    publicId?: string;
    jobId: bigint | number;
    raterAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingUpdateWithoutRaterInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutRatingsNestedInput;
    ratee?: Prisma.AccountUpdateOneRequiredWithoutRatingsReceivedNestedInput;
};
export type RatingUncheckedUpdateWithoutRaterInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    rateeAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingUncheckedUpdateManyWithoutRaterInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    rateeAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingUpdateWithoutRateeInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutRatingsNestedInput;
    rater?: Prisma.AccountUpdateOneRequiredWithoutRatingsGivenNestedInput;
};
export type RatingUncheckedUpdateWithoutRateeInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingUncheckedUpdateManyWithoutRateeInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingCreateManyJobInput = {
    id?: bigint | number;
    publicId?: string;
    raterAccountId: bigint | number;
    rateeAccountId: bigint | number;
    raterRole: string;
    score: number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: string | null;
    createdAt?: Date | string;
};
export type RatingUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rater?: Prisma.AccountUpdateOneRequiredWithoutRatingsGivenNestedInput;
    ratee?: Prisma.AccountUpdateOneRequiredWithoutRatingsReceivedNestedInput;
};
export type RatingUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    rateeAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    rateeAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    raterRole?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    tags?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    raterAccountId?: boolean;
    rateeAccountId?: boolean;
    raterRole?: boolean;
    score?: boolean;
    tags?: boolean;
    comment?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    ratee?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rating"]>;
export type RatingSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    jobId?: boolean;
    raterAccountId?: boolean;
    rateeAccountId?: boolean;
    raterRole?: boolean;
    score?: boolean;
    tags?: boolean;
    comment?: boolean;
    createdAt?: boolean;
};
export type RatingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "jobId" | "raterAccountId" | "rateeAccountId" | "raterRole" | "score" | "tags" | "comment" | "createdAt", ExtArgs["result"]["rating"]>;
export type RatingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    ratee?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $RatingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Rating";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        rater: Prisma.$AccountPayload<ExtArgs>;
        ratee: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        jobId: bigint;
        raterAccountId: bigint;
        rateeAccountId: bigint;
        raterRole: string;
        score: number;
        tags: runtime.JsonValue | null;
        comment: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["rating"]>;
    composites: {};
};
export type RatingGetPayload<S extends boolean | null | undefined | RatingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RatingPayload, S>;
export type RatingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RatingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RatingCountAggregateInputType | true;
};
export interface RatingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Rating'];
        meta: {
            name: 'Rating';
        };
    };
    findUnique<T extends RatingFindUniqueArgs>(args: Prisma.SelectSubset<T, RatingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RatingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RatingFindFirstArgs>(args?: Prisma.SelectSubset<T, RatingFindFirstArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RatingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RatingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RatingFindManyArgs>(args?: Prisma.SelectSubset<T, RatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RatingCreateArgs>(args: Prisma.SelectSubset<T, RatingCreateArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RatingCreateManyArgs>(args?: Prisma.SelectSubset<T, RatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends RatingDeleteArgs>(args: Prisma.SelectSubset<T, RatingDeleteArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RatingUpdateArgs>(args: Prisma.SelectSubset<T, RatingUpdateArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RatingDeleteManyArgs>(args?: Prisma.SelectSubset<T, RatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RatingUpdateManyArgs>(args: Prisma.SelectSubset<T, RatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends RatingUpsertArgs>(args: Prisma.SelectSubset<T, RatingUpsertArgs<ExtArgs>>): Prisma.Prisma__RatingClient<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RatingCountArgs>(args?: Prisma.Subset<T, RatingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RatingCountAggregateOutputType> : number>;
    aggregate<T extends RatingAggregateArgs>(args: Prisma.Subset<T, RatingAggregateArgs>): Prisma.PrismaPromise<GetRatingAggregateType<T>>;
    groupBy<T extends RatingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RatingGroupByArgs['orderBy'];
    } : {
        orderBy?: RatingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RatingFieldRefs;
}
export interface Prisma__RatingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    rater<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    ratee<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RatingFieldRefs {
    readonly id: Prisma.FieldRef<"Rating", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"Rating", 'String'>;
    readonly jobId: Prisma.FieldRef<"Rating", 'BigInt'>;
    readonly raterAccountId: Prisma.FieldRef<"Rating", 'BigInt'>;
    readonly rateeAccountId: Prisma.FieldRef<"Rating", 'BigInt'>;
    readonly raterRole: Prisma.FieldRef<"Rating", 'String'>;
    readonly score: Prisma.FieldRef<"Rating", 'Int'>;
    readonly tags: Prisma.FieldRef<"Rating", 'Json'>;
    readonly comment: Prisma.FieldRef<"Rating", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Rating", 'DateTime'>;
}
export type RatingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where: Prisma.RatingWhereUniqueInput;
};
export type RatingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where: Prisma.RatingWhereUniqueInput;
};
export type RatingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithRelationInput | Prisma.RatingOrderByWithRelationInput[];
    cursor?: Prisma.RatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingScalarFieldEnum | Prisma.RatingScalarFieldEnum[];
};
export type RatingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithRelationInput | Prisma.RatingOrderByWithRelationInput[];
    cursor?: Prisma.RatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingScalarFieldEnum | Prisma.RatingScalarFieldEnum[];
};
export type RatingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithRelationInput | Prisma.RatingOrderByWithRelationInput[];
    cursor?: Prisma.RatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingScalarFieldEnum | Prisma.RatingScalarFieldEnum[];
};
export type RatingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingCreateInput, Prisma.RatingUncheckedCreateInput>;
};
export type RatingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RatingCreateManyInput | Prisma.RatingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RatingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingUpdateInput, Prisma.RatingUncheckedUpdateInput>;
    where: Prisma.RatingWhereUniqueInput;
};
export type RatingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RatingUpdateManyMutationInput, Prisma.RatingUncheckedUpdateManyInput>;
    where?: Prisma.RatingWhereInput;
    limit?: number;
};
export type RatingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where: Prisma.RatingWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingCreateInput, Prisma.RatingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RatingUpdateInput, Prisma.RatingUncheckedUpdateInput>;
};
export type RatingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where: Prisma.RatingWhereUniqueInput;
};
export type RatingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingWhereInput;
    limit?: number;
};
export type RatingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSelect<ExtArgs> | null;
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    include?: Prisma.RatingInclude<ExtArgs> | null;
};
