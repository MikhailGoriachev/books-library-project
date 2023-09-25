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
exports.AuthorsController = void 0;
const common_1 = require("@nestjs/common");
const authors_service_1 = require("../../../database/services/authors/authors.service");
const author_dto_1 = require("../../../dto/crud/author.dto");
const Author_1 = require("../../../database/entities/Author");
const author_filter_dto_1 = require("../../../dto/filters/author-filter.dto");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
const author_pagination_filter_dto_1 = require("../../../dto/filters/author-pagination-filter.dto");
let AuthorsController = exports.AuthorsController = class AuthorsController {
    constructor(_authorService) {
        this._authorService = _authorService;
    }
    create(item) {
        item.id = null;
        return this._authorService.save(Object.assign(new Author_1.Author(), item));
    }
    update(item) {
        return this._authorService.save(Object.assign(new Author_1.Author(), item));
    }
    findAllWithDeleted(filter) {
        return this._authorService.findAll(filter, true);
    }
    findAllPaginationWithDeleted(pageOptionsDto) {
        return this._authorService.findAllByPagination(pageOptionsDto, true);
    }
    findOneWithDeleted(filter) {
        return this._authorService.findOne(filter, true);
    }
    findOneByIdWithDeleted(id) {
        return this._authorService.findOne({ id }, true);
    }
    findAll(filter) {
        return this._authorService.findAll(filter);
    }
    findAllPagination(pageOptionsDto) {
        return this._authorService.findAllByPagination(pageOptionsDto);
    }
    findOne(filter) {
        return this._authorService.findOne(filter);
    }
    findOneById(id) {
        return this._authorService.findOne({ id });
    }
};
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_dto_1.AuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_dto_1.AuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('/with-deleted'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_filter_dto_1.AuthorFilterDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findAllWithDeleted", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('pagination/with-deleted'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_pagination_filter_dto_1.AuthorPaginationFilterDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findAllPaginationWithDeleted", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('first/with-deleted'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_filter_dto_1.AuthorFilterDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findOneWithDeleted", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)(':id/with-deleted'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findOneByIdWithDeleted", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_filter_dto_1.AuthorFilterDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_pagination_filter_dto_1.AuthorPaginationFilterDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findAllPagination", null);
__decorate([
    (0, common_1.Get)('first'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_filter_dto_1.AuthorFilterDto]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findOneById", null);
exports.AuthorsController = AuthorsController = __decorate([
    (0, common_1.Controller)('authors'),
    __metadata("design:paramtypes", [authors_service_1.AuthorsService])
], AuthorsController);
//# sourceMappingURL=authors.controller.js.map