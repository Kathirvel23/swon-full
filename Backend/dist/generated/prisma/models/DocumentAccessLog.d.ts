import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DocumentAccessLogModel = runtime.Types.Result.DefaultSelection<Prisma.$DocumentAccessLogPayload>;
export type AggregateDocumentAccessLog = {
    _count: DocumentAccessLogCountAggregateOutputType | null;
    _avg: DocumentAccessLogAvgAggregateOutputType | null;
    _sum: DocumentAccessLogSumAggregateOutputType | null;
    _min: DocumentAccessLogMinAggregateOutputType | null;
    _max: DocumentAccessLogMaxAggregateOutputType | null;
};
export type DocumentAccessLogAvgAggregateOutputType = {
    id: number | null;
    documentId: number | null;
    actorId: number | null;
};
export type DocumentAccessLogSumAggregateOutputType = {
    id: bigint | null;
    documentId: bigint | null;
    actorId: bigint | null;
};
export type DocumentAccessLogMinAggregateOutputType = {
    id: bigint | null;
    documentId: bigint | null;
    actorId: bigint | null;
    action: string | null;
    at: Date | null;
    ipHash: string | null;
};
export type DocumentAccessLogMaxAggregateOutputType = {
    id: bigint | null;
    documentId: bigint | null;
    actorId: bigint | null;
    action: string | null;
    at: Date | null;
    ipHash: string | null;
};
export type DocumentAccessLogCountAggregateOutputType = {
    id: number;
    documentId: number;
    actorId: number;
    action: number;
    at: number;
    ipHash: number;
    _all: number;
};
export type DocumentAccessLogAvgAggregateInputType = {
    id?: true;
    documentId?: true;
    actorId?: true;
};
export type DocumentAccessLogSumAggregateInputType = {
    id?: true;
    documentId?: true;
    actorId?: true;
};
export type DocumentAccessLogMinAggregateInputType = {
    id?: true;
    documentId?: true;
    actorId?: true;
    action?: true;
    at?: true;
    ipHash?: true;
};
export type DocumentAccessLogMaxAggregateInputType = {
    id?: true;
    documentId?: true;
    actorId?: true;
    action?: true;
    at?: true;
    ipHash?: true;
};
export type DocumentAccessLogCountAggregateInputType = {
    id?: true;
    documentId?: true;
    actorId?: true;
    action?: true;
    at?: true;
    ipHash?: true;
    _all?: true;
};
export type DocumentAccessLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentAccessLogWhereInput;
    orderBy?: Prisma.DocumentAccessLogOrderByWithRelationInput | Prisma.DocumentAccessLogOrderByWithRelationInput[];
    cursor?: Prisma.DocumentAccessLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DocumentAccessLogCountAggregateInputType;
    _avg?: DocumentAccessLogAvgAggregateInputType;
    _sum?: DocumentAccessLogSumAggregateInputType;
    _min?: DocumentAccessLogMinAggregateInputType;
    _max?: DocumentAccessLogMaxAggregateInputType;
};
export type GetDocumentAccessLogAggregateType<T extends DocumentAccessLogAggregateArgs> = {
    [P in keyof T & keyof AggregateDocumentAccessLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDocumentAccessLog[P]> : Prisma.GetScalarType<T[P], AggregateDocumentAccessLog[P]>;
};
export type DocumentAccessLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentAccessLogWhereInput;
    orderBy?: Prisma.DocumentAccessLogOrderByWithAggregationInput | Prisma.DocumentAccessLogOrderByWithAggregationInput[];
    by: Prisma.DocumentAccessLogScalarFieldEnum[] | Prisma.DocumentAccessLogScalarFieldEnum;
    having?: Prisma.DocumentAccessLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DocumentAccessLogCountAggregateInputType | true;
    _avg?: DocumentAccessLogAvgAggregateInputType;
    _sum?: DocumentAccessLogSumAggregateInputType;
    _min?: DocumentAccessLogMinAggregateInputType;
    _max?: DocumentAccessLogMaxAggregateInputType;
};
export type DocumentAccessLogGroupByOutputType = {
    id: bigint;
    documentId: bigint;
    actorId: bigint;
    action: string;
    at: Date;
    ipHash: string | null;
    _count: DocumentAccessLogCountAggregateOutputType | null;
    _avg: DocumentAccessLogAvgAggregateOutputType | null;
    _sum: DocumentAccessLogSumAggregateOutputType | null;
    _min: DocumentAccessLogMinAggregateOutputType | null;
    _max: DocumentAccessLogMaxAggregateOutputType | null;
};
export type GetDocumentAccessLogGroupByPayload<T extends DocumentAccessLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DocumentAccessLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DocumentAccessLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DocumentAccessLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DocumentAccessLogGroupByOutputType[P]>;
}>>;
export type DocumentAccessLogWhereInput = {
    AND?: Prisma.DocumentAccessLogWhereInput | Prisma.DocumentAccessLogWhereInput[];
    OR?: Prisma.DocumentAccessLogWhereInput[];
    NOT?: Prisma.DocumentAccessLogWhereInput | Prisma.DocumentAccessLogWhereInput[];
    id?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    documentId?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    actorId?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    action?: Prisma.StringFilter<"DocumentAccessLog"> | string;
    at?: Prisma.DateTimeFilter<"DocumentAccessLog"> | Date | string;
    ipHash?: Prisma.StringNullableFilter<"DocumentAccessLog"> | string | null;
    document?: Prisma.XOR<Prisma.KycDocumentScalarRelationFilter, Prisma.KycDocumentWhereInput>;
};
export type DocumentAccessLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    document?: Prisma.KycDocumentOrderByWithRelationInput;
    _relevance?: Prisma.DocumentAccessLogOrderByRelevanceInput;
};
export type DocumentAccessLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.DocumentAccessLogWhereInput | Prisma.DocumentAccessLogWhereInput[];
    OR?: Prisma.DocumentAccessLogWhereInput[];
    NOT?: Prisma.DocumentAccessLogWhereInput | Prisma.DocumentAccessLogWhereInput[];
    documentId?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    actorId?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    action?: Prisma.StringFilter<"DocumentAccessLog"> | string;
    at?: Prisma.DateTimeFilter<"DocumentAccessLog"> | Date | string;
    ipHash?: Prisma.StringNullableFilter<"DocumentAccessLog"> | string | null;
    document?: Prisma.XOR<Prisma.KycDocumentScalarRelationFilter, Prisma.KycDocumentWhereInput>;
}, "id">;
export type DocumentAccessLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.DocumentAccessLogCountOrderByAggregateInput;
    _avg?: Prisma.DocumentAccessLogAvgOrderByAggregateInput;
    _max?: Prisma.DocumentAccessLogMaxOrderByAggregateInput;
    _min?: Prisma.DocumentAccessLogMinOrderByAggregateInput;
    _sum?: Prisma.DocumentAccessLogSumOrderByAggregateInput;
};
export type DocumentAccessLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.DocumentAccessLogScalarWhereWithAggregatesInput | Prisma.DocumentAccessLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.DocumentAccessLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DocumentAccessLogScalarWhereWithAggregatesInput | Prisma.DocumentAccessLogScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"DocumentAccessLog"> | bigint | number;
    documentId?: Prisma.BigIntWithAggregatesFilter<"DocumentAccessLog"> | bigint | number;
    actorId?: Prisma.BigIntWithAggregatesFilter<"DocumentAccessLog"> | bigint | number;
    action?: Prisma.StringWithAggregatesFilter<"DocumentAccessLog"> | string;
    at?: Prisma.DateTimeWithAggregatesFilter<"DocumentAccessLog"> | Date | string;
    ipHash?: Prisma.StringNullableWithAggregatesFilter<"DocumentAccessLog"> | string | null;
};
export type DocumentAccessLogCreateInput = {
    id?: bigint | number;
    actorId: bigint | number;
    action: string;
    at?: Date | string;
    ipHash?: string | null;
    document: Prisma.KycDocumentCreateNestedOneWithoutAccessLogsInput;
};
export type DocumentAccessLogUncheckedCreateInput = {
    id?: bigint | number;
    documentId: bigint | number;
    actorId: bigint | number;
    action: string;
    at?: Date | string;
    ipHash?: string | null;
};
export type DocumentAccessLogUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    document?: Prisma.KycDocumentUpdateOneRequiredWithoutAccessLogsNestedInput;
};
export type DocumentAccessLogUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    documentId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DocumentAccessLogCreateManyInput = {
    id?: bigint | number;
    documentId: bigint | number;
    actorId: bigint | number;
    action: string;
    at?: Date | string;
    ipHash?: string | null;
};
export type DocumentAccessLogUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DocumentAccessLogUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    documentId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DocumentAccessLogListRelationFilter = {
    every?: Prisma.DocumentAccessLogWhereInput;
    some?: Prisma.DocumentAccessLogWhereInput;
    none?: Prisma.DocumentAccessLogWhereInput;
};
export type DocumentAccessLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DocumentAccessLogOrderByRelevanceInput = {
    fields: Prisma.DocumentAccessLogOrderByRelevanceFieldEnum | Prisma.DocumentAccessLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type DocumentAccessLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type DocumentAccessLogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
};
export type DocumentAccessLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type DocumentAccessLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
};
export type DocumentAccessLogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
};
export type DocumentAccessLogCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.DocumentAccessLogCreateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAccessLogCreateWithoutDocumentInput[] | Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput | Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.DocumentAccessLogCreateManyDocumentInputEnvelope;
    connect?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
};
export type DocumentAccessLogUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.DocumentAccessLogCreateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAccessLogCreateWithoutDocumentInput[] | Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput | Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.DocumentAccessLogCreateManyDocumentInputEnvelope;
    connect?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
};
export type DocumentAccessLogUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentAccessLogCreateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAccessLogCreateWithoutDocumentInput[] | Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput | Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.DocumentAccessLogCreateManyDocumentInputEnvelope;
    set?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    disconnect?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    delete?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    connect?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    update?: Prisma.DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput | Prisma.DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.DocumentAccessLogScalarWhereInput | Prisma.DocumentAccessLogScalarWhereInput[];
};
export type DocumentAccessLogUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentAccessLogCreateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAccessLogCreateWithoutDocumentInput[] | Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput | Prisma.DocumentAccessLogCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.DocumentAccessLogCreateManyDocumentInputEnvelope;
    set?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    disconnect?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    delete?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    connect?: Prisma.DocumentAccessLogWhereUniqueInput | Prisma.DocumentAccessLogWhereUniqueInput[];
    update?: Prisma.DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput | Prisma.DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.DocumentAccessLogScalarWhereInput | Prisma.DocumentAccessLogScalarWhereInput[];
};
export type DocumentAccessLogCreateWithoutDocumentInput = {
    id?: bigint | number;
    actorId: bigint | number;
    action: string;
    at?: Date | string;
    ipHash?: string | null;
};
export type DocumentAccessLogUncheckedCreateWithoutDocumentInput = {
    id?: bigint | number;
    actorId: bigint | number;
    action: string;
    at?: Date | string;
    ipHash?: string | null;
};
export type DocumentAccessLogCreateOrConnectWithoutDocumentInput = {
    where: Prisma.DocumentAccessLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocumentAccessLogCreateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput>;
};
export type DocumentAccessLogCreateManyDocumentInputEnvelope = {
    data: Prisma.DocumentAccessLogCreateManyDocumentInput | Prisma.DocumentAccessLogCreateManyDocumentInput[];
    skipDuplicates?: boolean;
};
export type DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.DocumentAccessLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.DocumentAccessLogUpdateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedUpdateWithoutDocumentInput>;
    create: Prisma.XOR<Prisma.DocumentAccessLogCreateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedCreateWithoutDocumentInput>;
};
export type DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.DocumentAccessLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.DocumentAccessLogUpdateWithoutDocumentInput, Prisma.DocumentAccessLogUncheckedUpdateWithoutDocumentInput>;
};
export type DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput = {
    where: Prisma.DocumentAccessLogScalarWhereInput;
    data: Prisma.XOR<Prisma.DocumentAccessLogUpdateManyMutationInput, Prisma.DocumentAccessLogUncheckedUpdateManyWithoutDocumentInput>;
};
export type DocumentAccessLogScalarWhereInput = {
    AND?: Prisma.DocumentAccessLogScalarWhereInput | Prisma.DocumentAccessLogScalarWhereInput[];
    OR?: Prisma.DocumentAccessLogScalarWhereInput[];
    NOT?: Prisma.DocumentAccessLogScalarWhereInput | Prisma.DocumentAccessLogScalarWhereInput[];
    id?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    documentId?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    actorId?: Prisma.BigIntFilter<"DocumentAccessLog"> | bigint | number;
    action?: Prisma.StringFilter<"DocumentAccessLog"> | string;
    at?: Prisma.DateTimeFilter<"DocumentAccessLog"> | Date | string;
    ipHash?: Prisma.StringNullableFilter<"DocumentAccessLog"> | string | null;
};
export type DocumentAccessLogCreateManyDocumentInput = {
    id?: bigint | number;
    actorId: bigint | number;
    action: string;
    at?: Date | string;
    ipHash?: string | null;
};
export type DocumentAccessLogUpdateWithoutDocumentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DocumentAccessLogUncheckedUpdateWithoutDocumentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DocumentAccessLogUncheckedUpdateManyWithoutDocumentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actorId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DocumentAccessLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    actorId?: boolean;
    action?: boolean;
    at?: boolean;
    ipHash?: boolean;
    document?: boolean | Prisma.KycDocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["documentAccessLog"]>;
