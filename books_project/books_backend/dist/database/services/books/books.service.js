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
const page_dto_1 = require("../../../dto/pagination/page.dto");
const page_meta_dto_1 = require("../../../dto/pagination/page-meta.dto");
let BooksService = exports.BooksService = class BooksService {
    constructor(bookRepository, categoryRepository, authorRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
        this.authorRepository = authorRepository;
    }
    async findAll(filter, withDeleted = false) {
        return this.bookRepository.find({
            where: await this.getFilter(filter),
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
                'userCartItems'
            ],
            withDeleted,
        });
    }
    async findAllByPagination(filter, withDeleted = false) {
        const count = await this.bookRepository.count({
            where: await this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
                'userCartItems'
            ],
            withDeleted,
        });
        const items = await this.bookRepository.find({
            where: await this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
                'userCartItems'
            ],
            order: { deletedAt: 'ASC', bookRatingStatistic: { value: 'DESC' } },
            relationLoadStrategy: 'join',
            withDeleted,
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({
            itemCount: count,
            pageOptionsDto: filter,
        });
        return new page_dto_1.PageDto(items, pageMetaDto);
    }
    async findOne(filter, withDeleted = false) {
        return this.bookRepository.findOne({
            where: await this.getFilter(filter),
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
                'userCartItems'
            ],
            withDeleted,
        });
    }
    async findOneWithCartItems(filter, withDeleted = false) {
        return this.bookRepository.findOne({
            where: await this.getFilter(filter),
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
                'userCartItems'
            ],
            withDeleted,
        });
    }
    async getFilter(filter) {
        var _a, _b, _c, _d, _e;
        const fields = {};
        fields['id'] = (_a = filter.id) !== null && _a !== void 0 ? _a : (filter.ids ? (0, typeorm_2.In)(filter.ids) : undefined);
        fields['title'] = (0, utils_1.getLike)(filter.title);
        fields['description'] = (0, utils_1.getLike)(filter.description);
        fields['price'] = (_b = filter.price) !== null && _b !== void 0 ? _b : (0, utils_1.getBetween)(filter.minPrice, filter.maxPrice);
        fields['publicationYear'] = (_c = filter.publicationYear) !== null && _c !== void 0 ? _c : (0, utils_1.getBetween)(filter.minPublicationYear, filter.maxPublicationYear);
        fields['image'] = (0, utils_1.getLike)(filter.image);
        fields['isbn'] = (0, utils_1.getLike)(filter.isbn);
        fields['categories'] = (0, utils_1.getInById)(filter.categoriesId);
        fields['categories'] = (_d = fields['categories']) !== null && _d !== void 0 ? _d : (filter.categoryName
            ? { name: (0, typeorm_2.Like)(filter.categoryName) } : undefined);
        fields['authors'] = (0, utils_1.getInById)(filter.authorsId);
        fields['authors'] = (_e = fields['authors']) !== null && _e !== void 0 ? _e : (filter.authorName
            ? { name: (0, typeorm_2.Like)(filter.authorName) } : undefined);
        return fields;
    }
    async save(item) {
        return this.bookRepository.save(item);
    }
    async delete(item) {
        return this.bookRepository.softRemove(item);
    }
    async getPriceRange() {
        return {
            min: await this.bookRepository.minimum('price'),
            max: await this.bookRepository.maximum('price'),
        };
    }
    async getPublicationYearRange() {
        return {
            min: await this.bookRepository.minimum('publicationYear'),
            max: await this.bookRepository.maximum('publicationYear'),
        };
    }
    async getPublicationYearRangeWithDeleted() {
        const books = await this.bookRepository.find();
        const years = books.map(b => b.publicationYear);
        return {
            min: Math.min(...years),
            max: Math.max(...years),
        };
    }
    async topBooksByRating() {
        return this.bookRepository.find({
            order: { bookRatingStatistic: { value: 'DESC' } },
            take: 10,
            relations: ['categories', 'authors', 'bookFiles', 'bookFiles.fileExtension', 'bookRatings', 'bookRatingStatistic', 'bookViewStatistic'],
            relationLoadStrategy: 'join',
        });
    }
    async topBooksByViewed() {
        return this.bookRepository.find({
            order: { bookViewStatistic: { amount: 'DESC' } },
            take: 10,
            relations: ['categories', 'authors', 'bookFiles', 'bookFiles.fileExtension', 'bookRatings', 'bookRatingStatistic', 'bookViewStatistic'],
            relationLoadStrategy: 'join',
        });
    }
    async topBooksByAddition() {
        return this.bookRepository.find({
            order: { createdAt: 'DESC' },
            take: 10,
            relations: ['categories', 'authors', 'bookFiles', 'bookFiles.fileExtension', 'bookRatings', 'bookRatingStatistic', 'bookViewStatistic'],
            relationLoadStrategy: 'join',
        });
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