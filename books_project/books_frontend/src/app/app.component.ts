import { Component, OnInit } from '@angular/core';
import { AuthorsApiService } from "./services/api/authors-api/authors-api.service";
import { BooksApiService } from "./services/api/books-api/books-api.service";
import { lastValueFrom } from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'books_frontend';

    constructor(private readonly _authorsApiService: AuthorsApiService,
                private readonly _booksApiService: BooksApiService) {
    }

    ngOnInit(): void {
        console.log("ngOnInit()");

        lastValueFrom(this._authorsApiService.findAll())
            .then(res => console.log(res));

        lastValueFrom(this._booksApiService.findAll())
            .then(res => console.log(res));
    }
}
