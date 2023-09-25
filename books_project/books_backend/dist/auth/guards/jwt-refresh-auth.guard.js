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
exports.JwtRefreshAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const expired_tokens_service_1 = require("../../database/services/expired-tokens/expired-tokens.service");
let JwtRefreshAuthGuard = exports.JwtRefreshAuthGuard = class JwtRefreshAuthGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor(_expiredTokensService) {
        super();
        this._expiredTokensService = _expiredTokensService;
    }
    async canActivate(context) {
        try {
            const res = await super.canActivate(context);
            if (!res)
                return new Promise(() => res);
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token || (await this._expiredTokensService.findOne(token)))
                throw new common_1.HttpException('Invalid refresh token', 498);
            return true;
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.HttpException('Invalid refresh token', 498);
            }
            throw err;
        }
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtRefreshAuthGuard = JwtRefreshAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expired_tokens_service_1.ExpiredTokensService])
], JwtRefreshAuthGuard);
//# sourceMappingURL=jwt-refresh-auth.guard.js.map