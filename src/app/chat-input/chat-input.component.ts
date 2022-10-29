import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
  constructor() {}
  newMessage: string = '';
  chat = new Chat();

  ngOnInit(): void {}

  sendMessage() {
    console.log(this.newMessage);
    this.newMessage = '';
  }
}
