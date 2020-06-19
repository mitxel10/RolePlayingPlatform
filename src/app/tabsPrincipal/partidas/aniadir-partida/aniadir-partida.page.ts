import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UsernameValidator } from  '../validators/usernameValidator';
import { NumeroDadosValidator } from  '../validators/numeroDadosValidator';
import { NumeroLadosValidator } from '../validators/numeroLadosValidator';
import { User } from 'firebase';
import { AmigosService } from 'src/app/services/amigos-service/amigos.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { DropdownQuestion } from 'src/app/models/question-dropdown';
import { Observable } from 'rxjs';
import { PreguntasCaracteristicasService } from 'src/app/services/preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { map } from 'rxjs/operators';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { Partida } from 'src/app/models/partida';
import { EstadosPartida } from 'src/app/enums/EstadosPartida';
import { Personaje } from 'src/app/models/personaje';
import { EstadosPersonaje } from 'src/app/enums/EstadosPersonaje';
import { PersonajesService } from 'src/app/services/personajes-service/personajes.service';
import { ConfiguracionDados } from 'src/app/models/configuracionDados';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aniadir-partida',
  templateUrl: './aniadir-partida.page.html',
  styleUrls: ['./aniadir-partida.page.scss']
})
export class AniadirPartidaPage implements OnInit {

  @ViewChild('formSlider', {static: false}) formSlider;

	public datosBasicosForm: FormGroup;
  public configuracionDadosForm: FormGroup;
  public inputsCaracteristicasPersonajesForm: FormGroup;

  public submitAttempt: boolean = false;
  
  usersList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedUsers = [];
  public selectedUsersValid: boolean;

  public tiposCaracteristica = [];
  public questions: PreguntaCaracteristica<any>[];

  constructor(public router: Router, private amigosService: AmigosService, public formBuilder: FormBuilder, private fireStore: AngularFirestore, 
    private authService: AuthenticationService, private preguntasCaracteristicasService: PreguntasCaracteristicasService,
    private partidasService: PartidasService, private personajesService: PersonajesService) {
      
      this.datosBasicosForm = formBuilder.group({
        tituloPartida: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
        historia: ['', Validators.compose([Validators.maxLength(3000), Validators.required])],
        genero: ['', Validators.compose([Validators.maxLength(100), Validators.required])]
      });

      this.configuracionDadosForm = formBuilder.group({
          /* username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername], */
          numDados: ['', [Validators.required, NumeroDadosValidator.isValid]],
          numLados: ['', [Validators.required, NumeroLadosValidator.isValid]]
      });

      this.inputsCaracteristicasPersonajesForm = new FormGroup({
        questions: new FormArray([
          this.initQuestion(),
        ]),
      });
      this.questions = [];
  }

