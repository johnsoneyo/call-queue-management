import { Component, OnInit } from '@angular/core';
import { WaitingDataSource } from '../waiting.datasource';
import { channel } from '../channel';
import { OnMessage } from '../onmessage';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { NotifierService } from '../../../../../services/notifier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-waiting-agent',
  templateUrl: './waiting-agent.component.html',
  styleUrls: ['./waiting-agent.component.css']
})
export class WaitingAgentComponent implements OnInit {

  constructor(
    private ariservice: AriproxyService,
    private notifier: NotifierService,
    private toast: ToastrService) {
 
  }

  position = "right";

  channels : channel[];
  displayedColumns: string[] = ['status', 'position', 'name', 'weight','time', 'symbol'];
  dataSource: WaitingDataSource;
  greencicle : string = "assets/img/green.png";
  redcicle : string = "assets/img/red.png";

 
  
  ngOnInit() {
   let  state = { up : "Up",ring :"Ring" }

  

    this.notifier.notifyChannels.subscribe((chs : channel[])=> {
     this.channels=  chs.filter(ch =>  ch.state == state.ring || ch.state == state.up);
      this.dataSource = new WaitingDataSource(this.channels);
    });

    this.notifier.removeChannel.subscribe(id => {
      // this.channels = this.channels.filter((e) => {
      //   return e.id != id;
      // });
      // this.dataSource = new WaitingDataSource(this.channels);
      this.toast.info("channel " + id + " added to holding bridge", '');
      this.ariservice.getBridges('holding').subscribe(data => {
        this.notifier.notifyholdingBridgeCreation.next(data);
      });
    });
  } //


}
