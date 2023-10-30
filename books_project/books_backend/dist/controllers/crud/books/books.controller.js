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
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("../../../database/services/books/books.service");
const Book_1 = require("../../../database/entities/Book");
const book_dto_1 = require("../../../dto/crud/book.dto");
const book_filter_dto_1 = require("../../../dto/filters/book-filter.dto");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
const book_pagination_filter_dto_1 = require("../../../dto/filters/book-pagination-filter.dto");
let BooksController = exports.BooksController = class BooksController {
    constructor(_booksService) {
        this._booksService = _booksService;
    }
    findAll(filter) {
        return this._booksService.findAll(filter);
    }
    findAllPagination(pageOptionsDto) {
        return this._booksService.findAllByPagination(pageOptionsDto);
    }
    findOne(filter) {
        return this._booksService.findOne(filter);
    }
    priceRange() {
        return this._booksService.getPriceRange();
    }
    publicationYearRange() {
        return this._booksService.getPublicationYearRange();
    }
    publicationYearRangeWithDeleted() {
        return this._booksService.getPublicationYearRangeWithDeleted();
    }
    topBooksByRating() {
        return this._booksService.topBooksByRating();
    }
    topBooksByViewed() {
        return this._booksService.topBooksByViewed();
    }
    topBooksByAddition() {
        return this._booksService.topBooksByAddition();
    }
    findAllWithDeleted(filter) {
        return this._booksService.findAll(filter, true);
    }
    findAllPaginationWithDeleted(pageOptionsDto) {
        return this._booksService.findAllByPagination(pageOptionsDto, true);
    }
    findOneByIdWithDeleted(id) {
        return this._booksService.findOne({ id }, true);
    }
    findOneWithDeleted(filter) {
        return this._booksService.findOne(filter, true);
    }
    create(item) {
        item.id = null;
        return this._booksService.save(Object.assign(new Book_1.Book(), item));
    }
    update(item) {
        return this._booksService.save(Object.assign(new Book_1.Book(), item));
    }
    findOneById(id) {
        return this._booksService.findOne({ id });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_filter_dto_1.BookFilterDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_pagination_filter_dto_1.BookPaginationFilterDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAllPagination", null);
__decorate([
    (0, common_1.Get)('first'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_filter_dto_1.BookFilterDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('price-range'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "priceRange", null);
__decorate([
    (0, common_1.Get)('publication-year-range'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "publicationYearRange", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('publication-year-range/with-deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "publicationYearRangeWithDeleted", null);
__decorate([
    (0, common_1.Get)('top-by-rating'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "topBooksByRating", null);
__decorate([
    (0, common_1.Get)('top-by-viewed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "topBooksByViewed", null);
__decorate([
    (0, common_1.Get)('top-by-addition'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "topBooksByAddition", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('/with-deleted'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_filter_dto_1.BookFilterDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAllWithDeleted", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('pagination/with-deleted'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_pagination_filter_dto_1.BookPaginationFilterDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAllPaginationWithDeleted", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)(':id/with-deleted'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findOneByIdWithDeleted", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('first/with-deleted'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_filter_dto_1.BookFilterDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findOneWithDeleted", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.BookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.BookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findOneById", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map