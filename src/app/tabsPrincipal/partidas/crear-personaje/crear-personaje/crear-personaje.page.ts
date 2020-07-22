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
import { StatsQuestion } from 'src/app/models/question-stats';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DropdownMultipleQuestion } from 'src/app/models/question-dropdownMultiple';

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
  public nombre: String;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  UploadedFileURL: Observable<string>;
  fileName:string;
  fileSize:number;
  isUploading:boolean;
  isUploaded:boolean;
  urlImagen: string;

  constructor(public router: Router, private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, private personajesService: PersonajesService, 
    private fireStore: AngularFirestore, private storage: AngularFireStorage, private partidasService: PartidasService) {
      this.isUploading = false;
      this.isUploaded = false;
    }

  ngOnInit() {
    this.idPartida = this.route.snapshot.paramMap.get('idPartida');
    this.dibujarFormulario();
  }

  dibujarFormulario() {
    this.questions = [];
    this.preguntasCaracteristicasService.getQuestionsList(this.idPartida, "PJ").subscribe((resultadoConsulta) => {
      resultadoConsulta.forEach((preguntaCaracteristicaDoc) => {
        let preguntaCaracteristica = preguntaCaracteristicaDoc.data() as PreguntaCaracteristica<String>;
        if(preguntaCaracteristica.controlType == "textbox") {
          this.questions.push(new TextboxQuestion({
            key: preguntaCaracteristicaDoc.id,
            label: preguntaCaracteristica.label,
            value: '',
            required: preguntaCaracteristica.required,
            order: preguntaCaracteristica.order
          }));
        } else if(preguntaCaracteristica.controlType == "stats") {
          this.questions.push(new StatsQuestion({
            key: preguntaCaracteristicaDoc.id,
            label: preguntaCaracteristica.label,
            value: '',
            required: preguntaCaracteristica.required,
            order: preguntaCaracteristica.order
          }));
        } else if(preguntaCaracteristica.controlType == "dropdownMultiple") {
          let arrayOpciones = [];
          if(preguntaCaracteristica.options) {
            for(let option of preguntaCaracteristica.options) {
              arrayOpciones.push({key: option.key, value:''});
            }
          }
          this.questions.push(new DropdownMultipleQuestion({
            key: preguntaCaracteristicaDoc.id,
            label: preguntaCaracteristica.label,
            options: arrayOpciones,
            required: true,
            order: preguntaCaracteristica.order
          }));
        } else {
          let arrayOpciones = [];
          if(preguntaCaracteristica.options) {
            for(let option of preguntaCaracteristica.options) {
              arrayOpciones.push({key: option.key, value:''});
            }
          }
          this.questions.push(new DropdownQuestion({
            key: preguntaCaracteristicaDoc.id,
            label: preguntaCaracteristica.label,
            options: arrayOpciones,
            required: true,
            order: preguntaCaracteristica.order
          }));
        }
      });
      this.questions.sort((a, b) => a.order - b.order);
    });
  }

  uploadFile(event: FileList) {
    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    const path = `imagenesPersonajes/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'Imagen subida de un personaje de RolePlayingApp' };
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file, { customMetadata });

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.urlImagen = resp;
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  doSaveForm(formulario: FormGroup) {
    this.personajesService.buscarPersonaje(this.idPartida).subscribe(personajes => {
      if(!personajes.empty) {
        const personaje = personajes.docs[0];
        this.personaje = personaje.data() as Personaje;
        
        let numPregunta = 1;
        Object.keys(formulario.controls).forEach((key, index) => {
          // Si se desea guardar el label en vez de idPregunta, cambiar arriba el key al añadir los questions
          this.aniadirCaracteristicaPersonaje(personaje, key, index, formulario);
          numPregunta++;
        });
        this.personajesService.actualizarEstadoPersonaje(personaje.id, EstadosPersonaje.PERSONALIZADO).then(actualizado => {
          this.personajesService.actualizarPersonaje(personaje.id, "nombre", this.nombre);
          this.personajesService.actualizarPersonaje(personaje.id, "imagen", this.urlImagen);
          this.comprobarEstadoPartida();
          this.irListaPartidas();
        });
      }
    });    
  }
  
  private aniadirCaracteristicaPersonaje(personaje, key: string, index: number, formulario: FormGroup) {
    if(!key.endsWith("stat2")) {
      if(key.endsWith("stat1")) {
        let keyStat = Object.keys(formulario.controls)[index+1];
        this.personajesService.aniadirCaracteristicasConStatPersonaje(personaje.id, key, keyStat, formulario);
      } else {
        this.personajesService.aniadirCaracteristicasPersonaje(personaje.id, key, formulario);
      }
    }
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
