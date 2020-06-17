import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PreguntasCaracteristicasService } from 'src/app/services/preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { DropdownQuestion } from 'src/app/models/question-dropdown';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { Personaje } from 'src/app/models/personaje';

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

  constructor(private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, private personajesService: PersonajesService, private fireStore: AngularFirestore) { }

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
          this.questions.sort((a, b) => a.order - b.order);
        }
      });
    });
  }

  doSaveForm(formulario: FormGroup) {
    this.personajesService.buscarPersonaje(this.idPartida).subscribe(personajes => {
      if(!personajes.empty) {
        const personaje = personajes.docs[0];
        this.personaje = personaje.data() as Personaje;
        
        console.log(formulario);
        Object.keys(formulario.controls).forEach(key => {
          console.log(formulario.get(key).value);

          // Si se desea guardar el label en vez de idPregunta, cambiar arriba el key al añadir los questions
          this.fireStore.collection("caracteristicasPersonajes").add({
            idPersonaje: this.idPartida,
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

      }
    });

    
    
    
    
    /* personajes.forEach(partidaPersonaje => {
      let partida = partidaPersonaje.data() as Personaje;
      console.log(partida);
      Object.keys(formulario.controls).forEach(key => {
        console.log(formulario.get(key).value);
    });
  }); */

      // this.fireStore.collection("caracteristicasPersonajes").add({
      //   idPartida: this.idPartida,
      //   key: caracteristica.value.name,
      //   label: caracteristica.value.name,
      //   controlType: caracteristica.value.type,
      //   required: caracteristica.value.required,
      //   options: caracteristica.value.options,
      //   order: contadorCaracteristica
      // })
      // .then(function() {
      //     console.log("Amigo añadido correctamente!");
      // })
      // .catch(function(error) {
      //     console.error("Error añadiendo amigo: ", error);
      // });
    
  }
}
