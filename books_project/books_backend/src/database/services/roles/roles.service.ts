import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../entities/Role';
import { Repository } from 'typeorm';
import { getLike } from '../../../infrastructure/utils';
import { RoleFilterDto } from '../../../dto/filters/role-filter.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async findAll(filter?: RoleFilterDto): Promise<Role[]> {
        return this.roleRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: RoleFilterDto): Promise<Role> {
        return this.roleRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: RoleFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['name'] = getLike(filter.name);

        return fields;
    }

    async save(item: Role): Promise<Role> {
        return this.roleRepository.save(item);
    }
}
