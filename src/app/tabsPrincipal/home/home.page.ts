import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/login-register/shared/user';
import { Partida } from 'src/app/models/partida';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { UsuariosService } from 'src/app/services/usuarios-service/usuarios.service';
import { Personaje } from 'src/app/models/personaje';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public usuario: User;
  public ultimaPartida: Partida;
  public personajeUltimaPartida: Personaje
  public esDirector: boolean;

  constructor(
    public authService: AuthenticationService,
    private partidasService: PartidasService,
    private usuariosService: UsuariosService,
    private personajesService: PersonajesService,
    public router: Router
  ) {
    this.personajeUltimaPartida = new Personaje;
    this.esDirector = false;
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    
    this.usuariosService.getDatosUsuario(this.usuario.uid).subscribe(usuarioBuscado => {
      this.usuario = usuarioBuscado.data() as User;
      this.obtenerDatosUltimaPartida(this.usuario.idUltimaPartida);
    });
    
  }

  obtenerDatosUltimaPartida(idUltimaPartida) {
    if(idUltimaPartida) {
      this.partidasService.getDatosPartida(idUltimaPartida).subscribe(partidaBuscada =>{
        this.ultimaPartida = partidaBuscada.data() as Partida;
        if(this.ultimaPartida) {
          if(this.ultimaPartida.director === this.usuario.uid) {
            this.esDirector = true;
          } else {
            this.personajesService.buscarPersonaje(idUltimaPartida).subscribe(datosPersonajes => {
              console.log(datosPersonajes);
              if(!datosPersonajes.empty) {
                const personaje = datosPersonajes.docs[0];
                console.log(datosPersonajes);
                this.personajeUltimaPartida = personaje.data() as Personaje;
              }
            });
          }
        }
      });
    }
  }

  jugarPartida() {
    localStorage.setItem('idPartida', JSON.stringify(this.usuario.idUltimaPartida));
    this.usuariosService.actualizarUltimaPartida(this.usuario.uid, this.usuario.idUltimaPartida);
    this.router.navigate(['tabsPartida/home']);
  }

}
