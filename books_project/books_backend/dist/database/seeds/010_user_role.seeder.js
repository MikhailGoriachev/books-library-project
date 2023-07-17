"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("../entities/Role");
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
class UserRoleSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const roleRepository = dataSource.getRepository(Role_1.Role);
        const users = await userRepository.find();
        const roles = await roleRepository.find();
        for (const user of users) {
            const isAdmin = (0, crypto_1.randomInt)(0, 10) < 3;
            user.roles = roles.slice(0, isAdmin ? 1 : 2);
        }
        return dataSource.getRepository(User_1.User).save(users);
    }
}
exports.default = UserRoleSeeder;
//# sourceMappingURL=010_user_role.seeder.js.map