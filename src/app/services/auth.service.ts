import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(credentials): Boolean {
    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }


}
