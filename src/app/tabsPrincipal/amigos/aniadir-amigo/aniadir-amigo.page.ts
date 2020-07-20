import { Component, OnInit } from '@angular/core';
import { AmigosService } from 'src/app/services/amigos-service/amigos.service';
import { User } from 'src/app/login-register/shared/user';
import { AlertController, ToastController } from '@ionic/angular';
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
    private authService: AuthenticationService,
    public toastController: ToastController
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
          text: 'Añadir',
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

  async info() {
    const toast = await this.toastController.create({
      header: 'Ayuda para adición de amigos',
      message: 'En esta pantalla se pueden añadir los los amigos que quieras añadir a tu lista, ' + 
      'para así despues jugar a partidas de rol con ellos.<br/>' + 
      'Para ello, primero se debe buscar el usuario, y después pulsar sobre aquel que se desea añadir y aceptar.',
      position: 'top',
      cssClass: 'toastAyuda',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            console.log('Ayuda aceptada');
          }
        }
      ]
    });
    toast.present();
  }
}
