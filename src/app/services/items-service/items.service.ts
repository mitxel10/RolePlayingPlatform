import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private fireStore: AngularFirestore) { }

  aniadirGruposItems(idPartida, itemGroup) {
    return this.fireStore.collection("grupoItems").add({
      idPartida: idPartida,
      nombre: itemGroup.value.name
    })
  }

  aniadirItems(idGrupoItem, itemGroup) {
    this.fireStore.collection("items").add({
      nombre: idPartida,
      descripcion: itemGroup.value.name
    })
    .then(function() {
        console.log("PreguntaCaracteristica añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo PreguntaCaracteristica: ", error);
    });
  }
}
