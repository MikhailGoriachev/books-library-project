import { FormGroup } from "@angular/forms";

// export function passwordConfirmValidator(group: FormGroup) {
//     const newPassword = group.value['newPassword'];
//     const newPasswordConfirm = group.value['newPasswordConfirm'];
//
//     return newPassword === newPasswordConfirm ? null : {mismatch: true};
// }

export function passwordConfirmValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (
            matchingControl.errors &&
            !matchingControl.errors['confirmedValidator']
        ) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({confirmedValidator: true});
        } else {
            matchingControl.setErrors(null);
        }
    };
}
