import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Personaje } from 'src/app/models/personaje';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { EstadosPersonaje } from 'src/app/enums/EstadosPersonaje';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  
  constructor(private fireStore: AngularFirestore, private authenticationService: AuthenticationService) { }
  
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
  
  buscarPersonaje(idPartida: string) {
    let idUsuario = this.authenticationService.getCurrentUserUid();
    return this.fireStore.collection('personajes', ref => ref.where('idPartida', '==', idPartida).where('idUsuario', '==', idUsuario)).get();
  }
  
  actualizarEstadoPersonaje(idPersonaje, estadoPersonaje: EstadosPersonaje) {
    return this.fireStore.collection("personajes").doc(idPersonaje).update({
      estado: estadoPersonaje
    })
    .then(function() {
      console.log("Estado de personaje actualizado correctamente!");
    })
    .catch(function(error) {
      console.error("Error actualizando estado de personaje: ", error);
    });
  }

  aniadirCaracteristicasPersonaje(idPersonaje, keyPregunta, formulario) {
    this.fireStore.collection("caracteristicasPersonajes").add({
      idPersonaje: idPersonaje,
      idPregunta: keyPregunta,
      respuesta: formulario.get(keyPregunta).value
    })
    .then(function() {
      console.log("Característica de personaje añadida correctamente!");
    })
    .catch(function(error) {
      console.error("Error añadiendo característica de personaje: ", error);
    });
  }
}
