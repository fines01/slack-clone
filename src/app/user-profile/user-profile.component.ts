import { Component, OnInit } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { AdjustStatusComponent } from '../adjust-status/adjust-status.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  date = new Date();
  user: User = new User();
  activeColor ="grey";

  constructor(public dialog: MatDialog,private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
    this.activityStatus();

  }

  openEditUser(){
   this.dialog.open(EditUserDialogComponent);
  }

  openAdjustStatus(){
    this.dialog.open(AdjustStatusComponent);
  }

  getUser(){
    this.firestore
    .collection('users')
    .doc('Ck2zBp1TeuaNdEDGrCvDwqQxc732')
    .valueChanges()
    .subscribe((user:any) => {
      this.user = new User(user);
      console.log(this.user);
    } )
  }

  activityStatus(){
    if(this.user.isActive == true){
      console.log('user is active');
      this.activeColor = "green";
    }
  }


}
