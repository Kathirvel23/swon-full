import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NotificationOutboxModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationOutboxPayload>;
export type AggregateNotificationOutbox = {
    _count: NotificationOutboxCountAggregateOutputType | null;
    _avg: NotificationOutboxAvgAggregateOutputType | null;
    _sum: NotificationOutboxSumAggregateOutputType | null;
    _min: NotificationOutboxMinAggregateOutputType | null;
    _max: NotificationOutboxMaxAggregateOutputType | null;
};
export type NotificationOutboxAvgAggregateOutputType = {
    id: number | null;
    attempts: number | null;
};
export type NotificationOutboxSumAggregateOutputType = {
    id: bigint | null;
    attempts: number | null;
};
export type NotificationOutboxMinAggregateOutputType = {
    id: bigint | null;
    eventKey: string | null;
    dedupeKey: string | null;
    status: string | null;
    attempts: number | null;
    nextAttemptAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NotificationOutboxMaxAggregateOutputType = {
    id: bigint | null;
    eventKey: string | null;
    dedupeKey: string | null;
    status: string | null;
    attempts: number | null;
    nextAttemptAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NotificationOutboxCountAggregateOutputType = {
    id: number;
    eventKey: number;
    dedupeKey: number;
    payload: number;
    status: number;
    attempts: number;
    nextAttemptAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type NotificationOutboxAvgAggregateInputType = {
    id?: true;
    attempts?: true;
};
export type NotificationOutboxSumAggregateInputType = {
    id?: true;
    attempts?: true;
};
export type NotificationOutboxMinAggregateInputType = {
    id?: true;
    eventKey?: true;
    dedupeKey?: true;
    status?: true;
    attempts?: true;
    nextAttemptAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NotificationOutboxMaxAggregateInputType = {
    id?: true;
    eventKey?: true;
    dedupeKey?: true;
    status?: true;
    attempts?: true;
    nextAttemptAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NotificationOutboxCountAggregateInputType = {
    id?: true;
    eventKey?: true;
    dedupeKey?: true;
    payload?: true;
    status?: true;
    attempts?: true;
    nextAttemptAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type NotificationOutboxAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationOutboxWhereInput;
    orderBy?: Prisma.NotificationOutboxOrderByWithRelationInput | Prisma.NotificationOutboxOrderByWithRelationInput[];
    cursor?: Prisma.NotificationOutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationOutboxCountAggregateInputType;
    _avg?: NotificationOutboxAvgAggregateInputType;
    _sum?: NotificationOutboxSumAggregateInputType;
    _min?: NotificationOutboxMinAggregateInputType;
    _max?: NotificationOutboxMaxAggregateInputType;
};
export type GetNotificationOutboxAggregateType<T extends NotificationOutboxAggregateArgs> = {
    [P in keyof T & keyof AggregateNotificationOutbox]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotificationOutbox[P]> : Prisma.GetScalarType<T[P], AggregateNotificationOutbox[P]>;
};
export type NotificationOutboxGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationOutboxWhereInput;
    orderBy?: Prisma.NotificationOutboxOrderByWithAggregationInput | Prisma.NotificationOutboxOrderByWithAggregationInput[];
    by: Prisma.NotificationOutboxScalarFieldEnum[] | Prisma.NotificationOutboxScalarFieldEnum;
    having?: Prisma.NotificationOutboxScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationOutboxCountAggregateInputType | true;
    _avg?: NotificationOutboxAvgAggregateInputType;
    _sum?: NotificationOutboxSumAggregateInputType;
    _min?: NotificationOutboxMinAggregateInputType;
    _max?: NotificationOutboxMaxAggregateInputType;
};
export type NotificationOutboxGroupByOutputType = {
    id: bigint;
    eventKey: string;
    dedupeKey: string;
    payload: runtime.JsonValue;
    status: string;
    attempts: number;
    nextAttemptAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: NotificationOutboxCountAggregateOutputType | null;
    _avg: NotificationOutboxAvgAggregateOutputType | null;
    _sum: NotificationOutboxSumAggregateOutputType | null;
    _min: NotificationOutboxMinAggregateOutputType | null;
    _max: NotificationOutboxMaxAggregateOutputType | null;
};
export type GetNotificationOutboxGroupByPayload<T extends NotificationOutboxGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationOutboxGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationOutboxGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationOutboxGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationOutboxGroupByOutputType[P]>;
}>>;
export type NotificationOutboxWhereInput = {
    AND?: Prisma.NotificationOutboxWhereInput | Prisma.NotificationOutboxWhereInput[];
    OR?: Prisma.NotificationOutboxWhereInput[];
    NOT?: Prisma.NotificationOutboxWhereInput | Prisma.NotificationOutboxWhereInput[];
    id?: Prisma.BigIntFilter<"NotificationOutbox"> | bigint | number;
    eventKey?: Prisma.StringFilter<"NotificationOutbox"> | string;
    dedupeKey?: Prisma.StringFilter<"NotificationOutbox"> | string;
    payload?: Prisma.JsonFilter<"NotificationOutbox">;
    status?: Prisma.StringFilter<"NotificationOutbox"> | string;
    attempts?: Prisma.IntFilter<"NotificationOutbox"> | number;
    nextAttemptAt?: Prisma.DateTimeNullableFilter<"NotificationOutbox"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotificationOutbox"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NotificationOutbox"> | Date | string;
    deliveries?: Prisma.NotificationDeliveryListRelationFilter;
};
export type NotificationOutboxOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    eventKey?: Prisma.SortOrder;
    dedupeKey?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deliveries?: Prisma.NotificationDeliveryOrderByRelationAggregateInput;
    _relevance?: Prisma.NotificationOutboxOrderByRelevanceInput;
};
export type NotificationOutboxWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    dedupeKey?: string;
    AND?: Prisma.NotificationOutboxWhereInput | Prisma.NotificationOutboxWhereInput[];
    OR?: Prisma.NotificationOutboxWhereInput[];
    NOT?: Prisma.NotificationOutboxWhereInput | Prisma.NotificationOutboxWhereInput[];
    eventKey?: Prisma.StringFilter<"NotificationOutbox"> | string;
    payload?: Prisma.JsonFilter<"NotificationOutbox">;
    status?: Prisma.StringFilter<"NotificationOutbox"> | string;
    attempts?: Prisma.IntFilter<"NotificationOutbox"> | number;
    nextAttemptAt?: Prisma.DateTimeNullableFilter<"NotificationOutbox"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotificationOutbox"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NotificationOutbox"> | Date | string;
    deliveries?: Prisma.NotificationDeliveryListRelationFilter;
}, "id" | "dedupeKey">;
export type NotificationOutboxOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    eventKey?: Prisma.SortOrder;
    dedupeKey?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NotificationOutboxCountOrderByAggregateInput;
    _avg?: Prisma.NotificationOutboxAvgOrderByAggregateInput;
    _max?: Prisma.NotificationOutboxMaxOrderByAggregateInput;
    _min?: Prisma.NotificationOutboxMinOrderByAggregateInput;
    _sum?: Prisma.NotificationOutboxSumOrderByAggregateInput;
};
export type NotificationOutboxScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationOutboxScalarWhereWithAggregatesInput | Prisma.NotificationOutboxScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationOutboxScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationOutboxScalarWhereWithAggregatesInput | Prisma.NotificationOutboxScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"NotificationOutbox"> | bigint | number;
    eventKey?: Prisma.StringWithAggregatesFilter<"NotificationOutbox"> | string;
    dedupeKey?: Prisma.StringWithAggregatesFilter<"NotificationOutbox"> | string;
    payload?: Prisma.JsonWithAggregatesFilter<"NotificationOutbox">;
    status?: Prisma.StringWithAggregatesFilter<"NotificationOutbox"> | string;
    attempts?: Prisma.IntWithAggregatesFilter<"NotificationOutbox"> | number;
    nextAttemptAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NotificationOutbox"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NotificationOutbox"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"NotificationOutbox"> | Date | string;
};
export type NotificationOutboxCreateInput = {
    id?: bigint | number;
    eventKey: string;
    dedupeKey: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deliveries?: Prisma.NotificationDeliveryCreateNestedManyWithoutOutboxInput;
};
export type NotificationOutboxUncheckedCreateInput = {
    id?: bigint | number;
    eventKey: string;
    dedupeKey: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deliveries?: Prisma.NotificationDeliveryUncheckedCreateNestedManyWithoutOutboxInput;
};
export type NotificationOutboxUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    eventKey?: Prisma.StringFieldUpdateOperationsInput | string;
    dedupeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveries?: Prisma.NotificationDeliveryUpdateManyWithoutOutboxNestedInput;
};
export type NotificationOutboxUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    eventKey?: Prisma.StringFieldUpdateOperationsInput | string;
    dedupeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveries?: Prisma.NotificationDeliveryUncheckedUpdateManyWithoutOutboxNestedInput;
};
export type NotificationOutboxCreateManyInput = {
    id?: bigint | number;
    eventKey: string;
    dedupeKey: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationOutboxUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    eventKey?: Prisma.StringFieldUpdateOperationsInput | string;
    dedupeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationOutboxUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    eventKey?: Prisma.StringFieldUpdateOperationsInput | string;
    dedupeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationOutboxOrderByRelevanceInput = {
    fields: Prisma.NotificationOutboxOrderByRelevanceFieldEnum | Prisma.NotificationOutboxOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type NotificationOutboxCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventKey?: Prisma.SortOrder;
    dedupeKey?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationOutboxAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
};
export type NotificationOutboxMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventKey?: Prisma.SortOrder;
    dedupeKey?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationOutboxMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventKey?: Prisma.SortOrder;
    dedupeKey?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NotificationOutboxSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
};
export type NotificationOutboxScalarRelationFilter = {
    is?: Prisma.NotificationOutboxWhereInput;
    isNot?: Prisma.NotificationOutboxWhereInput;
};
export type NotificationOutboxCreateNestedOneWithoutDeliveriesInput = {
    create?: Prisma.XOR<Prisma.NotificationOutboxCreateWithoutDeliveriesInput, Prisma.NotificationOutboxUncheckedCreateWithoutDeliveriesInput>;
    connectOrCreate?: Prisma.NotificationOutboxCreateOrConnectWithoutDeliveriesInput;
    connect?: Prisma.NotificationOutboxWhereUniqueInput;
};
export type NotificationOutboxUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationOutboxCreateWithoutDeliveriesInput, Prisma.NotificationOutboxUncheckedCreateWithoutDeliveriesInput>;
    connectOrCreate?: Prisma.NotificationOutboxCreateOrConnectWithoutDeliveriesInput;
    upsert?: Prisma.NotificationOutboxUpsertWithoutDeliveriesInput;
    connect?: Prisma.NotificationOutboxWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NotificationOutboxUpdateToOneWithWhereWithoutDeliveriesInput, Prisma.NotificationOutboxUpdateWithoutDeliveriesInput>, Prisma.NotificationOutboxUncheckedUpdateWithoutDeliveriesInput>;
};
export type NotificationOutboxCreateWithoutDeliveriesInput = {
    id?: bigint | number;
    eventKey: string;
    dedupeKey: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationOutboxUncheckedCreateWithoutDeliveriesInput = {
    id?: bigint | number;
    eventKey: string;
    dedupeKey: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NotificationOutboxCreateOrConnectWithoutDeliveriesInput = {
    where: Prisma.NotificationOutboxWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationOutboxCreateWithoutDeliveriesInput, Prisma.NotificationOutboxUncheckedCreateWithoutDeliveriesInput>;
};
export type NotificationOutboxUpsertWithoutDeliveriesInput = {
    update: Prisma.XOR<Prisma.NotificationOutboxUpdateWithoutDeliveriesInput, Prisma.NotificationOutboxUncheckedUpdateWithoutDeliveriesInput>;
    create: Prisma.XOR<Prisma.NotificationOutboxCreateWithoutDeliveriesInput, Prisma.NotificationOutboxUncheckedCreateWithoutDeliveriesInput>;
    where?: Prisma.NotificationOutboxWhereInput;
};
export type NotificationOutboxUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: Prisma.NotificationOutboxWhereInput;
    data: Prisma.XOR<Prisma.NotificationOutboxUpdateWithoutDeliveriesInput, Prisma.NotificationOutboxUncheckedUpdateWithoutDeliveriesInput>;
};
export type NotificationOutboxUpdateWithoutDeliveriesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    eventKey?: Prisma.StringFieldUpdateOperationsInput | string;
    dedupeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationOutboxUncheckedUpdateWithoutDeliveriesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    eventKey?: Prisma.StringFieldUpdateOperationsInput | string;
    dedupeKey?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationOutboxCountOutputType = {
    deliveries: number;
};
export type NotificationOutboxCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    deliveries?: boolean | NotificationOutboxCountOutputTypeCountDeliveriesArgs;
};
export type NotificationOutboxCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxCountOutputTypeSelect<ExtArgs> | null;
};
export type NotificationOutboxCountOutputTypeCountDeliveriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationDeliveryWhereInput;
};
export type NotificationOutboxSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventKey?: boolean;
    dedupeKey?: boolean;
    payload?: boolean;
    status?: boolean;
    attempts?: boolean;
    nextAttemptAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deliveries?: boolean | Prisma.NotificationOutbox$deliveriesArgs<ExtArgs>;
    _count?: boolean | Prisma.NotificationOutboxCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notificationOutbox"]>;
