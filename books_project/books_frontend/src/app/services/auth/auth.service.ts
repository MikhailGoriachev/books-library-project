import { Injectable } from '@angular/core';
import { RegistrationDto } from "../../dto/auth/registration.dto";
import { AuthApiService } from "../api/auth/auth-api.service";
import { AuthDto } from "../../dto/auth/auth.dto";
import { TokenDto } from "../../dto/auth/token.dto";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private readonly _authApiService: AuthApiService,
                private readonly _localStorageService: LocalStorageService) {}

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


    /*
    expired tokens:
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJlbWFpbCI6Im1pc2hhZ29yMjI4QGdtYWlsLmNvbSIsImlhdCI6MTY4OTIwMjM3MiwiZXhwIjoxNjg5MjAzMjcyfQ.KfPP0YZIf2IUJ52qYe5uuvi4TrQtbTYVoa6W-9FYLos",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJlbWFpbCI6Im1pc2hhZ29yMjI4QGdtYWlsLmNvbSIsImlhdCI6MTY4OTIwMjM3MiwiZXhwIjoxNjg5ODA3MTcyfQ.oWqBMZM6AXLsgHXV3EMdd6-YwLqNtUZVH5tHFBvN0u0"
    }
     */

    async logout() {
        return lastValueFrom(this._authApiService.logout(
            new TokenDto(this._localStorageService.accessToken, this._localStorageService.refreshToken)
        ));
    }

    async getAccessToken() {
        const result = await lastValueFrom(this._authApiService.getAccessToken());

        this._localStorageService.accessToken = result.accessToken;

        return result;
    }

    async getProfile() {
        return await lastValueFrom(this._authApiService.getProfile());
    }
}
