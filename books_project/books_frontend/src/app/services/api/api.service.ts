import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { Utils } from "../../infrastructure/Utils";
import { map, Observable, tap } from "rxjs";
import { BACKEND_API } from "../../infrastructure/constants";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // public url = 'http://localhost:3000/';
    // public url =;

    // public url = 'https://goriachev-mikhail.com/api/';

    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _localStorageService: LocalStorageService
    ) { }

    public get(
        route: string,
        params?,
        headers: {} = this.authAccessTokenObject
    ) {
        if (typeof params === 'object' && params)
            params = new HttpParams({fromObject: Utils.removeUndefinedAndEmptyFields(params)});

        // this._httpClient.

        // console.log(headers);
        // console.log(route);

        // return this._httpClient.get(BACKEND_API + route, { params, headers }).pipe(map(d =>
        // {console.log('RESPONSE');return d}));
        return this._httpClient.get(BACKEND_API + route, {params, headers});
    }

    public post(route: string, body?, headers: {} = this.authAccessTokenObject) {
        return this._httpClient.post(BACKEND_API + route, body, {headers});
    }

    public downloadFile(
        route: string,
        body?,
        headers: {} = this.authAccessTokenObject
    ): Observable<HttpResponse<Blob>> {

        return this._httpClient.post(BACKEND_API + route, body, {headers, responseType: 'blob', observe: 'response'});
    }

    public uploadFile(
        route: string,
        body?,
        headers: {} = this.authAccessTokenObject
    ): Observable<{fileName: string}> {
        headers['Content-Type'] = 'multipart/form-data';

        return this._httpClient.post(BACKEND_API + route, body, {headers}) as Observable<{fileName: string}>;
    }

    public put(route: string, body?, params?, headers: {} = this.authAccessTokenObject) {
        return this._httpClient.put(BACKEND_API + route, body, {params, headers});
    }

    public delete(route: string, body?, params?, headers: {} = this.authAccessTokenObject) {
        return this._httpClient.delete(BACKEND_API + route, {params, headers});
    }

    get authAccessTokenObject() {
        return {Authorization: 'Bearer ' + this._localStorageService.accessToken};
    }
}
