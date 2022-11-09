import { Component, OnInit } from '@angular/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-adjust-status',
  templateUrl: './adjust-status.component.html',
  styleUrls: ['./adjust-status.component.scss']
})
export class AdjustStatusComponent implements OnInit {
  quickInput = [{

    "emoji": ":)",
    "status": "In einem Meeting",
    "time": "1 Stunde",
  },
  {

    "emoji": ":)",
    "status": "Unterwegs",
    "time": "30 Minuten",
  },
  {

    "emoji": ":)",
    "status": "Krank",
    "time": "Heute",
  },
  {

    "emoji": ":)",
    "status": "Im Urlaub",
    "time": "nicht löschen",
  },
  {

    "emoji": ":)",
    "status": "Home-Office",
    "time": "Heute",
  },];

  constructor() { }

  ngOnInit(): void {
  }

  //Emoji picker code
  public textArea: string = '';
  public isEmojiPickerVisible: boolean = false;
  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
  // Emoji picker code

  oneHourIntervall() {
    setTimeout((this.deleteStatus),3600000)
  }

  deleteStatus(){

  }
}

