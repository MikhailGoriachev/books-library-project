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
exports.BlockedUsersController = void 0;
const common_1 = require("@nestjs/common");
const blocked_users_service_1 = require("../../../database/services/blocked-users/blocked-users.service");
const blocked_user_filter_dto_1 = require("../../../dto/filters/blocked-user-filter.dto");
const blocked_user_dto_1 = require("../../../dto/crud/blocked-user.dto");
const BlockedUser_1 = require("../../../database/entities/BlockedUser");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
let BlockedUsersController = exports.BlockedUsersController = class BlockedUsersController {
    constructor(_blockedUsersService) {
        this._blockedUsersService = _blockedUsersService;
    }
    findAll(filter) {
        return this._blockedUsersService.findAll(filter);
    }
    findOne(filter) {
        return this._blockedUsersService.findOne(filter);
    }
    findOneById(id) {
        return this._blockedUsersService.findOne({ id });
    }
    create(item) {
        item.id = null;
        return this._blockedUsersService.save(Object.assign(new BlockedUser_1.BlockedUser(), item));
    }
    update(item) {
        return this._blockedUsersService.save(Object.assign(new BlockedUser_1.BlockedUser(), item));
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blocked_user_filter_dto_1.BlockedUserFilterDto]),
    __metadata("design:returntype", void 0)
], BlockedUsersController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Get)('first'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blocked_user_filter_dto_1.BlockedUserFilterDto]),
    __metadata("design:returntype", void 0)
], BlockedUsersController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlockedUsersController.prototype, "findOneById", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blocked_user_dto_1.BlockedUserDto]),
    __metadata("design:returntype", void 0)
], BlockedUsersController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blocked_user_dto_1.BlockedUserDto]),
    __metadata("design:returntype", void 0)
], BlockedUsersController.prototype, "update", null);
exports.BlockedUsersController = BlockedUsersController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Controller)('blocked-users'),
    __metadata("design:paramtypes", [blocked_users_service_1.BlockedUsersService])
], BlockedUsersController);
//# sourceMappingURL=blocked-users.controller.js.map