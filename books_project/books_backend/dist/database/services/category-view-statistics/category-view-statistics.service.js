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
exports.CategoryViewStatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const Category_1 = require("../../entities/Category");
const CategoryViewStatistic_1 = require("../../entities/CategoryViewStatistic");
let CategoryViewStatisticsService = exports.CategoryViewStatisticsService = class CategoryViewStatisticsService {
    constructor(categoryViewStatisticRepository, categoryRepository) {
        this.categoryViewStatisticRepository = categoryViewStatisticRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAll(filter) {
        return this.categoryViewStatisticRepository.find({
            where: this.getFilter(filter),
            relations: ['category'],
        });
    }
    async findOne(filter) {
        return this.categoryViewStatisticRepository.findOne({
            where: this.getFilter(filter),
            relations: ['category'],
        });
    }
    getFilter(filter) {
        var _a;
        const fields = {};
        fields['id'] = filter.id;
        fields['category'] = (0, utils_1.getById)(filter.categoryId);
        fields['amount'] = (_a = filter.amount) !== null && _a !== void 0 ? _a : (0, utils_1.getBetween)(filter.minAmount, filter.maxAmount);
        return fields;
    }
    async save(item) {
        return this.categoryViewStatisticRepository.save(item);
    }
};
exports.CategoryViewStatisticsService = CategoryViewStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(CategoryViewStatistic_1.CategoryViewStatistic)),
    __param(1, (0, typeorm_1.InjectRepository)(Category_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoryViewStatisticsService);
//# sourceMappingURL=category-view-statistics.service.js.map