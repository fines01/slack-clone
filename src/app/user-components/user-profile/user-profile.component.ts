import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdjustStatusComponent } from '../../adjust-status/adjust-status.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { of, Subscription } from 'rxjs';
import { EditUserContactDialogComponent } from '../edit-user-contact-dialog/edit-user-contact-dialog.component';
import { UserInfo } from '@angular/fire/auth';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  date = new Date();
  user: User = new User();
  authUserData!: any; // user object from authentication database
  activeColor = "grey";
  activeStatus = "Abwesend";

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
    let editDialog = this.dialog.open(EditUserDialogComponent);
    editDialog.componentInstance.user = this.user;
    editDialog.componentInstance.authUserData = this.authUserData; // gebraucht wenn eigenschaften geändert werden die auch in Auth DB stehen (uid, email, pw, displayName!, aber nicht photoURL da wir das photo nur in unserer user collection speichern (kann in auth db anscheinend nicht mehr gelöscht werden))
  }

  openEditContactDetails() {
    let editDialog = this.dialog.open(EditUserContactDialogComponent);
    editDialog.componentInstance.user = this.user;
    editDialog.componentInstance.authUserdata = this.authUserData;
  }

  openAdjustStatus(){
    this.dialog.open(AdjustStatusComponent);
  }


  activityStatus(){
    if(this.user.isActive == true){
      console.log('user is active');
      this.activeColor = "green";
      this.activeStatus = "Aktiv";
      this.fireService.createOrUpdateDoc({ isActive : 'true' }, this.user.uid, 'users') // Speichert und aktualisiert änderung für Datenbank
      .then(() => {
        console.log(this.user.isActive);
      }).catch((error) => { console.log(error) });
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
        if (user) this.user = new User(user);
        if (user && this.authUserData.isAnonymous && user.displayName === '') {
          this.user.displayName = 'Guest';
        }
        //else if (!user) return;
        this.activityStatus();
      });
  }


}
