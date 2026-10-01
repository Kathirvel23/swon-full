import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PlatformConfigModel = runtime.Types.Result.DefaultSelection<Prisma.$PlatformConfigPayload>;
export type AggregatePlatformConfig = {
    _count: PlatformConfigCountAggregateOutputType | null;
    _avg: PlatformConfigAvgAggregateOutputType | null;
    _sum: PlatformConfigSumAggregateOutputType | null;
    _min: PlatformConfigMinAggregateOutputType | null;
    _max: PlatformConfigMaxAggregateOutputType | null;
};
export type PlatformConfigAvgAggregateOutputType = {
    version: number | null;
    updatedByAccountId: number | null;
};
export type PlatformConfigSumAggregateOutputType = {
    version: number | null;
    updatedByAccountId: bigint | null;
};
export type PlatformConfigMinAggregateOutputType = {
    key: string | null;
    scope: string | null;
    version: number | null;
    updatedByAccountId: bigint | null;
    updatedAt: Date | null;
};
export type PlatformConfigMaxAggregateOutputType = {
    key: string | null;
    scope: string | null;
    version: number | null;
    updatedByAccountId: bigint | null;
    updatedAt: Date | null;
};
export type PlatformConfigCountAggregateOutputType = {
    key: number;
    valueJson: number;
    scope: number;
    version: number;
    updatedByAccountId: number;
    updatedAt: number;
    _all: number;
};
export type PlatformConfigAvgAggregateInputType = {
    version?: true;
    updatedByAccountId?: true;
};
export type PlatformConfigSumAggregateInputType = {
    version?: true;
    updatedByAccountId?: true;
};
export type PlatformConfigMinAggregateInputType = {
    key?: true;
    scope?: true;
    version?: true;
    updatedByAccountId?: true;
    updatedAt?: true;
};
export type PlatformConfigMaxAggregateInputType = {
    key?: true;
    scope?: true;
    version?: true;
    updatedByAccountId?: true;
    updatedAt?: true;
};
export type PlatformConfigCountAggregateInputType = {
    key?: true;
    valueJson?: true;
    scope?: true;
    version?: true;
    updatedByAccountId?: true;
    updatedAt?: true;
    _all?: true;
};
export type PlatformConfigAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformConfigWhereInput;
    orderBy?: Prisma.PlatformConfigOrderByWithRelationInput | Prisma.PlatformConfigOrderByWithRelationInput[];
    cursor?: Prisma.PlatformConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PlatformConfigCountAggregateInputType;
    _avg?: PlatformConfigAvgAggregateInputType;
    _sum?: PlatformConfigSumAggregateInputType;
    _min?: PlatformConfigMinAggregateInputType;
    _max?: PlatformConfigMaxAggregateInputType;
};
export type GetPlatformConfigAggregateType<T extends PlatformConfigAggregateArgs> = {
    [P in keyof T & keyof AggregatePlatformConfig]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlatformConfig[P]> : Prisma.GetScalarType<T[P], AggregatePlatformConfig[P]>;
};
export type PlatformConfigGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformConfigWhereInput;
    orderBy?: Prisma.PlatformConfigOrderByWithAggregationInput | Prisma.PlatformConfigOrderByWithAggregationInput[];
    by: Prisma.PlatformConfigScalarFieldEnum[] | Prisma.PlatformConfigScalarFieldEnum;
    having?: Prisma.PlatformConfigScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlatformConfigCountAggregateInputType | true;
    _avg?: PlatformConfigAvgAggregateInputType;
    _sum?: PlatformConfigSumAggregateInputType;
    _min?: PlatformConfigMinAggregateInputType;
    _max?: PlatformConfigMaxAggregateInputType;
};
export type PlatformConfigGroupByOutputType = {
    key: string;
    valueJson: runtime.JsonValue;
    scope: string;
    version: number;
    updatedByAccountId: bigint | null;
    updatedAt: Date;
    _count: PlatformConfigCountAggregateOutputType | null;
    _avg: PlatformConfigAvgAggregateOutputType | null;
    _sum: PlatformConfigSumAggregateOutputType | null;
    _min: PlatformConfigMinAggregateOutputType | null;
    _max: PlatformConfigMaxAggregateOutputType | null;
};
export type GetPlatformConfigGroupByPayload<T extends PlatformConfigGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlatformConfigGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlatformConfigGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlatformConfigGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlatformConfigGroupByOutputType[P]>;
}>>;
export type PlatformConfigWhereInput = {
    AND?: Prisma.PlatformConfigWhereInput | Prisma.PlatformConfigWhereInput[];
    OR?: Prisma.PlatformConfigWhereInput[];
    NOT?: Prisma.PlatformConfigWhereInput | Prisma.PlatformConfigWhereInput[];
    key?: Prisma.StringFilter<"PlatformConfig"> | string;
    valueJson?: Prisma.JsonFilter<"PlatformConfig">;
    scope?: Prisma.StringFilter<"PlatformConfig"> | string;
    version?: Prisma.IntFilter<"PlatformConfig"> | number;
    updatedByAccountId?: Prisma.BigIntNullableFilter<"PlatformConfig"> | bigint | number | null;
    updatedAt?: Prisma.DateTimeFilter<"PlatformConfig"> | Date | string;
};
export type PlatformConfigOrderByWithRelationInput = {
    key?: Prisma.SortOrder;
    valueJson?: Prisma.SortOrder;
    scope?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    updatedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _relevance?: Prisma.PlatformConfigOrderByRelevanceInput;
};
export type PlatformConfigWhereUniqueInput = Prisma.AtLeast<{
    key?: string;
    AND?: Prisma.PlatformConfigWhereInput | Prisma.PlatformConfigWhereInput[];
    OR?: Prisma.PlatformConfigWhereInput[];
    NOT?: Prisma.PlatformConfigWhereInput | Prisma.PlatformConfigWhereInput[];
    valueJson?: Prisma.JsonFilter<"PlatformConfig">;
    scope?: Prisma.StringFilter<"PlatformConfig"> | string;
    version?: Prisma.IntFilter<"PlatformConfig"> | number;
    updatedByAccountId?: Prisma.BigIntNullableFilter<"PlatformConfig"> | bigint | number | null;
    updatedAt?: Prisma.DateTimeFilter<"PlatformConfig"> | Date | string;
}, "key">;
export type PlatformConfigOrderByWithAggregationInput = {
    key?: Prisma.SortOrder;
    valueJson?: Prisma.SortOrder;
    scope?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    updatedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PlatformConfigCountOrderByAggregateInput;
    _avg?: Prisma.PlatformConfigAvgOrderByAggregateInput;
    _max?: Prisma.PlatformConfigMaxOrderByAggregateInput;
    _min?: Prisma.PlatformConfigMinOrderByAggregateInput;
    _sum?: Prisma.PlatformConfigSumOrderByAggregateInput;
};
export type PlatformConfigScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlatformConfigScalarWhereWithAggregatesInput | Prisma.PlatformConfigScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlatformConfigScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlatformConfigScalarWhereWithAggregatesInput | Prisma.PlatformConfigScalarWhereWithAggregatesInput[];
    key?: Prisma.StringWithAggregatesFilter<"PlatformConfig"> | string;
    valueJson?: Prisma.JsonWithAggregatesFilter<"PlatformConfig">;
    scope?: Prisma.StringWithAggregatesFilter<"PlatformConfig"> | string;
    version?: Prisma.IntWithAggregatesFilter<"PlatformConfig"> | number;
    updatedByAccountId?: Prisma.BigIntNullableWithAggregatesFilter<"PlatformConfig"> | bigint | number | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PlatformConfig"> | Date | string;
};
export type PlatformConfigCreateInput = {
    key: string;
    valueJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    scope?: string;
    version?: number;
    updatedByAccountId?: bigint | number | null;
    updatedAt?: Date | string;
};
export type PlatformConfigUncheckedCreateInput = {
    key: string;
    valueJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    scope?: string;
    version?: number;
    updatedByAccountId?: bigint | number | null;
    updatedAt?: Date | string;
};
export type PlatformConfigUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    valueJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    scope?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformConfigUncheckedUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    valueJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    scope?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformConfigCreateManyInput = {
    key: string;
    valueJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    scope?: string;
    version?: number;
    updatedByAccountId?: bigint | number | null;
    updatedAt?: Date | string;
};
export type PlatformConfigUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    valueJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    scope?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformConfigUncheckedUpdateManyInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    valueJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    scope?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformConfigOrderByRelevanceInput = {
    fields: Prisma.PlatformConfigOrderByRelevanceFieldEnum | Prisma.PlatformConfigOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PlatformConfigCountOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    valueJson?: Prisma.SortOrder;
    scope?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    updatedByAccountId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlatformConfigAvgOrderByAggregateInput = {
    version?: Prisma.SortOrder;
    updatedByAccountId?: Prisma.SortOrder;
};
export type PlatformConfigMaxOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    scope?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    updatedByAccountId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlatformConfigMinOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    scope?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    updatedByAccountId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlatformConfigSumOrderByAggregateInput = {
    version?: Prisma.SortOrder;
    updatedByAccountId?: Prisma.SortOrder;
};
export type PlatformConfigSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    valueJson?: boolean;
    scope?: boolean;
    version?: boolean;
    updatedByAccountId?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["platformConfig"]>;
export type PlatformConfigSelectScalar = {
    key?: boolean;
    valueJson?: boolean;
    scope?: boolean;
    version?: boolean;
    updatedByAccountId?: boolean;
    updatedAt?: boolean;
};
export type PlatformConfigOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"key" | "valueJson" | "scope" | "version" | "updatedByAccountId" | "updatedAt", ExtArgs["result"]["platformConfig"]>;
export type $PlatformConfigPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PlatformConfig";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        key: string;
        valueJson: runtime.JsonValue;
        scope: string;
        version: number;
        updatedByAccountId: bigint | null;
        updatedAt: Date;
    }, ExtArgs["result"]["platformConfig"]>;
    composites: {};
};
export type PlatformConfigGetPayload<S extends boolean | null | undefined | PlatformConfigDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload, S>;
export type PlatformConfigCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlatformConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlatformConfigCountAggregateInputType | true;
};
export interface PlatformConfigDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PlatformConfig'];
        meta: {
            name: 'PlatformConfig';
        };
    };
    findUnique<T extends PlatformConfigFindUniqueArgs>(args: Prisma.SelectSubset<T, PlatformConfigFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PlatformConfigFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlatformConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PlatformConfigFindFirstArgs>(args?: Prisma.SelectSubset<T, PlatformConfigFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PlatformConfigFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlatformConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PlatformConfigFindManyArgs>(args?: Prisma.SelectSubset<T, PlatformConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PlatformConfigCreateArgs>(args: Prisma.SelectSubset<T, PlatformConfigCreateArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PlatformConfigCreateManyArgs>(args?: Prisma.SelectSubset<T, PlatformConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PlatformConfigDeleteArgs>(args: Prisma.SelectSubset<T, PlatformConfigDeleteArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PlatformConfigUpdateArgs>(args: Prisma.SelectSubset<T, PlatformConfigUpdateArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PlatformConfigDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlatformConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PlatformConfigUpdateManyArgs>(args: Prisma.SelectSubset<T, PlatformConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PlatformConfigUpsertArgs>(args: Prisma.SelectSubset<T, PlatformConfigUpsertArgs<ExtArgs>>): Prisma.Prisma__PlatformConfigClient<runtime.Types.Result.GetResult<Prisma.$PlatformConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PlatformConfigCountArgs>(args?: Prisma.Subset<T, PlatformConfigCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlatformConfigCountAggregateOutputType> : number>;
    aggregate<T extends PlatformConfigAggregateArgs>(args: Prisma.Subset<T, PlatformConfigAggregateArgs>): Prisma.PrismaPromise<GetPlatformConfigAggregateType<T>>;
    groupBy<T extends PlatformConfigGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlatformConfigGroupByArgs['orderBy'];
    } : {
        orderBy?: PlatformConfigGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlatformConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PlatformConfigFieldRefs;
}
export interface Prisma__PlatformConfigClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PlatformConfigFieldRefs {
    readonly key: Prisma.FieldRef<"PlatformConfig", 'String'>;
    readonly valueJson: Prisma.FieldRef<"PlatformConfig", 'Json'>;
    readonly scope: Prisma.FieldRef<"PlatformConfig", 'String'>;
    readonly version: Prisma.FieldRef<"PlatformConfig", 'Int'>;
    readonly updatedByAccountId: Prisma.FieldRef<"PlatformConfig", 'BigInt'>;
    readonly updatedAt: Prisma.FieldRef<"PlatformConfig", 'DateTime'>;
}
export type PlatformConfigFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    where: Prisma.PlatformConfigWhereUniqueInput;
};
export type PlatformConfigFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    where: Prisma.PlatformConfigWhereUniqueInput;
};
export type PlatformConfigFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    where?: Prisma.PlatformConfigWhereInput;
    orderBy?: Prisma.PlatformConfigOrderByWithRelationInput | Prisma.PlatformConfigOrderByWithRelationInput[];
    cursor?: Prisma.PlatformConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformConfigScalarFieldEnum | Prisma.PlatformConfigScalarFieldEnum[];
};
export type PlatformConfigFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    where?: Prisma.PlatformConfigWhereInput;
    orderBy?: Prisma.PlatformConfigOrderByWithRelationInput | Prisma.PlatformConfigOrderByWithRelationInput[];
    cursor?: Prisma.PlatformConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformConfigScalarFieldEnum | Prisma.PlatformConfigScalarFieldEnum[];
};
export type PlatformConfigFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    where?: Prisma.PlatformConfigWhereInput;
    orderBy?: Prisma.PlatformConfigOrderByWithRelationInput | Prisma.PlatformConfigOrderByWithRelationInput[];
    cursor?: Prisma.PlatformConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformConfigScalarFieldEnum | Prisma.PlatformConfigScalarFieldEnum[];
};
export type PlatformConfigCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformConfigCreateInput, Prisma.PlatformConfigUncheckedCreateInput>;
};
export type PlatformConfigCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PlatformConfigCreateManyInput | Prisma.PlatformConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlatformConfigUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformConfigUpdateInput, Prisma.PlatformConfigUncheckedUpdateInput>;
    where: Prisma.PlatformConfigWhereUniqueInput;
};
export type PlatformConfigUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PlatformConfigUpdateManyMutationInput, Prisma.PlatformConfigUncheckedUpdateManyInput>;
    where?: Prisma.PlatformConfigWhereInput;
    limit?: number;
};
export type PlatformConfigUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    where: Prisma.PlatformConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlatformConfigCreateInput, Prisma.PlatformConfigUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PlatformConfigUpdateInput, Prisma.PlatformConfigUncheckedUpdateInput>;
};
export type PlatformConfigDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
    where: Prisma.PlatformConfigWhereUniqueInput;
};
export type PlatformConfigDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformConfigWhereInput;
    limit?: number;
};
export type PlatformConfigDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformConfigSelect<ExtArgs> | null;
    omit?: Prisma.PlatformConfigOmit<ExtArgs> | null;
};
