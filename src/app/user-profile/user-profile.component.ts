import { Component, OnInit } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { AdjustStatusComponent } from '../adjust-status/adjust-status.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEditUser(){
   this.dialog.open(EditUserDialogComponent);
  }

  openAdjustStatus(){
    this.dialog.open(AdjustStatusComponent);
  }
}
