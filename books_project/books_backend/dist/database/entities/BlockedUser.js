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
exports.BlockedUser = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const BaseEntity_1 = require("./BaseEntity");
let BlockedUser = exports.BlockedUser = class BlockedUser extends BaseEntity_1.BaseEntity {
    constructor(user, blockedAt, unblockedAt) {
        super();
        this.user = user;
        this.blockedAt = blockedAt;
        this.unblockedAt = unblockedAt;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BlockedUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => User_1.User, user => user.blockedUsers),
    __metadata("design:type", Object)
], BlockedUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], BlockedUser.prototype, "blockedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], BlockedUser.prototype, "unblockedAt", void 0);
exports.BlockedUser = BlockedUser = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [User_1.User, Date, Date])
], BlockedUser);
//# sourceMappingURL=BlockedUser.js.map