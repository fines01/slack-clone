import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';
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
export class ChatFieldComponent implements OnInit {
  chats$!: Observable<any[]>;
  openThreadComponent: boolean = false

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private chatservices: ChatService, private dataservice: DataService, private fireService: FirestoreService) { }

  ngOnInit(): void {
    this.chats$ = this.fireService.getCollection("chat", "chatDate")
      .pipe(
        tap(data => console.log(data))
      );
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


