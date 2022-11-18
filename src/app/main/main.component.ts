import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  openThreadComponent: boolean = false;
  subscription!: Subscription;

  constructor(private dataservice: DataService) { }


  ngOnInit(): void {
    // console.log(this.openThreadComponent)
    this.subscription = this.dataservice.threadVisible.subscribe(t => {
      this.openThreadComponent = t;
      console.log(t)
    })

    // console.log('te', this.openThreadComponent)
  }

}

