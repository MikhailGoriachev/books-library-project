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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("../dto/auth/auth.dto");
const jwt_access_auth_guard_1 = require("./guards/jwt-access-auth.guard");
const jwt_refresh_auth_guard_1 = require("./guards/jwt-refresh-auth.guard");
const registration_dto_1 = require("../dto/auth/registration.dto");
const roles_decorator_1 = require("../decorators/roles/roles.decorator");
const roles_guard_1 = require("../guards/roles/roles.guard");
const RolesEnum_1 = require("../infrastructure/RolesEnum");
const token_dto_1 = require("../dto/auth/token.dto");
let AuthController = exports.AuthController = class AuthController {
    constructor(_authService) {
        this._authService = _authService;
    }
    async registration(registration) {
        const error = await this._authService.registration(registration);
        if (error) {
            throw new common_1.HttpException(error.message, 401);
        }
        return this._authService.login(registration.email, registration.password);
    }
    async login(signInDto) {
        return this._authService.login(signInDto.email, signInDto.password);
    }
    async logout(token) {
        const error = await this._authService.logout(token.accessToken, token.refreshToken);
        if (error) {
            const { name } = error, result = __rest(error, ["name"]);
            return result;
        }
    }
    async getAccessToken(req) {
        console.log(`GET ACCESS TOKEN ${new Date()}`);
        return this._authService.generateJwtAccessToken(req.user.email);
    }
    getProfile(req) {
        return req.user;
    }
};
__decorate([
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_dto_1.RegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Get)('token'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAccessToken", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RolesEnum_1.RolesEnum.user, RolesEnum_1.RolesEnum.admin),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map