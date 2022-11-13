import {Injectable, NgZone} from '@angular/core';
// import * as auth from 'firebase/auth'; // TODO only import what I need at the end
// import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence, setPersistence,  } from "firebase/auth"; //maybe
import { getAuth, EmailAuthProvider, linkWithCredential, updateProfile, updateEmail, deleteUser, EmailAuthCredential } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged, reauthenticateWithCredential, authState } from '@angular/fire/auth';

import { FirestoreService } from './firestore.service';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData!: any; // import user class or interface --> save auth user's data.
  authUser!: any;

  constructor(
    private fireService: FirestoreService,
    private router: Router,
    private ngZone: NgZone, //NgZone service: to remove outside scope warning

    private afAuth: AngularFireAuth,
    private ngAuth: Auth,
  ) {

      // onAuthStateChanged(getAuth(), (user) => {
      //   console.log(user); // if user: user is signed in // returns: UserImpl
      //   console.log(getAuth().currentUser); // check: same as above
      // })

      // TEST authState from angular/fire/auth
      // authState(this.ngAuth).subscribe((response) => {
      //   console.log('response ngAuth:', response); //same as above
      // });

      // //Test  Save user data in localstorage when logged in and setting up null when logged out
      this.afAuth.authState.subscribe((user) => {
        //console.log('response afAuth:', user); returns auth User with auth info (not our User object w all props in db)
        if (user) {
          this.userData = user;
          this.authUser = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user') !);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user') !);
          this.authUser = null;
        }
      });

  }

  /**
   * 
   * @param email 
   * @param password 
   * @returns {Promise}
   */
  logInUser(email: string, password: string) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  }

  registerNewUser(email: string, password: string, username: string) {
    return createUserWithEmailAndPassword(getAuth(), email, password);
  }

  //as
  /**
   * 
   */
  logInGuest() {
    return this.afAuth.signInAnonymously() // & pipe
      .then( (result)=> {
        // set up anonymous account
        this.saveUserData(result.user);
        this.router.navigate(['/']);
      })
      .catch ( (error)=> console.log('%c'+error, 'color: yellow; background-color: black'));
  }

  //as
  /**
   * 
   * @returns 
   */
  signOut() {
    let authUser = getAuth().currentUser;
    if (authUser?.isAnonymous) return this.deleteUser(authUser);
    else return this.afAuth.signOut()
      .then(() => localStorage.removeItem('user'))
      .finally( ()=> this.router.navigate(['login']));
  }

  /**
   * 
   * @param user 
   * @param username 
   */
  setUpAccount(user: any, username: string) {
    this.updateAuthUserName(user,username)
      .then( ()=>{
        this.saveUserData(user);
        this.sendVerificationMail();
      });
  }

  /**
   * In production: should check if a user is authenticated and has verified their email
   * For now only checks user status and lets user sign in without verifying their email, so we can work with fake test-emails.
   * @returns {boolean} - reurns true if user is authenticated (and @todo: has verified the email address)
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    // return ( (current user ) && (user.emailVerified === true) ) || (current user is anonymous) ? true : false;
    return (user !== null) || (getAuth().currentUser?.isAnonymous) ? true : false; // for now I won't check for verified emails
  }

  get currentAuthUser() {
    return getAuth().currentUser; // maybe better to get an observable, but maybe not always necessary
  }

  /**
   * 
   * @returns {Observable<firebase.User | null>} firbase auth User with auth information
   */
  getAuthState(){
    return this.afAuth.authState;
  }

  /**
  * Sends E-Mail verification 
  * @returns {Promise}
  */
  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((user: any) => {
        user.sendEmailVerification();
      })
     .catch( (error) => console.log('%c'+error, 'color: yellow; background-color: black'))
     .finally( ()=> {
      if (!getAuth().currentUser) this.router.navigate(['verify-email'])
    });
  }

  /**
   * Resets password
   * @param passwordResetEmail
   * @returns {Promise}
   */
  resetPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          console.log('Password reset email sent, please check your inbox.');
      })
        .catch((error) => console.log('%c'+error, 'color: yellow; background-color: black'));
  }

  /**
   * Registers a guest account as new email account, so that anonymous users can register without losing their data
   * @param email 
   * @param password 
   * @param username 
   */
  linkAnonymousAccount(email: string, password: string, username: string) {
    let credential = EmailAuthProvider.credential(email,password);
    let authUser = getAuth().currentUser;

    console.log(authUser);

    if (authUser) this.linkAccountWithCredential(authUser,credential,username);
  }

  /**
   * 
   * @param authUser - current authenticated user
   * @param credential - provided credentials from the user
   * @param username - link username in case guest user has set one
   */
  linkAccountWithCredential(authUser: any, credential: EmailAuthCredential, username?:string) {
    linkWithCredential(authUser, credential)
      .then( (usercred)=> {
        if (username) this.updateAuthUserName(usercred.user, username);
        console.log("Anonymous account upgrade", authUser, usercred.user);
      })
      .catch( (error) => console.log('%c'+error.message, 'color: yellow; background-color: black'))
      .finally( ()=> this.router.navigate(['dashboard']) );
  }

  updateAuthUserName(authUser: any, username?: string) { // todo remove photoURL? (i only store photo in users db)
    return updateProfile(authUser, {
      displayName: username ? username : authUser.displayName,
    })
  }

  updateAuthUserEmail( authUser: any, email: string) {
    return updateEmail(authUser, email)
      .then( ()=> this.sendVerificationMail());
  }

  /**
   *  Saves user data in the Firestore users collection when signing up
   * @returns {Promise}
  */
  saveUserData(user: any) {
    // create user object (json) --> TODO decide: User class
    let userData = new User(user).setUserData();
    return this.fireService.createOrUpdateDoc(userData, user.uid, 'users');
  }

  /**
   * Deletes user haha
   * @param authUser 
   * @returns {Promise}
   */
  deleteUser(authUser: any) {
    return this.fireService.deleteDoc(authUser.uid, 'users') // delete from users collection
      .then( () => {
        // delete user account from auth database
        //authUser.delete();
        deleteUser(authUser);
      })
      .catch( (err)=>console.log(err));
  }

  /**
   * Re-authenticates the current user before performing sensitive operations 
   * (like changing the password, changing the primary email address, deleting the account)
   * @param email 
   * @param password 
   * @returns {Promise} 
   */
  reAuthenticateUser(email: string, password: string) {
    let authUser = getAuth().currentUser;
    let credential = EmailAuthProvider.credential(email,password);
    //let OAuthCredential
    if(authUser) return reauthenticateWithCredential(authUser, credential);
    else return this.logInUser(email, password);
  }

}
