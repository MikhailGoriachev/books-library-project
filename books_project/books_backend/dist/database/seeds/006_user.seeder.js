"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const UserPassword_1 = require("../entities/UserPassword");
const bcrypt = require("bcrypt");
class UserSeeder {
    async run(dataSource, factoryManager) {
        await factoryManager.get(User_1.User).save(new User_1.User('guest', 'guest@gmail.com', 'default'));
        const admin = await factoryManager.get(User_1.User).save(new User_1.User('admin', 'admin@gmail.com', 'default'));
        const saltRounds = 10;
        const password = 'aA123456';
        const hashPassword = await bcrypt.hash(password, saltRounds);
        await factoryManager.get(UserPassword_1.UserPassword).save(new UserPassword_1.UserPassword(admin, hashPassword, false));
        const amount = 20;
        return factoryManager.get(User_1.User).saveMany(amount);
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=006_user.seeder.js.map