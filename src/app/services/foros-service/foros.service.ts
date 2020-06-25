import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Personaje } from 'src/app/models/personaje';

@Injectable({
  providedIn: 'root'
})
export class ForosService {

  constructor(private fireStore: AngularFirestore) { }

  aniadirForo(idPartida, titulo, descripcion) {
    this.fireStore.collection("foros").add({
      idPartida: idPartida,
      titulo: titulo,
      descripcion: descripcion,
      creationDate: Date()
    })
    .then(function() {
      console.log("Foro añadido correctamente!");
    })
    .catch(function(error) {
      console.error("Error añadiendo foro: ", error);
    });
  }

  buscarForo(idForo: string) {
    return this.fireStore.collection('foros').doc(idForo).get();
  }
}
