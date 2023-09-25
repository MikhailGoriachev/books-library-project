import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate, CanLoad,
    Route, Router,
    RouterStateSnapshot, UrlSegment,
    UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { DataManagerService } from "../data-manager/data-manager.service";

@Injectable({
    providedIn: 'root'
})
export class UserCanActivateService implements CanLoad {

    constructor(
        private readonly _dataManagerService: DataManagerService,
        private readonly _router: Router
    ) { }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const result = !!this._dataManagerService.user;

        if (!result)
            this._router.navigate(['/']).then();

        return result;
    }
}