export type NotificationOutboxSelectScalar = {
    id?: boolean;
    eventKey?: boolean;
    dedupeKey?: boolean;
    payload?: boolean;
    status?: boolean;
    attempts?: boolean;
    nextAttemptAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type NotificationOutboxOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "eventKey" | "dedupeKey" | "payload" | "status" | "attempts" | "nextAttemptAt" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationOutbox"]>;
export type NotificationOutboxInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    deliveries?: boolean | Prisma.NotificationOutbox$deliveriesArgs<ExtArgs>;
    _count?: boolean | Prisma.NotificationOutboxCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $NotificationOutboxPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NotificationOutbox";
    objects: {
        deliveries: Prisma.$NotificationDeliveryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        eventKey: string;
        dedupeKey: string;
        payload: runtime.JsonValue;
        status: string;
        attempts: number;
        nextAttemptAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["notificationOutbox"]>;
    composites: {};
};
export type NotificationOutboxGetPayload<S extends boolean | null | undefined | NotificationOutboxDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload, S>;
export type NotificationOutboxCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationOutboxFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationOutboxCountAggregateInputType | true;
};
export interface NotificationOutboxDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NotificationOutbox'];
        meta: {
            name: 'NotificationOutbox';
        };
    };
    findUnique<T extends NotificationOutboxFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationOutboxFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NotificationOutboxFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationOutboxFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NotificationOutboxFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationOutboxFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NotificationOutboxFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationOutboxFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NotificationOutboxFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationOutboxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NotificationOutboxCreateArgs>(args: Prisma.SelectSubset<T, NotificationOutboxCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NotificationOutboxCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationOutboxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends NotificationOutboxDeleteArgs>(args: Prisma.SelectSubset<T, NotificationOutboxDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NotificationOutboxUpdateArgs>(args: Prisma.SelectSubset<T, NotificationOutboxUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NotificationOutboxDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationOutboxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NotificationOutboxUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationOutboxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends NotificationOutboxUpsertArgs>(args: Prisma.SelectSubset<T, NotificationOutboxUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationOutboxClient<runtime.Types.Result.GetResult<Prisma.$NotificationOutboxPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NotificationOutboxCountArgs>(args?: Prisma.Subset<T, NotificationOutboxCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationOutboxCountAggregateOutputType> : number>;
    aggregate<T extends NotificationOutboxAggregateArgs>(args: Prisma.Subset<T, NotificationOutboxAggregateArgs>): Prisma.PrismaPromise<GetNotificationOutboxAggregateType<T>>;
    groupBy<T extends NotificationOutboxGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationOutboxGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationOutboxGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationOutboxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationOutboxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NotificationOutboxFieldRefs;
}
export interface Prisma__NotificationOutboxClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    deliveries<T extends Prisma.NotificationOutbox$deliveriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NotificationOutbox$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NotificationOutboxFieldRefs {
    readonly id: Prisma.FieldRef<"NotificationOutbox", 'BigInt'>;
    readonly eventKey: Prisma.FieldRef<"NotificationOutbox", 'String'>;
    readonly dedupeKey: Prisma.FieldRef<"NotificationOutbox", 'String'>;
    readonly payload: Prisma.FieldRef<"NotificationOutbox", 'Json'>;
    readonly status: Prisma.FieldRef<"NotificationOutbox", 'String'>;
    readonly attempts: Prisma.FieldRef<"NotificationOutbox", 'Int'>;
    readonly nextAttemptAt: Prisma.FieldRef<"NotificationOutbox", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"NotificationOutbox", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"NotificationOutbox", 'DateTime'>;
}
export type NotificationOutboxFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    where: Prisma.NotificationOutboxWhereUniqueInput;
};
export type NotificationOutboxFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    where: Prisma.NotificationOutboxWhereUniqueInput;
};
export type NotificationOutboxFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    where?: Prisma.NotificationOutboxWhereInput;
    orderBy?: Prisma.NotificationOutboxOrderByWithRelationInput | Prisma.NotificationOutboxOrderByWithRelationInput[];
    cursor?: Prisma.NotificationOutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationOutboxScalarFieldEnum | Prisma.NotificationOutboxScalarFieldEnum[];
};
export type NotificationOutboxFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    where?: Prisma.NotificationOutboxWhereInput;
    orderBy?: Prisma.NotificationOutboxOrderByWithRelationInput | Prisma.NotificationOutboxOrderByWithRelationInput[];
    cursor?: Prisma.NotificationOutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationOutboxScalarFieldEnum | Prisma.NotificationOutboxScalarFieldEnum[];
};
export type NotificationOutboxFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    where?: Prisma.NotificationOutboxWhereInput;
    orderBy?: Prisma.NotificationOutboxOrderByWithRelationInput | Prisma.NotificationOutboxOrderByWithRelationInput[];
    cursor?: Prisma.NotificationOutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationOutboxScalarFieldEnum | Prisma.NotificationOutboxScalarFieldEnum[];
};
export type NotificationOutboxCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationOutboxCreateInput, Prisma.NotificationOutboxUncheckedCreateInput>;
};
export type NotificationOutboxCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NotificationOutboxCreateManyInput | Prisma.NotificationOutboxCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NotificationOutboxUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationOutboxUpdateInput, Prisma.NotificationOutboxUncheckedUpdateInput>;
    where: Prisma.NotificationOutboxWhereUniqueInput;
};
export type NotificationOutboxUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NotificationOutboxUpdateManyMutationInput, Prisma.NotificationOutboxUncheckedUpdateManyInput>;
    where?: Prisma.NotificationOutboxWhereInput;
    limit?: number;
};
export type NotificationOutboxUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    where: Prisma.NotificationOutboxWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationOutboxCreateInput, Prisma.NotificationOutboxUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NotificationOutboxUpdateInput, Prisma.NotificationOutboxUncheckedUpdateInput>;
};
export type NotificationOutboxDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
    where: Prisma.NotificationOutboxWhereUniqueInput;
};
export type NotificationOutboxDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationOutboxWhereInput;
    limit?: number;
};
export type NotificationOutbox$deliveriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type NotificationOutboxDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationOutboxSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOutboxOmit<ExtArgs> | null;
    include?: Prisma.NotificationOutboxInclude<ExtArgs> | null;
};
