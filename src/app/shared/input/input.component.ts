import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { Subscription, tap } from 'rxjs';
import { User } from 'src/models/user.class';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(private authService: AuthService, private fireService: FirestoreService, public storage: Storage) { }

  @Input() collection: string = "";
  @Input() id: string = "";

  newMessage: string = '';
  chat = new Chat();
  weight: boolean = false;
  italic: boolean = false;
  chatDate = new Date().toLocaleDateString('de-de');
  user: User = new User();
  authUserData!: any;
  public file: any = {};
  userSubscription!: Subscription;
  authStateSubscription!: Subscription;

  ngOnInit(): void {
    // this.authService.getAuthState().pipe(
    //   tap(data => console.log(data?.displayName))
    // ).subscribe()
    this.subscribeAuthState();
    console.log(this.collection)
    console.log(this.id)
  }

  editWeight() {
    this.weight = !this.weight
  }

  editItalic() {
    this.italic = !this.italic
  }

  //Emoji picker code
  public isEmojiPickerVisible: boolean = false;
  public addEmoji(event: any) {
    this.newMessage = `${this.newMessage}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  sendMessage() {
    const chatData = {
      fullName: this.user.fullName,
      displayName: this.user.displayName,
      profilImg: this.user.photoURL,
      messageImg: this.urlImage,
      message: this.newMessage,
      weight: this.weight,
      italic: this.italic,
      chatDate: new Date().getTime(),
      chatId: this.id
    }

    this.fireService.addDoc(chatData, this.collection).then(() => {
      this.newMessage = '';
      this.urlImage = '';
      this.weight = false;
      this.italic = false;
      this.progressInfo = 0;
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }

  subscribeAuthState() {
    this.authStateSubscription = this.authService.getAuthState()
      .subscribe((authUser) => {
        if (authUser) this.authUserData = authUser;
        if (this.authUserData) this.subscribeCurrentUser()
        else this.userSubscription.unsubscribe();
      });
  }

  subscribeCurrentUser() {
    this.userSubscription = this.fireService.getDocByID(this.authUserData.uid, 'users')
      .subscribe((user: any) => {
        this.user = new User(user);
        if (this.authUserData.isAnonymous && user.displayName == '') {
          this.user.displayName = 'Guest';
        }
      });
  }


  //Upload Image mit Firebase Storage
  progressInfo: number = 0;
  urlImage: string = '';
  chooseFile(event: any) {
    console.log(event.target)
    this.file = event.target.files[0];
    this.addData();
  }
  metadata: any = {
    contentType: 'image/jpeg'
  }

  addData() {
    const storageRef = ref(this.storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file, this.metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.progressInfo = progress
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.urlImage = downloadURL;
        });
      }
    );
  }

}
