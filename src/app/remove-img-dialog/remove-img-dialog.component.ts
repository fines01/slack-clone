import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { EditUserDialogComponent } from '../user-components/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-remove-img-dialog',
  templateUrl: './remove-img-dialog.component.html',
  styleUrls: ['./remove-img-dialog.component.scss']
})
export class RemoveImgDialogComponent implements OnInit {
  user!: User;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RemoveImgDialogComponent>) { }

  ngOnInit(): void {
  }
  openEditUser(){
    this.dialog.open(EditUserDialogComponent);
    this.dialogRef.close(RemoveImgDialogComponent);
  }
}
