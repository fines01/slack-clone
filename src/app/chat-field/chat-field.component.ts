import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';

@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss'],
})
export class ChatFieldComponent implements OnInit {
  chat = new Chat();

  constructor() {}

  ngOnInit(): void {}
}
