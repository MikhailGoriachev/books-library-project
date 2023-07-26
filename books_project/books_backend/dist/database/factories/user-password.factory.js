"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const UserPassword_1 = require("../entities/UserPassword");
const bcrypt = require("bcrypt");
exports.default = (0, typeorm_extension_1.setSeederFactory)(UserPassword_1.UserPassword, async (faker) => {
    const isServiceAuth = faker.helpers.rangeToNumber({ min: 0, max: 10 }) < 5;
    const salt = 10;
    return new UserPassword_1.UserPassword(null, !isServiceAuth ? (await bcrypt.hash(faker.internet.password(), salt)) : null, isServiceAuth);
});
//# sourceMappingURL=user-password.factory.js.map