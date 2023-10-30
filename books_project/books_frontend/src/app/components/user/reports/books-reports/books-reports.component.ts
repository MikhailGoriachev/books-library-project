import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { PageDto } from "../../../../dto/pagination/page.dto";
import { BACKEND_API } from "../../../../infrastructure/constants";
import { FormBuilder, Validators } from "@angular/forms";
import { Author } from "../../../../entities/Author";
import { Category } from "../../../../entities/Category";
import { BooksApiService } from "../../../../services/api/crud/books-api/books-api.service";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { CategoriesApiService } from "../../../../services/api/crud/categories-api/categories-api.service";
import { AuthorsApiService } from "../../../../services/api/crud/authors-api/authors-api.service";
import { MatDialog } from "@angular/material/dialog";
import { EventsService } from "../../../../services/events/events.service";
import { BookReportsGroupDto } from "../../../../dto/reports/books/book-reports-group.dto";
import { BooksReportsApiService } from "../../../../services/api/reports/books-reports-api/books-reports-api.service";
import { DateService } from "../../../../services/date/date.service";
import { BookReportDto } from "../../../../dto/reports/books/book-report.dto";
import { BooksReportFilterDto } from "../../../../dto/reports/books/books-report-filter.dto";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BookStatisticComponent } from "./book-statistic/book-statistic.component";
import { ChartOptions, ChartType } from "chart.js";

