import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    console.log(this.chat);
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
}
