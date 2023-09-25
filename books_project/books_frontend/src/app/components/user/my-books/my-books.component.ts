import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from "../../../entities/Book";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { BookDetailsComponent } from "../books/book-details/book-details.component";
import { MatDialog } from "@angular/material/dialog";
import { ModalInfoComponent } from "../modals/modal-info/modal-info.component";

@Component({
    selector: 'app-my-books',
    templateUrl: './my-books.component.html',
    styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit, OnDestroy {
    get books(): Book[] {
        return this._dataManagerService.sales?.map(s => s.book);
    }

    // private changeRatingSubscription: Subscription;

    constructor(
        private readonly _dataManagerService: DataManagerService,
        private readonly _matDialog: MatDialog
    ) {}

    ngOnInit() {
    }

    public async toCardDetails(id: number) {
        const book = this.books.find(b => b.id === id);

        if (book.deletedAt) {
            this._matDialog.open(ModalInfoComponent, {
                data: {
                    title: 'Недоступно',
                    body: 'Книга была удалена, детальная информация о ней больше ' +
                        'недоступна, но Вы по-прежнему можете её скачать'
                },
                width: '20rem'
            });
        } else
            this._matDialog.open(BookDetailsComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: '98%',
                width: '98%',
                panelClass: ['full-screen-modal', 'full-height-content'],
                data: {id, isAuthorDetails: true}
            });
    }

    ngOnDestroy() {
        // this.changeRatingSubscription.unsubscribe();
    }
}
