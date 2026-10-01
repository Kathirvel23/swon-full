import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Account: 'Account',
    WorkerProfile: 'WorkerProfile',
    EmployerProfile: 'EmployerProfile',
    KycSubmission: 'KycSubmission',
    KycDocument: 'KycDocument',
    KycConsent: 'KycConsent',
    DocumentAccessLog: 'DocumentAccessLog',
    Session: 'Session',
    OtpChallenge: 'OtpChallenge',
    PushToken: 'PushToken',
    Area: 'Area',
    JobCategory: 'JobCategory',
    Skill: 'Skill',
    WelfareItem: 'WelfareItem',
    WorkerSkill: 'WorkerSkill',
    Job: 'Job',
    JobWorkDay: 'JobWorkDay',
    JobSkill: 'JobSkill',
    JobWelfare: 'JobWelfare',
    Application: 'Application',
    QuickMatchOffer: 'QuickMatchOffer',
    CrewMember: 'CrewMember',
    AttendanceRecord: 'AttendanceRecord',
    Earning: 'Earning',
    PaymentTransaction: 'PaymentTransaction',
    PaymentEarning: 'PaymentEarning',
    Rating: 'Rating',
    Notification: 'Notification',
    Complaint: 'Complaint',
    ComplaintEvent: 'ComplaintEvent',
    AvailabilitySlot: 'AvailabilitySlot',
    NotificationOutbox: 'NotificationOutbox',
    NotificationDelivery: 'NotificationDelivery',
    NotificationPref: 'NotificationPref',
    SmsLog: 'SmsLog',
    AuditLog: 'AuditLog',
    Sanction: 'Sanction',
    PlatformConfig: 'PlatformConfig',
    IdempotencyKey: 'IdempotencyKey',
    MatchLog: 'MatchLog'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const AccountScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    phone: 'phone',
    role: 'role',
    status: 'status',
    phoneVerifiedAt: 'phoneVerifiedAt',
    lastLoginAt: 'lastLoginAt',
    closedAt: 'closedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const WorkerProfileScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    accountId: 'accountId',
    fullName: 'fullName',
    photoStorageKey: 'photoStorageKey',
    city: 'city',
    areaId: 'areaId',
    bio: 'bio',
    experienceYears: 'experienceYears',
    openToWork: 'openToWork',
    avgRatingMilli: 'avgRatingMilli',
    ratingsCount: 'ratingsCount',
    jobsDoneCount: 'jobsDoneCount',
    attendanceRateMilli: 'attendanceRateMilli',
    profileCompletePct: 'profileCompletePct',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const EmployerProfileScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    accountId: 'accountId',
    orgName: 'orgName',
    orgType: 'orgType',
    contactName: 'contactName',
    city: 'city',
    areaId: 'areaId',
    addressLine: 'addressLine',
    panRef: 'panRef',
    gstin: 'gstin',
    verificationStatus: 'verificationStatus',
    welfareDefaults: 'welfareDefaults',
    avgRatingMilli: 'avgRatingMilli',
    ratingsCount: 'ratingsCount',
    jobsPostedCount: 'jobsPostedCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const KycSubmissionScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    accountId: 'accountId',
    status: 'status',
    idType: 'idType',
    idNumberEnc: 'idNumberEnc',
    idNumberHash: 'idNumberHash',
    attempts: 'attempts',
    rejectionReason: 'rejectionReason',
    submittedAt: 'submittedAt',
    decidedAt: 'decidedAt',
    decidedByAccountId: 'decidedByAccountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const KycDocumentScalarFieldEnum = {
    id: 'id',
    submissionId: 'submissionId',
    docType: 'docType',
    storageKey: 'storageKey',
    contentSha: 'contentSha',
    mime: 'mime',
    sizeBytes: 'sizeBytes',
    createdAt: 'createdAt'
};
export const KycConsentScalarFieldEnum = {
    id: 'id',
    submissionId: 'submissionId',
    consentVer: 'consentVer',
    grantedAt: 'grantedAt',
    ipHash: 'ipHash',
    textSnapshot: 'textSnapshot'
};
export const DocumentAccessLogScalarFieldEnum = {
    id: 'id',
    documentId: 'documentId',
    actorId: 'actorId',
    action: 'action',
    at: 'at',
    ipHash: 'ipHash'
};
export const SessionScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    accountId: 'accountId',
    refreshTokenHash: 'refreshTokenHash',
    familyId: 'familyId',
    userAgent: 'userAgent',
    ipHash: 'ipHash',
    issuedAt: 'issuedAt',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    lastUsedAt: 'lastUsedAt'
};
export const OtpChallengeScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    phone: 'phone',
    purpose: 'purpose',
    codeHash: 'codeHash',
    attempts: 'attempts',
    maxAttempts: 'maxAttempts',
    expiresAt: 'expiresAt',
    cooldownUntil: 'cooldownUntil',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
};
export const PushTokenScalarFieldEnum = {
    id: 'id',
    accountId: 'accountId',
    platform: 'platform',
    token: 'token',
    active: 'active',
    lastSeenAt: 'lastSeenAt',
    createdAt: 'createdAt'
};
export const AreaScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    city: 'city',
    name: 'name',
    nameTa: 'nameTa',
    lat: 'lat',
    lng: 'lng',
    active: 'active',
    sortOrder: 'sortOrder'
};
export const JobCategoryScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    code: 'code',
    name: 'name',
    nameTa: 'nameTa',
    parentId: 'parentId',
    sortOrder: 'sortOrder',
    active: 'active',
    suggestedPayMinPaise: 'suggestedPayMinPaise'
};
export const SkillScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    code: 'code',
    name: 'name',
    nameTa: 'nameTa',
    categoryId: 'categoryId',
    active: 'active',
    sortOrder: 'sortOrder'
};
export const WelfareItemScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    code: 'code',
    label: 'label',
    labelTa: 'labelTa',
    sortOrder: 'sortOrder',
    active: 'active'
};
export const WorkerSkillScalarFieldEnum = {
    id: 'id',
    workerProfileId: 'workerProfileId',
    skillId: 'skillId',
    yearsHint: 'yearsHint'
};
export const JobScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    employerProfileId: 'employerProfileId',
    title: 'title',
    description: 'description',
    categoryId: 'categoryId',
    city: 'city',
    areaId: 'areaId',
    addressLine: 'addressLine',
    lat: 'lat',
    lng: 'lng',
    timezone: 'timezone',
    startsOn: 'startsOn',
    endsOn: 'endsOn',
    dayStartTime: 'dayStartTime',
    dayEndTime: 'dayEndTime',
    payType: 'payType',
    payAmountPaise: 'payAmountPaise',
    currency: 'currency',
    headcountRequired: 'headcountRequired',
    hiredCount: 'hiredCount',
    applicationCount: 'applicationCount',
    status: 'status',
    minExperienceYears: 'minExperienceYears',
    requirementsNote: 'requirementsNote',
    publishedAt: 'publishedAt',
    hiddenAt: 'hiddenAt',
    hiddenReason: 'hiddenReason',
    cancelledAt: 'cancelledAt',
    cancelReason: 'cancelReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const JobWorkDayScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    workDate: 'workDate',
    startTime: 'startTime',
    endTime: 'endTime',
    headcount: 'headcount'
};
export const JobSkillScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    skillId: 'skillId'
};
export const JobWelfareScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    welfareItemId: 'welfareItemId',
    note: 'note'
};
export const ApplicationScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    jobId: 'jobId',
    workerProfileId: 'workerProfileId',
    status: 'status',
    source: 'source',
    quickMatchOfferId: 'quickMatchOfferId',
    coverNote: 'coverNote',
    decisionNote: 'decisionNote',
    decidedAt: 'decidedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const QuickMatchOfferScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    jobId: 'jobId',
    workerProfileId: 'workerProfileId',
    status: 'status',
    waveNo: 'waveNo',
    requiredHeadcount: 'requiredHeadcount',
    respondBy: 'respondBy',
    respondedAt: 'respondedAt',
    requirementSnapshot: 'requirementSnapshot',
    windowStart: 'windowStart',
    windowEnd: 'windowEnd',
    distanceBand: 'distanceBand',
    createdAt: 'createdAt'
};
export const CrewMemberScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    jobId: 'jobId',
    applicationId: 'applicationId',
    workerProfileId: 'workerProfileId',
    status: 'status',
    releasedReason: 'releasedReason',
    hiredAt: 'hiredAt',
    releasedAt: 'releasedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const AttendanceRecordScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    jobId: 'jobId',
    workDayId: 'workDayId',
    workerProfileId: 'workerProfileId',
    crewMemberId: 'crewMemberId',
    status: 'status',
    checkInAt: 'checkInAt',
    checkOutAt: 'checkOutAt',
    checkSource: 'checkSource',
    checkTokenId: 'checkTokenId',
    sourceLat: 'sourceLat',
    sourceLng: 'sourceLng',
    durationMinutes: 'durationMinutes',
    correctionReason: 'correctionReason',
    correctedByAccountId: 'correctedByAccountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const EarningScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    jobId: 'jobId',
    workerProfileId: 'workerProfileId',
    status: 'status',
    amountPaise: 'amountPaise',
    currency: 'currency',
    adjustmentPaise: 'adjustmentPaise',
    adjustmentReason: 'adjustmentReason',
    holdComplaintId: 'holdComplaintId',
    approvedAt: 'approvedAt',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PaymentTransactionScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    status: 'status',
    amountPaise: 'amountPaise',
    currency: 'currency',
    reference: 'reference',
    evidenceStorageKey: 'evidenceStorageKey',
    recordedByAccountId: 'recordedByAccountId',
    paidAt: 'paidAt',
    createdAt: 'createdAt'
};
export const PaymentEarningScalarFieldEnum = {
    earningId: 'earningId',
    paymentTransactionId: 'paymentTransactionId',
    amountPaise: 'amountPaise'
};
export const RatingScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    jobId: 'jobId',
    raterAccountId: 'raterAccountId',
    rateeAccountId: 'rateeAccountId',
    raterRole: 'raterRole',
    score: 'score',
    tags: 'tags',
    comment: 'comment',
    createdAt: 'createdAt'
};
export const NotificationScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    recipientAccountId: 'recipientAccountId',
    eventKey: 'eventKey',
    titleKey: 'titleKey',
    bodyParams: 'bodyParams',
    contextType: 'contextType',
    contextPublicId: 'contextPublicId',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
