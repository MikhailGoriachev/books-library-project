import { Injectable } from '@angular/core';
import { RegistrationDto } from "../../../dto/auth/registration.dto";
import { AuthDto } from "../../../dto/auth/auth.dto";
import { TokenDto } from "../../../dto/auth/token.dto";
import { ApiService } from "../api.service";
import { LocalStorageService } from "../../local-storage/local-storage.service";
import { map, Observable } from "rxjs";
import { User } from "../../../entities/User";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private static readonly basePath = 'auth/';

    constructor(
        private readonly _apiService: ApiService,
        private readonly _localStorageService: LocalStorageService
    ) {}

    registration(registration: RegistrationDto) {
        return this._apiService.post(AuthApiService.basePath + 'registration', registration).pipe(
            map(tokens => new TokenDto(tokens['access_token'], tokens['refresh_token']))) as Observable<TokenDto>;
    }

    login(signInDto: AuthDto) {
        return this._apiService.post(AuthApiService.basePath + 'login', signInDto).pipe(
            map(tokens => new TokenDto(tokens['access_token'], tokens['refresh_token']))) as Observable<TokenDto>;
    }


    /*
    expired tokens:
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJlbWFpbCI6Im1pc2hhZ29yMjI4QGdtYWlsLmNvbSIsImlhdCI6MTY4OTIwMjM3MiwiZXhwIjoxNjg5MjAzMjcyfQ.KfPP0YZIf2IUJ52qYe5uuvi4TrQtbTYVoa6W-9FYLos",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJlbWFpbCI6Im1pc2hhZ29yMjI4QGdtYWlsLmNvbSIsImlhdCI6MTY4OTIwMjM3MiwiZXhwIjoxNjg5ODA3MTcyfQ.oWqBMZM6AXLsgHXV3EMdd6-YwLqNtUZVH5tHFBvN0u0"
    }
     */

    logout(token: TokenDto) {
        return this._apiService.post(AuthApiService.basePath + 'logout', token);
    }

    getAccessToken() {
        return this._apiService.get(
            AuthApiService.basePath + 'token',
            undefined,
            {Authorization: 'Bearer ' + this._localStorageService.refreshToken}
        );
        // ) as Observable<Partial<any>>;
    }

    getProfile(): Observable<User> {
        return this._apiService.get(AuthApiService.basePath + 'profile')
                   .pipe(
                       map(u => User.assign(new User(), u))
                   );
    }

    resetPassword(email: string) {
        return this._apiService.post(AuthApiService.basePath + 'reset-password', {email});
    }
}
