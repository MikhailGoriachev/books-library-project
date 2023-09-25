import { Relation } from 'typeorm';
import { Book } from './Book';
import { FileExtension } from './FileExtension';
import { BaseEntity } from './BaseEntity';
export declare class BookFile extends BaseEntity {
    id: number;
    path: string;
    fileExtension: Relation<FileExtension>;
    book: Relation<Book>;
    constructor(path?: string, fileExtension?: FileExtension, book?: Book);
}
