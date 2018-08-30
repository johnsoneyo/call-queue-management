import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    this.credentials = new FormGroup({
      username: new FormControl('johno@3#'),
      password: new FormControl('')
    });
  }

  ngOnInit() {
  }


  login(cred) {
    if (this.auth.login(cred.value)) {
      this.auth.isLoggedIn = true;
      if (this.auth.redirectUrl == undefined) {
        this.router.navigate(['/dashboard']);
        return;
      }
      this.router.navigate(['/dashboard']);

    }


  }

}
