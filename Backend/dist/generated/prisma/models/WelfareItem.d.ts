import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WelfareItemModel = runtime.Types.Result.DefaultSelection<Prisma.$WelfareItemPayload>;
export type AggregateWelfareItem = {
    _count: WelfareItemCountAggregateOutputType | null;
    _avg: WelfareItemAvgAggregateOutputType | null;
    _sum: WelfareItemSumAggregateOutputType | null;
    _min: WelfareItemMinAggregateOutputType | null;
    _max: WelfareItemMaxAggregateOutputType | null;
};
export type WelfareItemAvgAggregateOutputType = {
    id: number | null;
    sortOrder: number | null;
};
export type WelfareItemSumAggregateOutputType = {
    id: bigint | null;
    sortOrder: number | null;
};
export type WelfareItemMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    code: string | null;
    label: string | null;
    labelTa: string | null;
    sortOrder: number | null;
    active: boolean | null;
};
export type WelfareItemMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    code: string | null;
    label: string | null;
    labelTa: string | null;
    sortOrder: number | null;
    active: boolean | null;
};
export type WelfareItemCountAggregateOutputType = {
    id: number;
    publicId: number;
    code: number;
    label: number;
    labelTa: number;
    sortOrder: number;
    active: number;
    _all: number;
};
export type WelfareItemAvgAggregateInputType = {
    id?: true;
    sortOrder?: true;
};
export type WelfareItemSumAggregateInputType = {
    id?: true;
    sortOrder?: true;
};
export type WelfareItemMinAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    label?: true;
    labelTa?: true;
    sortOrder?: true;
    active?: true;
};
export type WelfareItemMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    label?: true;
    labelTa?: true;
    sortOrder?: true;
    active?: true;
};
export type WelfareItemCountAggregateInputType = {
    id?: true;
    publicId?: true;
    code?: true;
    label?: true;
    labelTa?: true;
    sortOrder?: true;
    active?: true;
    _all?: true;
};
export type WelfareItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WelfareItemWhereInput;
    orderBy?: Prisma.WelfareItemOrderByWithRelationInput | Prisma.WelfareItemOrderByWithRelationInput[];
    cursor?: Prisma.WelfareItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WelfareItemCountAggregateInputType;
    _avg?: WelfareItemAvgAggregateInputType;
    _sum?: WelfareItemSumAggregateInputType;
    _min?: WelfareItemMinAggregateInputType;
    _max?: WelfareItemMaxAggregateInputType;
};
export type GetWelfareItemAggregateType<T extends WelfareItemAggregateArgs> = {
    [P in keyof T & keyof AggregateWelfareItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWelfareItem[P]> : Prisma.GetScalarType<T[P], AggregateWelfareItem[P]>;
};
export type WelfareItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WelfareItemWhereInput;
    orderBy?: Prisma.WelfareItemOrderByWithAggregationInput | Prisma.WelfareItemOrderByWithAggregationInput[];
    by: Prisma.WelfareItemScalarFieldEnum[] | Prisma.WelfareItemScalarFieldEnum;
    having?: Prisma.WelfareItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WelfareItemCountAggregateInputType | true;
    _avg?: WelfareItemAvgAggregateInputType;
    _sum?: WelfareItemSumAggregateInputType;
    _min?: WelfareItemMinAggregateInputType;
    _max?: WelfareItemMaxAggregateInputType;
};
export type WelfareItemGroupByOutputType = {
    id: bigint;
    publicId: string;
    code: string;
    label: string;
    labelTa: string | null;
    sortOrder: number;
    active: boolean;
    _count: WelfareItemCountAggregateOutputType | null;
    _avg: WelfareItemAvgAggregateOutputType | null;
    _sum: WelfareItemSumAggregateOutputType | null;
    _min: WelfareItemMinAggregateOutputType | null;
    _max: WelfareItemMaxAggregateOutputType | null;
};
export type GetWelfareItemGroupByPayload<T extends WelfareItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WelfareItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WelfareItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WelfareItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WelfareItemGroupByOutputType[P]>;
}>>;
export type WelfareItemWhereInput = {
    AND?: Prisma.WelfareItemWhereInput | Prisma.WelfareItemWhereInput[];
    OR?: Prisma.WelfareItemWhereInput[];
    NOT?: Prisma.WelfareItemWhereInput | Prisma.WelfareItemWhereInput[];
    id?: Prisma.BigIntFilter<"WelfareItem"> | bigint | number;
    publicId?: Prisma.StringFilter<"WelfareItem"> | string;
    code?: Prisma.StringFilter<"WelfareItem"> | string;
    label?: Prisma.StringFilter<"WelfareItem"> | string;
    labelTa?: Prisma.StringNullableFilter<"WelfareItem"> | string | null;
    sortOrder?: Prisma.IntFilter<"WelfareItem"> | number;
    active?: Prisma.BoolFilter<"WelfareItem"> | boolean;
    jobWelfare?: Prisma.JobWelfareListRelationFilter;
};
export type WelfareItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    labelTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    jobWelfare?: Prisma.JobWelfareOrderByRelationAggregateInput;
    _relevance?: Prisma.WelfareItemOrderByRelevanceInput;
};
export type WelfareItemWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    code?: string;
    AND?: Prisma.WelfareItemWhereInput | Prisma.WelfareItemWhereInput[];
    OR?: Prisma.WelfareItemWhereInput[];
    NOT?: Prisma.WelfareItemWhereInput | Prisma.WelfareItemWhereInput[];
    label?: Prisma.StringFilter<"WelfareItem"> | string;
    labelTa?: Prisma.StringNullableFilter<"WelfareItem"> | string | null;
    sortOrder?: Prisma.IntFilter<"WelfareItem"> | number;
    active?: Prisma.BoolFilter<"WelfareItem"> | boolean;
    jobWelfare?: Prisma.JobWelfareListRelationFilter;
}, "id" | "publicId" | "code">;
export type WelfareItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    labelTa?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    _count?: Prisma.WelfareItemCountOrderByAggregateInput;
    _avg?: Prisma.WelfareItemAvgOrderByAggregateInput;
    _max?: Prisma.WelfareItemMaxOrderByAggregateInput;
    _min?: Prisma.WelfareItemMinOrderByAggregateInput;
    _sum?: Prisma.WelfareItemSumOrderByAggregateInput;
};
export type WelfareItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.WelfareItemScalarWhereWithAggregatesInput | Prisma.WelfareItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.WelfareItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WelfareItemScalarWhereWithAggregatesInput | Prisma.WelfareItemScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"WelfareItem"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"WelfareItem"> | string;
    code?: Prisma.StringWithAggregatesFilter<"WelfareItem"> | string;
    label?: Prisma.StringWithAggregatesFilter<"WelfareItem"> | string;
    labelTa?: Prisma.StringNullableWithAggregatesFilter<"WelfareItem"> | string | null;
    sortOrder?: Prisma.IntWithAggregatesFilter<"WelfareItem"> | number;
    active?: Prisma.BoolWithAggregatesFilter<"WelfareItem"> | boolean;
};
export type WelfareItemCreateInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    label: string;
    labelTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    jobWelfare?: Prisma.JobWelfareCreateNestedManyWithoutWelfareItemInput;
};
export type WelfareItemUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    label: string;
    labelTa?: string | null;
    sortOrder?: number;
    active?: boolean;
    jobWelfare?: Prisma.JobWelfareUncheckedCreateNestedManyWithoutWelfareItemInput;
};
export type WelfareItemUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    labelTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    jobWelfare?: Prisma.JobWelfareUpdateManyWithoutWelfareItemNestedInput;
};
export type WelfareItemUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    labelTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    jobWelfare?: Prisma.JobWelfareUncheckedUpdateManyWithoutWelfareItemNestedInput;
};
export type WelfareItemCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    label: string;
    labelTa?: string | null;
    sortOrder?: number;
    active?: boolean;
};
export type WelfareItemUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    labelTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type WelfareItemUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    labelTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type WelfareItemOrderByRelevanceInput = {
    fields: Prisma.WelfareItemOrderByRelevanceFieldEnum | Prisma.WelfareItemOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type WelfareItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    labelTa?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type WelfareItemAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type WelfareItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    labelTa?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type WelfareItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    labelTa?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type WelfareItemSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type WelfareItemScalarRelationFilter = {
    is?: Prisma.WelfareItemWhereInput;
    isNot?: Prisma.WelfareItemWhereInput;
};
export type WelfareItemCreateNestedOneWithoutJobWelfareInput = {
    create?: Prisma.XOR<Prisma.WelfareItemCreateWithoutJobWelfareInput, Prisma.WelfareItemUncheckedCreateWithoutJobWelfareInput>;
    connectOrCreate?: Prisma.WelfareItemCreateOrConnectWithoutJobWelfareInput;
    connect?: Prisma.WelfareItemWhereUniqueInput;
};
export type WelfareItemUpdateOneRequiredWithoutJobWelfareNestedInput = {
    create?: Prisma.XOR<Prisma.WelfareItemCreateWithoutJobWelfareInput, Prisma.WelfareItemUncheckedCreateWithoutJobWelfareInput>;
    connectOrCreate?: Prisma.WelfareItemCreateOrConnectWithoutJobWelfareInput;
    upsert?: Prisma.WelfareItemUpsertWithoutJobWelfareInput;
    connect?: Prisma.WelfareItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WelfareItemUpdateToOneWithWhereWithoutJobWelfareInput, Prisma.WelfareItemUpdateWithoutJobWelfareInput>, Prisma.WelfareItemUncheckedUpdateWithoutJobWelfareInput>;
};
export type WelfareItemCreateWithoutJobWelfareInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    label: string;
    labelTa?: string | null;
    sortOrder?: number;
    active?: boolean;
};
export type WelfareItemUncheckedCreateWithoutJobWelfareInput = {
    id?: bigint | number;
    publicId?: string;
    code: string;
    label: string;
    labelTa?: string | null;
    sortOrder?: number;
    active?: boolean;
};
export type WelfareItemCreateOrConnectWithoutJobWelfareInput = {
    where: Prisma.WelfareItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WelfareItemCreateWithoutJobWelfareInput, Prisma.WelfareItemUncheckedCreateWithoutJobWelfareInput>;
};
export type WelfareItemUpsertWithoutJobWelfareInput = {
    update: Prisma.XOR<Prisma.WelfareItemUpdateWithoutJobWelfareInput, Prisma.WelfareItemUncheckedUpdateWithoutJobWelfareInput>;
    create: Prisma.XOR<Prisma.WelfareItemCreateWithoutJobWelfareInput, Prisma.WelfareItemUncheckedCreateWithoutJobWelfareInput>;
    where?: Prisma.WelfareItemWhereInput;
};
export type WelfareItemUpdateToOneWithWhereWithoutJobWelfareInput = {
    where?: Prisma.WelfareItemWhereInput;
    data: Prisma.XOR<Prisma.WelfareItemUpdateWithoutJobWelfareInput, Prisma.WelfareItemUncheckedUpdateWithoutJobWelfareInput>;
};
export type WelfareItemUpdateWithoutJobWelfareInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    labelTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type WelfareItemUncheckedUpdateWithoutJobWelfareInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    labelTa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type WelfareItemCountOutputType = {
    jobWelfare: number;
};
export type WelfareItemCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jobWelfare?: boolean | WelfareItemCountOutputTypeCountJobWelfareArgs;
};
export type WelfareItemCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemCountOutputTypeSelect<ExtArgs> | null;
};
export type WelfareItemCountOutputTypeCountJobWelfareArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWelfareWhereInput;
};
export type WelfareItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    code?: boolean;
    label?: boolean;
    labelTa?: boolean;
    sortOrder?: boolean;
    active?: boolean;
    jobWelfare?: boolean | Prisma.WelfareItem$jobWelfareArgs<ExtArgs>;
    _count?: boolean | Prisma.WelfareItemCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["welfareItem"]>;
