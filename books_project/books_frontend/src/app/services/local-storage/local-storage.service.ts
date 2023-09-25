import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(@Inject(LOCAL_STORAGE) private readonly _localStorageService: StorageService) { }


    public get accessToken(): string {
        return this._localStorageService.get('access_token');
    }

    public set accessToken(token: string) {
        this._localStorageService.set('access_token', token);
    }

    public get refreshToken(): string {
        return this._localStorageService.get('refresh_token');
    }

    public set refreshToken(token: string) {
        this._localStorageService.set('refresh_token', token);
    }

    public get cartItems(): number[] {
        return this._localStorageService.get('cart_items');
    }

    public set cartItems(cartItemIds: number[]) {
        this._localStorageService.set('cart_items', cartItemIds);
    }
}
