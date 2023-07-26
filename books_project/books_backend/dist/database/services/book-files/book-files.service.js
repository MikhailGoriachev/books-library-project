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
exports.BookFilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BookFile_1 = require("../../entities/BookFile");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const Book_1 = require("../../entities/Book");
const FileExtension_1 = require("../../entities/FileExtension");
let BookFilesService = exports.BookFilesService = class BookFilesService {
    constructor(bookFileRepository, bookRepository, fileExtensionRepository) {
        this.bookFileRepository = bookFileRepository;
        this.bookRepository = bookRepository;
        this.fileExtensionRepository = fileExtensionRepository;
    }
    async findAll(filter) {
        return this.bookFileRepository.find({
            where: this.getFilter(filter),
            relations: ['fileExtension', 'book'],
        });
    }
    async findOne(filter) {
        return this.bookFileRepository.findOne({
            where: this.getFilter(filter),
            relations: ['fileExtension', 'book'],
        });
    }
    getFilter(filter) {
        const fields = {};
        fields['id'] = filter.id;
        fields['path'] = (0, utils_1.getLike)(filter.path);
        fields['fileExtension'] = (0, utils_1.getById)(filter.fileExtensionId);
        fields['book'] = (0, utils_1.getById)(filter.bookId);
        return fields;
    }
    async save(item) {
        return this.bookFileRepository.save(item);
    }
};
exports.BookFilesService = BookFilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BookFile_1.BookFile)),
    __param(1, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __param(2, (0, typeorm_1.InjectRepository)(FileExtension_1.FileExtension)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookFilesService);
//# sourceMappingURL=book-files.service.js.map