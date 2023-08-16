import { Injectable } from '@angular/core';
import { RegistrationDto } from "../../dto/auth/registration.dto";
import { AuthApiService } from "../api/auth/auth-api.service";
import { AuthDto } from "../../dto/auth/auth.dto";
import { TokenDto } from "../../dto/auth/token.dto";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { lastValueFrom } from "rxjs";
import { User } from "../../entities/User";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private readonly _authApiService: AuthApiService,
                private readonly _localStorageService: LocalStorageService) {}

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

        return result;
    }

    async login(signInDto: AuthDto) {
        const result = await lastValueFrom(this._authApiService.login(signInDto));

        this._localStorageService.refreshToken = result.refreshToken;
        this._localStorageService.accessToken = result.accessToken;

        console.dir(result);

        return result;
    }

    async logout() {
        const result = lastValueFrom(this._authApiService.logout(
            new TokenDto(this._localStorageService.accessToken, this._localStorageService.refreshToken)
        ));

        this._localStorageService.accessToken = this._localStorageService.refreshToken = '';

        return result;
    }

    async getAccessToken() {
        const result = await lastValueFrom(this._authApiService.getAccessToken());

        this._localStorageService.accessToken = result['access_token'];

        return result;
    }

    async getProfile(): Promise<User> {
        return await lastValueFrom(this._authApiService.getProfile());
    }
}
