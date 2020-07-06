import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inventario } from 'src/app/models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  
  constructor(private fireStore: AngularFirestore) { }

  obtenerInventarioPersonaje(idItem: string, idPersonaje: string) {
    return this.fireStore.collection('inventarios', ref => ref.where('idItem', '==', idItem).where('idPersonaje', '==', idPersonaje)).get();
  }

  aniadirInventarioPersonaje(idItem: string, idPersonaje: string, cantidad: number) {
    this.fireStore.collection("inventarios").add({
      idItem: idItem,
      idPersonaje: idPersonaje,
      cantidad: cantidad
    })
    .then(function() {
        console.log("Inventario añadido correctamente!");
    })
    .catch(function(error) {
        console.error("Error añadiendo Inventario: ", error);
    });
  }

  actualizarInventarioPersonaje(idItem: string, idPersonaje: string, cantidad: number) {
    this.obtenerInventarioPersonaje(idItem, idPersonaje).subscribe((inventarios) => {
      if(!inventarios.empty) {
        const inventario = inventarios.docs[0];
        // let inventario = inventarioData.data() as Inventario;
        return this.fireStore.collection("inventarios").doc(inventario.id).update({
          cantidad: cantidad
        })
        .then(function() {
          console.log("Inventario de personaje actualizado correctamente!");
        })
        .catch(function(error) {
          console.error("Error actualizando inventario de personaje: ", error);
        });
      } else {
        this.aniadirInventarioPersonaje(idItem, idPersonaje, cantidad);
      }
  });
  }
}
