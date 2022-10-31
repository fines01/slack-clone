import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
  constructor() {}
  newMessage: string = '';
  chat = new Chat();
  weight: boolean = false;
  italic: boolean = false;
  chatDate = new Date();

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
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.chat.message = this.newMessage;
    this.chat.weight = this.weight;
    this.chat.italic = this.italic;
    this.chat.chatDate = this.chatDate;
    console.log(this.chat);
    this.weight = false;
    this.italic = false;
    this.newMessage = '';
  }

  imageUpload() {
    console.log('test');
  }
}
