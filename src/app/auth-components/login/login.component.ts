import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName!: string; // Todo use reactive forms m
  userEmail!: string;
  userPassword!: string;
  emailSignInSubmitted = false;
  // errorMessage!: string | null;
  errorMessage!: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
  }

  checkInputsEmpty(){
    return !this.userEmail || !this.userPassword || this.userEmail.length == 0 || this.userPassword.length == 0;
  }

  checkPWRequired() {
    if (this.userEmail && this.userEmail.length > 0) return true;
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
  guestSignIn() {}


}
