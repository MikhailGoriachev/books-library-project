import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {
    BehaviorSubject,
    catchError,
    filter, finalize,
    from, map, mergeMap,
    Observable, of,
    retry,
    Subject,
    switchMap,
    take,
    throwError
} from 'rxjs';
import { AuthService } from "../../services/auth/auth.service";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { EventsService } from "../../services/events/events.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    // private isRefreshingToken = false; // Флаг для отслеживания выполнения запроса на обновление токена
    // private tokenRefreshSubject: Subject<any> = new Subject<any>();

    constructor(
        private readonly _authService: AuthService,
        private readonly _localStorageService: LocalStorageService,
        private readonly _eventsService: EventsService
    ) {}

    // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log("INTERCEPTOR")

                if (error.status === 498) {
                    this._localStorageService.accessToken = ''; // Выход из системы в случае неудачи
                    this._localStorageService.refreshToken = ''; // Выход из системы в случае неудачи
                    this._eventsService.changeLogin.next({isAuth: false});
                } else if (error.status === 401 && this._authService.isAuthData) {
                    return from(this._authService.getAccessToken()).pipe(
                        mergeMap(() => {
                            console.log('SET NEW TOKEN');

                            // После получения нового токена, повторяем исходный запрос с обновленным токеном
                            const newRequest = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${this._authService.accessToken}`
                                }
                            });

                            console.log(newRequest.url);
                            return next.handle(newRequest);
                        }),
                        catchError(err => {
                            this._localStorageService.accessToken = ''; // Выход из системы в случае неудачи
                            this._localStorageService.refreshToken = ''; // Выход из системы в случае неудачи

                            this._eventsService.changeLogin.next({isAuth: false});

                            return throwError(err);
                        })
                    ) as Observable<HttpEvent<any>>;
                    // ).subscribe(d => console.log('IF RESPONSE'))
                }

                return throwError(error);
            })
        );
    }
}
