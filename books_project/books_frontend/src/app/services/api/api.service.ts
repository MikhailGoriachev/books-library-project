import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public url = 'http://localhost:3000/';
    // public url = 'https://goriachev-mikhail.com/';

    constructor(private _httpClient: HttpClient) { }

    public get(route: string, params?, headers?) {

        if (typeof params === 'object' && params)
            params = new HttpParams({ fromObject: params });

        return this._httpClient.get(this.url + route, { params, headers });
    }

    public post(route: string, body?, params?, headers?) {
        return this._httpClient.post(this.url + route, body, { params, headers });
    }

    public put(route: string, body?, params?, headers?) {
        return this._httpClient.put(this.url + route, body, { params, headers });
    }

    public delete(route: string, body?, params?, headers?) {
        return this._httpClient.delete(this.url + route, { params, headers });
    }
}
