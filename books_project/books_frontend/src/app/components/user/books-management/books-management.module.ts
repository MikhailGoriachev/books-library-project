import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksManagementRoutingModule } from './books-management-routing.module';
import { BooksManagementComponent } from './books-management.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { PipesModule } from "../../../pipes/pipes.module";
import { BooksModule } from "../books/books.module";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ReactiveFormsModule } from "@angular/forms";
import { BookFormComponent } from './book-form/book-form.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [
    BooksManagementComponent,
    BookFormComponent
  ],
    imports: [
        CommonModule,
        BooksManagementRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        PipesModule,
        BooksModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSidenavModule,
        MatSliderModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule
    ]
})
export class BooksManagementModule { }
