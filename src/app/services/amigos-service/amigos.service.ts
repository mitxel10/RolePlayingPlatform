import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/login-register/shared/user';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {

  userList: AngularFirestoreCollection<any>;

  constructor(
    private fireStore: AngularFirestore,
    private authenticationService: AuthenticationService
  ) { }

  getUserList() {
    return this.fireStore.collection('users').valueChanges();
  }

  aniadirAmigo(idUsuario, idAmigo) {
    this.fireStore.collection("amigos").doc(idUsuario + "-" + idAmigo).set({
      idUsuario: idUsuario,
      idAmigo: idAmigo,
      fecha: new Date().toISOString()
    })
    .then(function() {
        console.log("Amigo añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo amigo: ", error);
    });
  }

  getAmigos() {
    let idUsuario = this.authenticationService.getCurrentUserUid();
    return this.fireStore.collection('amigos', ref => ref.where('idUsuario', '==', idUsuario)).valueChanges();
  }
}
