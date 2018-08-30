import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BridgeRequest } from '../datatransferobjects/bridge-request';
import { BridgeResponse } from '../datatransferobjects/bridge.response';
import { EndpointResponse } from '../datatransferobjects/endpoint.response';
import { WsnotifierService } from './wsnotifier.service';
import { NotifierService } from './notifier.service';
import { Payload } from '../datatransferobjects/payload';
import { channel } from '../pages/login/dashboard/content/channel';
import { PlaybackResponse } from '../datatransferobjects/playback.response';

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

    this.getChannels().subscribe(data => {
      this.notifier.setNotifyChannels(data);
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


  originate(payload: Payload): Observable<any> {

    let p = new Payload();
    p.extension = "1002";
    p.callerId = "crm-0001";
    p.timeout = 120;
    p.app = "hello-world";
    p.endpoint = "SIP/astero";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:8080/ari-proxy/channels', p, httpOptions);
  }

  getChannels(): Observable<channel[]> {
    return this.http.
      get<channel[]>('http://localhost:8080/ari-proxy/channels')
  }

  answerChannel(channelId) : Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.
      post('http://localhost:8080/ari-proxy/channels/'+channelId+'/answer',httpOptions);
  }

  ringChannel(channelId) : Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.
      post('http://localhost:8080/ari-proxy/channels/'+channelId+'/ring',httpOptions);
  }

  playmediaInBridge(bridgeId : string) : Observable<PlaybackResponse>{
    return this.http.
    get<PlaybackResponse>('http://localhost:8080/ari-proxy/bridges/'+bridgeId+'/playmedia');
  }


}
