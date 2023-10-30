import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BACKEND_API } from "../../../../infrastructure/constants";
import { FormBuilder, Validators } from "@angular/forms";
import {
    AuthorsReportsApiService
} from "../../../../services/api/reports/authors-reports-api/authors-reports-api.service";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { MatDialog } from "@angular/material/dialog";
import { EventsService } from "../../../../services/events/events.service";
import { DateService } from "../../../../services/date/date.service";
import { BookReportDto } from "../../../../dto/reports/books/book-report.dto";
import { AuthorStatisticComponent } from "../authors-reports/author-statistic/author-statistic.component";
import { ChartOptions, ChartType } from "chart.js";
import { UserReportDto } from "../../../../dto/reports/users/user-report.dto";
import { UserReportsGroupDto } from "../../../../dto/reports/users/user-reports-group.dto";
import { UserReportFilterDto } from "../../../../dto/reports/users/user-report-filter.dto";
import { UsersReportsApiService } from "../../../../services/api/reports/users-reports-api/users-reports-api.service";
import { UserStatisticComponent } from "./user-statistic/user-statistic.component";

@Component({
    selector: 'app-users-reports',
    templateUrl: './users-reports.component.html',
    styleUrls: ['./users-reports.component.css']
})
export class UsersReportsComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;

    dataSource?: MatTableDataSource<UserReportDto> = new MatTableDataSource<UserReportDto>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public reportGroup: UserReportsGroupDto;

    public currentFilter: UserReportFilterDto = new UserReportFilterDto();

    headers: string[] = [
        'image',
        'id',
        'email',
        'booksViews',
        'authorsViews',
        'categoriesViews',
        'avgSalePrice',
        'profit',
        'sales',
        'avgRating',
        'ratings',
    ];

    baseUrl = BACKEND_API;

    public filterForm = this._fb.group({
        id: ['', [Validators.min(1)]],
        name: ['', [Validators.maxLength(255)]],
        email: ['', [Validators.maxLength(255)]],
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
        private readonly _usersReportsApiService: UsersReportsApiService,
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
                    return item.user.id;
                case 'name':
                    return item.user.name;
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

        this._usersReportsApiService
            .getUsersReportsByPeriod({
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

        this._usersReportsApiService
            .getUsersReportsByPeriod(this.currentFilter)
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
            email: ''
        });
        this.onFilterSubmit();
    }

    async toCardDetails(report: BookReportDto) {
        this._matDialog.open(UserStatisticComponent, {
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

    public chartLabels: string[] = [
        'Количество продаж',
        'Просмотры книг',
        'Просмотры авторов',
        'Просмотры категорий',
        'Количество оценок'
    ];
    public chartType: ChartType = "pie";
    public chartLegend: boolean = true;

    // public chartData: any[] = [];
    get chartData() {
        return [
            {
                data: [
                    this.reportGroup?.salesAmount ?? 0,
                    this.reportGroup?.authorsViewsAmount ?? 0,
                    this.reportGroup?.booksViewsAmount ?? 0,
                    this.reportGroup?.categoriesViewsAmount ?? 0,
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
        ]
    }
}
