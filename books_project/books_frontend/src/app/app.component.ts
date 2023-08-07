import { Component, OnInit } from '@angular/core';
import { AuthorsApiService } from "./services/api/crud/authors-api/authors-api.service";
import { BooksApiService } from "./services/api/crud/books-api/books-api.service";
import { lastValueFrom } from "rxjs";
import { AuthService } from "./services/auth/auth.service";
import { AuthDto } from "./dto/auth/auth.dto";
import { LocalStorageService } from "./services/local-storage/local-storage.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'books_frontend';

    constructor(private readonly _authorsApiService: AuthorsApiService,
                private readonly _booksApiService: BooksApiService,
                private readonly _authService: AuthService,
                private readonly _localStorageService: LocalStorageService) {
    }

    async ngOnInit(): Promise<void> {
        // lastValueFrom(this._authorsApiService.findAll({booksId: [5, 1]}))
        //     .then(res => console.log(res));
        // //
        // lastValueFrom(this._booksApiService.findAll())
        //     .then(res => console.log(res));
        //
        // lastValueFrom(this._booksApiService.findAll({ authorsId: [9, 15] }))
        //     .then(res => console.log(res));

        // const result = this._authService.login(new AuthDto('mishagor228@gmail.com', '!bAJgvfZ2VYk8'));

        // console.log(result);
        //
        // let account = await this._authService.getProfile();
        //
        // console.log('Account:')
        // console.log(account);


        console.log('access_token: ' + this._localStorageService.accessToken);
        console.log('refresh_token: ' + this._localStorageService.refreshToken);

        // let account = await this._authService.getProfile();
        //
        // console.log('Account:')
        // console.log(account);

        // await this._authService.logout();
        // account = await this._authService.getProfile();
        //
        // console.log('Account after logout:')
        // console.log(account);
    }
}
