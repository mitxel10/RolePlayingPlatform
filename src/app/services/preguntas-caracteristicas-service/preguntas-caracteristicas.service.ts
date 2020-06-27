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

  aniadirPreguntasCaracteristicas(idPartida, caracteristica, order) {
    this.fireStore.collection("preguntasCaracteristicas").add({
      idPartida: idPartida,
      key: caracteristica.value.name,
      label: caracteristica.value.name,
      controlType: caracteristica.value.type,
      required: caracteristica.value.required,
      options: caracteristica.value.options,
      order: order
    })
    .then(function() {
        console.log("PreguntaCaracteristica añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo PreguntaCaracteristica: ", error);
    });
  }

  aniadirPreguntasCaracteristicasDefault(idPartida, nombre, tipo, required, options, order) {
    this.fireStore.collection("preguntasCaracteristicas").add({
      idPartida: idPartida,
      key: nombre,
      label: nombre,
      controlType: tipo,
      required: required,
      options: options,
      order: order
    })
    .then(function() {
        console.log("PreguntaCaracteristica añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo PreguntaCaracteristica: ", error);
    });
  }

  getQuestionsList(idPartida: string) {
    return this.fireStore.collection('preguntasCaracteristicas', ref => ref.where('idPartida', '==', idPartida)).get();
  }

  getCaracteristicasPersonajes(idPregunta, idPersonaje) {
    return this.fireStore.collection('caracteristicasPersonajes', ref => ref.where('idPregunta', '==', idPregunta).where('idPersonaje', '==', idPersonaje)).get();
  }
}
