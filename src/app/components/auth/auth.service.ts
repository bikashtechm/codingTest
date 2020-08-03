import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string = "";
  isLoggedIn: boolean = false;
  currentUserDetails: any;
  constructor(private router: Router) {
    this.message = "";
  }

  login(objUserDetail: any) {
    if (objUserDetail.Id == 0) {
      localStorage.removeItem("userDetails");
      this.isLoggedIn = false;
      this.message = "Please enter valid username and password";
    } else {
      this.message = "";
      this.isLoggedIn = true;
      localStorage.setItem("userDetails", JSON.stringify(objUserDetail));
      this.currentUserDetails = objUserDetail;
      this.router.navigate(['/dashboard/default']);
    }
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
  getMessage() {
    return this.message;
  }


}
