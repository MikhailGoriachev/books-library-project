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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const Book_1 = require("../../entities/Book");
const Category_1 = require("../../entities/Category");
const Author_1 = require("../../entities/Author");
let BooksService = exports.BooksService = class BooksService {
    constructor(bookRepository, categoryRepository, authorRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
        this.authorRepository = authorRepository;
    }
    async findAll(filter) {
        return this.bookRepository.find({
            where: await this.getFilter(filter),
            relations: ['categories', 'authors', 'bookFiles', 'bookRatings'],
        });
    }
    async findOne(filter) {
        return this.bookRepository.findOne({
            where: await this.getFilter(filter),
            relations: ['categories', 'authors', 'bookFiles', 'bookRatings'],
        });
    }
    async getFilter(filter) {
        var _a, _b, _c, _d;
        const fields = {};
        fields['id'] = filter.id;
        fields['title'] = (0, utils_1.getLike)(filter.title);
        fields['description'] = (0, utils_1.getLike)(filter.description);
        fields['price'] = (_a = filter.price) !== null && _a !== void 0 ? _a : (0, utils_1.getBetween)(filter.minPrice, filter.maxPrice);
        fields['publicationYear'] = (_b = filter.publicationYear) !== null && _b !== void 0 ? _b : (0, utils_1.getBetween)(filter.minPublicationYear, filter.maxPublicationYear);
        fields['image'] = (0, utils_1.getLike)(filter.image);
        fields['isbn'] = (0, utils_1.getLike)(filter.isbn);
        fields['categories'] = (0, utils_1.getInById)(filter.categoriesId);
        fields['categories'] = (_c = fields['categories']) !== null && _c !== void 0 ? _c : (filter.categoryName
            ? { name: (0, typeorm_2.Like)(filter.categoryName) } : undefined);
        fields['authors'] = (0, utils_1.getInById)(filter.authorsId);
        fields['authors'] = (_d = fields['authors']) !== null && _d !== void 0 ? _d : (filter.authorName
            ? { name: (0, typeorm_2.Like)(filter.authorName) } : undefined);
        return fields;
    }
    async save(item) {
        return this.bookRepository.save(item);
    }
};
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(Category_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(Author_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map