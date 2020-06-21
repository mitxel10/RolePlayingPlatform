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
}
