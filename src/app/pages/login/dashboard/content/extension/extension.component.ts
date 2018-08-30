import { Component, OnInit } from '@angular/core';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { EndpointResponse } from '../../../../../datatransferobjects/endpoint.response';
import { NotifierService } from '../../../../../services/notifier.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.css']
})
export class ExtensionComponent implements OnInit {

  public currentChannel : {};

  endpoints : EndpointResponse[];

  constructor(private service : NotifierService,private ariproxy : AriproxyService) { }
   ngOnInit() {
    this.service.notifyendpoints.subscribe(data => {
      this.endpoints  = data;
    });
  }

  dial(req : any){
    this.ariproxy.originate(req).subscribe(data=>{});
  }

}
