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
    questions.forEach(question => {
      if(question.controlType == "stats") {
        group[question.key+"stat1"] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
        group[question.key+"stat2"] = question.required ? new FormControl(question.stat || '', Validators.required) : new FormControl("jjj" || '');
      } else {
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
      }
    });

    return new FormGroup(group);
  }
}
