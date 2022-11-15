import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.class';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
  constructor(private firestore: AngularFirestore, private authService: AuthService, private fireService: FirestoreService) {}
  newMessage: string = '';
  chat = new Chat();
  weight: boolean = false;
  italic: boolean = false;
  chatDate = new Date().toLocaleDateString('de-de');
  user: User = new User();
  authUserData!: any;

  userSubscription!: Subscription;
  authStateSubscription!: Subscription;

  ngOnInit(): void {
    this.subscribeAuthState();


  }

  editWeight() {
    if (this.weight == false) {
      this.weight = true;
    } else {
      this.weight = false;
    }
  }

  editItalic() {
    if (this.italic == false) {
      this.italic = true;
    } else {
      this.italic = false;
    }
  }


  //Emoji picker code
  public textArea: string = '';
  public isEmojiPickerVisible: boolean = false;
  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }


  sendMessage() {
    this.addToModels();
    this.firestore
      .collection('chat')
      .add(this.chat.toJSON())
      .then((resul: any) => {
        this.chat.firstName;
        this.chat.lastName,
        this.chat.displayName,
        this.chat.profilImg,
        this.newMessage = '';
        this.weight = false;
        this.italic = false;
      });
  }

  addToModels() {
    this.chat.firstName=this.user.firstName;
    this.chat.lastName=this.user.lastName;
    this.chat.displayName=this.user.displayName;
    this.chat.profilImg=this.user.photoURL;
    this.chat.message = this.newMessage;
    this.chat.weight = this.weight;
    this.chat.italic = this.italic;
    this.chat.chatDate = new Date().getTime();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }

  subscribeAuthState(){
    this.authStateSubscription = this.authService.getAuthState()
      .subscribe( (authUser) => {
        if (authUser) this.authUserData = authUser;
        if (this.authUserData) this.subscribeCurrentUser()
        else this.userSubscription.unsubscribe();
      });
  }

  subscribeCurrentUser(){
    this.userSubscription = this.fireService.getDocByID(this.authUserData.uid, 'users')
      .subscribe( (user:any)=>{
        this.user = new User(user);
        if (this.authUserData.isAnonymous && user.displayName == '') {
          this.user.displayName = 'Guest';
        }
      });
  }

  imageUpload() {
    console.log('imageUpload');
  }



}


