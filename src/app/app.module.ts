import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/login/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {PhoneService} from './services/phone.service';
import {HttpClientModule} from '@angular/common/http';
import { WebsocketService } from './services/websocket.service';
import { ChannelsComponent } from './pages/login/dashboard/channels/channels.component';
import { BridgesComponent } from './pages/login/dashboard/bridges/bridges.component';
import { LoggingComponent } from './pages/login/dashboard/logging/logging.component';
import { HeaderComponent } from './pages/login/dashboard/header/header.component';
import { ContentComponent } from './pages/login/dashboard/content/content.component';
import { WsnotifierService } from './services/wsnotifier.service';




const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }]

@NgModule({
  declarations: [
    AppComponent,LoginComponent,DashboardComponent, ChannelsComponent, BridgesComponent, LoggingComponent, HeaderComponent, ContentComponent
  ],
  imports: [MatInputModule,MatButtonModule,HttpClientModule,MatMenuModule,MatListModule,MatDividerModule,MatTabsModule,MatSidenavModule,MatToolbarModule,MatIconModule,
    BrowserModule,BrowserAnimationsModule, MatCardModule,  RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [PhoneService,WebsocketService,WsnotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
