import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { passwordConfirmValidator } from "../../../validators/passwordConfirmValidator";
import { UserPanelApiService } from "../../../services/api/panels/user-panel-api/user-panel-api.service";
import { UserPasswordEditDto } from "../../../dto/user-panel/user-password-edit.dto";
import { UserEditProfileDto } from "../../../dto/user-panel/user-edit-profile.dto";
import { lastValueFrom } from "rxjs";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public dataForm = this._fb.group({
        name: [this._dataManager.user.name, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
        email: [this._dataManager.user.email, [Validators.minLength(1), Validators.maxLength(255), Validators.email]],
        // password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    });

    public passwordForm = this._fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        newPasswordConfirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    }, {validators: passwordConfirmValidator('newPassword', 'newPasswordConfirm')});

    public get isChanges(): boolean {
        const {name, email} = this.dataForm.value;
        const user = this._dataManager.user;
        return !(name === user.name && email === user.email);
    }

    passwordEditResult: boolean | null = null;


    constructor(
        private readonly _fb: FormBuilder,
        private readonly _dataManager: DataManagerService,
        private readonly _userPanelApiService: UserPanelApiService
    ) {}


    ngOnInit() {
        // this.dataForm.controls.email.disable();
    }

    async dataFormSubmit() {
        const data = new UserEditProfileDto(this.dataForm.value.name);
        console.log(this.dataForm.value.name);
        await lastValueFrom(this._userPanelApiService.profileEdit(data));
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
