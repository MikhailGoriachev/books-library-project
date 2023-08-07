"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformStringToArrayString = exports.transformStringToArrayNumber = exports.parseBoolean = exports.getInById = exports.getById = exports.getDateBetween = exports.getBetween = exports.getLikeForStringWords = exports.getLike = void 0;
const typeorm_1 = require("typeorm");
function getLike(value) {
    return value ? (0, typeorm_1.Like)(value + '%') : undefined;
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
    if (value.length > 1)
        return value.map(v => +v);
    return typeof (value[0]) === "string"
        ? value[0].split(',').map((v) => +v)
        : value;
}
exports.transformStringToArrayNumber = transformStringToArrayNumber;
function transformStringToArrayString({ value }) {
    return typeof (value[0]) === "string"
        ? value[0].split(',')
        : value;
}
exports.transformStringToArrayString = transformStringToArrayString;
//# sourceMappingURL=utils.js.map