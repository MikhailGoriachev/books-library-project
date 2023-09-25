import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from "./books.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { ModalComponent } from "../modals/modal/modal.component";
import { AuthorDetailsComponent } from "../authors/author-details/author-details.component";

const routes: Routes = [
    {
        path: '', component: BooksComponent,
        children: [
            {
                path: ':id', component: ModalComponent, data: {
                    component: BookDetailsComponent, config: {
                        maxWidth: '100vw',
                        maxHeight: '100vh',
                        height: '98%',
                        width: '98%',
                        panelClass: ['full-screen-modal', 'full-height-content']
                    },
                    backPath: 'books/',
                    // data: {
                    //     isAuthorDetails: true
                    // }
                },
                children: [
                    {
                        path: 'author/:id', component: ModalComponent, data: {
                            component: AuthorDetailsComponent, config: {
                                maxWidth: '100vw',
                                maxHeight: '100vh',
                                height: '98%',
                                width: '98%',
                                panelClass: ['full-screen-modal', 'full-height-content']
                            },
                            backPathFunc: (url: string) => url.slice(0, url.lastIndexOf('/author/')),
                            data: {
                                isBookDetails: true
                            }
                        },
                    },
                ]
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule {
}
