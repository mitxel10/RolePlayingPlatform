import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Partida } from 'src/app/models/partida';
import { Observable } from 'rxjs';
import { ConfiguracionDados } from 'src/app/models/configuracionDados';
import { Personaje } from 'src/app/models/personaje';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  private usuariosPersonajes: Personaje[];

  constructor(
    private fireStore: AngularFirestore,
    private authenticationService: AuthenticationService
  ) { }

  aniadirPartida(partida: Partida): Promise<DocumentReference>{
    return this.fireStore.collection("partidas").add({
      director: partida.director,
      estado: partida.estado,
      nombre: partida.nombre,
      historia: partida.historia
    });
    /* .then(function() {
        console.log("Partida añadida correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo partida: ", error);
    }); */
  }

  aniadirConfiguracionDados(configuracionDados: ConfiguracionDados) {
    this.fireStore.collection("configuracionesDados").add({
      idPartida: configuracionDados.idPartida,
      numDados: configuracionDados.numDados,
      numLados: configuracionDados.numLados
    })
    .then(function() {
        console.log("Configuración de dados añadida correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo configuración de dados: ", error);
    });
  }

  getPartidasPersonajeUsuario() {
    /* let idUsuario = this.authenticationService.getCurrentUserUid();
    this.fireStore.collection('personajes', ref => ref.where('idUsuario', '==', idUsuario)).valueChanges().subscribe(users => {
      this.usuariosPersonajes = users as Personaje[];
    }); */

    let idUsuario = this.authenticationService.getCurrentUserUid();
    return this.fireStore.collection('personajes', ref => ref.where('idUsuario', '==', idUsuario)).valueChanges();
  }

  getPartidasUsuarioEsDirector() {
    let idUsuario = this.authenticationService.getCurrentUserUid();
    return this.fireStore.collection('partidas', ref => ref.where('director', '==', idUsuario)).get();
  }

  getPartidasUsuarioEsPersonaje(partidasUsuarioPersonaje: string[]) {
    return this.fireStore.collection('partidas', ref => ref.where(firestore.FieldPath.documentId(), "in", partidasUsuarioPersonaje)).get();


    /* let partidasUsuario = [];
    let idUsuario = this.authenticationService.getCurrentUserUid();

    const partidasDirector = this.fireStore.collection('partidas', ref => ref.where('director', '==', idUsuario));
    const partidasPersonaje = this.fireStore.collection('partidas', ref => ref.where('director', '==', idUsuario));

    const [partidasDirectorSnapshot, partidasPersonajeSnapshot] = await Promise.all([
      partidasDirector,
      partidasPersonaje
    ]);

    /* await partidasDirectorSnapshot.valueChanges().subscribe(partidasDirector => {
      partidasPersonajeSnapshot.valueChanges().subscribe(partidasPersonaje => {
        partidasUsuario = partidasDirector.concat(partidasPersonaje);
        console.log("primero");
      });
    }); */

    /* console.log("segundo");

    return partidasDirectorSnapshot.valueChanges().subscribe(partidasDirector => {
      partidasPersonajeSnapshot.valueChanges().subscribe(partidasPersonaje => {
        return partidasDirector.concat(partidasPersonaje);
      });
    }); */
  }
}
