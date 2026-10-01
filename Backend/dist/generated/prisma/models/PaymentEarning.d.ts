import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaymentEarningModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentEarningPayload>;
export type AggregatePaymentEarning = {
    _count: PaymentEarningCountAggregateOutputType | null;
    _avg: PaymentEarningAvgAggregateOutputType | null;
    _sum: PaymentEarningSumAggregateOutputType | null;
    _min: PaymentEarningMinAggregateOutputType | null;
    _max: PaymentEarningMaxAggregateOutputType | null;
};
export type PaymentEarningAvgAggregateOutputType = {
    earningId: number | null;
    paymentTransactionId: number | null;
    amountPaise: number | null;
};
export type PaymentEarningSumAggregateOutputType = {
    earningId: bigint | null;
    paymentTransactionId: bigint | null;
    amountPaise: bigint | null;
};
export type PaymentEarningMinAggregateOutputType = {
    earningId: bigint | null;
    paymentTransactionId: bigint | null;
    amountPaise: bigint | null;
};
export type PaymentEarningMaxAggregateOutputType = {
    earningId: bigint | null;
    paymentTransactionId: bigint | null;
    amountPaise: bigint | null;
};
export type PaymentEarningCountAggregateOutputType = {
    earningId: number;
    paymentTransactionId: number;
    amountPaise: number;
    _all: number;
};
export type PaymentEarningAvgAggregateInputType = {
    earningId?: true;
    paymentTransactionId?: true;
    amountPaise?: true;
};
export type PaymentEarningSumAggregateInputType = {
    earningId?: true;
    paymentTransactionId?: true;
    amountPaise?: true;
};
export type PaymentEarningMinAggregateInputType = {
    earningId?: true;
    paymentTransactionId?: true;
    amountPaise?: true;
};
export type PaymentEarningMaxAggregateInputType = {
    earningId?: true;
    paymentTransactionId?: true;
    amountPaise?: true;
};
export type PaymentEarningCountAggregateInputType = {
    earningId?: true;
    paymentTransactionId?: true;
    amountPaise?: true;
    _all?: true;
};
export type PaymentEarningAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentEarningWhereInput;
    orderBy?: Prisma.PaymentEarningOrderByWithRelationInput | Prisma.PaymentEarningOrderByWithRelationInput[];
    cursor?: Prisma.PaymentEarningWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentEarningCountAggregateInputType;
    _avg?: PaymentEarningAvgAggregateInputType;
    _sum?: PaymentEarningSumAggregateInputType;
    _min?: PaymentEarningMinAggregateInputType;
    _max?: PaymentEarningMaxAggregateInputType;
};
export type GetPaymentEarningAggregateType<T extends PaymentEarningAggregateArgs> = {
    [P in keyof T & keyof AggregatePaymentEarning]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePaymentEarning[P]> : Prisma.GetScalarType<T[P], AggregatePaymentEarning[P]>;
};
export type PaymentEarningGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentEarningWhereInput;
    orderBy?: Prisma.PaymentEarningOrderByWithAggregationInput | Prisma.PaymentEarningOrderByWithAggregationInput[];
    by: Prisma.PaymentEarningScalarFieldEnum[] | Prisma.PaymentEarningScalarFieldEnum;
    having?: Prisma.PaymentEarningScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentEarningCountAggregateInputType | true;
    _avg?: PaymentEarningAvgAggregateInputType;
    _sum?: PaymentEarningSumAggregateInputType;
    _min?: PaymentEarningMinAggregateInputType;
    _max?: PaymentEarningMaxAggregateInputType;
};
export type PaymentEarningGroupByOutputType = {
    earningId: bigint;
    paymentTransactionId: bigint;
    amountPaise: bigint;
    _count: PaymentEarningCountAggregateOutputType | null;
    _avg: PaymentEarningAvgAggregateOutputType | null;
    _sum: PaymentEarningSumAggregateOutputType | null;
    _min: PaymentEarningMinAggregateOutputType | null;
    _max: PaymentEarningMaxAggregateOutputType | null;
};
export type GetPaymentEarningGroupByPayload<T extends PaymentEarningGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentEarningGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaymentEarningGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentEarningGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentEarningGroupByOutputType[P]>;
}>>;
export type PaymentEarningWhereInput = {
    AND?: Prisma.PaymentEarningWhereInput | Prisma.PaymentEarningWhereInput[];
    OR?: Prisma.PaymentEarningWhereInput[];
    NOT?: Prisma.PaymentEarningWhereInput | Prisma.PaymentEarningWhereInput[];
    earningId?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    paymentTransactionId?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    amountPaise?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    earning?: Prisma.XOR<Prisma.EarningScalarRelationFilter, Prisma.EarningWhereInput>;
    txn?: Prisma.XOR<Prisma.PaymentTransactionScalarRelationFilter, Prisma.PaymentTransactionWhereInput>;
};
export type PaymentEarningOrderByWithRelationInput = {
    earningId?: Prisma.SortOrder;
    paymentTransactionId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    earning?: Prisma.EarningOrderByWithRelationInput;
    txn?: Prisma.PaymentTransactionOrderByWithRelationInput;
};
export type PaymentEarningWhereUniqueInput = Prisma.AtLeast<{
    earningId_paymentTransactionId?: Prisma.PaymentEarningEarningIdPaymentTransactionIdCompoundUniqueInput;
    AND?: Prisma.PaymentEarningWhereInput | Prisma.PaymentEarningWhereInput[];
    OR?: Prisma.PaymentEarningWhereInput[];
    NOT?: Prisma.PaymentEarningWhereInput | Prisma.PaymentEarningWhereInput[];
    earningId?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    paymentTransactionId?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    amountPaise?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    earning?: Prisma.XOR<Prisma.EarningScalarRelationFilter, Prisma.EarningWhereInput>;
    txn?: Prisma.XOR<Prisma.PaymentTransactionScalarRelationFilter, Prisma.PaymentTransactionWhereInput>;
}, "earningId_paymentTransactionId">;
export type PaymentEarningOrderByWithAggregationInput = {
    earningId?: Prisma.SortOrder;
    paymentTransactionId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
    _count?: Prisma.PaymentEarningCountOrderByAggregateInput;
    _avg?: Prisma.PaymentEarningAvgOrderByAggregateInput;
    _max?: Prisma.PaymentEarningMaxOrderByAggregateInput;
    _min?: Prisma.PaymentEarningMinOrderByAggregateInput;
    _sum?: Prisma.PaymentEarningSumOrderByAggregateInput;
};
export type PaymentEarningScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentEarningScalarWhereWithAggregatesInput | Prisma.PaymentEarningScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentEarningScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentEarningScalarWhereWithAggregatesInput | Prisma.PaymentEarningScalarWhereWithAggregatesInput[];
    earningId?: Prisma.BigIntWithAggregatesFilter<"PaymentEarning"> | bigint | number;
    paymentTransactionId?: Prisma.BigIntWithAggregatesFilter<"PaymentEarning"> | bigint | number;
    amountPaise?: Prisma.BigIntWithAggregatesFilter<"PaymentEarning"> | bigint | number;
};
export type PaymentEarningCreateInput = {
    amountPaise: bigint | number;
    earning: Prisma.EarningCreateNestedOneWithoutPaymentsInput;
    txn: Prisma.PaymentTransactionCreateNestedOneWithoutEarningsInput;
};
export type PaymentEarningUncheckedCreateInput = {
    earningId: bigint | number;
    paymentTransactionId: bigint | number;
    amountPaise: bigint | number;
};
export type PaymentEarningUpdateInput = {
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    earning?: Prisma.EarningUpdateOneRequiredWithoutPaymentsNestedInput;
    txn?: Prisma.PaymentTransactionUpdateOneRequiredWithoutEarningsNestedInput;
};
export type PaymentEarningUncheckedUpdateInput = {
    earningId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    paymentTransactionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type PaymentEarningCreateManyInput = {
    earningId: bigint | number;
    paymentTransactionId: bigint | number;
    amountPaise: bigint | number;
};
export type PaymentEarningUpdateManyMutationInput = {
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type PaymentEarningUncheckedUpdateManyInput = {
    earningId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    paymentTransactionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type PaymentEarningListRelationFilter = {
    every?: Prisma.PaymentEarningWhereInput;
    some?: Prisma.PaymentEarningWhereInput;
    none?: Prisma.PaymentEarningWhereInput;
};
export type PaymentEarningOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PaymentEarningEarningIdPaymentTransactionIdCompoundUniqueInput = {
    earningId: bigint | number;
    paymentTransactionId: bigint | number;
};
export type PaymentEarningCountOrderByAggregateInput = {
    earningId?: Prisma.SortOrder;
    paymentTransactionId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
};
export type PaymentEarningAvgOrderByAggregateInput = {
    earningId?: Prisma.SortOrder;
    paymentTransactionId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
};
export type PaymentEarningMaxOrderByAggregateInput = {
    earningId?: Prisma.SortOrder;
    paymentTransactionId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
};
export type PaymentEarningMinOrderByAggregateInput = {
    earningId?: Prisma.SortOrder;
    paymentTransactionId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
};
export type PaymentEarningSumOrderByAggregateInput = {
    earningId?: Prisma.SortOrder;
    paymentTransactionId?: Prisma.SortOrder;
    amountPaise?: Prisma.SortOrder;
};
export type PaymentEarningCreateNestedManyWithoutEarningInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutEarningInput, Prisma.PaymentEarningUncheckedCreateWithoutEarningInput> | Prisma.PaymentEarningCreateWithoutEarningInput[] | Prisma.PaymentEarningUncheckedCreateWithoutEarningInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutEarningInput | Prisma.PaymentEarningCreateOrConnectWithoutEarningInput[];
    createMany?: Prisma.PaymentEarningCreateManyEarningInputEnvelope;
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
};
export type PaymentEarningUncheckedCreateNestedManyWithoutEarningInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutEarningInput, Prisma.PaymentEarningUncheckedCreateWithoutEarningInput> | Prisma.PaymentEarningCreateWithoutEarningInput[] | Prisma.PaymentEarningUncheckedCreateWithoutEarningInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutEarningInput | Prisma.PaymentEarningCreateOrConnectWithoutEarningInput[];
    createMany?: Prisma.PaymentEarningCreateManyEarningInputEnvelope;
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
};
export type PaymentEarningUpdateManyWithoutEarningNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutEarningInput, Prisma.PaymentEarningUncheckedCreateWithoutEarningInput> | Prisma.PaymentEarningCreateWithoutEarningInput[] | Prisma.PaymentEarningUncheckedCreateWithoutEarningInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutEarningInput | Prisma.PaymentEarningCreateOrConnectWithoutEarningInput[];
    upsert?: Prisma.PaymentEarningUpsertWithWhereUniqueWithoutEarningInput | Prisma.PaymentEarningUpsertWithWhereUniqueWithoutEarningInput[];
    createMany?: Prisma.PaymentEarningCreateManyEarningInputEnvelope;
    set?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    disconnect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    delete?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    update?: Prisma.PaymentEarningUpdateWithWhereUniqueWithoutEarningInput | Prisma.PaymentEarningUpdateWithWhereUniqueWithoutEarningInput[];
    updateMany?: Prisma.PaymentEarningUpdateManyWithWhereWithoutEarningInput | Prisma.PaymentEarningUpdateManyWithWhereWithoutEarningInput[];
    deleteMany?: Prisma.PaymentEarningScalarWhereInput | Prisma.PaymentEarningScalarWhereInput[];
};
export type PaymentEarningUncheckedUpdateManyWithoutEarningNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutEarningInput, Prisma.PaymentEarningUncheckedCreateWithoutEarningInput> | Prisma.PaymentEarningCreateWithoutEarningInput[] | Prisma.PaymentEarningUncheckedCreateWithoutEarningInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutEarningInput | Prisma.PaymentEarningCreateOrConnectWithoutEarningInput[];
    upsert?: Prisma.PaymentEarningUpsertWithWhereUniqueWithoutEarningInput | Prisma.PaymentEarningUpsertWithWhereUniqueWithoutEarningInput[];
    createMany?: Prisma.PaymentEarningCreateManyEarningInputEnvelope;
    set?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    disconnect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    delete?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    update?: Prisma.PaymentEarningUpdateWithWhereUniqueWithoutEarningInput | Prisma.PaymentEarningUpdateWithWhereUniqueWithoutEarningInput[];
    updateMany?: Prisma.PaymentEarningUpdateManyWithWhereWithoutEarningInput | Prisma.PaymentEarningUpdateManyWithWhereWithoutEarningInput[];
    deleteMany?: Prisma.PaymentEarningScalarWhereInput | Prisma.PaymentEarningScalarWhereInput[];
};
export type PaymentEarningCreateNestedManyWithoutTxnInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutTxnInput, Prisma.PaymentEarningUncheckedCreateWithoutTxnInput> | Prisma.PaymentEarningCreateWithoutTxnInput[] | Prisma.PaymentEarningUncheckedCreateWithoutTxnInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutTxnInput | Prisma.PaymentEarningCreateOrConnectWithoutTxnInput[];
    createMany?: Prisma.PaymentEarningCreateManyTxnInputEnvelope;
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
};
export type PaymentEarningUncheckedCreateNestedManyWithoutTxnInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutTxnInput, Prisma.PaymentEarningUncheckedCreateWithoutTxnInput> | Prisma.PaymentEarningCreateWithoutTxnInput[] | Prisma.PaymentEarningUncheckedCreateWithoutTxnInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutTxnInput | Prisma.PaymentEarningCreateOrConnectWithoutTxnInput[];
    createMany?: Prisma.PaymentEarningCreateManyTxnInputEnvelope;
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
};
export type PaymentEarningUpdateManyWithoutTxnNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutTxnInput, Prisma.PaymentEarningUncheckedCreateWithoutTxnInput> | Prisma.PaymentEarningCreateWithoutTxnInput[] | Prisma.PaymentEarningUncheckedCreateWithoutTxnInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutTxnInput | Prisma.PaymentEarningCreateOrConnectWithoutTxnInput[];
    upsert?: Prisma.PaymentEarningUpsertWithWhereUniqueWithoutTxnInput | Prisma.PaymentEarningUpsertWithWhereUniqueWithoutTxnInput[];
    createMany?: Prisma.PaymentEarningCreateManyTxnInputEnvelope;
    set?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    disconnect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    delete?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    update?: Prisma.PaymentEarningUpdateWithWhereUniqueWithoutTxnInput | Prisma.PaymentEarningUpdateWithWhereUniqueWithoutTxnInput[];
    updateMany?: Prisma.PaymentEarningUpdateManyWithWhereWithoutTxnInput | Prisma.PaymentEarningUpdateManyWithWhereWithoutTxnInput[];
    deleteMany?: Prisma.PaymentEarningScalarWhereInput | Prisma.PaymentEarningScalarWhereInput[];
};
export type PaymentEarningUncheckedUpdateManyWithoutTxnNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentEarningCreateWithoutTxnInput, Prisma.PaymentEarningUncheckedCreateWithoutTxnInput> | Prisma.PaymentEarningCreateWithoutTxnInput[] | Prisma.PaymentEarningUncheckedCreateWithoutTxnInput[];
    connectOrCreate?: Prisma.PaymentEarningCreateOrConnectWithoutTxnInput | Prisma.PaymentEarningCreateOrConnectWithoutTxnInput[];
    upsert?: Prisma.PaymentEarningUpsertWithWhereUniqueWithoutTxnInput | Prisma.PaymentEarningUpsertWithWhereUniqueWithoutTxnInput[];
    createMany?: Prisma.PaymentEarningCreateManyTxnInputEnvelope;
    set?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    disconnect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    delete?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    connect?: Prisma.PaymentEarningWhereUniqueInput | Prisma.PaymentEarningWhereUniqueInput[];
    update?: Prisma.PaymentEarningUpdateWithWhereUniqueWithoutTxnInput | Prisma.PaymentEarningUpdateWithWhereUniqueWithoutTxnInput[];
    updateMany?: Prisma.PaymentEarningUpdateManyWithWhereWithoutTxnInput | Prisma.PaymentEarningUpdateManyWithWhereWithoutTxnInput[];
    deleteMany?: Prisma.PaymentEarningScalarWhereInput | Prisma.PaymentEarningScalarWhereInput[];
};
export type PaymentEarningCreateWithoutEarningInput = {
    amountPaise: bigint | number;
    txn: Prisma.PaymentTransactionCreateNestedOneWithoutEarningsInput;
};
export type PaymentEarningUncheckedCreateWithoutEarningInput = {
    paymentTransactionId: bigint | number;
    amountPaise: bigint | number;
};
export type PaymentEarningCreateOrConnectWithoutEarningInput = {
    where: Prisma.PaymentEarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentEarningCreateWithoutEarningInput, Prisma.PaymentEarningUncheckedCreateWithoutEarningInput>;
};
export type PaymentEarningCreateManyEarningInputEnvelope = {
    data: Prisma.PaymentEarningCreateManyEarningInput | Prisma.PaymentEarningCreateManyEarningInput[];
    skipDuplicates?: boolean;
};
export type PaymentEarningUpsertWithWhereUniqueWithoutEarningInput = {
    where: Prisma.PaymentEarningWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentEarningUpdateWithoutEarningInput, Prisma.PaymentEarningUncheckedUpdateWithoutEarningInput>;
    create: Prisma.XOR<Prisma.PaymentEarningCreateWithoutEarningInput, Prisma.PaymentEarningUncheckedCreateWithoutEarningInput>;
};
export type PaymentEarningUpdateWithWhereUniqueWithoutEarningInput = {
    where: Prisma.PaymentEarningWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentEarningUpdateWithoutEarningInput, Prisma.PaymentEarningUncheckedUpdateWithoutEarningInput>;
};
export type PaymentEarningUpdateManyWithWhereWithoutEarningInput = {
    where: Prisma.PaymentEarningScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentEarningUpdateManyMutationInput, Prisma.PaymentEarningUncheckedUpdateManyWithoutEarningInput>;
};
export type PaymentEarningScalarWhereInput = {
    AND?: Prisma.PaymentEarningScalarWhereInput | Prisma.PaymentEarningScalarWhereInput[];
    OR?: Prisma.PaymentEarningScalarWhereInput[];
    NOT?: Prisma.PaymentEarningScalarWhereInput | Prisma.PaymentEarningScalarWhereInput[];
    earningId?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    paymentTransactionId?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
    amountPaise?: Prisma.BigIntFilter<"PaymentEarning"> | bigint | number;
};
export type PaymentEarningCreateWithoutTxnInput = {
    amountPaise: bigint | number;
    earning: Prisma.EarningCreateNestedOneWithoutPaymentsInput;
};
export type PaymentEarningUncheckedCreateWithoutTxnInput = {
    earningId: bigint | number;
    amountPaise: bigint | number;
};
export type PaymentEarningCreateOrConnectWithoutTxnInput = {
    where: Prisma.PaymentEarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentEarningCreateWithoutTxnInput, Prisma.PaymentEarningUncheckedCreateWithoutTxnInput>;
};
export type PaymentEarningCreateManyTxnInputEnvelope = {
    data: Prisma.PaymentEarningCreateManyTxnInput | Prisma.PaymentEarningCreateManyTxnInput[];
    skipDuplicates?: boolean;
};
export type PaymentEarningUpsertWithWhereUniqueWithoutTxnInput = {
    where: Prisma.PaymentEarningWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentEarningUpdateWithoutTxnInput, Prisma.PaymentEarningUncheckedUpdateWithoutTxnInput>;
    create: Prisma.XOR<Prisma.PaymentEarningCreateWithoutTxnInput, Prisma.PaymentEarningUncheckedCreateWithoutTxnInput>;
};
export type PaymentEarningUpdateWithWhereUniqueWithoutTxnInput = {
    where: Prisma.PaymentEarningWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentEarningUpdateWithoutTxnInput, Prisma.PaymentEarningUncheckedUpdateWithoutTxnInput>;
};
export type PaymentEarningUpdateManyWithWhereWithoutTxnInput = {
    where: Prisma.PaymentEarningScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentEarningUpdateManyMutationInput, Prisma.PaymentEarningUncheckedUpdateManyWithoutTxnInput>;
};
export type PaymentEarningCreateManyEarningInput = {
    paymentTransactionId: bigint | number;
    amountPaise: bigint | number;
};
export type PaymentEarningUpdateWithoutEarningInput = {
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    txn?: Prisma.PaymentTransactionUpdateOneRequiredWithoutEarningsNestedInput;
};
export type PaymentEarningUncheckedUpdateWithoutEarningInput = {
    paymentTransactionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type PaymentEarningUncheckedUpdateManyWithoutEarningInput = {
    paymentTransactionId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type PaymentEarningCreateManyTxnInput = {
    earningId: bigint | number;
    amountPaise: bigint | number;
};
export type PaymentEarningUpdateWithoutTxnInput = {
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    earning?: Prisma.EarningUpdateOneRequiredWithoutPaymentsNestedInput;
};
export type PaymentEarningUncheckedUpdateWithoutTxnInput = {
    earningId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type PaymentEarningUncheckedUpdateManyWithoutTxnInput = {
    earningId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amountPaise?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type PaymentEarningSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    earningId?: boolean;
    paymentTransactionId?: boolean;
    amountPaise?: boolean;
    earning?: boolean | Prisma.EarningDefaultArgs<ExtArgs>;
    txn?: boolean | Prisma.PaymentTransactionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paymentEarning"]>;
export type PaymentEarningSelectScalar = {
    earningId?: boolean;
    paymentTransactionId?: boolean;
    amountPaise?: boolean;
};
export type PaymentEarningOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"earningId" | "paymentTransactionId" | "amountPaise", ExtArgs["result"]["paymentEarning"]>;
export type PaymentEarningInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    earning?: boolean | Prisma.EarningDefaultArgs<ExtArgs>;
    txn?: boolean | Prisma.PaymentTransactionDefaultArgs<ExtArgs>;
};
export type $PaymentEarningPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PaymentEarning";
    objects: {
        earning: Prisma.$EarningPayload<ExtArgs>;
        txn: Prisma.$PaymentTransactionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        earningId: bigint;
        paymentTransactionId: bigint;
        amountPaise: bigint;
    }, ExtArgs["result"]["paymentEarning"]>;
    composites: {};
};
export type PaymentEarningGetPayload<S extends boolean | null | undefined | PaymentEarningDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload, S>;
export type PaymentEarningCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentEarningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentEarningCountAggregateInputType | true;
};
export interface PaymentEarningDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PaymentEarning'];
        meta: {
            name: 'PaymentEarning';
        };
    };
    findUnique<T extends PaymentEarningFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentEarningFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentEarningFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentEarningFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentEarningFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentEarningFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentEarningFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentEarningFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentEarningFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentEarningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentEarningCreateArgs>(args: Prisma.SelectSubset<T, PaymentEarningCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentEarningCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentEarningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PaymentEarningDeleteArgs>(args: Prisma.SelectSubset<T, PaymentEarningDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentEarningUpdateArgs>(args: Prisma.SelectSubset<T, PaymentEarningUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentEarningDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentEarningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentEarningUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentEarningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PaymentEarningUpsertArgs>(args: Prisma.SelectSubset<T, PaymentEarningUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentEarningClient<runtime.Types.Result.GetResult<Prisma.$PaymentEarningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentEarningCountArgs>(args?: Prisma.Subset<T, PaymentEarningCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaymentEarningCountAggregateOutputType> : number>;
    aggregate<T extends PaymentEarningAggregateArgs>(args: Prisma.Subset<T, PaymentEarningAggregateArgs>): Prisma.PrismaPromise<GetPaymentEarningAggregateType<T>>;
    groupBy<T extends PaymentEarningGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentEarningGroupByArgs['orderBy'];
    } : {
        orderBy?: PaymentEarningGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentEarningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentEarningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentEarningFieldRefs;
}
export interface Prisma__PaymentEarningClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    earning<T extends Prisma.EarningDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EarningDefaultArgs<ExtArgs>>): Prisma.Prisma__EarningClient<runtime.Types.Result.GetResult<Prisma.$EarningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    txn<T extends Prisma.PaymentTransactionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaymentTransactionDefaultArgs<ExtArgs>>): Prisma.Prisma__PaymentTransactionClient<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentEarningFieldRefs {
    readonly earningId: Prisma.FieldRef<"PaymentEarning", 'BigInt'>;
    readonly paymentTransactionId: Prisma.FieldRef<"PaymentEarning", 'BigInt'>;
    readonly amountPaise: Prisma.FieldRef<"PaymentEarning", 'BigInt'>;
}
export type PaymentEarningFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    where: Prisma.PaymentEarningWhereUniqueInput;
};
export type PaymentEarningFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    where: Prisma.PaymentEarningWhereUniqueInput;
};
export type PaymentEarningFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentEarningFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentEarningFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentEarningCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentEarningCreateInput, Prisma.PaymentEarningUncheckedCreateInput>;
};
export type PaymentEarningCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentEarningCreateManyInput | Prisma.PaymentEarningCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentEarningUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentEarningUpdateInput, Prisma.PaymentEarningUncheckedUpdateInput>;
    where: Prisma.PaymentEarningWhereUniqueInput;
};
export type PaymentEarningUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentEarningUpdateManyMutationInput, Prisma.PaymentEarningUncheckedUpdateManyInput>;
    where?: Prisma.PaymentEarningWhereInput;
    limit?: number;
};
export type PaymentEarningUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    where: Prisma.PaymentEarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentEarningCreateInput, Prisma.PaymentEarningUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentEarningUpdateInput, Prisma.PaymentEarningUncheckedUpdateInput>;
};
export type PaymentEarningDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
    where: Prisma.PaymentEarningWhereUniqueInput;
};
export type PaymentEarningDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentEarningWhereInput;
    limit?: number;
};
export type PaymentEarningDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentEarningSelect<ExtArgs> | null;
    omit?: Prisma.PaymentEarningOmit<ExtArgs> | null;
    include?: Prisma.PaymentEarningInclude<ExtArgs> | null;
};
