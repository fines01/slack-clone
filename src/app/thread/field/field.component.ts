import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap, map } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  chats$!: Observable<any[]>;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private chatservices: ChatService, private dataservice: DataService) { }

  ngOnInit(): void {
    this.chats$ = this.getCollection("chat", "chatDate").pipe(
      tap(data => console.log(data)))
      console.log(this.chats$.pipe(data => data))

  }

  getCollection(chat: string, orderByDoc?: string) {
    let queryFn!: any;
    orderByDoc ? queryFn = (ref: any) => ref.orderBy(orderByDoc, 'asc') : queryFn = undefined;

    return this.firestore
      .collection(chat, queryFn)
      .valueChanges({ idField: 'id' }).pipe(tap()); //returns collection / Observable that can be subscribed inside the component
  }


}
