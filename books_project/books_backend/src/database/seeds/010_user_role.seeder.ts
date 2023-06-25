import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { randomInt } from 'crypto';

export default class UserRoleSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const roleRepository = dataSource.getRepository(Role);

        const users = await userRepository.find();
        const roles = await roleRepository.find();

        for (const user of users) {
            const isAdmin = randomInt(0, 10) < 3;
            user.roles = roles.slice(0, isAdmin ? 1 : 2);
        }

        return dataSource.getRepository(User).save(users);
    }
}