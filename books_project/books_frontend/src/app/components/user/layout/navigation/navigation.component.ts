import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { AuthComponent } from "../../auth/auth.component";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { CartComponent } from "../../cart/cart.component";
import { ProfileComponent } from "../../profile/profile.component";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public get isAuth() {
        return this._authService.isAuthData;
    }

    public get isAdmin() {
        return this._dataManagerService?.isAdmin;
    }

    public get user() {
        return this._dataManagerService.user;
    }

    public get cartItems() {
        return this._dataManagerService.cartItems;
    }

    constructor(
        private readonly _authService: AuthService,
        private readonly _matDialog: MatDialog,
        private readonly _dataManagerService: DataManagerService,
    ) {}

    ngOnInit(): void {

        // this.isAuth = this._authService.isAuthData;
        // if (this.isAuth)
        //     this._dataManagerService.loadUserProfile().then();
        // this._dataManagerService.loadCartItems().then();

    }

    async logout() {
        await this._authService.logout();
        // this.isAuth = this._authService.isAuthData;
        // this._dataManagerService.user = null;
        // this._authService.isFlag = false;
    }

    async login() {
        const dialogRef = this._matDialog.open(AuthComponent, {
            minWidth: '35rem',
            position: {top: '7%'}
        });
    }

    async profileSettings() {
        const dialogRef = this._matDialog.open(ProfileComponent, {
            // minWidth: '40vw',
            // position: {top: '7%'}
            width: '45rem',
            // position: {top: '7%'}
        });
    }

    async cart() {
        const dialogRef = this._matDialog.open(CartComponent, {
            // minHeight: '90vh',
            minWidth: '40vw'
        });
    }
}
