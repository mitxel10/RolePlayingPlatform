import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreguntasCaracteristicasService } from 'src/app/services/preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { FormGroup } from '@angular/forms';
import { Personaje } from 'src/app/models/personaje';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { DropdownQuestion } from 'src/app/models/question-dropdown';
import { EstadosPersonaje } from 'src/app/enums/EstadosPersonaje';
import { User } from 'src/app/login-register/shared/user';
import { CaracteristicaPersonaje } from 'src/app/models/caracteristicaPersonaje';
import { ToastController } from '@ionic/angular';
import { StatsQuestion } from 'src/app/models/question-stats';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.page.html',
  styleUrls: ['./personaje.page.scss'],
})
export class PersonajePage implements OnInit {

  private idPartida: string;
  private idPersonaje: string;
  public questions: PreguntaCaracteristica<any>[];
  public caracteristicasPersonaje: CaracteristicaPersonaje[];
  public datosBasicosForm: FormGroup;
  public personaje: Personaje;

  constructor(public router: Router, private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, private personajesService: PersonajesService, 
    private fireStore: AngularFirestore, private partidasService: PartidasService, public toastController: ToastController) { }

  ngOnInit() {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.obtenerIdPersonaje();
    this.questions = [];
  }
  
  obtenerIdPersonaje() {
    this.personajesService.buscarPersonaje(this.idPartida).subscribe(personajes => {
      if(!personajes.empty) {
        const personaje = personajes.docs[0];
        this.idPersonaje = personaje.id;

        this.dibujarFormulario();
      }
    });
  }

  dibujarFormulario() {
    this.questions = [];
    this.preguntasCaracteristicasService.getTodasCaracteristicasPersonajes(this.idPersonaje).subscribe((consultaCaracteristicasPersonaje) => {
      this.caracteristicasPersonaje = consultaCaracteristicasPersonaje.docs.map(doc => {
        return doc.data() as CaracteristicaPersonaje;
      });
      this.preguntasCaracteristicasService.getQuestionsList(this.idPartida).subscribe((resultadoConsulta) => {
        resultadoConsulta.forEach((preguntaCaracteristicaDoc) => {
          let preguntaCaracteristica = preguntaCaracteristicaDoc.data() as PreguntaCaracteristica<String>;
          let idPreguntaCaracteristica = preguntaCaracteristicaDoc.id;
          let caracteristicaPersonaje = this.caracteristicasPersonaje.find(x => x.idPregunta === idPreguntaCaracteristica);
          

          // this.preguntasCaracteristicasService.getCaracteristicasPersonajes(idPreguntaCaracteristica, this.idPersonaje).subscribe(caracteristasPersonajes => {
          //   if(!caracteristasPersonajes.empty) {
          //     let caracteristicaPersonajeData = caracteristasPersonajes.docs[0];
          //     let caracteristicaPersonaje = caracteristicaPersonajeData.data() as CaracteristicaPersonaje;
          if(caracteristicaPersonaje) {
              this.aniadirRespuestaCaracteristicaPersonaje(preguntaCaracteristica, idPreguntaCaracteristica, caracteristicaPersonaje);
          }
          //   }
          // });
        });
        this.questions.sort((a, b) => a.order - b.order);
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
        order: preguntaCaracteristica.order
      }));
    } else if(preguntaCaracteristica.controlType == "stats") {
      this.questions.push(new StatsQuestion({
        key: idPreguntaCaracteristica,
        label: preguntaCaracteristica.label,
        value: caracteristicaPersonaje.respuesta,
        required: preguntaCaracteristica.required,
        order: preguntaCaracteristica.order,
        stat: caracteristicaPersonaje.estadistica
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
        order: preguntaCaracteristica.order
      }));
    }
  }

  doSaveForm(formulario: FormGroup) {
    this.personajesService.buscarPersonaje(this.idPartida).subscribe(personajes => {
      if(!personajes.empty) {
        const personaje = personajes.docs[0];
        this.personaje = personaje.data() as Personaje;
        
        Object.keys(formulario.controls).forEach((idPreguntaCaracteristica, index) => {
          // Si se desea guardar el label en vez de idPregunta, cambiar arriba el key al añadir los questions
          this.actualizarCaracteristicaPersonaje(personaje, idPreguntaCaracteristica, index, formulario);
        });

        this.presentToast();
      }
    });    
  }

  private actualizarCaracteristicaPersonaje(personaje, idPreguntaCaracteristica: string, index: number, formulario: FormGroup) {
    if(!idPreguntaCaracteristica.endsWith("stat2")) {
      if(idPreguntaCaracteristica.endsWith("stat1")) {
        let keyStat = Object.keys(formulario.controls)[index+1];
        this.personajesService.actualizarCaracteristicasConStatPersonaje(personaje.id, idPreguntaCaracteristica, keyStat, formulario);
      } else {
        this.personajesService.actualizarCaracteristicasPersonaje(personaje.id, idPreguntaCaracteristica, formulario);
      }
    }

    // this.personajesService.actualizarCaracteristicasPersonaje(personaje.id, idPreguntaCaracteristica, formulario);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos del personaje modificados.',
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }
}
