import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaymentTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentTransactionPayload>;
export type AggregatePaymentTransaction = {
    _count: PaymentTransactionCountAggregateOutputType | null;
    _avg: PaymentTransactionAvgAggregateOutputType | null;
    _sum: PaymentTransactionSumAggregateOutputType | null;
    _min: PaymentTransactionMinAggregateOutputType | null;
    _max: PaymentTransactionMaxAggregateOutputType | null;
};
export type PaymentTransactionAvgAggregateOutputType = {
    id: number | null;
    amountPaise: number | null;
    recordedByAccountId: number | null;
};
export type PaymentTransactionSumAggregateOutputType = {
    id: bigint | null;
    amountPaise: bigint | null;
    recordedByAccountId: bigint | null;
};
export type PaymentTransactionMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    status: string | null;
    amountPaise: bigint | null;
    currency: string | null;
    reference: string | null;
    evidenceStorageKey: string | null;
    recordedByAccountId: bigint | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type PaymentTransactionMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    status: string | null;
    amountPaise: bigint | null;
    currency: string | null;
    reference: string | null;
    evidenceStorageKey: string | null;
    recordedByAccountId: bigint | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type PaymentTransactionCountAggregateOutputType = {
    id: number;
    publicId: number;
    status: number;
    amountPaise: number;
    currency: number;
    reference: number;
    evidenceStorageKey: number;
    recordedByAccountId: number;
    paidAt: number;
    createdAt: number;
    _all: number;
};
export type PaymentTransactionAvgAggregateInputType = {
    id?: true;
    amountPaise?: true;
    recordedByAccountId?: true;
};
export type PaymentTransactionSumAggregateInputType = {
    id?: true;
    amountPaise?: true;
    recordedByAccountId?: true;
};
export type PaymentTransactionMinAggregateInputType = {
    id?: true;
    publicId?: true;
    status?: true;
    amountPaise?: true;
    currency?: true;
    reference?: true;
    evidenceStorageKey?: true;
    recordedByAccountId?: true;
    paidAt?: true;
    createdAt?: true;
};
export type PaymentTransactionMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    status?: true;
    amountPaise?: true;
    currency?: true;
    reference?: true;
    evidenceStorageKey?: true;
    recordedByAccountId?: true;
    paidAt?: true;
    createdAt?: true;
};
export type PaymentTransactionCountAggregateInputType = {
    id?: true;
    publicId?: true;
    status?: true;
    amountPaise?: true;
    currency?: true;
    reference?: true;
    evidenceStorageKey?: true;
    recordedByAccountId?: true;
    paidAt?: true;
    createdAt?: true;
    _all?: true;
};
export type PaymentTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTransactionWhereInput;
    orderBy?: Prisma.PaymentTransactionOrderByWithRelationInput | Prisma.PaymentTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentTransactionCountAggregateInputType;
    _avg?: PaymentTransactionAvgAggregateInputType;
    _sum?: PaymentTransactionSumAggregateInputType;
    _min?: PaymentTransactionMinAggregateInputType;
    _max?: PaymentTransactionMaxAggregateInputType;
};
export type GetPaymentTransactionAggregateType<T extends PaymentTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregatePaymentTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePaymentTransaction[P]> : Prisma.GetScalarType<T[P], AggregatePaymentTransaction[P]>;
};
export type PaymentTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTransactionWhereInput;
    orderBy?: Prisma.PaymentTransactionOrderByWithAggregationInput | Prisma.PaymentTransactionOrderByWithAggregationInput[];
    by: Prisma.PaymentTransactionScalarFieldEnum[] | Prisma.PaymentTransactionScalarFieldEnum;
    having?: Prisma.PaymentTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentTransactionCountAggregateInputType | true;
    _avg?: PaymentTransactionAvgAggregateInputType;
    _sum?: PaymentTransactionSumAggregateInputType;
    _min?: PaymentTransactionMinAggregateInputType;
    _max?: PaymentTransactionMaxAggregateInputType;
};
export type PaymentTransactionGroupByOutputType = {
    id: bigint;
    publicId: string;
    status: string;
    amountPaise: bigint;
    currency: string;
    reference: string;
    evidenceStorageKey: string | null;
    recordedByAccountId: bigint | null;
    paidAt: Date | null;
    createdAt: Date;
    _count: PaymentTransactionCountAggregateOutputType | null;
    _avg: PaymentTransactionAvgAggregateOutputType | null;
    _sum: PaymentTransactionSumAggregateOutputType | null;
    _min: PaymentTransactionMinAggregateOutputType | null;
    _max: PaymentTransactionMaxAggregateOutputType | null;
};
export type GetPaymentTransactionGroupByPayload<T extends PaymentTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaymentTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]>;
}>>;
export type PaymentTransactionWhereInput = {
    AND?: Prisma.PaymentTransactionWhereInput | Prisma.PaymentTransactionWhereInput[];
    OR?: Prisma.PaymentTransactionWhereInput[];
    NOT?: Prisma.PaymentTransactionWhereInput | Prisma.PaymentTransactionWhereInput[];
    id?: Prisma.BigIntFilter<"PaymentTransaction"> | bigint | number;
    publicId?: Prisma.StringFilter<"PaymentTransaction"> | string;
    status?: Prisma.StringFilter<"PaymentTransaction"> | string;
    amountPaise?: Prisma.BigIntFilter<"PaymentTransaction"> | bigint | number;
    currency?: Prisma.StringFilter<"PaymentTransaction"> | string;
    reference?: Prisma.StringFilter<"PaymentTransaction"> | string;
    evidenceStorageKey?: Prisma.StringNullableFilter<"PaymentTransaction"> | string | null;
    recordedByAccountId?: Prisma.BigIntNullableFilter<"PaymentTransaction"> | bigint | number | null;
    paidAt?: Prisma.DateTimeNullableFilter<"PaymentTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PaymentTransaction"> | Date | string;
    recorder?: Prisma.XOR<Prisma.AccountNullableScalarRelationFilter, Prisma.AccountWhereInput> | null;
    earnings?: Prisma.PaymentEarningListRelationFilter;
};
export type PaymentTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    recordedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recorder?: Prisma.AccountOrderByWithRelationInput;
    earnings?: Prisma.PaymentEarningOrderByRelationAggregateInput;
    _relevance?: Prisma.PaymentTransactionOrderByRelevanceInput;
};
export type PaymentTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    AND?: Prisma.PaymentTransactionWhereInput | Prisma.PaymentTransactionWhereInput[];
    OR?: Prisma.PaymentTransactionWhereInput[];
    NOT?: Prisma.PaymentTransactionWhereInput | Prisma.PaymentTransactionWhereInput[];
    status?: Prisma.StringFilter<"PaymentTransaction"> | string;
    amountPaise?: Prisma.BigIntFilter<"PaymentTransaction"> | bigint | number;
    currency?: Prisma.StringFilter<"PaymentTransaction"> | string;
    reference?: Prisma.StringFilter<"PaymentTransaction"> | string;
    evidenceStorageKey?: Prisma.StringNullableFilter<"PaymentTransaction"> | string | null;
    recordedByAccountId?: Prisma.BigIntNullableFilter<"PaymentTransaction"> | bigint | number | null;
    paidAt?: Prisma.DateTimeNullableFilter<"PaymentTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PaymentTransaction"> | Date | string;
    recorder?: Prisma.XOR<Prisma.AccountNullableScalarRelationFilter, Prisma.AccountWhereInput> | null;
    earnings?: Prisma.PaymentEarningListRelationFilter;
}, "id" | "publicId">;
export type PaymentTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    recordedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PaymentTransactionCountOrderByAggregateInput;
    _avg?: Prisma.PaymentTransactionAvgOrderByAggregateInput;
    _max?: Prisma.PaymentTransactionMaxOrderByAggregateInput;
    _min?: Prisma.PaymentTransactionMinOrderByAggregateInput;
    _sum?: Prisma.PaymentTransactionSumOrderByAggregateInput;
};
export type PaymentTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentTransactionScalarWhereWithAggregatesInput | Prisma.PaymentTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentTransactionScalarWhereWithAggregatesInput | Prisma.PaymentTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"PaymentTransaction"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"PaymentTransaction"> | string;
    status?: Prisma.StringWithAggregatesFilter<"PaymentTransaction"> | string;
    amountPaise?: Prisma.BigIntWithAggregatesFilter<"PaymentTransaction"> | bigint | number;
    currency?: Prisma.StringWithAggregatesFilter<"PaymentTransaction"> | string;
    reference?: Prisma.StringWithAggregatesFilter<"PaymentTransaction"> | string;
    evidenceStorageKey?: Prisma.StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null;
    recordedByAccountId?: Prisma.BigIntNullableWithAggregatesFilter<"PaymentTransaction"> | bigint | number | null;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PaymentTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PaymentTransaction"> | Date | string;
};
export type PaymentTransactionCreateInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    recorder?: Prisma.AccountCreateNestedOneWithoutPayRecordedInput;
    earnings?: Prisma.PaymentEarningCreateNestedManyWithoutTxnInput;
};
export type PaymentTransactionUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    recordedByAccountId?: bigint | number | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    earnings?: Prisma.PaymentEarningUncheckedCreateNestedManyWithoutTxnInput;
};
export type PaymentTransactionUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recorder?: Prisma.AccountUpdateOneWithoutPayRecordedNestedInput;
    earnings?: Prisma.PaymentEarningUpdateManyWithoutTxnNestedInput;
};
export type PaymentTransactionUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recordedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    earnings?: Prisma.PaymentEarningUncheckedUpdateManyWithoutTxnNestedInput;
};
export type PaymentTransactionCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    recordedByAccountId?: bigint | number | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentTransactionUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentTransactionUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recordedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentTransactionListRelationFilter = {
    every?: Prisma.PaymentTransactionWhereInput;
    some?: Prisma.PaymentTransactionWhereInput;
    none?: Prisma.PaymentTransactionWhereInput;
};
export type PaymentTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PaymentTransactionOrderByRelevanceInput = {
    fields: Prisma.PaymentTransactionOrderByRelevanceFieldEnum | Prisma.PaymentTransactionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PaymentTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrder;
    recordedByAccountId?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentTransactionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    recordedByAccountId?: Prisma.SortOrder;
};
export type PaymentTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrder;
    recordedByAccountId?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    evidenceStorageKey?: Prisma.SortOrder;
    recordedByAccountId?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentTransactionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    recordedByAccountId?: Prisma.SortOrder;
};
export type PaymentTransactionScalarRelationFilter = {
    is?: Prisma.PaymentTransactionWhereInput;
    isNot?: Prisma.PaymentTransactionWhereInput;
};
export type PaymentTransactionCreateNestedManyWithoutRecorderInput = {
    create?: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput> | Prisma.PaymentTransactionCreateWithoutRecorderInput[] | Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput | Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput[];
    createMany?: Prisma.PaymentTransactionCreateManyRecorderInputEnvelope;
    connect?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
};
export type PaymentTransactionUncheckedCreateNestedManyWithoutRecorderInput = {
    create?: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput> | Prisma.PaymentTransactionCreateWithoutRecorderInput[] | Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput | Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput[];
    createMany?: Prisma.PaymentTransactionCreateManyRecorderInputEnvelope;
    connect?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
};
export type PaymentTransactionUpdateManyWithoutRecorderNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput> | Prisma.PaymentTransactionCreateWithoutRecorderInput[] | Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput | Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput[];
    upsert?: Prisma.PaymentTransactionUpsertWithWhereUniqueWithoutRecorderInput | Prisma.PaymentTransactionUpsertWithWhereUniqueWithoutRecorderInput[];
    createMany?: Prisma.PaymentTransactionCreateManyRecorderInputEnvelope;
    set?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    disconnect?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    delete?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    connect?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    update?: Prisma.PaymentTransactionUpdateWithWhereUniqueWithoutRecorderInput | Prisma.PaymentTransactionUpdateWithWhereUniqueWithoutRecorderInput[];
    updateMany?: Prisma.PaymentTransactionUpdateManyWithWhereWithoutRecorderInput | Prisma.PaymentTransactionUpdateManyWithWhereWithoutRecorderInput[];
    deleteMany?: Prisma.PaymentTransactionScalarWhereInput | Prisma.PaymentTransactionScalarWhereInput[];
};
export type PaymentTransactionUncheckedUpdateManyWithoutRecorderNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput> | Prisma.PaymentTransactionCreateWithoutRecorderInput[] | Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput | Prisma.PaymentTransactionCreateOrConnectWithoutRecorderInput[];
    upsert?: Prisma.PaymentTransactionUpsertWithWhereUniqueWithoutRecorderInput | Prisma.PaymentTransactionUpsertWithWhereUniqueWithoutRecorderInput[];
    createMany?: Prisma.PaymentTransactionCreateManyRecorderInputEnvelope;
    set?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    disconnect?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    delete?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    connect?: Prisma.PaymentTransactionWhereUniqueInput | Prisma.PaymentTransactionWhereUniqueInput[];
    update?: Prisma.PaymentTransactionUpdateWithWhereUniqueWithoutRecorderInput | Prisma.PaymentTransactionUpdateWithWhereUniqueWithoutRecorderInput[];
    updateMany?: Prisma.PaymentTransactionUpdateManyWithWhereWithoutRecorderInput | Prisma.PaymentTransactionUpdateManyWithWhereWithoutRecorderInput[];
    deleteMany?: Prisma.PaymentTransactionScalarWhereInput | Prisma.PaymentTransactionScalarWhereInput[];
};
export type PaymentTransactionCreateNestedOneWithoutEarningsInput = {
    create?: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutEarningsInput, Prisma.PaymentTransactionUncheckedCreateWithoutEarningsInput>;
    connectOrCreate?: Prisma.PaymentTransactionCreateOrConnectWithoutEarningsInput;
    connect?: Prisma.PaymentTransactionWhereUniqueInput;
};
export type PaymentTransactionUpdateOneRequiredWithoutEarningsNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutEarningsInput, Prisma.PaymentTransactionUncheckedCreateWithoutEarningsInput>;
    connectOrCreate?: Prisma.PaymentTransactionCreateOrConnectWithoutEarningsInput;
    upsert?: Prisma.PaymentTransactionUpsertWithoutEarningsInput;
    connect?: Prisma.PaymentTransactionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaymentTransactionUpdateToOneWithWhereWithoutEarningsInput, Prisma.PaymentTransactionUpdateWithoutEarningsInput>, Prisma.PaymentTransactionUncheckedUpdateWithoutEarningsInput>;
};
export type PaymentTransactionCreateWithoutRecorderInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    earnings?: Prisma.PaymentEarningCreateNestedManyWithoutTxnInput;
};
export type PaymentTransactionUncheckedCreateWithoutRecorderInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    earnings?: Prisma.PaymentEarningUncheckedCreateNestedManyWithoutTxnInput;
};
export type PaymentTransactionCreateOrConnectWithoutRecorderInput = {
    where: Prisma.PaymentTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput>;
};
export type PaymentTransactionCreateManyRecorderInputEnvelope = {
    data: Prisma.PaymentTransactionCreateManyRecorderInput | Prisma.PaymentTransactionCreateManyRecorderInput[];
    skipDuplicates?: boolean;
};
export type PaymentTransactionUpsertWithWhereUniqueWithoutRecorderInput = {
    where: Prisma.PaymentTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentTransactionUpdateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedUpdateWithoutRecorderInput>;
    create: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedCreateWithoutRecorderInput>;
};
export type PaymentTransactionUpdateWithWhereUniqueWithoutRecorderInput = {
    where: Prisma.PaymentTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentTransactionUpdateWithoutRecorderInput, Prisma.PaymentTransactionUncheckedUpdateWithoutRecorderInput>;
};
export type PaymentTransactionUpdateManyWithWhereWithoutRecorderInput = {
    where: Prisma.PaymentTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentTransactionUpdateManyMutationInput, Prisma.PaymentTransactionUncheckedUpdateManyWithoutRecorderInput>;
};
export type PaymentTransactionScalarWhereInput = {
    AND?: Prisma.PaymentTransactionScalarWhereInput | Prisma.PaymentTransactionScalarWhereInput[];
    OR?: Prisma.PaymentTransactionScalarWhereInput[];
    NOT?: Prisma.PaymentTransactionScalarWhereInput | Prisma.PaymentTransactionScalarWhereInput[];
    id?: Prisma.BigIntFilter<"PaymentTransaction"> | bigint | number;
    publicId?: Prisma.StringFilter<"PaymentTransaction"> | string;
    status?: Prisma.StringFilter<"PaymentTransaction"> | string;
    amountPaise?: Prisma.BigIntFilter<"PaymentTransaction"> | bigint | number;
    currency?: Prisma.StringFilter<"PaymentTransaction"> | string;
    reference?: Prisma.StringFilter<"PaymentTransaction"> | string;
    evidenceStorageKey?: Prisma.StringNullableFilter<"PaymentTransaction"> | string | null;
    recordedByAccountId?: Prisma.BigIntNullableFilter<"PaymentTransaction"> | bigint | number | null;
    paidAt?: Prisma.DateTimeNullableFilter<"PaymentTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PaymentTransaction"> | Date | string;
};
export type PaymentTransactionCreateWithoutEarningsInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    recorder?: Prisma.AccountCreateNestedOneWithoutPayRecordedInput;
};
export type PaymentTransactionUncheckedCreateWithoutEarningsInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    recordedByAccountId?: bigint | number | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentTransactionCreateOrConnectWithoutEarningsInput = {
    where: Prisma.PaymentTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutEarningsInput, Prisma.PaymentTransactionUncheckedCreateWithoutEarningsInput>;
};
export type PaymentTransactionUpsertWithoutEarningsInput = {
    update: Prisma.XOR<Prisma.PaymentTransactionUpdateWithoutEarningsInput, Prisma.PaymentTransactionUncheckedUpdateWithoutEarningsInput>;
    create: Prisma.XOR<Prisma.PaymentTransactionCreateWithoutEarningsInput, Prisma.PaymentTransactionUncheckedCreateWithoutEarningsInput>;
    where?: Prisma.PaymentTransactionWhereInput;
};
export type PaymentTransactionUpdateToOneWithWhereWithoutEarningsInput = {
    where?: Prisma.PaymentTransactionWhereInput;
    data: Prisma.XOR<Prisma.PaymentTransactionUpdateWithoutEarningsInput, Prisma.PaymentTransactionUncheckedUpdateWithoutEarningsInput>;
};
export type PaymentTransactionUpdateWithoutEarningsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recorder?: Prisma.AccountUpdateOneWithoutPayRecordedNestedInput;
};
export type PaymentTransactionUncheckedUpdateWithoutEarningsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recordedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentTransactionCreateManyRecorderInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    amountPaise: bigint | number;
    currency?: string;
    reference: string;
    evidenceStorageKey?: string | null;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentTransactionUpdateWithoutRecorderInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    earnings?: Prisma.PaymentEarningUpdateManyWithoutTxnNestedInput;
};
export type PaymentTransactionUncheckedUpdateWithoutRecorderInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    earnings?: Prisma.PaymentEarningUncheckedUpdateManyWithoutTxnNestedInput;
};
export type PaymentTransactionUncheckedUpdateManyWithoutRecorderInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    evidenceStorageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentTransactionCountOutputType = {
    earnings: number;
};
export type PaymentTransactionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    earnings?: boolean | PaymentTransactionCountOutputTypeCountEarningsArgs;
};
export type PaymentTransactionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionCountOutputTypeSelect<ExtArgs> | null;
};
export type PaymentTransactionCountOutputTypeCountEarningsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentEarningWhereInput;
};
export type PaymentTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    status?: boolean;
    amountPaise?: boolean;
    currency?: boolean;
    reference?: boolean;
    evidenceStorageKey?: boolean;
    recordedByAccountId?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    recorder?: boolean | Prisma.PaymentTransaction$recorderArgs<ExtArgs>;
    earnings?: boolean | Prisma.PaymentTransaction$earningsArgs<ExtArgs>;
    _count?: boolean | Prisma.PaymentTransactionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paymentTransaction"]>;
