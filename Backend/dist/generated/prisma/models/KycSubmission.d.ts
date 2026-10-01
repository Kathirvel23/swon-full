import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type KycSubmissionModel = runtime.Types.Result.DefaultSelection<Prisma.$KycSubmissionPayload>;
export type AggregateKycSubmission = {
    _count: KycSubmissionCountAggregateOutputType | null;
    _avg: KycSubmissionAvgAggregateOutputType | null;
    _sum: KycSubmissionSumAggregateOutputType | null;
    _min: KycSubmissionMinAggregateOutputType | null;
    _max: KycSubmissionMaxAggregateOutputType | null;
};
export type KycSubmissionAvgAggregateOutputType = {
    id: number | null;
    accountId: number | null;
    attempts: number | null;
    decidedByAccountId: number | null;
};
export type KycSubmissionSumAggregateOutputType = {
    id: bigint | null;
    accountId: bigint | null;
    attempts: number | null;
    decidedByAccountId: bigint | null;
};
export type KycSubmissionMinAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    accountId: bigint | null;
    status: string | null;
    idType: string | null;
    idNumberEnc: runtime.Bytes | null;
    idNumberHash: string | null;
    attempts: number | null;
    rejectionReason: string | null;
    submittedAt: Date | null;
    decidedAt: Date | null;
    decidedByAccountId: bigint | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type KycSubmissionMaxAggregateOutputType = {
    id: bigint | null;
    publicId: string | null;
    accountId: bigint | null;
    status: string | null;
    idType: string | null;
    idNumberEnc: runtime.Bytes | null;
    idNumberHash: string | null;
    attempts: number | null;
    rejectionReason: string | null;
    submittedAt: Date | null;
    decidedAt: Date | null;
    decidedByAccountId: bigint | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type KycSubmissionCountAggregateOutputType = {
    id: number;
    publicId: number;
    accountId: number;
    status: number;
    idType: number;
    idNumberEnc: number;
    idNumberHash: number;
    attempts: number;
    rejectionReason: number;
    submittedAt: number;
    decidedAt: number;
    decidedByAccountId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type KycSubmissionAvgAggregateInputType = {
    id?: true;
    accountId?: true;
    attempts?: true;
    decidedByAccountId?: true;
};
export type KycSubmissionSumAggregateInputType = {
    id?: true;
    accountId?: true;
    attempts?: true;
    decidedByAccountId?: true;
};
export type KycSubmissionMinAggregateInputType = {
    id?: true;
    publicId?: true;
    accountId?: true;
    status?: true;
    idType?: true;
    idNumberEnc?: true;
    idNumberHash?: true;
    attempts?: true;
    rejectionReason?: true;
    submittedAt?: true;
    decidedAt?: true;
    decidedByAccountId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type KycSubmissionMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    accountId?: true;
    status?: true;
    idType?: true;
    idNumberEnc?: true;
    idNumberHash?: true;
    attempts?: true;
    rejectionReason?: true;
    submittedAt?: true;
    decidedAt?: true;
    decidedByAccountId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type KycSubmissionCountAggregateInputType = {
    id?: true;
    publicId?: true;
    accountId?: true;
    status?: true;
    idType?: true;
    idNumberEnc?: true;
    idNumberHash?: true;
    attempts?: true;
    rejectionReason?: true;
    submittedAt?: true;
    decidedAt?: true;
    decidedByAccountId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type KycSubmissionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycSubmissionWhereInput;
    orderBy?: Prisma.KycSubmissionOrderByWithRelationInput | Prisma.KycSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.KycSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | KycSubmissionCountAggregateInputType;
    _avg?: KycSubmissionAvgAggregateInputType;
    _sum?: KycSubmissionSumAggregateInputType;
    _min?: KycSubmissionMinAggregateInputType;
    _max?: KycSubmissionMaxAggregateInputType;
};
export type GetKycSubmissionAggregateType<T extends KycSubmissionAggregateArgs> = {
    [P in keyof T & keyof AggregateKycSubmission]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKycSubmission[P]> : Prisma.GetScalarType<T[P], AggregateKycSubmission[P]>;
};
export type KycSubmissionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycSubmissionWhereInput;
    orderBy?: Prisma.KycSubmissionOrderByWithAggregationInput | Prisma.KycSubmissionOrderByWithAggregationInput[];
    by: Prisma.KycSubmissionScalarFieldEnum[] | Prisma.KycSubmissionScalarFieldEnum;
    having?: Prisma.KycSubmissionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KycSubmissionCountAggregateInputType | true;
    _avg?: KycSubmissionAvgAggregateInputType;
    _sum?: KycSubmissionSumAggregateInputType;
    _min?: KycSubmissionMinAggregateInputType;
    _max?: KycSubmissionMaxAggregateInputType;
};
export type KycSubmissionGroupByOutputType = {
    id: bigint;
    publicId: string;
    accountId: bigint;
    status: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts: number;
    rejectionReason: string | null;
    submittedAt: Date | null;
    decidedAt: Date | null;
    decidedByAccountId: bigint | null;
    createdAt: Date;
    updatedAt: Date;
    _count: KycSubmissionCountAggregateOutputType | null;
    _avg: KycSubmissionAvgAggregateOutputType | null;
    _sum: KycSubmissionSumAggregateOutputType | null;
    _min: KycSubmissionMinAggregateOutputType | null;
    _max: KycSubmissionMaxAggregateOutputType | null;
};
export type GetKycSubmissionGroupByPayload<T extends KycSubmissionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KycSubmissionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KycSubmissionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KycSubmissionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KycSubmissionGroupByOutputType[P]>;
}>>;
export type KycSubmissionWhereInput = {
    AND?: Prisma.KycSubmissionWhereInput | Prisma.KycSubmissionWhereInput[];
    OR?: Prisma.KycSubmissionWhereInput[];
    NOT?: Prisma.KycSubmissionWhereInput | Prisma.KycSubmissionWhereInput[];
    id?: Prisma.BigIntFilter<"KycSubmission"> | bigint | number;
    publicId?: Prisma.StringFilter<"KycSubmission"> | string;
    accountId?: Prisma.BigIntFilter<"KycSubmission"> | bigint | number;
    status?: Prisma.StringFilter<"KycSubmission"> | string;
    idType?: Prisma.StringFilter<"KycSubmission"> | string;
    idNumberEnc?: Prisma.BytesFilter<"KycSubmission"> | runtime.Bytes;
    idNumberHash?: Prisma.StringFilter<"KycSubmission"> | string;
    attempts?: Prisma.IntFilter<"KycSubmission"> | number;
    rejectionReason?: Prisma.StringNullableFilter<"KycSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeNullableFilter<"KycSubmission"> | Date | string | null;
    decidedAt?: Prisma.DateTimeNullableFilter<"KycSubmission"> | Date | string | null;
    decidedByAccountId?: Prisma.BigIntNullableFilter<"KycSubmission"> | bigint | number | null;
    createdAt?: Prisma.DateTimeFilter<"KycSubmission"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KycSubmission"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    decidedBy?: Prisma.XOR<Prisma.AccountNullableScalarRelationFilter, Prisma.AccountWhereInput> | null;
    documents?: Prisma.KycDocumentListRelationFilter;
    consent?: Prisma.XOR<Prisma.KycConsentNullableScalarRelationFilter, Prisma.KycConsentWhereInput> | null;
};
export type KycSubmissionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    idType?: Prisma.SortOrder;
    idNumberEnc?: Prisma.SortOrder;
    idNumberHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    submittedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    decidedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    decidedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    decidedBy?: Prisma.AccountOrderByWithRelationInput;
    documents?: Prisma.KycDocumentOrderByRelationAggregateInput;
    consent?: Prisma.KycConsentOrderByWithRelationInput;
    _relevance?: Prisma.KycSubmissionOrderByRelevanceInput;
};
export type KycSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    publicId?: string;
    accountId_idNumberHash?: Prisma.KycSubmissionAccountIdIdNumberHashCompoundUniqueInput;
    AND?: Prisma.KycSubmissionWhereInput | Prisma.KycSubmissionWhereInput[];
    OR?: Prisma.KycSubmissionWhereInput[];
    NOT?: Prisma.KycSubmissionWhereInput | Prisma.KycSubmissionWhereInput[];
    accountId?: Prisma.BigIntFilter<"KycSubmission"> | bigint | number;
    status?: Prisma.StringFilter<"KycSubmission"> | string;
    idType?: Prisma.StringFilter<"KycSubmission"> | string;
    idNumberEnc?: Prisma.BytesFilter<"KycSubmission"> | runtime.Bytes;
    idNumberHash?: Prisma.StringFilter<"KycSubmission"> | string;
    attempts?: Prisma.IntFilter<"KycSubmission"> | number;
    rejectionReason?: Prisma.StringNullableFilter<"KycSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeNullableFilter<"KycSubmission"> | Date | string | null;
    decidedAt?: Prisma.DateTimeNullableFilter<"KycSubmission"> | Date | string | null;
    decidedByAccountId?: Prisma.BigIntNullableFilter<"KycSubmission"> | bigint | number | null;
    createdAt?: Prisma.DateTimeFilter<"KycSubmission"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KycSubmission"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    decidedBy?: Prisma.XOR<Prisma.AccountNullableScalarRelationFilter, Prisma.AccountWhereInput> | null;
    documents?: Prisma.KycDocumentListRelationFilter;
    consent?: Prisma.XOR<Prisma.KycConsentNullableScalarRelationFilter, Prisma.KycConsentWhereInput> | null;
}, "id" | "publicId" | "accountId_idNumberHash">;
export type KycSubmissionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    idType?: Prisma.SortOrder;
    idNumberEnc?: Prisma.SortOrder;
    idNumberHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    submittedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    decidedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    decidedByAccountId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.KycSubmissionCountOrderByAggregateInput;
    _avg?: Prisma.KycSubmissionAvgOrderByAggregateInput;
    _max?: Prisma.KycSubmissionMaxOrderByAggregateInput;
    _min?: Prisma.KycSubmissionMinOrderByAggregateInput;
    _sum?: Prisma.KycSubmissionSumOrderByAggregateInput;
};
export type KycSubmissionScalarWhereWithAggregatesInput = {
    AND?: Prisma.KycSubmissionScalarWhereWithAggregatesInput | Prisma.KycSubmissionScalarWhereWithAggregatesInput[];
    OR?: Prisma.KycSubmissionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KycSubmissionScalarWhereWithAggregatesInput | Prisma.KycSubmissionScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"KycSubmission"> | bigint | number;
    publicId?: Prisma.StringWithAggregatesFilter<"KycSubmission"> | string;
    accountId?: Prisma.BigIntWithAggregatesFilter<"KycSubmission"> | bigint | number;
    status?: Prisma.StringWithAggregatesFilter<"KycSubmission"> | string;
    idType?: Prisma.StringWithAggregatesFilter<"KycSubmission"> | string;
    idNumberEnc?: Prisma.BytesWithAggregatesFilter<"KycSubmission"> | runtime.Bytes;
    idNumberHash?: Prisma.StringWithAggregatesFilter<"KycSubmission"> | string;
    attempts?: Prisma.IntWithAggregatesFilter<"KycSubmission"> | number;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"KycSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"KycSubmission"> | Date | string | null;
    decidedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"KycSubmission"> | Date | string | null;
    decidedByAccountId?: Prisma.BigIntNullableWithAggregatesFilter<"KycSubmission"> | bigint | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"KycSubmission"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"KycSubmission"> | Date | string;
};
export type KycSubmissionCreateInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutKycSubmissionsInput;
    decidedBy?: Prisma.AccountCreateNestedOneWithoutKycDecisionsInput;
    documents?: Prisma.KycDocumentCreateNestedManyWithoutSubmissionInput;
    consent?: Prisma.KycConsentCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionUncheckedCreateInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    decidedByAccountId?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    documents?: Prisma.KycDocumentUncheckedCreateNestedManyWithoutSubmissionInput;
    consent?: Prisma.KycConsentUncheckedCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutKycSubmissionsNestedInput;
    decidedBy?: Prisma.AccountUpdateOneWithoutKycDecisionsNestedInput;
    documents?: Prisma.KycDocumentUpdateManyWithoutSubmissionNestedInput;
    consent?: Prisma.KycConsentUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documents?: Prisma.KycDocumentUncheckedUpdateManyWithoutSubmissionNestedInput;
    consent?: Prisma.KycConsentUncheckedUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionCreateManyInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    decidedByAccountId?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KycSubmissionUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycSubmissionUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycSubmissionListRelationFilter = {
    every?: Prisma.KycSubmissionWhereInput;
    some?: Prisma.KycSubmissionWhereInput;
    none?: Prisma.KycSubmissionWhereInput;
};
export type KycSubmissionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type KycSubmissionOrderByRelevanceInput = {
    fields: Prisma.KycSubmissionOrderByRelevanceFieldEnum | Prisma.KycSubmissionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type KycSubmissionAccountIdIdNumberHashCompoundUniqueInput = {
    accountId: bigint | number;
    idNumberHash: string;
};
export type KycSubmissionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    idType?: Prisma.SortOrder;
    idNumberEnc?: Prisma.SortOrder;
    idNumberHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    decidedByAccountId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KycSubmissionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    decidedByAccountId?: Prisma.SortOrder;
};
export type KycSubmissionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    idType?: Prisma.SortOrder;
    idNumberEnc?: Prisma.SortOrder;
    idNumberHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    decidedByAccountId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KycSubmissionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    idType?: Prisma.SortOrder;
    idNumberEnc?: Prisma.SortOrder;
    idNumberHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    decidedAt?: Prisma.SortOrder;
    decidedByAccountId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KycSubmissionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    decidedByAccountId?: Prisma.SortOrder;
};
export type KycSubmissionScalarRelationFilter = {
    is?: Prisma.KycSubmissionWhereInput;
    isNot?: Prisma.KycSubmissionWhereInput;
};
export type KycSubmissionCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutAccountInput, Prisma.KycSubmissionUncheckedCreateWithoutAccountInput> | Prisma.KycSubmissionCreateWithoutAccountInput[] | Prisma.KycSubmissionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutAccountInput | Prisma.KycSubmissionCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.KycSubmissionCreateManyAccountInputEnvelope;
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
};
export type KycSubmissionCreateNestedManyWithoutDecidedByInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput> | Prisma.KycSubmissionCreateWithoutDecidedByInput[] | Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput | Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput[];
    createMany?: Prisma.KycSubmissionCreateManyDecidedByInputEnvelope;
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
};
export type KycSubmissionUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutAccountInput, Prisma.KycSubmissionUncheckedCreateWithoutAccountInput> | Prisma.KycSubmissionCreateWithoutAccountInput[] | Prisma.KycSubmissionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutAccountInput | Prisma.KycSubmissionCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.KycSubmissionCreateManyAccountInputEnvelope;
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
};
export type KycSubmissionUncheckedCreateNestedManyWithoutDecidedByInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput> | Prisma.KycSubmissionCreateWithoutDecidedByInput[] | Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput | Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput[];
    createMany?: Prisma.KycSubmissionCreateManyDecidedByInputEnvelope;
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
};
export type KycSubmissionUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutAccountInput, Prisma.KycSubmissionUncheckedCreateWithoutAccountInput> | Prisma.KycSubmissionCreateWithoutAccountInput[] | Prisma.KycSubmissionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutAccountInput | Prisma.KycSubmissionCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.KycSubmissionUpsertWithWhereUniqueWithoutAccountInput | Prisma.KycSubmissionUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.KycSubmissionCreateManyAccountInputEnvelope;
    set?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    disconnect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    delete?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    update?: Prisma.KycSubmissionUpdateWithWhereUniqueWithoutAccountInput | Prisma.KycSubmissionUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.KycSubmissionUpdateManyWithWhereWithoutAccountInput | Prisma.KycSubmissionUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.KycSubmissionScalarWhereInput | Prisma.KycSubmissionScalarWhereInput[];
};
export type KycSubmissionUpdateManyWithoutDecidedByNestedInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput> | Prisma.KycSubmissionCreateWithoutDecidedByInput[] | Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput | Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput[];
    upsert?: Prisma.KycSubmissionUpsertWithWhereUniqueWithoutDecidedByInput | Prisma.KycSubmissionUpsertWithWhereUniqueWithoutDecidedByInput[];
    createMany?: Prisma.KycSubmissionCreateManyDecidedByInputEnvelope;
    set?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    disconnect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    delete?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    update?: Prisma.KycSubmissionUpdateWithWhereUniqueWithoutDecidedByInput | Prisma.KycSubmissionUpdateWithWhereUniqueWithoutDecidedByInput[];
    updateMany?: Prisma.KycSubmissionUpdateManyWithWhereWithoutDecidedByInput | Prisma.KycSubmissionUpdateManyWithWhereWithoutDecidedByInput[];
    deleteMany?: Prisma.KycSubmissionScalarWhereInput | Prisma.KycSubmissionScalarWhereInput[];
};
export type KycSubmissionUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutAccountInput, Prisma.KycSubmissionUncheckedCreateWithoutAccountInput> | Prisma.KycSubmissionCreateWithoutAccountInput[] | Prisma.KycSubmissionUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutAccountInput | Prisma.KycSubmissionCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.KycSubmissionUpsertWithWhereUniqueWithoutAccountInput | Prisma.KycSubmissionUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.KycSubmissionCreateManyAccountInputEnvelope;
    set?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    disconnect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    delete?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    update?: Prisma.KycSubmissionUpdateWithWhereUniqueWithoutAccountInput | Prisma.KycSubmissionUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.KycSubmissionUpdateManyWithWhereWithoutAccountInput | Prisma.KycSubmissionUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.KycSubmissionScalarWhereInput | Prisma.KycSubmissionScalarWhereInput[];
};
export type KycSubmissionUncheckedUpdateManyWithoutDecidedByNestedInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput> | Prisma.KycSubmissionCreateWithoutDecidedByInput[] | Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput[];
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput | Prisma.KycSubmissionCreateOrConnectWithoutDecidedByInput[];
    upsert?: Prisma.KycSubmissionUpsertWithWhereUniqueWithoutDecidedByInput | Prisma.KycSubmissionUpsertWithWhereUniqueWithoutDecidedByInput[];
    createMany?: Prisma.KycSubmissionCreateManyDecidedByInputEnvelope;
    set?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    disconnect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    delete?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    connect?: Prisma.KycSubmissionWhereUniqueInput | Prisma.KycSubmissionWhereUniqueInput[];
    update?: Prisma.KycSubmissionUpdateWithWhereUniqueWithoutDecidedByInput | Prisma.KycSubmissionUpdateWithWhereUniqueWithoutDecidedByInput[];
    updateMany?: Prisma.KycSubmissionUpdateManyWithWhereWithoutDecidedByInput | Prisma.KycSubmissionUpdateManyWithWhereWithoutDecidedByInput[];
    deleteMany?: Prisma.KycSubmissionScalarWhereInput | Prisma.KycSubmissionScalarWhereInput[];
};
export type BytesFieldUpdateOperationsInput = {
    set?: runtime.Bytes;
};
export type KycSubmissionCreateNestedOneWithoutDocumentsInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDocumentsInput, Prisma.KycSubmissionUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutDocumentsInput;
    connect?: Prisma.KycSubmissionWhereUniqueInput;
};
export type KycSubmissionUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDocumentsInput, Prisma.KycSubmissionUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutDocumentsInput;
    upsert?: Prisma.KycSubmissionUpsertWithoutDocumentsInput;
    connect?: Prisma.KycSubmissionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KycSubmissionUpdateToOneWithWhereWithoutDocumentsInput, Prisma.KycSubmissionUpdateWithoutDocumentsInput>, Prisma.KycSubmissionUncheckedUpdateWithoutDocumentsInput>;
};
export type KycSubmissionCreateNestedOneWithoutConsentInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutConsentInput, Prisma.KycSubmissionUncheckedCreateWithoutConsentInput>;
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutConsentInput;
    connect?: Prisma.KycSubmissionWhereUniqueInput;
};
export type KycSubmissionUpdateOneRequiredWithoutConsentNestedInput = {
    create?: Prisma.XOR<Prisma.KycSubmissionCreateWithoutConsentInput, Prisma.KycSubmissionUncheckedCreateWithoutConsentInput>;
    connectOrCreate?: Prisma.KycSubmissionCreateOrConnectWithoutConsentInput;
    upsert?: Prisma.KycSubmissionUpsertWithoutConsentInput;
    connect?: Prisma.KycSubmissionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KycSubmissionUpdateToOneWithWhereWithoutConsentInput, Prisma.KycSubmissionUpdateWithoutConsentInput>, Prisma.KycSubmissionUncheckedUpdateWithoutConsentInput>;
};
export type KycSubmissionCreateWithoutAccountInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    decidedBy?: Prisma.AccountCreateNestedOneWithoutKycDecisionsInput;
    documents?: Prisma.KycDocumentCreateNestedManyWithoutSubmissionInput;
    consent?: Prisma.KycConsentCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionUncheckedCreateWithoutAccountInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    decidedByAccountId?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    documents?: Prisma.KycDocumentUncheckedCreateNestedManyWithoutSubmissionInput;
    consent?: Prisma.KycConsentUncheckedCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionCreateOrConnectWithoutAccountInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutAccountInput, Prisma.KycSubmissionUncheckedCreateWithoutAccountInput>;
};
export type KycSubmissionCreateManyAccountInputEnvelope = {
    data: Prisma.KycSubmissionCreateManyAccountInput | Prisma.KycSubmissionCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type KycSubmissionCreateWithoutDecidedByInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutKycSubmissionsInput;
    documents?: Prisma.KycDocumentCreateNestedManyWithoutSubmissionInput;
    consent?: Prisma.KycConsentCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionUncheckedCreateWithoutDecidedByInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    documents?: Prisma.KycDocumentUncheckedCreateNestedManyWithoutSubmissionInput;
    consent?: Prisma.KycConsentUncheckedCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionCreateOrConnectWithoutDecidedByInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput>;
};
export type KycSubmissionCreateManyDecidedByInputEnvelope = {
    data: Prisma.KycSubmissionCreateManyDecidedByInput | Prisma.KycSubmissionCreateManyDecidedByInput[];
    skipDuplicates?: boolean;
};
export type KycSubmissionUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutAccountInput, Prisma.KycSubmissionUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutAccountInput, Prisma.KycSubmissionUncheckedCreateWithoutAccountInput>;
};
export type KycSubmissionUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutAccountInput, Prisma.KycSubmissionUncheckedUpdateWithoutAccountInput>;
};
export type KycSubmissionUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.KycSubmissionScalarWhereInput;
    data: Prisma.XOR<Prisma.KycSubmissionUpdateManyMutationInput, Prisma.KycSubmissionUncheckedUpdateManyWithoutAccountInput>;
};
export type KycSubmissionScalarWhereInput = {
    AND?: Prisma.KycSubmissionScalarWhereInput | Prisma.KycSubmissionScalarWhereInput[];
    OR?: Prisma.KycSubmissionScalarWhereInput[];
    NOT?: Prisma.KycSubmissionScalarWhereInput | Prisma.KycSubmissionScalarWhereInput[];
    id?: Prisma.BigIntFilter<"KycSubmission"> | bigint | number;
    publicId?: Prisma.StringFilter<"KycSubmission"> | string;
    accountId?: Prisma.BigIntFilter<"KycSubmission"> | bigint | number;
    status?: Prisma.StringFilter<"KycSubmission"> | string;
    idType?: Prisma.StringFilter<"KycSubmission"> | string;
    idNumberEnc?: Prisma.BytesFilter<"KycSubmission"> | runtime.Bytes;
    idNumberHash?: Prisma.StringFilter<"KycSubmission"> | string;
    attempts?: Prisma.IntFilter<"KycSubmission"> | number;
    rejectionReason?: Prisma.StringNullableFilter<"KycSubmission"> | string | null;
    submittedAt?: Prisma.DateTimeNullableFilter<"KycSubmission"> | Date | string | null;
    decidedAt?: Prisma.DateTimeNullableFilter<"KycSubmission"> | Date | string | null;
    decidedByAccountId?: Prisma.BigIntNullableFilter<"KycSubmission"> | bigint | number | null;
    createdAt?: Prisma.DateTimeFilter<"KycSubmission"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KycSubmission"> | Date | string;
};
export type KycSubmissionUpsertWithWhereUniqueWithoutDecidedByInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedUpdateWithoutDecidedByInput>;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedCreateWithoutDecidedByInput>;
};
export type KycSubmissionUpdateWithWhereUniqueWithoutDecidedByInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutDecidedByInput, Prisma.KycSubmissionUncheckedUpdateWithoutDecidedByInput>;
};
export type KycSubmissionUpdateManyWithWhereWithoutDecidedByInput = {
    where: Prisma.KycSubmissionScalarWhereInput;
    data: Prisma.XOR<Prisma.KycSubmissionUpdateManyMutationInput, Prisma.KycSubmissionUncheckedUpdateManyWithoutDecidedByInput>;
};
export type KycSubmissionCreateWithoutDocumentsInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutKycSubmissionsInput;
    decidedBy?: Prisma.AccountCreateNestedOneWithoutKycDecisionsInput;
    consent?: Prisma.KycConsentCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionUncheckedCreateWithoutDocumentsInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    decidedByAccountId?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    consent?: Prisma.KycConsentUncheckedCreateNestedOneWithoutSubmissionInput;
};
export type KycSubmissionCreateOrConnectWithoutDocumentsInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDocumentsInput, Prisma.KycSubmissionUncheckedCreateWithoutDocumentsInput>;
};
export type KycSubmissionUpsertWithoutDocumentsInput = {
    update: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutDocumentsInput, Prisma.KycSubmissionUncheckedUpdateWithoutDocumentsInput>;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutDocumentsInput, Prisma.KycSubmissionUncheckedCreateWithoutDocumentsInput>;
    where?: Prisma.KycSubmissionWhereInput;
};
export type KycSubmissionUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: Prisma.KycSubmissionWhereInput;
    data: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutDocumentsInput, Prisma.KycSubmissionUncheckedUpdateWithoutDocumentsInput>;
};
export type KycSubmissionUpdateWithoutDocumentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutKycSubmissionsNestedInput;
    decidedBy?: Prisma.AccountUpdateOneWithoutKycDecisionsNestedInput;
    consent?: Prisma.KycConsentUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionUncheckedUpdateWithoutDocumentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consent?: Prisma.KycConsentUncheckedUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionCreateWithoutConsentInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutKycSubmissionsInput;
    decidedBy?: Prisma.AccountCreateNestedOneWithoutKycDecisionsInput;
    documents?: Prisma.KycDocumentCreateNestedManyWithoutSubmissionInput;
};
export type KycSubmissionUncheckedCreateWithoutConsentInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    decidedByAccountId?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    documents?: Prisma.KycDocumentUncheckedCreateNestedManyWithoutSubmissionInput;
};
export type KycSubmissionCreateOrConnectWithoutConsentInput = {
    where: Prisma.KycSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutConsentInput, Prisma.KycSubmissionUncheckedCreateWithoutConsentInput>;
};
export type KycSubmissionUpsertWithoutConsentInput = {
    update: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutConsentInput, Prisma.KycSubmissionUncheckedUpdateWithoutConsentInput>;
    create: Prisma.XOR<Prisma.KycSubmissionCreateWithoutConsentInput, Prisma.KycSubmissionUncheckedCreateWithoutConsentInput>;
    where?: Prisma.KycSubmissionWhereInput;
};
export type KycSubmissionUpdateToOneWithWhereWithoutConsentInput = {
    where?: Prisma.KycSubmissionWhereInput;
    data: Prisma.XOR<Prisma.KycSubmissionUpdateWithoutConsentInput, Prisma.KycSubmissionUncheckedUpdateWithoutConsentInput>;
};
export type KycSubmissionUpdateWithoutConsentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutKycSubmissionsNestedInput;
    decidedBy?: Prisma.AccountUpdateOneWithoutKycDecisionsNestedInput;
    documents?: Prisma.KycDocumentUpdateManyWithoutSubmissionNestedInput;
};
export type KycSubmissionUncheckedUpdateWithoutConsentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documents?: Prisma.KycDocumentUncheckedUpdateManyWithoutSubmissionNestedInput;
};
export type KycSubmissionCreateManyAccountInput = {
    id?: bigint | number;
    publicId?: string;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    decidedByAccountId?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KycSubmissionCreateManyDecidedByInput = {
    id?: bigint | number;
    publicId?: string;
    accountId: bigint | number;
    status?: string;
    idType: string;
    idNumberEnc: runtime.Bytes;
    idNumberHash: string;
    attempts?: number;
    rejectionReason?: string | null;
    submittedAt?: Date | string | null;
    decidedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KycSubmissionUpdateWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decidedBy?: Prisma.AccountUpdateOneWithoutKycDecisionsNestedInput;
    documents?: Prisma.KycDocumentUpdateManyWithoutSubmissionNestedInput;
    consent?: Prisma.KycConsentUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documents?: Prisma.KycDocumentUncheckedUpdateManyWithoutSubmissionNestedInput;
    consent?: Prisma.KycConsentUncheckedUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedByAccountId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycSubmissionUpdateWithoutDecidedByInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutKycSubmissionsNestedInput;
    documents?: Prisma.KycDocumentUpdateManyWithoutSubmissionNestedInput;
    consent?: Prisma.KycConsentUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionUncheckedUpdateWithoutDecidedByInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documents?: Prisma.KycDocumentUncheckedUpdateManyWithoutSubmissionNestedInput;
    consent?: Prisma.KycConsentUncheckedUpdateOneWithoutSubmissionNestedInput;
};
export type KycSubmissionUncheckedUpdateManyWithoutDecidedByInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    idType?: Prisma.StringFieldUpdateOperationsInput | string;
    idNumberEnc?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    idNumberHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decidedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KycSubmissionCountOutputType = {
    documents: number;
};
export type KycSubmissionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    documents?: boolean | KycSubmissionCountOutputTypeCountDocumentsArgs;
};
export type KycSubmissionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionCountOutputTypeSelect<ExtArgs> | null;
};
export type KycSubmissionCountOutputTypeCountDocumentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycDocumentWhereInput;
};
export type KycSubmissionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    accountId?: boolean;
    status?: boolean;
    idType?: boolean;
    idNumberEnc?: boolean;
    idNumberHash?: boolean;
    attempts?: boolean;
    rejectionReason?: boolean;
    submittedAt?: boolean;
    decidedAt?: boolean;
    decidedByAccountId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    decidedBy?: boolean | Prisma.KycSubmission$decidedByArgs<ExtArgs>;
    documents?: boolean | Prisma.KycSubmission$documentsArgs<ExtArgs>;
    consent?: boolean | Prisma.KycSubmission$consentArgs<ExtArgs>;
    _count?: boolean | Prisma.KycSubmissionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["kycSubmission"]>;
