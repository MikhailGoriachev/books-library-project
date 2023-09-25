import { BaseEntity } from './BaseEntity';
export declare class ExpiredToken extends BaseEntity {
    id: number;
    token: string;
    expiredAt: Date;
    constructor(token?: string, expiredAt?: Date);
}
