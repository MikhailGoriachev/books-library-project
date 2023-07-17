import { Role } from '../../entities/Role';
import { Repository } from 'typeorm';
import { RoleFilterDto } from '../../../dto/filters/role-filter.dto';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    findAll(filter?: RoleFilterDto): Promise<Role[]>;
    findOne(filter?: RoleFilterDto): Promise<Role>;
    private getFilter;
    save(item: Role): Promise<Role>;
}
