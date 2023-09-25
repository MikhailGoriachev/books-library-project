import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPipe } from "./list.pipe";
import { RangePipe } from "./range.pipe";
import { AuthorsPipe } from "./authors.pipe";


@NgModule({
    declarations: [
        ListPipe,
        RangePipe,
        AuthorsPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ListPipe,
        RangePipe,
        AuthorsPipe
    ]
})
export class PipesModule {
}
