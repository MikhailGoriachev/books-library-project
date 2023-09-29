import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { randomInt } from 'crypto';

export default class UserRoleSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const roleRepository = dataSource.getRepository(Role);

        let users = (await userRepository.find()).slice(1);
        const roles = await roleRepository.find();
        
        const adminName = 'admin';
        users.find(u => u.name === adminName).roles = roles;
        
        const userRole = [roles[0]];
        
        // for (const user of users) {
        //     const isAdmin = randomInt(0, 10) < 3;
        //     user.roles = roles.slice(0, isAdmin ? 1 : 2);
        // }

        users.slice(1).forEach(u => u.roles = userRole);
        
        return dataSource.getRepository(User).save(users);
    }
}