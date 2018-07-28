import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { WsnotifierService } from '../../../../../services/wsnotifier.service';
import { MixingBridgeDatasource } from './mixing.bridge.datasource';
import { BridgeRequest } from '../../../../../datatransferobjects/bridge-request';
import { NotifierService } from '../../../../../services/notifier.service';
import { ITreeOptions, TreeModel, TREE_ACTIONS, TreeComponent } from 'angular-tree-component';
import { TreeNode } from 'angular-tree-component/dist/defs/api';

@Component({
  selector: 'app-mixing-bridge',
  templateUrl: './mixing-bridge.component.html',
  styleUrls: ['./mixing-bridge.component.css']
})
export class MixingBridgeComponent implements OnInit {

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  constructor(private ariProxy: AriproxyService, private toast: ToastrService,
    private wsnotifier: WsnotifierService, private notifier: NotifierService) { }

  ngOnInit() {

    this.notifier.notifymixingBridgeCreation.subscribe(data => {
      this.dataSource = new MixingBridgeDatasource(data);
    });

  }

  nodes = [
    { children: [] }];

  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          console.log($event);
          console.log($event);
        },
        drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }) => {
          if (from.data == undefined) {
            this.nodes[0]['children'].push(from);
          } else {
            this.nodes[0]['children'].push(from.data);
          }
          if ($event.target.dataset.bridgeid == undefined) {
            this.toast.error('', 'Channel not added, to add ,release above the image');
            return;
          }
          this.tree.treeModel.update();
          this.toast.success('', 'Channel Added Successfully');

        }
      }, allowDrag: (node) => {
        return true;
      }, allowDrop: (node) => {
        return true;

      }
    }
  };

  displayedColumns: string[] = ['id', 'name', 'participants'];
  dataSource: MixingBridgeDatasource;





  check($event) {
    console.log($event.target.dataset.bridgeid);
  }

}
