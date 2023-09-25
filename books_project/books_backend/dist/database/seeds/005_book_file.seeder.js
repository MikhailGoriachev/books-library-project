"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BookFile_1 = require("../entities/BookFile");
const FileExtension_1 = require("../entities/FileExtension");
const Book_1 = require("../entities/Book");
class BookFileSeeder {
    async run(dataSource, factoryManager) {
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const fileExtensionRepository = dataSource.getRepository(FileExtension_1.FileExtension);
        const bookFileRepository = dataSource.getRepository(BookFile_1.BookFile);
        const books = await bookRepository.find();
        const fileExtensions = await fileExtensionRepository.find();
        const bookFiles = [];
        bookFiles.push(new BookFile_1.BookFile('1867f4e1-2dbc-4747-ba8d-e5f9a9cd69ae', fileExtensions[0], books[0]), new BookFile_1.BookFile('95804dec-0491-4831-b752-549f401bbe3d', fileExtensions[1], books[0]), new BookFile_1.BookFile('06f9a403-60df-49f5-ba77-fe26f5bd64a8', fileExtensions[2], books[0]));
        bookFiles.push(new BookFile_1.BookFile('aa925d96-0c36-4c26-bbce-441eb7ea73cb', fileExtensions[0], books[1]), new BookFile_1.BookFile('e47bc12a-bfe0-4fdc-92dc-5e0a566cf60e', fileExtensions[1], books[1]), new BookFile_1.BookFile('2c6c2c45-69e9-48e3-99ca-46a2fec8849a', fileExtensions[2], books[1]));
        bookFiles.push(new BookFile_1.BookFile('cc225ebe-7244-4904-a11d-5e5b4402aa75', fileExtensions[0], books[2]), new BookFile_1.BookFile('bc37c16e-3272-4689-bc1d-c000c70855f3', fileExtensions[1], books[2]), new BookFile_1.BookFile('71bf8519-fdce-483b-8898-45a1fcd5d0dd', fileExtensions[2], books[2]));
        bookFiles.push(new BookFile_1.BookFile('e286f261-590b-46e7-9058-932b45c83c0a', fileExtensions[0], books[3]), new BookFile_1.BookFile('7dbd159d-5982-4f6b-a8b8-69bd28c20ff9', fileExtensions[1], books[3]), new BookFile_1.BookFile('ef902a65-4c47-4d94-b52b-5e6a0e2a208d', fileExtensions[2], books[3]));
        bookFiles.push(new BookFile_1.BookFile('26acbc0f-fbfc-4d6b-8478-28f128c3fb03', fileExtensions[0], books[4]), new BookFile_1.BookFile('8e333e18-1e66-4acd-976f-2f0dd1f1a03e', fileExtensions[1], books[4]), new BookFile_1.BookFile('ff4d6fd9-e1f6-4c6a-aa7d-e8b51fa487b9', fileExtensions[2], books[4]));
        bookFiles.push(new BookFile_1.BookFile('024b50ba-0f93-4160-8025-2671bad33b18', fileExtensions[0], books[5]), new BookFile_1.BookFile('7275aaf8-8c1c-4ede-8f2f-efcb825a1590', fileExtensions[1], books[5]), new BookFile_1.BookFile('f7fff654-6491-4e91-9d03-203071ec1a40', fileExtensions[2], books[5]));
        bookFiles.push(new BookFile_1.BookFile('12cf4edd-134f-46f2-9288-497cd84f79a8', fileExtensions[0], books[6]), new BookFile_1.BookFile('50996138-d8d8-455b-b8f4-89d2ca4d34a2', fileExtensions[1], books[6]), new BookFile_1.BookFile('f068ec7d-27de-4d35-b596-4d758fb768ef', fileExtensions[2], books[6]));
        bookFiles.push(new BookFile_1.BookFile('4c6d0c9f-41f4-4602-b5b2-e9377e0fe441', fileExtensions[0], books[7]), new BookFile_1.BookFile('32ca9d55-dea4-4bfb-88f8-17081daadab1', fileExtensions[1], books[7]), new BookFile_1.BookFile('260fc0cc-b3a1-4a87-90ac-997225de0840', fileExtensions[2], books[7]));
        bookFiles.push(new BookFile_1.BookFile('67c98865-2dd6-40de-9d7f-968d71212a9c', fileExtensions[0], books[8]), new BookFile_1.BookFile('61a73615-1daf-4c04-b7c2-a884a2c845e1', fileExtensions[1], books[8]), new BookFile_1.BookFile('729cc8a1-3e53-4155-889d-75b7599940e5', fileExtensions[2], books[8]));
        bookFiles.push(new BookFile_1.BookFile('5ee6e9fb-e19b-440d-9892-627f426c6565', fileExtensions[0], books[9]), new BookFile_1.BookFile('916c2425-5f08-4d69-903e-fa3b9b007ce5', fileExtensions[1], books[9]), new BookFile_1.BookFile('60223dd0-474b-4618-ac50-4966d130dff4', fileExtensions[2], books[9]));
        bookFiles.push(new BookFile_1.BookFile('581c57ba-ed85-41c2-8165-a25205e74208', fileExtensions[0], books[10]), new BookFile_1.BookFile('845b3911-1b58-448b-b283-fdba1d31e2db', fileExtensions[1], books[10]), new BookFile_1.BookFile('50779e72-5b74-4a31-abf1-7593c8f0e4fb', fileExtensions[2], books[10]));
        bookFiles.push(new BookFile_1.BookFile('ae578ca4-c8bc-47a0-a93b-0537faafbeb1', fileExtensions[0], books[11]), new BookFile_1.BookFile('b3896637-525e-41de-8d14-db9acf794fdb', fileExtensions[1], books[11]), new BookFile_1.BookFile('f982e57a-138e-491e-a3bd-910814d9fe72', fileExtensions[2], books[11]));
        bookFiles.push(new BookFile_1.BookFile('1c8b7ac2-aa1f-41e0-9be0-358500c4e584', fileExtensions[0], books[12]), new BookFile_1.BookFile('3b97113f-1963-4e25-a41e-e90b80a93fd7', fileExtensions[1], books[12]), new BookFile_1.BookFile('0bb0ebde-6aad-4552-8062-2bdfbe9c6820', fileExtensions[2], books[12]));
        bookFiles.push(new BookFile_1.BookFile('170f80a8-2c00-4251-ad17-9b1c6b6e027a', fileExtensions[0], books[13]), new BookFile_1.BookFile('f6d95fe0-1f69-4877-af76-bc3a83a984f1', fileExtensions[1], books[13]), new BookFile_1.BookFile('689f2dc2-7657-4b71-91fb-e70babfb0435', fileExtensions[2], books[13]));
        bookFiles.push(new BookFile_1.BookFile('84e62546-4ad4-4f60-8e59-32a0c1ee5d69', fileExtensions[0], books[14]), new BookFile_1.BookFile('e310a6d2-e94b-485e-8b1e-a670a1206443', fileExtensions[1], books[14]), new BookFile_1.BookFile('60af98f9-e038-4d10-b5fc-b46dff06fb93', fileExtensions[2], books[14]));
        bookFiles.push(new BookFile_1.BookFile('eaa776f7-571c-4cf1-97ef-a6cfc747dee0', fileExtensions[0], books[15]), new BookFile_1.BookFile('c3659807-4f6f-42e4-88ee-6aea0b48ffe1', fileExtensions[1], books[15]), new BookFile_1.BookFile('ed635802-991f-4049-9ed7-0c7f02a75a1b', fileExtensions[2], books[15]));
        bookFiles.push(new BookFile_1.BookFile('b7a3879d-c860-4a62-b98c-c121b418ddce', fileExtensions[0], books[16]), new BookFile_1.BookFile('860a495d-57c5-4050-9782-e94587e4711d', fileExtensions[1], books[16]), new BookFile_1.BookFile('3e7e7ecd-df15-4d94-973e-212bfc9682d3', fileExtensions[2], books[16]));
        bookFiles.push(new BookFile_1.BookFile('a958fbf4-08aa-449c-9571-62966ffac539', fileExtensions[0], books[17]), new BookFile_1.BookFile('897c247e-5abf-4238-ba26-b60901dbd987', fileExtensions[1], books[17]), new BookFile_1.BookFile('e05abcaa-a215-4372-bf31-a9c143d33e68', fileExtensions[2], books[17]));
        bookFiles.push(new BookFile_1.BookFile('2cd8a890-d582-4d1a-ab76-d9c5fb2f5f71', fileExtensions[0], books[18]), new BookFile_1.BookFile('aaf45db7-078f-4944-baf5-cccac023b418', fileExtensions[1], books[18]), new BookFile_1.BookFile('f3bb2969-e552-4c99-a24d-4125f67c7801', fileExtensions[2], books[18]));
        return bookFileRepository.save(bookFiles);
    }
}
exports.default = BookFileSeeder;
//# sourceMappingURL=005_book_file.seeder.js.map