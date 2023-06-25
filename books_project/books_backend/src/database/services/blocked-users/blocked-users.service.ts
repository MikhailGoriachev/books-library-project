import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockedUser } from '../../entities/BlockedUser';
import { Repository } from 'typeorm';
import { getDateBetween } from '../../../infrastructure/utils';
import { BlockedUserFilterDto } from '../../../dto/filters/blocked-user-filter.dto';
import { User } from '../../entities/User';

@Injectable()
export class BlockedUsersService {
    constructor(
        @InjectRepository(BlockedUser)
        private blockedUserRepository: Repository<BlockedUser>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(filter?: BlockedUserFilterDto): Promise<BlockedUser[]> {
        return this.blockedUserRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: BlockedUserFilterDto): Promise<BlockedUser> {
        return this.blockedUserRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: BlockedUserFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['blockedAt'] = filter.blockedAt ?? getDateBetween(filter.minBlockedAt, filter.maxBlockedAt);
        fields['unblockedAt'] = filter.unblockedAt ?? getDateBetween(filter.minUnblockedAt, filter.maxUnblockedAt);

        return fields;
    }

    async save(item: BlockedUser): Promise<BlockedUser> {
        return this.blockedUserRepository.save(item);
    }
}