export type WelfareItemSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    code?: boolean;
    label?: boolean;
    labelTa?: boolean;
    sortOrder?: boolean;
    active?: boolean;
};
export type WelfareItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "code" | "label" | "labelTa" | "sortOrder" | "active", ExtArgs["result"]["welfareItem"]>;
export type WelfareItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jobWelfare?: boolean | Prisma.WelfareItem$jobWelfareArgs<ExtArgs>;
    _count?: boolean | Prisma.WelfareItemCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $WelfareItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WelfareItem";
    objects: {
        jobWelfare: Prisma.$JobWelfarePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        code: string;
        label: string;
        labelTa: string | null;
        sortOrder: number;
        active: boolean;
    }, ExtArgs["result"]["welfareItem"]>;
    composites: {};
};
export type WelfareItemGetPayload<S extends boolean | null | undefined | WelfareItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload, S>;
export type WelfareItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WelfareItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WelfareItemCountAggregateInputType | true;
};
export interface WelfareItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WelfareItem'];
        meta: {
            name: 'WelfareItem';
        };
    };
    findUnique<T extends WelfareItemFindUniqueArgs>(args: Prisma.SelectSubset<T, WelfareItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WelfareItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WelfareItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WelfareItemFindFirstArgs>(args?: Prisma.SelectSubset<T, WelfareItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WelfareItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WelfareItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WelfareItemFindManyArgs>(args?: Prisma.SelectSubset<T, WelfareItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WelfareItemCreateArgs>(args: Prisma.SelectSubset<T, WelfareItemCreateArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WelfareItemCreateManyArgs>(args?: Prisma.SelectSubset<T, WelfareItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends WelfareItemDeleteArgs>(args: Prisma.SelectSubset<T, WelfareItemDeleteArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WelfareItemUpdateArgs>(args: Prisma.SelectSubset<T, WelfareItemUpdateArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WelfareItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, WelfareItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WelfareItemUpdateManyArgs>(args: Prisma.SelectSubset<T, WelfareItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends WelfareItemUpsertArgs>(args: Prisma.SelectSubset<T, WelfareItemUpsertArgs<ExtArgs>>): Prisma.Prisma__WelfareItemClient<runtime.Types.Result.GetResult<Prisma.$WelfareItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WelfareItemCountArgs>(args?: Prisma.Subset<T, WelfareItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WelfareItemCountAggregateOutputType> : number>;
    aggregate<T extends WelfareItemAggregateArgs>(args: Prisma.Subset<T, WelfareItemAggregateArgs>): Prisma.PrismaPromise<GetWelfareItemAggregateType<T>>;
    groupBy<T extends WelfareItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WelfareItemGroupByArgs['orderBy'];
    } : {
        orderBy?: WelfareItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WelfareItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWelfareItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WelfareItemFieldRefs;
}
export interface Prisma__WelfareItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    jobWelfare<T extends Prisma.WelfareItem$jobWelfareArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WelfareItem$jobWelfareArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobWelfarePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WelfareItemFieldRefs {
    readonly id: Prisma.FieldRef<"WelfareItem", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"WelfareItem", 'String'>;
    readonly code: Prisma.FieldRef<"WelfareItem", 'String'>;
    readonly label: Prisma.FieldRef<"WelfareItem", 'String'>;
    readonly labelTa: Prisma.FieldRef<"WelfareItem", 'String'>;
    readonly sortOrder: Prisma.FieldRef<"WelfareItem", 'Int'>;
    readonly active: Prisma.FieldRef<"WelfareItem", 'Boolean'>;
}
export type WelfareItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    where: Prisma.WelfareItemWhereUniqueInput;
};
export type WelfareItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    where: Prisma.WelfareItemWhereUniqueInput;
};
export type WelfareItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    where?: Prisma.WelfareItemWhereInput;
    orderBy?: Prisma.WelfareItemOrderByWithRelationInput | Prisma.WelfareItemOrderByWithRelationInput[];
    cursor?: Prisma.WelfareItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WelfareItemScalarFieldEnum | Prisma.WelfareItemScalarFieldEnum[];
};
export type WelfareItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    where?: Prisma.WelfareItemWhereInput;
    orderBy?: Prisma.WelfareItemOrderByWithRelationInput | Prisma.WelfareItemOrderByWithRelationInput[];
    cursor?: Prisma.WelfareItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WelfareItemScalarFieldEnum | Prisma.WelfareItemScalarFieldEnum[];
};
export type WelfareItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    where?: Prisma.WelfareItemWhereInput;
    orderBy?: Prisma.WelfareItemOrderByWithRelationInput | Prisma.WelfareItemOrderByWithRelationInput[];
    cursor?: Prisma.WelfareItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WelfareItemScalarFieldEnum | Prisma.WelfareItemScalarFieldEnum[];
};
export type WelfareItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WelfareItemCreateInput, Prisma.WelfareItemUncheckedCreateInput>;
};
export type WelfareItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WelfareItemCreateManyInput | Prisma.WelfareItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WelfareItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WelfareItemUpdateInput, Prisma.WelfareItemUncheckedUpdateInput>;
    where: Prisma.WelfareItemWhereUniqueInput;
};
export type WelfareItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WelfareItemUpdateManyMutationInput, Prisma.WelfareItemUncheckedUpdateManyInput>;
    where?: Prisma.WelfareItemWhereInput;
    limit?: number;
};
export type WelfareItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    where: Prisma.WelfareItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.WelfareItemCreateInput, Prisma.WelfareItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WelfareItemUpdateInput, Prisma.WelfareItemUncheckedUpdateInput>;
};
export type WelfareItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
    where: Prisma.WelfareItemWhereUniqueInput;
};
export type WelfareItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WelfareItemWhereInput;
    limit?: number;
};
export type WelfareItem$jobWelfareArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWelfareSelect<ExtArgs> | null;
    omit?: Prisma.JobWelfareOmit<ExtArgs> | null;
    include?: Prisma.JobWelfareInclude<ExtArgs> | null;
    where?: Prisma.JobWelfareWhereInput;
    orderBy?: Prisma.JobWelfareOrderByWithRelationInput | Prisma.JobWelfareOrderByWithRelationInput[];
    cursor?: Prisma.JobWelfareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobWelfareScalarFieldEnum | Prisma.JobWelfareScalarFieldEnum[];
};
export type WelfareItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WelfareItemSelect<ExtArgs> | null;
    omit?: Prisma.WelfareItemOmit<ExtArgs> | null;
    include?: Prisma.WelfareItemInclude<ExtArgs> | null;
};
