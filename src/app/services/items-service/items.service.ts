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
        console.log("Item añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Item añadiendo PreguntaCaracteristica: ", error);
    });
  }

  obtenerItemGroupsPartida(idPartida: string) {
    return this.fireStore.collection('grupoItems', ref => ref.where('idPartida', '==', idPartida)).get();
  }

  obtenerItemsPartida(idGrupo) {
    return this.fireStore.collection('items', ref => ref.where('idGrupo', '==', idGrupo)).get();
  }
}
