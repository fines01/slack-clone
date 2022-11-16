import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() openThreadComponent:boolean = false;
  constructor() { }

  ngOnInit(): void {
  // console.log(this.openThreadComponent)
  }

}

