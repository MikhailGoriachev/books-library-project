import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Book } from "../../../../entities/Book";
import { Router } from "@angular/router";
import { BooksApiService } from "../../../../services/api/crud/books-api/books-api.service";
import { UserPanelApiService } from "../../../../services/api/panels/user-panel-api/user-panel-api.service";
import { GuestPanelApiService } from "../../../../services/api/panels/guest-panel-api/guest-panel-api.service";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { Author } from "../../../../entities/Author";
import { AuthorsApiService } from "../../../../services/api/crud/authors-api/authors-api.service";
import { BookDetailsComponent } from "../../books/book-details/book-details.component";
import { Subscription } from "rxjs";
import { EventsService } from "../../../../services/events/events.service";
import { BACKEND_API } from "../../../../infrastructure/constants";

@Component({
    selector: 'app-author-details',
    templateUrl: './author-details.component.html',
    styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
    public author: Author;
    public books?: Book[] = [];

    private changeRatingSubscription: Subscription;

    baseUrl = BACKEND_API;

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { id: number, isBookDetails: boolean },
        private readonly _router: Router,
        private readonly _authorsApiService: AuthorsApiService,
        private readonly _booksApiService: BooksApiService,
        private readonly _userPanelApiService: UserPanelApiService,
        private readonly _guestPanelApiService: GuestPanelApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _matDialog: MatDialog,
        private readonly _eventsService: EventsService
    ) {}


    async ngOnInit() {
        this._authorsApiService.findOneById(this.data.id).subscribe(author => {
            this.author = author;
            if (this.author) {
                if (this._dataManagerService.user)
                    this._userPanelApiService.setAuthorView(this.author?.id).subscribe();
                else
                    this._guestPanelApiService.setAuthorView(this.author?.id).subscribe();

                this._booksApiService.findAll({authorsId: [this.author.id]})
                    .subscribe(b => console.dir((this.books = b)));
            }
        });

        this.changeRatingSubscription = this._eventsService.changeBookRating.subscribe(data => {
            const index = this.books.findIndex(b => b.id === data.id);
            if (index !== -1)
                this._booksApiService.findOneById(data.id)
                    .subscribe(b => this.books[index] = b);
        })
    }

    async toBookCardDetails(id: number) {
        if (this.data.isBookDetails) {
            this._matDialog.open(BookDetailsComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: '98%',
                width: '98%',
                panelClass: ['full-screen-modal', 'full-height-content'],
                data: {id, isAuthorDetails: true}
            });
        } else
            await this._router.navigate([`authors/${this.author.id}/book/${id}`]);
    }

    addToCart(event: MouseEvent, book: Book) {
        event.stopPropagation();
        this._dataManagerService.addToCart(book).then();
    }

    removeFromCart(event: MouseEvent, book: Book) {
        event.stopPropagation();
        this._dataManagerService.removeFromCart(book).then();
    }

    isExistsCart(bookId: number) {
        return !!this._dataManagerService?.cartItems?.find(b => b.id === bookId)
    }
}
