import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from '../entities/Category';

export default class CategorySeeder implements Seeder {
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        return dataSource.getRepository(Category).insert([
            { name: 'Фантастика' },
            { name: 'Детективы' },
            { name: 'Романы' },
            { name: 'Наука' },
            { name: 'Компьютерная литература' },
            { name: 'Фэнтези' },
            { name: 'Биографии' },
            { name: 'Приключения' },
            { name: 'Историческая литература' },
            { name: 'Мистика' },
            { name: 'Поэзия' },
            { name: 'Детская литература' },
            { name: 'Художественная проза' },
            { name: 'Научная фантастика' },
            { name: 'Экономика и бизнес' },
            { name: 'Саморазвитие' },
            { name: 'Техническая литература' },
            { name: 'Юмор' },
        ]);
    }
}