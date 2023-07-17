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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const Sale_1 = require("../../entities/Sale");
const User_1 = require("../../entities/User");
const Book_1 = require("../../entities/Book");
let SalesService = exports.SalesService = class SalesService {
    constructor(saleRepository, userRepository, bookRepository) {
        this.saleRepository = saleRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    async findAll(filter) {
        return this.saleRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }
    async findOne(filter) {
        return this.saleRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }
    getFilter(filter) {
        var _a, _b;
        const fields = {};
        fields['id'] = filter.id;
        fields['user'] = (0, utils_1.getById)(filter.userId);
        fields['book'] = (0, utils_1.getById)(filter.bookId);
        fields['price'] = (_a = filter.price) !== null && _a !== void 0 ? _a : (0, utils_1.getBetween)(filter.minPrice, filter.maxPrice);
        fields['saleAt'] = (_b = filter.saleAt) !== null && _b !== void 0 ? _b : (0, utils_1.getDateBetween)(filter.minSaleAt, filter.maxSaleAt);
        return fields;
    }
    async save(item) {
        return this.saleRepository.save(item);
    }
};
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Sale_1.Sale)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SalesService);
//# sourceMappingURL=sales.service.js.map