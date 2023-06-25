import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { BlockedUser } from '../entities/BlockedUser';

export default class BlockedUserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const users = await userRepository.find();

        const blockedUsers = await Promise.all(
            users.filter(u => randomInt(0, 10) < 3)
                .map(u => factoryManager.get(BlockedUser).make({ user: u })),
        );

        return dataSource.getRepository(BlockedUser).save(blockedUsers);
    }
}
