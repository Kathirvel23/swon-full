import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type KycDocumentModel = runtime.Types.Result.DefaultSelection<Prisma.$KycDocumentPayload>;
export type AggregateKycDocument = {
    _count: KycDocumentCountAggregateOutputType | null;
    _avg: KycDocumentAvgAggregateOutputType | null;
    _sum: KycDocumentSumAggregateOutputType | null;
    _min: KycDocumentMinAggregateOutputType | null;
    _max: KycDocumentMaxAggregateOutputType | null;
};
export type KycDocumentAvgAggregateOutputType = {
    id: number | null;
    submissionId: number | null;
    sizeBytes: number | null;
};
export type KycDocumentSumAggregateOutputType = {
    id: bigint | null;
    submissionId: bigint | null;
    sizeBytes: number | null;
};
export type KycDocumentMinAggregateOutputType = {
    id: bigint | null;
    submissionId: bigint | null;
    docType: string | null;
    storageKey: string | null;
    contentSha: string | null;
    mime: string | null;
    sizeBytes: number | null;
    createdAt: Date | null;
};
export type KycDocumentMaxAggregateOutputType = {
    id: bigint | null;
    submissionId: bigint | null;
    docType: string | null;
    storageKey: string | null;
    contentSha: string | null;
    mime: string | null;
    sizeBytes: number | null;
    createdAt: Date | null;
};
export type KycDocumentCountAggregateOutputType = {
    id: number;
    submissionId: number;
    docType: number;
    storageKey: number;
    contentSha: number;
    mime: number;
    sizeBytes: number;
    createdAt: number;
    _all: number;
};
export type KycDocumentAvgAggregateInputType = {
    id?: true;
    submissionId?: true;
    sizeBytes?: true;
};
export type KycDocumentSumAggregateInputType = {
    id?: true;
    submissionId?: true;
    sizeBytes?: true;
};
export type KycDocumentMinAggregateInputType = {
    id?: true;
    submissionId?: true;
    docType?: true;
    storageKey?: true;
    contentSha?: true;
    mime?: true;
    sizeBytes?: true;
    createdAt?: true;
};
export type KycDocumentMaxAggregateInputType = {
    id?: true;
    submissionId?: true;
    docType?: true;
    storageKey?: true;
    contentSha?: true;
    mime?: true;
    sizeBytes?: true;
    createdAt?: true;
};
export type KycDocumentCountAggregateInputType = {
    id?: true;
    submissionId?: true;
    docType?: true;
    storageKey?: true;
    contentSha?: true;
    mime?: true;
    sizeBytes?: true;
    createdAt?: true;
    _all?: true;
};
export type KycDocumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycDocumentWhereInput;
    orderBy?: Prisma.KycDocumentOrderByWithRelationInput | Prisma.KycDocumentOrderByWithRelationInput[];
    cursor?: Prisma.KycDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | KycDocumentCountAggregateInputType;
    _avg?: KycDocumentAvgAggregateInputType;
    _sum?: KycDocumentSumAggregateInputType;
    _min?: KycDocumentMinAggregateInputType;
    _max?: KycDocumentMaxAggregateInputType;
};
export type GetKycDocumentAggregateType<T extends KycDocumentAggregateArgs> = {
    [P in keyof T & keyof AggregateKycDocument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKycDocument[P]> : Prisma.GetScalarType<T[P], AggregateKycDocument[P]>;
};
export type KycDocumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycDocumentWhereInput;
    orderBy?: Prisma.KycDocumentOrderByWithAggregationInput | Prisma.KycDocumentOrderByWithAggregationInput[];
    by: Prisma.KycDocumentScalarFieldEnum[] | Prisma.KycDocumentScalarFieldEnum;
    having?: Prisma.KycDocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KycDocumentCountAggregateInputType | true;
    _avg?: KycDocumentAvgAggregateInputType;
    _sum?: KycDocumentSumAggregateInputType;
    _min?: KycDocumentMinAggregateInputType;
    _max?: KycDocumentMaxAggregateInputType;
};
export type KycDocumentGroupByOutputType = {
    id: bigint;
    submissionId: bigint;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt: Date;
    _count: KycDocumentCountAggregateOutputType | null;
    _avg: KycDocumentAvgAggregateOutputType | null;
    _sum: KycDocumentSumAggregateOutputType | null;
    _min: KycDocumentMinAggregateOutputType | null;
    _max: KycDocumentMaxAggregateOutputType | null;
};
export type GetKycDocumentGroupByPayload<T extends KycDocumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KycDocumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KycDocumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KycDocumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KycDocumentGroupByOutputType[P]>;
}>>;
export type KycDocumentWhereInput = {
    AND?: Prisma.KycDocumentWhereInput | Prisma.KycDocumentWhereInput[];
    OR?: Prisma.KycDocumentWhereInput[];
    NOT?: Prisma.KycDocumentWhereInput | Prisma.KycDocumentWhereInput[];
    id?: Prisma.BigIntFilter<"KycDocument"> | bigint | number;
    submissionId?: Prisma.BigIntFilter<"KycDocument"> | bigint | number;
    docType?: Prisma.StringFilter<"KycDocument"> | string;
    storageKey?: Prisma.StringFilter<"KycDocument"> | string;
    contentSha?: Prisma.StringFilter<"KycDocument"> | string;
    mime?: Prisma.StringFilter<"KycDocument"> | string;
    sizeBytes?: Prisma.IntFilter<"KycDocument"> | number;
    createdAt?: Prisma.DateTimeFilter<"KycDocument"> | Date | string;
    submission?: Prisma.XOR<Prisma.KycSubmissionScalarRelationFilter, Prisma.KycSubmissionWhereInput>;
    accessLogs?: Prisma.DocumentAccessLogListRelationFilter;
};
export type KycDocumentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    contentSha?: Prisma.SortOrder;
    mime?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    submission?: Prisma.KycSubmissionOrderByWithRelationInput;
    accessLogs?: Prisma.DocumentAccessLogOrderByRelationAggregateInput;
    _relevance?: Prisma.KycDocumentOrderByRelevanceInput;
};
export type KycDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.KycDocumentWhereInput | Prisma.KycDocumentWhereInput[];
    OR?: Prisma.KycDocumentWhereInput[];
    NOT?: Prisma.KycDocumentWhereInput | Prisma.KycDocumentWhereInput[];
    submissionId?: Prisma.BigIntFilter<"KycDocument"> | bigint | number;
    docType?: Prisma.StringFilter<"KycDocument"> | string;
    storageKey?: Prisma.StringFilter<"KycDocument"> | string;
    contentSha?: Prisma.StringFilter<"KycDocument"> | string;
    mime?: Prisma.StringFilter<"KycDocument"> | string;
    sizeBytes?: Prisma.IntFilter<"KycDocument"> | number;
    createdAt?: Prisma.DateTimeFilter<"KycDocument"> | Date | string;
    submission?: Prisma.XOR<Prisma.KycSubmissionScalarRelationFilter, Prisma.KycSubmissionWhereInput>;
    accessLogs?: Prisma.DocumentAccessLogListRelationFilter;
}, "id">;
export type KycDocumentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    contentSha?: Prisma.SortOrder;
    mime?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.KycDocumentCountOrderByAggregateInput;
    _avg?: Prisma.KycDocumentAvgOrderByAggregateInput;
    _max?: Prisma.KycDocumentMaxOrderByAggregateInput;
    _min?: Prisma.KycDocumentMinOrderByAggregateInput;
    _sum?: Prisma.KycDocumentSumOrderByAggregateInput;
};
export type KycDocumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.KycDocumentScalarWhereWithAggregatesInput | Prisma.KycDocumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.KycDocumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KycDocumentScalarWhereWithAggregatesInput | Prisma.KycDocumentScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"KycDocument"> | bigint | number;
    submissionId?: Prisma.BigIntWithAggregatesFilter<"KycDocument"> | bigint | number;
    docType?: Prisma.StringWithAggregatesFilter<"KycDocument"> | string;
    storageKey?: Prisma.StringWithAggregatesFilter<"KycDocument"> | string;
    contentSha?: Prisma.StringWithAggregatesFilter<"KycDocument"> | string;
    mime?: Prisma.StringWithAggregatesFilter<"KycDocument"> | string;
    sizeBytes?: Prisma.IntWithAggregatesFilter<"KycDocument"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"KycDocument"> | Date | string;
};
export type KycDocumentCreateInput = {
    id?: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
    submission: Prisma.KycSubmissionCreateNestedOneWithoutDocumentsInput;
    accessLogs?: Prisma.DocumentAccessLogCreateNestedManyWithoutDocumentInput;
};
export type KycDocumentUncheckedCreateInput = {
    id?: bigint | number;
    submissionId: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
    accessLogs?: Prisma.DocumentAccessLogUncheckedCreateNestedManyWithoutDocumentInput;
};
export type KycDocumentUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submission?: Prisma.KycSubmissionUpdateOneRequiredWithoutDocumentsNestedInput;
    accessLogs?: Prisma.DocumentAccessLogUpdateManyWithoutDocumentNestedInput;
};
export type KycDocumentUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    submissionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accessLogs?: Prisma.DocumentAccessLogUncheckedUpdateManyWithoutDocumentNestedInput;
};
export type KycDocumentCreateManyInput = {
    id?: bigint | number;
    submissionId: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
};
export type KycDocumentUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycDocumentUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    submissionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycDocumentListRelationFilter = {
    every?: Prisma.KycDocumentWhereInput;
    some?: Prisma.KycDocumentWhereInput;
    none?: Prisma.KycDocumentWhereInput;
};
export type KycDocumentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type KycDocumentOrderByRelevanceInput = {
    fields: Prisma.KycDocumentOrderByRelevanceFieldEnum | Prisma.KycDocumentOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type KycDocumentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    contentSha?: Prisma.SortOrder;
    mime?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KycDocumentAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
};
export type KycDocumentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    contentSha?: Prisma.SortOrder;
    mime?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KycDocumentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    contentSha?: Prisma.SortOrder;
    mime?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KycDocumentSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    submissionId?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
};
export type KycDocumentScalarRelationFilter = {
    is?: Prisma.KycDocumentWhereInput;
    isNot?: Prisma.KycDocumentWhereInput;
};
export type KycDocumentCreateNestedManyWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.KycDocumentCreateWithoutSubmissionInput, Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput> | Prisma.KycDocumentCreateWithoutSubmissionInput[] | Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput | Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput[];
    createMany?: Prisma.KycDocumentCreateManySubmissionInputEnvelope;
    connect?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
};
export type KycDocumentUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: Prisma.XOR<Prisma.KycDocumentCreateWithoutSubmissionInput, Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput> | Prisma.KycDocumentCreateWithoutSubmissionInput[] | Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput | Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput[];
    createMany?: Prisma.KycDocumentCreateManySubmissionInputEnvelope;
    connect?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
};
export type KycDocumentUpdateManyWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.KycDocumentCreateWithoutSubmissionInput, Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput> | Prisma.KycDocumentCreateWithoutSubmissionInput[] | Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput | Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput[];
    upsert?: Prisma.KycDocumentUpsertWithWhereUniqueWithoutSubmissionInput | Prisma.KycDocumentUpsertWithWhereUniqueWithoutSubmissionInput[];
    createMany?: Prisma.KycDocumentCreateManySubmissionInputEnvelope;
    set?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    disconnect?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    delete?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    connect?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    update?: Prisma.KycDocumentUpdateWithWhereUniqueWithoutSubmissionInput | Prisma.KycDocumentUpdateWithWhereUniqueWithoutSubmissionInput[];
    updateMany?: Prisma.KycDocumentUpdateManyWithWhereWithoutSubmissionInput | Prisma.KycDocumentUpdateManyWithWhereWithoutSubmissionInput[];
    deleteMany?: Prisma.KycDocumentScalarWhereInput | Prisma.KycDocumentScalarWhereInput[];
};
export type KycDocumentUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: Prisma.XOR<Prisma.KycDocumentCreateWithoutSubmissionInput, Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput> | Prisma.KycDocumentCreateWithoutSubmissionInput[] | Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput[];
    connectOrCreate?: Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput | Prisma.KycDocumentCreateOrConnectWithoutSubmissionInput[];
    upsert?: Prisma.KycDocumentUpsertWithWhereUniqueWithoutSubmissionInput | Prisma.KycDocumentUpsertWithWhereUniqueWithoutSubmissionInput[];
    createMany?: Prisma.KycDocumentCreateManySubmissionInputEnvelope;
    set?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    disconnect?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    delete?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    connect?: Prisma.KycDocumentWhereUniqueInput | Prisma.KycDocumentWhereUniqueInput[];
    update?: Prisma.KycDocumentUpdateWithWhereUniqueWithoutSubmissionInput | Prisma.KycDocumentUpdateWithWhereUniqueWithoutSubmissionInput[];
    updateMany?: Prisma.KycDocumentUpdateManyWithWhereWithoutSubmissionInput | Prisma.KycDocumentUpdateManyWithWhereWithoutSubmissionInput[];
    deleteMany?: Prisma.KycDocumentScalarWhereInput | Prisma.KycDocumentScalarWhereInput[];
};
export type KycDocumentCreateNestedOneWithoutAccessLogsInput = {
    create?: Prisma.XOR<Prisma.KycDocumentCreateWithoutAccessLogsInput, Prisma.KycDocumentUncheckedCreateWithoutAccessLogsInput>;
    connectOrCreate?: Prisma.KycDocumentCreateOrConnectWithoutAccessLogsInput;
    connect?: Prisma.KycDocumentWhereUniqueInput;
};
export type KycDocumentUpdateOneRequiredWithoutAccessLogsNestedInput = {
    create?: Prisma.XOR<Prisma.KycDocumentCreateWithoutAccessLogsInput, Prisma.KycDocumentUncheckedCreateWithoutAccessLogsInput>;
    connectOrCreate?: Prisma.KycDocumentCreateOrConnectWithoutAccessLogsInput;
    upsert?: Prisma.KycDocumentUpsertWithoutAccessLogsInput;
    connect?: Prisma.KycDocumentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KycDocumentUpdateToOneWithWhereWithoutAccessLogsInput, Prisma.KycDocumentUpdateWithoutAccessLogsInput>, Prisma.KycDocumentUncheckedUpdateWithoutAccessLogsInput>;
};
export type KycDocumentCreateWithoutSubmissionInput = {
    id?: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
    accessLogs?: Prisma.DocumentAccessLogCreateNestedManyWithoutDocumentInput;
};
export type KycDocumentUncheckedCreateWithoutSubmissionInput = {
    id?: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
    accessLogs?: Prisma.DocumentAccessLogUncheckedCreateNestedManyWithoutDocumentInput;
};
export type KycDocumentCreateOrConnectWithoutSubmissionInput = {
    where: Prisma.KycDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycDocumentCreateWithoutSubmissionInput, Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput>;
};
export type KycDocumentCreateManySubmissionInputEnvelope = {
    data: Prisma.KycDocumentCreateManySubmissionInput | Prisma.KycDocumentCreateManySubmissionInput[];
    skipDuplicates?: boolean;
};
export type KycDocumentUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: Prisma.KycDocumentWhereUniqueInput;
    update: Prisma.XOR<Prisma.KycDocumentUpdateWithoutSubmissionInput, Prisma.KycDocumentUncheckedUpdateWithoutSubmissionInput>;
    create: Prisma.XOR<Prisma.KycDocumentCreateWithoutSubmissionInput, Prisma.KycDocumentUncheckedCreateWithoutSubmissionInput>;
};
export type KycDocumentUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: Prisma.KycDocumentWhereUniqueInput;
    data: Prisma.XOR<Prisma.KycDocumentUpdateWithoutSubmissionInput, Prisma.KycDocumentUncheckedUpdateWithoutSubmissionInput>;
};
export type KycDocumentUpdateManyWithWhereWithoutSubmissionInput = {
    where: Prisma.KycDocumentScalarWhereInput;
    data: Prisma.XOR<Prisma.KycDocumentUpdateManyMutationInput, Prisma.KycDocumentUncheckedUpdateManyWithoutSubmissionInput>;
};
export type KycDocumentScalarWhereInput = {
    AND?: Prisma.KycDocumentScalarWhereInput | Prisma.KycDocumentScalarWhereInput[];
    OR?: Prisma.KycDocumentScalarWhereInput[];
    NOT?: Prisma.KycDocumentScalarWhereInput | Prisma.KycDocumentScalarWhereInput[];
    id?: Prisma.BigIntFilter<"KycDocument"> | bigint | number;
    submissionId?: Prisma.BigIntFilter<"KycDocument"> | bigint | number;
    docType?: Prisma.StringFilter<"KycDocument"> | string;
    storageKey?: Prisma.StringFilter<"KycDocument"> | string;
    contentSha?: Prisma.StringFilter<"KycDocument"> | string;
    mime?: Prisma.StringFilter<"KycDocument"> | string;
    sizeBytes?: Prisma.IntFilter<"KycDocument"> | number;
    createdAt?: Prisma.DateTimeFilter<"KycDocument"> | Date | string;
};
export type KycDocumentCreateWithoutAccessLogsInput = {
    id?: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
    submission: Prisma.KycSubmissionCreateNestedOneWithoutDocumentsInput;
};
export type KycDocumentUncheckedCreateWithoutAccessLogsInput = {
    id?: bigint | number;
    submissionId: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
};
export type KycDocumentCreateOrConnectWithoutAccessLogsInput = {
    where: Prisma.KycDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycDocumentCreateWithoutAccessLogsInput, Prisma.KycDocumentUncheckedCreateWithoutAccessLogsInput>;
};
export type KycDocumentUpsertWithoutAccessLogsInput = {
    update: Prisma.XOR<Prisma.KycDocumentUpdateWithoutAccessLogsInput, Prisma.KycDocumentUncheckedUpdateWithoutAccessLogsInput>;
    create: Prisma.XOR<Prisma.KycDocumentCreateWithoutAccessLogsInput, Prisma.KycDocumentUncheckedCreateWithoutAccessLogsInput>;
    where?: Prisma.KycDocumentWhereInput;
};
export type KycDocumentUpdateToOneWithWhereWithoutAccessLogsInput = {
    where?: Prisma.KycDocumentWhereInput;
    data: Prisma.XOR<Prisma.KycDocumentUpdateWithoutAccessLogsInput, Prisma.KycDocumentUncheckedUpdateWithoutAccessLogsInput>;
};
export type KycDocumentUpdateWithoutAccessLogsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submission?: Prisma.KycSubmissionUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type KycDocumentUncheckedUpdateWithoutAccessLogsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    submissionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycDocumentCreateManySubmissionInput = {
    id?: bigint | number;
    docType: string;
    storageKey: string;
    contentSha: string;
    mime: string;
    sizeBytes: number;
    createdAt?: Date | string;
};
export type KycDocumentUpdateWithoutSubmissionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accessLogs?: Prisma.DocumentAccessLogUpdateManyWithoutDocumentNestedInput;
};
export type KycDocumentUncheckedUpdateWithoutSubmissionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accessLogs?: Prisma.DocumentAccessLogUncheckedUpdateManyWithoutDocumentNestedInput;
};
export type KycDocumentUncheckedUpdateManyWithoutSubmissionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    contentSha?: Prisma.StringFieldUpdateOperationsInput | string;
    mime?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycDocumentCountOutputType = {
    accessLogs: number;
};
export type KycDocumentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    accessLogs?: boolean | KycDocumentCountOutputTypeCountAccessLogsArgs;
};
export type KycDocumentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentCountOutputTypeSelect<ExtArgs> | null;
};
export type KycDocumentCountOutputTypeCountAccessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentAccessLogWhereInput;
};
export type KycDocumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    submissionId?: boolean;
    docType?: boolean;
    storageKey?: boolean;
    contentSha?: boolean;
    mime?: boolean;
    sizeBytes?: boolean;
    createdAt?: boolean;
    submission?: boolean | Prisma.KycSubmissionDefaultArgs<ExtArgs>;
    accessLogs?: boolean | Prisma.KycDocument$accessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.KycDocumentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["kycDocument"]>;
