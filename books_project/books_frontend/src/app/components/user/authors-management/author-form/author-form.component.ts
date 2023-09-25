import { Component, Inject, OnInit } from '@angular/core';
import { Author } from "../../../../entities/Author";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthorsApiService } from "../../../../services/api/crud/authors-api/authors-api.service";
import { FormBuilder, Validators } from "@angular/forms";
import { EventsService } from "../../../../services/events/events.service";
import { AdminPanelApiService } from "../../../../services/api/panels/admin-panel-api/admin-panel-api.service";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { BACKEND_API } from "../../../../infrastructure/constants";
import { lastValueFrom } from "rxjs";
import { AuthorCreateDto } from "../../../../dto/admin-panel/author/author-create.dto";
import { AuthorEditDto } from "../../../../dto/admin-panel/author/author-edit.dto";

@Component({
    selector: 'app-author-form',
    templateUrl: './author-form.component.html',
    styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {
    author?: Author;

    imageUrl?: string = '';

    form = this._fb.group({
        id: [0],
        name: ['', [Validators.required, Validators.maxLength(150)]],
        description: ['', [Validators.required, Validators.maxLength(2000)]],
        detailsLink: ['', [Validators.required, Validators.maxLength(512)]],
        image: ['', [Validators.required, Validators.maxLength(255)]],
    });

    get isEdit() {
        return !!this.data?.id;
    }

    get isChanges() {
        return this.form.dirty;
    }

    baseUrl = BACKEND_API;

    authorImageFile = null;


    constructor(
        @Inject(MAT_DIALOG_DATA) private readonly data: { id: number | undefined },
        private readonly _authorsApiService: AuthorsApiService,
        private readonly _fb: FormBuilder,
        private readonly _eventsService: EventsService,
        private readonly _adminPanelService: AdminPanelApiService,
        private readonly _dataManagerService: DataManagerService,
    ) {}


    ngOnInit() {
        if (this.isEdit)
            this._authorsApiService
                .findOneByIdWithDeleted(this.data.id)
                .subscribe(a => {
                    this.author = a;
                    this.form.patchValue({
                        ...a
                    });
                    this.imageUrl = `${this.baseUrl}public/images/authors/${this.author.image}?v=${this._dataManagerService.imagesVersion}`;
                });
        else {
            this.author = new Author();
            this.author.image = 'default.jpg';
            this.form.patchValue({image: this.author.image});
            this.imageUrl = `${this.baseUrl}public/images/authors/${this.author.image}?v=${this._dataManagerService.imagesVersion}`;
        }
    }

    async formSubmit() {
        if (this.authorImageFile) {
            const formData = new FormData();
            formData.append('file', this.authorImageFile);
            formData.append('fileName', this.isEdit && this.author.image !== 'default.jpg' ? this.author.image : '');

            this.form.value.image = (await lastValueFrom(this._adminPanelService.uploadAuthorImageFile(formData))).fileName;

            if (this.isEdit)
                this._eventsService.changeImage.next();
        }

        const values = this.form.value;

        let data = new AuthorCreateDto(
            values.name,
            values.description,
            values.detailsLink,
            values.image
        );

        if (this.isEdit)
            data = Object.assign(new AuthorEditDto(), {...data, id: values.id});

        const result = await lastValueFrom(this.isEdit
            ? this._adminPanelService.editAuthor(data)
            : this._adminPanelService.createAuthor(data)
        );

        if (this.isEdit)
            this._eventsService.changeAuthor.next({id: result.id})
        else
            this._eventsService.changeAuthorCollection.next();
    }

    changeImage(event: any) {
        const file = event.target.files[0];

        if (file) {
            this.authorImageFile = file;

            const reader = new FileReader();

            reader.onload = () => {
                this.imageUrl = reader.result.toString();
            }

            reader.readAsDataURL(file);

            this.form.markAsDirty();
        }
    }

     async deleteAuthor() {
        if (this.isEdit) {
            await lastValueFrom(this._adminPanelService.deleteAuthor(this.author.id));
            this._eventsService.changeAuthorCollection.next();
            this._eventsService.changeAuthor.next({id: this.author.id});
        }
    }

    async restoreAuthor() {
        if (this.isEdit) {
            await lastValueFrom(this._adminPanelService.restoreAuthor(this.author.id));
            this._eventsService.changeAuthorCollection.next();
            this._eventsService.changeAuthor.next({id: this.author.id});
        }
    }
}
