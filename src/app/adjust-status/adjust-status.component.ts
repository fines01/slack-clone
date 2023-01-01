import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../user-components/edit-user-dialog/edit-user-dialog.component';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';


interface theTime {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-adjust-status',
  templateUrl: './adjust-status.component.html',
  styleUrls: ['./adjust-status.component.scss']
})

export class AdjustStatusComponent implements OnInit {

  loading: boolean = false;
  user!: User;
  authUserdata!: any; // notw. wenn eigenschaften geändert werden die auch in Auth DB stehen (uid, email, pw, displayName)



  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private authService: AuthService,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {

  }
  noDeleteOnTime = 0;
  tenSeconds = 10000;
  oneMinute = 60000;
  halfHour = this.oneMinute * 30;
  oneHour = this.oneMinute * 60;
  oneDay = this.oneHour * 12;
  oneWeek = this.oneDay * 7;

  selectedTime: any;
  statusTimerActive = false;
  quick: any;
  interval: any;


  quickInput = [{

    "emoji": "📅",
    "status": "In einem Meeting",
    "time": "1 Stunde",
    "timeValue": this.oneHour,
  },
  {

    "emoji": "🚌",
    "status": "Unterwegs",
    "time": "30 Minuten",
    "timeValue": this.halfHour,
  },
  {

    "emoji": "🤒",
    "status": "Krank",
    "time": "Heute",
    "timeValue": this.oneDay,
  },
  {

    "emoji": "🌴",
    "status": "Im Urlaub",
    "time": "nicht löschen",
    "timeValue": this.noDeleteOnTime,
  },
  {

    "emoji": "🏠",
    "status": "Home-Office",
    "time": "10 Sekunden Test",
    "timeValue": this.tenSeconds,
  },];

  times: theTime[] = [
    { value: this.noDeleteOnTime, viewValue: 'nicht Löschen ' },
    { value: this.tenSeconds, viewValue: '10 Sekunden' },
    { value: this.oneMinute, viewValue: '1 Minute' },
    { value: this.halfHour, viewValue: '30 Minuten' },
    { value: this.oneHour, viewValue: 'eine Stunde' },
    { value: this.oneDay, viewValue: 'ein Tag' },
    { value: this.oneWeek, viewValue: 'eine Woche' },
  ];

  //Emoji picker code
  public newStatus: string = '';
  public isEmojiPickerVisible: boolean = false;
  public addEmoji(event: any) {
    this.newStatus = `${this.newStatus}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
  // Emoji picker code

  getValueOfQuickInput(index: any) {
    this.newStatus = this.quickInput[index].emoji + this.quickInput[index].status;
    this.selectedTime = this.quickInput[index].timeValue;
    console.log(this.selectedTime);

  }
  saveEdit() {
    // Todo form validations: verify & sanitize inputs? & then:
    this.user.status = this.newStatus;
    this.closeDialog();
    if (this.selectedTime != undefined && this.selectedTime > 0) {
      this.statusTimerActive = true;
      if (this.statusTimerActive = true) {
        this.setTimerForStatus();
      } else {
        this.deleteStatus();
      }
    } else {
      this.updateData();
    }

  }

  updateData() {
    this.getUpdateData();
    this.updateAuthDB();
    this.closeDialog();
  }

  updateAuthDB() {
    this.loading = true;
    //if Status is changed:
    this.authService.saveUserData(this.authUserdata)
      .then(() => this.updateDatabase())
      .catch((error) => console.log('%c' + error, 'color: orange'))
      .finally(() => this.loading = false);
  }

  updateDatabase() {
    this.fireService.createOrUpdateDoc(this.getUpdateData(), this.authUserdata.uid, 'users') // TODO: TEST - check function
      .then(() => console.log('%c' + 'SUCCESS - updated user: ', 'color: yellow; background-color: indigo', this.user))
      .catch((error) => console.log('%c' + error, 'color: orange'))
      .finally(() => {
        this.closeDialog();
      });
  }

  getUpdateData() {
    // TODO maybe check which properties are updated
    return this.user.setUserData();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  setTimerForStatus() {
    if (this.selectedTime > 0) {
      this.interval = setInterval(() => {
        if (this.selectedTime > 0) {
          this.selectedTime--;
          console.log(this.selectedTime);
          if(this.interval > this.selectedTime){
            clearInterval(this.interval);
          }
          this.setTimerForStatus();
        }
      }, 1000);
    } else {
      this.deleteStatus();
    }
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = 0;
      this.selectedTime = 0;
    }
  }

  deleteStatus() {
    this.stopInterval;
    this.statusTimerActive = false;
    this.user.status = '';
    this.getUpdateData();
    this.updateAuthDB();
    console.log(this.user.status);

  }
}

