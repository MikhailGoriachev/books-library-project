"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const BookFile_1 = require("../entities/BookFile");
exports.default = (0, typeorm_extension_1.setSeederFactory)(BookFile_1.BookFile, async (faker) => new BookFile_1.BookFile(faker.string.uuid(), null, null));
//# sourceMappingURL=book-file.factory.js.map