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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatLineModule, MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { CartComponent } from './cart/cart.component';
import { MatTableModule } from "@angular/material/table";
import { BooksModule } from "./books/books.module";
import { MatCardModule } from "@angular/material/card";
import { PipesModule } from "../../pipes/pipes.module";
import { ProfileComponent } from './profile/profile.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { BooksManagementModule } from "./books-management/books-management.module";
import { ModalsModule } from "./modals/modals.module";
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
// import { MatLineModule, MatRippleModule } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CustomPaginatorComponent } from "./custom-paginator/custom-paginator.component";
import { MatPaginatorIntl } from "@angular/material/paginator";

const MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD.MM.YYYY', // this is how your date will be parsed from Input
    },
    display: {
        dateInput: 'DD.MM.YYYY', // this is how your date will get displayed on the Input
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@NgModule({
    declarations: [
        NavigationComponent,
        MainComponent,
        FooterComponent,
        AuthComponent,
        CartComponent,
        ProfileComponent,
        ResetPasswordComponent,
        CustomPaginatorComponent,
    ],
    exports: [
        NavigationComponent,
        FooterComponent
    ],
    imports: [
        ModalsModule,
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
        ReactiveFormsModule,
        MatTableModule,
        BooksModule,
        MatCardModule,
        PipesModule,
        MatRippleModule,
        MatCheckboxModule,
        BooksManagementModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT},
        {provide: MatPaginatorIntl, useClass: CustomPaginatorComponent}
    ]
})
export class UserModule {
}
