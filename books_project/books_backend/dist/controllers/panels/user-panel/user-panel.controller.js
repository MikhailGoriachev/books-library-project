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
exports.UserPanelController = void 0;
const common_1 = require("@nestjs/common");
const user_panel_service_1 = require("../../../services/panels/user-panel/user-panel.service");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const set_book_rating_dto_1 = require("../../../dto/auth/set-book-rating.dto");
let UserPanelController = exports.UserPanelController = class UserPanelController {
    constructor(_userPanelService) {
        this._userPanelService = _userPanelService;
    }
    async addBookToCart(req, bookId) {
        await this._userPanelService.addBookToCart(req.user, bookId);
    }
    async removeBookFromCart(req, bookId) {
        await this._userPanelService.removeBookFromCart(req.user, bookId);
    }
    async clearCart(req) {
        await this._userPanelService.clearCart(req.user);
    }
    async getBooksFromCart(req) {
        return await this._userPanelService.getBooksFromCart(req.user);
    }
    async setBookRating(req, rating) {
        await this._userPanelService.setBookRating(req.user, rating);
    }
    async removeBookRating(req, bookId) {
        await this._userPanelService.removeBookRating(req.user, bookId);
    }
    async setBookView(req, bookId) {
        await this._userPanelService.setBookView(req.user, bookId);
    }
    async setAuthorView(req, authorId) {
        await this._userPanelService.setAuthorView(req.user, authorId);
    }
    async setCategoryView(req, categoryId) {
        await this._userPanelService.setCategoryView(req.user, categoryId);
    }
    async downloadBook(req) {
        return await this._userPanelService.downloadBook(req.user, 5);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('cart/add-book'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('bookId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "addBookToCart", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('cart/remove-book'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('bookId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "removeBookFromCart", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('cart/clear'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "clearCart", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Get)('cart'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "getBooksFromCart", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('book/rating/set'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, set_book_rating_dto_1.SetBookRatingDto]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "setBookRating", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('book/rating/remove'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('bookId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "removeBookRating", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('view/book'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('bookId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "setBookView", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('view/author'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('authorId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "setAuthorView", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Post)('view/category'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('categoryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "setCategoryView", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user),
    (0, common_1.Get)('book/download'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPanelController.prototype, "downloadBook", null);
exports.UserPanelController = UserPanelController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Controller)('user-panel'),
    __metadata("design:paramtypes", [user_panel_service_1.UserPanelService])
], UserPanelController);
//# sourceMappingURL=user-panel.controller.js.map