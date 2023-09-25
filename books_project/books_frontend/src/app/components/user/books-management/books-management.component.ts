import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksApiService } from "../../../services/api/crud/books-api/books-api.service";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { MatTableDataSource } from "@angular/material/table";
import { Book } from "../../../entities/Book";
import { PageDto } from "../../../dto/pagination/page.dto";
import { BookPaginationFilterDto } from "../../../dto/filters/book-pagination-filter.dto";
import { OrderEnum } from "../../../infrastructure/OrderEnum";
import { BACKEND_API } from "../../../infrastructure/constants";
import { FormBuilder, Validators } from "@angular/forms";
import { Author } from "../../../entities/Author";
import { CategoriesApiService } from "../../../services/api/crud/categories-api/categories-api.service";
import { AuthorsApiService } from "../../../services/api/crud/authors-api/authors-api.service";
import { Category } from "../../../entities/Category";
import { ProfileComponent } from "../profile/profile.component";
import { BookFormComponent } from "./book-form/book-form.component";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { EventsService } from "../../../services/events/events.service";

@Component({
    selector: 'app-books-management',
    templateUrl: './books-management.component.html',
    styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit, OnDestroy {
    dataSource?: MatTableDataSource<Book> = new MatTableDataSource<Book>();

    public booksPage: PageDto<Book>;
    public currentFilter: BookPaginationFilterDto = new BookPaginationFilterDto();

    headers: string[] = [
        'image',
        'id',
        'title',
        'publicationYear',
        'author',
        'price',
        'bookViewStatistic',
        'bookRatingStatistic',
        'isDeleted'
    ];

    baseUrl = BACKEND_API;

    private changeBookSubscription: Subscription;

    private changeBookCollectionSubscription: Subscription;

    public filterForm = this._fb.group({
        id: ['', [Validators.min(1)]],
        categoryName: [''],
        title: ['', [Validators.maxLength(250)]],
        minPrice: [null],
        maxPrice: [null],
        minPublicationYear: [null],
        maxPublicationYear: [null],
        isbn: ['', [Validators.pattern(/^\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d{1,7}$/)]],
        authorName: ['', [Validators.maxLength(150)]]
    });

    public priceRange = {min: 0, max: 1};
    public publicationYearRange = {min: 0, max: 1};

    public get isValid(): boolean {
        return this.filterForm.valid;
    }

    public authors: Author[];
    public authorsSelection: Author[];

    public categories: Category[];

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }


    constructor(
        private readonly _booksApiService: BooksApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _fb: FormBuilder,
        private readonly _categoriesApiService: CategoriesApiService,
        private readonly _authorsApiService: AuthorsApiService,
        private readonly _matDialog: MatDialog,
        private readonly _eventsService: EventsService
    ) {}


    ngOnInit() {
        this._booksApiService
            .findAllPaginationWithDeleted()
            .subscribe(d => {
                this.booksPage = d
                this.dataSource.data = this.booksPage.data;
            });

        this._booksApiService.getPriceRange()
            .subscribe(d => {
                this.priceRange = d;
                this.filterForm.patchValue({minPrice: d.min, maxPrice: d.max});
            });

        this._booksApiService.getPublicationYearRange()
            .subscribe(d => {
                this.publicationYearRange = d;
                this.filterForm.patchValue({minPublicationYear: d.min, maxPublicationYear: d.max});
            });

        this._categoriesApiService
            .findAll()
            .subscribe(d => this.categories = d);

        this._authorsApiService
            .findAll()
            .subscribe(d => this.authorsSelection = this.authors = d);

        this.changeBookSubscription = this._eventsService.changeBook.subscribe(data => {
            const index = this.booksPage.data.findIndex(b => b.id === data.id);
            if (index !== -1)
                this._booksApiService.findOneByIdWithDeleted(data.id)
                    .subscribe(b => {
                        this.booksPage.data[index] = b;
                        this.dataSource._updateChangeSubscription();
                    });
        });

        this.changeBookCollectionSubscription = this._eventsService.changeBookCollection.subscribe(() => {
            this._booksApiService.findAllPaginationWithDeleted(this.currentFilter)
                .subscribe(b => {
                    this.booksPage = b
                    this.dataSource.data = this.booksPage.data;
                    this.dataSource._updateChangeSubscription();
                });
        });
    }

    changePage(event) {
        Object.assign(this.currentFilter, {order: OrderEnum.ASC, page: event.pageIndex + 1, take: event.pageSize})
        this._booksApiService.findAllPaginationWithDeleted(this.currentFilter)
            .subscribe(b => {
                this.booksPage = b
                this.dataSource.data = this.booksPage.data;
                this.dataSource._updateChangeSubscription();
                // window.scroll({top: 0})
            });
    }

    // выбор категории книги
    categorySelect(category: string) {
        this.currentFilter.categoryName = category ? category : undefined;
        this.currentFilter.page = 1;
        this._booksApiService.findAllPaginationWithDeleted(
            this.currentFilter
        ).subscribe(b => {
            this.booksPage = b;
            this.dataSource.data = this.booksPage.data;
        });
        console.dir(this.filterForm.value);
    }

    public onFilterSubmit() {
        Object.assign(this.currentFilter, this.filterForm.value);
        this.currentFilter.page = 1;
        this._booksApiService.findAllPaginationWithDeleted(
            this.currentFilter
        ).subscribe(b => {
            this.booksPage = b;
            this.dataSource.data = this.booksPage.data;
        });
    }

    public onFilterClear() {
        this.filterForm.patchValue({
            id: '',
            title: '',
            categoryName: '',
            minPrice: this.priceRange.min,
            maxPrice: this.priceRange.max,
            minPublicationYear: this.publicationYearRange.min,
            maxPublicationYear: this.publicationYearRange.max,
            isbn: '',
            authorName: '',
        });
        this.onFilterSubmit();
    }

    filterAuthors() {
        const value = this.filterForm.value.authorName.toLowerCase();
        this.authorsSelection = !value
            ? this.authors
            : this.authors.filter(a => a.name.toLowerCase().includes(value));
    }

    editBook(id: number) {
        const dialogRef = this._matDialog.open(BookFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '98%',
            width: '98%',
            panelClass: ['full-screen-modal', 'full-height-content'],
            data: {id}
        });
    }

    createBook() {
        const dialogRef = this._matDialog.open(BookFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '98%',
            width: '98%',
            panelClass: ['full-screen-modal', 'full-height-content'],
        });
    }

    ngOnDestroy() {
        this.changeBookSubscription?.unsubscribe();
        this.changeBookCollectionSubscription?.unsubscribe();
    }
}
