import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';




@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.scss']
})
export class ThreadContainerComponent implements OnInit {

  collection: string = 'threads';

  id: string = '';
  constructor(private chatservices: ChatService) { }

  ngOnInit(): void {
    this.chatservices.name.subscribe(id => this.id = id);
  }
}

