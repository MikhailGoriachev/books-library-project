import { BookFile } from './BookFile';
import { Category } from "./Category";


export class FileExtension {
    id: number;

    name: string;

    bookFiles?: BookFile[];


    constructor(id?: number, name?: string) {
        this.id = id;
        this.name = name;
    }


    static assign(a: FileExtension, b: Partial<FileExtension>) {
        a.id = b.id
        a.name = b.name;

        a.bookFiles = b.bookFiles !== undefined
            ? b.bookFiles.map(b => BookFile.assign(new BookFile(), b))
            : undefined;

        return a;
    }
}
