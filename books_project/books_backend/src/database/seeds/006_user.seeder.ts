import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { UserPassword } from '../entities/UserPassword';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        await factoryManager.get(User).save(new User('guest', 'guest@gmail.com', 'default'));

        const admin = await factoryManager.get(User).save(new User('admin', 'admin@gmail.com', 'default'));

        const saltRounds = 10;
        const password = 'aA123456';
        const hashPassword = await bcrypt.hash(password, saltRounds);
        await factoryManager.get(UserPassword).save(new UserPassword(admin, hashPassword, false));

        const amount = 20;
        return factoryManager.get(User).saveMany(amount);
    }
}