import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { passwordConfirmValidator } from "../../../validators/passwordConfirmValidator";
import { UserPanelApiService } from "../../../services/api/panels/user-panel-api/user-panel-api.service";
import { UserPasswordEditDto } from "../../../dto/user-panel/user-password-edit.dto";
import { UserEditProfileDto } from "../../../dto/user-panel/user-edit-profile.dto";
import { lastValueFrom } from "rxjs";
import { BACKEND_API } from "../../../infrastructure/constants";
import { EventsService } from "../../../services/events/events.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public dataForm = this._fb.group({
        name: [
            this._dataManagerService.user.name,
            [Validators.required, Validators.minLength(1), Validators.maxLength(255)]
        ],
        email: [
            this._dataManagerService.user.email,
            [Validators.minLength(1), Validators.maxLength(255), Validators.email]
        ],
        image: [this._dataManagerService.user.image, [Validators.minLength(1), Validators.maxLength(255)]],
        // password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    });

    public passwordForm = this._fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        newPasswordConfirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    }, {validators: passwordConfirmValidator('newPassword', 'newPasswordConfirm')});

    public get isChanges(): boolean {
        return this.dataForm.dirty;
    }

    passwordEditResult: boolean | null = null;

    userImageFile = null;

    imageUrl?: string = '';

    baseUrl = BACKEND_API;

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _dataManagerService: DataManagerService,
        private readonly _userPanelApiService: UserPanelApiService,
        private readonly _eventsService: EventsService
    ) {}


    ngOnInit() {
        this.imageUrl = `${this.baseUrl}public/images/users/${this._dataManagerService.user.image}?v=${this._dataManagerService.imagesVersion}`;
    }

    async dataFormSubmit() {
        if (this.userImageFile) {
            const formData = new FormData();
            formData.append('file', this.userImageFile);
            formData.append(
                'fileName',
                this._dataManagerService.user.image !== 'default' ? this._dataManagerService.user.image : ''
            );

            this.dataForm.value.image = (await lastValueFrom(this._userPanelApiService.uploadBookImageFile(formData))).fileName;

            this._eventsService.changeImage.next();
        }

        const values = this.dataForm.value;
        console.dir(values)
        const data = new UserEditProfileDto(values.name, values.image);
        await lastValueFrom(this._userPanelApiService.profileEdit(data));
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

            this.dataForm.markAsDirty();
        }
    }

    async passwordFormSubmit() {
        const {password, newPassword, newPasswordConfirm} = this.passwordForm.value;
        if (newPassword === newPasswordConfirm) {
            const data = new UserPasswordEditDto(password, newPassword);
            this.passwordEditResult = (await lastValueFrom(this._userPanelApiService.passwordEdit(data))).result;

            if (this.passwordEditResult) {
                this.passwordForm.reset('', {});

                for (let controlsKey in this.passwordForm.controls) {
                    this.passwordForm.controls[controlsKey].markAsUntouched();
                    this.passwordForm.controls[controlsKey].markAsPristine();
                    this.passwordForm.controls[controlsKey].setErrors(null);
                }

                this.passwordForm.setErrors({});
            } else {
                this.passwordForm.setErrors({});
            }
        }
    }
}
