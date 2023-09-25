import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatLineModule } from "@angular/material/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { UserComponent } from './components/user/user.component';
import { UserModule } from "./components/user/user.module";
import { CommonModule } from "@angular/common";
import { UnauthorizedInterceptor } from "./interceptors/unauthorized/unauthorized.interceptor";
import { PipesModule } from "./pipes/pipes.module";


@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule,
        MatBadgeModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatLineModule,
        MatButtonToggleModule,
        UserModule,
        PipesModule,
        CommonModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
