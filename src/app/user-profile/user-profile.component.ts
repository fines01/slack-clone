import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdjustStatusComponent } from '../adjust-status/adjust-status.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  date = new Date();
  user: User = new User();
  authUserData!: any;
  activeColor ="grey";

  userSubscription!: Subscription;
  authStateSubscription!: Subscription;

  constructor(public dialog: MatDialog,private firestore: AngularFirestore, private route: ActivatedRoute, 
    private authService: AuthService, private fireService: FirestoreService) { }

  ngOnInit(): void {
    this.subscribeAuthState();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }

  openEditUser(){
    this.dialog.open(EditUserDialogComponent);
  }

  openAdjustStatus(){
    this.dialog.open(AdjustStatusComponent);
  }

  // getUser(){
  //   this.firestore
  //   .collection('users')
  //   .doc('Ck2zBp1TeuaNdEDGrCvDwqQxc732')
  //   .valueChanges()
  //   .subscribe((user:any) => {
  //     this.user = new User(user);
  //     console.log(this.user);
  //   } )
  // }

  activityStatus(){
    if(this.user.isActive == true){
      console.log('user is active');
      this.activeColor = "green";
    }
  }

  subscribeAuthState(){
    this.authStateSubscription = this.authService.getAuthState()
      .subscribe( (authUser) => {
        if (authUser) this.authUserData = authUser;
        if (this.authUserData) this.subscribeCurrentUser()
        else this.userSubscription.unsubscribe();
      });
  }

  subscribeCurrentUser(){
    this.userSubscription = this.fireService.getDocByID(this.authUserData.uid, 'users')
      .subscribe( (user:any)=>{
        this.user = new User(user);
        console.log('current user: ', this.user);

        if (this.authUserData.isAnonymous && user.displayName == '') {
          this.user.displayName = 'Guest';
        }

        this.activityStatus();
      });
  }


}
