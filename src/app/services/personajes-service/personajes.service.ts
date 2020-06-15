import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Personaje } from 'src/app/models/personaje';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private fireStore: AngularFirestore) { }

  aniadirPersonaje(personaje: Personaje) {
    this.fireStore.collection("personajes").add({
      idPartida: personaje.idPartida,
      idUsuario: personaje.idUsuario,
      estado: personaje.estado
    })
    .then(function() {
        console.log("Personaje añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo personaje: ", error);
    });
  }
}
