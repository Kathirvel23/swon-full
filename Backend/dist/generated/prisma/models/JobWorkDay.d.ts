import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type JobWorkDayModel = runtime.Types.Result.DefaultSelection<Prisma.$JobWorkDayPayload>;
export type AggregateJobWorkDay = {
    _count: JobWorkDayCountAggregateOutputType | null;
    _avg: JobWorkDayAvgAggregateOutputType | null;
    _sum: JobWorkDaySumAggregateOutputType | null;
    _min: JobWorkDayMinAggregateOutputType | null;
    _max: JobWorkDayMaxAggregateOutputType | null;
};
export type JobWorkDayAvgAggregateOutputType = {
    id: number | null;
    jobId: number | null;
    headcount: number | null;
};
export type JobWorkDaySumAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    headcount: number | null;
};
export type JobWorkDayMinAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    workDate: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    headcount: number | null;
};
export type JobWorkDayMaxAggregateOutputType = {
    id: bigint | null;
    jobId: bigint | null;
    workDate: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    headcount: number | null;
};
export type JobWorkDayCountAggregateOutputType = {
    id: number;
    jobId: number;
    workDate: number;
    startTime: number;
    endTime: number;
    headcount: number;
    _all: number;
};
export type JobWorkDayAvgAggregateInputType = {
    id?: true;
    jobId?: true;
    headcount?: true;
};
export type JobWorkDaySumAggregateInputType = {
    id?: true;
    jobId?: true;
    headcount?: true;
};
export type JobWorkDayMinAggregateInputType = {
    id?: true;
    jobId?: true;
    workDate?: true;
    startTime?: true;
    endTime?: true;
    headcount?: true;
};
export type JobWorkDayMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    workDate?: true;
    startTime?: true;
    endTime?: true;
    headcount?: true;
};
export type JobWorkDayCountAggregateInputType = {
    id?: true;
    jobId?: true;
    workDate?: true;
    startTime?: true;
    endTime?: true;
    headcount?: true;
    _all?: true;
};
export type JobWorkDayAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWorkDayWhereInput;
    orderBy?: Prisma.JobWorkDayOrderByWithRelationInput | Prisma.JobWorkDayOrderByWithRelationInput[];
    cursor?: Prisma.JobWorkDayWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobWorkDayCountAggregateInputType;
    _avg?: JobWorkDayAvgAggregateInputType;
    _sum?: JobWorkDaySumAggregateInputType;
    _min?: JobWorkDayMinAggregateInputType;
    _max?: JobWorkDayMaxAggregateInputType;
};
export type GetJobWorkDayAggregateType<T extends JobWorkDayAggregateArgs> = {
    [P in keyof T & keyof AggregateJobWorkDay]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobWorkDay[P]> : Prisma.GetScalarType<T[P], AggregateJobWorkDay[P]>;
};
export type JobWorkDayGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWorkDayWhereInput;
    orderBy?: Prisma.JobWorkDayOrderByWithAggregationInput | Prisma.JobWorkDayOrderByWithAggregationInput[];
    by: Prisma.JobWorkDayScalarFieldEnum[] | Prisma.JobWorkDayScalarFieldEnum;
    having?: Prisma.JobWorkDayScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobWorkDayCountAggregateInputType | true;
    _avg?: JobWorkDayAvgAggregateInputType;
    _sum?: JobWorkDaySumAggregateInputType;
    _min?: JobWorkDayMinAggregateInputType;
    _max?: JobWorkDayMaxAggregateInputType;
};
export type JobWorkDayGroupByOutputType = {
    id: bigint;
    jobId: bigint;
    workDate: Date;
    startTime: Date;
    endTime: Date;
    headcount: number | null;
    _count: JobWorkDayCountAggregateOutputType | null;
    _avg: JobWorkDayAvgAggregateOutputType | null;
    _sum: JobWorkDaySumAggregateOutputType | null;
    _min: JobWorkDayMinAggregateOutputType | null;
    _max: JobWorkDayMaxAggregateOutputType | null;
};
export type GetJobWorkDayGroupByPayload<T extends JobWorkDayGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobWorkDayGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobWorkDayGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobWorkDayGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobWorkDayGroupByOutputType[P]>;
}>>;
export type JobWorkDayWhereInput = {
    AND?: Prisma.JobWorkDayWhereInput | Prisma.JobWorkDayWhereInput[];
    OR?: Prisma.JobWorkDayWhereInput[];
    NOT?: Prisma.JobWorkDayWhereInput | Prisma.JobWorkDayWhereInput[];
    id?: Prisma.BigIntFilter<"JobWorkDay"> | bigint | number;
    jobId?: Prisma.BigIntFilter<"JobWorkDay"> | bigint | number;
    workDate?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    startTime?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    headcount?: Prisma.IntNullableFilter<"JobWorkDay"> | number | null;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    attendances?: Prisma.AttendanceRecordListRelationFilter;
};
export type JobWorkDayOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    headcount?: Prisma.SortOrderInput | Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    attendances?: Prisma.AttendanceRecordOrderByRelationAggregateInput;
};
export type JobWorkDayWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    jobId_workDate?: Prisma.JobWorkDayJobIdWorkDateCompoundUniqueInput;
    AND?: Prisma.JobWorkDayWhereInput | Prisma.JobWorkDayWhereInput[];
    OR?: Prisma.JobWorkDayWhereInput[];
    NOT?: Prisma.JobWorkDayWhereInput | Prisma.JobWorkDayWhereInput[];
    jobId?: Prisma.BigIntFilter<"JobWorkDay"> | bigint | number;
    workDate?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    startTime?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    headcount?: Prisma.IntNullableFilter<"JobWorkDay"> | number | null;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    attendances?: Prisma.AttendanceRecordListRelationFilter;
}, "id" | "jobId_workDate">;
export type JobWorkDayOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    headcount?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.JobWorkDayCountOrderByAggregateInput;
    _avg?: Prisma.JobWorkDayAvgOrderByAggregateInput;
    _max?: Prisma.JobWorkDayMaxOrderByAggregateInput;
    _min?: Prisma.JobWorkDayMinOrderByAggregateInput;
    _sum?: Prisma.JobWorkDaySumOrderByAggregateInput;
};
export type JobWorkDayScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobWorkDayScalarWhereWithAggregatesInput | Prisma.JobWorkDayScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobWorkDayScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobWorkDayScalarWhereWithAggregatesInput | Prisma.JobWorkDayScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"JobWorkDay"> | bigint | number;
    jobId?: Prisma.BigIntWithAggregatesFilter<"JobWorkDay"> | bigint | number;
    workDate?: Prisma.DateTimeWithAggregatesFilter<"JobWorkDay"> | Date | string;
    startTime?: Prisma.DateTimeWithAggregatesFilter<"JobWorkDay"> | Date | string;
    endTime?: Prisma.DateTimeWithAggregatesFilter<"JobWorkDay"> | Date | string;
    headcount?: Prisma.IntNullableWithAggregatesFilter<"JobWorkDay"> | number | null;
};
export type JobWorkDayCreateInput = {
    id?: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
    job: Prisma.JobCreateNestedOneWithoutWorkDaysInput;
    attendances?: Prisma.AttendanceRecordCreateNestedManyWithoutWorkDayInput;
};
export type JobWorkDayUncheckedCreateInput = {
    id?: bigint | number;
    jobId: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
    attendances?: Prisma.AttendanceRecordUncheckedCreateNestedManyWithoutWorkDayInput;
};
export type JobWorkDayUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    job?: Prisma.JobUpdateOneRequiredWithoutWorkDaysNestedInput;
    attendances?: Prisma.AttendanceRecordUpdateManyWithoutWorkDayNestedInput;
};
export type JobWorkDayUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    attendances?: Prisma.AttendanceRecordUncheckedUpdateManyWithoutWorkDayNestedInput;
};
export type JobWorkDayCreateManyInput = {
    id?: bigint | number;
    jobId: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
};
export type JobWorkDayUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type JobWorkDayUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type JobWorkDayListRelationFilter = {
    every?: Prisma.JobWorkDayWhereInput;
    some?: Prisma.JobWorkDayWhereInput;
    none?: Prisma.JobWorkDayWhereInput;
};
export type JobWorkDayOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobWorkDayJobIdWorkDateCompoundUniqueInput = {
    jobId: bigint | number;
    workDate: Date | string;
};
export type JobWorkDayCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    headcount?: Prisma.SortOrder;
};
export type JobWorkDayAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    headcount?: Prisma.SortOrder;
};
export type JobWorkDayMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    headcount?: Prisma.SortOrder;
};
export type JobWorkDayMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    workDate?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    headcount?: Prisma.SortOrder;
};
export type JobWorkDaySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    headcount?: Prisma.SortOrder;
};
export type JobWorkDayScalarRelationFilter = {
    is?: Prisma.JobWorkDayWhereInput;
    isNot?: Prisma.JobWorkDayWhereInput;
};
export type JobWorkDayCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobWorkDayCreateWithoutJobInput, Prisma.JobWorkDayUncheckedCreateWithoutJobInput> | Prisma.JobWorkDayCreateWithoutJobInput[] | Prisma.JobWorkDayUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWorkDayCreateOrConnectWithoutJobInput | Prisma.JobWorkDayCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobWorkDayCreateManyJobInputEnvelope;
    connect?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
};
export type JobWorkDayUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobWorkDayCreateWithoutJobInput, Prisma.JobWorkDayUncheckedCreateWithoutJobInput> | Prisma.JobWorkDayCreateWithoutJobInput[] | Prisma.JobWorkDayUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWorkDayCreateOrConnectWithoutJobInput | Prisma.JobWorkDayCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobWorkDayCreateManyJobInputEnvelope;
    connect?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
};
export type JobWorkDayUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobWorkDayCreateWithoutJobInput, Prisma.JobWorkDayUncheckedCreateWithoutJobInput> | Prisma.JobWorkDayCreateWithoutJobInput[] | Prisma.JobWorkDayUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWorkDayCreateOrConnectWithoutJobInput | Prisma.JobWorkDayCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobWorkDayUpsertWithWhereUniqueWithoutJobInput | Prisma.JobWorkDayUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobWorkDayCreateManyJobInputEnvelope;
    set?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    disconnect?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    delete?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    connect?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    update?: Prisma.JobWorkDayUpdateWithWhereUniqueWithoutJobInput | Prisma.JobWorkDayUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobWorkDayUpdateManyWithWhereWithoutJobInput | Prisma.JobWorkDayUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobWorkDayScalarWhereInput | Prisma.JobWorkDayScalarWhereInput[];
};
export type JobWorkDayUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobWorkDayCreateWithoutJobInput, Prisma.JobWorkDayUncheckedCreateWithoutJobInput> | Prisma.JobWorkDayCreateWithoutJobInput[] | Prisma.JobWorkDayUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobWorkDayCreateOrConnectWithoutJobInput | Prisma.JobWorkDayCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobWorkDayUpsertWithWhereUniqueWithoutJobInput | Prisma.JobWorkDayUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobWorkDayCreateManyJobInputEnvelope;
    set?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    disconnect?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    delete?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    connect?: Prisma.JobWorkDayWhereUniqueInput | Prisma.JobWorkDayWhereUniqueInput[];
    update?: Prisma.JobWorkDayUpdateWithWhereUniqueWithoutJobInput | Prisma.JobWorkDayUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobWorkDayUpdateManyWithWhereWithoutJobInput | Prisma.JobWorkDayUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobWorkDayScalarWhereInput | Prisma.JobWorkDayScalarWhereInput[];
};
export type JobWorkDayCreateNestedOneWithoutAttendancesInput = {
    create?: Prisma.XOR<Prisma.JobWorkDayCreateWithoutAttendancesInput, Prisma.JobWorkDayUncheckedCreateWithoutAttendancesInput>;
    connectOrCreate?: Prisma.JobWorkDayCreateOrConnectWithoutAttendancesInput;
    connect?: Prisma.JobWorkDayWhereUniqueInput;
};
export type JobWorkDayUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: Prisma.XOR<Prisma.JobWorkDayCreateWithoutAttendancesInput, Prisma.JobWorkDayUncheckedCreateWithoutAttendancesInput>;
    connectOrCreate?: Prisma.JobWorkDayCreateOrConnectWithoutAttendancesInput;
    upsert?: Prisma.JobWorkDayUpsertWithoutAttendancesInput;
    connect?: Prisma.JobWorkDayWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.JobWorkDayUpdateToOneWithWhereWithoutAttendancesInput, Prisma.JobWorkDayUpdateWithoutAttendancesInput>, Prisma.JobWorkDayUncheckedUpdateWithoutAttendancesInput>;
};
export type JobWorkDayCreateWithoutJobInput = {
    id?: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
    attendances?: Prisma.AttendanceRecordCreateNestedManyWithoutWorkDayInput;
};
export type JobWorkDayUncheckedCreateWithoutJobInput = {
    id?: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
    attendances?: Prisma.AttendanceRecordUncheckedCreateNestedManyWithoutWorkDayInput;
};
export type JobWorkDayCreateOrConnectWithoutJobInput = {
    where: Prisma.JobWorkDayWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobWorkDayCreateWithoutJobInput, Prisma.JobWorkDayUncheckedCreateWithoutJobInput>;
};
export type JobWorkDayCreateManyJobInputEnvelope = {
    data: Prisma.JobWorkDayCreateManyJobInput | Prisma.JobWorkDayCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type JobWorkDayUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobWorkDayWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobWorkDayUpdateWithoutJobInput, Prisma.JobWorkDayUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.JobWorkDayCreateWithoutJobInput, Prisma.JobWorkDayUncheckedCreateWithoutJobInput>;
};
export type JobWorkDayUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobWorkDayWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobWorkDayUpdateWithoutJobInput, Prisma.JobWorkDayUncheckedUpdateWithoutJobInput>;
};
export type JobWorkDayUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.JobWorkDayScalarWhereInput;
    data: Prisma.XOR<Prisma.JobWorkDayUpdateManyMutationInput, Prisma.JobWorkDayUncheckedUpdateManyWithoutJobInput>;
};
export type JobWorkDayScalarWhereInput = {
    AND?: Prisma.JobWorkDayScalarWhereInput | Prisma.JobWorkDayScalarWhereInput[];
    OR?: Prisma.JobWorkDayScalarWhereInput[];
    NOT?: Prisma.JobWorkDayScalarWhereInput | Prisma.JobWorkDayScalarWhereInput[];
    id?: Prisma.BigIntFilter<"JobWorkDay"> | bigint | number;
    jobId?: Prisma.BigIntFilter<"JobWorkDay"> | bigint | number;
    workDate?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    startTime?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"JobWorkDay"> | Date | string;
    headcount?: Prisma.IntNullableFilter<"JobWorkDay"> | number | null;
};
export type JobWorkDayCreateWithoutAttendancesInput = {
    id?: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
    job: Prisma.JobCreateNestedOneWithoutWorkDaysInput;
};
export type JobWorkDayUncheckedCreateWithoutAttendancesInput = {
    id?: bigint | number;
    jobId: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
};
export type JobWorkDayCreateOrConnectWithoutAttendancesInput = {
    where: Prisma.JobWorkDayWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobWorkDayCreateWithoutAttendancesInput, Prisma.JobWorkDayUncheckedCreateWithoutAttendancesInput>;
};
export type JobWorkDayUpsertWithoutAttendancesInput = {
    update: Prisma.XOR<Prisma.JobWorkDayUpdateWithoutAttendancesInput, Prisma.JobWorkDayUncheckedUpdateWithoutAttendancesInput>;
    create: Prisma.XOR<Prisma.JobWorkDayCreateWithoutAttendancesInput, Prisma.JobWorkDayUncheckedCreateWithoutAttendancesInput>;
    where?: Prisma.JobWorkDayWhereInput;
};
export type JobWorkDayUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: Prisma.JobWorkDayWhereInput;
    data: Prisma.XOR<Prisma.JobWorkDayUpdateWithoutAttendancesInput, Prisma.JobWorkDayUncheckedUpdateWithoutAttendancesInput>;
};
export type JobWorkDayUpdateWithoutAttendancesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    job?: Prisma.JobUpdateOneRequiredWithoutWorkDaysNestedInput;
};
export type JobWorkDayUncheckedUpdateWithoutAttendancesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jobId?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type JobWorkDayCreateManyJobInput = {
    id?: bigint | number;
    workDate: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    headcount?: number | null;
};
export type JobWorkDayUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    attendances?: Prisma.AttendanceRecordUpdateManyWithoutWorkDayNestedInput;
};
export type JobWorkDayUncheckedUpdateWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    attendances?: Prisma.AttendanceRecordUncheckedUpdateManyWithoutWorkDayNestedInput;
};
export type JobWorkDayUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    workDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    headcount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type JobWorkDayCountOutputType = {
    attendances: number;
};
export type JobWorkDayCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attendances?: boolean | JobWorkDayCountOutputTypeCountAttendancesArgs;
};
export type JobWorkDayCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDayCountOutputTypeSelect<ExtArgs> | null;
};
export type JobWorkDayCountOutputTypeCountAttendancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceRecordWhereInput;
};
export type JobWorkDaySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    workDate?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    headcount?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    attendances?: boolean | Prisma.JobWorkDay$attendancesArgs<ExtArgs>;
    _count?: boolean | Prisma.JobWorkDayCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobWorkDay"]>;
