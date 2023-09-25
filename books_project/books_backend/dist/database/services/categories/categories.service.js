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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Category_1 = require("../../entities/Category");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
let CategoriesService = exports.CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findAll(filter, withDeleted = false) {
        return this.categoryRepository.find({
            where: this.getFilter(filter),
            relations: ['books', 'categoryViewStatistic'],
            withDeleted
        });
    }
    async findOne(filter, withDeleted = false) {
        return this.categoryRepository.findOne({
            where: this.getFilter(filter),
            relations: ['books', 'categoryViewStatistic'],
            withDeleted
        });
    }
    getFilter(filter) {
        var _a;
        const fields = {};
        fields['id'] = (_a = filter.id) !== null && _a !== void 0 ? _a : (filter.ids ? (0, typeorm_2.In)(filter.ids) : undefined);
        fields['name'] = (0, utils_1.getLike)(filter.name);
        return fields;
    }
    async save(item) {
        return this.categoryRepository.save(item);
    }
};
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Category_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map