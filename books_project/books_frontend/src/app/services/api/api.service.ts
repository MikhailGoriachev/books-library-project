import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public url = 'http://localhost:3000/';

    // public url = 'https://goriachev-mikhail.com/api/';

    constructor(private readonly _httpClient: HttpClient,
                private readonly _localStorageService: LocalStorageService) { }

    public get(route: string,
               params?,
               headers: {} = this.authAccessTokenObject) {
        if (typeof params === 'object' && params)
            params = new HttpParams({ fromObject: params });

        // this._httpClient.

        // console.log(headers);

        return this._httpClient.get(this.url + route, { params, headers });
    }

    public post(route: string, body?, headers: {} = this.authAccessTokenObject) {
        return this._httpClient.post(this.url + route, body, { headers });
    }

    public put(route: string, body?, params?, headers: {} = this.authAccessTokenObject) {
        return this._httpClient.put(this.url + route, body, { params, headers });
    }

    public delete(route: string, body?, params?, headers: {} = this.authAccessTokenObject) {
        return this._httpClient.delete(this.url + route, { params, headers });
    }

    get authAccessTokenObject() {
        return { Authorization: 'Bearer ' + this._localStorageService.accessToken };
    }
}
