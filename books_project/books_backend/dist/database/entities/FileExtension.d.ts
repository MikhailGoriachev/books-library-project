import { BaseEntity, Relation } from 'typeorm';
import { BookFile } from './BookFile';
export declare class FileExtension extends BaseEntity {
    id: number;
    name: string;
    bookFiles: Relation<BookFile[]>;
    constructor(name?: string);
}
