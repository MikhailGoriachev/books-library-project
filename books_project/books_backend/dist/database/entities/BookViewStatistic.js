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
exports.BookViewStatistic = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const BaseEntity_1 = require("./BaseEntity");
let BookViewStatistic = exports.BookViewStatistic = class BookViewStatistic extends BaseEntity_1.BaseEntity {
    constructor(book, amount) {
        super();
        this.book = book;
        this.amount = amount;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookViewStatistic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Book_1.Book, book => book.bookViewStatistic),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], BookViewStatistic.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], BookViewStatistic.prototype, "amount", void 0);
exports.BookViewStatistic = BookViewStatistic = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Book_1.Book, Number])
], BookViewStatistic);
//# sourceMappingURL=BookViewStatistic.js.map