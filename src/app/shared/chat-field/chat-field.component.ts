import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogImgComponent } from '../dialog-img/dialog-img.component';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss'],
})

export class ChatFieldComponent implements OnInit, OnDestroy {
  // chats$!: Observable<any[]>;
  openThreadComponent: boolean = false
  @Input() chats$!: Observable<any[]>;
  @Input() thread: boolean = false
  chat: any;
  test: any;


  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private chatservices: ChatService, private dataservice: DataService, private fireService: FirestoreService) { }

  ngOnInit(): void {




    //anzahl thread
    // doku: https://firebase.google.com/docs/firestore/query-data/queries?authuser=0&hl=de
    // firebase abfragen mit chatid

    this.test = this.chats$.pipe(
      tap(chats => {
        chats.forEach(chat => {
          console.log(chat)
          this.fireService.getDocsByValue("chatId", chat.id, "threads").pipe(
            tap(data => {
              console.log('test', data.length)
              return data.length
            })

          ).subscribe();
        })
      })
    ).subscribe();

    console.log(this.test)
  }

  ngOnDestroy(): void {
    this.test.unsubscribe();
  }




  openDialog(imgUrl: string) {
    this.dialog.open(DialogImgComponent, {
      data: imgUrl
    });
  }

  openThread(id: string) {
    this.openThreadComponent = !this.openThreadComponent;
    this.chatservices.threadId(id);
    this.dataservice.visibleThread(this.openThreadComponent);
  }

}


