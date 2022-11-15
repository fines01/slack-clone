import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.class';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { HttpClient } from '@angular/common/http';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
  constructor(private firestore: AngularFirestore, private authService: AuthService, private fireService: FirestoreService,private http: HttpClient, public storage: Storage) { }
  newMessage: string = '';
  chat = new Chat();
  weight: boolean = false;
  italic: boolean = false;
  chatDate = new Date().toLocaleDateString('de-de');
  user: User = new User();
  authUserData!: any;
  public file:any={};
  userSubscription!: Subscription;
  authStateSubscription!: Subscription;

  ngOnInit(): void {
    this.subscribeAuthState();
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
    this.addToModels();
    this.firestore
      .collection('chat')
      .add(this.chat.toJSON())
      .then((result: any) => {
        this.newMessage = '';
        this.urlImage='';
        this.weight = false;
        this.italic = false;
        this.progressInfo=0;
      });
  }

  addToModels() {
    this.chat.firstName = this.user.firstName;
    this.chat.lastName = this.user.lastName;
    this.chat.displayName = this.user.displayName;
    this.chat.profilImg = this.user.photoURL;
    this.chat.messageImg = this.urlImage;
    this.chat.message = this.newMessage;
    this.chat.weight = this.weight;
    this.chat.italic = this.italic;
    this.chat.chatDate = new Date().getTime();
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
progressInfo:number=0;
urlImage:string='';
chooseFile(event: any){
  this.file = event.target.files[0];
  this.addData();
}
 metadata:any = {
  contentType: 'image/jpeg'}

addData(){
const storageRef = ref(this.storage,this.file.name);
const uploadTask = uploadBytesResumable(storageRef, this.file,this.metadata );
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    this.progressInfo = progress
    console.log('Upload is ' + progress + '% done');
    console.log('hier name',this.file.name)
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
      console.log('File available at', downloadURL);
      this.urlImage=downloadURL;
    });
  }
);
}

}
