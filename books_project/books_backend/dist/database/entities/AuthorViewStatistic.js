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
exports.AuthorViewStatistic = void 0;
const typeorm_1 = require("typeorm");
const Author_1 = require("./Author");
let AuthorViewStatistic = exports.AuthorViewStatistic = class AuthorViewStatistic {
    constructor(author, amount) {
        this.author = author;
        this.amount = amount;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AuthorViewStatistic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Author_1.Author, author => author.authorViewStatistics, { cascade: true }),
    __metadata("design:type", Object)
], AuthorViewStatistic.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], AuthorViewStatistic.prototype, "amount", void 0);
exports.AuthorViewStatistic = AuthorViewStatistic = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Author_1.Author, Number])
], AuthorViewStatistic);
//# sourceMappingURL=AuthorViewStatistic.js.map