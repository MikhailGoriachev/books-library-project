"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("../entities/Role");
const User_1 = require("../entities/User");
class UserRoleSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const roleRepository = dataSource.getRepository(Role_1.Role);
        let users = (await userRepository.find()).slice(1);
        const roles = await roleRepository.find();
        const adminName = 'admin';
        users.find(u => u.name === adminName).roles = roles;
        const userRole = [roles[0]];
        users.slice(1).forEach(u => u.roles = userRole);
        return dataSource.getRepository(User_1.User).save(users);
    }
}
exports.default = UserRoleSeeder;
//# sourceMappingURL=010_user_role.seeder.js.map