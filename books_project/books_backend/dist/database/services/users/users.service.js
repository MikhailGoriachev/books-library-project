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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../entities/User");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const page_dto_1 = require("../../../dto/pagination/page.dto");
const page_meta_dto_1 = require("../../../dto/pagination/page-meta.dto");
let UsersService = exports.UsersService = class UsersService {
    constructor(_usersRepository) {
        this._usersRepository = _usersRepository;
    }
    async findAll(filter, withDeleted = true) {
        return this._usersRepository.find({
            where: this.getFilter(filter),
            relations: ['sales', 'sales.book', 'userCartItems', 'userCartItems.book', 'blockedUsers', 'roles'],
            withDeleted,
        });
    }
    async findAllByPagination(filter, withDeleted = true) {
        const count = await this._usersRepository.count({
            where: this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: ['sales', 'userCartItems', 'blockedUsers', 'roles'],
            withDeleted,
        });
        const items = await this._usersRepository.find({
            where: this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: ['sales', 'sales.book', 'userCartItems', 'userCartItems.book', 'blockedUsers', 'roles'],
            relationLoadStrategy: 'join',
            withDeleted,
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({
            itemCount: count,
            pageOptionsDto: filter,
        });
        return new page_dto_1.PageDto(items, pageMetaDto);
    }
    async findOne(filter, withDeleted = true) {
        return this._usersRepository.findOne({
            where: this.getFilter(filter),
            relations: ['sales', 'sales.book', 'userCartItems', 'userCartItems.book', 'blockedUsers', 'roles'],
            withDeleted,
        });
    }
    getFilter(filter) {
        const fields = {};
        fields['id'] = filter.id;
        fields['name'] = (0, utils_1.getLike)(filter.name);
        fields['email'] = (0, utils_1.getLike)(filter.email);
        return fields;
    }
    async save(item) {
        return this._usersRepository.save(item);
    }
    async getUserWithPassword(filter) {
        return await this._usersRepository.findOne({
            where: this.getFilter(filter),
            relations: ['sales', 'sales.book', 'userCartItems', 'userCartItems.book', 'blockedUsers', 'roles', 'userPassword'],
            withDeleted: true,
        });
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map