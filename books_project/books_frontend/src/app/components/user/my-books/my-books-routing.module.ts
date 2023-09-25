import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from "../modals/modal/modal.component";
import { AuthorDetailsComponent } from "../authors/author-details/author-details.component";
import { MyBooksComponent } from "./my-books.component";
import { BookDetailsComponent } from "../books/book-details/book-details.component";

const routes: Routes = [
    {
        path: '', component: MyBooksComponent,
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
                    backPath: 'my-books/',
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
export class MyBooksRoutingModule {
}
