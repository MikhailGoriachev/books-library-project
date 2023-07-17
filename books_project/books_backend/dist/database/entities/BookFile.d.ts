import { Relation } from 'typeorm';
import { Book } from './Book';
import { FileExtension } from './FileExtension';
export declare class BookFile {
    id: number;
    path: string;
    fileExtension: Relation<FileExtension>;
    book: Relation<Book>;
    constructor(path?: string, fileExtension?: FileExtension, book?: Book);
}
