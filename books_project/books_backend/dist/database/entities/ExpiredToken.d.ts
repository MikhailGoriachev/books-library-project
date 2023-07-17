export declare class ExpiredToken {
    id: number;
    token: string;
    expiredAt: Date;
    constructor(token?: string, expiredAt?: Date);
}
