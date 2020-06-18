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

  getQuestionsList(idPartida: string) {
    return this.fireStore.collection('preguntasCaracteristicas', ref => ref.where('idPartida', '==', idPartida)).get();
  }
}
