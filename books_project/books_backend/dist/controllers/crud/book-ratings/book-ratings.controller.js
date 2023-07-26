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
exports.BookRatingsController = void 0;
const common_1 = require("@nestjs/common");
const book_ratings_service_1 = require("../../../database/services/book-ratings/book-ratings.service");
const book_rating_filter_dto_1 = require("../../../dto/filters/book-rating-filter.dto");
const book_rating_dto_1 = require("../../../dto/crud/book-rating.dto");
const BookRating_1 = require("../../../database/entities/BookRating");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
let BookRatingsController = exports.BookRatingsController = class BookRatingsController {
    constructor(_bookRatingsService) {
        this._bookRatingsService = _bookRatingsService;
    }
    findAll(filter) {
        return this._bookRatingsService.findAll(filter);
    }
    findOne(filter) {
        return this._bookRatingsService.findOne(filter);
    }
    findOneById(id) {
        return this._bookRatingsService.findOne({ id });
    }
    create(item) {
        item.id = null;
        return this._bookRatingsService.save(Object.assign(new BookRating_1.BookRating(), item));
    }
    update(item) {
        return this._bookRatingsService.save(Object.assign(new BookRating_1.BookRating(), item));
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_filter_dto_1.BookRatingFilterDto]),
    __metadata("design:returntype", void 0)
], BookRatingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('first'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_filter_dto_1.BookRatingFilterDto]),
    __metadata("design:returntype", void 0)
], BookRatingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookRatingsController.prototype, "findOneById", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_dto_1.BookRatingDto]),
    __metadata("design:returntype", void 0)
], BookRatingsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_dto_1.BookRatingDto]),
    __metadata("design:returntype", void 0)
], BookRatingsController.prototype, "update", null);
exports.BookRatingsController = BookRatingsController = __decorate([
    (0, common_1.Controller)('book-ratings'),
    __metadata("design:paramtypes", [book_ratings_service_1.BookRatingsService])
], BookRatingsController);
//# sourceMappingURL=book-ratings.controller.js.map