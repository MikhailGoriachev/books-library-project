import { Component, Inject } from '@angular/core';
import { ChartOptions, ChartType } from "chart.js";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryReportDto } from "../../../../../dto/reports/categories/category-report.dto";
import { DateService } from "../../../../../services/date/date.service";
import { Utils } from "../../../../../infrastructure/Utils";

@Component({
    selector: 'app-category-statistic',
    templateUrl: './category-statistic.component.html',
    styleUrls: ['./category-statistic.component.css']
})
export class CategoryStatisticComponent {
    public chartOptions: ChartOptions = {
        responsive: true,
        devicePixelRatio: 2, // Настройте плотность пикселей (2x для высокого разрешения)
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0, // Устанавливаем точность для целых чисел
                },
                min: 0,
            },
        },
        elements: {
            point: {
                radius: 4.5,
                hoverRadius: 6
            },
        }
    };

    public chartLabels: string[] = [];
    public chartType: ChartType = "line";
    public chartLegend: boolean = true;

    public chartData: any[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { report: CategoryReportDto, begin: Date, end: Date },
        private readonly _dateService: DateService
    ) {}


    ngOnInit() {
        const dateFormat = 'dd.MM';

        const dates = Utils.getDatesInRange(new Date(this.data.begin), new Date(this.data.end));
        this.chartLabels = dates.map(d => this._dateService.toDateString(d, dateFormat));

        // продажи
        this.chartData.push(
            {
                data: this.getSalesData(dates),
                label: 'Количество продаж',
                borderColor: '#264653',
                backgroundColor: '#264653',
                pointBackgroundColor: '#264653'
            },
            {
                data: this.getViewsData(dates),
                label: 'Просмотры',
                borderColor: '#2A9D8F',
                backgroundColor: '#2A9D8F',
                pointBackgroundColor: '#2A9D8F'
            },
            {
                data: this.getBooksViewsData(dates),
                label: 'Просмотр книг',
                borderColor: '#E9C46A',
                backgroundColor: '#E9C46A',
                pointBackgroundColor: '#E9C46A'
            },
            {
                data: this.getRatingsData(dates),
                label: 'Количество оценок',
                borderColor: '#F4A261',
                backgroundColor: '#F4A261',
                pointBackgroundColor: '#F4A261'
            }
        )
    }

    getSalesData(dates: Date[]): number[] {
        const result = [];
        const sales = this.data.report.sales;

        for (const date of dates) {
            const s = sales.filter(s => this._dateService.isDateEquals(new Date(s.saleAt), date));
            result.push(s.length);
        }

        return result;
    }

    getViewsData(dates: Date[]): number[] {
        const result = [];
        const views = this.data.report.views;

        for (const date of dates) {
            const s = views.filter(s => this._dateService.isDateEquals(new Date(s.viewedAt), date));
            result.push(s.length);
        }

        return result;
    }

    getBooksViewsData(dates: Date[]): number[] {
        const result = [];
        const booksViews = this.data.report.booksViews;

        for (const date of dates) {
            const s = booksViews.filter(s => this._dateService.isDateEquals(new Date(s.viewedAt), date));
            result.push(s.length);
        }

        return result;
    }

    getRatingsData(dates: Date[]): number[] {
        const result = [];
        const ratings = this.data.report.ratings;

        for (const date of dates) {
            const s = ratings.filter(s => this._dateService.isDateEquals(new Date(s.createdAt), date));
            result.push(s.length);
        }

        return result;
    }
}
