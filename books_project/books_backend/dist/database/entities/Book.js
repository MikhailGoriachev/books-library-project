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
exports.Book = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Author_1 = require("./Author");
const BookFile_1 = require("./BookFile");
const Sale_1 = require("./Sale");
const BookRating_1 = require("./BookRating");
const UserCartItem_1 = require("./UserCartItem");
const BookView_1 = require("./BookView");
const BookRatingStatistic_1 = require("./BookRatingStatistic");
const BookViewStatistic_1 = require("./BookViewStatistic");
const BaseEntity_1 = require("./BaseEntity");
let Book = exports.Book = class Book extends BaseEntity_1.BaseEntity {
    constructor(title, description, image, price, publicationYear, isbn) {
        super();
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], Book.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Book.prototype, "publicationYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Category_1.Category, category => category.books),
    __metadata("design:type", Object)
], Book.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Author_1.Author, author => author.books),
    __metadata("design:type", Object)
], Book.prototype, "authors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => BookFile_1.BookFile, bookFile => bookFile.book),
    __metadata("design:type", Object)
], Book.prototype, "bookFiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Sale_1.Sale, sale => sale.book),
    __metadata("design:type", Object)
], Book.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => BookRating_1.BookRating, bookRating => bookRating.book),
    __metadata("design:type", Object)
], Book.prototype, "bookRatings", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => BookRatingStatistic_1.BookRatingStatistic, BookRatingStatistic => BookRatingStatistic.book),
    __metadata("design:type", Object)
], Book.prototype, "bookRatingStatistic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => UserCartItem_1.UserCartItem, userCartItem => userCartItem.book),
    __metadata("design:type", Object)
], Book.prototype, "userCartItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => BookView_1.BookView, bookView => bookView.book),
    __metadata("design:type", Object)
], Book.prototype, "bookViews", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => BookViewStatistic_1.BookViewStatistic, bookViewStatistic => bookViewStatistic.book),
    __metadata("design:type", Object)
], Book.prototype, "bookViewStatistic", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String, Number, Number, String])
], Book);
//# sourceMappingURL=Book.js.map