import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { BookFile } from '../entities/BookFile';
import { FileExtension } from '../entities/FileExtension';
import { Book } from '../entities/Book';

export default class BookFileSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const bookRepository = dataSource.getRepository(Book);
        const fileExtensionRepository = dataSource.getRepository(FileExtension);
        const bookFileRepository = dataSource.getRepository(BookFile);

        const books = await bookRepository.find();
        const fileExtensions = await fileExtensionRepository.find();

        const bookFiles = [];

        // for (const book of books) {
        //     for (const extension of fileExtensions) {
        //         const file = await factoryManager.get(BookFile).make();
        //         file.book = book;
        //         file.fileExtension = extension;
        //         bookFiles.push(file);
        //     }
        // }
        
        // aa925d96-0c36-4c26-bbce-441eb7ea73cb 
        // e47bc12a-bfe0-4fdc-92dc-5e0a566cf60e 
        // 2c6c2c45-69e9-48e3-99ca-46a2fec8849a 
        // cc225ebe-7244-4904-a11d-5e5b4402aa75 
        // bc37c16e-3272-4689-bc1d-c000c70855f3 
        // 71bf8519-fdce-483b-8898-45a1fcd5d0dd 
        // e286f261-590b-46e7-9058-932b45c83c0a 
        // 7dbd159d-5982-4f6b-a8b8-69bd28c20ff9 
        // ef902a65-4c47-4d94-b52b-5e6a0e2a208d 
        // 26acbc0f-fbfc-4d6b-8478-28f128c3fb03 
        // 8e333e18-1e66-4acd-976f-2f0dd1f1a03e 
        // ff4d6fd9-e1f6-4c6a-aa7d-e8b51fa487b9 
        // 024b50ba-0f93-4160-8025-2671bad33b18 
        // 7275aaf8-8c1c-4ede-8f2f-efcb825a1590 
        // f7fff654-6491-4e91-9d03-203071ec1a40 
        // 12cf4edd-134f-46f2-9288-497cd84f79a8 
        // 50996138-d8d8-455b-b8f4-89d2ca4d34a2 
        // f068ec7d-27de-4d35-b596-4d758fb768ef 
        // 4c6d0c9f-41f4-4602-b5b2-e9377e0fe441 
        // 32ca9d55-dea4-4bfb-88f8-17081daadab1 
        // 260fc0cc-b3a1-4a87-90ac-997225de0840 
        // 67c98865-2dd6-40de-9d7f-968d71212a9c 
        // 61a73615-1daf-4c04-b7c2-a884a2c845e1 
        // 729cc8a1-3e53-4155-889d-75b7599940e5 
        // 5ee6e9fb-e19b-440d-9892-627f426c6565 
        // 916c2425-5f08-4d69-903e-fa3b9b007ce5 
        // 60223dd0-474b-4618-ac50-4966d130dff4 
        // 581c57ba-ed85-41c2-8165-a25205e74208 
        // 845b3911-1b58-448b-b283-fdba1d31e2db 
        // 50779e72-5b74-4a31-abf1-7593c8f0e4fb 
        // ae578ca4-c8bc-47a0-a93b-0537faafbeb1 
        // b3896637-525e-41de-8d14-db9acf794fdb 
        // f982e57a-138e-491e-a3bd-910814d9fe72 
        // 1c8b7ac2-aa1f-41e0-9be0-358500c4e584 
        // 3b97113f-1963-4e25-a41e-e90b80a93fd7 
        // 0bb0ebde-6aad-4552-8062-2bdfbe9c6820 
        // 170f80a8-2c00-4251-ad17-9b1c6b6e027a 
        // f6d95fe0-1f69-4877-af76-bc3a83a984f1 
        // 689f2dc2-7657-4b71-91fb-e70babfb0435 
        // 84e62546-4ad4-4f60-8e59-32a0c1ee5d69 
        // e310a6d2-e94b-485e-8b1e-a670a1206443 
        // 60af98f9-e038-4d10-b5fc-b46dff06fb93 
        // eaa776f7-571c-4cf1-97ef-a6cfc747dee0 
        // c3659807-4f6f-42e4-88ee-6aea0b48ffe1 
        // ed635802-991f-4049-9ed7-0c7f02a75a1b 
        // b7a3879d-c860-4a62-b98c-c121b418ddce 
        // 860a495d-57c5-4050-9782-e94587e4711d 
        // 3e7e7ecd-df15-4d94-973e-212bfc9682d3 
        // a958fbf4-08aa-449c-9571-62966ffac539 
        // 897c247e-5abf-4238-ba26-b60901dbd987 
        // e05abcaa-a215-4372-bf31-a9c143d33e68 
        // 2cd8a890-d582-4d1a-ab76-d9c5fb2f5f71 
        // aaf45db7-078f-4944-baf5-cccac023b418 
        // f3bb2969-e552-4c99-a24d-4125f67c7801
        
        // Война и мир
        bookFiles.push(
            // epub
            new BookFile('1867f4e1-2dbc-4747-ba8d-e5f9a9cd69ae', fileExtensions[0], books[0]),
            
            // fb2
            new BookFile('95804dec-0491-4831-b752-549f401bbe3d', fileExtensions[1], books[0]),
            
            // pdf
            new BookFile('06f9a403-60df-49f5-ba77-fe26f5bd64a8', fileExtensions[2], books[0])
        );
        
        // Преступление и наказание
        bookFiles.push(
            // epub
            new BookFile('aa925d96-0c36-4c26-bbce-441eb7ea73cb', fileExtensions[0], books[1]),
            
            // fb2
            new BookFile('e47bc12a-bfe0-4fdc-92dc-5e0a566cf60e', fileExtensions[1], books[1]),
            
            // pdf
            new BookFile('2c6c2c45-69e9-48e3-99ca-46a2fec8849a', fileExtensions[2], books[1])
        );        
        
        // Анна Каренина
        bookFiles.push(
            // epub
            new BookFile('cc225ebe-7244-4904-a11d-5e5b4402aa75', fileExtensions[0], books[2]),
            
            // fb2
            new BookFile('bc37c16e-3272-4689-bc1d-c000c70855f3', fileExtensions[1], books[2]),
            
            // pdf
            new BookFile('71bf8519-fdce-483b-8898-45a1fcd5d0dd', fileExtensions[2], books[2])
        );        
        
        // Мастер и Маргарита
        bookFiles.push(
            // epub
            new BookFile('e286f261-590b-46e7-9058-932b45c83c0a', fileExtensions[0], books[3]),
            
            // fb2
            new BookFile('7dbd159d-5982-4f6b-a8b8-69bd28c20ff9', fileExtensions[1], books[3]),
            
            // pdf
            new BookFile('ef902a65-4c47-4d94-b52b-5e6a0e2a208d', fileExtensions[2], books[3])
        );        
        
        // Герой нашего времени
        bookFiles.push(
            // epub
            new BookFile('26acbc0f-fbfc-4d6b-8478-28f128c3fb03', fileExtensions[0], books[4]),
            
            // fb2
            new BookFile('8e333e18-1e66-4acd-976f-2f0dd1f1a03e', fileExtensions[1], books[4]),
            
            // pdf
            new BookFile('ff4d6fd9-e1f6-4c6a-aa7d-e8b51fa487b9', fileExtensions[2], books[4])
        );        
        
        // Братья Карамазовы
        bookFiles.push(
            // epub
            new BookFile('024b50ba-0f93-4160-8025-2671bad33b18', fileExtensions[0], books[5]),
            
            // fb2
            new BookFile('7275aaf8-8c1c-4ede-8f2f-efcb825a1590', fileExtensions[1], books[5]),
            
            // pdf
            new BookFile('f7fff654-6491-4e91-9d03-203071ec1a40', fileExtensions[2], books[5])
        );        
        
        // Дубровский
        bookFiles.push(
            // epub
            new BookFile('12cf4edd-134f-46f2-9288-497cd84f79a8', fileExtensions[0], books[6]),
            
            // fb2
            new BookFile('50996138-d8d8-455b-b8f4-89d2ca4d34a2', fileExtensions[1], books[6]),
            
            // pdf
            new BookFile('f068ec7d-27de-4d35-b596-4d758fb768ef', fileExtensions[2], books[6])
        );        
        
        // Евгений Онегин
        bookFiles.push(
            // epub
            new BookFile('4c6d0c9f-41f4-4602-b5b2-e9377e0fe441', fileExtensions[0], books[7]),
            
            // fb2
            new BookFile('32ca9d55-dea4-4bfb-88f8-17081daadab1', fileExtensions[1], books[7]),
            
            // pdf
            new BookFile('260fc0cc-b3a1-4a87-90ac-997225de0840', fileExtensions[2], books[7])
        );        
        
        // Отцы и дети
        bookFiles.push(
            // epub
            new BookFile('67c98865-2dd6-40de-9d7f-968d71212a9c', fileExtensions[0], books[8]),
            
            // fb2
            new BookFile('61a73615-1daf-4c04-b7c2-a884a2c845e1', fileExtensions[1], books[8]),
            
            // pdf
            new BookFile('729cc8a1-3e53-4155-889d-75b7599940e5', fileExtensions[2], books[8])
        );        
        
        // Дети капитана Гранта
        bookFiles.push(
            // epub
            new BookFile('5ee6e9fb-e19b-440d-9892-627f426c6565', fileExtensions[0], books[9]),
            
            // fb2
            new BookFile('916c2425-5f08-4d69-903e-fa3b9b007ce5', fileExtensions[1], books[9]),
            
            // pdf
            new BookFile('60223dd0-474b-4618-ac50-4966d130dff4', fileExtensions[2], books[9])
        );        
        
        // Тихий Дон
        bookFiles.push(
            // epub
            new BookFile('581c57ba-ed85-41c2-8165-a25205e74208', fileExtensions[0], books[10]),
            
            // fb2
            new BookFile('845b3911-1b58-448b-b283-fdba1d31e2db', fileExtensions[1], books[10]),
            
            // pdf
            new BookFile('50779e72-5b74-4a31-abf1-7593c8f0e4fb', fileExtensions[2], books[10])
        );        
        
        // 12 стульев
        bookFiles.push(
            // epub
            new BookFile('ae578ca4-c8bc-47a0-a93b-0537faafbeb1', fileExtensions[0], books[11]),
            
            // fb2
            new BookFile('b3896637-525e-41de-8d14-db9acf794fdb', fileExtensions[1], books[11]),
            
            // pdf
            new BookFile('f982e57a-138e-491e-a3bd-910814d9fe72', fileExtensions[2], books[11])
        );        
        
        // Двенадцать
        bookFiles.push(
            // epub
            new BookFile('1c8b7ac2-aa1f-41e0-9be0-358500c4e584', fileExtensions[0], books[12]),
            
            // fb2
            new BookFile('3b97113f-1963-4e25-a41e-e90b80a93fd7', fileExtensions[1], books[12]),
            
            // pdf
            new BookFile('0bb0ebde-6aad-4552-8062-2bdfbe9c6820', fileExtensions[2], books[12])
        );        
        
        // Мёртвые души
        bookFiles.push(
            // epub
            new BookFile('170f80a8-2c00-4251-ad17-9b1c6b6e027a', fileExtensions[0], books[13]),
            
            // fb2
            new BookFile('f6d95fe0-1f69-4877-af76-bc3a83a984f1', fileExtensions[1], books[13]),
            
            // pdf
            new BookFile('689f2dc2-7657-4b71-91fb-e70babfb0435', fileExtensions[2], books[13])
        );        
        
        // Пиковая дама
        bookFiles.push(
            // epub
            new BookFile('84e62546-4ad4-4f60-8e59-32a0c1ee5d69', fileExtensions[0], books[14]),
            
            // fb2
            new BookFile('e310a6d2-e94b-485e-8b1e-a670a1206443', fileExtensions[1], books[14]),
            
            // pdf
            new BookFile('60af98f9-e038-4d10-b5fc-b46dff06fb93', fileExtensions[2], books[14])
        );        
        
        // Метро 2033
        bookFiles.push(
            // epub
            new BookFile('eaa776f7-571c-4cf1-97ef-a6cfc747dee0', fileExtensions[0], books[15]),
            
            // fb2
            new BookFile('c3659807-4f6f-42e4-88ee-6aea0b48ffe1', fileExtensions[1], books[15]),
            
            // pdf
            new BookFile('ed635802-991f-4049-9ed7-0c7f02a75a1b', fileExtensions[2], books[15])
        );        
        
        // Обломов
        bookFiles.push(
            // epub
            new BookFile('b7a3879d-c860-4a62-b98c-c121b418ddce', fileExtensions[0], books[16]),
            
            // fb2
            new BookFile('860a495d-57c5-4050-9782-e94587e4711d', fileExtensions[1], books[16]),
            
            // pdf
            new BookFile('3e7e7ecd-df15-4d94-973e-212bfc9682d3', fileExtensions[2], books[16])
        );        
        
        // Председатель
        bookFiles.push(
            // epub
            new BookFile('a958fbf4-08aa-449c-9571-62966ffac539', fileExtensions[0], books[17]),
            
            // fb2
            new BookFile('897c247e-5abf-4238-ba26-b60901dbd987', fileExtensions[1], books[17]),
            
            // pdf
            new BookFile('e05abcaa-a215-4372-bf31-a9c143d33e68', fileExtensions[2], books[17])
        );        
        
        // Тарас Бульба
        bookFiles.push(
            // epub
            new BookFile('2cd8a890-d582-4d1a-ab76-d9c5fb2f5f71', fileExtensions[0], books[18]),
            
            // fb2
            new BookFile('aaf45db7-078f-4944-baf5-cccac023b418', fileExtensions[1], books[18]),
            
            // pdf
            new BookFile('f3bb2969-e552-4c99-a24d-4125f67c7801', fileExtensions[2], books[18])
        );        
        
        return bookFileRepository.save(bookFiles);
    }
}