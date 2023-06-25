import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { FileExtension } from '../entities/FileExtension';

export default class FileExtensionSeeder implements Seeder {
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        return dataSource.getRepository(FileExtension).insert([
            { name: 'epub' },
            { name: 'pdf' },
            { name: 'fb2' },
        ]);
    }
}