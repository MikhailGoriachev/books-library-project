import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";
import { UserComponent } from "./user.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
    {
        path: "", component: UserComponent,
        children: [
            { path: '', component: MainComponent },
            { path: 'login', component: AuthComponent },
            { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
            { path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule) },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
