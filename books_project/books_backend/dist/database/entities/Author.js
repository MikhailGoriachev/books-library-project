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
exports.Author = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const AuthorView_1 = require("./AuthorView");
const AuthorViewStatistic_1 = require("./AuthorViewStatistic");
const BaseEntity_1 = require("./BaseEntity");
let Author = exports.Author = class Author extends BaseEntity_1.BaseEntity {
    constructor(name, description, detailsLink, image) {
        super();
        this.name = name;
        this.description = description;
        this.detailsLink = detailsLink;
        this.image = image;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Author.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    __metadata("design:type", String)
], Author.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 512 }),
    __metadata("design:type", String)
], Author.prototype, "detailsLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Author.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Book_1.Book, book => book.authors),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Object)
], Author.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => AuthorView_1.AuthorView, authorView => authorView.author),
    __metadata("design:type", Object)
], Author.prototype, "authorViews", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => AuthorViewStatistic_1.AuthorViewStatistic, authorViewStatistic => authorViewStatistic.author),
    __metadata("design:type", Object)
], Author.prototype, "authorViewStatistic", void 0);
exports.Author = Author = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String, String])
], Author);
//# sourceMappingURL=Author.js.map