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
exports.ExpiredTokensService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ExpiredToken_1 = require("../../entities/ExpiredToken");
const typeorm_2 = require("typeorm");
let ExpiredTokensService = exports.ExpiredTokensService = class ExpiredTokensService {
    constructor(_expiredTokenRepository) {
        this._expiredTokenRepository = _expiredTokenRepository;
    }
    async find() {
        return this._expiredTokenRepository.find();
    }
    async findOne(token) {
        return this._expiredTokenRepository.findOneBy({ token });
    }
    async save(item) {
        return this._expiredTokenRepository.save(item);
    }
};
exports.ExpiredTokensService = ExpiredTokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ExpiredToken_1.ExpiredToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExpiredTokensService);
//# sourceMappingURL=expired-tokens.service.js.map