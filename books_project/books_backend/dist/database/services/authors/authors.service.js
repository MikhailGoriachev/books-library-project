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
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Author_1 = require("../../entities/Author");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const Book_1 = require("../../entities/Book");
const page_dto_1 = require("../../../dto/pagination/page.dto");
const page_meta_dto_1 = require("../../../dto/pagination/page-meta.dto");
let AuthorsService = exports.AuthorsService = class AuthorsService {
    constructor(authorRepository, bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }
    async findAll(filter, withDeleted = false) {
        return this.authorRepository.find({
            where: this.getFilter(filter),
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });
    }
    async findOne(filter, withDeleted = false) {
        return this.authorRepository.findOne({
            where: this.getFilter(filter),
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });
    }
    async findAllByPagination(filter, withDeleted = false) {
        const count = await this.authorRepository.count({
            where: this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });
        const items = await this.authorRepository.find({
            where: Object.assign({}, this.getFilter(filter)),
            skip: filter.skip,
            take: filter.take,
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({
            itemCount: count,
            pageOptionsDto: filter,
        });
        return new page_dto_1.PageDto(items, pageMetaDto);
    }
    getFilter(filter) {
        var _a;
        const fields = {};
        fields['id'] = (_a = filter.id) !== null && _a !== void 0 ? _a : (filter.ids ? (0, typeorm_2.In)(filter.ids) : undefined);
        fields['name'] = (0, utils_1.getLike)(filter.name);
        fields['description'] = (0, utils_1.getLike)(filter.description);
        fields['detailsLink'] = (0, utils_1.getLike)(filter.detailsLink);
        fields['image'] = (0, utils_1.getLike)(filter.image);
        fields['books'] = (0, utils_1.getInById)(filter.booksId);
        return fields;
    }
    async save(item) {
        return this.authorRepository.save(item);
    }
    async delete(item) {
        return this.authorRepository.softRemove(item);
    }
};
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Author_1.Author)),
    __param(1, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthorsService);
//# sourceMappingURL=authors.service.js.map