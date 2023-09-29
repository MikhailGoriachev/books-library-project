import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../../../entities/User";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { UsersApiService } from "../../../../services/api/crud/users-api/users-api.service";
import { EventsService } from "../../../../services/events/events.service";
import { AdminPanelApiService } from "../../../../services/api/panels/admin-panel-api/admin-panel-api.service";
import { UserCreateDto } from "../../../../dto/admin-panel/user/user-create.dto";
import { UserEditDto } from "../../../../dto/admin-panel/user/user-edit.dto";
import { lastValueFrom } from "rxjs";
import { BACKEND_API } from "../../../../infrastructure/constants";
import { DataManagerService } from "../../../../services/data-manager/data-manager.service";
import { Book } from "../../../../entities/Book";
import { BookDetailsComponent } from "../../books/book-details/book-details.component";
import { Sale } from "../../../../entities/Sale";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    user?: User;

    form = this._fb.group({
        id: [0],
        name: ['', [Validators.maxLength(255)]],
        email: ['', [Validators.maxLength(255), Validators.email]],
        image: ['', [Validators.maxLength(255)]],
        isAdmin: [false, [Validators.required]],
    });

    get isEdit() {
        return !!this.data?.id;
    }

    get isChanges() {
        return this.form.dirty;
    }

    userImageFile = null;

    imageUrl?: string = '';

    baseUrl = BACKEND_API;

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }

    get totalCartPrice() {
        return this.cart?.reduce((prev, cur) => prev + cur.price, 0);
    }

    headersBook: string[] = ['image', 'title', 'price'];

    cart?: Book[];

    sales?: Sale[];

    constructor(
        @Inject(MAT_DIALOG_DATA) private readonly data: { id: number | undefined },
        private readonly _usersApiService: UsersApiService,
        private readonly _fb: FormBuilder,
        private readonly _eventsService: EventsService,
        private readonly _adminPanelService: AdminPanelApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _matDialog: MatDialog
    ) {}

    ngOnInit() {
        if (this.isEdit)
            this._usersApiService
                .findOneById(this.data.id)
                .subscribe(u => {
                    this.user = u;
                    this.form.patchValue({...u, isAdmin: !!u.isAdmin});
                    this.imageUrl = `${this.baseUrl}public/images/users/${this.user.image}?v=${this._dataManagerService.imagesVersion}`;

                    this._adminPanelService.getUserBooksFromCart(this.user.id)
                        .subscribe(c => this.cart = c);

                    this._adminPanelService.getUserSales(this.user.id)
                        .subscribe(s => this.sales = s);
                });
        else {
            this.user = new User();
            this.user.image = 'default';
            this.imageUrl = `${this.baseUrl}public/images/users/${this.user.image}?v=${this._dataManagerService.imagesVersion}`;
        }
    }

    async formSubmit() {
        if (this.userImageFile) {
            const formData = new FormData();
            formData.append('file', this.userImageFile);
            formData.append('fileName', this.isEdit && this.user.image !== 'default' ? this.user.image : '');

            this.form.value.image = (await lastValueFrom(this._adminPanelService.uploadUserImageFile(formData))).fileName;

            if (this.isEdit)
                this._eventsService.changeImage.next();
        }

        const values = this.form.value;

        let data = new UserCreateDto(
            values.name,
            values.email,
            values.image,
            values.isAdmin,
        );

        if (this.isEdit)
            data = Object.assign(new UserEditDto(), {...data, id: values.id});

        const result = await lastValueFrom(this.isEdit
            ? this._adminPanelService.editUser(data)
            : this._adminPanelService.createUser(data)
        );

        if (this.isEdit)
            this._eventsService.changeUser.next({id: this.user.id});
        else
            this._eventsService.changeUserCollection.next();
    }

    changeImage(event: any) {
        const file = event.target.files[0];

        if (file) {
            this.userImageFile = file;

            const reader = new FileReader();

            reader.onload = () => {
                this.imageUrl = reader.result.toString();
            }

            reader.readAsDataURL(file);

            this.form.markAsDirty();
        }
    }

    async blockUser() {
        if (this.isEdit) {
            await lastValueFrom(this._adminPanelService.blockUser(this.user.id));
            this._eventsService.changeUserCollection.next();
            this._eventsService.changeUser.next({id: this.user.id});
        }
    }

    async unblockUser() {
        if (this.isEdit) {
            await lastValueFrom(this._adminPanelService.unblockUser(this.user.id));
            this._eventsService.changeUserCollection.next();
            this._eventsService.changeUser.next({id: this.user.id});
        }
    }

    public async toBookDetails(id: number) {
        this._matDialog.open(BookDetailsComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '98%',
            width: '98%',
            panelClass: ['full-screen-modal', 'full-height-content'],
            data: {id, isAuthorDetails: true}
        });
    }

    public resetPasswordUser() {
        if (this.isEdit)
            this._adminPanelService.resetPasswordUser(this.user.id).subscribe();
    }
}