export type KycDocumentSelectScalar = {
    id?: boolean;
    submissionId?: boolean;
    docType?: boolean;
    storageKey?: boolean;
    contentSha?: boolean;
    mime?: boolean;
    sizeBytes?: boolean;
    createdAt?: boolean;
};
export type KycDocumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "submissionId" | "docType" | "storageKey" | "contentSha" | "mime" | "sizeBytes" | "createdAt", ExtArgs["result"]["kycDocument"]>;
export type KycDocumentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    submission?: boolean | Prisma.KycSubmissionDefaultArgs<ExtArgs>;
    accessLogs?: boolean | Prisma.KycDocument$accessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.KycDocumentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $KycDocumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KycDocument";
    objects: {
        submission: Prisma.$KycSubmissionPayload<ExtArgs>;
        accessLogs: Prisma.$DocumentAccessLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        submissionId: bigint;
        docType: string;
        storageKey: string;
        contentSha: string;
        mime: string;
        sizeBytes: number;
        createdAt: Date;
    }, ExtArgs["result"]["kycDocument"]>;
    composites: {};
};
export type KycDocumentGetPayload<S extends boolean | null | undefined | KycDocumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload, S>;
export type KycDocumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KycDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KycDocumentCountAggregateInputType | true;
};
export interface KycDocumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KycDocument'];
        meta: {
            name: 'KycDocument';
        };
    };
    findUnique<T extends KycDocumentFindUniqueArgs>(args: Prisma.SelectSubset<T, KycDocumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends KycDocumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KycDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends KycDocumentFindFirstArgs>(args?: Prisma.SelectSubset<T, KycDocumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends KycDocumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KycDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends KycDocumentFindManyArgs>(args?: Prisma.SelectSubset<T, KycDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends KycDocumentCreateArgs>(args: Prisma.SelectSubset<T, KycDocumentCreateArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends KycDocumentCreateManyArgs>(args?: Prisma.SelectSubset<T, KycDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends KycDocumentDeleteArgs>(args: Prisma.SelectSubset<T, KycDocumentDeleteArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends KycDocumentUpdateArgs>(args: Prisma.SelectSubset<T, KycDocumentUpdateArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends KycDocumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, KycDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends KycDocumentUpdateManyArgs>(args: Prisma.SelectSubset<T, KycDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends KycDocumentUpsertArgs>(args: Prisma.SelectSubset<T, KycDocumentUpsertArgs<ExtArgs>>): Prisma.Prisma__KycDocumentClient<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends KycDocumentCountArgs>(args?: Prisma.Subset<T, KycDocumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KycDocumentCountAggregateOutputType> : number>;
    aggregate<T extends KycDocumentAggregateArgs>(args: Prisma.Subset<T, KycDocumentAggregateArgs>): Prisma.PrismaPromise<GetKycDocumentAggregateType<T>>;
    groupBy<T extends KycDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KycDocumentGroupByArgs['orderBy'];
    } : {
        orderBy?: KycDocumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KycDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKycDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: KycDocumentFieldRefs;
}
export interface Prisma__KycDocumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    submission<T extends Prisma.KycSubmissionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KycSubmissionDefaultArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    accessLogs<T extends Prisma.KycDocument$accessLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KycDocument$accessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface KycDocumentFieldRefs {
    readonly id: Prisma.FieldRef<"KycDocument", 'BigInt'>;
    readonly submissionId: Prisma.FieldRef<"KycDocument", 'BigInt'>;
    readonly docType: Prisma.FieldRef<"KycDocument", 'String'>;
    readonly storageKey: Prisma.FieldRef<"KycDocument", 'String'>;
    readonly contentSha: Prisma.FieldRef<"KycDocument", 'String'>;
    readonly mime: Prisma.FieldRef<"KycDocument", 'String'>;
    readonly sizeBytes: Prisma.FieldRef<"KycDocument", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"KycDocument", 'DateTime'>;
}
export type KycDocumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    where: Prisma.KycDocumentWhereUniqueInput;
};
export type KycDocumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    where: Prisma.KycDocumentWhereUniqueInput;
};
export type KycDocumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    where?: Prisma.KycDocumentWhereInput;
    orderBy?: Prisma.KycDocumentOrderByWithRelationInput | Prisma.KycDocumentOrderByWithRelationInput[];
    cursor?: Prisma.KycDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycDocumentScalarFieldEnum | Prisma.KycDocumentScalarFieldEnum[];
};
export type KycDocumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    where?: Prisma.KycDocumentWhereInput;
    orderBy?: Prisma.KycDocumentOrderByWithRelationInput | Prisma.KycDocumentOrderByWithRelationInput[];
    cursor?: Prisma.KycDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycDocumentScalarFieldEnum | Prisma.KycDocumentScalarFieldEnum[];
};
export type KycDocumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    where?: Prisma.KycDocumentWhereInput;
    orderBy?: Prisma.KycDocumentOrderByWithRelationInput | Prisma.KycDocumentOrderByWithRelationInput[];
    cursor?: Prisma.KycDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycDocumentScalarFieldEnum | Prisma.KycDocumentScalarFieldEnum[];
};
export type KycDocumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycDocumentCreateInput, Prisma.KycDocumentUncheckedCreateInput>;
};
export type KycDocumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.KycDocumentCreateManyInput | Prisma.KycDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type KycDocumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycDocumentUpdateInput, Prisma.KycDocumentUncheckedUpdateInput>;
    where: Prisma.KycDocumentWhereUniqueInput;
};
export type KycDocumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.KycDocumentUpdateManyMutationInput, Prisma.KycDocumentUncheckedUpdateManyInput>;
    where?: Prisma.KycDocumentWhereInput;
    limit?: number;
};
export type KycDocumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    where: Prisma.KycDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycDocumentCreateInput, Prisma.KycDocumentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.KycDocumentUpdateInput, Prisma.KycDocumentUncheckedUpdateInput>;
};
export type KycDocumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
    where: Prisma.KycDocumentWhereUniqueInput;
};
export type KycDocumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycDocumentWhereInput;
    limit?: number;
};
export type KycDocument$accessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type KycDocumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycDocumentSelect<ExtArgs> | null;
    omit?: Prisma.KycDocumentOmit<ExtArgs> | null;
    include?: Prisma.KycDocumentInclude<ExtArgs> | null;
};
