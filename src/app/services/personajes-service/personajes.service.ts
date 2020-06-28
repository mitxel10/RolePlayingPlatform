import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Personaje } from 'src/app/models/personaje';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { EstadosPersonaje } from 'src/app/enums/EstadosPersonaje';
import { PreguntasCaracteristicasService } from '../preguntas-caracteristicas-service/preguntas-caracteristicas.service';
import { CaracteristicaPersonaje } from 'src/app/models/caracteristicaPersonaje';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  
  constructor(private fireStore: AngularFirestore, private authenticationService: AuthenticationService, private preguntasCaracteristicasService: PreguntasCaracteristicasService) { }
  
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

  actualizarPersonaje(idPersonaje, campoActualizar, valor) {
    return this.fireStore.collection("personajes").doc(idPersonaje).update({
      [campoActualizar]: valor
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

  aniadirCaracteristicasConStatPersonaje(idPersonaje, keyPregunta, keyStat, formulario) {
    let key = keyPregunta.replace("stat1", "");

    this.fireStore.collection("caracteristicasPersonajes").add({
      idPersonaje: idPersonaje,
      idPregunta: keyPregunta,
      respuesta: formulario.get(keyPregunta).value,
      estadistica: formulario.get(keyStat).value
    })
    .then(function() {
      console.log("Característica de personaje añadida correctamente!");
    })
    .catch(function(error) {
      console.error("Error añadiendo característica de personaje: ", error);
    });
  }

  actualizarCaracteristicasPersonaje(idPersonaje, idPreguntaCaracteristica, formulario) {
    this.preguntasCaracteristicasService.getCaracteristicasPersonajes(idPreguntaCaracteristica, idPersonaje).subscribe(caracteristasPersonajes => {
      if(!caracteristasPersonajes.empty) {
        let caracteristicaPersonajeDoc = caracteristasPersonajes.docs[0];
        let idCaracteristicaPersonaje = caracteristicaPersonajeDoc.id;
        
        this.fireStore.collection("caracteristicasPersonajes").doc(idCaracteristicaPersonaje).update({
          respuesta: formulario.get(idPreguntaCaracteristica).value
        })
        .then(function() {
          console.log("Característica de personaje actualizada correctamente!");
        })
        .catch(function(error) {
          console.error("Error actualizando característica de personaje: ", error);
        });
      }
    });
  }
}
