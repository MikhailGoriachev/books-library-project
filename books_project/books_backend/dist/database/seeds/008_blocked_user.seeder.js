"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const BlockedUser_1 = require("../entities/BlockedUser");
class BlockedUserSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const users = await userRepository.find();
        const blockedUsers = await Promise.all(users.filter(u => (0, crypto_1.randomInt)(0, 10) < 3)
            .map(u => factoryManager.get(BlockedUser_1.BlockedUser).make({ user: u })));
        return dataSource.getRepository(BlockedUser_1.BlockedUser).save(blockedUsers);
    }
}
exports.default = BlockedUserSeeder;
//# sourceMappingURL=008_blocked_user.seeder.js.map