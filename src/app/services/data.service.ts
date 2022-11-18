import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private threadSource = new BehaviorSubject<boolean>(false);
  threadVisible = this.threadSource.asObservable()

  constructor() { }
  visibleThread(id: boolean) {
    this.threadSource.next(id);
  }

}
