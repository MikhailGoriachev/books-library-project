"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = exports.transformStringToArrayString = exports.transformStringToArrayNumber = exports.parseBoolean = exports.getInById = exports.getById = exports.getDateBetween = exports.getBetween = exports.getLikeForStringWords = exports.getLike = void 0;
const typeorm_1 = require("typeorm");
const crypto = require("crypto");
function getLike(value) {
    return value ? (0, typeorm_1.Like)('%' + value + '%') : undefined;
}
exports.getLike = getLike;
function getLikeForStringWords(line) {
}
exports.getLikeForStringWords = getLikeForStringWords;
function getBetween(a, b) {
    return a !== undefined && b !== undefined ? (0, typeorm_1.Between)(a, b) : undefined;
}
exports.getBetween = getBetween;
function getDateBetween(a, b) {
    return a !== undefined && b !== undefined ? (0, typeorm_1.Between)(a, b) : undefined;
}
exports.getDateBetween = getDateBetween;
function getById(id) {
    return id !== undefined ? { id } : undefined;
}
exports.getById = getById;
function getInById(id) {
    return id !== undefined ? { id: (0, typeorm_1.In)(id) } : undefined;
}
exports.getInById = getInById;
function parseBoolean(value) {
    return value === undefined ? undefined : value == 'true';
}
exports.parseBoolean = parseBoolean;
function transformStringToArrayNumber({ value }) {
    if (!Array.isArray(value))
        return [+value];
    if (value.length > 1)
        return value.map(v => +v);
    return typeof (value[0]) === 'string'
        ? value[0].split(',').map((v) => +v)
        : value;
}
exports.transformStringToArrayNumber = transformStringToArrayNumber;
function transformStringToArrayString({ value }) {
    return typeof (value[0]) === 'string'
        ? value[0].split(',')
        : value;
}
exports.transformStringToArrayString = transformStringToArrayString;
function generateRandomPassword(length = 8) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        password += charset[randomIndex];
    }
    return password;
}
exports.generateRandomPassword = generateRandomPassword;
//# sourceMappingURL=utils.js.map