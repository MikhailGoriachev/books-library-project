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
exports.JwtAccessStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const passport_jwt_2 = require("passport-jwt");
const api_config_service_1 = require("../../services/api-config/api-config.service");
const auth_service_1 = require("../auth.service");
const expired_tokens_service_1 = require("../../database/services/expired-tokens/expired-tokens.service");
let JwtAccessStrategy = exports.JwtAccessStrategy = class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-access') {
    constructor(_authService, _apiConfigService, _expiredTokensService) {
        super({
            jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _apiConfigService.jwtAccessSecret,
        });
        this._authService = _authService;
        this._apiConfigService = _apiConfigService;
        this._expiredTokensService = _expiredTokensService;
    }
    async validate(payload) {
        const result = await this._authService.validateUser(payload.email);
        if (!result)
            throw new common_1.UnauthorizedException();
        return result;
    }
};
exports.JwtAccessStrategy = JwtAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        api_config_service_1.ApiConfigService,
        expired_tokens_service_1.ExpiredTokensService])
], JwtAccessStrategy);
//# sourceMappingURL=jwt-access.strategy.js.map