import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Book } from "../../../entities/Book";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { BookDetailsComponent } from "../books/book-details/book-details.component";
import { AuthComponent } from "../auth/auth.component";
import { EventsService } from "../../../services/events/events.service";
import { Subscription } from "rxjs";
import { reportUnhandledError } from "rxjs/internal/util/reportUnhandledError";
import { BACKEND_API } from "../../../infrastructure/constants";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
    dataSource?: MatTableDataSource<Book> = new MatTableDataSource<Book>();
    headers: string[] = ['image', 'title', 'price', 'delete'];
    footers: string[] = ['title', 'image', 'author', 'price', 'delete'];

    private changeCartSubscription: Subscription;

    get totalPrice() {
        return this._dataManagerService?.cartItems?.reduce((prev, cur) => prev + cur.price, 0);
    }

    baseUrl = BACKEND_API;

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }

    protected readonly top = top;

    constructor(
        private readonly _dataManagerService: DataManagerService,
        private readonly _breakpointObserver: BreakpointObserver,
        private readonly _matDialog: MatDialog,
        private readonly _eventsService: EventsService
    ) {}

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Book>(this._dataManagerService.cartItems);

        this._breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small
                // Breakpoints.Medium
            ])
            .subscribe((state) => {
                const author = 'author';
                const del = 'delete';
                if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small]) {
                    if (this.headers.find(value => value === author)) {
                        this.headers.splice(this.headers.indexOf(author), 1);
                        this.footers.splice(this.footers.indexOf(del), 1);
                    }
                } else {
                    if (!this.headers.find(value => value === author)) {
                        this.headers.splice(2, 0, author);
                        this.footers.splice(4, 0, del);
                    }
                }
            });

        this.changeCartSubscription = this._eventsService.changeCart
                                          .subscribe(() => {
                                              // this.dataSource.data.splice(0);
                                              console.log(this._dataManagerService.cartItems);
                                              // this.dataSource.data.push(...this._dataManagerService.cartItems);
                                              this.dataSource._updateChangeSubscription();
                                          });
    }

    public async clearCart() {
        await this._dataManagerService.clearCart();
        // console.log(`CART: ${this._dataManagerService.cartItems}`);
        this.dataSource._updateChangeSubscription();
    }

    public async remove(event: MouseEvent, book: Book) {
        event.stopPropagation();

        await this._dataManagerService.removeBookFromCart(book);
        this.dataSource._updateChangeSubscription();
    }

    public async buy() {
        if (this._dataManagerService.user) {
            await this._dataManagerService.buy();
        } else {
            const dialogRef = this._matDialog.open(AuthComponent, {
                minWidth: '35rem',
                position: {top: '7%'}
            });
        }
    }

    public async toBookDetails(id: number) {
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
        this.changeCartSubscription.unsubscribe();
    }

    protected readonly reportUnhandledError = reportUnhandledError;
}