export type JobWorkDaySelectScalar = {
    id?: boolean;
    jobId?: boolean;
    workDate?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    headcount?: boolean;
};
export type JobWorkDayOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "workDate" | "startTime" | "endTime" | "headcount", ExtArgs["result"]["jobWorkDay"]>;
export type JobWorkDayInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    attendances?: boolean | Prisma.JobWorkDay$attendancesArgs<ExtArgs>;
    _count?: boolean | Prisma.JobWorkDayCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $JobWorkDayPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobWorkDay";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        attendances: Prisma.$AttendanceRecordPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        jobId: bigint;
        workDate: Date;
        startTime: Date;
        endTime: Date;
        headcount: number | null;
    }, ExtArgs["result"]["jobWorkDay"]>;
    composites: {};
};
export type JobWorkDayGetPayload<S extends boolean | null | undefined | JobWorkDayDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload, S>;
export type JobWorkDayCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobWorkDayFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobWorkDayCountAggregateInputType | true;
};
export interface JobWorkDayDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobWorkDay'];
        meta: {
            name: 'JobWorkDay';
        };
    };
    findUnique<T extends JobWorkDayFindUniqueArgs>(args: Prisma.SelectSubset<T, JobWorkDayFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobWorkDayFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobWorkDayFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobWorkDayFindFirstArgs>(args?: Prisma.SelectSubset<T, JobWorkDayFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobWorkDayFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobWorkDayFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobWorkDayFindManyArgs>(args?: Prisma.SelectSubset<T, JobWorkDayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobWorkDayCreateArgs>(args: Prisma.SelectSubset<T, JobWorkDayCreateArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobWorkDayCreateManyArgs>(args?: Prisma.SelectSubset<T, JobWorkDayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends JobWorkDayDeleteArgs>(args: Prisma.SelectSubset<T, JobWorkDayDeleteArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobWorkDayUpdateArgs>(args: Prisma.SelectSubset<T, JobWorkDayUpdateArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobWorkDayDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobWorkDayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobWorkDayUpdateManyArgs>(args: Prisma.SelectSubset<T, JobWorkDayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends JobWorkDayUpsertArgs>(args: Prisma.SelectSubset<T, JobWorkDayUpsertArgs<ExtArgs>>): Prisma.Prisma__JobWorkDayClient<runtime.Types.Result.GetResult<Prisma.$JobWorkDayPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobWorkDayCountArgs>(args?: Prisma.Subset<T, JobWorkDayCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobWorkDayCountAggregateOutputType> : number>;
    aggregate<T extends JobWorkDayAggregateArgs>(args: Prisma.Subset<T, JobWorkDayAggregateArgs>): Prisma.PrismaPromise<GetJobWorkDayAggregateType<T>>;
    groupBy<T extends JobWorkDayGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobWorkDayGroupByArgs['orderBy'];
    } : {
        orderBy?: JobWorkDayGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobWorkDayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobWorkDayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobWorkDayFieldRefs;
}
export interface Prisma__JobWorkDayClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    attendances<T extends Prisma.JobWorkDay$attendancesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobWorkDay$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobWorkDayFieldRefs {
    readonly id: Prisma.FieldRef<"JobWorkDay", 'BigInt'>;
    readonly jobId: Prisma.FieldRef<"JobWorkDay", 'BigInt'>;
    readonly workDate: Prisma.FieldRef<"JobWorkDay", 'DateTime'>;
    readonly startTime: Prisma.FieldRef<"JobWorkDay", 'DateTime'>;
    readonly endTime: Prisma.FieldRef<"JobWorkDay", 'DateTime'>;
    readonly headcount: Prisma.FieldRef<"JobWorkDay", 'Int'>;
}
export type JobWorkDayFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    where: Prisma.JobWorkDayWhereUniqueInput;
};
export type JobWorkDayFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    where: Prisma.JobWorkDayWhereUniqueInput;
};
export type JobWorkDayFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    where?: Prisma.JobWorkDayWhereInput;
    orderBy?: Prisma.JobWorkDayOrderByWithRelationInput | Prisma.JobWorkDayOrderByWithRelationInput[];
    cursor?: Prisma.JobWorkDayWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobWorkDayScalarFieldEnum | Prisma.JobWorkDayScalarFieldEnum[];
};
export type JobWorkDayFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    where?: Prisma.JobWorkDayWhereInput;
    orderBy?: Prisma.JobWorkDayOrderByWithRelationInput | Prisma.JobWorkDayOrderByWithRelationInput[];
    cursor?: Prisma.JobWorkDayWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobWorkDayScalarFieldEnum | Prisma.JobWorkDayScalarFieldEnum[];
};
export type JobWorkDayFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    where?: Prisma.JobWorkDayWhereInput;
    orderBy?: Prisma.JobWorkDayOrderByWithRelationInput | Prisma.JobWorkDayOrderByWithRelationInput[];
    cursor?: Prisma.JobWorkDayWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobWorkDayScalarFieldEnum | Prisma.JobWorkDayScalarFieldEnum[];
};
export type JobWorkDayCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobWorkDayCreateInput, Prisma.JobWorkDayUncheckedCreateInput>;
};
export type JobWorkDayCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobWorkDayCreateManyInput | Prisma.JobWorkDayCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobWorkDayUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobWorkDayUpdateInput, Prisma.JobWorkDayUncheckedUpdateInput>;
    where: Prisma.JobWorkDayWhereUniqueInput;
};
export type JobWorkDayUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobWorkDayUpdateManyMutationInput, Prisma.JobWorkDayUncheckedUpdateManyInput>;
    where?: Prisma.JobWorkDayWhereInput;
    limit?: number;
};
export type JobWorkDayUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    where: Prisma.JobWorkDayWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobWorkDayCreateInput, Prisma.JobWorkDayUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobWorkDayUpdateInput, Prisma.JobWorkDayUncheckedUpdateInput>;
};
export type JobWorkDayDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
    where: Prisma.JobWorkDayWhereUniqueInput;
};
export type JobWorkDayDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWorkDayWhereInput;
    limit?: number;
};
export type JobWorkDay$attendancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceRecordSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceRecordOmit<ExtArgs> | null;
    include?: Prisma.AttendanceRecordInclude<ExtArgs> | null;
    where?: Prisma.AttendanceRecordWhereInput;
    orderBy?: Prisma.AttendanceRecordOrderByWithRelationInput | Prisma.AttendanceRecordOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendanceRecordScalarFieldEnum | Prisma.AttendanceRecordScalarFieldEnum[];
};
export type JobWorkDayDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobWorkDaySelect<ExtArgs> | null;
    omit?: Prisma.JobWorkDayOmit<ExtArgs> | null;
    include?: Prisma.JobWorkDayInclude<ExtArgs> | null;
};