export type PaymentTransactionSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    status?: boolean;
    amountPaise?: boolean;
    currency?: boolean;
    reference?: boolean;
    evidenceStorageKey?: boolean;
    recordedByAccountId?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
};
export type PaymentTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "status" | "amountPaise" | "currency" | "reference" | "evidenceStorageKey" | "recordedByAccountId" | "paidAt" | "createdAt", ExtArgs["result"]["paymentTransaction"]>;
export type PaymentTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recorder?: boolean | Prisma.PaymentTransaction$recorderArgs<ExtArgs>;
    earnings?: boolean | Prisma.PaymentTransaction$earningsArgs<ExtArgs>;
    _count?: boolean | Prisma.PaymentTransactionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $PaymentTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PaymentTransaction";
    objects: {
        recorder: Prisma.$AccountPayload<ExtArgs> | null;
        earnings: Prisma.$PaymentEarningPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        status: string;
        amountPaise: bigint;
        currency: string;
        reference: string;
        evidenceStorageKey: string | null;
        recordedByAccountId: bigint | null;
        paidAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["paymentTransaction"]>;
    composites: {};
};
export type PaymentTransactionGetPayload<S extends boolean | null | undefined | PaymentTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload, S>;
export type PaymentTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentTransactionCountAggregateInputType | true;
};
export interface PaymentTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PaymentTransaction'];
        meta: {
            name: 'PaymentTransaction';
        };
    };
    findUnique<T extends PaymentTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentTransactionCreateArgs>(args: Prisma.SelectSubset<T, PaymentTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PaymentTransactionDeleteArgs>(args: Prisma.SelectSubset<T, PaymentTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentTransactionUpdateArgs>(args: Prisma.SelectSubset<T, PaymentTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PaymentTransactionUpsertArgs>(args: Prisma.SelectSubset<T, PaymentTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentTransactionCountArgs>(args?: Prisma.Subset<T, PaymentTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaymentTransactionCountAggregateOutputType> : number>;
    aggregate<T extends PaymentTransactionAggregateArgs>(args: Prisma.Subset<T, PaymentTransactionAggregateArgs>): Prisma.PrismaPromise<GetPaymentTransactionAggregateType<T>>;
    groupBy<T extends PaymentTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: PaymentTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentTransactionFieldRefs;
}
export interface Prisma__PaymentTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    recorder<T extends Prisma.PaymentTransaction$recorderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaymentTransaction$recorderArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    earnings<T extends Prisma.PaymentTransaction$earningsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaymentTransaction$earningsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"PaymentTransaction", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"PaymentTransaction", 'String'>;
    readonly status: Prisma.FieldRef<"PaymentTransaction", 'String'>;
    readonly amountPaise: Prisma.FieldRef<"PaymentTransaction", 'BigInt'>;
    readonly currency: Prisma.FieldRef<"PaymentTransaction", 'String'>;
    readonly reference: Prisma.FieldRef<"PaymentTransaction", 'String'>;
    readonly evidenceStorageKey: Prisma.FieldRef<"PaymentTransaction", 'String'>;
    readonly recordedByAccountId: Prisma.FieldRef<"PaymentTransaction", 'BigInt'>;
    readonly paidAt: Prisma.FieldRef<"PaymentTransaction", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PaymentTransaction", 'DateTime'>;
}
export type PaymentTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where: Prisma.PaymentTransactionWhereUniqueInput;
};
export type PaymentTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where: Prisma.PaymentTransactionWhereUniqueInput;
};
export type PaymentTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where?: Prisma.PaymentTransactionWhereInput;
    orderBy?: Prisma.PaymentTransactionOrderByWithRelationInput | Prisma.PaymentTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentTransactionScalarFieldEnum | Prisma.PaymentTransactionScalarFieldEnum[];
};
export type PaymentTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where?: Prisma.PaymentTransactionWhereInput;
    orderBy?: Prisma.PaymentTransactionOrderByWithRelationInput | Prisma.PaymentTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentTransactionScalarFieldEnum | Prisma.PaymentTransactionScalarFieldEnum[];
};
export type PaymentTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where?: Prisma.PaymentTransactionWhereInput;
    orderBy?: Prisma.PaymentTransactionOrderByWithRelationInput | Prisma.PaymentTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentTransactionScalarFieldEnum | Prisma.PaymentTransactionScalarFieldEnum[];
};
export type PaymentTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentTransactionCreateInput, Prisma.PaymentTransactionUncheckedCreateInput>;
};
export type PaymentTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentTransactionCreateManyInput | Prisma.PaymentTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentTransactionUpdateInput, Prisma.PaymentTransactionUncheckedUpdateInput>;
    where: Prisma.PaymentTransactionWhereUniqueInput;
};
export type PaymentTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentTransactionUpdateManyMutationInput, Prisma.PaymentTransactionUncheckedUpdateManyInput>;
    where?: Prisma.PaymentTransactionWhereInput;
    limit?: number;
};
export type PaymentTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where: Prisma.PaymentTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentTransactionCreateInput, Prisma.PaymentTransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentTransactionUpdateInput, Prisma.PaymentTransactionUncheckedUpdateInput>;
};
export type PaymentTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where: Prisma.PaymentTransactionWhereUniqueInput;
};
export type PaymentTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTransactionWhereInput;
    limit?: number;
};
export type PaymentTransaction$recorderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
};
export type PaymentTransaction$earningsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    where?: Prisma.PaymentEarningWhereInput;
    orderBy?: Prisma.PaymentEarningOrderByWithRelationInput | Prisma.PaymentEarningOrderByWithRelationInput[];
    cursor?: Prisma.PaymentEarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentEarningScalarFieldEnum | Prisma.PaymentEarningScalarFieldEnum[];
};
export type PaymentTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
};
