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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelController = void 0;
const common_1 = require("@nestjs/common");
const admin_panel_service_1 = require("../../../services/panels/admin-panel/admin-panel.service");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const user_role_dto_1 = require("../../../dto/user-role.dto");
let AdminPanelController = exports.AdminPanelController = class AdminPanelController {
    constructor(_adminPanelService) {
        this._adminPanelService = _adminPanelService;
    }
    async blockUser(userId) {
        await this._adminPanelService.blockUser(userId);
    }
    async unblockUser(userId) {
        await this._adminPanelService.unblockUser(userId);
    }
    async userRoles(userId) {
        return await this._adminPanelService.userRoles(userId);
    }
    async addUserRole(userRole) {
        await this._adminPanelService.addUserRole(userRole);
    }
    async removeUserRole(userRole) {
        await this._adminPanelService.removeUserRole(userRole);
    }
    async addBook() {
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('user/block'),
    __param(0, (0, common_1.Body)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "blockUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('user/unblock'),
    __param(0, (0, common_1.Body)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "unblockUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('user/roles'),
    __param(0, (0, common_1.Body)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "userRoles", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('user/roles/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_role_dto_1.UserRoleDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "addUserRole", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('user/roles/remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_role_dto_1.UserRoleDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "removeUserRole", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('user/roles/add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "addBook", null);
exports.AdminPanelController = AdminPanelController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Controller)('admin-panel'),
    __metadata("design:paramtypes", [admin_panel_service_1.AdminPanelService])
], AdminPanelController);
//# sourceMappingURL=admin-panel.controller.js.map