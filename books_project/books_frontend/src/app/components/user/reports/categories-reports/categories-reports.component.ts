import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CategoryReportDto } from "../../../../dto/reports/categories/category-report.dto";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CategoryReportFilterDto } from "../../../../dto/reports/categories/category-report-filter.dto";
import { BACKEND_API } from "../../../../infrastructure/constants";
import { FormBuilder, Validators } from "@angular/forms";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { MatDialog } from "@angular/material/dialog";
import { EventsService } from "../../../../services/events/events.service";
import { DateService } from "../../../../services/date/date.service";
import { BookReportDto } from "../../../../dto/reports/books/book-report.dto";
import { AuthorStatisticComponent } from "../authors-reports/author-statistic/author-statistic.component";
import { ChartOptions, ChartType } from "chart.js";
import { CategoryReportsGroupDto } from "../../../../dto/reports/categories/category-reports-group.dto";
import {
    CategoriesReportsApiService
} from "../../../../services/api/reports/categories-reports-api/categories-reports-api.service";
import { CategoryStatisticComponent } from "./category-statistic/category-statistic.component";

@Component({
    selector: 'app-categories-reports',
    templateUrl: './categories-reports.component.html',
    styleUrls: ['./categories-reports.component.css']
})
export class CategoriesReportsComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;

    dataSource?: MatTableDataSource<CategoryReportDto> = new MatTableDataSource<CategoryReportDto>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public reportGroup: CategoryReportsGroupDto;

    public currentFilter: CategoryReportFilterDto = new CategoryReportFilterDto();

    headers: string[] = [
        'id',
        'name',
        'views',
        'avgSalePrice',
        'profit',
        'sales',
        'booksViews',
        'avgRating',
        'ratings',
    ];

    baseUrl = BACKEND_API;

    Math = Math;

    public filterForm = this._fb.group({
        id: ['', [Validators.min(1)]],
        name: ['', [Validators.maxLength(150)]],
        begin: [],
        end: []
    });

    public get isValid(): boolean {
        return this.filterForm.valid;
    }

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }


    constructor(
        private readonly _categoriesReportsApiService: CategoriesReportsApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _fb: FormBuilder,
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
                    return item.category.id;
                case 'name':
                    return item.category.name;
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

        this._categoriesReportsApiService
            .getCategoriesReportsByPeriod({
                begin: this.currentFilter.begin,
                end: this.currentFilter.end
            })
            .subscribe(d => {
                this.reportGroup = d;
                this.dataSource.data = d.reports;
                this.isLoading = false;
            });
    }

    public onFilterSubmit() {
        Object.assign(this.currentFilter, this.filterForm.value);

        this.isLoading = true;
        this._categoriesReportsApiService
            .getCategoriesReportsByPeriod(this.currentFilter)
            .subscribe(d => {
                this.reportGroup = d;
                this.dataSource.data = d.reports;
                this.isLoading = false;
            });

        this.paginator.pageIndex = 0;
    }

    public onFilterClear() {
        this.filterForm.patchValue({
            id: '',
            name: '',
        });
        this.onFilterSubmit();
    }

    async toCardDetails(report: BookReportDto) {
        this._matDialog.open(CategoryStatisticComponent, {
            minHeight: '90vh',
            minWidth: '75vw',
            data: {report, begin: this.reportGroup.begin, end: this.reportGroup.end,}
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

    public chartLabels: string[] = ['Количество продаж', 'Просмотры', 'Просмотры книг', 'Количество оценок'];
    public chartType: ChartType = "pie";
    public chartLegend: boolean = true;

    // public chartData: any[] = [];
    get chartData() {
        return [
            {
                data: [
                    this.reportGroup?.salesAmount ?? 0,
                    this.reportGroup?.viewsAmount ?? 0,
                    this.reportGroup?.booksViewsAmount ?? 0,
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
