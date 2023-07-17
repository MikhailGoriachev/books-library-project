"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("../entities/Role");
class RoleSeeder {
    run(dataSource, factoryManager) {
        return dataSource.getRepository(Role_1.Role).insert([
            { name: 'user' },
            { name: 'admin' },
        ]);
    }
}
exports.default = RoleSeeder;
//# sourceMappingURL=009_role.seeder.js.map