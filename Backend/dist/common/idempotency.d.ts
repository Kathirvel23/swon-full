export interface IdempotencyDelegate {
    create(args: {
        data: Record<string, unknown>;
    }): Promise<unknown>;
    findUnique(args: {
        where: {
            key: string;
        };
    }): Promise<{
        requestHash: string;
        status: string;
        responseJson: unknown;
        expiresAt: Date;
    } | null>;
    update(args: {
        where: {
            key: string;
        };
        data: Record<string, unknown>;
    }): Promise<unknown>;
    delete(args: {
        where: {
            key: string;
        };
    }): Promise<unknown>;
}
export declare function withIdempotency<T>(keys: IdempotencyDelegate, opts: {
    key: string | undefined;
    route: string;
    accountId: bigint;
    request: unknown;
    run: () => Promise<T>;
}): Promise<T>;
