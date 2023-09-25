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
exports.BookRatingStatisticsController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../../../guards/roles/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles/roles.decorator");
const RolesEnum_1 = require("../../../infrastructure/RolesEnum");
const jwt_access_auth_guard_1 = require("../../../auth/guards/jwt-access-auth.guard");
const book_rating_statistic_filter_dto_1 = require("../../../dto/filters/book-rating-statistic-filter.dto");
const book_rating_statistics_service_1 = require("../../../database/services/book-rating-statistics/book-rating-statistics.service");
const book_rating_statistic_dto_1 = require("../../../dto/crud/book-rating-statistic.dto");
const BookRatingStatistic_1 = require("../../../database/entities/BookRatingStatistic");
let BookRatingStatisticsController = exports.BookRatingStatisticsController = class BookRatingStatisticsController {
    constructor(_bookRatingStatisticsService) {
        this._bookRatingStatisticsService = _bookRatingStatisticsService;
    }
    findAll(filter) {
        return this._bookRatingStatisticsService.findAll(filter);
    }
    findOne(filter) {
        return this._bookRatingStatisticsService.findOne(filter);
    }
    findOneById(id) {
        return this._bookRatingStatisticsService.findOne({ id });
    }
    create(item) {
        item.id = null;
        return this._bookRatingStatisticsService.save(Object.assign(new BookRatingStatistic_1.BookRatingStatistic(), item));
    }
    update(item) {
        return this._bookRatingStatisticsService.save(Object.assign(new BookRatingStatistic_1.BookRatingStatistic(), item));
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_statistic_filter_dto_1.BookRatingStatisticFilterDto]),
    __metadata("design:returntype", void 0)
], BookRatingStatisticsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('first'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_statistic_filter_dto_1.BookRatingStatisticFilterDto]),
    __metadata("design:returntype", void 0)
], BookRatingStatisticsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookRatingStatisticsController.prototype, "findOneById", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_statistic_dto_1.BookRatingStatisticDto]),
    __metadata("design:returntype", void 0)
], BookRatingStatisticsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_rating_statistic_dto_1.BookRatingStatisticDto]),
    __metadata("design:returntype", void 0)
], BookRatingStatisticsController.prototype, "update", null);
exports.BookRatingStatisticsController = BookRatingStatisticsController = __decorate([
    (0, common_1.Controller)('book-rating-statistics'),
    __metadata("design:paramtypes", [book_rating_statistics_service_1.BookRatingStatisticsService])
], BookRatingStatisticsController);
//# sourceMappingURL=book-rating-statistics.controller.js.map