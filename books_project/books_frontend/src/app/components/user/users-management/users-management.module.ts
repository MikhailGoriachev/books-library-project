import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    UsersManagementComponent
  ],
    imports: [
        CommonModule,
        UsersManagementRoutingModule,
        MatIconModule
    ]
})
export class UsersManagementModule { }
