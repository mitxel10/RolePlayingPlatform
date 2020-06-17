import { Injectable } from '@angular/core';
import { PreguntaCaracteristica } from 'src/app/models/pregunta-caracteristica';
import { DropdownQuestion } from 'src/app/models/question-dropdown';
import { TextboxQuestion } from 'src/app/models/question-textbox';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PreguntasCaracteristicasService {

  constructor(private fireStore: AngularFirestore) { }

  /* getQuestions() {

    let questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  } */

  getQuestionsList(idPartida: string) {
    return this.fireStore.collection('preguntasCaracteristicas', ref => ref.where('idPartida', '==', idPartida)).get();
  }
}
