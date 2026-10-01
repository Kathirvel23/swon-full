import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NotificationPrefModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationPrefPayload>;
export type AggregateNotificationPref = {
    _count: NotificationPrefCountAggregateOutputType | null;
    _avg: NotificationPrefAvgAggregateOutputType | null;
    _sum: NotificationPrefSumAggregateOutputType | null;
    _min: NotificationPrefMinAggregateOutputType | null;
    _max: NotificationPrefMaxAggregateOutputType | null;
};
export type NotificationPrefAvgAggregateOutputType = {
    accountId: number | null;
};
export type NotificationPrefSumAggregateOutputType = {
    accountId: bigint | null;
};
export type NotificationPrefMinAggregateOutputType = {
    accountId: bigint | null;
    pushEnabled: boolean | null;
    smsEnabled: boolean | null;
    quietHours: string | null;
    updatedAt: Date | null;
};
export type NotificationPrefMaxAggregateOutputType = {
    accountId: bigint | null;
    pushEnabled: boolean | null;
    smsEnabled: boolean | null;
    quietHours: string | null;
    updatedAt: Date | null;
};
export type NotificationPrefCountAggregateOutputType = {
    accountId: number;
    pushEnabled: number;
    smsEnabled: number;
    quietHours: number;
    updatedAt: number;
    _all: number;
};
export type NotificationPrefAvgAggregateInputType = {
    accountId?: true;
};
export type NotificationPrefSumAggregateInputType = {
    accountId?: true;
};
export type NotificationPrefMinAggregateInputType = {
    accountId?: true;
    pushEnabled?: true;
    smsEnabled?: true;
    quietHours?: true;
    updatedAt?: true;
};
export type NotificationPrefMaxAggregateInputType = {
    accountId?: true;
    pushEnabled?: true;
    smsEnabled?: true;
    quietHours?: true;
    updatedAt?: true;
};
export type NotificationPrefCountAggregateInputType = {
    accountId?: true;
    pushEnabled?: true;
    smsEnabled?: true;
    quietHours?: true;
    updatedAt?: true;
    _all?: true;
};
export type NotificationPrefAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationPrefWhereInput;
    orderBy?: Prisma.NotificationPrefOrderByWithRelationInput | Prisma.NotificationPrefOrderByWithRelationInput[];
    cursor?: Prisma.NotificationPrefWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationPrefCountAggregateInputType;
    _avg?: NotificationPrefAvgAggregateInputType;
    _sum?: NotificationPrefSumAggregateInputType;
    _min?: NotificationPrefMinAggregateInputType;
    _max?: NotificationPrefMaxAggregateInputType;
};
export type GetNotificationPrefAggregateType<T extends NotificationPrefAggregateArgs> = {
    [P in keyof T & keyof AggregateNotificationPref]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotificationPref[P]> : Prisma.GetScalarType<T[P], AggregateNotificationPref[P]>;
};
export type NotificationPrefGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationPrefWhereInput;
    orderBy?: Prisma.NotificationPrefOrderByWithAggregationInput | Prisma.NotificationPrefOrderByWithAggregationInput[];
    by: Prisma.NotificationPrefScalarFieldEnum[] | Prisma.NotificationPrefScalarFieldEnum;
    having?: Prisma.NotificationPrefScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationPrefCountAggregateInputType | true;
    _avg?: NotificationPrefAvgAggregateInputType;
    _sum?: NotificationPrefSumAggregateInputType;
    _min?: NotificationPrefMinAggregateInputType;
    _max?: NotificationPrefMaxAggregateInputType;
};
export type NotificationPrefGroupByOutputType = {
    accountId: bigint;
    pushEnabled: boolean;
    smsEnabled: boolean;
    quietHours: string | null;
    updatedAt: Date;
    _count: NotificationPrefCountAggregateOutputType | null;
    _avg: NotificationPrefAvgAggregateOutputType | null;
    _sum: NotificationPrefSumAggregateOutputType | null;
    _min: NotificationPrefMinAggregateOutputType | null;
    _max: NotificationPrefMaxAggregateOutputType | null;
};
export type GetNotificationPrefGroupByPayload<T extends NotificationPrefGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationPrefGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationPrefGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationPrefGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationPrefGroupByOutputType[P]>;
}>>;
export type NotificationPrefWhereInput = {
    AND?: Prisma.NotificationPrefWhereInput | Prisma.NotificationPrefWhereInput[];
    OR?: Prisma.NotificationPrefWhereInput[];
    NOT?: Prisma.NotificationPrefWhereInput | Prisma.NotificationPrefWhereInput[];
    accountId?: Prisma.BigIntFilter<"NotificationPref"> | bigint | number;
    pushEnabled?: Prisma.BoolFilter<"NotificationPref"> | boolean;
    smsEnabled?: Prisma.BoolFilter<"NotificationPref"> | boolean;
    quietHours?: Prisma.StringNullableFilter<"NotificationPref"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"NotificationPref"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type NotificationPrefOrderByWithRelationInput = {
    accountId?: Prisma.SortOrder;
    pushEnabled?: Prisma.SortOrder;
    smsEnabled?: Prisma.SortOrder;
    quietHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.NotificationPrefOrderByRelevanceInput;
};
export type NotificationPrefWhereUniqueInput = Prisma.AtLeast<{
    accountId?: bigint | number;
    AND?: Prisma.NotificationPrefWhereInput | Prisma.NotificationPrefWhereInput[];
    OR?: Prisma.NotificationPrefWhereInput[];
    NOT?: Prisma.NotificationPrefWhereInput | Prisma.NotificationPrefWhereInput[];
    pushEnabled?: Prisma.BoolFilter<"NotificationPref"> | boolean;
    smsEnabled?: Prisma.BoolFilter<"NotificationPref"> | boolean;
    quietHours?: Prisma.StringNullableFilter<"NotificationPref"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"NotificationPref"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "accountId">;
export type NotificationPrefOrderByWithAggregationInput = {
    accountId?: Prisma.SortOrder;
    pushEnabled?: Prisma.SortOrder;
    smsEnabled?: Prisma.SortOrder;
    quietHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NotificationPrefCountOrderByAggregateInput;
    _avg?: Prisma.NotificationPrefAvgOrderByAggregateInput;
    _max?: Prisma.NotificationPrefMaxOrderByAggregateInput;
    _min?: Prisma.NotificationPrefMinOrderByAggregateInput;
    _sum?: Prisma.NotificationPrefSumOrderByAggregateInput;
};
export type NotificationPrefScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationPrefScalarWhereWithAggregatesInput | Prisma.NotificationPrefScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationPrefScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationPrefScalarWhereWithAggregatesInput | Prisma.NotificationPrefScalarWhereWithAggregatesInput[];
    accountId?: Prisma.BigIntWithAggregatesFilter<"NotificationPref"> | bigint | number;
    pushEnabled?: Prisma.BoolWithAggregatesFilter<"NotificationPref"> | boolean;
    smsEnabled?: Prisma.BoolWithAggregatesFilter<"NotificationPref"> | boolean;
    quietHours?: Prisma.StringNullableWithAggregatesFilter<"NotificationPref"> | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"NotificationPref"> | Date | string;
};
export type NotificationPrefCreateInput = {
    pushEnabled?: boolean;
    smsEnabled?: boolean;
    quietHours?: string | null;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutNotificationPrefInput;
};
export type NotificationPrefUncheckedCreateInput = {
    accountId: bigint | number;
    pushEnabled?: boolean;
    smsEnabled?: boolean;
    quietHours?: string | null;
    updatedAt?: Date | string;
};
export type NotificationPrefUpdateInput = {
    pushEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    quietHours?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutNotificationPrefNestedInput;
};
export type NotificationPrefUncheckedUpdateInput = {
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    pushEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    quietHours?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationPrefCreateManyInput = {
    accountId: bigint | number;
    pushEnabled?: boolean;
    smsEnabled?: boolean;
    quietHours?: string | null;
    updatedAt?: Date | string;
};
export type NotificationPrefUpdateManyMutationInput = {
    pushEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    quietHours?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationPrefUncheckedUpdateManyInput = {
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    pushEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    quietHours?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationPrefNullableScalarRelationFilter = {
    is?: Prisma.NotificationPrefWhereInput | null;
    isNot?: Prisma.NotificationPrefWhereInput | null;
};
export type NotificationPrefOrderByRelevanceInput = {
    fields: Prisma.NotificationPrefOrderByRelevanceFieldEnum | Prisma.NotificationPrefOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type NotificationPrefCountOrderByAggregateInput = {
    accountId?: Prisma.SortOrder;
    pushEnabled?: Prisma.SortOrder;
    smsEnabled?: Prisma.SortOrder;
    quietHours?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationPrefAvgOrderByAggregateInput = {
    accountId?: Prisma.SortOrder;
};
export type NotificationPrefMaxOrderByAggregateInput = {
    accountId?: Prisma.SortOrder;
    pushEnabled?: Prisma.SortOrder;
    smsEnabled?: Prisma.SortOrder;
    quietHours?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationPrefMinOrderByAggregateInput = {
    accountId?: Prisma.SortOrder;
    pushEnabled?: Prisma.SortOrder;
    smsEnabled?: Prisma.SortOrder;
    quietHours?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationPrefSumOrderByAggregateInput = {
    accountId?: Prisma.SortOrder;
};
export type NotificationPrefCreateNestedOneWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.NotificationPrefCreateWithoutAccountInput, Prisma.NotificationPrefUncheckedCreateWithoutAccountInput>;
    connectOrCreate?: Prisma.NotificationPrefCreateOrConnectWithoutAccountInput;
    connect?: Prisma.NotificationPrefWhereUniqueInput;
};
export type NotificationPrefUncheckedCreateNestedOneWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.NotificationPrefCreateWithoutAccountInput, Prisma.NotificationPrefUncheckedCreateWithoutAccountInput>;
    connectOrCreate?: Prisma.NotificationPrefCreateOrConnectWithoutAccountInput;
    connect?: Prisma.NotificationPrefWhereUniqueInput;
};
export type NotificationPrefUpdateOneWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationPrefCreateWithoutAccountInput, Prisma.NotificationPrefUncheckedCreateWithoutAccountInput>;
    connectOrCreate?: Prisma.NotificationPrefCreateOrConnectWithoutAccountInput;
    upsert?: Prisma.NotificationPrefUpsertWithoutAccountInput;
    disconnect?: Prisma.NotificationPrefWhereInput | boolean;
    delete?: Prisma.NotificationPrefWhereInput | boolean;
    connect?: Prisma.NotificationPrefWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NotificationPrefUpdateToOneWithWhereWithoutAccountInput, Prisma.NotificationPrefUpdateWithoutAccountInput>, Prisma.NotificationPrefUncheckedUpdateWithoutAccountInput>;
};
export type NotificationPrefUncheckedUpdateOneWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationPrefCreateWithoutAccountInput, Prisma.NotificationPrefUncheckedCreateWithoutAccountInput>;
    connectOrCreate?: Prisma.NotificationPrefCreateOrConnectWithoutAccountInput;
    upsert?: Prisma.NotificationPrefUpsertWithoutAccountInput;
    disconnect?: Prisma.NotificationPrefWhereInput | boolean;
    delete?: Prisma.NotificationPrefWhereInput | boolean;
    connect?: Prisma.NotificationPrefWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NotificationPrefUpdateToOneWithWhereWithoutAccountInput, Prisma.NotificationPrefUpdateWithoutAccountInput>, Prisma.NotificationPrefUncheckedUpdateWithoutAccountInput>;
};
export type NotificationPrefCreateWithoutAccountInput = {
    pushEnabled?: boolean;
    smsEnabled?: boolean;
    quietHours?: string | null;
    updatedAt?: Date | string;
};
export type NotificationPrefUncheckedCreateWithoutAccountInput = {
    pushEnabled?: boolean;
    smsEnabled?: boolean;
    quietHours?: string | null;
    updatedAt?: Date | string;
};
export type NotificationPrefCreateOrConnectWithoutAccountInput = {
    where: Prisma.NotificationPrefWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationPrefCreateWithoutAccountInput, Prisma.NotificationPrefUncheckedCreateWithoutAccountInput>;
};
export type NotificationPrefUpsertWithoutAccountInput = {
    update: Prisma.XOR<Prisma.NotificationPrefUpdateWithoutAccountInput, Prisma.NotificationPrefUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.NotificationPrefCreateWithoutAccountInput, Prisma.NotificationPrefUncheckedCreateWithoutAccountInput>;
    where?: Prisma.NotificationPrefWhereInput;
};
export type NotificationPrefUpdateToOneWithWhereWithoutAccountInput = {
    where?: Prisma.NotificationPrefWhereInput;
    data: Prisma.XOR<Prisma.NotificationPrefUpdateWithoutAccountInput, Prisma.NotificationPrefUncheckedUpdateWithoutAccountInput>;
};
export type NotificationPrefUpdateWithoutAccountInput = {
    pushEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    quietHours?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationPrefUncheckedUpdateWithoutAccountInput = {
    pushEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    quietHours?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationPrefSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    accountId?: boolean;
    pushEnabled?: boolean;
    smsEnabled?: boolean;
    quietHours?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notificationPref"]>;
export type NotificationPrefSelectScalar = {
    accountId?: boolean;
    pushEnabled?: boolean;
    smsEnabled?: boolean;
    quietHours?: boolean;
    updatedAt?: boolean;
};
export type NotificationPrefOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"accountId" | "pushEnabled" | "smsEnabled" | "quietHours" | "updatedAt", ExtArgs["result"]["notificationPref"]>;
export type NotificationPrefInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $NotificationPrefPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NotificationPref";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        accountId: bigint;
        pushEnabled: boolean;
        smsEnabled: boolean;
        quietHours: string | null;
        updatedAt: Date;
    }, ExtArgs["result"]["notificationPref"]>;
    composites: {};
};
export type NotificationPrefGetPayload<S extends boolean | null | undefined | NotificationPrefDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload, S>;
export type NotificationPrefCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationPrefFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationPrefCountAggregateInputType | true;
};
export interface NotificationPrefDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NotificationPref'];
        meta: {
            name: 'NotificationPref';
        };
    };
    findUnique<T extends NotificationPrefFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationPrefFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NotificationPrefFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationPrefFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NotificationPrefFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationPrefFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NotificationPrefFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationPrefFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NotificationPrefFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationPrefFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NotificationPrefCreateArgs>(args: Prisma.SelectSubset<T, NotificationPrefCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NotificationPrefCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationPrefCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends NotificationPrefDeleteArgs>(args: Prisma.SelectSubset<T, NotificationPrefDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NotificationPrefUpdateArgs>(args: Prisma.SelectSubset<T, NotificationPrefUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NotificationPrefDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationPrefDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NotificationPrefUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationPrefUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends NotificationPrefUpsertArgs>(args: Prisma.SelectSubset<T, NotificationPrefUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationPrefClient<runtime.Types.Result.GetResult<Prisma.$NotificationPrefPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NotificationPrefCountArgs>(args?: Prisma.Subset<T, NotificationPrefCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationPrefCountAggregateOutputType> : number>;
    aggregate<T extends NotificationPrefAggregateArgs>(args: Prisma.Subset<T, NotificationPrefAggregateArgs>): Prisma.PrismaPromise<GetNotificationPrefAggregateType<T>>;
    groupBy<T extends NotificationPrefGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationPrefGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationPrefGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationPrefGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPrefGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NotificationPrefFieldRefs;
}
export interface Prisma__NotificationPrefClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NotificationPrefFieldRefs {
    readonly accountId: Prisma.FieldRef<"NotificationPref", 'BigInt'>;
    readonly pushEnabled: Prisma.FieldRef<"NotificationPref", 'Boolean'>;
    readonly smsEnabled: Prisma.FieldRef<"NotificationPref", 'Boolean'>;
    readonly quietHours: Prisma.FieldRef<"NotificationPref", 'String'>;
    readonly updatedAt: Prisma.FieldRef<"NotificationPref", 'DateTime'>;
}
export type NotificationPrefFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    where: Prisma.NotificationPrefWhereUniqueInput;
};
export type NotificationPrefFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    where: Prisma.NotificationPrefWhereUniqueInput;
};
export type NotificationPrefFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    where?: Prisma.NotificationPrefWhereInput;
    orderBy?: Prisma.NotificationPrefOrderByWithRelationInput | Prisma.NotificationPrefOrderByWithRelationInput[];
    cursor?: Prisma.NotificationPrefWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationPrefScalarFieldEnum | Prisma.NotificationPrefScalarFieldEnum[];
};
export type NotificationPrefFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    where?: Prisma.NotificationPrefWhereInput;
    orderBy?: Prisma.NotificationPrefOrderByWithRelationInput | Prisma.NotificationPrefOrderByWithRelationInput[];
    cursor?: Prisma.NotificationPrefWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationPrefScalarFieldEnum | Prisma.NotificationPrefScalarFieldEnum[];
};
export type NotificationPrefFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    where?: Prisma.NotificationPrefWhereInput;
    orderBy?: Prisma.NotificationPrefOrderByWithRelationInput | Prisma.NotificationPrefOrderByWithRelationInput[];
    cursor?: Prisma.NotificationPrefWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationPrefScalarFieldEnum | Prisma.NotificationPrefScalarFieldEnum[];
};
export type NotificationPrefCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationPrefCreateInput, Prisma.NotificationPrefUncheckedCreateInput>;
};
export type NotificationPrefCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NotificationPrefCreateManyInput | Prisma.NotificationPrefCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NotificationPrefUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationPrefUpdateInput, Prisma.NotificationPrefUncheckedUpdateInput>;
    where: Prisma.NotificationPrefWhereUniqueInput;
};
export type NotificationPrefUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NotificationPrefUpdateManyMutationInput, Prisma.NotificationPrefUncheckedUpdateManyInput>;
    where?: Prisma.NotificationPrefWhereInput;
    limit?: number;
};
export type NotificationPrefUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    where: Prisma.NotificationPrefWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationPrefCreateInput, Prisma.NotificationPrefUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NotificationPrefUpdateInput, Prisma.NotificationPrefUncheckedUpdateInput>;
};
export type NotificationPrefDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
    where: Prisma.NotificationPrefWhereUniqueInput;
};
export type NotificationPrefDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationPrefWhereInput;
    limit?: number;
};
export type NotificationPrefDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationPrefSelect<ExtArgs> | null;
    omit?: Prisma.NotificationPrefOmit<ExtArgs> | null;
    include?: Prisma.NotificationPrefInclude<ExtArgs> | null;
};
