import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RemoveImgDialogComponent } from '../remove-img-dialog/remove-img-dialog.component';


@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  foods: any;
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialogComponent>) { }


  ngOnInit(): void {
  }

  openImgRemoveDialog() {
    this.dialog.open(RemoveImgDialogComponent);
    this.dialogRef.close(EditUserDialogComponent);
  }

  uploadImage() {
    const storage = getStorage();
    const storageRef = ref(storage, 'some-child');

    /* 'file' comes from the Blob or File API

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      
    });*/
  }


  closeDialog() {
    this.dialogRef.close();
  }


}
