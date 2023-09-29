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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Sale_1 = require("./Sale");
const AuthorView_1 = require("./AuthorView");
const BookRating_1 = require("./BookRating");
const UserCartItem_1 = require("./UserCartItem");
const BookView_1 = require("./BookView");
const CategoryView_1 = require("./CategoryView");
const BlockedUser_1 = require("./BlockedUser");
const Role_1 = require("./Role");
const UserPassword_1 = require("./UserPassword");
const BaseEntity_1 = require("./BaseEntity");
let User = exports.User = class User extends BaseEntity_1.BaseEntity {
    get isBlocked() {
        return this.blockedUsers
            ? this.blockedUsers.find(b => b.unblockedAt === null) !== undefined
            : null;
    }
    constructor(name, email, image) {
        super();
        this.name = name;
        this.email = email;
        this.image = image;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Sale_1.Sale, sale => sale.user),
    __metadata("design:type", Object)
], User.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => BookRating_1.BookRating, bookRating => bookRating.user),
    __metadata("design:type", Object)
], User.prototype, "bookRatings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => UserCartItem_1.UserCartItem, userCartItem => userCartItem.user),
    __metadata("design:type", Object)
], User.prototype, "userCartItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => BookView_1.BookView, bookView => bookView.user),
    __metadata("design:type", Object)
], User.prototype, "bookViews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => AuthorView_1.AuthorView, authorView => authorView.user),
    __metadata("design:type", Object)
], User.prototype, "authorViews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => CategoryView_1.CategoryView, categoryView => categoryView.user),
    __metadata("design:type", Object)
], User.prototype, "categoryViews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => BlockedUser_1.BlockedUser, blockedUser => blockedUser.user),
    __metadata("design:type", Object)
], User.prototype, "blockedUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Role_1.Role, role => role.users),
    __metadata("design:type", Object)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => UserPassword_1.UserPassword, userPassword => userPassword.user, { cascade: true }),
    __metadata("design:type", Object)
], User.prototype, "userPassword", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String])
], User);
//# sourceMappingURL=User.js.map