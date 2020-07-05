import { Component, OnInit } from '@angular/core';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { FormGroup } from '@angular/forms';
import { PNJ } from 'src/app/models/pnj';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PreguntasCaracteristicasService } from 'src/app/services/preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { StatsQuestion } from 'src/app/models/question-stats';
import { DropdownQuestion } from 'src/app/models/question-dropdown';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-aniadir-pnj',
  templateUrl: './aniadir-pnj.page.html',
  styleUrls: ['./aniadir-pnj.page.scss'],
})
export class AniadirPnjPage implements OnInit {

  private idPartida: string;
  public questions: PreguntaCaracteristica<any>[];
  public datosBasicosForm: FormGroup;
  public personaje: PNJ;
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

  constructor(public router: Router, private route: ActivatedRoute, private preguntasCaracteristicasService: PreguntasCaracteristicasService, 
    private personajesService: PersonajesService, private storage: AngularFireStorage, private partidasService: PartidasService) {
      this.isUploading = false;
      this.isUploaded = false;
    }

  ngOnInit() {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.dibujarFormulario();
  }

  dibujarFormulario() {
    this.questions = [];
    this.preguntasCaracteristicasService.getQuestionsList(this.idPartida, "PNJ").subscribe((resultadoConsulta) => {
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
    this.personajesService.aniadirPnj(this.idPartida, this.nombre, this.urlImagen).then((data => {
      let idPnj = data.id;

      let numPregunta = 1;
      Object.keys(formulario.controls).forEach((key, index) => {
        // Si se desea guardar el label en vez de idPregunta, cambiar arriba el key al añadir los questions
        this.aniadirCaracteristicaPnj(idPnj, key, index, formulario);
        numPregunta++;
      });

      this.irListaPnjs();
    }));  
  }

  private aniadirCaracteristicaPnj(idPnj, key: string, index: number, formulario: FormGroup) {
    if(!key.endsWith("stat2")) {
      if(key.endsWith("stat1")) {
        let keyStat = Object.keys(formulario.controls)[index+1];
        this.personajesService.aniadirCaracteristicasConStatPersonaje(idPnj, key, keyStat, formulario);
      } else {
        this.personajesService.aniadirCaracteristicasPersonaje(idPnj, key, formulario);
      }
    }
  }

  irListaPnjs() {
    this.router.navigate(['tabsPartida/pnjs']);
  }
}
