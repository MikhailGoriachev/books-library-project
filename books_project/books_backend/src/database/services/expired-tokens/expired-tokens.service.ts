import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpiredToken } from '../../entities/ExpiredToken';
import { Repository } from 'typeorm';

@Injectable()
export class ExpiredTokensService {
    constructor(
        @InjectRepository(ExpiredToken)
        private _expiredTokenRepository: Repository<ExpiredToken>) {}

    async find(): Promise<ExpiredToken[]> {
        return this._expiredTokenRepository.find();
    }

    async findOne(token: string): Promise<ExpiredToken> {
        return this._expiredTokenRepository.findOneBy({ token });
    }

    async save(item: ExpiredToken): Promise<ExpiredToken> {
        return this._expiredTokenRepository.save(item);
    }
}
