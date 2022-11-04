import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: string[] = [];
  constructor() { }


  add(message: string) {
    this.messages.push(message);
  }

}
