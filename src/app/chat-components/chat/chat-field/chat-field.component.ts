import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';

@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss'],
})
export class ChatFieldComponent implements OnInit {
  chats = new Chat();
  weight: boolean = false;
  italic: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log('field', this.chats);
  }

  openThread() {
    console.log('thread open');
  }
}
