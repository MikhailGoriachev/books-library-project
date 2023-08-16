import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { AuthComponent } from "../../auth/auth.component";
import { User } from "../../../../entities/User";
import { ProfileDataService } from "../../../../services/profile-data/profile-data.service";
import { UserPanelApiService } from "../../../../services/api/panels/user-panel-api/user-panel-api.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public isAuth: boolean = false;

    public get user() {
        return this._profileDataService.user;
    }

    public get cartItems() {
        return this._profileDataService.cartItems;
    }

    constructor(private readonly _authService: AuthService,
                private readonly _matDialog: MatDialog,
                private readonly _profileDataService: ProfileDataService,
                private readonly _userPanelApiService: UserPanelApiService) {}

    ngOnInit(): void {
        this.isAuth = this._authService.isAuthData;
        if (this.isAuth)
            this._authService.getProfile().then(u => this._profileDataService.user = u);
    }

    async logout() {
        await this._authService.logout();
        this.isAuth = this._authService.isAuthData;
        this._profileDataService.user = null;
        // this._authService.isFlag = false;
    }

    async login() {
        this._authService.isFlag = !this._authService.isFlag;

        const dialogRef = this._matDialog.open(AuthComponent, {
            minWidth: '35rem',
            position: { top: '7%' }
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (!result)
                return;

            this.isAuth = this._authService.isAuthData;
            this._profileDataService.user = await this._authService.getProfile();
            this._profileDataService.cartItems = await firstValueFrom(this._userPanelApiService.getBooksFromCart());
        });
    }
}
