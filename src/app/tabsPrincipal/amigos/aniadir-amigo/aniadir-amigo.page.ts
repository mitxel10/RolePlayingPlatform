import { Component, OnInit } from '@angular/core';
import { AmigosService } from 'src/app/services/amigos-service/amigos.service';
import { User } from 'src/app/login-register/shared/user';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-aniadir-amigo',
  templateUrl: './aniadir-amigo.page.html',
  styleUrls: ['./aniadir-amigo.page.scss'],
})
export class AniadirAmigoPage implements OnInit {

  term = '';
  public usersData: User[];
  
  constructor(
    private amigosService: AmigosService,
    private alertCtrl: AlertController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    this.amigosService.getUserList().subscribe((resultadoConsulta) => {
      this.usersData = [];
      resultadoConsulta.forEach((datosUsuario: User) => {
        if(datosUsuario.uid != this.authService.currentUserId) {
          this.usersData.push(datosUsuario as User);
        }
      });
    });
  }

  public async presentConfirm(uidAmigo: string, nombreAmigo: string) {
    let alert = await this.alertCtrl.create({
      header: nombreAmigo,
      message: 'Quieres añadirle como amigo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Amigo no añadido');
          }
        },
        {
          text: 'Añádir',
          handler: () => {
            console.log('Amigo añadido');
            const idUsuario = this.authService.currentUserId;
            this.amigosService.aniadirAmigo(idUsuario, uidAmigo);
          }
        }
      ]
    });
    alert.present();
  }
}
