import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private fireStore: AngularFirestore) { }

  getDatosUsuario(idUsuario) {
    return this.fireStore.collection('users').doc(idUsuario).get();
  }

  actualizarUltimaPartida(idUsuario: string, idPartida: string) {
    return this.fireStore.collection("users").doc(idUsuario).update({
      idUltimaPartida: idPartida
    })
    .then(function() {
      console.log("Última partida del usuario actualizada correctamente!");
    })
    .catch(function(error) {
      console.error("Error actualizando última partida del usuario: ", error);
    });
  }
}
