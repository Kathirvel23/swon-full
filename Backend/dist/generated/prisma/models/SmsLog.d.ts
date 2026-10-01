import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SmsLogModel = runtime.Types.Result.DefaultSelection<Prisma.$SmsLogPayload>;
export type AggregateSmsLog = {
    _count: SmsLogCountAggregateOutputType | null;
    _avg: SmsLogAvgAggregateOutputType | null;
    _sum: SmsLogSumAggregateOutputType | null;
    _min: SmsLogMinAggregateOutputType | null;
    _max: SmsLogMaxAggregateOutputType | null;
};
export type SmsLogAvgAggregateOutputType = {
    id: number | null;
    costPaise: number | null;
};
export type SmsLogSumAggregateOutputType = {
    id: bigint | null;
    costPaise: number | null;
};
export type SmsLogMinAggregateOutputType = {
    id: bigint | null;
    phoneHash: string | null;
    templateId: string | null;
    purpose: string | null;
    providerRef: string | null;
    status: string | null;
    costPaise: number | null;
    createdAt: Date | null;
};
export type SmsLogMaxAggregateOutputType = {
    id: bigint | null;
    phoneHash: string | null;
    templateId: string | null;
    purpose: string | null;
    providerRef: string | null;
    status: string | null;
    costPaise: number | null;
    createdAt: Date | null;
};
export type SmsLogCountAggregateOutputType = {
    id: number;
    phoneHash: number;
    templateId: number;
    purpose: number;
    providerRef: number;
    status: number;
    costPaise: number;
    createdAt: number;
    _all: number;
};
export type SmsLogAvgAggregateInputType = {
    id?: true;
    costPaise?: true;
};
export type SmsLogSumAggregateInputType = {
    id?: true;
    costPaise?: true;
};
export type SmsLogMinAggregateInputType = {
    id?: true;
    phoneHash?: true;
    templateId?: true;
    purpose?: true;
    providerRef?: true;
    status?: true;
    costPaise?: true;
    createdAt?: true;
};
export type SmsLogMaxAggregateInputType = {
    id?: true;
    phoneHash?: true;
    templateId?: true;
    purpose?: true;
    providerRef?: true;
    status?: true;
    costPaise?: true;
    createdAt?: true;
};
export type SmsLogCountAggregateInputType = {
    id?: true;
    phoneHash?: true;
    templateId?: true;
    purpose?: true;
    providerRef?: true;
    status?: true;
    costPaise?: true;
    createdAt?: true;
    _all?: true;
};
export type SmsLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SmsLogWhereInput;
    orderBy?: Prisma.SmsLogOrderByWithRelationInput | Prisma.SmsLogOrderByWithRelationInput[];
    cursor?: Prisma.SmsLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SmsLogCountAggregateInputType;
    _avg?: SmsLogAvgAggregateInputType;
    _sum?: SmsLogSumAggregateInputType;
    _min?: SmsLogMinAggregateInputType;
    _max?: SmsLogMaxAggregateInputType;
};
export type GetSmsLogAggregateType<T extends SmsLogAggregateArgs> = {
    [P in keyof T & keyof AggregateSmsLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSmsLog[P]> : Prisma.GetScalarType<T[P], AggregateSmsLog[P]>;
};
export type SmsLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SmsLogWhereInput;
    orderBy?: Prisma.SmsLogOrderByWithAggregationInput | Prisma.SmsLogOrderByWithAggregationInput[];
    by: Prisma.SmsLogScalarFieldEnum[] | Prisma.SmsLogScalarFieldEnum;
    having?: Prisma.SmsLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SmsLogCountAggregateInputType | true;
    _avg?: SmsLogAvgAggregateInputType;
    _sum?: SmsLogSumAggregateInputType;
    _min?: SmsLogMinAggregateInputType;
    _max?: SmsLogMaxAggregateInputType;
};
export type SmsLogGroupByOutputType = {
    id: bigint;
    phoneHash: string;
    templateId: string;
    purpose: string;
    providerRef: string | null;
    status: string;
    costPaise: number | null;
    createdAt: Date;
    _count: SmsLogCountAggregateOutputType | null;
    _avg: SmsLogAvgAggregateOutputType | null;
    _sum: SmsLogSumAggregateOutputType | null;
    _min: SmsLogMinAggregateOutputType | null;
    _max: SmsLogMaxAggregateOutputType | null;
};
export type GetSmsLogGroupByPayload<T extends SmsLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SmsLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SmsLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SmsLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SmsLogGroupByOutputType[P]>;
}>>;
export type SmsLogWhereInput = {
    AND?: Prisma.SmsLogWhereInput | Prisma.SmsLogWhereInput[];
    OR?: Prisma.SmsLogWhereInput[];
    NOT?: Prisma.SmsLogWhereInput | Prisma.SmsLogWhereInput[];
    id?: Prisma.BigIntFilter<"SmsLog"> | bigint | number;
    phoneHash?: Prisma.StringFilter<"SmsLog"> | string;
    templateId?: Prisma.StringFilter<"SmsLog"> | string;
    purpose?: Prisma.StringFilter<"SmsLog"> | string;
    providerRef?: Prisma.StringNullableFilter<"SmsLog"> | string | null;
    status?: Prisma.StringFilter<"SmsLog"> | string;
    costPaise?: Prisma.IntNullableFilter<"SmsLog"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"SmsLog"> | Date | string;
};
export type SmsLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    phoneHash?: Prisma.SortOrder;
    templateId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    costPaise?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _relevance?: Prisma.SmsLogOrderByRelevanceInput;
};
export type SmsLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.SmsLogWhereInput | Prisma.SmsLogWhereInput[];
    OR?: Prisma.SmsLogWhereInput[];
    NOT?: Prisma.SmsLogWhereInput | Prisma.SmsLogWhereInput[];
    phoneHash?: Prisma.StringFilter<"SmsLog"> | string;
    templateId?: Prisma.StringFilter<"SmsLog"> | string;
    purpose?: Prisma.StringFilter<"SmsLog"> | string;
    providerRef?: Prisma.StringNullableFilter<"SmsLog"> | string | null;
    status?: Prisma.StringFilter<"SmsLog"> | string;
    costPaise?: Prisma.IntNullableFilter<"SmsLog"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"SmsLog"> | Date | string;
}, "id">;
export type SmsLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    phoneHash?: Prisma.SortOrder;
    templateId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    costPaise?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SmsLogCountOrderByAggregateInput;
    _avg?: Prisma.SmsLogAvgOrderByAggregateInput;
    _max?: Prisma.SmsLogMaxOrderByAggregateInput;
    _min?: Prisma.SmsLogMinOrderByAggregateInput;
    _sum?: Prisma.SmsLogSumOrderByAggregateInput;
};
export type SmsLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.SmsLogScalarWhereWithAggregatesInput | Prisma.SmsLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.SmsLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SmsLogScalarWhereWithAggregatesInput | Prisma.SmsLogScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"SmsLog"> | bigint | number;
    phoneHash?: Prisma.StringWithAggregatesFilter<"SmsLog"> | string;
    templateId?: Prisma.StringWithAggregatesFilter<"SmsLog"> | string;
    purpose?: Prisma.StringWithAggregatesFilter<"SmsLog"> | string;
    providerRef?: Prisma.StringNullableWithAggregatesFilter<"SmsLog"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"SmsLog"> | string;
    costPaise?: Prisma.IntNullableWithAggregatesFilter<"SmsLog"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SmsLog"> | Date | string;
};
export type SmsLogCreateInput = {
    id?: bigint | number;
    phoneHash: string;
    templateId: string;
    purpose: string;
    providerRef?: string | null;
    status: string;
    costPaise?: number | null;
    createdAt?: Date | string;
};
export type SmsLogUncheckedCreateInput = {
    id?: bigint | number;
    phoneHash: string;
    templateId: string;
    purpose: string;
    providerRef?: string | null;
    status: string;
    costPaise?: number | null;
    createdAt?: Date | string;
};
export type SmsLogUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    phoneHash?: Prisma.StringFieldUpdateOperationsInput | string;
    templateId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    costPaise?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SmsLogUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    phoneHash?: Prisma.StringFieldUpdateOperationsInput | string;
    templateId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    costPaise?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SmsLogCreateManyInput = {
    id?: bigint | number;
    phoneHash: string;
    templateId: string;
    purpose: string;
    providerRef?: string | null;
    status: string;
    costPaise?: number | null;
    createdAt?: Date | string;
};
export type SmsLogUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    phoneHash?: Prisma.StringFieldUpdateOperationsInput | string;
    templateId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    costPaise?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SmsLogUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    phoneHash?: Prisma.StringFieldUpdateOperationsInput | string;
    templateId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    costPaise?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SmsLogOrderByRelevanceInput = {
    fields: Prisma.SmsLogOrderByRelevanceFieldEnum | Prisma.SmsLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SmsLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phoneHash?: Prisma.SortOrder;
    templateId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    costPaise?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SmsLogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    costPaise?: Prisma.SortOrder;
};
export type SmsLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phoneHash?: Prisma.SortOrder;
    templateId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    costPaise?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SmsLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phoneHash?: Prisma.SortOrder;
    templateId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    costPaise?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SmsLogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    costPaise?: Prisma.SortOrder;
};
export type SmsLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    phoneHash?: boolean;
    templateId?: boolean;
    purpose?: boolean;
    providerRef?: boolean;
    status?: boolean;
    costPaise?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["smsLog"]>;
