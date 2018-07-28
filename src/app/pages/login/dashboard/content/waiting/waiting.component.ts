import { Component, OnInit } from '@angular/core';
import { WsnotifierService } from '../../../../../services/wsnotifier.service';
import { OnMessage } from '../onmessage';
import { WaitingDataSource } from '../waiting.datasource';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from '../../../../../services/notifier.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(private wsnotifier: WsnotifierService,
    private ariservice: AriproxyService,
    private notifier: NotifierService,
    private toast: ToastrService) {
    this.messages = [];
  }

  position = "right";

  messages: OnMessage[];
  displayedColumns: string[] = ['status', 'position', 'name', 'weight', 'symbol'];
  dataSource: WaitingDataSource;


  ngOnInit() {
    this.wsnotifier.subject.map(x => { return JSON.parse(x); }).subscribe(msg => {
      //check for new statis event
      if(msg.type != undefined)
       this.stasisEvent[msg.type](msg);
    });

    this.notifier.removeChannel.subscribe(id => {
      this.messages = this.messages.filter((e) => {
        return e.channel.id != id;
      });
      this.dataSource = new WaitingDataSource(this.messages);
      this.toast.info("channel " + id + " removed from waiting bridge", '');
      this.ariservice.getBridges('holding').subscribe(data => {
        this.notifier.notifyholdingBridgeCreation.next(data);
      });
    });
  } //


  stasisEvent = {
    StasisStart :  (message)=>  {  
      this.toast.success('call is been added to the waiting list', 'incoming call from johnson ');
      this.messages.push(message);
      this.dataSource = new WaitingDataSource(this.messages);
     },
    ChannelVarset: () => {},
    ApplicationReplaced : () => { console.log('application started'); },
    ChannelEnteredBridge : (message) => {      
      this.toast.success('', "channel "+message.channel.id+" has entered the "+message.bridge.bridge_type+" bridge ");
      this.notifier.setRemoveChannel(message.channel.id);
      this.notifier.setParticipantEnteredNotifier(message.channel);
      },
    ChannelLeftBridge : (message) => { 
      this.notifier.setNotifyParticpantsLeavingChannel(message.channel);
    } ,
    StasisEnd : () => { return} ,
    ChannelHangupRequest : () => { return} 

}







}

