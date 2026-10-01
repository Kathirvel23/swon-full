import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SessionModel = runtime.Types.Result.DefaultSelection<Prisma.$SessionPayload>;
export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _avg: SessionAvgAggregateOutputType | null;
    _sum: SessionSumAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
};
export type SessionAvgAggregateOutputType = {
    id: number | null;
    accountId: number | null;
};
export type SessionSumAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
};
export type SessionMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    accountId: bigint | null;
    refreshTokenHash: string | null;
    familyId: string | null;
    userAgent: string | null;
    ipHash: string | null;
    issuedAt: Date | null;
    expiresAt: Date | null;
    revokedAt: Date | null;
    lastUsedAt: Date | null;
};
export type SessionMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    accountId: bigint | null;
    refreshTokenHash: string | null;
    familyId: string | null;
    userAgent: string | null;
    ipHash: string | null;
    issuedAt: Date | null;
    expiresAt: Date | null;
    revokedAt: Date | null;
    lastUsedAt: Date | null;
};
export type SessionCountAggregateOutputType = {
    id: number;
    publicId: number;
    accountId: number;
    refreshTokenHash: number;
    familyId: number;
    userAgent: number;
    ipHash: number;
    issuedAt: number;
    expiresAt: number;
    revokedAt: number;
    lastUsedAt: number;
    _all: number;
};
export type SessionAvgAggregateInputType = {
    id?: true;
    accountId?: true;
};
export type SessionSumAggregateInputType = {
    id?: true;
    accountId?: true;
};
export type SessionMinAggregateInputType = {
    id?: true;
    publicId?: true;
    accountId?: true;
    refreshTokenHash?: true;
    familyId?: true;
    userAgent?: true;
    ipHash?: true;
    issuedAt?: true;
    expiresAt?: true;
    revokedAt?: true;
    lastUsedAt?: true;
};
export type SessionMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    accountId?: true;
    refreshTokenHash?: true;
    familyId?: true;
    userAgent?: true;
    ipHash?: true;
    issuedAt?: true;
    expiresAt?: true;
    revokedAt?: true;
    lastUsedAt?: true;
};
export type SessionCountAggregateInputType = {
    id?: true;
    publicId?: true;
    accountId?: true;
    refreshTokenHash?: true;
    familyId?: true;
    userAgent?: true;
    ipHash?: true;
    issuedAt?: true;
    expiresAt?: true;
    revokedAt?: true;
    lastUsedAt?: true;
    _all?: true;
};
export type SessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SessionCountAggregateInputType;
    _avg?: SessionAvgAggregateInputType;
    _sum?: SessionSumAggregateInputType;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
};
export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSession[P]> : Prisma.GetScalarType<T[P], AggregateSession[P]>;
};
export type SessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithAggregationInput | Prisma.SessionOrderByWithAggregationInput[];
    by: Prisma.SessionScalarFieldEnum[] | Prisma.SessionScalarFieldEnum;
    having?: Prisma.SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _avg?: SessionAvgAggregateInputType;
    _sum?: SessionSumAggregateInputType;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
};
export type SessionGroupByOutputType = {
    id: bigint;
    publicId: string;
    accountId: bigint;
    refreshTokenHash: string;
    familyId: string;
    userAgent: string | null;
    ipHash: string | null;
    issuedAt: Date;
    expiresAt: Date;
    revokedAt: Date | null;
    lastUsedAt: Date | null;
    _count: SessionCountAggregateOutputType | null;
    _avg: SessionAvgAggregateOutputType | null;
    _sum: SessionSumAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
};
export type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SessionGroupByOutputType[P]>;
}>>;
export type SessionWhereInput = {
    AND?: Prisma.SessionWhereInput | Prisma.SessionWhereInput[];
    OR?: Prisma.SessionWhereInput[];
    NOT?: Prisma.SessionWhereInput | Prisma.SessionWhereInput[];
    id?: Prisma.BigIntFilter<"Session"> | bigint | number;
    publicId?: Prisma.StringFilter<"Session"> | string;
    accountId?: Prisma.BigIntFilter<"Session"> | bigint | number;
    refreshTokenHash?: Prisma.StringFilter<"Session"> | string;
    familyId?: Prisma.StringFilter<"Session"> | string;
    userAgent?: Prisma.StringNullableFilter<"Session"> | string | null;
    ipHash?: Prisma.StringNullableFilter<"Session"> | string | null;
    issuedAt?: Prisma.DateTimeFilter<"Session"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"Session"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableFilter<"Session"> | Date | string | null;
    lastUsedAt?: Prisma.DateTimeNullableFilter<"Session"> | Date | string | null;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
};
export type SessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    familyId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    _relevance?: Prisma.SessionOrderByRelevanceInput;
};
export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    refreshTokenHash?: string;
    AND?: Prisma.SessionWhereInput | Prisma.SessionWhereInput[];
    OR?: Prisma.SessionWhereInput[];
    NOT?: Prisma.SessionWhereInput | Prisma.SessionWhereInput[];
    accountId?: Prisma.BigIntFilter<"Session"> | bigint | number;
    familyId?: Prisma.StringFilter<"Session"> | string;
    userAgent?: Prisma.StringNullableFilter<"Session"> | string | null;
    ipHash?: Prisma.StringNullableFilter<"Session"> | string | null;
    issuedAt?: Prisma.DateTimeFilter<"Session"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"Session"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableFilter<"Session"> | Date | string | null;
    lastUsedAt?: Prisma.DateTimeNullableFilter<"Session"> | Date | string | null;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
}, "id" | "publicId" | "refreshTokenHash">;
export type SessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    familyId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SessionCountOrderByAggregateInput;
    _avg?: Prisma.SessionAvgOrderByAggregateInput;
    _max?: Prisma.SessionMaxOrderByAggregateInput;
    _min?: Prisma.SessionMinOrderByAggregateInput;
    _sum?: Prisma.SessionSumOrderByAggregateInput;
};
export type SessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.SessionScalarWhereWithAggregatesInput | Prisma.SessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.SessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SessionScalarWhereWithAggregatesInput | Prisma.SessionScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"Session"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"Session"> | string;
    accountId?: Prisma.BigIntWithAggregatesFilter<"Session"> | bigint | number;
    refreshTokenHash?: Prisma.StringWithAggregatesFilter<"Session"> | string;
    familyId?: Prisma.StringWithAggregatesFilter<"Session"> | string;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"Session"> | string | null;
    ipHash?: Prisma.StringNullableWithAggregatesFilter<"Session"> | string | null;
    issuedAt?: Prisma.DateTimeWithAggregatesFilter<"Session"> | Date | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"Session"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null;
    lastUsedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null;
};
export type SessionCreateInput = {
    id?: bigint | number;
    publicId?: string;
    refreshTokenHash: string;
    familyId?: string;
    userAgent?: string | null;
    ipHash?: string | null;
    issuedAt?: Date | string;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
    account: Prisma.AccountCreateNestedOneWithoutSessionsInput;
};
export type SessionUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    refreshTokenHash: string;
    familyId?: string;
    userAgent?: string | null;
    ipHash?: string | null;
    issuedAt?: Date | string;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
};
export type SessionUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshTokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    familyId?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    account?: Prisma.AccountUpdateOneRequiredWithoutSessionsNestedInput;
};
export type SessionUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    refreshTokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    familyId?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SessionCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    refreshTokenHash: string;
    familyId?: string;
    userAgent?: string | null;
    ipHash?: string | null;
    issuedAt?: Date | string;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
};
export type SessionUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshTokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    familyId?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SessionUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    refreshTokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    familyId?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SessionListRelationFilter = {
    every?: Prisma.SessionWhereInput;
    some?: Prisma.SessionWhereInput;
    none?: Prisma.SessionWhereInput;
};
export type SessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SessionOrderByRelevanceInput = {
    fields: Prisma.SessionOrderByRelevanceFieldEnum | Prisma.SessionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    familyId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrder;
};
export type SessionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
};
export type SessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    familyId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrder;
};
export type SessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    familyId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ipHash?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrder;
};
export type SessionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
};
export type SessionCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.SessionCreateWithoutAccountInput, Prisma.SessionUncheckedCreateWithoutAccountInput> | Prisma.SessionCreateWithoutAccountInput[] | Prisma.SessionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.SessionCreateOrConnectWithoutAccountInput | Prisma.SessionCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.SessionCreateManyAccountInputEnvelope;
    connect?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
};
export type SessionUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.SessionCreateWithoutAccountInput, Prisma.SessionUncheckedCreateWithoutAccountInput> | Prisma.SessionCreateWithoutAccountInput[] | Prisma.SessionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.SessionCreateOrConnectWithoutAccountInput | Prisma.SessionCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.SessionCreateManyAccountInputEnvelope;
    connect?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
};
export type SessionUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.SessionCreateWithoutAccountInput, Prisma.SessionUncheckedCreateWithoutAccountInput> | Prisma.SessionCreateWithoutAccountInput[] | Prisma.SessionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.SessionCreateOrConnectWithoutAccountInput | Prisma.SessionCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.SessionUpsertWithWhereUniqueWithoutAccountInput | Prisma.SessionUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.SessionCreateManyAccountInputEnvelope;
    set?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    disconnect?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    delete?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    connect?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    update?: Prisma.SessionUpdateWithWhereUniqueWithoutAccountInput | Prisma.SessionUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.SessionUpdateManyWithWhereWithoutAccountInput | Prisma.SessionUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.SessionScalarWhereInput | Prisma.SessionScalarWhereInput[];
};
export type SessionUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.SessionCreateWithoutAccountInput, Prisma.SessionUncheckedCreateWithoutAccountInput> | Prisma.SessionCreateWithoutAccountInput[] | Prisma.SessionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.SessionCreateOrConnectWithoutAccountInput | Prisma.SessionCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.SessionUpsertWithWhereUniqueWithoutAccountInput | Prisma.SessionUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.SessionCreateManyAccountInputEnvelope;
    set?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    disconnect?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    delete?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    connect?: Prisma.SessionWhereUniqueInput | Prisma.SessionWhereUniqueInput[];
    update?: Prisma.SessionUpdateWithWhereUniqueWithoutAccountInput | Prisma.SessionUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.SessionUpdateManyWithWhereWithoutAccountInput | Prisma.SessionUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.SessionScalarWhereInput | Prisma.SessionScalarWhereInput[];
};
export type SessionCreateWithoutAccountInput = {
    id?: bigint | number;
    publicId?: string;
    refreshTokenHash: string;
    familyId?: string;
    userAgent?: string | null;
    ipHash?: string | null;
    issuedAt?: Date | string;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
};
export type SessionUncheckedCreateWithoutAccountInput = {
    id?: bigint | number;
    publicId?: string;
    refreshTokenHash: string;
    familyId?: string;
    userAgent?: string | null;
    ipHash?: string | null;
    issuedAt?: Date | string;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
};
export type SessionCreateOrConnectWithoutAccountInput = {
    where: Prisma.SessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SessionCreateWithoutAccountInput, Prisma.SessionUncheckedCreateWithoutAccountInput>;
};
export type SessionCreateManyAccountInputEnvelope = {
    data: Prisma.SessionCreateManyAccountInput | Prisma.SessionCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type SessionUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.SessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SessionUpdateWithoutAccountInput, Prisma.SessionUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.SessionCreateWithoutAccountInput, Prisma.SessionUncheckedCreateWithoutAccountInput>;
};
export type SessionUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.SessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SessionUpdateWithoutAccountInput, Prisma.SessionUncheckedUpdateWithoutAccountInput>;
};
export type SessionUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.SessionScalarWhereInput;
    data: Prisma.XOR<Prisma.SessionUpdateManyMutationInput, Prisma.SessionUncheckedUpdateManyWithoutAccountInput>;
};
export type SessionScalarWhereInput = {
    AND?: Prisma.SessionScalarWhereInput | Prisma.SessionScalarWhereInput[];
    OR?: Prisma.SessionScalarWhereInput[];
    NOT?: Prisma.SessionScalarWhereInput | Prisma.SessionScalarWhereInput[];
    id?: Prisma.BigIntFilter<"Session"> | bigint | number;
    publicId?: Prisma.StringFilter<"Session"> | string;
    accountId?: Prisma.BigIntFilter<"Session"> | bigint | number;
    refreshTokenHash?: Prisma.StringFilter<"Session"> | string;
    familyId?: Prisma.StringFilter<"Session"> | string;
    userAgent?: Prisma.StringNullableFilter<"Session"> | string | null;
    ipHash?: Prisma.StringNullableFilter<"Session"> | string | null;
    issuedAt?: Prisma.DateTimeFilter<"Session"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"Session"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableFilter<"Session"> | Date | string | null;
    lastUsedAt?: Prisma.DateTimeNullableFilter<"Session"> | Date | string | null;
};
export type SessionCreateManyAccountInput = {
    id?: bigint | number;
    publicId?: string;
    refreshTokenHash: string;
    familyId?: string;
    userAgent?: string | null;
    ipHash?: string | null;
    issuedAt?: Date | string;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
};
export type SessionUpdateWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshTokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    familyId?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SessionUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshTokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    familyId?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SessionUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshTokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    familyId?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    accountId?: boolean;
    refreshTokenHash?: boolean;
    familyId?: boolean;
    userAgent?: boolean;
    ipHash?: boolean;
    issuedAt?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    lastUsedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["session"]>;
