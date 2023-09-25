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
const platform_express_1 = require("@nestjs/platform-express");
const process = require("process");
const book_edit_dto_1 = require("../../../dto/admin-panel/book/book-edit.dto");
const book_create_dto_1 = require("../../../dto/admin-panel/book/book-create.dto");
const author_create_dto_1 = require("../../../dto/admin-panel/author/author-create.dto");
const author_edit_dto_1 = require("../../../dto/admin-panel/author/author-edit.dto");
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
    async addBook(bookCreateDto) {
        return this._adminPanelService.createBook(bookCreateDto);
    }
    async editBook(bookEditDto) {
        return this._adminPanelService.editBook(bookEditDto);
    }
    async uploadBookImageFile(file, fileName) {
        return {
            fileName: await this._adminPanelService
                .uploadFile(file, `${process.cwd()}/public/images/books`, fileName),
        };
    }
    async uploadBookFile(file, fileName) {
        return {
            fileName: await this._adminPanelService
                .uploadFile(file, `${process.cwd()}/storage/files/books`, fileName),
        };
    }
    async deleteBookFile(data) {
        await this._adminPanelService.deleteBookFile(data.bookFileId);
    }
    async deleteBook(data) {
        await this._adminPanelService.deleteBook(data.bookId);
    }
    async restoreBook(data) {
        await this._adminPanelService.restoreBook(data.bookId);
    }
    async addAuthor(bookCreateDto) {
        return this._adminPanelService.createAuthor(bookCreateDto);
    }
    async editAuthor(bookEditDto) {
        return this._adminPanelService.editAuthor(bookEditDto);
    }
    async uploadAuthorImageFile(file, fileName) {
        return {
            fileName: await this._adminPanelService
                .uploadFile(file, `${process.cwd()}/public/images/authors`, fileName),
        };
    }
    async deleteAuthor(data) {
        await this._adminPanelService.deleteAuthor(data.authorId);
    }
    async restoreAuthor(data) {
        await this._adminPanelService.restoreAuthor(data.authorId);
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
    (0, common_1.Post)('books/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_create_dto_1.BookCreateDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "addBook", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Put)('books/edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_edit_dto_1.BookEditDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "editBook", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('upload/book/image'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "uploadBookImageFile", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('upload/book/file'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "uploadBookFile", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('delete/book/file'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "deleteBookFile", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('delete/book'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "deleteBook", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('restore/book'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "restoreBook", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('authors/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_create_dto_1.AuthorCreateDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "addAuthor", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Put)('authors/edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_edit_dto_1.AuthorEditDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "editAuthor", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('upload/author/image'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "uploadAuthorImageFile", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('delete/author'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "deleteAuthor", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)('restore/author'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "restoreAuthor", null);
exports.AdminPanelController = AdminPanelController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Controller)('admin-panel'),
    __metadata("design:paramtypes", [admin_panel_service_1.AdminPanelService])
], AdminPanelController);
//# sourceMappingURL=admin-panel.controller.js.map