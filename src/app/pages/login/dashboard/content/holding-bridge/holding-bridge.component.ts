import { Component, OnInit } from '@angular/core';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { BridgeRequest } from '../../../../../datatransferobjects/bridge-request';
import { HoldingBridgeDatasource } from './holding.bridge.datasource';
import { WsnotifierService } from '../../../../../services/wsnotifier.service';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from '../../../../../services/notifier.service';
import { ITreeOptions, TREE_ACTIONS, TreeModel } from 'angular-tree-component';
import { TreeNode } from 'angular-tree-component/dist/defs/api';

@Component({
  selector: 'app-holding-bridge',
  templateUrl: './holding-bridge.component.html',
  styleUrls: ['./holding-bridge.component.css']
})
export class HoldingBridgeComponent implements OnInit {

  position="right";

  nodes = [
    { children: [] }];

  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          console.log($event);
        },
      }, allowDrag: (node) => {
        return true;
      }, allowDrop: (node) => {
        return true;

      }
    }
  };

  constructor(private ariProxy: AriproxyService, private toast: ToastrService,
    private wsnotifier: WsnotifierService, private notifier: NotifierService) { }

  ngOnInit() {

    this.notifier.notifyholdingBridgeCreation.subscribe(data => {
      this.dataSource = new HoldingBridgeDatasource(data);
    });

    this.notifier.notifyBridgeOfParticipants.subscribe(data => {
      let channel = {
        id: data.id,
        name: data.name
      }
      this.nodes[0]['children'].push(channel);
    });

    this.notifier.notifyParticpantsLeavingChannel.subscribe(data => {
      let children = this.nodes[0]['children'].filter((e) => data.id != e.id);

      this.nodes = [
        { children: children }];

    });

  }


  displayedColumns: string[] = ['id', 'name', 'participants', 'actions'];
  dataSource: HoldingBridgeDatasource;

  onItemDrop(channelId, bridgeId) {
    this.ariProxy.
      addChannelToBridge(channelId, bridgeId)
      .subscribe(success => {

      }, error => {
        this.toast.
          error('channel could not be added to bridge at this time ');
      });

  }

}
