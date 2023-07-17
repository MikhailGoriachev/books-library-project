"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../../database/services/users/users.service");
const blocked_users_service_1 = require("../../../database/services/blocked-users/blocked-users.service");
const BlockedUser_1 = require("../../../database/entities/BlockedUser");
const roles_service_1 = require("../../../database/services/roles/roles.service");
let AdminPanelService = exports.AdminPanelService = class AdminPanelService {
    constructor(_usersService, _blockedUsersService, _rolesService) {
        this._usersService = _usersService;
        this._blockedUsersService = _blockedUsersService;
        this._rolesService = _rolesService;
    }
    async blockUser(userId) {
        const isBlockedUser = (await this._blockedUsersService
            .findOne({ userId, unblockedAt: null })) !== null;
        if (isBlockedUser)
            return;
        const user = await this._usersService.findOne({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('User is not found');
        const blockedUser = new BlockedUser_1.BlockedUser(user, new Date(), null);
        return this._blockedUsersService.save(blockedUser);
    }
    async unblockUser(userId) {
        const blockedUser = await this._blockedUsersService
            .findOne({ userId, unblockedAt: null });
        if (!blockedUser)
            return;
        blockedUser.unblockedAt = new Date();
        return this._blockedUsersService.save(blockedUser);
    }
    async addUserRole(userRole) {
        const user = await this._usersService.findOne({ id: userRole.userId });
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        const role = await this._rolesService.findOne({ id: userRole.roleId });
        if (!role)
            throw new common_1.HttpException('Role is not found', 404);
        if (!user.roles.find(r => r.id === userRole.roleId)) {
            user.roles.push(role);
            await this._usersService.save(user);
        }
    }
    async removeUserRole(userRole) {
        const user = await this._usersService.findOne({ id: userRole.userId });
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        const roleIndex = user.roles.findIndex(r => r.id === userRole.roleId);
        if (roleIndex === -1)
            throw new common_1.HttpException('Role is not found', 404);
        user.roles.splice(roleIndex, 1);
        await this._usersService.save(user);
    }
    async userRoles(userId) {
        const user = await this._usersService.findOne({ id: userId });
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        return user.roles;
    }
};
exports.AdminPanelService = AdminPanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        blocked_users_service_1.BlockedUsersService,
        roles_service_1.RolesService])
], AdminPanelService);
//# sourceMappingURL=admin-panel.service.js.map