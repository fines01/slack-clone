import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CustomValidators } from 'src/models/custom-validators.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup | any;
  errorMessage!: string | undefined;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required]),
        // TEST: including a regex validator, because the standard email validator is weak
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\\.[a-zA-Z]{1,}$")]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        // passwordConfirmation: new FormControl('', [Validators.required, CustomValidators.matchStrings('password', 'passwordConfirmation')]),
        passwordConfirmation: new FormControl('', [Validators.required, ]),
      },
      {
        validators: [CustomValidators.matchStrings('password', 'passwordConfirmation')]
      }
    );
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirmation() {
    return this.registerForm.get('passwordConfirmation');
  }

  onSubmit(formData: object) {
    // console.log(formData);

  }
  
  setUpExistingUserData(authUser: any) {
  }

  ngOnDestroy(): void {
    
  }

  emailSignUp() {
    // If anonyous user: generate credential and link account
  }

  handleError(error: any): string {
    console.log('%c'+ error.code + '\n' + error.message, 'color: yellow; background-color: black'); //
    if (error.code === 'auth/email-already-exists') return 'User with this email already exists';
    if (error.code === 'auth/invalid-email') return 'Please provide a valid Email Address';
    if (error.code === 'auth/invalid-password') return 'Password must have at least 6 characters';
    return 'Oops, something went wrong. Please try again later';
  }

  // call googleAuth Api from authService
  googleSignIn() {
  }

  // // put elsewhere (in utils? service? class?) --> in class as static method (because it seems consistent with how I use the 'Validators.function()' methods )
  // private  matchStrings(controlString: string, checkString: string): ValidatorFn {
  //     return (controls: AbstractControl) => {
  //       let control = controls.get(controlString);
  //       let checkControl = controls.get(checkString);

  //       if (checkControl?.errors && !checkControl.errors['matching']) return null;

  //       if (control?.value !== checkControl?.value) {
  //         controls.get(checkString)?.setErrors({ matching: true });
  //         return { matching: true };
  //       } else {
  //         controls.get(checkString)?.setErrors(null);
  //         return null;
  //       }
  //     };
  //   }
  

}
