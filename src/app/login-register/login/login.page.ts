import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication-service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
          this.router.navigate(['tabs/home']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }

  register() {
    this.router.navigate(['registration']);
  }
}
