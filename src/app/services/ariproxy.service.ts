import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BridgeRequest } from '../datatransferobjects/bridge-request';
import { BridgeResponse } from '../datatransferobjects/bridge.response';
import { EndpointResponse } from '../datatransferobjects/endpoint.response';
import { WsnotifierService } from './wsnotifier.service';
import { NotifierService } from './notifier.service';

@Injectable()
export class AriproxyService {

  saveBridge(bridge: BridgeRequest): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:8080/ari-proxy/bridges', bridge, options);
  }
  constructor(private http: HttpClient, private notifier: NotifierService) {
    this.getBridges('holding').subscribe(data => {
      this.notifier.setNotifyholdingOnBridgeCreation(data);
    });
    this.getBridges('mixing').subscribe(data => {
      this.notifier.setNotifymixingOnBridgeCreation(data);
    });
    this.getEndpoints().subscribe(data => {
      this.notifier.setNotifyExtension(data);
    });


  }


  getBridges(type: string): Observable<BridgeResponse[]> {
    let options = {
      params: {
        "type": type
      }
    };
    return this.http.
      get<BridgeResponse[]>('http://localhost:8080/ari-proxy/bridges', options);
  }

  getBridge(id: string): Observable<BridgeResponse> {
    return this.http.
      get<BridgeResponse>('http://localhost:8080/ari-proxy/bridges/' + id);
  }

  addChannelToBridge(channelId: string, bridgeId: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.
      post('http://localhost:8080/ari-proxy/bridges/' + bridgeId + '/' + channelId, options);
  }

  getEndpoints(): Observable<EndpointResponse[]> {
    return this.http.
      get<EndpointResponse[]>('http://localhost:8080/ari-proxy/endpoints')

  }


  removeChannelFromBridge(channelId: string, bridgeId: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.
      post('http://localhost:8080/ari-proxy/bridges/' + bridgeId + '/' + channelId, options);
  }


}
