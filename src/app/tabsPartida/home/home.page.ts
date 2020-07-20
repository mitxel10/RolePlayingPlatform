import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { Partida } from 'src/app/models/partida';
import { Personaje } from 'src/app/models/personaje';
import { User } from 'src/app/login-register/shared/user';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { UsuariosService } from 'src/app/services/usuarios-service/usuarios.service';
import { isEmpty } from 'rxjs/operators';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private idPartida: string;
  public partida: Partida;
  public personajes: Personaje[];
  public usuariosPersonaje: User[];
  positionX: number;
  positionY: number;

  constructor(public router: Router, private route: ActivatedRoute, public toastController: ToastController,
    private partidasService: PartidasService, private authService: AuthenticationService, private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.partida = new Partida;
    this.personajes = [];
    this.usuariosPersonaje = [];
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.getDatosPartida();
    this.getPersonajesPartida();
  }

  getDatosPartida() {
    this.partidasService.getDatosPartida(this.idPartida).subscribe(partidaBuscada => {
      this.partida = partidaBuscada.data() as Partida;
    });
  }

  async getPersonajesPartida() {
    await this.partidasService.getPersonajesPartida(this.idPartida).subscribe(personajesPartida => {
      personajesPartida.forEach(personajePartida => {
        let idPersonaje = personajePartida.id;
        let personaje = personajePartida.data() as Personaje;
        this.personajes.push(personaje);
        this.aniadirUsuarioPersonaje(personaje.idUsuario);
      });
    });
  }

  async aniadirUsuarioPersonaje(idUsuario) {
    await this.usuariosService.getDatosUsuario(idUsuario).subscribe(usuarioBuscado => {
      this.usuariosPersonaje.push(usuarioBuscado.data() as User);
    });
  }

  getDatosUsuario(idUsuario) {
    let usuarios: User[];
    usuarios =  this.usuariosPersonaje.filter(usuario => {
      return usuario.uid === idUsuario
    });

    let nombreUsuario = "";

    if(usuarios.length > 0){
      nombreUsuario = usuarios[0].displayName;
    }

    return nombreUsuario;
  }

  getFirstTwoLettersPersonaje(personaje: Personaje) {
    return personaje.nombre.substring(0,2).toUpperCase();
  }

  getImagenMapa() {
    if(this.partida.imagenMapa) {
      return {'background-image': "url(" + this.partida.imagenMapa + ")"};
    }
  }

  dragEnded($event: CdkDragEnd, personaje: Personaje) {
    const { offsetLeft, offsetTop } = $event.source.element.nativeElement;
    const { x, y } = $event.distance;
    this.positionX = offsetLeft + x;
    this.positionY = offsetTop + y;
    // this.showPopup = true;
    console.log(this.positionX + ":" + this.positionY + " - " + personaje.nombre);
  }

  goToReglas() {
    this.router.navigate(['tabsPartida/home/reglas']);
  }

  async info() {
    const toast = await this.toastController.create({
      header: 'Ayuda para pantalla inicial de la partida',
      message: 'En esta pantalla se pueden visualizar los datos básicos de la partida, ' + 
      'para así tener una idea inicial de ella. Por un lado, se pueden ver el título y descripción<br/>' + 
      'Después en el tablero se puede visualizar el mapa de la partida, con la posición de los jugadores. Asimismo, se puede desplazar la ficha de cada uno.<br/>' + 
      'Finalmente, se pueden ver los personajes participantes de la partida, con nombre e imagen, y finalmente se puede pulsar sobre el botón para ver las reglas de la partida.',
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
