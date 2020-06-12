import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AgeValidator } from  '../validators/ageValidator';
import { UsernameValidator } from  '../validators/usernameValidator';
import { User } from 'firebase';
import { AmigosService } from 'src/app/services/amigos-service/amigos.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuestionBase } from 'src/app/models/question-base';
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
  public questions: QuestionBase<any>[];

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

  /* initInputsCaracteristicasPersonajes() {
    return this.formBuilder.group({
      name 		: ['', Validators.required],
      type 		: ['', Validators.required],
      opcionesCaracteristica     : this.formBuilder.array([
        this.initInputsOpcionesCaracteristica()
     ])
   });
  }

  initInputsOpcionesCaracteristica() {
    return this.formBuilder.group({
      optionName 		: ['', Validators.required]
   });
  }

  addNewInputField() : void
  {
    const control = <FormArray>this.inputsCaracteristicasPersonajesForm.controls.caracteristicas;
    control.push(this.initInputsCaracteristicasPersonajes());
  }

  removeInputField(i : number) : void
   {
      const control = <FormArray>this.inputsCaracteristicasPersonajesForm.controls.caracteristicas;
      control.removeAt(i);
   }

   manage(val : any) : void
   {
      console.dir(val);
   } */

   
  initQuestion() {
    return new FormGroup({
      name: new FormControl(''),
      type: new FormControl('',Validators.required),
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
   // console.log(control);
    control.push(this.initQuestion());
    
  }

  add(j) {
    //console.log(k);
    //const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get('sections').controls[i].get('questions').controls[j].get('options');

    const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions',j,'options']); // also try this new syntax
    //console.log(control);
    control.push(this.initOptions());
  }

  getQuestions(form) {
   //console.log(form.controls.questions.controls);
    return form.controls.questions.controls;
  }
  getOptions(form) {
    //console.log(form.get('options').controls);
    return form.controls.options.controls;

  }

  removeQuestion(j){
     const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions']);
     control.removeAt(j);
  }

  removeOption(j,k){
   const control = <FormArray>this.inputsCaracteristicasPersonajesForm.get(['questions',j,'options']); // also try this new syntax
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

  onSubmit(form){
    
  }

  saveForm() {
    console.log(this.inputsCaracteristicasPersonajesForm.getRawValue());

    const arrayCaracteristicas = this.inputsCaracteristicasPersonajesForm.controls.questions as FormArray;
    for(let caracteristica of arrayCaracteristicas.controls) {
      console.log(caracteristica.value.options.controls);
      let numero = Math.floor(Math.random() * (10000 - 0 + 1)) + 0;
      this.fireStore.collection("preguntasCaracteristica").doc("idPartida" + "-" + numero).set({
        idPartida: "1",
        key: caracteristica.value.name,
        label: caracteristica.value.name,
        controlType: caracteristica.value.type,
        options: caracteristica.value.options
      })
      .then(function() {
          console.log("Amigo añadido correctamente!");
      })
      .catch(function(error) {
          console.error("Error añadiendo amigo: ", error);
      });
    }

  }

  dibujarFormulario() {
    /* let contadorCaracteristica = 1;
    const arrayCaracteristicas = this.inputsCaracteristicasPersonajesForm.controls.questions as FormArray;
    console.log(this.questions);
    for(let caracteristica of arrayCaracteristicas.controls) {
      if(caracteristica.value.type == "freeText") {
        
        this.questions.push(new TextboxQuestion({
          key: caracteristica.value.name,
          label: caracteristica.value.name,
          value: '',
          required: true,
          order: contadorCaracteristica
        }));
      } else {
        let arrayOpciones = [];
        console.log(caracteristica.value.options);
        if(caracteristica.value.options) {
          for(let option of caracteristica.value.options) {
            arrayOpciones.push({key: option.key, value:''});
          }
        }
        this.questions.push(new DropdownQuestion({
          key: caracteristica.value.name,
          label: caracteristica.value.name,
          options: arrayOpciones,
          order: contadorCaracteristica
        }));
      }
      contadorCaracteristica++;
    } */

    /* this.questions = this.preguntasCaracteristicasService.getQuestionsList(); */
    let contadorCaracteristica = 1;
    this.preguntasCaracteristicasService.getQuestionsList().subscribe((resultadoConsulta) => {
      resultadoConsulta.forEach((caracteristica: QuestionBase<String>) => {
        if(caracteristica.controlType == "textbox") {
          console.log("anadiendoText");
          this.questions.push(new TextboxQuestion({
            key: caracteristica.key,
            label: caracteristica.label,
            value: '',
            required: true,
            order: contadorCaracteristica
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
            order: contadorCaracteristica
          }));
        }
        contadorCaracteristica++;
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
