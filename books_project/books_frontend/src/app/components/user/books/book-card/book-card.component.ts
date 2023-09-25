import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from "../../../../entities/Book";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { BookFile } from "../../../../entities/BookFile";
import { BACKEND_API } from "../../../../infrastructure/constants";

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
    @Input()
    book: Book;

    @Output()
    onClickCard: EventEmitter<Book> = new EventEmitter<Book>();

    baseUrl = BACKEND_API;

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }

    get isExistsCart(): boolean {
        return !!this._dataManagerService?.cartItems?.find(c => c?.id === this?.book?.id);
    }

    get isExistsSales() {
        return !!this._dataManagerService?.sales?.find(s => s.book?.id === this.book?.id);
    }


    constructor(private readonly _dataManagerService: DataManagerService) {}


    ngOnInit() {
        this.book.authors = this.book.authors.filter(a => !a.deletedAt);
    }

    getBookFiles(): BookFile[] {
        return this.book?.bookFiles
                   ?.sort((a, b) => a.fileExtension.name.localeCompare(b.fileExtension.name))
    }

    download(event: MouseEvent, bookFile: BookFile) {
        event.stopPropagation();
        this._dataManagerService.download(bookFile).then();
    }

    addToCart(event: MouseEvent) {
        event.stopPropagation();
        this._dataManagerService.addToCart(this.book).then();
    }

    async removeFromCart(event: MouseEvent) {
        event.stopPropagation();
        this._dataManagerService.removeFromCart(this.book).then();
    }
}
