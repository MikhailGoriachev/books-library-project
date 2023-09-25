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
exports.UserPassword = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const BaseEntity_1 = require("./BaseEntity");
let UserPassword = exports.UserPassword = class UserPassword extends BaseEntity_1.BaseEntity {
    constructor(user, password, isServiceAuth) {
        super();
        this.user = user;
        this.password = password;
        this.isServiceAuth = isServiceAuth;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPassword.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => User_1.User, user => user.userPassword),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], UserPassword.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], UserPassword.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserPassword.prototype, "isServiceAuth", void 0);
exports.UserPassword = UserPassword = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [User_1.User, String, Boolean])
], UserPassword);
//# sourceMappingURL=UserPassword.js.map