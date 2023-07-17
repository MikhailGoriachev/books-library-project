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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorViewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const AuthorView_1 = require("../../entities/AuthorView");
const Author_1 = require("../../entities/Author");
const User_1 = require("../../entities/User");
let AuthorViewsService = exports.AuthorViewsService = class AuthorViewsService {
    constructor(authorViewRepository, authorRepository, userRepository) {
        this.authorViewRepository = authorViewRepository;
        this.authorRepository = authorRepository;
        this.userRepository = userRepository;
    }
    async findAll(filter) {
        return this.authorViewRepository.find({
            where: this.getFilter(filter),
            relations: ['author', 'user'],
        });
    }
    async findOne(filter) {
        return this.authorViewRepository.findOne({
            where: this.getFilter(filter),
            relations: ['authors', 'users'],
        });
    }
    getFilter(filter) {
        var _a;
        const fields = {};
        fields['id'] = filter.id;
        fields['user'] = (0, utils_1.getById)(filter.userId);
        fields['author'] = (0, utils_1.getById)(filter.authorId);
        fields['viewedAt'] = (_a = filter.viewedAt) !== null && _a !== void 0 ? _a : (0, utils_1.getDateBetween)(filter.minViewedAt, filter.maxViewedAt);
        return fields;
    }
    async save(item) {
        return this.authorViewRepository.save(item);
    }
};
exports.AuthorViewsService = AuthorViewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(AuthorView_1.AuthorView)),
    __param(1, (0, typeorm_1.InjectRepository)(Author_1.Author)),
    __param(2, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthorViewsService);
//# sourceMappingURL=author-views.service.js.map