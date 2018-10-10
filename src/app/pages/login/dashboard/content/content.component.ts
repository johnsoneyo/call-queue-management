import { Component, OnInit, Input } from '@angular/core';
import { WsnotifierService } from '../../../../services/wsnotifier.service';
import { OnMessage } from './onmessage';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SavebridgeComponent } from './savebridge/savebridge.component';
import { AriproxyService } from '../../../../services/ariproxy.service';
import { BridgeRequest } from '../../../../datatransferobjects/bridge-request';
import { ToastrService } from 'ngx-toastr';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  isAdmin: boolean = false;
 

  constructor(public dialog: MatDialog, private toast: ToastrService, private ws: WsnotifierService) { }

  ngOnInit() {
    this.ws.toastMsg.subscribe(data => {
      this.toast.error(data, 'Error occured', { titleClass: 'titleclass', messageClass: 'messageclass' });
    });
  }

  openSaveBridgeDialog(): void {
    let dialogRef = this.dialog.open(SavebridgeComponent, {
      height: '300px',
      width: '500px',
    });

    dialogRef.backdropClick().subscribe(_ => {
      // Close the dialog
      dialogRef.close();
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public treeData: any[] = [{
    name: "folder",
    isOpen: true,
    iconSelector: "computer",
    nameSelector: "warning",
    nodes: [{
      name: 'file'
    }]
  }, {
    name: 'another folder',
    nodes: [{
      name: 'another file'
    }]
  }];

  public treeConfig: any = {
    dataMap: {
      children: "nodes"
    }
  }






}
