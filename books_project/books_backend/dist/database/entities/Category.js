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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const typeorm_2 = require("typeorm");
const CategoryView_1 = require("./CategoryView");
const CategoryViewStatistic_1 = require("./CategoryViewStatistic");
let Category = exports.Category = class Category {
    constructor(name) {
        this.name = name;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Book_1.Book, books => books.categories),
    (0, typeorm_2.JoinTable)(),
    __metadata("design:type", Object)
], Category.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => CategoryView_1.CategoryView, categoryView => categoryView.category),
    __metadata("design:type", Object)
], Category.prototype, "categoryViews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => CategoryViewStatistic_1.CategoryViewStatistic, categoryViewStatistic => categoryViewStatistic.category),
    __metadata("design:type", Object)
], Category.prototype, "categoryViewStatistics", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String])
], Category);
//# sourceMappingURL=Category.js.map