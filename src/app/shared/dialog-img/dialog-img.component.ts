import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-img',
  templateUrl: './dialog-img.component.html',
  styleUrls: ['./dialog-img.component.scss']
})
export class DialogImgComponent implements OnInit {

  aktivImgUrl: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.aktivImgUrl = this.data;
  }

}
