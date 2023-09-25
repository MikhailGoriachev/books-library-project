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
exports.AuthorView = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Author_1 = require("./Author");
const BaseEntity_1 = require("./BaseEntity");
let AuthorView = exports.AuthorView = class AuthorView extends BaseEntity_1.BaseEntity {
    constructor(user, author, viewedAt) {
        super();
        this.user = user;
        this.author = author;
        this.viewedAt = viewedAt;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AuthorView.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => User_1.User, user => user.authorViews, { cascade: true }),
    __metadata("design:type", Object)
], AuthorView.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Author_1.Author, author => author.authorViewStatistic, { cascade: true }),
    __metadata("design:type", Object)
], AuthorView.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], AuthorView.prototype, "viewedAt", void 0);
exports.AuthorView = AuthorView = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [User_1.User, Author_1.Author, Date])
], AuthorView);
//# sourceMappingURL=AuthorView.js.map