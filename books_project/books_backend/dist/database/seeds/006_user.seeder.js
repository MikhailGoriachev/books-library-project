"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
class UserSeeder {
    async run(dataSource, factoryManager) {
        const amount = 50;
        return factoryManager.get(User_1.User).saveMany(amount);
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=006_user.seeder.js.map