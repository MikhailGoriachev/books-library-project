import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksReportsComponent } from "./books-reports/books-reports.component";
import { AuthorsReportsComponent } from "./authors-reports/authors-reports.component";
import { UsersReportsComponent } from "./users-reports/users-reports.component";

const routes: Routes = [
    {path: 'books-reports', component: BooksReportsComponent},
    {path: 'authors-reports', component: AuthorsReportsComponent},
    {path: 'users-reports', component: UsersReportsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {
}
