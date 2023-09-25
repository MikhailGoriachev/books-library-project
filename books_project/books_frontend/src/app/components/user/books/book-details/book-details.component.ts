import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../../../../entities/Book";
import { BooksApiService } from "../../../../services/api/crud/books-api/books-api.service";
import { firstValueFrom, lastValueFrom, range, Subscription, tap } from "rxjs";
import { Location } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
    BookRatingStatisticsApiService
} from "../../../../services/api/crud/book-rating-statistics-api/book-rating-statistics-api.service";
import { BookRatingStatistic } from "../../../../entities/BookRatingStatistic";
import { UserPanelApiService } from "../../../../services/api/panels/user-panel-api/user-panel-api.service";
import { GuestPanelApiService } from "../../../../services/api/panels/guest-panel-api/guest-panel-api.service";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { BookRating } from "../../../../entities/BookRating";
import { SetBookRatingDto } from "../../../../dto/auth/set-book-rating.dto";
import { AuthComponent } from "../../auth/auth.component";
import { AuthService } from "../../../../services/auth/auth.service";
import { AuthorDetailsComponent } from "../../authors/author-details/author-details.component";
import { EventsService } from "../../../../services/events/events.service";
import { BookFile } from "../../../../entities/BookFile";
import { BACKEND_API } from "../../../../infrastructure/constants";

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
    public rating: BookRatingStatistic;
    public book?: Book;
    public userRating?: BookRating;

    private _changeLoginSubscription: Subscription;

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


    constructor(
        // @Inject(MAT_DIALOG_DATA) public book: Book,
        @Inject(MAT_DIALOG_DATA) public data: { id: number, isAuthorDetails: boolean },
        private readonly _router: Router,
        private readonly _booksApiService: BooksApiService,
        private readonly _bookRatingStatisticsApiService: BookRatingStatisticsApiService,
        private readonly _userPanelApiService: UserPanelApiService,
        private readonly _guestPanelApiService: GuestPanelApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _matDialog: MatDialog,
        private readonly _eventsService: EventsService
    ) {}


    async ngOnInit() {
        // this.id = this._router.routerState.snapshot.root.params['id'];
        // this._activatedRoute.params.subscribe(params => {
        this._booksApiService.findOneById(this.data.id).subscribe(async b => {
                this.book = b;

                if (this.book) {
                    await lastValueFrom(this._bookRatingStatisticsApiService
                                            .findOne({bookId: this.book.id})
                                            .pipe(tap(r => this.rating = r)));

                    if (this._dataManagerService.user) {
                        this._userPanelApiService.setBookView(this.book?.id).subscribe();
                        this._userPanelApiService.getBookRating(this.book?.id)
                            .subscribe(r => this.userRating = r);
                    } else {
                        this._guestPanelApiService.setBookView(this.book?.id).subscribe();
                    }
                } else this.close();
            }
        );

        this._changeLoginSubscription = this._eventsService.changeLogin.subscribe(({isAuth}) => {
                if (isAuth) {
                    this._userPanelApiService.setBookView(this.book?.id).subscribe();
                    this._userPanelApiService.getBookRating(this.book?.id)
                        .subscribe(r => this.userRating = r);
                } else
                    this._guestPanelApiService.setBookView(this.book?.id).subscribe();
            }
        );
        // });
    }

    getBookFiles(): BookFile[] {
        return this.book?.bookFiles
                   ?.sort((a, b) => a.fileExtension.name.localeCompare(b.fileExtension.name))
    }

    download(event: MouseEvent, bookFile: BookFile) {
        event.stopPropagation();
        this._dataManagerService.download(bookFile).then(() => console.log('DOWNLOAD'));
    }

    public close() {
        // this._location.historyGo(-1);
    }

    addToCart() {
        this._dataManagerService.addToCart(this.book).then();
    }

    async removeFromCart() {
        this._dataManagerService.removeFromCart(this.book).then();
    }

    async toAuthorCardDetails(event: Event, id: number) {
        event.preventDefault();

        if (this.data.isAuthorDetails)
            this._matDialog.open(AuthorDetailsComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: '98%',
                width: '98%',
                panelClass: ['full-screen-modal', 'full-height-content'],
                data: {id, isBookDetails: true}
            });
        else {
            await this._router.navigate([`books/${this.book.id}/author/${id}`]);
        }
    }

    async setBookRating(value: number) {
        if (!this._dataManagerService.user) {
            const dialogRef = this._matDialog.open(AuthComponent, {
                minWidth: '35rem',
                position: {top: '7%'}
            });
            return;
        }

        if (this.userRating?.value === value) {
            await lastValueFrom(this._userPanelApiService.removeBookRating(this.book.id));
            this.userRating = null;
        } else
            this.userRating = await lastValueFrom(this._userPanelApiService.setBookRating(new SetBookRatingDto(
                this.book.id,
                value
            )));

        await lastValueFrom(this._bookRatingStatisticsApiService
                                .findOne({bookId: this.book.id})
                                .pipe(tap(r => this.rating = r)));
    }

    ngOnDestroy() {
        this._changeLoginSubscription.unsubscribe();
    }
}
