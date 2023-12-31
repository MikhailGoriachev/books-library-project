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
exports.BookRating = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const User_1 = require("./User");
const BaseEntity_1 = require("./BaseEntity");
let BookRating = exports.BookRating = class BookRating extends BaseEntity_1.BaseEntity {
    constructor(user, book, value) {
        super();
        this.user = user;
        this.book = book;
        this.value = value;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookRating.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => User_1.User, user => user.bookRatings, { cascade: true }),
    __metadata("design:type", Object)
], BookRating.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Book_1.Book, book => book.bookRatings, { cascade: true }),
    __metadata("design:type", Object)
], BookRating.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], BookRating.prototype, "value", void 0);
exports.BookRating = BookRating = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [User_1.User, Book_1.Book, Number])
], BookRating);
//# sourceMappingURL=BookRating.js.map