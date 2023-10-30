import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksReportsComponent } from './books-reports/books-reports.component';
import { UsersReportsComponent } from './users-reports/users-reports.component';
import { AuthorsReportsComponent } from './authors-reports/authors-reports.component';
import { ReportsRoutingModule } from "./reports-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { PipesModule } from "../../../pipes/pipes.module";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BookStatisticComponent } from './books-reports/book-statistic/book-statistic.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { NgChartsModule } from "ng2-charts";
import { AuthorStatisticComponent } from './authors-reports/author-statistic/author-statistic.component';
import { UserStatisticComponent } from './users-reports/user-statistic/user-statistic.component';
import { CategoriesReportsComponent } from './categories-reports/categories-reports.component';
import { CategoryStatisticComponent } from './categories-reports/category-statistic/category-statistic.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";


@NgModule({
    declarations: [
        BooksReportsComponent,
        UsersReportsComponent,
        AuthorsReportsComponent,
        BookStatisticComponent,
        AuthorStatisticComponent,
        UserStatisticComponent,
        CategoriesReportsComponent,
        CategoryStatisticComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSliderModule,
        MatTableModule,
        MatTooltipModule,
        PipesModule,
        ReactiveFormsModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatMenuModule,
        NgChartsModule,
        MatProgressSpinnerModule,
        MatDividerModule,
    ]
})
export class ReportsModule {
}
