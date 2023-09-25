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
exports.BookFilesController = void 0;
const common_1 = require("@nestjs/common");
const book_files_service_1 = require("../../../database/services/book-files/book-files.service");
const book_file_filter_dto_1 = require("../../../dto/filters/book-file-filter.dto");
const book_file_dto_1 = require("../../../dto/crud/book-file.dto");
const BookFile_1 = require("../../../database/entities/BookFile");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const file_extensions_service_1 = require("../../../database/services/file-extensions/file-extensions.service");
const books_service_1 = require("../../../database/services/books/books.service");
let BookFilesController = exports.BookFilesController = class BookFilesController {
    constructor(_bookFilesService, _booksService, _fileExtensionsService) {
        this._bookFilesService = _bookFilesService;
        this._booksService = _booksService;
        this._fileExtensionsService = _fileExtensionsService;
    }
    findAll(filter) {
        return this._bookFilesService.findAll(filter, true);
    }
    findOne(filter) {
        return this._bookFilesService.findOne(filter, true);
    }
    findOneById(id) {
        return this._bookFilesService.findOne({ id }, true);
    }
    async create(item) {
        item.id = null;
        const bookFile = new BookFile_1.BookFile(item.path, await this._fileExtensionsService.findOne({ id: item.fileExtensionId }), await this._booksService.findOne({ id: item.bookId }, true));
        return this._bookFilesService.save(bookFile);
    }
    async update(item) {
        const bookFile = new BookFile_1.BookFile(item.path, await this._fileExtensionsService.findOne({ id: item.fileExtensionId }), await this._booksService.findOne({ id: item.bookId }, true));
        bookFile.id = item.id;
        return this._bookFilesService.save(bookFile);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_file_filter_dto_1.BookFileFilterDto]),
    __metadata("design:returntype", void 0)
], BookFilesController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Get)('first'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_file_filter_dto_1.BookFileFilterDto]),
    __metadata("design:returntype", void 0)
], BookFilesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookFilesController.prototype, "findOneById", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_file_dto_1.BookFileDto]),
    __metadata("design:returntype", Promise)
], BookFilesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_file_dto_1.BookFileDto]),
    __metadata("design:returntype", Promise)
], BookFilesController.prototype, "update", null);
exports.BookFilesController = BookFilesController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Controller)('book-files'),
    __metadata("design:paramtypes", [book_files_service_1.BookFilesService,
        books_service_1.BooksService,
        file_extensions_service_1.FileExtensionsService])
], BookFilesController);
//# sourceMappingURL=book-files.controller.js.map