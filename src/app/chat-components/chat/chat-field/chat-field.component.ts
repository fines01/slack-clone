import { Component, OnInit, Output } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogImgComponent } from '../dialog-img/dialog-img.component';

@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss'],
})
export class ChatFieldComponent implements OnInit {
  @Output() openThreadComponent: boolean = true;
  big: boolean = false;
  chats$!: Observable<any[]>;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }

  getCollection(chat: string, orderByDoc?: string) {
    let queryFn!: any;
    orderByDoc ? queryFn = (ref: any) => ref.orderBy(orderByDoc, 'asc') : queryFn = undefined;

    return this.firestore
      .collection(chat, queryFn)
      .valueChanges({ idField: 'id' }).pipe(tap()); //returns collection / Observable that can be subscribed inside the component
  }


  ngOnInit(): void {
    this.chats$ = this.getCollection("chat", "chatDate").pipe(
      tap());
  }

  openThread(id: any) {
    console.log('thread open from', id);
    //chat anhand der ID öffnen
    this.openThreadComponent = !this.openThreadComponent;
  }


  openDialog(chat: any) {
    console.log(chat)
    this.dialog.open(DialogImgComponent, {
      data: chat
    });
  }
}


