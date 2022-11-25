import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DialogImgComponent } from './dialog-img/dialog-img.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

chats$!: Observable<any[]>;
openThreadComponent: boolean = false
collection: string = 'chat';

constructor(public dialog: MatDialog, private chatservices: ChatService, private dataservice: DataService, private fireService: FirestoreService) { }

ngOnInit(): void {
  this.chats$ = this.fireService.getCollection("chat", "chatDate");
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

