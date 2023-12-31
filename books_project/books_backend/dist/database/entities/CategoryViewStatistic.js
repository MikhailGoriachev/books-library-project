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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryViewStatistic = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const BaseEntity_1 = require("./BaseEntity");
let CategoryViewStatistic = exports.CategoryViewStatistic = class CategoryViewStatistic extends BaseEntity_1.BaseEntity {
    constructor(category, amount) {
        super();
        this.category = category;
        this.amount = amount;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoryViewStatistic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => Category_1.Category, category => category.categoryViewStatistic),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], CategoryViewStatistic.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CategoryViewStatistic.prototype, "amount", void 0);
exports.CategoryViewStatistic = CategoryViewStatistic = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Category_1.Category, Number])
], CategoryViewStatistic);
//# sourceMappingURL=CategoryViewStatistic.js.map