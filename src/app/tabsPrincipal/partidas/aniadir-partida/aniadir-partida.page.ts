import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AgeValidator } from  '../validators/ageValidator';
import { UsernameValidator } from  '../validators/usernameValidator';
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

@Component({
  selector: 'app-aniadir-partida',
  templateUrl: './aniadir-partida.page.html',
  styleUrls: ['./aniadir-partida.page.scss']
})
export class AniadirPartidaPage implements OnInit {

  @ViewChild('formSlider', {static: false}) formSlider;

	public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public inputsCaracteristicasPersonajesForm: FormGroup;

  public submitAttempt: boolean = false;
  
  usersList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedUsers = [];
  public selectedUsersValid: boolean;

  public tiposCaracteristica = [];
  public questions: PreguntaCaracteristica<any>[];

  constructor(
    private amigosService: AmigosService,
    public formBuilder: FormBuilder,
    private fireStore: AngularFirestore,
    private authService: AuthenticationService,
    private preguntasCaracteristicasService: PreguntasCaracteristicasService
    ) {
    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      age: ['', AgeValidator.isValid]
    });

    this.slideTwoForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
        privacy: ['', Validators.required],
        bio: ['']
    });

    /* this.inputsCaracteristicasPersonajesForm = this.formBuilder.group({
      caracteristicas: new FormArray([
        this.initInputsCaracteristicasPersonajes(),
      ]),
    }); */

    this.inputsCaracteristicasPersonajesForm = new FormGroup({
      questions: new FormArray([
        this.initQuestion(),
      ]),
    });
    this.questions = [];
    /* this.questions$ = preguntasCaracteristicasService.getQuestions(); */
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
    
    console.log(this.selectedUsers);
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
    console.log(value);
    this.tiposCaracteristica[j] = value;
  }

  remove(j){
    const control =  <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions',j,'options']);
    control.removeAt(0);
    control.controls = [];
  }

  move(shift, currentIndex) {
    const rules = this.inputsCaracteristicasPersonajesForm.get('questions') as FormArray;
  
    let newIndex: number = currentIndex + shift;
    if(newIndex === -1) {
      newIndex = rules.length - 1;
    } else if(newIndex == rules.length) {
      newIndex = 0;
    }
  
    const currentGroup = rules.at(currentIndex);
    rules.removeAt(currentIndex);
    rules.insert(newIndex, currentGroup)
  }

  onSubmit(form){
    
  }

  saveForm() {
    console.log(this.inputsCaracteristicasPersonajesForm.getRawValue());

    const arrayCaracteristicas = this.inputsCaracteristicasPersonajesForm.controls.questions as FormArray;
    let contadorCaracteristica = 1;
    for(let caracteristica of arrayCaracteristicas.controls) {
      console.log(caracteristica.value.options.controls);
      let numero = Math.floor(Math.random() * (10000 - 0 + 1)) + 0;
      this.fireStore.collection("preguntasCaracteristicas").add({
        idPartida: "1",
        key: caracteristica.value.name,
        label: caracteristica.value.name,
        controlType: caracteristica.value.type,
        required: caracteristica.value.required,
        options: caracteristica.value.options,
        order: contadorCaracteristica
      })
      .then(function() {
          console.log("Amigo añadido correctamente!");
      })
      .catch(function(error) {
          console.error("Error añadiendo amigo: ", error);
      });

      contadorCaracteristica++;
    }

    this.dibujarFormulario();
  }

  dibujarFormulario() {
    this.preguntasCaracteristicasService.getQuestionsList().subscribe((resultadoConsulta) => {
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

  // ------------ GESTIÓN DE LA NAVEGACIÓN EN LOS SLIDES ------------

  next(){
    this.formSlider.slideNext();
  }

  prev(){
    this.formSlider.slidePrev();
  }

  // ------------ GUARDADO DE LA PARTIDA ------------

  save(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
        this.formSlider.slideTo(0);
    } else if(!this.slideTwoForm.valid){
        this.formSlider.slideTo(1);
    } else if(this.selectedUsers.length < 1) {
        this.formSlider.slideTo(2);
    } else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
    }
  }
}
