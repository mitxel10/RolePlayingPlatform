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
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
