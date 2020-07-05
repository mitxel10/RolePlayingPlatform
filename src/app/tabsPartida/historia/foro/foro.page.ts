import { Component, OnInit, ViewChild } from '@angular/core';
import { Foro } from 'src/app/models/foro';
import { IonContent, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/models/publicacion';
import { ActivatedRoute } from '@angular/router';
import { ForosService } from 'src/app/services/foros-service/foros.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, isEmpty } from 'rxjs/operators';
import { User } from 'src/app/login-register/shared/user';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { Partida } from 'src/app/models/partida';
import { DiceRoller } from 'rpg-dice-roller';
import { Personaje } from 'src/app/models/personaje';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {

  @ViewChild(IonContent, {static: false})
  content: IonContent;

  foro: Foro;
  data = { type:'', title:'', message:'', dice:'' };
  publicaciones$: Observable<Publicacion[]>;
  publicaciones: Publicacion[];
  roomkey:string;
  offStatus:boolean = false;
  private idForo: string;
  private idPartida: string;
  private partida: Partida;
  public usuario: User;
  public personaje: Personaje;

  constructor(private route: ActivatedRoute, private fireStore: AngularFirestore,
    private forosService: ForosService, private partidasService: PartidasService,
    private personajesService: PersonajesService, public toastController: ToastController) {
    this.data.type = 'message';
    this.data.message = '';
    this.data.title = '';
    this.data.dice = '';

    this.idForo = this.route.snapshot.paramMap.get('idForo');
    localStorage.setItem('idForo', JSON.stringify(this.idForo));
    this.publicaciones$ = this.fireStore.collection<Publicacion>('publicaciones', ref => ref.where('idForo', '==', this.idForo)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Publicacion;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.partida = new Partida();
    this.foro = new Foro();
    this.buscarDatosForo();
  }

  buscarDatosForo() {
    this.forosService.buscarForo(this.idForo).subscribe(foro => {
      this.foro = foro.data() as Foro;

      this.idPartida = this.foro.idPartida;
      this.buscarDatosPersonaje();

      this.partidasService.getDatosPartida(this.idPartida).subscribe(partidaBuscada =>{
        this.partida = partidaBuscada.data() as Partida;
      });

      this.publicaciones$.subscribe(data => {
        this.publicaciones = data as Publicacion[];
        this.publicaciones.sort((a, b) => new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime());
        setTimeout(() => {
          if(this.offStatus === false) {
            this.content.scrollToBottom(300);
          }
        }, 1000);
      });
    });
  }

  buscarDatosPersonaje() {
    this.personajesService.buscarPersonaje(this.idPartida).subscribe(datosPersonajes => {
      if(!datosPersonajes.empty) {
        const personaje = datosPersonajes.docs[0];
        this.personaje = personaje.data() as Personaje;
      }
    });
  }

  esDirector() {
    return this.partida.director == this.usuario.uid;
  }

  sendMessage() {
    this.fireStore.collection("publicaciones").add({
      idForo: this.idForo,
      titulo: this.data.title,
      texto: this.data.message,
      tipo: this.data.type,
      sendDate: Date()
    })
    .then(function() {
      console.log("Publicación añadida correctamente!");
    })
    .catch(function(error) {
      console.error("Error añadiendo publicación: ", error);
    });
    this.data.title = '';
    this.data.message = '';
  }

  lanzarDados() {
    const regExp = /^(?!\d+$)(([1-9]\d*)?[Dd]?[1-9]\d*( ?[+-] ?)?)+(?<![+-] ?)$/;
    if(regExp.test(this.data.dice)) {

      const roller = new DiceRoller();
      let roll = roller.roll(this.data.dice);
      let textoRoll = `${roll}`;

      let textoRollPartsArray = textoRoll.split(":");
      let configDadosLanzados = textoRollPartsArray[0];

      let resultadosLanzamientoDados = textoRollPartsArray[1].split("=");
      let resultadosDados = resultadosLanzamientoDados[0];
      let resultadosTotal = resultadosLanzamientoDados[1].trim();

      let titulo = "Lanzamiento de dados";
      let texto = this.personaje.idUsuario + " ha lanzado los dados (" + configDadosLanzados + ") y ha sacado el resultado " + resultadosTotal + resultadosDados;

      this.sendDiceMessage(titulo, texto);
    } else {
      this.presentToastWrongDiceConfig();
    }
  }

  async presentToastWrongDiceConfig() {
    const toast = await this.toastController.create({
      header: 'Configuración de dados incorrecta',
      message: 'La configuración de los dados debe seguir el siguiente patrón: el número de dados seguido del numero de caras del dado(ej: d6, d10, d20, d100). Si desea incluir más de un tipo de dado, añada el signo de suma (+) entre cada uno.',
      position: 'top',
      buttons: [
        {
          text: 'Aceptar',
          role: 'accept',
          handler: () => {
            console.log('Mensaje toast aceptado');
          }
        }
      ]
    });
    toast.present();
  }

  sendDiceMessage(titulo, texto) {
    this.fireStore.collection("publicaciones").add({
      idForo: this.idForo,
      titulo: titulo,
      texto: texto,
      tipo: "lanzamientoDados",
      sendDate: Date()
    })
    .then(function() {
      console.log("Publicación añadida correctamente!");
    })
    .catch(function(error) {
      console.error("Error añadiendo publicación: ", error);
    });
    this.data.dice = '';
  }
}
