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
exports.BookFile = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const FileExtension_1 = require("./FileExtension");
let BookFile = exports.BookFile = class BookFile {
    constructor(path, fileExtension, book) {
        this.path = path;
        this.fileExtension = fileExtension;
        this.book = book;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BookFile.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => FileExtension_1.FileExtension, fileExtension => fileExtension.bookFiles, { cascade: true }),
    __metadata("design:type", Object)
], BookFile.prototype, "fileExtension", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Book_1.Book, book => book.bookFiles, { cascade: true }),
    __metadata("design:type", Object)
], BookFile.prototype, "book", void 0);
exports.BookFile = BookFile = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, FileExtension_1.FileExtension, Book_1.Book])
], BookFile);
//# sourceMappingURL=BookFile.js.map