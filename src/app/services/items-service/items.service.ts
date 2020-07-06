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

  aniadirItems(idGrupoItem, item) {
    this.fireStore.collection("items").add({
      idGrupo: idGrupoItem,
      nombre: item.nombre,
      descripcion: item.descripcion
    })
    .then(function() {
        console.log("PreguntaCaracteristica añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo PreguntaCaracteristica: ", error);
    });
  }
}
