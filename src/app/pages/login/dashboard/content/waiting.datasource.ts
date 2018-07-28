import { Observable } from "rxjs/Observable";
import { DataSource } from "@angular/cdk/collections";
import 'rxjs/add/observable/of';
import { OnMessage } from "./onmessage";


export class WaitingDataSource extends DataSource<any> {


    constructor(private msg: OnMessage[]) {
      super();
    }
  
    connect(): Observable<OnMessage[]> {
      return  Observable.of(this.msg);
    }
  
    disconnect() {}

}