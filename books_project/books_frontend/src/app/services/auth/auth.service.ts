import { Injectable } from '@angular/core';
import { RegistrationDto } from "../../dto/auth/registration.dto";
import { AuthApiService } from "../api/auth/auth-api.service";
import { AuthDto } from "../../dto/auth/auth.dto";
import { TokenDto } from "../../dto/auth/token.dto";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { lastValueFrom, map, tap } from "rxjs";
import { User } from "../../entities/User";
import { EventsService } from "../events/events.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private readonly _authApiService: AuthApiService,
        private readonly _localStorageService: LocalStorageService,
        private readonly _eventsService: EventsService,
        private readonly _router: Router
    ) {}

    public isFlag = true;

    public get isAuthData(): boolean {
        return !(!this._localStorageService.accessToken && !this._localStorageService.refreshToken);
    }

    public get accessToken(): string {
        return this._localStorageService.accessToken;
    }

    public get refreshToken(): string {
        return this._localStorageService.refreshToken;
    }

    async registration(registration: RegistrationDto) {
        const result = await lastValueFrom(this._authApiService.registration(registration));

        this._localStorageService.refreshToken = result.refreshToken;
        this._localStorageService.accessToken = result.accessToken;

        this._eventsService.changeLogin.next({isAuth: true});

        return result;
    }

    async login(signInDto: AuthDto) {
        const result = await lastValueFrom(this._authApiService.login(signInDto));

        this._localStorageService.refreshToken = result.refreshToken;
        this._localStorageService.accessToken = result.accessToken;

        this._eventsService.changeLogin.next({isAuth: true});

        return result;
    }

    async logout() {
        const result = await lastValueFrom(this._authApiService.logout(
            new TokenDto(this._localStorageService.accessToken, this._localStorageService.refreshToken)
        ));

        await this._router.navigate(['/']);

        this._localStorageService.accessToken = this._localStorageService.refreshToken = '';
        // this._profileDataService.user = null;
        // this._profileDataService.cartItems = [];

        this._eventsService.changeLogin.next({isAuth: false});

        return result;
    }

    async getAccessToken() {
        const result = await lastValueFrom(this._authApiService.getAccessToken());

        this._localStorageService.accessToken = result['access_token'];

        // return this._authApiService.getAccessToken().pipe(
        //     tap(res => console.log(res)),
        //     map(res => this._localStorageService.accessToken = res['access_token'])
        // )

        return result;
    }

    async getProfile(): Promise<User> {
        return await lastValueFrom(this._authApiService.getProfile());
    }
}
