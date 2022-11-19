import { Component, Input, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RemoveImgDialogComponent } from '../remove-img-dialog/remove-img-dialog.component';
import { Storage } from '@angular/fire/storage';
import { SelectControlValueAccessor } from '@angular/forms';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';



@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})

/**
 * updates the following user properties: 
 * displayName, name, title, namePronounciation, timeZone in Firestore users collection,
 * displayName in Auth DB
 * profile picture 
 */
export class EditUserDialogComponent implements OnInit {


  user!: User;
  authUserData!: any; // notw. wenn eigenschaften geändert werden die auch in Auth DB stehen (uid, email, pw, displayName)

  loading: boolean = false;

  selectedFile = null;
  storage = getStorage();
  storageRef = ref(this.storage, '/user-images');

  foods: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private authService: AuthService,
    private fireService: FirestoreService,
    ) { }

  ngOnInit(): void {
    console.log(this.user);
    console.log('is guest-user:', this.authUserData.isAnonymous)
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

  saveEdit() {
    // Todo form validations: verify & sanitize inputs? & then:
    this.updateAuthDB();
  }

  updateAuthDB(){
    this.loading = true;
    //if displayName is changed:
    this.authService.updateAuthUserName(this.authUserData, this.user.displayName)
      .then( ()=> this.updateDatabase() )
      .catch( (error) => console.log('%c'+error,'color: orange'))
      .finally(()=> this.loading = false);
  }

  updateDatabase(){
    this.fireService.createOrUpdateDoc(this.getUpdateData(), this.authUserData.uid, 'users') // TODO: TEST - check function
      .then (()=> console.log('%c'+'SUCCESS - updated user: ','color: yellow; background-color: indigo', this.user))
      .catch((error) => console.log('%c'+error,'color: orange'))
      .finally( ()=> {
        this.closeDialog();
      });
  }

  getUpdateData(){
    // TODO maybe check which properties are updated
    return this.user.setUserData()
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
