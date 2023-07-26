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
exports.UserCartItem = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const User_1 = require("./User");
let UserCartItem = exports.UserCartItem = class UserCartItem {
    constructor(user, book) {
        this.user = user;
        this.book = book;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserCartItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => User_1.User, user => user.userCartItems, { cascade: true }),
    __metadata("design:type", Object)
], UserCartItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Book_1.Book, book => book.userCartItems, { cascade: true }),
    __metadata("design:type", Object)
], UserCartItem.prototype, "book", void 0);
exports.UserCartItem = UserCartItem = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [User_1.User, Book_1.Book])
], UserCartItem);
//# sourceMappingURL=UserCartItem.js.map