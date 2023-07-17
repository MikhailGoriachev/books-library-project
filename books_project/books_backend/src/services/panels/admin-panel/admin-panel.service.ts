import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../../database/services/users/users.service';
import { BlockedUsersService } from '../../../database/services/blocked-users/blocked-users.service';
import { BlockedUser } from '../../../database/entities/BlockedUser';
import { UserRoleDto } from '../../../dto/user-role.dto';
import { RolesService } from '../../../database/services/roles/roles.service';
import { Role } from '../../../database/entities/Role';

@Injectable()
export class AdminPanelService {
    constructor(private _usersService: UsersService,
                private _blockedUsersService: BlockedUsersService,
                private _rolesService: RolesService) {}

    // заблокировать пользователя
    async blockUser(userId: number): Promise<BlockedUser> {
        const isBlockedUser = (await this._blockedUsersService
            .findOne({ userId, unblockedAt: null })) !== null;

        if (isBlockedUser)
            return;

        const user = await this._usersService.findOne({ id: userId });

        if (!user)
            throw new NotFoundException('User is not found');

        const blockedUser = new BlockedUser(user, new Date(), null);

        return this._blockedUsersService.save(blockedUser);
    }

    // разблокировать пользователя
    async unblockUser(userId: number): Promise<BlockedUser> {
        const blockedUser = await this._blockedUsersService
            .findOne({ userId, unblockedAt: null });

        if (!blockedUser)
            return;

        blockedUser.unblockedAt = new Date();

        return this._blockedUsersService.save(blockedUser);
    }

    // назначить роль пользователя
    async addUserRole(userRole: UserRoleDto) {
        const user = await this._usersService.findOne({ id: userRole.userId });

        if (!user)
            throw new HttpException('User is not found', 404);

        const role = await this._rolesService.findOne({ id: userRole.roleId });

        if (!role)
            throw new HttpException('Role is not found', 404);

        if (!user.roles.find(r => r.id === userRole.roleId)) {
            user.roles.push(role);
            await this._usersService.save(user);
        }
    }

    // убрать роль пользователя
    async removeUserRole(userRole: UserRoleDto) {
        const user = await this._usersService.findOne({ id: userRole.userId });

        if (!user)
            throw new HttpException('User is not found', 404);

        const roleIndex = user.roles.findIndex(r => r.id === userRole.roleId);

        if (roleIndex === -1)
            throw new HttpException('Role is not found', 404);

        user.roles.splice(roleIndex, 1);
        
        await this._usersService.save(user);
    }

    // получить роли пользователя
    async userRoles(userId: number): Promise<Role[]> {
        const user = await this._usersService.findOne({ id: userId });

        if (!user)
            throw new HttpException('User is not found', 404);

        return user.roles;
    }
}