export type KycSubmissionSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    accountId?: boolean;
    status?: boolean;
    idType?: boolean;
    idNumberEnc?: boolean;
    idNumberHash?: boolean;
    attempts?: boolean;
    rejectionReason?: boolean;
    submittedAt?: boolean;
    decidedAt?: boolean;
    decidedByAccountId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type KycSubmissionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "accountId" | "status" | "idType" | "idNumberEnc" | "idNumberHash" | "attempts" | "rejectionReason" | "submittedAt" | "decidedAt" | "decidedByAccountId" | "createdAt" | "updatedAt", ExtArgs["result"]["kycSubmission"]>;
export type KycSubmissionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    decidedBy?: boolean | Prisma.KycSubmission$decidedByArgs<ExtArgs>;
    documents?: boolean | Prisma.KycSubmission$documentsArgs<ExtArgs>;
    consent?: boolean | Prisma.KycSubmission$consentArgs<ExtArgs>;
    _count?: boolean | Prisma.KycSubmissionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $KycSubmissionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KycSubmission";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
        decidedBy: Prisma.$AccountPayload<ExtArgs> | null;
        documents: Prisma.$KycDocumentPayload<ExtArgs>[];
        consent: Prisma.$KycConsentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        publicId: string;
        accountId: bigint;
        status: string;
        idType: string;
        idNumberEnc: runtime.Bytes;
        idNumberHash: string;
        attempts: number;
        rejectionReason: string | null;
        submittedAt: Date | null;
        decidedAt: Date | null;
        decidedByAccountId: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["kycSubmission"]>;
    composites: {};
};
export type KycSubmissionGetPayload<S extends boolean | null | undefined | KycSubmissionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload, S>;
export type KycSubmissionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KycSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KycSubmissionCountAggregateInputType | true;
};
export interface KycSubmissionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KycSubmission'];
        meta: {
            name: 'KycSubmission';
        };
    };
    findUnique<T extends KycSubmissionFindUniqueArgs>(args: Prisma.SelectSubset<T, KycSubmissionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends KycSubmissionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KycSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends KycSubmissionFindFirstArgs>(args?: Prisma.SelectSubset<T, KycSubmissionFindFirstArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends KycSubmissionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KycSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends KycSubmissionFindManyArgs>(args?: Prisma.SelectSubset<T, KycSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends KycSubmissionCreateArgs>(args: Prisma.SelectSubset<T, KycSubmissionCreateArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends KycSubmissionCreateManyArgs>(args?: Prisma.SelectSubset<T, KycSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends KycSubmissionDeleteArgs>(args: Prisma.SelectSubset<T, KycSubmissionDeleteArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends KycSubmissionUpdateArgs>(args: Prisma.SelectSubset<T, KycSubmissionUpdateArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends KycSubmissionDeleteManyArgs>(args?: Prisma.SelectSubset<T, KycSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends KycSubmissionUpdateManyArgs>(args: Prisma.SelectSubset<T, KycSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends KycSubmissionUpsertArgs>(args: Prisma.SelectSubset<T, KycSubmissionUpsertArgs<ExtArgs>>): Prisma.Prisma__KycSubmissionClient<runtime.Types.Result.GetResult<Prisma.$KycSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends KycSubmissionCountArgs>(args?: Prisma.Subset<T, KycSubmissionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KycSubmissionCountAggregateOutputType> : number>;
    aggregate<T extends KycSubmissionAggregateArgs>(args: Prisma.Subset<T, KycSubmissionAggregateArgs>): Prisma.PrismaPromise<GetKycSubmissionAggregateType<T>>;
    groupBy<T extends KycSubmissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KycSubmissionGroupByArgs['orderBy'];
    } : {
        orderBy?: KycSubmissionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KycSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKycSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: KycSubmissionFieldRefs;
}
export interface Prisma__KycSubmissionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    decidedBy<T extends Prisma.KycSubmission$decidedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KycSubmission$decidedByArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    documents<T extends Prisma.KycSubmission$documentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KycSubmission$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    consent<T extends Prisma.KycSubmission$consentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KycSubmission$consentArgs<ExtArgs>>): Prisma.Prisma__KycConsentClient<runtime.Types.Result.GetResult<Prisma.$KycConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface KycSubmissionFieldRefs {
    readonly id: Prisma.FieldRef<"KycSubmission", 'BigInt'>;
    readonly publicId: Prisma.FieldRef<"KycSubmission", 'String'>;
    readonly accountId: Prisma.FieldRef<"KycSubmission", 'BigInt'>;
    readonly status: Prisma.FieldRef<"KycSubmission", 'String'>;
    readonly idType: Prisma.FieldRef<"KycSubmission", 'String'>;
    readonly idNumberEnc: Prisma.FieldRef<"KycSubmission", 'Bytes'>;
    readonly idNumberHash: Prisma.FieldRef<"KycSubmission", 'String'>;
    readonly attempts: Prisma.FieldRef<"KycSubmission", 'Int'>;
    readonly rejectionReason: Prisma.FieldRef<"KycSubmission", 'String'>;
    readonly submittedAt: Prisma.FieldRef<"KycSubmission", 'DateTime'>;
    readonly decidedAt: Prisma.FieldRef<"KycSubmission", 'DateTime'>;
    readonly decidedByAccountId: Prisma.FieldRef<"KycSubmission", 'BigInt'>;
    readonly createdAt: Prisma.FieldRef<"KycSubmission", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"KycSubmission", 'DateTime'>;
}
export type KycSubmissionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    where: Prisma.KycSubmissionWhereUniqueInput;
};
export type KycSubmissionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    where: Prisma.KycSubmissionWhereUniqueInput;
};
export type KycSubmissionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    where?: Prisma.KycSubmissionWhereInput;
    orderBy?: Prisma.KycSubmissionOrderByWithRelationInput | Prisma.KycSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.KycSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycSubmissionScalarFieldEnum | Prisma.KycSubmissionScalarFieldEnum[];
};
export type KycSubmissionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    where?: Prisma.KycSubmissionWhereInput;
    orderBy?: Prisma.KycSubmissionOrderByWithRelationInput | Prisma.KycSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.KycSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycSubmissionScalarFieldEnum | Prisma.KycSubmissionScalarFieldEnum[];
};
export type KycSubmissionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    where?: Prisma.KycSubmissionWhereInput;
    orderBy?: Prisma.KycSubmissionOrderByWithRelationInput | Prisma.KycSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.KycSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KycSubmissionScalarFieldEnum | Prisma.KycSubmissionScalarFieldEnum[];
};
export type KycSubmissionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycSubmissionCreateInput, Prisma.KycSubmissionUncheckedCreateInput>;
};
export type KycSubmissionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.KycSubmissionCreateManyInput | Prisma.KycSubmissionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type KycSubmissionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KycSubmissionUpdateInput, Prisma.KycSubmissionUncheckedUpdateInput>;
    where: Prisma.KycSubmissionWhereUniqueInput;
};
export type KycSubmissionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.KycSubmissionUpdateManyMutationInput, Prisma.KycSubmissionUncheckedUpdateManyInput>;
    where?: Prisma.KycSubmissionWhereInput;
    limit?: number;
};
export type KycSubmissionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    where: Prisma.KycSubmissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.KycSubmissionCreateInput, Prisma.KycSubmissionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.KycSubmissionUpdateInput, Prisma.KycSubmissionUncheckedUpdateInput>;
};
export type KycSubmissionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
    where: Prisma.KycSubmissionWhereUniqueInput;
};
export type KycSubmissionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KycSubmissionWhereInput;
    limit?: number;
};
export type KycSubmission$decidedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
};
export type KycSubmission$documentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type KycSubmission$consentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycConsentSelect<ExtArgs> | null;
    omit?: Prisma.KycConsentOmit<ExtArgs> | null;
    include?: Prisma.KycConsentInclude<ExtArgs> | null;
    where?: Prisma.KycConsentWhereInput;
};
export type KycSubmissionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KycSubmissionSelect<ExtArgs> | null;
    omit?: Prisma.KycSubmissionOmit<ExtArgs> | null;
    include?: Prisma.KycSubmissionInclude<ExtArgs> | null;
};
