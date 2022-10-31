import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channels-menu',
  templateUrl: './channels-menu.component.html',
  styleUrls: ['./channels-menu.component.scss']
})
export class ChannelsMenuComponent implements OnInit {
  toggleChannels = true;
  toggleDM = true;
  addChannels = false;
  addDM = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleChannelList() {
    if (this.toggleChannels) {
      this.toggleChannels = false;
    } else {
      this.toggleChannels = true;
    }
  }

  toggleDMList() {
    if (this.toggleDM) {
      this.toggleDM = false;
    } else {
      this.toggleDM = true;
    }
  }
}
