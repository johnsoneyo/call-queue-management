import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  passwordCard : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showPasswordCard(){
    if(!this.passwordCard){
      this.passwordCard= true;
    }else {
      this.passwordCard = false;
    }
  }

}
