import { ExpiredToken } from '../../entities/ExpiredToken';
import { Repository } from 'typeorm';
export declare class ExpiredTokensService {
    private _expiredTokenRepository;
    constructor(_expiredTokenRepository: Repository<ExpiredToken>);
    find(): Promise<ExpiredToken[]>;
    findOne(token: string): Promise<ExpiredToken>;
    save(item: ExpiredToken): Promise<ExpiredToken>;
}
