import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

export class CustomValidators {

constructor() {}

  static matchStrings(controlString: string, checkString: string): ValidatorFn {
      return (controls: AbstractControl) => {
        let control = controls.get(controlString);
        let checkControl = controls.get(checkString);

        if (checkControl?.errors && !checkControl.errors['matching']) return null;

        if (control?.value !== checkControl?.value) {
          controls.get(checkString)?.setErrors({ matching: true });
          return { matching: true };
        } else {
          controls.get(checkString)?.setErrors(null);
          return null;
        }
      };
    }

    // static validateEmail() {

    // }

}