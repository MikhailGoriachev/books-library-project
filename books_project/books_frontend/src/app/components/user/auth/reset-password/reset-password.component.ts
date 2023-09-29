import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth/auth.service";
import { AuthApiService } from "../../../../services/api/auth/auth-api.service";
import { RegistrationDto } from "../../../../dto/auth/registration.dto";
import { AuthDto } from "../../../../dto/auth/auth.dto";
import { MatDialogRef } from "@angular/material/dialog";
import { lastValueFrom } from "rxjs";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    public error = '';
    public isComplete: boolean = false;

    public form = this._fb.group({
        email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255), Validators.email]],
    });

    public get isValid(): boolean {
        return this.form.valid;
    }


    constructor(
        private readonly _dialogRef: MatDialogRef<ResetPasswordComponent>,
        private readonly _fb: FormBuilder,
        private readonly _authService: AuthApiService
    ) {}

    async onSubmit(): Promise<void> {
        try {
            await lastValueFrom(this._authService.resetPassword(this.form.value.email));
            this.isComplete = true;
        } catch (error) {
            this.error = error.error.message;

            const message = error.error.message;
            switch (message) {
                case 'User is not found':
                    this.error = 'Аккаунта с такой почтой не существует';
                    break;
            }
        }
    }

}
