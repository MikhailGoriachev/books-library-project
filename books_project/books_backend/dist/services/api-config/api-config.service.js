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
exports.ApiConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
let ApiConfigService = exports.ApiConfigService = class ApiConfigService {
    constructor(_configService) {
        this._configService = _configService;
    }
    get jwtAccessSecret() {
        return this._configService.get('JWT_ACCESS_SECRET');
    }
    get jwtRefreshSecret() {
        return this._configService.get('JWT_REFRESH_SECRET');
    }
    get jwtAccessExpiry() {
        return this._configService.get('JWT_ACCESS_TOKEN_EXPIRY');
    }
    get jwtRefreshExpiry() {
        return this._configService.get('JWT_REFRESH_TOKEN_EXPIRY');
    }
    get storagePath() {
        return (0, path_1.join)(process.cwd() + this._configService.get('STORAGE_PATH'));
    }
    get storageBookFilesPath() {
        return (0, path_1.join)(process.cwd(), this._configService.get('STORAGE_BOOK_FILES_PATH'));
    }
    get smtpMail() {
        return (0, path_1.join)(process.cwd(), this._configService.get('SMTP_MAIL'));
    }
    get smtpPassword() {
        return (0, path_1.join)(process.cwd(), this._configService.get('SMTP_PASSWORD'));
    }
};
exports.ApiConfigService = ApiConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiConfigService);
//# sourceMappingURL=api-config.service.js.map