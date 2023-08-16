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
    from,
    Observable, of,
    retry,
    Subject,
    switchMap,
    take,
    throwError
} from 'rxjs';
import { AuthService } from "../../services/auth/auth.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    private isRefreshingToken = false; // Флаг для отслеживания выполнения запроса на обновление токена
    private tokenRefreshSubject: Subject<any> = new Subject<any>();

    constructor(private readonly _authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const status = 401;

                console.log("INTERCEPTOR")

                if (error.status === status) {
                    // Проверяем, выполняется ли уже запрос на обновление токена
                    if (!this.isRefreshingToken) {
                        this.isRefreshingToken = true;

                        // Запрашиваем новый токен
                        this.tokenRefreshSubject.next(null);

                        return from(this._authService.getAccessToken()).pipe(
                            switchMap(() => {
                                this.isRefreshingToken = false;
                                this.tokenRefreshSubject.next(this._authService.accessToken);

                                // После получения нового токена, повторяем исходный запрос с обновленным токеном
                                const newRequest = request.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${this._authService.accessToken}`
                                    }
                                });

                                console.log("this.isRefreshingToken = true | switchMap")


                                return next.handle(newRequest);
                            }),
                            // catchError(err => {
                            //     this.isRefreshingToken = false;
                            //     this._authService.logout().then(); // Выход из системы в случае неудачи
                            //
                            //     return throwError(() => new Error(err.message));
                            // })
                        );
                    } else {

                        // Если запрос на обновление токена уже выполняется, подписываемся на получение нового токена
                        this.tokenRefreshSubject.pipe(
                            filter(token => token !== null),
                            take(1),
                            switchMap(() => {
                                // После получения нового токена, повторяем исходный запрос с обновленным токеном
                                const newRequest = request.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${this._authService.accessToken}`
                                    }
                                });

                                console.log("this.isRefreshingToken = false | switchMap")

                                return next.handle(newRequest);
                            }),
                            // catchError(err => {
                            //                             //     this._authService.logout().then(); // Выход из системы в случае неудачи
                            //                             //
                            //                             //     return throwError(() => new Error(err.message));
                            //                             // })
                        );
                    }
                }

                return throwError(error);
            })
        );
    }
}
