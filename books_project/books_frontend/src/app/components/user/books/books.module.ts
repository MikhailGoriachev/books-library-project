import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from "./books.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { AuthorsPipe } from "../../../pipes/authors.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatLineModule, MatRippleModule } from "@angular/material/core";
import { BookDetailsComponent } from './book-details/book-details.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { AppModule } from "../../../app.module";
import { PipesModule } from "../../../pipes/pipes.module";
import { MatMenuModule } from "@angular/material/menu";
import { BookCardComponent } from './book-card/book-card.component';


@NgModule({
    declarations: [
        BooksComponent,
        BookDetailsComponent,
        BookCardComponent
    ],
    exports: [
        BookCardComponent
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        MatExpansionModule,
        MatChipsModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatRippleModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatListModule,
        MatLineModule,
        MatBadgeModule,
        PipesModule,
        MatMenuModule
    ]
})
export class BooksModule { }
