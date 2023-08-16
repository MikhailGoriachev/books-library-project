import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavigationComponent } from "./layout/navigation/navigation.component";
import { MainComponent } from "./main/main.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { AuthComponent } from "./auth/auth.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatLineModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
    declarations: [
        NavigationComponent,
        MainComponent,
        FooterComponent,
        AuthComponent
    ],
    exports: [
        NavigationComponent,
        FooterComponent
    ],
    imports: [
        UserRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatBadgeModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatLineModule,
        MatButtonToggleModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        NgIf,
        MatDialogModule,
        ReactiveFormsModule
    ]
})
export class UserModule {}
