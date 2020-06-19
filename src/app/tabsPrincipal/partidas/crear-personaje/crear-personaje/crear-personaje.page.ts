import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntasCaracteristicasService } from 'src/app/services/preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { DropdownQuestion } from 'src/app/models/question-dropdown';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { Personaje } from 'src/app/models/personaje';
import { EstadosPersonaje } from 'src/app/enums/EstadosPersonaje';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { EstadosPartida } from 'src/app/enums/EstadosPartida';

@Component({
  selector: 'app-crear-personaje',
  templateUrl: './crear-personaje.page.html',
  styleUrls: ['./crear-personaje.page.scss'],
})
export class CrearPersonajePage implements OnInit {

  private idPartida: string;
  public questions: PreguntaCaracteristica<any>[];
  public datosBasicosForm: FormGroup;
  public personaje: Personaje;

  constructor(public router: Router, private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, private personajesService: PersonajesService, 
    private fireStore: AngularFirestore, private partidasService: PartidasService) { }

  ngOnInit() {
    this.idPartida = this.route.snapshot.paramMap.get('idPartida');
    this.dibujarFormulario();
  }

  dibujarFormulario() {
    this.questions = [];
    this.preguntasCaracteristicasService.getQuestionsList(this.idPartida).subscribe((resultadoConsulta) => {
      resultadoConsulta.forEach((caracteristicaDoc) => {
        let caracteristica = caracteristicaDoc.data() as PreguntaCaracteristica<String>;
        if(caracteristica.controlType == "textbox") {
          this.questions.push(new TextboxQuestion({
            key: caracteristicaDoc.id,
            label: caracteristica.label,
            value: '',
            required: caracteristica.required,
            order: caracteristica.order
          }));
        } else {
          let arrayOpciones = [];
          if(caracteristica.options) {
            for(let option of caracteristica.options) {
              arrayOpciones.push({key: option.key, value:''});
            }
          }
          this.questions.push(new DropdownQuestion({
            key: caracteristicaDoc.id,
            label: caracteristica.label,
            options: arrayOpciones,
            required: true,
            order: caracteristica.order
          }));
        }
      });
      this.questions.sort((a, b) => a.order - b.order);
    });
  }

  doSaveForm(formulario: FormGroup) {
    this.personajesService.buscarPersonaje(this.idPartida).subscribe(personajes => {
      if(!personajes.empty) {
        const personaje = personajes.docs[0];
        this.personaje = personaje.data() as Personaje;
        
        Object.keys(formulario.controls).forEach(key => {
          // Si se desea guardar el label en vez de idPregunta, cambiar arriba el key al añadir los questions
          this.fireStore.collection("caracteristicasPersonajes").add({
            idPersonaje: personaje.id,
            idPregunta: key,
            respuesta: formulario.get(key).value
          })
          .then(function() {
            console.log("Característica de personaje añadida correctamente!");
          })
          .catch(function(error) {
            console.error("Error añadiendo característica de personaje: ", error);
          });
        });
        this.personajesService.actualizarEstadoPersonaje(personaje.id, EstadosPersonaje.PERSONALIZADO).then(actualizado => {
          console.log("hola" + this.idPartida);
          this.comprobarEstadoPartida();
          this.irListaPartidas();
        });
      }
    });    
  }
  
  comprobarEstadoPartida() {
    this.partidasService.getPersonajesPartida(this.idPartida).subscribe(personajesPartida => {
      let todosPersonajesPersonalizados = true;
      personajesPartida.forEach(personajePartida => {
        let personaje = personajePartida.data() as Personaje;
        if(personaje.estado != EstadosPersonaje.PERSONALIZADO) {
          todosPersonajesPersonalizados = false;
        }
      });
      if(todosPersonajesPersonalizados) {
        this.partidasService.actualizarEstadoPartida(this.idPartida, EstadosPartida.EN_PROCESO);
      }
    });
  }

  irListaPartidas() {
    this.router.navigate(['tabs/partidas']);
  }
}
