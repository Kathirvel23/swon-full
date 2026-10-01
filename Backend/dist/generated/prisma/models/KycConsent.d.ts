import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type KycConsentModel = runtime.Types.Result.DefaultSelection<Prisma.$KycConsentPayload>;
export type AggregateKycConsent = {
    _count: KycConsentCountAggregateOutputType | null;
    _avg: KycConsentAvgAggregateOutputType | null;
    _sum: KycConsentSumAggregateOutputType | null;
    _min: KycConsentMinAggregateOutputType | null;
    _max: KycConsentMaxAggregateOutputType | null;
};
export type KycConsentAvgAggregateOutputType = {
    id: number | null;
    submissionId: number | null;
};
export type KycConsentSumAggregateOutputType = {
    id: bigint | null;
    submissionId: bigint | null;
};
export type KycConsentMinAggregateOutputType = {
    id: bigint | null;
    submissionId: bigint | null;
    consentVer: string | null;
    grantedAt: Date | null;
    ipHash: string | null;
};
export type KycConsentMaxAggregateOutputType = {
    id: bigint | null;
    submissionId: bigint | null;
    consentVer: string | null;
    grantedAt: Date | null;
    ipHash: string | null;
};
export type KycConsentCountAggregateOutputType = {
    id: number;
    submissionId: number;
    consentVer: number;
    grantedAt: number;
    ipHash: number;
    textSnapshot: number;
    _all: number;
};
export type KycConsentAvgAggregateInputType = {
    id?: true;
    submissionId?: true;
};
export type KycConsentSumAggregateInputType = {
    id?: true;
    submissionId?: true;
};
export type KycConsentMinAggregateInputType = {
    id?: true;
    submissionId?: true;
    consentVer?: true;
    grantedAt?: true;
    ipHash?: true;
};
export type KycConsentMaxAggregateInputType = {
    id?: true;
    submissionId?: true;
    consentVer?: true;
    grantedAt?: true;
    ipHash?: true;
};
export type KycConsentCountAggregateInputType = {
    id?: true;
    submissionId?: true;
    consentVer?: true;
    grantedAt?: true;
    ipHash?: true;
    textSnapshot?: true;
    _all?: true;
};
export type KycConsentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycConsentWhereInput;
    orderBy?: Prisma.KycConsentOrderByWithRelationInput | Prisma.KycConsentOrderByWithRelationInput[];
    cursor?: Prisma.KycConsentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | KycConsentCountAggregateInputType;
    _avg?: KycConsentAvgAggregateInputType;
    _sum?: KycConsentSumAggregateInputType;
    _min?: KycConsentMinAggregateInputType;
    _max?: KycConsentMaxAggregateInputType;
};
export type GetKycConsentAggregateType<T extends KycConsentAggregateArgs> = {
    [P in keyof T & keyof AggregateKycConsent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKycConsent[P]> : Prisma.GetScalarType<T[P], AggregateKycConsent[P]>;
};
export type KycConsentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycConsentWhereInput;
    orderBy?: Prisma.KycConsentOrderByWithAggregationInput | Prisma.KycConsentOrderByWithAggregationInput[];
    by: Prisma.KycConsentScalarFieldEnum[] | Prisma.KycConsentScalarFieldEnum;
    having?: Prisma.KycConsentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KycConsentCountAggregateInputType | true;
    _avg?: KycConsentAvgAggregateInputType;
    _sum?: KycConsentSumAggregateInputType;
    _min?: KycConsentMinAggregateInputType;
    _max?: KycConsentMaxAggregateInputType;
};
export type KycConsentGroupByOutputType = {
    id: bigint;
    submissionId: bigint;
    consentVer: string;
    grantedAt: Date;
    ipHash: string | null;
    textSnapshot: runtime.JsonValue;
    _count: KycConsentCountAggregateOutputType | null;
    _avg: KycConsentAvgAggregateOutputType | null;
    _sum: KycConsentSumAggregateOutputType | null;
    _min: KycConsentMinAggregateOutputType | null;
    _max: KycConsentMaxAggregateOutputType | null;
};
export type GetKycConsentGroupByPayload<T extends KycConsentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KycConsentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KycConsentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KycConsentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KycConsentGroupByOutputType[P]>;
}>>;
export type KycConsentWhereInput = {
    AND?: Prisma.KycConsentWhereInput | Prisma.KycConsentWhereInput[];
    OR?: Prisma.KycConsentWhereInput[];
    NOT?: Prisma.KycConsentWhereInput | Prisma.KycConsentWhereInput[];
    id?: Prisma.BigIntFilter<"KycConsent"> | bigint | number;
    submissionId?: Prisma.BigIntFilter<"KycConsent"> | bigint | number;
    consentVer?: Prisma.StringFilter<"KycConsent"> | string;
    grantedAt?: Prisma.DateTimeFilter<"KycConsent"> | Date | string;
    ipHash?: Prisma.StringNullableFilter<"KycConsent"> | string | null;
    textSnapshot?: Prisma.JsonFilter<"KycConsent">;
    submission?: Prisma.XOR<Prisma.KycSubmissionScalarRelationFilter, Prisma.KycSubmissionWhereInput>;
};
export type KycConsentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    consentVer?: Prisma.SortOrder;
    grantedAt?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    textSnapshot?: Prisma.SortOrder;
    submission?: Prisma.KycSubmissionOrderByWithRelationInput;
    _relevance?: Prisma.KycConsentOrderByRelevanceInput;
};
export type KycConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    submissionId?: bigint | number;
    AND?: Prisma.KycConsentWhereInput | Prisma.KycConsentWhereInput[];
    OR?: Prisma.KycConsentWhereInput[];
    NOT?: Prisma.KycConsentWhereInput | Prisma.KycConsentWhereInput[];
    consentVer?: Prisma.StringFilter<"KycConsent"> | string;
    grantedAt?: Prisma.DateTimeFilter<"KycConsent"> | Date | string;
    ipHash?: Prisma.StringNullableFilter<"KycConsent"> | string | null;
    textSnapshot?: Prisma.JsonFilter<"KycConsent">;
    submission?: Prisma.XOR<Prisma.KycSubmissionScalarRelationFilter, Prisma.KycSubmissionWhereInput>;
}, "id" | "submissionId">;
export type KycConsentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    consentVer?: Prisma.SortOrder;
    grantedAt?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    textSnapshot?: Prisma.SortOrder;
    _count?: Prisma.KycConsentCountOrderByAggregateInput;
    _avg?: Prisma.KycConsentAvgOrderByAggregateInput;
    _max?: Prisma.KycConsentMaxOrderByAggregateInput;
    _min?: Prisma.KycConsentMinOrderByAggregateInput;
    _sum?: Prisma.KycConsentSumOrderByAggregateInput;
};
export type KycConsentScalarWhereWithAggregatesInput = {
    AND?: Prisma.KycConsentScalarWhereWithAggregatesInput | Prisma.KycConsentScalarWhereWithAggregatesInput[];
    OR?: Prisma.KycConsentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KycConsentScalarWhereWithAggregatesInput | Prisma.KycConsentScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"KycConsent"> | bigint | number;
    submissionId?: Prisma.BigIntWithAggregatesFilter<"KycConsent"> | bigint | number;
    consentVer?: Prisma.StringWithAggregatesFilter<"KycConsent"> | string;
    grantedAt?: Prisma.DateTimeWithAggregatesFilter<"KycConsent"> | Date | string;
    ipHash?: Prisma.StringNullableWithAggregatesFilter<"KycConsent"> | string | null;
    textSnapshot?: Prisma.JsonWithAggregatesFilter<"KycConsent">;
};
export type KycConsentCreateInput = {
    id?: bigint | number;
    consentVer: string;
    grantedAt?: Date | string;
    ipHash?: string | null;
    textSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    submission: Prisma.KycSubmissionCreateNestedOneWithoutConsentInput;
};
export type KycConsentUncheckedCreateInput = {
    id?: bigint | number;
    submissionId: bigint | number;
    consentVer: string;
    grantedAt?: Date | string;
    ipHash?: string | null;
    textSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    consentVer?: Prisma.StringFieldUpdateOperationsInput | string;
    grantedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    textSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    submission?: Prisma.KycSubmissionUpdateOneRequiredWithoutConsentNestedInput;
};
export type KycConsentUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    submissionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    consentVer?: Prisma.StringFieldUpdateOperationsInput | string;
    grantedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    textSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentCreateManyInput = {
    id?: bigint | number;
    submissionId: bigint | number;
    consentVer: string;
    grantedAt?: Date | string;
    ipHash?: string | null;
    textSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    consentVer?: Prisma.StringFieldUpdateOperationsInput | string;
    grantedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    textSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    submissionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    consentVer?: Prisma.StringFieldUpdateOperationsInput | string;
    grantedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    textSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentNullableScalarRelationFilter = {
    is?: Prisma.KycConsentWhereInput | null;
    isNot?: Prisma.KycConsentWhereInput | null;
};
export type KycConsentOrderByRelevanceInput = {
    fields: Prisma.KycConsentOrderByRelevanceFieldEnum | Prisma.KycConsentOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type KycConsentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    consentVer?: Prisma.SortOrder;
    grantedAt?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
    textSnapshot?: Prisma.SortOrder;
};
export type KycConsentAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
};
export type KycConsentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    consentVer?: Prisma.SortOrder;
    grantedAt?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type KycConsentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    consentVer?: Prisma.SortOrder;
    grantedAt?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type KycConsentSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
};
export type KycConsentCreateNestedOneWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.KycConsentCreateWithoutSubmissionInput, Prisma.KycConsentUncheckedCreateWithoutSubmissionInput>;
    connectOrCreate?: Prisma.KycConsentCreateOrConnectWithoutSubmissionInput;
    connect?: Prisma.KycConsentWhereUniqueInput;
};
export type KycConsentUncheckedCreateNestedOneWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.KycConsentCreateWithoutSubmissionInput, Prisma.KycConsentUncheckedCreateWithoutSubmissionInput>;
    connectOrCreate?: Prisma.KycConsentCreateOrConnectWithoutSubmissionInput;
    connect?: Prisma.KycConsentWhereUniqueInput;
};
export type KycConsentUpdateOneWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.KycConsentCreateWithoutSubmissionInput, Prisma.KycConsentUncheckedCreateWithoutSubmissionInput>;
    connectOrCreate?: Prisma.KycConsentCreateOrConnectWithoutSubmissionInput;
    upsert?: Prisma.KycConsentUpsertWithoutSubmissionInput;
    disconnect?: Prisma.KycConsentWhereInput | boolean;
    delete?: Prisma.KycConsentWhereInput | boolean;
    connect?: Prisma.KycConsentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KycConsentUpdateToOneWithWhereWithoutSubmissionInput, Prisma.KycConsentUpdateWithoutSubmissionInput>, Prisma.KycConsentUncheckedUpdateWithoutSubmissionInput>;
};
export type KycConsentUncheckedUpdateOneWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.KycConsentCreateWithoutSubmissionInput, Prisma.KycConsentUncheckedCreateWithoutSubmissionInput>;
    connectOrCreate?: Prisma.KycConsentCreateOrConnectWithoutSubmissionInput;
    upsert?: Prisma.KycConsentUpsertWithoutSubmissionInput;
    disconnect?: Prisma.KycConsentWhereInput | boolean;
    delete?: Prisma.KycConsentWhereInput | boolean;
    connect?: Prisma.KycConsentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KycConsentUpdateToOneWithWhereWithoutSubmissionInput, Prisma.KycConsentUpdateWithoutSubmissionInput>, Prisma.KycConsentUncheckedUpdateWithoutSubmissionInput>;
};
export type KycConsentCreateWithoutSubmissionInput = {
    id?: bigint | number;
    consentVer: string;
    grantedAt?: Date | string;
    ipHash?: string | null;
    textSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentUncheckedCreateWithoutSubmissionInput = {
    id?: bigint | number;
    consentVer: string;
    grantedAt?: Date | string;
    ipHash?: string | null;
    textSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentCreateOrConnectWithoutSubmissionInput = {
    where: Prisma.KycConsentWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycConsentCreateWithoutSubmissionInput, Prisma.KycConsentUncheckedCreateWithoutSubmissionInput>;
};
export type KycConsentUpsertWithoutSubmissionInput = {
    update: Prisma.XOR<Prisma.KycConsentUpdateWithoutSubmissionInput, Prisma.KycConsentUncheckedUpdateWithoutSubmissionInput>;
    create: Prisma.XOR<Prisma.KycConsentCreateWithoutSubmissionInput, Prisma.KycConsentUncheckedCreateWithoutSubmissionInput>;
    where?: Prisma.KycConsentWhereInput;
};
export type KycConsentUpdateToOneWithWhereWithoutSubmissionInput = {
    where?: Prisma.KycConsentWhereInput;
    data: Prisma.XOR<Prisma.KycConsentUpdateWithoutSubmissionInput, Prisma.KycConsentUncheckedUpdateWithoutSubmissionInput>;
};
export type KycConsentUpdateWithoutSubmissionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    consentVer?: Prisma.StringFieldUpdateOperationsInput | string;
    grantedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    textSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentUncheckedUpdateWithoutSubmissionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    consentVer?: Prisma.StringFieldUpdateOperationsInput | string;
    grantedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    textSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type KycConsentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    submissionId?: boolean;
    consentVer?: boolean;
    grantedAt?: boolean;
    ipHash?: boolean;
    textSnapshot?: boolean;
    submission?: boolean | Prisma.KycSubmissionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["kycConsent"]>;
export type KycConsentSelectScalar = {
    id?: boolean;
    submissionId?: boolean;
    consentVer?: boolean;
    grantedAt?: boolean;
    ipHash?: boolean;
    textSnapshot?: boolean;
};
export type KycConsentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "submissionId" | "consentVer" | "grantedAt" | "ipHash" | "textSnapshot", ExtArgs["result"]["kycConsent"]>;
export type KycConsentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    submission?: boolean | Prisma.KycSubmissionDefaultArgs<ExtArgs>;
};
export type $KycConsentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KycConsent";
    objects: {
        submission: Prisma.$KycSubmissionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        submissionId: bigint;
        consentVer: string;
        grantedAt: Date;
        ipHash: string | null;
        textSnapshot: runtime.JsonValue;
    }, ExtArgs["result"]["kycConsent"]>;
    composites: {};
};
export type KycConsentGetPayload<S extends boolean | null | undefined | KycConsentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KycConsentPayload, S>;
export type KycConsentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KycConsentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KycConsentCountAggregateInputType | true;
};
export interface KycConsentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KycConsent'];
        meta: {
            name: 'KycConsent';
        };
    };
    findUnique<T extends KycConsentFindUniqueArgs>(args: Prisma.SelectSubset<T, KycConsentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends KycConsentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KycConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends KycConsentFindFirstArgs>(args?: Prisma.SelectSubset<T, KycConsentFindFirstArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends KycConsentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KycConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends KycConsentFindManyArgs>(args?: Prisma.SelectSubset<T, KycConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends KycConsentCreateArgs>(args: Prisma.SelectSubset<T, KycConsentCreateArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends KycConsentCreateManyArgs>(args?: Prisma.SelectSubset<T, KycConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends KycConsentDeleteArgs>(args: Prisma.SelectSubset<T, KycConsentDeleteArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends KycConsentUpdateArgs>(args: Prisma.SelectSubset<T, KycConsentUpdateArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends KycConsentDeleteManyArgs>(args?: Prisma.SelectSubset<T, KycConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends KycConsentUpdateManyArgs>(args: Prisma.SelectSubset<T, KycConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends KycConsentUpsertArgs>(args: Prisma.SelectSubset<T, KycConsentUpsertArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends KycConsentCountArgs>(args?: Prisma.Subset<T, KycConsentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KycConsentCountAggregateOutputType> : number>;
    aggregate<T extends KycConsentAggregateArgs>(args: Prisma.Subset<T, KycConsentAggregateArgs>): Prisma.PrismaPromise<GetKycConsentAggregateType<T>>;
    groupBy<T extends KycConsentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KycConsentGroupByArgs['orderBy'];
    } : {
        orderBy?: KycConsentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KycConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKycConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: KycConsentFieldRefs;
}
export interface Prisma__KycConsentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    submission<T extends Prisma.KycSubmissionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KycSubmissionDefaultArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface KycConsentFieldRefs {
    readonly id: Prisma.FieldRef<"KycConsent", 'BigInt'>;
    readonly submissionId: Prisma.FieldRef<"KycConsent", 'BigInt'>;
    readonly consentVer: Prisma.FieldRef<"KycConsent", 'String'>;
    readonly grantedAt: Prisma.FieldRef<"KycConsent", 'DateTime'>;
    readonly ipHash: Prisma.FieldRef<"KycConsent", 'String'>;
    readonly textSnapshot: Prisma.FieldRef<"KycConsent", 'Json'>;
}
export type KycConsentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where: Prisma.KycConsentWhereUniqueInput;
};
export type KycConsentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where: Prisma.KycConsentWhereUniqueInput;
};
export type KycConsentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where?: Prisma.KycConsentWhereInput;
    orderBy?: Prisma.KycConsentOrderByWithRelationInput | Prisma.KycConsentOrderByWithRelationInput[];
    cursor?: Prisma.KycConsentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycConsentScalarFieldEnum | Prisma.KycConsentScalarFieldEnum[];
};
export type KycConsentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where?: Prisma.KycConsentWhereInput;
    orderBy?: Prisma.KycConsentOrderByWithRelationInput | Prisma.KycConsentOrderByWithRelationInput[];
    cursor?: Prisma.KycConsentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycConsentScalarFieldEnum | Prisma.KycConsentScalarFieldEnum[];
};
export type KycConsentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where?: Prisma.KycConsentWhereInput;
    orderBy?: Prisma.KycConsentOrderByWithRelationInput | Prisma.KycConsentOrderByWithRelationInput[];
    cursor?: Prisma.KycConsentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycConsentScalarFieldEnum | Prisma.KycConsentScalarFieldEnum[];
};
export type KycConsentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycConsentCreateInput, Prisma.KycConsentUncheckedCreateInput>;
};
export type KycConsentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.KycConsentCreateManyInput | Prisma.KycConsentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type KycConsentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycConsentUpdateInput, Prisma.KycConsentUncheckedUpdateInput>;
    where: Prisma.KycConsentWhereUniqueInput;
};
export type KycConsentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.KycConsentUpdateManyMutationInput, Prisma.KycConsentUncheckedUpdateManyInput>;
    where?: Prisma.KycConsentWhereInput;
    limit?: number;
};
export type KycConsentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where: Prisma.KycConsentWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycConsentCreateInput, Prisma.KycConsentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.KycConsentUpdateInput, Prisma.KycConsentUncheckedUpdateInput>;
};
export type KycConsentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where: Prisma.KycConsentWhereUniqueInput;
};
export type KycConsentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycConsentWhereInput;
    limit?: number;
};
export type KycConsentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
};