  ngOnInit() {
    this.initJugadoresSelect();

    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Marcar todos',
      unSelectAllText: 'Desmarcar todos',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  // ------------ GESTIÓN DEL SELECT DE JUGADORES PARTICIPANTES EN LA PARTIDA ------------

  initJugadoresSelect() {
    this.amigosService.getUserList().subscribe((resultadoConsulta) => {
      this.usersList = [];
      resultadoConsulta.forEach((datosUsuario: User) => {
        if(datosUsuario.uid != this.authService.currentUserId) {
          this.usersList.push({item_id:datosUsuario.uid, item_text:datosUsuario.displayName});
        }
      });
    });

    this.selectedUsersValid = false;
  }

  onItemSelect(item: any) {
    if(this.selectedUsers.some(user => user.item_id == item.item_id && user.item_text == item.item_text)) {
      this.removeUserFromSelectedList(item);
    } else {
      this.selectedUsers.push(item);
      this.selectedUsersValid = true;
    }
  }

  removeUserFromSelectedList(item: any) {
    var index = this.selectedUsers.findIndex(user => user.item_id == item.item_id);
    if (index > -1) {
        this.selectedUsers.splice(index, 1);
    }

    if(this.selectedUsers.length < 1) {
      this.selectedUsersValid = false;
    }
  }

  onSelectAll(items: any) {
    this.selectedUsers = [];
    for (let user in this.usersList) {
      this.selectedUsers.push(this.usersList[user]);
    }
    this.selectedUsersValid = true;
  }

  onDeSelectAll(items: any) {
    this.selectedUsersValid = false;
    this.selectedUsers = [];
  }

  // ------------ GESTIÓN DE LA INSERCION DE CARACTERÍSTICAS PARA EL DISEÑO DE LA PARTIDA ------------   
  initQuestion() {
    return new FormGroup({
      name: new FormControl('',Validators.required),
      type: new FormControl('',Validators.required),
      required: new FormControl('',Validators.required),
      options: new FormArray([
        this.initOptions()
      ])
    });
  }

  initOptions() {
    return new FormGroup({
      key: new FormControl('')
    });
  }

  addQuestion() {
    const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions']);
    control.push(this.initQuestion());
    
  }

  add(j) {
    const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions',j,'options']);
    control.push(this.initOptions());
  }

  getQuestions(form) {
    return form.controls.questions.controls;
  }

  getOptions(form) {
    return form.controls.options.controls;

  }

  removeQuestion(j){
     const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions']);
     control.removeAt(j);
  }

  removeOption(j,k){
   const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions',j,'options']);
   control.removeAt(k);
  }

  tipoCaracteristicaSeleccionado(j, value) {
    this.tiposCaracteristica[j] = value;
  }

  remove(j){
    const control =  <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions',j,'options']);
    control.removeAt(0);
    control.controls = [];
  }

  move(shift, currentIndex) {
    const questions = this.inputsCaracteristicasPersonajesForm.get('questions') as FormArray;
  
    let newIndex: number = currentIndex + shift;
    if(newIndex === -1) {
      newIndex = questions.length - 1;
    } else if(newIndex == questions.length) {
      newIndex = 0;
    }
  
    const currentGroup = questions.at(currentIndex);
    questions.removeAt(currentIndex);
    questions.insert(newIndex, currentGroup)
  }

  onSubmit(form){
    
  }

  // ------------ GESTIÓN DE LA NAVEGACIÓN EN LOS SLIDES ------------

  next(){
    this.formSlider.slideNext();
  }

  prev(){
    this.formSlider.slidePrev();
  }

  // ------------ GUARDADO DE LA PARTIDA ------------

  save(){
    this.crearPartida();
    this.irListaPartidas();
  }

  crearPartida() {
    var partida = new Partida;
    partida.director = this.authService.currentUserId;
    partida.estado = EstadosPartida.CREANDO_JUGADORES;
    partida.nombre = this.datosBasicosForm.get('tituloPartida').value;
    partida.historia = this.datosBasicosForm.get('historia').value;

    this.partidasService.aniadirPartida(partida).then((data => {
      let idPartida = data.id;

      this.crearPersonajes(idPartida);
      this.crearConfiguracionDados(idPartida);
      this.crearPreguntasCaracteristicas(idPartida);
    }));
  }
    
  crearPersonajes(idPartida) {
    this.selectedUsers.forEach(usuario => {
      let personaje = new Personaje;
      personaje.idPartida = idPartida;
      personaje.idUsuario = usuario.item_id;
      personaje.estado = EstadosPersonaje.CREADO;
      
      this.personajesService.aniadirPersonaje(personaje);
    });
  }
  
  crearConfiguracionDados(idPartida) {
    let configuracionDados = new ConfiguracionDados;
    configuracionDados.idPartida = idPartida;
    configuracionDados.numDados = this.configuracionDadosForm.get('numDados').value;
    configuracionDados.numLados = this.configuracionDadosForm.get('numLados').value;
    
    this.partidasService.aniadirConfiguracionDados(configuracionDados);
  }

  crearPreguntasCaracteristicas(idPartida) {
    const arrayCaracteristicas = this.inputsCaracteristicasPersonajesForm.controls.questions as FormArray;
    let contadorCaracteristica = 1;

    for(let caracteristica of arrayCaracteristicas.controls) {
      this.preguntasCaracteristicasService.aniadirPreguntasCaracteristicas(idPartida, caracteristica, contadorCaracteristica);

      contadorCaracteristica++;
    }
  }

  irListaPartidas() {
    this.router.navigate(['tabs/partidas']);
  }
}
