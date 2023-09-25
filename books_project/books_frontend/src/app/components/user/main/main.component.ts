import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookDetailsComponent } from "../books/book-details/book-details.component";
import { MatDialog } from "@angular/material/dialog";
import { BooksApiService } from "../../../services/api/crud/books-api/books-api.service";
import { Book } from "../../../entities/Book";
import { Subscription } from "rxjs";
import { EventsService } from "../../../services/events/events.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
    constructor(
        private readonly _matDialog: MatDialog,
        private readonly _booksApiService: BooksApiService,
        private readonly _eventsService: EventsService
    ) {}

    // десять самых рейтинговых книг
    ratingBooks?: Book[];

    // десять самых просматриваемых книг
    viewedBooks?: Book[];

    // десять последних добавленных книг
    additionBooks?: Book[];

    private changeRatingSubscription: Subscription;


    ngOnInit() {
        this._booksApiService.topBooksByRating().subscribe(d => this.ratingBooks = d);

        this._booksApiService.topBooksByViewed().subscribe(d => this.viewedBooks = d);

        this._booksApiService.topBooksByAddition().subscribe(d => this.additionBooks = d);

        this.changeRatingSubscription = this._eventsService.changeBookRating.subscribe(data => {
            const search = (books: Book[]) => books.findIndex(b => b.id === data.id);

            const indexes = [search(this.ratingBooks), search(this.viewedBooks), search(this.additionBooks)];

            if (indexes.find(i => !!i)) {
                this._booksApiService.topBooksByRating().subscribe(d => this.ratingBooks = d);
                this._booksApiService.topBooksByViewed().subscribe(d => this.viewedBooks = d);
                this._booksApiService.topBooksByAddition().subscribe(d => this.additionBooks = d);
            }
        });
    }

    public async toCardDetails(id: number) {
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
        this.changeRatingSubscription.unsubscribe();
    }
}
