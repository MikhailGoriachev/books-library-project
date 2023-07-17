"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../entities/Category");
class CategorySeeder {
    run(dataSource, factoryManager) {
        return dataSource.getRepository(Category_1.Category).insert([
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
exports.default = CategorySeeder;
//# sourceMappingURL=001_category.seeder.js.map