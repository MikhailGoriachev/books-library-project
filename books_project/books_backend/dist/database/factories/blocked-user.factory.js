"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const BlockedUser_1 = require("../entities/BlockedUser");
exports.default = (0, typeorm_extension_1.setSeederFactory)(BlockedUser_1.BlockedUser, async (faker) => {
    const isUnblocked = faker.helpers.rangeToNumber({ min: 0, max: 10 }) < 3;
    const startDateMin = new Date();
    startDateMin.setDate(-80);
    const startDateMax = new Date();
    startDateMax.setDate(-20);
    const endDateMin = new Date(startDateMin);
    endDateMin.setDate(startDateMin.getDate() + 1);
    const start = faker.date.between({ from: startDateMin, to: startDateMax });
    const finish = isUnblocked
        ? faker.date.between({ from: endDateMin, to: new Date() })
        : null;
    return new BlockedUser_1.BlockedUser(null, start, finish);
});
//# sourceMappingURL=blocked-user.factory.js.map