export type DocumentAccessLogSelectScalar = {
    id?: boolean;
    documentId?: boolean;
    actorId?: boolean;
    action?: boolean;
    at?: boolean;
    ipHash?: boolean;
};
export type DocumentAccessLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "documentId" | "actorId" | "action" | "at" | "ipHash", ExtArgs["result"]["documentAccessLog"]>;
export type DocumentAccessLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.KycDocumentDefaultArgs<ExtArgs>;
};
export type $DocumentAccessLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DocumentAccessLog";
    objects: {
        document: Prisma.$KycDocumentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        documentId: bigint;
        actorId: bigint;
        action: string;
        at: Date;
        ipHash: string | null;
    }, ExtArgs["result"]["documentAccessLog"]>;
    composites: {};
};
export type DocumentAccessLogGetPayload<S extends boolean | null | undefined | DocumentAccessLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload, S>;
export type DocumentAccessLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DocumentAccessLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DocumentAccessLogCountAggregateInputType | true;
};
export interface DocumentAccessLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DocumentAccessLog'];
        meta: {
            name: 'DocumentAccessLog';
        };
    };
    findUnique<T extends DocumentAccessLogFindUniqueArgs>(args: Prisma.SelectSubset<T, DocumentAccessLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DocumentAccessLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DocumentAccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DocumentAccessLogFindFirstArgs>(args?: Prisma.SelectSubset<T, DocumentAccessLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DocumentAccessLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DocumentAccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DocumentAccessLogFindManyArgs>(args?: Prisma.SelectSubset<T, DocumentAccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DocumentAccessLogCreateArgs>(args: Prisma.SelectSubset<T, DocumentAccessLogCreateArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DocumentAccessLogCreateManyArgs>(args?: Prisma.SelectSubset<T, DocumentAccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends DocumentAccessLogDeleteArgs>(args: Prisma.SelectSubset<T, DocumentAccessLogDeleteArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DocumentAccessLogUpdateArgs>(args: Prisma.SelectSubset<T, DocumentAccessLogUpdateArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DocumentAccessLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, DocumentAccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DocumentAccessLogUpdateManyArgs>(args: Prisma.SelectSubset<T, DocumentAccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends DocumentAccessLogUpsertArgs>(args: Prisma.SelectSubset<T, DocumentAccessLogUpsertArgs<ExtArgs>>): Prisma.Prisma__DocumentAccessLogClient<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DocumentAccessLogCountArgs>(args?: Prisma.Subset<T, DocumentAccessLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DocumentAccessLogCountAggregateOutputType> : number>;
    aggregate<T extends DocumentAccessLogAggregateArgs>(args: Prisma.Subset<T, DocumentAccessLogAggregateArgs>): Prisma.PrismaPromise<GetDocumentAccessLogAggregateType<T>>;
    groupBy<T extends DocumentAccessLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DocumentAccessLogGroupByArgs['orderBy'];
    } : {
        orderBy?: DocumentAccessLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DocumentAccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DocumentAccessLogFieldRefs;
}
export interface Prisma__DocumentAccessLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    document<T extends Prisma.KycDocumentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KycDocumentDefaultArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DocumentAccessLogFieldRefs {
    readonly id: Prisma.FieldRef<"DocumentAccessLog", 'BigInt'>;
    readonly documentId: Prisma.FieldRef<"DocumentAccessLog", 'BigInt'>;
    readonly actorId: Prisma.FieldRef<"DocumentAccessLog", 'BigInt'>;
    readonly action: Prisma.FieldRef<"DocumentAccessLog", 'String'>;
    readonly at: Prisma.FieldRef<"DocumentAccessLog", 'DateTime'>;
    readonly ipHash: Prisma.FieldRef<"DocumentAccessLog", 'String'>;
}
export type DocumentAccessLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    where: Prisma.DocumentAccessLogWhereUniqueInput;
};
export type DocumentAccessLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    where: Prisma.DocumentAccessLogWhereUniqueInput;
};
export type DocumentAccessLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    where?: Prisma.DocumentAccessLogWhereInput;
    orderBy?: Prisma.DocumentAccessLogOrderByWithRelationInput | Prisma.DocumentAccessLogOrderByWithRelationInput[];
    cursor?: Prisma.DocumentAccessLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentAccessLogScalarFieldEnum | Prisma.DocumentAccessLogScalarFieldEnum[];
};
export type DocumentAccessLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    where?: Prisma.DocumentAccessLogWhereInput;
    orderBy?: Prisma.DocumentAccessLogOrderByWithRelationInput | Prisma.DocumentAccessLogOrderByWithRelationInput[];
    cursor?: Prisma.DocumentAccessLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentAccessLogScalarFieldEnum | Prisma.DocumentAccessLogScalarFieldEnum[];
};
export type DocumentAccessLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    where?: Prisma.DocumentAccessLogWhereInput;
    orderBy?: Prisma.DocumentAccessLogOrderByWithRelationInput | Prisma.DocumentAccessLogOrderByWithRelationInput[];
    cursor?: Prisma.DocumentAccessLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentAccessLogScalarFieldEnum | Prisma.DocumentAccessLogScalarFieldEnum[];
};
export type DocumentAccessLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocumentAccessLogCreateInput, Prisma.DocumentAccessLogUncheckedCreateInput>;
};
export type DocumentAccessLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DocumentAccessLogCreateManyInput | Prisma.DocumentAccessLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DocumentAccessLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocumentAccessLogUpdateInput, Prisma.DocumentAccessLogUncheckedUpdateInput>;
    where: Prisma.DocumentAccessLogWhereUniqueInput;
};
export type DocumentAccessLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DocumentAccessLogUpdateManyMutationInput, Prisma.DocumentAccessLogUncheckedUpdateManyInput>;
    where?: Prisma.DocumentAccessLogWhereInput;
    limit?: number;
};
export type DocumentAccessLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    where: Prisma.DocumentAccessLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocumentAccessLogCreateInput, Prisma.DocumentAccessLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DocumentAccessLogUpdateInput, Prisma.DocumentAccessLogUncheckedUpdateInput>;
};
export type DocumentAccessLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
    where: Prisma.DocumentAccessLogWhereUniqueInput;
};
export type DocumentAccessLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentAccessLogWhereInput;
    limit?: number;
};
export type DocumentAccessLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.DocumentAccessLogOmit<ExtArgs> | null;
    include?: Prisma.DocumentAccessLogInclude<ExtArgs> | null;
};
