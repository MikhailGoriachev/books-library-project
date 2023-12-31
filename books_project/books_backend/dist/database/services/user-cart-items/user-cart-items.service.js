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
exports.UserCartItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserCartItem_1 = require("../../entities/UserCartItem");
const typeorm_2 = require("typeorm");
const User_1 = require("../../entities/User");
const Book_1 = require("../../entities/Book");
let UserCartItemsService = exports.UserCartItemsService = class UserCartItemsService {
    constructor(cartItemRepository, userRepository, bookRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    async findAll(filter) {
        return this.cartItemRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'book', 'book.authors'],
        });
    }
    async findOne(filter) {
        return this.cartItemRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'book', 'book.authors'],
        });
    }
    getFilter(filter) {
        const fields = {};
        fields['id'] = filter.id;
        fields['user'] = filter.userId !== undefined
            ? { id: filter.userId } : undefined;
        fields['book'] = filter.bookId !== undefined
            ? { id: filter.bookId } : undefined;
        return fields;
    }
    async save(item) {
        return this.cartItemRepository.save(item);
    }
    async saveAll(items) {
        return this.cartItemRepository.save(items);
    }
    async delete(id) {
        await this.cartItemRepository.remove(await this.cartItemRepository.findOneBy({ id }));
    }
    async deleteAll(cartItems) {
        await this.cartItemRepository.remove(cartItems);
    }
};
exports.UserCartItemsService = UserCartItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserCartItem_1.UserCartItem)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Book_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserCartItemsService);
//# sourceMappingURL=user-cart-items.service.js.map