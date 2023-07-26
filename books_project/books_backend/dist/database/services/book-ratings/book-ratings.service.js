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
exports.BookRatingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BookRating_1 = require("../../entities/BookRating");
const typeorm_2 = require("typeorm");
const Book_1 = require("../../entities/Book");
const utils_1 = require("../../../infrastructure/utils");
const User_1 = require("../../entities/User");
let BookRatingsService = exports.BookRatingsService = class BookRatingsService {
    constructor(bookRatingRepository, bookRepository, userRepository) {
        this.bookRatingRepository = bookRatingRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }
    async findAll(filter) {
        return this.bookRatingRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }
    async findOne(filter) {
        return this.bookRatingRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }
    getFilter(filter) {
        var _a;
        const fields = {};
        fields['id'] = filter.id;
        fields['user'] = filter.userId !== undefined ? { id: filter.userId } : undefined;
        fields['book'] = filter.bookId !== undefined ? { id: filter.bookId } : undefined;
        fields['value'] = (_a = filter.value) !== null && _a !== void 0 ? _a : (0, utils_1.getBetween)(filter.minValue, filter.maxValue);
        return fields;
    }
    async save(item) {
        return this.bookRatingRepository.save(item);
    }
    async delete(item) {
        return await this.bookRatingRepository.remove(item);
    }
    async deleteById(id) {
        return await this.bookRatingRepository.remove(await this.bookRatingRepository.findOneBy({ id }));
    }
};
exports.BookRatingsService = BookRatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BookRating_1.BookRating)),
    __param(1, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __param(2, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookRatingsService);
//# sourceMappingURL=book-ratings.service.js.map