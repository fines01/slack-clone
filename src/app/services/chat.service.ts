import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private nameSource = new BehaviorSubject<string>('');
  name = this.nameSource.asObservable()

  constructor() { }
  threadId(id: string) {
    this.nameSource.next(id);
  }

}
