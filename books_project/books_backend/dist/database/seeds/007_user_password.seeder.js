"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const UserPassword_1 = require("../entities/UserPassword");
class UserPasswordSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const users = (await userRepository.find()).slice(2);
        const userPasswords = [];
        for (const user of users)
            userPasswords.push(await factoryManager.get(UserPassword_1.UserPassword).make({ user }));
        return dataSource.getRepository(UserPassword_1.UserPassword).save(userPasswords);
    }
}
exports.default = UserPasswordSeeder;
//# sourceMappingURL=007_user_password.seeder.js.map