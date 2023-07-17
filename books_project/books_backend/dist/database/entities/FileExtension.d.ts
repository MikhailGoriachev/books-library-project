import { Relation } from 'typeorm';
import { BookFile } from './BookFile';
export declare class FileExtension {
    id: number;
    name: string;
    bookFiles: Relation<BookFile[]>;
    constructor(name?: string);
}
