import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { UserPassword } from '../entities/UserPassword';

export default class UserPasswordSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const users = (await userRepository.find()).slice(2);

        const userPasswords = [];

        for (const user of users)
            userPasswords.push(await factoryManager.get(UserPassword).make({ user }));

        return dataSource.getRepository(UserPassword).save(userPasswords);
    }
}
