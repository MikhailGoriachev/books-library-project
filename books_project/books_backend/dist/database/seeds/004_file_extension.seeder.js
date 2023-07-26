"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileExtension_1 = require("../entities/FileExtension");
class FileExtensionSeeder {
    run(dataSource, factoryManager) {
        return dataSource.getRepository(FileExtension_1.FileExtension).insert([
            { name: 'epub' },
            { name: 'pdf' },
            { name: 'fb2' },
        ]);
    }
}
exports.default = FileExtensionSeeder;
//# sourceMappingURL=004_file_extension.seeder.js.map