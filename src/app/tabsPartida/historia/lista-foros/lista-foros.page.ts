import { Component, OnInit } from '@angular/core';
import { Foro } from 'src/app/models/foro';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-foros',
  templateUrl: './lista-foros.page.html',
  styleUrls: ['./lista-foros.page.scss'],
})
export class ListaForosPage implements OnInit {

  foros$: Observable<Foro[]>;
  foros: Foro[];

  private idPartida: string;

  constructor(public navCtrl: NavController, private fireStore: AngularFirestore, public router: Router) {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    
    this.foros$ = this.fireStore.collection<Foro>('foros', ref => ref.where('idPartida', '==', this.idPartida)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Foro;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  ngOnInit() {
    this.foros = [];

    this.foros$.subscribe(data => {
      this.foros = data as Foro[];
      this.foros.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    });
  }

  addRoom() {
    this.router.navigate(['tabsPartida/historia/aniadirForo']);
  }

  joinRoom(idForo) {
    this.router.navigate(['tabsPartida/historia/' + idForo]);
  }
}
