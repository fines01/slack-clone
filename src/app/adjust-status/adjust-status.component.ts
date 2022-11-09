import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adjust-status',
  templateUrl: './adjust-status.component.html',
  styleUrls: ['./adjust-status.component.scss']
})
export class AdjustStatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public textArea: string = '';
  public isEmojiPickerVisible: boolean = false;
  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
}