export type SessionSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    accountId?: boolean;
    refreshTokenHash?: boolean;
    familyId?: boolean;
    userAgent?: boolean;
    ipHash?: boolean;
    issuedAt?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    lastUsedAt?: boolean;
};
export type SessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "accountId" | "refreshTokenHash" | "familyId" | "userAgent" | "ipHash" | "issuedAt" | "expiresAt" | "revokedAt" | "lastUsedAt", ExtArgs["result"]["session"]>;
export type SessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $SessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Session";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        accountId: bigint;
        refreshTokenHash: string;
        familyId: string;
        userAgent: string | null;
        ipHash: string | null;
        issuedAt: Date;
        expiresAt: Date;
        revokedAt: Date | null;
        lastUsedAt: Date | null;
    }, ExtArgs["result"]["session"]>;
    composites: {};
};
export type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SessionPayload, S>;
export type SessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SessionCountAggregateInputType | true;
};
export interface SessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Session'];
        meta: {
            name: 'Session';
        };
    };
    findUnique<T extends SessionFindUniqueArgs>(args: Prisma.SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SessionFindFirstArgs>(args?: Prisma.SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SessionFindManyArgs>(args?: Prisma.SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SessionCreateArgs>(args: Prisma.SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SessionCreateManyArgs>(args?: Prisma.SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SessionDeleteArgs>(args: Prisma.SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SessionUpdateArgs>(args: Prisma.SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SessionUpdateManyArgs>(args: Prisma.SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SessionUpsertArgs>(args: Prisma.SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma.Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SessionCountArgs>(args?: Prisma.Subset<T, SessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SessionCountAggregateOutputType> : number>;
    aggregate<T extends SessionAggregateArgs>(args: Prisma.Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>;
    groupBy<T extends SessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SessionGroupByArgs['orderBy'];
    } : {
        orderBy?: SessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SessionFieldRefs;
}
export interface Prisma__SessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SessionFieldRefs {
    readonly id: Prisma.FieldRef<"Session", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"Session", 'String'>;
    readonly accountId: Prisma.FieldRef<"Session", 'BigInt'>;
    readonly refreshTokenHash: Prisma.FieldRef<"Session", 'String'>;
    readonly familyId: Prisma.FieldRef<"Session", 'String'>;
    readonly userAgent: Prisma.FieldRef<"Session", 'String'>;
    readonly ipHash: Prisma.FieldRef<"Session", 'String'>;
    readonly issuedAt: Prisma.FieldRef<"Session", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"Session", 'DateTime'>;
    readonly revokedAt: Prisma.FieldRef<"Session", 'DateTime'>;
    readonly lastUsedAt: Prisma.FieldRef<"Session", 'DateTime'>;
}
export type SessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where: Prisma.SessionWhereUniqueInput;
};
export type SessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where: Prisma.SessionWhereUniqueInput;
};
export type SessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionScalarFieldEnum | Prisma.SessionScalarFieldEnum[];
};
export type SessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionScalarFieldEnum | Prisma.SessionScalarFieldEnum[];
};
export type SessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionScalarFieldEnum | Prisma.SessionScalarFieldEnum[];
};
export type SessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessionCreateInput, Prisma.SessionUncheckedCreateInput>;
};
export type SessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SessionCreateManyInput | Prisma.SessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessionUpdateInput, Prisma.SessionUncheckedUpdateInput>;
    where: Prisma.SessionWhereUniqueInput;
};
export type SessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SessionUpdateManyMutationInput, Prisma.SessionUncheckedUpdateManyInput>;
    where?: Prisma.SessionWhereInput;
    limit?: number;
};
export type SessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where: Prisma.SessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SessionCreateInput, Prisma.SessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SessionUpdateInput, Prisma.SessionUncheckedUpdateInput>;
};
export type SessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where: Prisma.SessionWhereUniqueInput;
};
export type SessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionWhereInput;
    limit?: number;
};
export type SessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
};
