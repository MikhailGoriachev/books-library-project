"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const UserPassword_1 = require("../entities/UserPassword");
exports.default = (0, typeorm_extension_1.setSeederFactory)(UserPassword_1.UserPassword, async (faker) => {
    const isServiceAuth = faker.helpers.rangeToNumber({ min: 0, max: 10 }) < 5;
    return new UserPassword_1.UserPassword(null, !isServiceAuth ? faker.internet.password() : null, isServiceAuth);
});
//# sourceMappingURL=user-password.factory.js.map