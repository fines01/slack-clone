import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup | any;
  emailSignInSubmitted = false;
  errorMessage!: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        //userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(formData: object) {
    if (this.loginForm.valid) this.emailSignIn();
  }

  checkInputsEmpty(){
    return !this.email.value || !this.password.value || this.email.value.length == 0 || this.password.value.length == 0;
  }

  // case guest sign-in: no error messages should be displayed
  checkPWRequired() {
    if (this.email.value && this.email.value.length > 0) return true;
    return false;
  }

  //call signIn Api from authService (Todo)
  emailSignIn() {
    this.emailSignInSubmitted = true;
    this.errorMessage = undefined;
  }

  // handle possible auth errors
  handleError(error: any): string{
    let  userDataErrorCodes :string[] = ['auth/user-not-found', 'auth/user-disabled','auth/invalid-email','auth/wrong-password'];
    console.log(error.code, '\n', error.message);
    for (let errCode of userDataErrorCodes) {
      if (error.code === errCode) {
        return 'Username or password is incorrect!'; // 'Wrong login credentials!'
      }
    }
    return 'Oops, something went wrong. Please try again later';
  }

  googleSignIn() {}

  //anonymous log in for guest users: call signIn Api from authService
  onGuestSignIn() {}


}
