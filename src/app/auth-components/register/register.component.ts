import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CustomValidators } from 'src/models/custom-validators.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup | any;
  errorMessage!: string | undefined;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
    private router: Router,
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

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
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
    console.log(this.email.value, this.userName.value);
    if (this.registerForm.valid) this.registerWithEmail();
  }
  
  registerWithEmail() {
    // If anonymous user: generate credential and link account
    let currentUser = this.authService.currentAuthUser;
    if (currentUser && currentUser.isAnonymous) {
      this.authService.linkAnonymousAccount(this.email.value, this.password.value, this.userName.value);
      this.setUpExistingUserData(currentUser);
      this.router.navigate(['/']);
    }
    else (this.authService.registerNewUser(this.email.value, this.password.value, this.userName.value))
      .then( (result) => {
        if (result) {
          this.authService.setUpAccount(result.user, this.userName.value);
          this.router.navigate(['/']);
        }
      })
      .catch( (err) => this.errorMessage = this.handleError(err));
  }

  handleError(error: any): string {
    console.log('%c'+ error.code + '\n' + error.message, 'color: yellow; background-color: black'); //
    if (error.code === 'auth/email-already-exists' || 'auth/email-already-in-use') return 'User with this email already exists';
    if (error.code === 'auth/invalid-email') return 'Please provide a valid Email Address';
    if (error.code === 'auth/invalid-password') return 'Password must have at least 6 characters';
    return 'Oops, something went wrong. Please try again later';
  }

  setUpExistingUserData(authUser: any) {
    this.userSubscription = this.fireService.getDocByID(authUser.uid, 'users')
      .subscribe( (userData: any)=>{
        if (userData)  {
          let user = userData;
          user.displayName = this.userName.value;
          user.email = this.email.value;
          // TODO add further userdata that might already exist on guest user account
          this.fireService.createOrUpdateDoc(user, authUser.uid, 'users');
          //this.authService.setUserData(user)
        }
      });
  }

  // Todo: create & call googleAuth api from authService
  googleSignIn() {}

}
