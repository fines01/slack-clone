import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap, map, filter } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  chats$!: Observable<any>;
  answers$!: Observable<any>;
  id: any;
  thread: any

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private chatservices: ChatService, private fireService: FirestoreService) { }

  ngOnInit(): void {
    this.chatservices.name.subscribe(id => this.id = id);

    this.answers$ = this.fireService.getCollection('threads').pipe(
      map(chat => chat.filter((chat : any) => chat.chatId == this.id)),
    )

    this.chats$ = this.fireService.getDocByID(this.id, "chat");
  }

}


