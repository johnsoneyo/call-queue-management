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


  endpoints : EndpointResponse[];

  constructor(private service : NotifierService) { }
   ngOnInit() {
    this.service.notifyendpoints.subscribe(data => {
      this.endpoints  = data;
    });
  }

}
