import { UsersService } from '../../../database/services/users/users.service';
import { BlockedUsersService } from '../../../database/services/blocked-users/blocked-users.service';
import { BlockedUser } from '../../../database/entities/BlockedUser';
import { UserRoleDto } from '../../../dto/user-role.dto';
import { RolesService } from '../../../database/services/roles/roles.service';
import { Role } from '../../../database/entities/Role';
export declare class AdminPanelService {
    private _usersService;
    private _blockedUsersService;
    private _rolesService;
    constructor(_usersService: UsersService, _blockedUsersService: BlockedUsersService, _rolesService: RolesService);
    blockUser(userId: number): Promise<BlockedUser>;
    unblockUser(userId: number): Promise<BlockedUser>;
    addUserRole(userRole: UserRoleDto): Promise<void>;
    removeUserRole(userRole: UserRoleDto): Promise<void>;
    userRoles(userId: number): Promise<Role[]>;
}
