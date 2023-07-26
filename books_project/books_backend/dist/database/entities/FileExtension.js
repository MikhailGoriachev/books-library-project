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
exports.FileExtension = void 0;
const typeorm_1 = require("typeorm");
const BookFile_1 = require("./BookFile");
let FileExtension = exports.FileExtension = class FileExtension {
    constructor(name) {
        this.name = name;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileExtension.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], FileExtension.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => BookFile_1.BookFile, bookFile => bookFile.fileExtension),
    __metadata("design:type", Object)
], FileExtension.prototype, "bookFiles", void 0);
exports.FileExtension = FileExtension = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String])
], FileExtension);
//# sourceMappingURL=FileExtension.js.map