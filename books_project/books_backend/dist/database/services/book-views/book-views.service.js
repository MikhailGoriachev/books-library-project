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
exports.BookViewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BookView_1 = require("../../entities/BookView");
const typeorm_2 = require("typeorm");
const Book_1 = require("../../entities/Book");
const User_1 = require("../../entities/User");
const utils_1 = require("../../../infrastructure/utils");
let BookViewsService = exports.BookViewsService = class BookViewsService {
    constructor(bookViewRepository, bookRepository, userRepository) {
        this.bookViewRepository = bookViewRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }
    async findAll(filter) {
        return this.bookViewRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }
    async findOne(filter) {
        return this.bookViewRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }
    getFilter(filter) {
        var _a;
        const fields = {};
        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['book'] = this.bookRepository.findOneBy({ id: filter.bookId });
        fields['viewedAt'] = (_a = filter.viewedAt) !== null && _a !== void 0 ? _a : (0, utils_1.getDateBetween)(filter.minViewedAt, filter.maxViewedAt);
        return fields;
    }
    async save(item) {
        return this.bookViewRepository.save(item);
    }
};
exports.BookViewsService = BookViewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BookView_1.BookView)),
    __param(1, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __param(2, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookViewsService);
//# sourceMappingURL=book-views.service.js.map