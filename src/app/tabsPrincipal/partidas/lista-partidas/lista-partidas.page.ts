import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Partida } from 'src/app/models/partida';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { Personaje } from 'src/app/models/personaje';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/login-register/shared/user';
import { filter } from 'rxjs/operators';
import { EstadosPartida } from 'src/app/enums/EstadosPartida';

@Component({
  selector: 'app-lista-partidas',
  templateUrl: './lista-partidas.page.html',
  styleUrls: ['./lista-partidas.page.scss'],
})
export class ListaPartidasPage implements OnInit {

  private partidasPersonajeUsuario: Personaje[];
  public partidasUsuario:  Partida[];
  private partidasPersonaje:  Partida[];
  private partidasDirector:  Partida[];

  public usuario: User;

  constructor(
    public router: Router,
    private partidasService: PartidasService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getPartidas();
    });
  }

  irAniadirPartida() {
    this.router.navigate(['tabs/partidas/aniadir']);
  }


  getPartidas() {
    this.partidasService.getPartidasPersonajeUsuario().subscribe((resultadoConsulta) => {
      this.partidasPersonajeUsuario = resultadoConsulta as Personaje[];
      this.obtenerPartidasPersonajeMaster(this.partidasPersonajeUsuario);
    });
  }

  obtenerPartidasPersonajeMaster(partidasPersonajeUsuario: Personaje[]) {
    let idsPartidasPersonaje = [];

    partidasPersonajeUsuario.forEach((partidaPersonaje: Personaje) => {
      idsPartidasPersonaje.push(partidaPersonaje.idPartida);
    });

    this.partidasService.getPartidasUsuarioEsDirector().subscribe(partidasDirector => {
      this.partidasDirector = [];
      partidasDirector.forEach(partidaDirector => {
        let partida = partidaDirector.data() as Partida;
        partida.id = partidaDirector.id;
        this.partidasDirector.push(partida);
      });

      if(idsPartidasPersonaje.length == 0) {
        this.partidasUsuario = this.partidasDirector;
      } else {
        this.partidasService.getPartidasUsuarioEsPersonaje(idsPartidasPersonaje).subscribe(partidasPersonaje => {
          this.partidasPersonaje = [];
          partidasPersonaje.forEach(partidaPersonaje => {
            let partida = partidaPersonaje.data() as Partida;
            partida.id = partidaPersonaje.id;
            this.partidasPersonaje.push(partida);
          });
          this.partidasUsuario = this.partidasDirector.concat(this.partidasPersonaje);
        });
      }
    });
  }

  esDirector(partida: Partida) {
    return partida.director == this.usuario.uid;
  }

  estaPartidaEnProceso(partida: Partida) {
    return partida.estado == EstadosPartida.EN_PROCESO;
  }
  irCrearPersonaje(partida: Partida) {
    this.router.navigate(['tabs/partidas/' + partida.id +  '/crear-personaje']);
  }

  irJugarPartida(partida: Partida) {
    this.router.navigate(['tabsPartida/home/' + partida.id]);
  }
}
