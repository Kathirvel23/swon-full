export class PrismaOtpStore {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    map(row) {
        return {
            id: row.publicId,
            phone: row.phone,
            purpose: 'LOGIN',
            codeHash: row.codeHash,
            attempts: row.attempts,
            maxAttempts: row.maxAttempts,
            expiresAt: row.expiresAt,
            cooldownUntil: row.cooldownUntil,
            consumedAt: row.consumedAt,
        };
    }
    async findActiveByPhone(phone, purpose) {
        const row = await this.prisma.otpChallenge.findFirst({
            where: { phone, purpose, consumedAt: null },
            orderBy: { createdAt: 'desc' },
        });
        return row ? this.map(row) : null;
    }
    async findById(id) {
        const row = await this.prisma.otpChallenge.findUnique({ where: { publicId: id } });
        return row ? this.map(row) : null;
    }
    async create(data) {
        const row = await this.prisma.otpChallenge.create({
            data: {
                publicId: data.id,
                phone: data.phone,
                purpose: data.purpose,
                codeHash: data.codeHash,
                maxAttempts: data.maxAttempts,
                expiresAt: data.expiresAt,
                cooldownUntil: data.cooldownUntil,
            },
        });
        return this.map(row);
    }
    async update(id, data) {
        const row = await this.prisma.otpChallenge.update({ where: { publicId: id }, data });
        return this.map(row);
    }
}
export class PrismaSessionStore {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    map(row) {
        return {
            id: row.publicId,
            accountId: row.accountId.toString(),
            refreshTokenHash: row.refreshTokenHash,
            familyId: row.familyId,
            userAgent: row.userAgent,
            ipHash: row.ipHash,
            issuedAt: row.issuedAt,
            expiresAt: row.expiresAt,
            revokedAt: row.revokedAt,
            lastUsedAt: row.lastUsedAt,
        };
    }
    async findByRefreshHash(hash) {
        const row = await this.prisma.session.findUnique({ where: { refreshTokenHash: hash } });
        return row ? this.map(row) : null;
    }
    async findById(id) {
        const row = await this.prisma.session.findUnique({ where: { publicId: id } });
        return row ? this.map(row) : null;
    }
    async create(data) {
        const row = await this.prisma.session.create({
            data: {
                publicId: data.id,
                accountId: BigInt(data.accountId),
                refreshTokenHash: data.refreshTokenHash,
                familyId: data.familyId,
                userAgent: data.userAgent,
                ipHash: data.ipHash,
                issuedAt: data.issuedAt,
                expiresAt: data.expiresAt,
            },
        });
        return this.map(row);
    }
    async revoke(id, rotated) {
        await this.prisma.session.updateMany({
            where: { publicId: id, revokedAt: null },
            data: rotated ? { revokedAt: new Date(), lastUsedAt: new Date() } : { revokedAt: new Date() },
        });
    }
    async revokeFamily(familyId) {
        await this.prisma.session.updateMany({
            where: { familyId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    async revokeAllForAccount(accountId) {
        await this.prisma.session.updateMany({
            where: { accountId: BigInt(accountId), revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
}
//# sourceMappingURL=prisma-stores.js.map