export type SmsLogSelectScalar = {
    id?: boolean;
    phoneHash?: boolean;
    templateId?: boolean;
    purpose?: boolean;
    providerRef?: boolean;
    status?: boolean;
    costPaise?: boolean;
    createdAt?: boolean;
};
export type SmsLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "phoneHash" | "templateId" | "purpose" | "providerRef" | "status" | "costPaise" | "createdAt", ExtArgs["result"]["smsLog"]>;
export type $SmsLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SmsLog";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        phoneHash: string;
        templateId: string;
        purpose: string;
        providerRef: string | null;
        status: string;
        costPaise: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["smsLog"]>;
    composites: {};
};
export type SmsLogGetPayload<S extends boolean | null | undefined | SmsLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SmsLogPayload, S>;
export type SmsLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SmsLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SmsLogCountAggregateInputType | true;
};
export interface SmsLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SmsLog'];
        meta: {
            name: 'SmsLog';
        };
    };
    findUnique<T extends SmsLogFindUniqueArgs>(args: Prisma.SelectSubset<T, SmsLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SmsLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SmsLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SmsLogFindFirstArgs>(args?: Prisma.SelectSubset<T, SmsLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SmsLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SmsLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SmsLogFindManyArgs>(args?: Prisma.SelectSubset<T, SmsLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SmsLogCreateArgs>(args: Prisma.SelectSubset<T, SmsLogCreateArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SmsLogCreateManyArgs>(args?: Prisma.SelectSubset<T, SmsLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SmsLogDeleteArgs>(args: Prisma.SelectSubset<T, SmsLogDeleteArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SmsLogUpdateArgs>(args: Prisma.SelectSubset<T, SmsLogUpdateArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SmsLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, SmsLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SmsLogUpdateManyArgs>(args: Prisma.SelectSubset<T, SmsLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SmsLogUpsertArgs>(args: Prisma.SelectSubset<T, SmsLogUpsertArgs<ExtArgs>>): Prisma.Prisma__SmsLogClient<runtime.Types.Result.GetResult<Prisma.$SmsLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SmsLogCountArgs>(args?: Prisma.Subset<T, SmsLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SmsLogCountAggregateOutputType> : number>;
    aggregate<T extends SmsLogAggregateArgs>(args: Prisma.Subset<T, SmsLogAggregateArgs>): Prisma.PrismaPromise<GetSmsLogAggregateType<T>>;
    groupBy<T extends SmsLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SmsLogGroupByArgs['orderBy'];
    } : {
        orderBy?: SmsLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SmsLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSmsLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SmsLogFieldRefs;
}
export interface Prisma__SmsLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SmsLogFieldRefs {
    readonly id: Prisma.FieldRef<"SmsLog", 'BigInt'>;
    readonly phoneHash: Prisma.FieldRef<"SmsLog", 'String'>;
    readonly templateId: Prisma.FieldRef<"SmsLog", 'String'>;
    readonly purpose: Prisma.FieldRef<"SmsLog", 'String'>;
    readonly providerRef: Prisma.FieldRef<"SmsLog", 'String'>;
    readonly status: Prisma.FieldRef<"SmsLog", 'String'>;
    readonly costPaise: Prisma.FieldRef<"SmsLog", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"SmsLog", 'DateTime'>;
}
export type SmsLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    where: Prisma.SmsLogWhereUniqueInput;
};
export type SmsLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    where: Prisma.SmsLogWhereUniqueInput;
};
export type SmsLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    where?: Prisma.SmsLogWhereInput;
    orderBy?: Prisma.SmsLogOrderByWithRelationInput | Prisma.SmsLogOrderByWithRelationInput[];
    cursor?: Prisma.SmsLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SmsLogScalarFieldEnum | Prisma.SmsLogScalarFieldEnum[];
};
export type SmsLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    where?: Prisma.SmsLogWhereInput;
    orderBy?: Prisma.SmsLogOrderByWithRelationInput | Prisma.SmsLogOrderByWithRelationInput[];
    cursor?: Prisma.SmsLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SmsLogScalarFieldEnum | Prisma.SmsLogScalarFieldEnum[];
};
export type SmsLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    where?: Prisma.SmsLogWhereInput;
    orderBy?: Prisma.SmsLogOrderByWithRelationInput | Prisma.SmsLogOrderByWithRelationInput[];
    cursor?: Prisma.SmsLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SmsLogScalarFieldEnum | Prisma.SmsLogScalarFieldEnum[];
};
export type SmsLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SmsLogCreateInput, Prisma.SmsLogUncheckedCreateInput>;
};
export type SmsLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SmsLogCreateManyInput | Prisma.SmsLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SmsLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SmsLogUpdateInput, Prisma.SmsLogUncheckedUpdateInput>;
    where: Prisma.SmsLogWhereUniqueInput;
};
export type SmsLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SmsLogUpdateManyMutationInput, Prisma.SmsLogUncheckedUpdateManyInput>;
    where?: Prisma.SmsLogWhereInput;
    limit?: number;
};
export type SmsLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    where: Prisma.SmsLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.SmsLogCreateInput, Prisma.SmsLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SmsLogUpdateInput, Prisma.SmsLogUncheckedUpdateInput>;
};
export type SmsLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
    where: Prisma.SmsLogWhereUniqueInput;
};
export type SmsLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SmsLogWhereInput;
    limit?: number;
};
export type SmsLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SmsLogSelect<ExtArgs> | null;
    omit?: Prisma.SmsLogOmit<ExtArgs> | null;
};
