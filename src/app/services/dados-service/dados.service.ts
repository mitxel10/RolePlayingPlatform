import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private fireStore: AngularFirestore) { }

  buscarConfiguracionCados(idPartida: string) {
    return this.fireStore.collection('configuracionesDados', ref => ref.where('idPartida', '==', idPartida)).get();
  }
}
