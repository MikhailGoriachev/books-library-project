import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsManagementRoutingModule } from './authors-management-routing.module';
import { AuthorsManagementComponent } from './authors-management.component';
import { MatIconModule } from "@angular/material/icon";
import { AuthorFormComponent } from './author-form/author-form.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatOptionModule, MatRippleModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { PipesModule } from "../../../pipes/pipes.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [
    AuthorsManagementComponent,
    AuthorFormComponent
  ],
    imports: [
        CommonModule,
        AuthorsManagementRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSidenavModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatTableModule,
        PipesModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule
    ]
})
export class AuthorsManagementModule { }
