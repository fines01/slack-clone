import { Component, OnInit } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { AdjustStatusComponent } from '../adjust-status/adjust-status.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {}

  constructor(public dialog: MatDialog,private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUser();

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
    .doc('yliSy6DITTHuWjgw4aDE')
    .valueChanges()
    .subscribe((user:any) => {
      this.user = user;
      console.log(this.user);
    } )
  }
}
