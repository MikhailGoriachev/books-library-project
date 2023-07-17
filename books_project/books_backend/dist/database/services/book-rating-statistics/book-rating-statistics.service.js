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
exports.BookRatingStatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BookRatingStatistic_1 = require("../../entities/BookRatingStatistic");
const typeorm_2 = require("typeorm");
const Book_1 = require("../../entities/Book");
const utils_1 = require("../../../infrastructure/utils");
const User_1 = require("../../entities/User");
let BookRatingStatisticsService = exports.BookRatingStatisticsService = class BookRatingStatisticsService {
    constructor(bookRatingStatisticRepository, bookRepository, userRepository) {
        this.bookRatingStatisticRepository = bookRatingStatisticRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }
    async findAll(filter) {
        return this.bookRatingStatisticRepository.find({
            where: this.getFilter(filter),
            relations: ['book'],
        });
    }
    async findOne(filter) {
        return this.bookRatingStatisticRepository.findOne({
            where: this.getFilter(filter),
            relations: ['book'],
        });
    }
    getFilter(filter) {
        var _a;
        const fields = {};
        fields['id'] = filter.id;
        fields['book'] = (0, utils_1.getById)(filter.bookId);
        fields['value'] = (_a = filter.value) !== null && _a !== void 0 ? _a : (0, utils_1.getBetween)(filter.minValue, filter.maxValue);
        return fields;
    }
    async save(item) {
        return this.bookRatingStatisticRepository.save(item);
    }
};
exports.BookRatingStatisticsService = BookRatingStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BookRatingStatistic_1.BookRatingStatistic)),
    __param(1, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __param(2, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookRatingStatisticsService);
//# sourceMappingURL=book-rating-statistics.service.js.map