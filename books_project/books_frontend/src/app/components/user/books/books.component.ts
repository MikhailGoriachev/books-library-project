import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesApiService } from "../../../services/api/crud/categories-api/categories-api.service";
import { Category } from "../../../entities/Category";
import { BooksApiService } from "../../../services/api/crud/books-api/books-api.service";
import { BookPaginationFilterDto } from "../../../dto/filters/book-pagination-filter.dto";
import { OrderEnum } from "../../../infrastructure/OrderEnum";
import { Book } from "../../../entities/Book";
import { PageDto } from "../../../dto/pagination/page.dto";
import { FormBuilder, Validators } from "@angular/forms";
import { Author } from "../../../entities/Author";
import { AuthorsApiService } from "../../../services/api/crud/authors-api/authors-api.service";
import { Router } from "@angular/router";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { EventsService } from "../../../services/events/events.service";
import { Subscription } from "rxjs";
import { UserPanelApiService } from "../../../services/api/panels/user-panel-api/user-panel-api.service";
import { BookFile } from "../../../entities/BookFile";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
    public categories: Category[];
    public authors: Author[];
    public authorsSelection: Author[];

    public booksPage: PageDto<Book>;
    public currentFilter: BookPaginationFilterDto = new BookPaginationFilterDto();

    private changeRatingSubscription: Subscription;

    public filterForm = this._fb.group({
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

    constructor(
        private readonly _booksApiService: BooksApiService,
        private readonly _categoriesApiService: CategoriesApiService,
        private readonly _authorsApiService: AuthorsApiService,
        private readonly _fb: FormBuilder,
        private readonly _router: Router,
        private readonly _dataManagerService: DataManagerService,
        private readonly _eventsService: EventsService,
        private readonly _userPanelApiService: UserPanelApiService
    ) {}

    ngOnInit() {
        this._booksApiService.findAllPagination()
            .subscribe(b => this.booksPage = b);

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

        this.changeRatingSubscription = this._eventsService.changeBookRating.subscribe(data => {
            const index = this.booksPage.data.findIndex(b => b.id === data.id);
            if (index !== -1)
                this._booksApiService.findOneById(data.id)
                    .subscribe(b => this.booksPage.data[index] = b);
        });
    }

    changePage(event) {
        Object.assign(this.currentFilter, {order: OrderEnum.ASC, page: event.pageIndex + 1, take: event.pageSize})
        this._booksApiService.findAllPagination(this.currentFilter)
            .subscribe(b => {
                this.booksPage = b
                window.scroll({top: 0})
            });
    }

    // выбор категории книги
    categorySelect(category: string) {
        this.currentFilter.categoryName = category ? category : undefined;
        this.currentFilter.page = 1;

        if (category)
            this._userPanelApiService.setCategoryView(this.categories.find(c => c.name === category).id).subscribe();

        this._booksApiService.findAllPagination(
            this.currentFilter
        ).subscribe(b => this.booksPage = b);
        console.dir(this.filterForm.value);
    }

    public onFilterSubmit() {
        Object.assign(this.currentFilter, this.filterForm.value);
        this.currentFilter.page = 1;
        this._booksApiService.findAllPagination(
            this.currentFilter
        ).subscribe(b => this.booksPage = b);
        console.dir(this.filterForm.value);
    }

    public onFilterClear() {
        this.filterForm.patchValue({
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

    // async toCardDetails(book: Book) {
    async toCardDetails(id: number) {
        // await this._router.navigate([`/books/details/${book.id}`]);
        await this._router.navigate([`/books/${id}`]);
    }

    ngOnDestroy() {
        this.changeRatingSubscription.unsubscribe();
    }
}
