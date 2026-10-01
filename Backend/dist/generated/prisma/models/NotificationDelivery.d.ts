import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NotificationDeliveryModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationDeliveryPayload>;
export type AggregateNotificationDelivery = {
    _count: NotificationDeliveryCountAggregateOutputType | null;
    _avg: NotificationDeliveryAvgAggregateOutputType | null;
    _sum: NotificationDeliverySumAggregateOutputType | null;
    _min: NotificationDeliveryMinAggregateOutputType | null;
    _max: NotificationDeliveryMaxAggregateOutputType | null;
};
export type NotificationDeliveryAvgAggregateOutputType = {
    id: number | null;
    outboxId: number | null;
    recipientAccountId: number | null;
};
export type NotificationDeliverySumAggregateOutputType = {
    id: bigint | null;
    outboxId: bigint | null;
    recipientAccountId: bigint | null;
};
export type NotificationDeliveryMinAggregateOutputType = {
    id: bigint | null;
    outboxId: bigint | null;
    recipientAccountId: bigint | null;
    channel: string | null;
    status: string | null;
    providerRef: string | null;
    errorCode: string | null;
    attemptedAt: Date | null;
    createdAt: Date | null;
};
export type NotificationDeliveryMaxAggregateOutputType = {
    id: bigint | null;
    outboxId: bigint | null;
    recipientAccountId: bigint | null;
    channel: string | null;
    status: string | null;
    providerRef: string | null;
    errorCode: string | null;
    attemptedAt: Date | null;
    createdAt: Date | null;
};
export type NotificationDeliveryCountAggregateOutputType = {
    id: number;
    outboxId: number;
    recipientAccountId: number;
    channel: number;
    status: number;
    providerRef: number;
    errorCode: number;
    attemptedAt: number;
    createdAt: number;
    _all: number;
};
export type NotificationDeliveryAvgAggregateInputType = {
    id?: true;
    outboxId?: true;
    recipientAccountId?: true;
};
export type NotificationDeliverySumAggregateInputType = {
    id?: true;
    outboxId?: true;
    recipientAccountId?: true;
};
export type NotificationDeliveryMinAggregateInputType = {
    id?: true;
    outboxId?: true;
    recipientAccountId?: true;
    channel?: true;
    status?: true;
    providerRef?: true;
    errorCode?: true;
    attemptedAt?: true;
    createdAt?: true;
};
export type NotificationDeliveryMaxAggregateInputType = {
    id?: true;
    outboxId?: true;
    recipientAccountId?: true;
    channel?: true;
    status?: true;
    providerRef?: true;
    errorCode?: true;
    attemptedAt?: true;
    createdAt?: true;
};
export type NotificationDeliveryCountAggregateInputType = {
    id?: true;
    outboxId?: true;
    recipientAccountId?: true;
    channel?: true;
    status?: true;
    providerRef?: true;
    errorCode?: true;
    attemptedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type NotificationDeliveryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationDeliveryWhereInput;
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationDeliveryCountAggregateInputType;
    _avg?: NotificationDeliveryAvgAggregateInputType;
    _sum?: NotificationDeliverySumAggregateInputType;
    _min?: NotificationDeliveryMinAggregateInputType;
    _max?: NotificationDeliveryMaxAggregateInputType;
};
export type GetNotificationDeliveryAggregateType<T extends NotificationDeliveryAggregateArgs> = {
    [P in keyof T & keyof AggregateNotificationDelivery]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotificationDelivery[P]> : Prisma.GetScalarType<T[P], AggregateNotificationDelivery[P]>;
};
export type NotificationDeliveryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationDeliveryWhereInput;
    orderBy?: Prisma.NotificationDeliveryOrderByWithAggregationInput | Prisma.NotificationDeliveryOrderByWithAggregationInput[];
    by: Prisma.NotificationDeliveryScalarFieldEnum[] | Prisma.NotificationDeliveryScalarFieldEnum;
    having?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationDeliveryCountAggregateInputType | true;
    _avg?: NotificationDeliveryAvgAggregateInputType;
    _sum?: NotificationDeliverySumAggregateInputType;
    _min?: NotificationDeliveryMinAggregateInputType;
    _max?: NotificationDeliveryMaxAggregateInputType;
};
export type NotificationDeliveryGroupByOutputType = {
    id: bigint;
    outboxId: bigint;
    recipientAccountId: bigint;
    channel: string;
    status: string;
    providerRef: string | null;
    errorCode: string | null;
    attemptedAt: Date | null;
    createdAt: Date;
    _count: NotificationDeliveryCountAggregateOutputType | null;
    _avg: NotificationDeliveryAvgAggregateOutputType | null;
    _sum: NotificationDeliverySumAggregateOutputType | null;
    _min: NotificationDeliveryMinAggregateOutputType | null;
    _max: NotificationDeliveryMaxAggregateOutputType | null;
};
export type GetNotificationDeliveryGroupByPayload<T extends NotificationDeliveryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationDeliveryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationDeliveryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationDeliveryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationDeliveryGroupByOutputType[P]>;
}>>;
export type NotificationDeliveryWhereInput = {
    AND?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    OR?: Prisma.NotificationDeliveryWhereInput[];
    NOT?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    id?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    outboxId?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    recipientAccountId?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    channel?: Prisma.StringFilter<"NotificationDelivery"> | string;
    status?: Prisma.StringFilter<"NotificationDelivery"> | string;
    providerRef?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    errorCode?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    attemptedAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotificationDelivery"> | Date | string;
    outbox?: Prisma.XOR<Prisma.NotificationOutboxScalarRelationFilter, Prisma.NotificationOutboxWhereInput>;
};
export type NotificationDeliveryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    outboxId?: Prisma.SortOrder;
    recipientAccountId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    outbox?: Prisma.NotificationOutboxOrderByWithRelationInput;
    _relevance?: Prisma.NotificationDeliveryOrderByRelevanceInput;
};
export type NotificationDeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    OR?: Prisma.NotificationDeliveryWhereInput[];
    NOT?: Prisma.NotificationDeliveryWhereInput | Prisma.NotificationDeliveryWhereInput[];
    outboxId?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    recipientAccountId?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    channel?: Prisma.StringFilter<"NotificationDelivery"> | string;
    status?: Prisma.StringFilter<"NotificationDelivery"> | string;
    providerRef?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    errorCode?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    attemptedAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotificationDelivery"> | Date | string;
    outbox?: Prisma.XOR<Prisma.NotificationOutboxScalarRelationFilter, Prisma.NotificationOutboxWhereInput>;
}, "id">;
export type NotificationDeliveryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    outboxId?: Prisma.SortOrder;
    recipientAccountId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.NotificationDeliveryCountOrderByAggregateInput;
    _avg?: Prisma.NotificationDeliveryAvgOrderByAggregateInput;
    _max?: Prisma.NotificationDeliveryMaxOrderByAggregateInput;
    _min?: Prisma.NotificationDeliveryMinOrderByAggregateInput;
    _sum?: Prisma.NotificationDeliverySumOrderByAggregateInput;
};
export type NotificationDeliveryScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput | Prisma.NotificationDeliveryScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationDeliveryScalarWhereWithAggregatesInput | Prisma.NotificationDeliveryScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"NotificationDelivery"> | bigint | number;
    outboxId?: Prisma.BigIntWithAggregatesFilter<"NotificationDelivery"> | bigint | number;
    recipientAccountId?: Prisma.BigIntWithAggregatesFilter<"NotificationDelivery"> | bigint | number;
    channel?: Prisma.StringWithAggregatesFilter<"NotificationDelivery"> | string;
    status?: Prisma.StringWithAggregatesFilter<"NotificationDelivery"> | string;
    providerRef?: Prisma.StringNullableWithAggregatesFilter<"NotificationDelivery"> | string | null;
    errorCode?: Prisma.StringNullableWithAggregatesFilter<"NotificationDelivery"> | string | null;
    attemptedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NotificationDelivery"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NotificationDelivery"> | Date | string;
};
export type NotificationDeliveryCreateInput = {
    id?: bigint | number;
    recipientAccountId: bigint | number;
    channel: string;
    status?: string;
    providerRef?: string | null;
    errorCode?: string | null;
    attemptedAt?: Date | string | null;
    createdAt?: Date | string;
    outbox: Prisma.NotificationOutboxCreateNestedOneWithoutDeliveriesInput;
};
export type NotificationDeliveryUncheckedCreateInput = {
    id?: bigint | number;
    outboxId: bigint | number;
    recipientAccountId: bigint | number;
    channel: string;
    status?: string;
    providerRef?: string | null;
    errorCode?: string | null;
    attemptedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type NotificationDeliveryUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    recipientAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attemptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outbox?: Prisma.NotificationOutboxUpdateOneRequiredWithoutDeliveriesNestedInput;
};
export type NotificationDeliveryUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    outboxId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    recipientAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attemptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationDeliveryCreateManyInput = {
    id?: bigint | number;
    outboxId: bigint | number;
    recipientAccountId: bigint | number;
    channel: string;
    status?: string;
    providerRef?: string | null;
    errorCode?: string | null;
    attemptedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type NotificationDeliveryUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    recipientAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attemptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationDeliveryUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    outboxId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    recipientAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attemptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationDeliveryListRelationFilter = {
    every?: Prisma.NotificationDeliveryWhereInput;
    some?: Prisma.NotificationDeliveryWhereInput;
    none?: Prisma.NotificationDeliveryWhereInput;
};
export type NotificationDeliveryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotificationDeliveryOrderByRelevanceInput = {
    fields: Prisma.NotificationDeliveryOrderByRelevanceFieldEnum | Prisma.NotificationDeliveryOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type NotificationDeliveryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outboxId?: Prisma.SortOrder;
    recipientAccountId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    errorCode?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotificationDeliveryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outboxId?: Prisma.SortOrder;
    recipientAccountId?: Prisma.SortOrder;
};
export type NotificationDeliveryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outboxId?: Prisma.SortOrder;
    recipientAccountId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    errorCode?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotificationDeliveryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outboxId?: Prisma.SortOrder;
    recipientAccountId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    errorCode?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotificationDeliverySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    outboxId?: Prisma.SortOrder;
    recipientAccountId?: Prisma.SortOrder;
};
export type NotificationDeliveryCreateNestedManyWithoutOutboxInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput> | Prisma.NotificationDeliveryCreateWithoutOutboxInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput | Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyOutboxInputEnvelope;
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
};
export type NotificationDeliveryUncheckedCreateNestedManyWithoutOutboxInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput> | Prisma.NotificationDeliveryCreateWithoutOutboxInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput | Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyOutboxInputEnvelope;
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
};
export type NotificationDeliveryUpdateManyWithoutOutboxNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput> | Prisma.NotificationDeliveryCreateWithoutOutboxInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput | Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput[];
    upsert?: Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutOutboxInput | Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutOutboxInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyOutboxInputEnvelope;
    set?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    disconnect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    delete?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    update?: Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutOutboxInput | Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutOutboxInput[];
    updateMany?: Prisma.NotificationDeliveryUpdateManyWithWhereWithoutOutboxInput | Prisma.NotificationDeliveryUpdateManyWithWhereWithoutOutboxInput[];
    deleteMany?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
};
export type NotificationDeliveryUncheckedUpdateManyWithoutOutboxNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput> | Prisma.NotificationDeliveryCreateWithoutOutboxInput[] | Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput[];
    connectOrCreate?: Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput | Prisma.NotificationDeliveryCreateOrConnectWithoutOutboxInput[];
    upsert?: Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutOutboxInput | Prisma.NotificationDeliveryUpsertWithWhereUniqueWithoutOutboxInput[];
    createMany?: Prisma.NotificationDeliveryCreateManyOutboxInputEnvelope;
    set?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    disconnect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    delete?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    connect?: Prisma.NotificationDeliveryWhereUniqueInput | Prisma.NotificationDeliveryWhereUniqueInput[];
    update?: Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutOutboxInput | Prisma.NotificationDeliveryUpdateWithWhereUniqueWithoutOutboxInput[];
    updateMany?: Prisma.NotificationDeliveryUpdateManyWithWhereWithoutOutboxInput | Prisma.NotificationDeliveryUpdateManyWithWhereWithoutOutboxInput[];
    deleteMany?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
};
export type NotificationDeliveryCreateWithoutOutboxInput = {
    id?: bigint | number;
    recipientAccountId: bigint | number;
    channel: string;
    status?: string;
    providerRef?: string | null;
    errorCode?: string | null;
    attemptedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type NotificationDeliveryUncheckedCreateWithoutOutboxInput = {
    id?: bigint | number;
    recipientAccountId: bigint | number;
    channel: string;
    status?: string;
    providerRef?: string | null;
    errorCode?: string | null;
    attemptedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type NotificationDeliveryCreateOrConnectWithoutOutboxInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput>;
};
export type NotificationDeliveryCreateManyOutboxInputEnvelope = {
    data: Prisma.NotificationDeliveryCreateManyOutboxInput | Prisma.NotificationDeliveryCreateManyOutboxInput[];
    skipDuplicates?: boolean;
};
export type NotificationDeliveryUpsertWithWhereUniqueWithoutOutboxInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationDeliveryUpdateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedUpdateWithoutOutboxInput>;
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedCreateWithoutOutboxInput>;
};
export type NotificationDeliveryUpdateWithWhereUniqueWithoutOutboxInput = {
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateWithoutOutboxInput, Prisma.NotificationDeliveryUncheckedUpdateWithoutOutboxInput>;
};
export type NotificationDeliveryUpdateManyWithWhereWithoutOutboxInput = {
    where: Prisma.NotificationDeliveryScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateManyMutationInput, Prisma.NotificationDeliveryUncheckedUpdateManyWithoutOutboxInput>;
};
export type NotificationDeliveryScalarWhereInput = {
    AND?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
    OR?: Prisma.NotificationDeliveryScalarWhereInput[];
    NOT?: Prisma.NotificationDeliveryScalarWhereInput | Prisma.NotificationDeliveryScalarWhereInput[];
    id?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    outboxId?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    recipientAccountId?: Prisma.BigIntFilter<"NotificationDelivery"> | bigint | number;
    channel?: Prisma.StringFilter<"NotificationDelivery"> | string;
    status?: Prisma.StringFilter<"NotificationDelivery"> | string;
    providerRef?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    errorCode?: Prisma.StringNullableFilter<"NotificationDelivery"> | string | null;
    attemptedAt?: Prisma.DateTimeNullableFilter<"NotificationDelivery"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotificationDelivery"> | Date | string;
};
export type NotificationDeliveryCreateManyOutboxInput = {
    id?: bigint | number;
    recipientAccountId: bigint | number;
    channel: string;
    status?: string;
    providerRef?: string | null;
    errorCode?: string | null;
    attemptedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type NotificationDeliveryUpdateWithoutOutboxInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    recipientAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attemptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationDeliveryUncheckedUpdateWithoutOutboxInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    recipientAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attemptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationDeliveryUncheckedUpdateManyWithoutOutboxInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    recipientAccountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attemptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationDeliverySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    outboxId?: boolean;
    recipientAccountId?: boolean;
    channel?: boolean;
    status?: boolean;
    providerRef?: boolean;
    errorCode?: boolean;
    attemptedAt?: boolean;
    createdAt?: boolean;
    outbox?: boolean | Prisma.NotificationOutboxDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notificationDelivery"]>;
export type NotificationDeliverySelectScalar = {
    id?: boolean;
    outboxId?: boolean;
    recipientAccountId?: boolean;
    channel?: boolean;
    status?: boolean;
    providerRef?: boolean;
    errorCode?: boolean;
    attemptedAt?: boolean;
    createdAt?: boolean;
};
export type NotificationDeliveryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "outboxId" | "recipientAccountId" | "channel" | "status" | "providerRef" | "errorCode" | "attemptedAt" | "createdAt", ExtArgs["result"]["notificationDelivery"]>;
export type NotificationDeliveryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    outbox?: boolean | Prisma.NotificationOutboxDefaultArgs<ExtArgs>;
};
export type $NotificationDeliveryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NotificationDelivery";
    objects: {
        outbox: Prisma.$NotificationOutboxPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        outboxId: bigint;
        recipientAccountId: bigint;
        channel: string;
        status: string;
        providerRef: string | null;
        errorCode: string | null;
        attemptedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["notificationDelivery"]>;
    composites: {};
};
export type NotificationDeliveryGetPayload<S extends boolean | null | undefined | NotificationDeliveryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload, S>;
export type NotificationDeliveryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationDeliveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationDeliveryCountAggregateInputType | true;
};
export interface NotificationDeliveryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NotificationDelivery'];
        meta: {
            name: 'NotificationDelivery';
        };
    };
    findUnique<T extends NotificationDeliveryFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NotificationDeliveryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NotificationDeliveryFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NotificationDeliveryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NotificationDeliveryFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NotificationDeliveryCreateArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NotificationDeliveryCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends NotificationDeliveryDeleteArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NotificationDeliveryUpdateArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NotificationDeliveryDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NotificationDeliveryUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends NotificationDeliveryUpsertArgs>(args: Prisma.SelectSubset<T, NotificationDeliveryUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationDeliveryClient<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NotificationDeliveryCountArgs>(args?: Prisma.Subset<T, NotificationDeliveryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationDeliveryCountAggregateOutputType> : number>;
    aggregate<T extends NotificationDeliveryAggregateArgs>(args: Prisma.Subset<T, NotificationDeliveryAggregateArgs>): Prisma.PrismaPromise<GetNotificationDeliveryAggregateType<T>>;
    groupBy<T extends NotificationDeliveryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationDeliveryGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationDeliveryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationDeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NotificationDeliveryFieldRefs;
}
export interface Prisma__NotificationDeliveryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    outbox<T extends Prisma.NotificationOutboxDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NotificationOutboxDefaultArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NotificationDeliveryFieldRefs {
    readonly id: Prisma.FieldRef<"NotificationDelivery", 'BigInt'>;
    readonly outboxId: Prisma.FieldRef<"NotificationDelivery", 'BigInt'>;
    readonly recipientAccountId: Prisma.FieldRef<"NotificationDelivery", 'BigInt'>;
    readonly channel: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly status: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly providerRef: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly errorCode: Prisma.FieldRef<"NotificationDelivery", 'String'>;
    readonly attemptedAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"NotificationDelivery", 'DateTime'>;
}
export type NotificationDeliveryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
export type NotificationDeliveryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
export type NotificationDeliveryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    where?: Prisma.NotificationDeliveryWhereInput;
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationDeliveryScalarFieldEnum | Prisma.NotificationDeliveryScalarFieldEnum[];
};
export type NotificationDeliveryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    where?: Prisma.NotificationDeliveryWhereInput;
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationDeliveryScalarFieldEnum | Prisma.NotificationDeliveryScalarFieldEnum[];
};
export type NotificationDeliveryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    where?: Prisma.NotificationDeliveryWhereInput;
    orderBy?: Prisma.NotificationDeliveryOrderByWithRelationInput | Prisma.NotificationDeliveryOrderByWithRelationInput[];
    cursor?: Prisma.NotificationDeliveryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationDeliveryScalarFieldEnum | Prisma.NotificationDeliveryScalarFieldEnum[];
};
export type NotificationDeliveryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationDeliveryCreateInput, Prisma.NotificationDeliveryUncheckedCreateInput>;
};
export type NotificationDeliveryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NotificationDeliveryCreateManyInput | Prisma.NotificationDeliveryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NotificationDeliveryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateInput, Prisma.NotificationDeliveryUncheckedUpdateInput>;
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
export type NotificationDeliveryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NotificationDeliveryUpdateManyMutationInput, Prisma.NotificationDeliveryUncheckedUpdateManyInput>;
    where?: Prisma.NotificationDeliveryWhereInput;
    limit?: number;
};
export type NotificationDeliveryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    where: Prisma.NotificationDeliveryWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationDeliveryCreateInput, Prisma.NotificationDeliveryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NotificationDeliveryUpdateInput, Prisma.NotificationDeliveryUncheckedUpdateInput>;
};
export type NotificationDeliveryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
    where: Prisma.NotificationDeliveryWhereUniqueInput;
};
export type NotificationDeliveryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationDeliveryWhereInput;
    limit?: number;
};
export type NotificationDeliveryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationDeliverySelect<ExtArgs> | null;
    omit?: Prisma.NotificationDeliveryOmit<ExtArgs> | null;
    include?: Prisma.NotificationDeliveryInclude<ExtArgs> | null;
};
