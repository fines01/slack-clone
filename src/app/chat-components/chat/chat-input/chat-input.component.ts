import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {}
  newMessage: string = '';
  chat = new Chat();
  weight: boolean = false;
  italic: boolean = false;
  chatDate = new Date().toLocaleDateString('de-de');
  user: User = new User();

  ngOnInit(): void {}

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

  sendMessage() {
    this.addToModels();
    console.log('user firstname',this.user.firstName);
    console.log('user lastname',this.user.lastName);
    this.firestore
      .collection('chat')
      .add(this.chat.toJSON())
      .then((resul: any) => {
        console.log(resul);
        this.newMessage = '';
        this.weight = false;
        this.italic = false;
      });
  }

  addToModels() {
    this.chat.message = this.newMessage;
    this.chat.weight = this.weight;
    this.chat.italic = this.italic;
    this.chat.chatDate = new Date().getTime();
  }

  imageUpload() {
    console.log('test');
  }


  // getUser(){
  //   this.firestore
  //   .collection('users')
  //   .doc('Ck2zBp1TeuaNdEDGrCvDwqQxc732')
  //   .valueChanges()
  //   .subscribe((user:any) => {
  //     this.user = new User(user);
  //     console.log('user daten',this.user);
  //   } )
  // }

}
