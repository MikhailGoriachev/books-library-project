"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const User_1 = require("../entities/User");
exports.default = (0, typeorm_extension_1.setSeederFactory)(User_1.User, async (faker) => new User_1.User(faker.person.firstName(), faker.internet.email()));
//# sourceMappingURL=user.factory.js.map