import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PreguntaCaracteristica } from '../../models/pregunta-caracteristica';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  toFormGroup(questions: PreguntaCaracteristica<string>[] ) {
    let group: any = {};
    console.log(questions.length);
    questions.forEach(question => {
      if(question.controlType == "stats") {
        console.log("tipoStats");
        group[question.key+"stat1"] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
        group[question.key+"stat2"] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
        console.log("endStats");
      } else {
        console.log("tipoOtro");
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
      }
    });

    return new FormGroup(group);
  }
}
