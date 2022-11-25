import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { share } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.scss']
})
export class ThreadContainerComponent implements OnInit {

  collection: string = 'threads';

  id: string = '';
  constructor(private chatservices: ChatService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    console.log('Thread geladen')
    this.chatservices.name.subscribe(id => this.id = id);
    console.log('Thread', this.id)
  }
}

