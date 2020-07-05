import { Component, OnInit } from '@angular/core';
import { PNJ } from 'src/app/models/pnj';
import { Router, ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { Partida } from 'src/app/models/partida';
import { User } from 'src/app/login-register/shared/user';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-pnjs',
  templateUrl: './lista-pnjs.page.html',
  styleUrls: ['./lista-pnjs.page.scss'],
})
export class ListaPnjsPage implements OnInit {

  private idPartida: string;
  public personajesPNJ: PNJ[];

  public usuario: User;
  private partida: Partida;

  constructor(public router: Router, private route: ActivatedRoute, private partidasService: PartidasService,
    private personajesService: PersonajesService, private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.personajesPNJ = [];
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.partida = new Partida();
    this.partidasService.getDatosPartida(this.idPartida).subscribe(partidaBuscada =>{
      this.partida = partidaBuscada.data() as Partida;
    });
    this.getPNJPartida();
  }

  esDirector() {
    return this.partida.director == this.usuario.uid;
  }

  actualizarEstado(personaje: PNJ) {
    this.personajesService.actualizarEstadoPnj(personaje);

    if(personaje.estado) {
      this.sendCriatureMessage(personaje);
    }
  }

  sendCriatureMessage(personaje: PNJ) {
    let idForo = JSON.parse(localStorage.getItem('idForo'));

    if(idForo != null) {
      console.log("mandando mensaje");

      this.fireStore.collection("publicaciones").add({
        idForo: idForo,
        titulo: "Aparición de PNJ",
        texto: "Ha aparecido " + personaje.nombre,
        tipo: "message",
        sendDate: Date(),
        imagen: personaje.imagen
      })
      .then(function() {
        console.log("Publicación añadida correctamente!");
      })
      .catch(function(error) {
        console.error("Error añadiendo publicación: ", error);
      });
    }
  }

  async getPNJPartida() {
    await this.partidasService.getPNJPartida(this.idPartida).subscribe(pnjsPartida => {
      pnjsPartida.forEach(pnjPartida => {
        let idPersonaje = pnjPartida.id;
        let personaje = pnjPartida.data() as PNJ;
        personaje.id = idPersonaje;
        this.personajesPNJ.push(personaje);
      });
    });
  }

  irAniadirPNJ() {
    this.router.navigate(['tabsPartida/pnjs/aniadirPnj']);
  }

  verPnj(personaje: PNJ) {
    this.router.navigate(['tabsPartida/pnjs/' + personaje.id]);
  }
}
