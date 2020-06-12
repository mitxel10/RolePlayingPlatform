import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from "../services/authentication-service/authentication.service";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    public ngFireAuth: AngularFireAuth,
    private authService: AuthenticationService,
    public alertController: AlertController
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise((resolve, reject) => {
        this.ngFireAuth.auth.onAuthStateChanged((user: firebase.User) => {
          if (user) {
            if (!user.emailVerified) {
              this.presentAlert();
              this.router.navigate(['/login']);
            }

            console.log('User is logged in');
            // this.router.navigate(['/bagchain-tabs/tabs']);
            resolve(true);
          } else {
            console.log('User is not logged in');
            // await(loginUserGoogle())
            // .then() => 
            this.router.navigate(['/login']);
            resolve(false);
          }
        });
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Verifica email',
      message: 'Por favor, verifica el email que se acaba de enviar a tu correo',
      buttons: ['OK']
    });

    await alert.present();
  }
  
}
