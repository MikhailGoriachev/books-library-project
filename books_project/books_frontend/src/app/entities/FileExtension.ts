import { BookFile } from './BookFile';
import { BaseEntity } from "./BaseEntity";


export class FileExtension extends BaseEntity {
    id: number;

    name: string;

    bookFiles?: BookFile[];


    constructor(id?: number, name?: string) {
        super();
        this.id = id;
        this.name = name;
    }


    static assign(a: FileExtension, b: Partial<FileExtension>) {
        a.id = b.id
        a.name = b.name;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.bookFiles = b.bookFiles !== undefined
            ? b.bookFiles.map(b => BookFile.assign(new BookFile(), b))
            : undefined;

        return a;
    }
}
