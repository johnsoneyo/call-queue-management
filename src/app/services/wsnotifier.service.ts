import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WsnotifierService {
  public subject = new Subject<any>();

  constructor() {}

  setMessage(message : any){
     this.subject.next(message);
  }

}
