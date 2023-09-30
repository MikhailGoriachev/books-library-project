import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksReportsComponent } from './books-reports/books-reports.component';
import { UsersReportsComponent } from './users-reports/users-reports.component';
import { AuthorsReportsComponent } from './authors-reports/authors-reports.component';
import { ReportsRoutingModule } from "./reports-routing.module";


@NgModule({
    declarations: [
        BooksReportsComponent,
        UsersReportsComponent,
        AuthorsReportsComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule
    ]
})
export class ReportsModule {
}
