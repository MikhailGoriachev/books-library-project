import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { MatIconModule } from "@angular/material/icon";
import { UserFormComponent } from './user-form/user-form.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { PipesModule } from "../../../pipes/pipes.module";


@NgModule({
  declarations: [
    UsersManagementComponent,
    UserFormComponent
  ],
    imports: [
        CommonModule,
        UsersManagementRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCheckboxModule,
        PipesModule
    ]
})
export class UsersManagementModule { }
