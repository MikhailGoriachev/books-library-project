import { AdminPanelService } from '../../../services/panels/admin-panel/admin-panel.service';
import { UserRoleDto } from '../../../dto/user-role.dto';
export declare class AdminPanelController {
    private _adminPanelService;
    constructor(_adminPanelService: AdminPanelService);
    blockUser(userId: number): Promise<void>;
    unblockUser(userId: number): Promise<void>;
    userRoles(userId: number): Promise<import("../../../database/entities/Role").Role[]>;
    addUserRole(userRole: UserRoleDto): Promise<void>;
    removeUserRole(userRole: UserRoleDto): Promise<void>;
    addBook(): Promise<void>;
}
