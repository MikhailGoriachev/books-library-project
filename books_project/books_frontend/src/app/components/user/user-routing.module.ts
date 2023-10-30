import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";
import { UserComponent } from "./user.component";
import { MainComponent } from "./main/main.component";
import { UserCanActivateService } from "../../services/user-can-activate/user-can-activate.service";
import { AdminCanLoad } from "../../services/admin-can-load/admin-can-load.service";

const routes: Routes = [
    {
        path: "", component: UserComponent,
        children: [
            {path: '', component: MainComponent},
            {path: 'login', component: AuthComponent},
            {path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule)},
            {
                path: 'my-books',
                loadChildren: () => import('./my-books/my-books.module').then(m => m.MyBooksModule),
                canLoad: [UserCanActivateService]
            },
            {
                path: 'my-books',
                loadChildren: () => import('./my-books/my-books.module').then(m => m.MyBooksModule),
                canLoad: [UserCanActivateService]
            },
            {
                path: 'books-management',
                loadChildren: () => import('./books-management/books-management.module').then(m => m.BooksManagementModule),
                canLoad: [AdminCanLoad]
            },
            {path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule)},
            {
                path: 'authors-management',
                loadChildren: () => import('./authors-management/authors-management.module').then(m => m.AuthorsManagementModule),
                canLoad: [AdminCanLoad]
            },
            {
                path: 'users-management',
                loadChildren: () => import('./users-management/users-management.module').then(m => m.UsersManagementModule),
                canLoad: [AdminCanLoad]
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
                canLoad: [AdminCanLoad]
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
