import { Book } from './Book';
import { FileExtension } from './FileExtension';
import { User } from "./User";
import { buildEsbuildBrowser } from "@angular-devkit/build-angular/src/builders/browser-esbuild";


export class BookFile {

    id: number;

    path: string;

    fileExtension?: FileExtension;

    book?: Book;


    constructor(id?: number, path?: string, fileExtension?: FileExtension, book?: Book) {
        this.id = id;
        this.path = path;
        this.fileExtension = fileExtension;
        this.book = book;
    }


    static assign(a: BookFile, b: Partial<BookFile>) {
        a.id = b.id
        a.path = b.path;
        a.fileExtension = b.fileExtension;

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        return a;
    }
}
