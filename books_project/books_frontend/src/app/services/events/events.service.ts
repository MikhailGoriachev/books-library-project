import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { User } from "../../entities/User";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    constructor() {}

    changeBook: Subject<{ id: number }> = new Subject<{id: number}>();

    changeBookCollection: Subject<void> = new Subject<void>();

    changeBookRating: Subject<{ id: number }> = new Subject<{id: number}>();

    changeAuthor: Subject<{ id: number }> = new Subject<{id: number}>();

    changeAuthorCollection: Subject<void> = new Subject<void>();

    changeLogin: Subject<{ isAuth: boolean }> = new Subject<{isAuth: boolean}>();

    changeCart: Subject<void> = new Subject<void>();

    changeSales: Subject<void> = new Subject<void>();

    // changeUser: Subject<User> = new Subject<User>();
    changeCurrentUser: Subject<User> = new Subject<User>();

    changeUser: Subject<{id: number}> = new Subject<{id: number}>();

    changeUserCollection: Subject<void> = new Subject<void>();

    changeImage: Subject<void> = new Subject<void>();
}
