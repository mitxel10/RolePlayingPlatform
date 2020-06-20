import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { Partida } from 'src/app/models/partida';
import { Personaje } from 'src/app/models/personaje';
import { User } from 'src/app/login-register/shared/user';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

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

  constructor(public router: Router, private route: ActivatedRoute, 
    private partidasService: PartidasService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.partida = new Partida;
    this.personajes = [];
    this.idPartida = this.route.snapshot.paramMap.get('idPartida');
    this.getDatosPartida();
    this.getPersonajesPartida();
  }

  getDatosPartida() {
    this.partidasService.getDatosPartida(this.idPartida).subscribe(partidaBuscada => {
      this.partida = partidaBuscada.data() as Partida;
    });
  }

  getPersonajesPartida() {
    this.partidasService.getPersonajesPartida(this.idPartida).subscribe(personajesPartida => {
      personajesPartida.forEach(personajePartida => {
        let idPersonaje = personajePartida.id;
        let personaje = personajePartida.data() as Personaje;
        this.personajes.push(personaje);
        this.aniadirUsuarioPersonaje(personaje.idUsuario);
      });
      console.log(this.personajes);
    });
  }

  aniadirUsuarioPersonaje(idUsuario) {
    
  }
}
