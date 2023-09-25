import { Component, Inject, OnInit } from '@angular/core';
import { BooksApiService } from "../../../../services/api/crud/books-api/books-api.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../../../entities/Book";
import { EventsService } from "../../../../services/events/events.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BACKEND_API } from "../../../../infrastructure/constants";
import { UserEditProfileDto } from "../../../../dto/user-panel/user-edit-profile.dto";
import { last, lastValueFrom } from "rxjs";
import { AdminPanelApiService } from "../../../../services/api/panels/admin-panel-api/admin-panel-api.service";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { BookDto } from "../../../../dto/crud/book.dto";
import { BookCreateDto } from "../../../../dto/admin-panel/book/book-create.dto";
import { BookEditDto } from "../../../../dto/admin-panel/book/book-edit.dto";
import { AuthorsApiService } from "../../../../services/api/crud/authors-api/authors-api.service";
import { Author } from "../../../../entities/Author";
import { CategoriesApiService } from "../../../../services/api/crud/categories-api/categories-api.service";
import { Category } from "../../../../entities/Category";
import { BookFile } from "../../../../entities/BookFile";
import {
    FileExtensionsApiService
} from "../../../../services/api/crud/file-extensions-api/file-extensions-api.service";
import { FileExtension } from "../../../../entities/FileExtension";
import { BookFilesApiService } from "../../../../services/api/crud/book-files-api/books-files-api.service";

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
    book?: Book;

    authors?: Author[];

    categories?: Category[];

    imageUrl?: string = '';

    form = this._fb.group({
        id: [0],
        title: ['', [Validators.required, Validators.maxLength(250)]],
        description: ['', [Validators.required, Validators.maxLength(2000)]],
        image: ['', []],
        price: [0, [Validators.required, Validators.min(0)]],
        publicationYear: [0, [Validators.required, Validators.min(1300), Validators.max((new Date()).getFullYear())]],
        isbn: ['', [Validators.required, Validators.pattern(/^\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d{1,7}$/)]],
        authorsId: [[0], []],
        categoriesId: [[0], [Validators.required]],
        epub: ['', []],
        pdf: ['', []],
        fb2: ['', []],
    });

    get isEdit() {
        return !!this.data?.id;
    }

    get isChanges() {
        return this.form.dirty;
    }

    baseUrl = BACKEND_API;

    bookImageFile = null;
    epubFile = null;
    fb2File = null;
    pdfFile = null;

    fileExtensions?: FileExtension[];


    constructor(
        @Inject(MAT_DIALOG_DATA) private readonly data: { id: number | undefined },
        private readonly _booksApiService: BooksApiService,
        private readonly _fb: FormBuilder,
        private readonly _eventsService: EventsService,
        private readonly _adminPanelService: AdminPanelApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _authorsApiService: AuthorsApiService,
        private readonly _categoriesApiService: CategoriesApiService,
        private readonly _fileExtensionsApiService: FileExtensionsApiService,
        private readonly _bookFilesApiService: BookFilesApiService,
    ) {}


    ngOnInit() {
        if (this.isEdit)
            this._booksApiService
                .findOneByIdWithDeleted(this.data.id)
                .subscribe(b => {
                    this.book = b;
                    this.form.patchValue({
                        ...b,
                        authorsId: b.authors.map(a => a.id),
                        categoriesId: b.categories.map(c => c.id)
                    });
                    this.imageUrl = `${this.baseUrl}public/images/books/${this.book?.image}?v=${this._dataManagerService.imagesVersion}`;
                });
        else {
            this.book = new Book();
            this.book.image = 'default.jpg';
            this.form.patchValue({image: this.book.image, authorsId: [], categoriesId: []});
            this.imageUrl = `${this.baseUrl}public/images/books/${this.book?.image}?v=${this._dataManagerService.imagesVersion}`;
        }

        this._authorsApiService
            .findAll()
            .subscribe(a => this.authors = a);

        this._categoriesApiService
            .findAll()
            .subscribe(c => this.categories = c);

        this._fileExtensionsApiService
            .findAll()
            .subscribe(f => this.fileExtensions = f);
    }

    async formSubmit() {
        if (this.bookImageFile) {
            const formData = new FormData();
            formData.append('file', this.bookImageFile);
            formData.append('fileName', this.isEdit && this.book.image !== 'default.jpg' ? this.book.image : '');

            this.form.value.image = (await lastValueFrom(this._adminPanelService.uploadBookImageFile(formData))).fileName;

            if (this.isEdit)
                this._eventsService.changeImage.next();
        }

        const values = this.form.value;

        let data = new BookCreateDto(
            values.title,
            values.description,
            values.image,
            values.price,
            values.publicationYear,
            values.isbn,
            values.authorsId,
            values.categoriesId,
        );

        if (this.isEdit)
            data = Object.assign(new BookEditDto(), {...data, id: values.id});

        const result = await lastValueFrom(this.isEdit
            ? this._adminPanelService.editBook(data)
            : this._adminPanelService.createBook(data)
        );

        const files: BookFile[] = [];

        files.push(await this.uploadBook('epubFile'));
        files.push(await this.uploadBook('fb2File'));
        files.push(await this.uploadBook('pdfFile'));

        for (const file of files.filter(f => f)) {
            file.book = result;
            await lastValueFrom(this._bookFilesApiService.create(file));
        }

        if (this.isEdit)
            this._eventsService.changeBook.next({id: result.id});
        else
            this._eventsService.changeBookCollection.next();
    }

    async uploadBook(bookFormatName: 'epubFile' | 'fb2File' | 'pdfFile'): Promise<BookFile | null> {
        const value = this[bookFormatName];

        if (!value)
            return null;

        console.log(value);

        let bookFile: BookFile;

        const format = bookFormatName.slice(0, bookFormatName.indexOf('File'));

        if (this.isEdit) {
            bookFile = this.book?.bookFiles
                           .find(f => f.fileExtension.name.toLowerCase() === format);
        }

        let fileName = bookFile ? bookFile.path : '';

        const formData = new FormData();
        formData.append('file', value);
        formData.append('fileName', fileName);

        fileName = (await lastValueFrom(this._adminPanelService.uploadBookFile(formData))).fileName;
        const fileExtension = this.fileExtensions.find(f => f.name === format);

        if (!bookFile)
            return new BookFile(0, fileName, fileExtension);

        return null;
    }

    changeImage(event: any) {
        const file = event.target.files[0];

        if (file) {
            this.bookImageFile = file;

            const reader = new FileReader();

            reader.onload = () => {
                this.imageUrl = reader.result.toString();
            }

            reader.readAsDataURL(file);

            this.form.markAsDirty();
        }
    }

    changeBookFile(event: any, fileFormat: 'epubFile' | 'fb2File' | 'pdfFile') {
        const file = event.target.files[0];

        if (file) {
            this[fileFormat] = file;

            const reader = new FileReader();

            reader.readAsDataURL(file);

            this.form.markAsDirty();
        }
    }

    async deleteBookFile(bookFormatName: 'epub' | 'fb2' | 'pdf') {
        const control = this.form.controls[bookFormatName];

        if (control.value)
            control.reset();
        else {
            const bookFile = this.findBookFile(bookFormatName);

            if (bookFile) {
                await lastValueFrom(this._adminPanelService.deleteBookFile(bookFile.id));
                this.book.bookFiles = await lastValueFrom(this._bookFilesApiService.findAll({bookId: this.book.id}));
                this._eventsService.changeBook.next({id: this.book.id});
            }
        }
    }

    downloadBook(bookFormatName: 'epub' | 'fb2' | 'pdf') {
        if (this.isEdit) {
            const bookFile = this.findBookFile(bookFormatName);

            if (bookFile)
                this._dataManagerService.download(bookFile).then();
        }
    }

    findBookFile(bookFormatName: 'epub' | 'fb2' | 'pdf') {
        if (this.isEdit) {
            return this.book?.bookFiles
                       .find(f => f.fileExtension.name.toLowerCase() === bookFormatName);
        }

        return null;
    }

    async deleteBook() {
        if (this.isEdit) {
            await lastValueFrom(this._adminPanelService.deleteBook(this.book.id));
            this._eventsService.changeBookCollection.next();
            this._eventsService.changeBook.next({id: this.book.id});
        }
    }

    async restoreBook() {
        if (this.isEdit) {
            await lastValueFrom(this._adminPanelService.restoreBook(this.book.id));
            this._eventsService.changeBookCollection.next();
            this._eventsService.changeBook.next({id: this.book.id});
        }
    }
}
