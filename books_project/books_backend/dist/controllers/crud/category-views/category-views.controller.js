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
exports.CategoryViewsController = void 0;
const common_1 = require("@nestjs/common");
const category_views_service_1 = require("../../../database/services/category-views/category-views.service");
const category_view_filter_dto_1 = require("../../../dto/filters/category-view-filter.dto");
const category_view_dto_1 = require("../../../dto/crud/category-view.dto");
const CategoryView_1 = require("../../../database/entities/CategoryView");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
let CategoryViewsController = exports.CategoryViewsController = class CategoryViewsController {
    constructor(_categoryViewsService) {
        this._categoryViewsService = _categoryViewsService;
    }
    findAll(filter) {
        return this._categoryViewsService.findAll(filter);
    }
    findOne(filter) {
        return this._categoryViewsService.findOne(filter);
    }
    findOneById(id) {
        return this._categoryViewsService.findOne({ id });
    }
    create(item) {
        item.id = null;
        return this._categoryViewsService.save(Object.assign(new CategoryView_1.CategoryView(), item));
    }
    update(item) {
        return this._categoryViewsService.save(Object.assign(new CategoryView_1.CategoryView(), item));
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_view_filter_dto_1.CategoryViewFilterDto]),
    __metadata("design:returntype", void 0)
], CategoryViewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('first'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_view_filter_dto_1.CategoryViewFilterDto]),
    __metadata("design:returntype", void 0)
], CategoryViewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryViewsController.prototype, "findOneById", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_view_dto_1.CategoryViewDto]),
    __metadata("design:returntype", void 0)
], CategoryViewsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_view_dto_1.CategoryViewDto]),
    __metadata("design:returntype", void 0)
], CategoryViewsController.prototype, "update", null);
exports.CategoryViewsController = CategoryViewsController = __decorate([
    (0, common_1.Controller)('category-views'),
    __metadata("design:paramtypes", [category_views_service_1.CategoryViewsService])
], CategoryViewsController);
//# sourceMappingURL=category-views.controller.js.map