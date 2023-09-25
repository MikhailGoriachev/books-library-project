import { Injectable } from '@angular/core';
import { lastValueFrom } from "rxjs";
import { UserPanelApiService } from "../api/panels/user-panel-api/user-panel-api.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { Book } from "../../entities/Book";
import { AuthService } from "../auth/auth.service";
import { BooksApiService } from "../api/crud/books-api/books-api.service";
import { User } from "../../entities/User";
import { EventsService } from "../events/events.service";
import { Sale } from "../../entities/Sale";
import { BookFile } from "../../entities/BookFile";
import { saveAs } from 'file-saver';
import { Router } from "@angular/router";
import { RolesEnum } from "../../infrastructure/RolesEnum";

@Injectable({
    providedIn: 'root'
})
export class DataManagerService {

    private _user?: User;

    public get user() {
        if (!this._authService.isAuthData && this._user) {
            this._eventsService.changeLogin.next({isAuth: false});
            this._user = null;
        }

        return this._user;
    }

    private set user(value: User | null) {
        this._user = value;
    }

    public _cartItems?: Book[] = [];

    public get cartItems(): Book[] {
        return this._cartItems;
    }

    private set cartItems(value: Book[]) {
        this._cartItems = value;
    }

    public _sales?: Sale[] = [];

    public get sales(): Sale[] {
        return this._sales;
    }

    private set sales(value: Sale[]) {
        this._sales = value;
    }

    public get isAdmin() {
        return this.user?.roles?.find(r => r.name === RolesEnum.admin);
    }

    private _imagesVersion: number = 1
    public get imagesVersion() {
        return this._imagesVersion;
    }

    constructor(
        private readonly _userPanelApiService: UserPanelApiService,
        private readonly _localStorageService: LocalStorageService,
        private readonly _authService: AuthService,
        private readonly _booksService: BooksApiService,
        private readonly _eventsService: EventsService,
        private readonly _booksApiService: BooksApiService,
        private readonly _router: Router
    ) {
        this._eventsService.changeLogin
            .subscribe(async ({isAuth}) => {
                if (isAuth)
                    await Promise.all([
                        this.loadUserProfile(),
                        this.loadCartItems(),
                        this.loadSales()
                    ]);
                else {
                    this.user = null;
                    await this.loadCartItems();
                    await this.loadSales();
                }
            });

        this._eventsService.changeLogin.next({isAuth: this._authService.isAuthData});

        this._eventsService.changeBookRating.subscribe(data => {
            const index = this.sales.findIndex(b => b.book.id === data.id);
            if (index !== -1)
                this._booksApiService.findOneById(data.id)
                    .subscribe(b => this.sales[index].book = b);
        });

        this._eventsService.changeUser.subscribe(user => this.user = user);

        this._eventsService.changeImage.subscribe(() => this._imagesVersion++);

        this._eventsService.changeBookCollection.subscribe(() => {
            this.loadSales().then();
            this.loadCartItems().then();
        })

        this._eventsService.changeBook.subscribe(({id}) => {
            if (this.sales?.find(s => s.book.id === id))
                this.loadSales().then();
            if (this.cartItems?.find(s => s.id === id))
                this.loadCartItems().then();
        })
    }

    async addToCart(book: Book) {
        // if (this.user) {
        if (this._authService.isAuthData) {
            await lastValueFrom(this._userPanelApiService.addBookToCart(book.id));

            await lastValueFrom(this._userPanelApiService.getBooksFromCart());
            this.cartItems.push(book);
        } else {
            this.cartItems.push(book);
            this._localStorageService.cartItems = this.cartItems.map(b => b.id);
        }

        this._eventsService.changeCart.next();
    }

    async removeFromCart(book: Book) {
        // if (this.user) {
        if (this._authService.isAuthData) {
            await lastValueFrom(this._userPanelApiService.removeBookFromCart(book.id));

            await lastValueFrom(this._userPanelApiService.getBooksFromCart());
            this.cartItems.splice(this.cartItems.findIndex(b => b.id === book.id), 1);
        } else {
            this.cartItems.splice(
                this.cartItems.findIndex(b => b.id === book.id),
                1
            );
            this._localStorageService.cartItems = this.cartItems.map(b => b.id);
        }

        this._eventsService.changeCart.next();
    }

    async clearCart() {
        // if (this.user) {
        if (this._authService.isAuthData) {
            await lastValueFrom(this._userPanelApiService.clearCart());
            this.cartItems.splice(0);
        } else {
            this.cartItems.splice(0);
            this._localStorageService.cartItems = [];
        }

        this._eventsService.changeCart.next();
    }

    public async loadCartItems() {
        if (this._authService.isAuthData)
            this._userPanelApiService
                .getBooksFromCart()
                // .subscribe(c => this.cartItems = c);
                .subscribe(b => {
                    this.cartItems.splice(0);
                    this.cartItems.push(...b);
                    this._eventsService.changeCart.next();
                });
        else {
            this.cartItems.splice(0);
            this.cartItems.push(...this._localStorageService.cartItems.length > 0
                ? await lastValueFrom(this._booksService.findAll({ids: this._localStorageService.cartItems}))
                : []);
            this._eventsService.changeCart.next();
        }

    }

    public async loadUserProfile() {
        this.user = await this._authService.getProfile();
        console.log('LOAD USER')
    }

    public async loadSales() {
        if (this._authService.isAuthData)
            this._userPanelApiService.getSales().subscribe(d => {
                this.sales = d;
                this._eventsService.changeSales.next();

                this.loadCartItems();
            });
        else {
            this.sales = [];
            this._eventsService.changeSales.next();
        }
    }

    public async buy() {
        if (this.user)
            this._userPanelApiService.buy().subscribe(d => {
                this.loadSales();
                this.loadCartItems();
            });
    }

    public async download(bookFile: BookFile) {
        if (this.user) {
            const response = await lastValueFrom(this._userPanelApiService.downloadBook(bookFile.id));
            const contentDisposition = response.headers.get('Content-Disposition');
            const fileNameMatch = contentDisposition && contentDisposition.match(
                /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            const originalFileName = fileNameMatch && fileNameMatch[1].replace(/['"]/g, '');

            console.log(originalFileName);

            // console.log(file.headers.get());
            saveAs(response.body, originalFileName);
        }
    }
}
