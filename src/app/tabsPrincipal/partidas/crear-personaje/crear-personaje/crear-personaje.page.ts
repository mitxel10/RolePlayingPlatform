import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PreguntasCaracteristicasService } from 'src/app/services/preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { DropdownQuestion } from 'src/app/models/question-dropdown';

@Component({
  selector: 'app-crear-personaje',
  templateUrl: './crear-personaje.page.html',
  styleUrls: ['./crear-personaje.page.scss'],
})
export class CrearPersonajePage implements OnInit {

  private idPartida: string;
  public questions: PreguntaCaracteristica<any>[];

  constructor(private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService) { }

  ngOnInit() {
    this.idPartida = this.route.snapshot.paramMap.get('idPartida');
    console.log(this.idPartida);
    this.dibujarFormulario();
  }


  dibujarFormulario() {
    this.questions = [];
    this.preguntasCaracteristicasService.getQuestionsList(this.idPartida).subscribe((resultadoConsulta) => {
      console.log(resultadoConsulta);
      resultadoConsulta.forEach((caracteristica: PreguntaCaracteristica<String>) => {
        if(caracteristica.controlType == "textbox") {
          console.log("anadiendoText");
          this.questions.push(new TextboxQuestion({
            key: caracteristica.key,
            label: caracteristica.label,
            value: '',
            required: caracteristica.required,
            order: caracteristica.order
          }));
        } else {
          console.log("anadiendoSelect");
          let arrayOpciones = [];
          console.log(caracteristica.options);
          if(caracteristica.options) {
            for(let option of caracteristica.options) {
              arrayOpciones.push({key: option.key, value:''});
            }
          }
          this.questions.push(new DropdownQuestion({
            key: caracteristica.label,
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
}
