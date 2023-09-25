import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from "./authors.component";
import { AuthorDetailsComponent } from "./author-details/author-details.component";
import { ModalComponent } from "../modals/modal/modal.component";
import { BookDetailsComponent } from "../books/book-details/book-details.component";

const routes: Routes = [
    {
        path: '', component: AuthorsComponent,
        children: [
            {
                path: ':id', component: ModalComponent, data: {
                    component: AuthorDetailsComponent, config: {
                        maxWidth: '100vw',
                        maxHeight: '100vh',
                        height: '98%',
                        width: '98%',
                        panelClass: ['full-screen-modal', 'full-height-content']
                    },
                    backPath: 'authors/',
                    // data: {
                    //     isBookDetails: true
                    // }
                },
                children: [
                    {
                        path: 'book/:id', component: ModalComponent, data: {
                            component: BookDetailsComponent, config: {
                                maxWidth: '100vw',
                                maxHeight: '100vh',
                                height: '98%',
                                width: '98%',
                                panelClass: ['full-screen-modal', 'full-height-content']
                            },
                            backPathFunc: (url: string) => url.slice(0, url.lastIndexOf('/book/')),
                            data: {
                                isAuthorDetails: true
                            }
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorsRoutingModule {
}
