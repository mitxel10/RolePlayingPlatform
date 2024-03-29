import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication-service/authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  signUp(username, email, password){
    this.authService.RegisterUser(email.value, password.value)      
    .then((res) => {
      this.authService.SendVerificationMail();
      this.router.navigate(['verify-email']);
      this.authService.SetUserData(res.user, username.value);
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