export const ComplaintScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    submitterAccountId: 'submitterAccountId',
    type: 'type',
    severity: 'severity',
    status: 'status',
    linkType: 'linkType',
    linkPublicId: 'linkPublicId',
    narrative: 'narrative',
    resolutionNote: 'resolutionNote',
    resolvedByAccountId: 'resolvedByAccountId',
    resolvedAt: 'resolvedAt',
    reopenedAt: 'reopenedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ComplaintEventScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    complaintId: 'complaintId',
    actorId: 'actorId',
    kind: 'kind',
    body: 'body',
    evidenceStorageKey: 'evidenceStorageKey',
    createdAt: 'createdAt'
};
export const AvailabilitySlotScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    workerProfileId: 'workerProfileId',
    workDate: 'workDate',
    fromTime: 'fromTime',
    toTime: 'toTime',
    areaId: 'areaId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const NotificationOutboxScalarFieldEnum = {
    id: 'id',
    eventKey: 'eventKey',
    dedupeKey: 'dedupeKey',
    payload: 'payload',
    status: 'status',
    attempts: 'attempts',
    nextAttemptAt: 'nextAttemptAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const NotificationDeliveryScalarFieldEnum = {
    id: 'id',
    outboxId: 'outboxId',
    recipientAccountId: 'recipientAccountId',
    channel: 'channel',
    status: 'status',
    providerRef: 'providerRef',
    errorCode: 'errorCode',
    attemptedAt: 'attemptedAt',
    createdAt: 'createdAt'
};
export const NotificationPrefScalarFieldEnum = {
    accountId: 'accountId',
    pushEnabled: 'pushEnabled',
    smsEnabled: 'smsEnabled',
    quietHours: 'quietHours',
    updatedAt: 'updatedAt'
};
export const SmsLogScalarFieldEnum = {
    id: 'id',
    phoneHash: 'phoneHash',
    templateId: 'templateId',
    purpose: 'purpose',
    providerRef: 'providerRef',
    status: 'status',
    costPaise: 'costPaise',
    createdAt: 'createdAt'
};
export const AuditLogScalarFieldEnum = {
    id: 'id',
    at: 'at',
    actorAccountId: 'actorAccountId',
    actorRole: 'actorRole',
    action: 'action',
    entityType: 'entityType',
    entityPublicId: 'entityPublicId',
    beforeJson: 'beforeJson',
    afterJson: 'afterJson',
    requestId: 'requestId',
    ipHash: 'ipHash'
};
export const SanctionScalarFieldEnum = {
    id: 'id',
    accountId: 'accountId',
    type: 'type',
    reason: 'reason',
    linkedComplaintId: 'linkedComplaintId',
    issuedByAccountId: 'issuedByAccountId',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    liftedAt: 'liftedAt',
    createdAt: 'createdAt'
};
export const PlatformConfigScalarFieldEnum = {
    key: 'key',
    valueJson: 'valueJson',
    scope: 'scope',
    version: 'version',
    updatedByAccountId: 'updatedByAccountId',
    updatedAt: 'updatedAt'
};
export const IdempotencyKeyScalarFieldEnum = {
    key: 'key',
    accountId: 'accountId',
    requestHash: 'requestHash',
    responseJson: 'responseJson',
    status: 'status',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
};
export const MatchLogScalarFieldEnum = {
    id: 'id',
    publicId: 'publicId',
    jobId: 'jobId',
    requestedByAccountId: 'requestedByAccountId',
    candidatesJson: 'candidatesJson',
    weightsVersion: 'weightsVersion',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const AccountOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    phone: 'phone',
    role: 'role',
    status: 'status'
};
export const WorkerProfileOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    fullName: 'fullName',
    photoStorageKey: 'photoStorageKey',
    city: 'city',
    bio: 'bio'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const EmployerProfileOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    orgName: 'orgName',
    orgType: 'orgType',
    contactName: 'contactName',
    city: 'city',
    addressLine: 'addressLine',
    panRef: 'panRef',
    gstin: 'gstin',
    verificationStatus: 'verificationStatus'
};
export const KycSubmissionOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status',
    idType: 'idType',
    idNumberHash: 'idNumberHash',
    rejectionReason: 'rejectionReason'
};
export const KycDocumentOrderByRelevanceFieldEnum = {
    docType: 'docType',
    storageKey: 'storageKey',
    contentSha: 'contentSha',
    mime: 'mime'
};
export const KycConsentOrderByRelevanceFieldEnum = {
    consentVer: 'consentVer',
    ipHash: 'ipHash'
};
export const DocumentAccessLogOrderByRelevanceFieldEnum = {
    action: 'action',
    ipHash: 'ipHash'
};
export const SessionOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    refreshTokenHash: 'refreshTokenHash',
    familyId: 'familyId',
    userAgent: 'userAgent',
    ipHash: 'ipHash'
};
export const OtpChallengeOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    phone: 'phone',
    purpose: 'purpose',
    codeHash: 'codeHash'
};
export const PushTokenOrderByRelevanceFieldEnum = {
    platform: 'platform',
    token: 'token'
};
export const AreaOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    city: 'city',
    name: 'name',
    nameTa: 'nameTa'
};
export const JobCategoryOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    code: 'code',
    name: 'name',
    nameTa: 'nameTa'
};
export const SkillOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    code: 'code',
    name: 'name',
    nameTa: 'nameTa'
};
export const WelfareItemOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    code: 'code',
    label: 'label',
    labelTa: 'labelTa'
};
export const JobOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    title: 'title',
    description: 'description',
    city: 'city',
    addressLine: 'addressLine',
    timezone: 'timezone',
    payType: 'payType',
    currency: 'currency',
    status: 'status',
    requirementsNote: 'requirementsNote',
    hiddenReason: 'hiddenReason',
    cancelReason: 'cancelReason'
};
export const JobWelfareOrderByRelevanceFieldEnum = {
    note: 'note'
};
export const ApplicationOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status',
    source: 'source',
    coverNote: 'coverNote',
    decisionNote: 'decisionNote'
};
export const QuickMatchOfferOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status',
    requirementSnapshot: 'requirementSnapshot',
    distanceBand: 'distanceBand'
};
export const CrewMemberOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status',
    releasedReason: 'releasedReason'
};
export const AttendanceRecordOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status',
    checkSource: 'checkSource',
    checkTokenId: 'checkTokenId',
    correctionReason: 'correctionReason'
};
export const EarningOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status',
    currency: 'currency',
    adjustmentReason: 'adjustmentReason'
};
export const PaymentTransactionOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status',
    currency: 'currency',
    reference: 'reference',
    evidenceStorageKey: 'evidenceStorageKey'
};
export const RatingOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    raterRole: 'raterRole',
    comment: 'comment'
};
export const NotificationOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    eventKey: 'eventKey',
    titleKey: 'titleKey',
    contextType: 'contextType',
    contextPublicId: 'contextPublicId'
};
export const ComplaintOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    type: 'type',
    severity: 'severity',
    status: 'status',
    linkType: 'linkType',
    linkPublicId: 'linkPublicId',
    narrative: 'narrative',
    resolutionNote: 'resolutionNote'
};
export const ComplaintEventOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    kind: 'kind',
    body: 'body',
    evidenceStorageKey: 'evidenceStorageKey'
};
export const AvailabilitySlotOrderByRelevanceFieldEnum = {
    publicId: 'publicId',
    status: 'status'
};
export const NotificationOutboxOrderByRelevanceFieldEnum = {
    eventKey: 'eventKey',
    dedupeKey: 'dedupeKey',
    status: 'status'
};
export const NotificationDeliveryOrderByRelevanceFieldEnum = {
    channel: 'channel',
    status: 'status',
    providerRef: 'providerRef',
    errorCode: 'errorCode'
};
export const NotificationPrefOrderByRelevanceFieldEnum = {
    quietHours: 'quietHours'
};
export const SmsLogOrderByRelevanceFieldEnum = {
    phoneHash: 'phoneHash',
    templateId: 'templateId',
    purpose: 'purpose',
    providerRef: 'providerRef',
    status: 'status'
};
export const AuditLogOrderByRelevanceFieldEnum = {
    actorRole: 'actorRole',
    action: 'action',
    entityType: 'entityType',
    entityPublicId: 'entityPublicId',
    requestId: 'requestId',
    ipHash: 'ipHash'
};
export const SanctionOrderByRelevanceFieldEnum = {
    type: 'type',
    reason: 'reason'
};
export const PlatformConfigOrderByRelevanceFieldEnum = {
    key: 'key',
    scope: 'scope'
};
export const IdempotencyKeyOrderByRelevanceFieldEnum = {
    key: 'key',
    requestHash: 'requestHash',
    status: 'status'
};
export const MatchLogOrderByRelevanceFieldEnum = {
    publicId: 'publicId'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map