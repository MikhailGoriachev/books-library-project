import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../entities/Role';

export default class RoleSeeder implements Seeder {
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        return dataSource.getRepository(Role).insert([
            { name: 'user' },
            { name: 'admin' },
        ]);
    }
}