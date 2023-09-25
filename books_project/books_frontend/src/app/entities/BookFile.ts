import { Book } from './Book';
import { FileExtension } from './FileExtension';
import { User } from "./User";
import { buildEsbuildBrowser } from "@angular-devkit/build-angular/src/builders/browser-esbuild";
import { BaseEntity } from "./BaseEntity";


export class BookFile extends BaseEntity {

    id: number;

    path: string;

    fileExtension?: FileExtension;

    book?: Book;


    constructor(id?: number, path?: string, fileExtension?: FileExtension, book?: Book) {
        super();
        this.id = id;
        this.path = path;
        this.fileExtension = fileExtension;
        this.book = book;
    }


    static assign(a: BookFile, b: Partial<BookFile>) {
        a.id = b.id
        a.path = b.path;
        a.fileExtension = b.fileExtension;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        return a;
    }
}
