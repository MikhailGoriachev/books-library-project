"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const api_config_service_1 = require("../services/api-config/api-config.service");
const jwt_access_auth_guard_1 = require("./guards/jwt-access-auth.guard");
const jwt_refresh_auth_guard_1 = require("./guards/jwt-refresh-auth.guard");
const jwt_access_strategy_1 = require("./strategies/jwt-access.strategy");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh.strategy");
const mail_module_1 = require("../mail/mail.module");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: () => ({}),
            }),
            mail_module_1.MailModule
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_access_strategy_1.JwtAccessStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            api_config_service_1.ApiConfigService,
            jwt_access_auth_guard_1.JwtAccessAuthGuard,
            jwt_refresh_auth_guard_1.JwtRefreshAuthGuard
        ],
        exports: [
            auth_service_1.AuthService
        ],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map