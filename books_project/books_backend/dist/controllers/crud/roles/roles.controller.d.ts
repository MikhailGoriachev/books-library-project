import { RolesService } from '../../../database/services/roles/roles.service';
import { RoleFilterDto } from '../../../dto/filters/role-filter.dto';
import { RoleDto } from '../../../dto/crud/role.dto';
import { Role } from '../../../database/entities/Role';
export declare class RolesController {
    private _rolesService;
    constructor(_rolesService: RolesService);
    findAll(filter: RoleFilterDto): Promise<Role[]>;
    findOne(filter: RoleFilterDto): Promise<Role>;
    findOneById(id: number): Promise<Role>;
    create(item: RoleDto): Promise<Role>;
    update(item: RoleDto): Promise<Role>;
}
