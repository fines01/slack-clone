import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogImgComponent } from '../dialog-img/dialog-img.component';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss'],
})
export class ChatFieldComponent implements OnInit {
  big: boolean = false;
  chats$!: Observable<any[]>;
  openThreadComponent: boolean = false

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private chatservices: ChatService, private dataservice: DataService) { }

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

  openDialog(imgUrl: string) {
    this.dialog.open(DialogImgComponent, {
      data: imgUrl
    });
  }

  openThread(id: string) {
    // console.log('thread open from', id);
    this.openThreadComponent = !this.openThreadComponent;
    this.chatservices.threadId(id);
    this.dataservice.visibleThread(this.openThreadComponent);
  }

}


