import { Component, Input, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RemoveImgDialogComponent } from '../remove-img-dialog/remove-img-dialog.component';
import { Storage } from '@angular/fire/storage';
import { SelectControlValueAccessor } from '@angular/forms';



@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
 

  selectedFile = null;
  storage = getStorage();
  storageRef = ref(this.storage, '/user-images');

  foods: any;
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialogComponent>) { }

  ngOnInit(): void {
  }

  openImgRemoveDialog() {
    this.dialog.open(RemoveImgDialogComponent);
    this.dialogRef.close(EditUserDialogComponent);
  }

  fileSelected(file: any) {
    file = file.target.files[0];
    console.log(this.selectedFile);

    uploadBytes(this.storageRef, file).then((snapshot) => {
      console.log('Uploaded', file.name);
    });

  }




  closeDialog() {
    this.dialogRef.close();
  }


}