@Component({
    selector: 'app-books-reports',
    templateUrl: './books-reports.component.html',
    styleUrls: ['./books-reports.component.css']
})
export class BooksReportsComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;

    dataSource?: MatTableDataSource<BookReportDto> = new MatTableDataSource<BookReportDto>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public reportGroup: BookReportsGroupDto;

    public currentFilter: BooksReportFilterDto = new BooksReportFilterDto();

    headers: string[] = [
        'image',
        'id',
        'title',
        'avgSalePrice',
        'profit',
        'sales',
        'views',
        'avgRating',
        'ratings',
    ];

    baseUrl = BACKEND_API;

    public filterForm = this._fb.group({
        id: ['', [Validators.min(1)]],
        categoryName: [''],
        title: ['', [Validators.maxLength(250)]],
        minAvgPriceSale: [0],
        maxAvgPriceSale: [1],
        minPublicationYear: [null],
        maxPublicationYear: [null],
        isbn: ['', [Validators.pattern(/^\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d{1,7}$/)]],
        authorName: ['', [Validators.maxLength(150)]],
        begin: [],
        end: []
    });

    // public priceRange = {min: 0, max: 1};
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
        private readonly _booksReportsApiService: BooksReportsApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _fb: FormBuilder,
        private readonly _categoriesApiService: CategoriesApiService,
        private readonly _authorsApiService: AuthorsApiService,
        private readonly _matDialog: MatDialog,
        private readonly _eventsService: EventsService,
        private readonly _dateService: DateService
    ) {}

    readonly pageSize = 10;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'id':
                    return item.book.id;
                case 'title':
                    return item.book.title;
                default:
                    return item[property];
            }
        };
    }

    ngOnInit() {

        const end = this._dateService.getDate(new Date());
        const days = -7;
        const begin = this._dateService.addDaysToDate(new Date(), days);

        this.filterForm.patchValue({begin, end});

        Object.assign(this.currentFilter, this.filterForm.value);

        this.isLoading = true;

        this._booksReportsApiService
            .getBooksReportsByPeriod({
                begin: this.currentFilter.begin,
                end: this.currentFilter.end
            })
            .subscribe(d => {
                this.reportGroup = d;
                this.dataSource.data = d.reports;
                this.isLoading = false;
            });


        this._booksApiService.getPublicationYearRangeWithDeleted()
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
    }

    // выбор категории книги
    categorySelect(category: string) {
        this.filterForm.patchValue({categoryName: category ? category : undefined});
        this.onFilterSubmit();
    }

    public onFilterSubmit() {
        Object.assign(this.currentFilter, this.filterForm.value);

        this.isLoading = true;

        this._booksReportsApiService
            .getBooksReportsByPeriod(this.currentFilter)
            .subscribe(d => {
                this.reportGroup = d;
                this.dataSource.data = d.reports;
                this.isLoading = false;
            });
        this.paginator.pageIndex = 0;
        // let data = this.reportGroup.reports;
        //
        // console.log('FILTER');
        //
        // if (this.currentFilter.id)
        //     data = data.filter(r => r.book.id === this.currentFilter.id);
        //
        // const title = this.currentFilter.title.toLocaleLowerCase();
        //
        // if (this.currentFilter.title)
        //     data = data.filter(r => r.book.title.toLocaleLowerCase().includes(title));
        //
        // if (this.currentFilter.minPrice && this.currentFilter.maxPrice)
        //     data = data.filter(r => r.avgSalePrice >= this.currentFilter.minPrice
        //         && r.avgSalePrice <= this.currentFilter.maxPrice);
        //
        // if (this.currentFilter.minPublicationYear && this.currentFilter.maxPublicationYear)
        //     data = data.filter(r => r.book.publicationYear >= this.currentFilter.minPublicationYear
        //         && r.book.publicationYear <= this.currentFilter.maxPublicationYear);
        //
        // const authorName = this.currentFilter.authorName.toLocaleLowerCase();
        // if (this.currentFilter.authorName)
        //     data = data.filter(r =>
        //         r.book.authors.filter(a => a.name.toLocaleLowerCase() === authorName)
        //     );
        //
        // if (this.currentFilter.isbn)
        //     data = data.filter(r => r.book.isbn.includes(this.currentFilter.isbn));
        //
        // if (this.currentFilter.categoryName)
        //     data = data.filter(r => r.book.categories.find(c => c.name === this.currentFilter.categoryName));
        //
        // // Object.assign(this.currentFilter, this.filterForm.value);
        // // this.currentFilter.page = 1;
        // // this._booksApiService.findAllPaginationWithDeleted(
        // //     this.currentFilter
        // // ).subscribe(b => {
        // //     this.reportsPage = b;
        // //     this.dataSource.data = this.reportsPage.data;
        // // });
        //
        // console.dir(this.currentFilter);
        // console.dir(data);
        //
        // this.dataSource.data = data;
        // this.dataSource._updateChangeSubscription();
    }

    public onFilterClear() {
        this.filterForm.patchValue({
            id: '',
            title: '',
            categoryName: '',
            // minAvgPriceSale: this.priceRange.min,
            // maxAvgPriceSale: this.priceRange.max,
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

    async toCardDetails(report: BookReportDto) {
        this._matDialog.open(BookStatisticComponent, {
                minHeight: '90vh',
                minWidth: '75vw',
                data: {report, begin: this.reportGroup.begin, end: this.reportGroup.end, }
            });
    }

    public chartOptions: ChartOptions = {
        responsive: true,
        devicePixelRatio: 2, // Настройте плотность пикселей (2x для высокого разрешения)
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0, // Устанавливаем точность для целых чисел
                },
                grid: {
                    display: false,
                },
                min: 1,
            },
        },
        animation: false,
        font: {
            size: 60
        }
    };

    public chartLabels: string[] = ['Количество продаж', 'Просмотры', 'Количество оценок'];
    public chartType: ChartType = "pie";
    public chartLegend: boolean = true;

    // public chartData: any[] = [];
    get chartData() {
        return [
            {
                data: [
                    this.reportGroup?.salesAmount ?? 0,
                    this.reportGroup?.viewsAmount ?? 0,
                    this.reportGroup?.ratingsAmount ?? 0,
                ],
                label: 'Общие данные',
                backgroundColor: [
                    '#264653',
                    '#2A9D8F',
                    '#E9C46A',
                    '#F4A261',
                    '#E76F51',
                ]
            },
            // {
            //     data: this.reportGroup?.ratingsAmount ?? 0,
            //     label: 'Количество оценок',
            //     borderColor: '#cc65fe',
            //     pointBackgroundColor: '#cc65fe'
            // }
        ]
    }
}
