import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chat.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';



@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss'],
})
export class ChatFieldComponent implements OnInit {
  chats$!: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {}

  getCollection(chat: string, orderByDoc?: string) {
    let queryFn!: any;
    orderByDoc ? queryFn = (ref: any) => ref.orderBy(orderByDoc, 'asc') : queryFn = undefined;

    return this.firestore
      .collection(chat, queryFn)
      .valueChanges({idField: 'id'}) //returns collection / Observable that can be subscribed inside the component
    }


  ngOnInit(): void {
    this.chats$ = this.getCollection("chat", "chatDate").pipe(
      tap(data => console.log(data))
    );
  }

  openThread() {
    console.log('thread open');
  }



//   getData() {
//     return this.firestore
//    .collection("chat")
//    .snapshotChanges();
//    console.log('chat angekommen')
//  }


}
