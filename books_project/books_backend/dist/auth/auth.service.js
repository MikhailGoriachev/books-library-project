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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../database/services/users/users.service");
const jwt_1 = require("@nestjs/jwt");
const api_config_service_1 = require("../services/api-config/api-config.service");
const user_passwords_service_1 = require("../database/services/user-passwords/user-passwords.service");
const User_1 = require("../database/entities/User");
const UserPassword_1 = require("../database/entities/UserPassword");
const roles_service_1 = require("../database/services/roles/roles.service");
const bcrypt = require("bcrypt");
const expired_tokens_service_1 = require("../database/services/expired-tokens/expired-tokens.service");
const ExpiredToken_1 = require("../database/entities/ExpiredToken");
let AuthService = exports.AuthService = class AuthService {
    constructor(_usersService, _jwtService, _apiConfigService, _userPasswordsService, _roles, _expiredTokensService) {
        this._usersService = _usersService;
        this._jwtService = _jwtService;
        this._apiConfigService = _apiConfigService;
        this._userPasswordsService = _userPasswordsService;
        this._roles = _roles;
        this._expiredTokensService = _expiredTokensService;
    }
    async generateJwtRefreshToken(email, password) {
        const user = await this._usersService.getUserWithPassword({ email });
        if (!user || !(await bcrypt.compare(password, user.userPassword.password)) || user.isBlocked)
            throw new common_1.UnauthorizedException();
        const payload = { sub: user.id, email: user.email };
        return {
            refresh_token: await this._jwtService.signAsync(payload, {
                secret: this._apiConfigService.jwtRefreshSecret,
                expiresIn: this._apiConfigService.jwtRefreshExpiry,
            }),
        };
    }
    async generateJwtAccessToken(email) {
        const user = await this._usersService.findOne({ email });
        if (!user || user.isBlocked)
            throw new common_1.UnauthorizedException();
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this._jwtService.signAsync(payload, {
                secret: this._apiConfigService.jwtAccessSecret,
                expiresIn: this._apiConfigService.jwtAccessExpiry,
            }),
        };
    }
    async validateUser(email) {
        const user = await this._usersService.getUserWithPassword({ email });
        if (user && (!user.blockedUsers.find(b => !b.unblockedAt) || !user.isBlocked)) {
            const { userPassword } = user, result = __rest(user, ["userPassword"]);
            return result;
        }
        return null;
    }
    async login(email, password) {
        const user = await this._usersService.getUserWithPassword({ email });
        if (!user || user.userPassword.isServiceAuth ||
            !(await bcrypt.compare(password, user.userPassword.password)) || user.isBlocked)
            throw new common_1.UnauthorizedException();
        return {
            access_token: (await this.generateJwtAccessToken(user.email))['access_token'],
            refresh_token: (await this.generateJwtRefreshToken(email, password))['refresh_token'],
        };
    }
    async logout(accessToken, refreshToken) {
        try {
            const access = await this._jwtService.verifyAsync(accessToken, { secret: this._apiConfigService.jwtAccessSecret });
            const refresh = await this._jwtService.verifyAsync(refreshToken, { secret: this._apiConfigService.jwtRefreshSecret });
            const accessExpiredToken = new ExpiredToken_1.ExpiredToken(accessToken, new Date(access.exp * 1000));
            const refreshExpiredToken = new ExpiredToken_1.ExpiredToken(refreshToken, new Date(refresh.exp * 1000));
            await this._expiredTokensService.save(accessExpiredToken);
            await this._expiredTokensService.save(refreshExpiredToken);
        }
        catch (e) {
            return e;
        }
    }
    async registration(registration) {
        try {
            const user = new User_1.User(registration.name, registration.email);
            user.roles = [await this._roles.findOne({ name: 'user' })];
            await this._usersService.save(user);
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(registration.password, saltRounds);
            const userPassword = new UserPassword_1.UserPassword(user, hashPassword, false);
            await this._userPasswordsService.save(userPassword);
        }
        catch (e) {
            if (e.code === 'ER_DUP_ENTRY')
                return { message: 'Duplicate email' };
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        api_config_service_1.ApiConfigService,
        user_passwords_service_1.UserPasswordsService,
        roles_service_1.RolesService,
        expired_tokens_service_1.ExpiredTokensService])
], AuthService);
//# sourceMappingURL=auth.service.js.map