import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-edit-user-contact-dialog',
  templateUrl: './edit-user-contact-dialog.component.html',
  styleUrls: ['./edit-user-contact-dialog.component.scss']
})
export class EditUserContactDialogComponent implements OnInit {

  user!: User;
  authUserdata!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
