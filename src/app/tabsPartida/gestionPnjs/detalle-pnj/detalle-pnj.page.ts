import { Component, OnInit } from '@angular/core';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { CaracteristicaPersonaje } from 'src/app/models/caracteristicaPersonaje';
import { FormGroup } from '@angular/forms';
import { Personaje } from 'src/app/models/personaje';
import { Router, ActivatedRoute } from '@angular/router';
import { PreguntasCaracteristicasService } from 'src/app/services/preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { ToastController } from '@ionic/angular';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { StatsQuestion } from 'src/app/models/question-stats';
import { DropdownQuestion } from 'src/app/models/question-dropdown';
import { Partida } from 'src/app/models/partida';
import { User } from 'src/app/login-register/shared/user';

@Component({
  selector: 'app-detalle-pnj',
  templateUrl: './detalle-pnj.page.html',
  styleUrls: ['./detalle-pnj.page.scss'],
})
export class DetallePnjPage implements OnInit {
  
  private idPartida: string;
  private idPersonaje: string;
  public questions: PreguntaCaracteristica<any>[];
  public caracteristicasPersonaje: CaracteristicaPersonaje[];
  public datosBasicosForm: FormGroup;
  public personaje: Personaje;

  public usuario: User;
  private partida: Partida;

  constructor(public router: Router, private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, private personajesService: PersonajesService, 
    private fireStore: AngularFirestore, private partidasService: PartidasService, public toastController: ToastController) { }

  ngOnInit() {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.idPersonaje = this.route.snapshot.paramMap.get('idPnj');
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.partida = new Partida();
    this.partidasService.getDatosPartida(this.idPartida).subscribe(partidaBuscada =>{
      this.partida = partidaBuscada.data() as Partida;
    });
    this.questions = [];
    this.dibujarFormulario();
  }

  esDirector() {
    return this.partida.director == this.usuario.uid;
  }

  dibujarFormulario() {
    this.questions = [];
    this.preguntasCaracteristicasService.getTodasCaracteristicasPersonajes(this.idPersonaje).subscribe((consultaCaracteristicasPersonaje) => {
      this.caracteristicasPersonaje = consultaCaracteristicasPersonaje.docs.map(doc => {
        return doc.data() as CaracteristicaPersonaje;
      });
      this.preguntasCaracteristicasService.getQuestionsList(this.idPartida, "PNJ").subscribe((resultadoConsulta) => {
        resultadoConsulta.forEach((preguntaCaracteristicaDoc) => {
          let preguntaCaracteristica = preguntaCaracteristicaDoc.data() as PreguntaCaracteristica<String>;
          let idPreguntaCaracteristica = preguntaCaracteristicaDoc.id;
          let caracteristicaPersonaje = this.caracteristicasPersonaje.find(x => x.idPregunta === idPreguntaCaracteristica);
          
          console.log(caracteristicaPersonaje);
          if(caracteristicaPersonaje) {
              this.aniadirRespuestaCaracteristicaPersonaje(preguntaCaracteristica, idPreguntaCaracteristica, caracteristicaPersonaje);
          }
        });
        this.questions.sort((a, b) => a.order - b.order);
        console.log(document.getElementById('saveFormButton') as HTMLInputElement);
      });
    });
  }

  aniadirRespuestaCaracteristicaPersonaje(preguntaCaracteristica: PreguntaCaracteristica<String>, idPreguntaCaracteristica: string, caracteristicaPersonaje: CaracteristicaPersonaje) {
    if (preguntaCaracteristica.controlType == "textbox") {
      this.questions.push(new TextboxQuestion({
        key: idPreguntaCaracteristica,
        label: preguntaCaracteristica.label,
        value: caracteristicaPersonaje.respuesta,
        required: preguntaCaracteristica.required,
        order: preguntaCaracteristica.order,
        disabled: !this.esDirector()
      }));
    } else if(preguntaCaracteristica.controlType == "stats") {
      this.questions.push(new StatsQuestion({
        key: idPreguntaCaracteristica,
        label: preguntaCaracteristica.label,
        value: caracteristicaPersonaje.respuesta,
        required: preguntaCaracteristica.required,
        order: preguntaCaracteristica.order,
        stat: caracteristicaPersonaje.estadistica,
        disabled: !this.esDirector()
      }));
    } else {
      let arrayOpciones = [];
      if (preguntaCaracteristica.options) {
        for (let option of preguntaCaracteristica.options) {
          arrayOpciones.push({ key: option.key, value: '' });
        }
      }
      this.questions.push(new DropdownQuestion({
        key: idPreguntaCaracteristica,
        label: preguntaCaracteristica.label,
        value: caracteristicaPersonaje.respuesta,
        options: arrayOpciones,
        required: true,
        order: preguntaCaracteristica.order,
        disabled: !this.esDirector()
      }));
    }
  }

  doSaveForm(formulario: FormGroup) {
    if(this.esDirector()) {
      Object.keys(formulario.controls).forEach((idPreguntaCaracteristica, index) => {
        // Si se desea guardar el label en vez de idPregunta, cambiar arriba el key al añadir los questions
        this.actualizarCaracteristicaPersonaje(this.idPersonaje, idPreguntaCaracteristica, index, formulario);
      });
  
      this.presentToast();   
    }
  }

  private actualizarCaracteristicaPersonaje(idPersonaje, idPreguntaCaracteristica: string, index: number, formulario: FormGroup) {
    if(!idPreguntaCaracteristica.endsWith("stat2")) {
      if(idPreguntaCaracteristica.endsWith("stat1")) {
        let keyStat = Object.keys(formulario.controls)[index+1];
        this.personajesService.actualizarCaracteristicasConStatPersonaje(idPersonaje, idPreguntaCaracteristica, keyStat, formulario);
      } else {
        this.personajesService.actualizarCaracteristicasPersonaje(idPersonaje, idPreguntaCaracteristica, formulario);
      }
    }

    // this.personajesService.actualizarCaracteristicasPersonaje(personaje.id, idPreguntaCaracteristica, formulario);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos del PNJ modificados.',
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }
}
