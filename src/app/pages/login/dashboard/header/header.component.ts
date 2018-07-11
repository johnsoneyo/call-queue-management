import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../../services/websocket.service';
import { WsnotifierService } from '../../../../services/wsnotifier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public connectionMsg:string;
  public connectionImg:string;

  constructor(private  ws: WsnotifierService) { }

  ngOnInit() {
         
     this.ws.subject.subscribe(data => {
        this.connectionImg = 'assets/img/green.png';
        this.connectionMsg = 'Online : 192.168.1.10';
        console.log(data);
     },(error) => {
        this.connectionImg = 'assets/img/red.png';
        this.connectionMsg = 'Offline';
     });
  }

}
