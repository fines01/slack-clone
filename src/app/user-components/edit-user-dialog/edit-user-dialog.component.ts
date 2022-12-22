import { Component, Input, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RemoveImgDialogComponent } from '../../remove-img-dialog/remove-img-dialog.component';
import { Storage } from '@angular/fire/storage';
import { SelectControlValueAccessor } from '@angular/forms';
import { User } from 'src/models/user.class';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { concatMap } from 'rxjs';



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


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private authService: AuthService,
    private fireService: FirestoreService,
  ) { }


  // [Anfang] die Variablen für Firestore Storage definieren
  storage = getStorage(); // => Referenz für deinen Firestore Storage Bucket
  storageRef = ref(this.storage, '/user-images'); // => erstellt einen Ordner mit dem namen user-images in deinem Bucket
  spaceRef: any; // => muss bei ngOnInit definiert werden, sonst => this.user.uid = undefined
  // [Ende] Variablen für Firestore Storage

  ngOnInit(): void {
    this.spaceRef = ref(this.storageRef, this.user.uid); // => Zugriff zum Ordner /user-images + Name der Datei die Up/downloadet wird
  }

  openImgRemoveDialog() {
    this.dialog.open(RemoveImgDialogComponent);
    this.dialogRef.close(EditUserDialogComponent);
  }

  fileSelected(file: any) {
    console.log(file); // gibt Daten über das (change) event im html teil zurück
    file = file.target.files[0]; // => definiert den Namen der file-datei
  
    // Doku für Up und Download :https://firebase.google.com/docs/storage/web/create-reference
    uploadBytes(this.spaceRef, file).then((snapshot) => {
      console.log('Uploaded file name', file.name); // file Name
      console.log('spaceRef =', this.spaceRef); // führt zum Ordner /user-images im firestore-bucket
      console.log('snapshot =', snapshot); //snapshot eigentlich nicht relevant, zeigt Meta-daten an

      getDownloadURL(ref(this.spaceRef)) // Zugriff auf /user-images
        .then((url) => { // url wird über getDownloadURL definiert
          console.log('the image url =', url);
          this.user.photoURL = url;

          this.fireService.createOrUpdateDoc({ photoURL: url }, this.user.uid, 'users') // Speichert und aktualisiert änderung für Datenbank
            .then(() => {
              console.log(this.user.uid);
            }).catch((error) => { console.log(error) });

        })
        .catch((error) => {
          console.log('error bro')
        });
    });
  }
  saveEdit() {
    // Todo form validations: verify & sanitize inputs? & then:
    this.updateAuthDB();
  }

  updateAuthDB() {
    this.loading = true;
    //if displayName is changed:
    this.authService.updateAuthUserName(this.authUserData, this.user.displayName)
      .then(() => this.updateDatabase())
      .catch((error) => console.log('%c' + error, 'color: orange'))
      .finally(() => this.loading = false);
  }

  updateDatabase() {
    this.fireService.createOrUpdateDoc(this.getUpdateData(), this.authUserData.uid, 'users') // TODO: TEST - check function
      .then(() => console.log('%c' + 'SUCCESS - updated user: ', 'color: yellow; background-color: indigo', this.user))
      .catch((error) => console.log('%c' + error, 'color: orange'))
      .finally(() => {
        this.closeDialog();
      });
  }

  getUpdateData() {
    // TODO maybe check which properties are updated
    return this.user.setUserData()
  }

  closeDialog() {
    this.dialogRef.close();
  }



}
