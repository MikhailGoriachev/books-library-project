import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBooksComponent } from "./my-books.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { RouterOutlet } from "@angular/router";
import { PipesModule } from "../../../pipes/pipes.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MyBooksRoutingModule } from "./my-books-routing.module";
import { MatMenuModule } from "@angular/material/menu";
import { BooksModule } from "../books/books.module";


@NgModule({
    declarations: [
        MyBooksComponent
    ],
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatIconModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSliderModule,
        MatExpansionModule,
        MatChipsModule,
        MatCardModule,
        RouterOutlet,
        PipesModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatTooltipModule,
        MyBooksRoutingModule,
        MatMenuModule,
        BooksModule,
    ]
})
export class MyBooksModule {
}
