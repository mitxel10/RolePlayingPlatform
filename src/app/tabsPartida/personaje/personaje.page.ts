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
  public datosBasicosForm: FormGroup;
  public personaje: Personaje;

  constructor(public router: Router, private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, private personajesService: PersonajesService, 
    private fireStore: AngularFirestore, private partidasService: PartidasService, public toastController: ToastController) { }

  ngOnInit() {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.obtenerIdPersonaje();
    this.dibujarFormulario();
  }
  
  obtenerIdPersonaje() {
    this.personajesService.buscarPersonaje(this.idPartida).subscribe(personajes => {
      if(!personajes.empty) {
        const personaje = personajes.docs[0];
        this.idPersonaje = personaje.id;
      }
    });
  }

  dibujarFormulario() {
    this.questions = [];
    this.preguntasCaracteristicasService.getQuestionsList(this.idPartida).subscribe((resultadoConsulta) => {
      resultadoConsulta.forEach((preguntaCaracteristicaDoc) => {
        let preguntaCaracteristica = preguntaCaracteristicaDoc.data() as PreguntaCaracteristica<String>;
        let idPreguntaCaracteristica = preguntaCaracteristicaDoc.id;
        
        this.preguntasCaracteristicasService.getCaracteristicasPersonajes(idPreguntaCaracteristica, this.idPersonaje).subscribe(caracteristasPersonajes => {
          if(!caracteristasPersonajes.empty) {
            let caracteristicaPersonajeData = caracteristasPersonajes.docs[0];
            let caracteristicaPersonaje = caracteristicaPersonajeData.data() as CaracteristicaPersonaje;

            this.aniadirRespuestaCaracteristicaPersonaje(preguntaCaracteristica, idPreguntaCaracteristica, caracteristicaPersonaje);
          }
        });
      });
      this.questions.sort((a, b) => a.order - b.order);
    });
  }
  
  aniadirRespuestaCaracteristicaPersonaje(preguntaCaracteristica: PreguntaCaracteristica<String>, idPreguntaCaracteristica: string, caracteristicaPersonaje: CaracteristicaPersonaje) {
    console.log(preguntaCaracteristica.controlType);
    if (preguntaCaracteristica.controlType == "textbox") {
      this.questions.push(new TextboxQuestion({
        key: idPreguntaCaracteristica,
        label: preguntaCaracteristica.label,
        value: caracteristicaPersonaje.respuesta,
        required: preguntaCaracteristica.required,
        order: preguntaCaracteristica.order
      }));
      console.log("añadiendoQuestionTextbox");
    } else if(preguntaCaracteristica.controlType == "stats") {
      this.questions.push(new StatsQuestion({
        key: idPreguntaCaracteristica,
        label: preguntaCaracteristica.label,
        value: caracteristicaPersonaje.respuesta,
        required: preguntaCaracteristica.required,
        order: preguntaCaracteristica.order
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
        
        Object.keys(formulario.controls).forEach(idPreguntaCaracteristica => {
          // Si se desea guardar el label en vez de idPregunta, cambiar arriba el key al añadir los questions
          this.personajesService.actualizarCaracteristicasPersonaje(personaje.id, idPreguntaCaracteristica, formulario);
        });

        this.presentToast();
      }
    });    
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
