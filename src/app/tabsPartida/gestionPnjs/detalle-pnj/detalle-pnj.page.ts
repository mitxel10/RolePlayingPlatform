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

  constructor(public router: Router, private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, private personajesService: PersonajesService, 
    private fireStore: AngularFirestore, private partidasService: PartidasService, public toastController: ToastController) { }

  ngOnInit() {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.idPersonaje = this.route.snapshot.paramMap.get('idPnj');
    this.questions = [];
    this.dibujarFormulario();
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
}
