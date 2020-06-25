import { Component, OnInit, ViewChild } from '@angular/core';
import { Foro } from 'src/app/models/foro';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/models/publicacion';
import { ActivatedRoute } from '@angular/router';
import { ForosService } from 'src/app/services/foros-service/foros.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from 'src/app/login-register/shared/user';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { Partida } from 'src/app/models/partida';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {

  @ViewChild(IonContent, {static: false})
  content: IonContent;

  foro: Foro;
  data = { type:'', title:'', message:'' };
  publicaciones$: Observable<Publicacion[]>;
  publicaciones: Publicacion[];
  roomkey:string;
  offStatus:boolean = false;
  private idForo: string;
  private idPartida: string;
  private partida: Partida;
  public usuario: User;

  constructor(private route: ActivatedRoute, private fireStore: AngularFirestore,
    private forosService: ForosService, private partidasService: PartidasService) {
    this.data.type = 'message';
    this.data.message = '';
    this.data.title = '';

    this.idForo = this.route.snapshot.paramMap.get('idForo');
    this.publicaciones$ = this.fireStore.collection<Publicacion>('publicaciones', ref => ref.where('idForo', '==', this.idForo)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Publicacion;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.partida = new Partida();
    this.foro = new Foro();
    this.buscarDatosForo();
  }

  buscarDatosForo() {
    this.forosService.buscarForo(this.idForo).subscribe(foro => {
      this.foro = foro.data() as Foro;

      this.idPartida = this.foro.idPartida;
      this.partidasService.getDatosPartida(this.idPartida).subscribe(partidaBuscada =>{
        this.partida = partidaBuscada.data() as Partida;
      });

      this.publicaciones$.subscribe(data => {
        this.publicaciones = data as Publicacion[];
        this.publicaciones.sort((a, b) => new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime());
        setTimeout(() => {
          if(this.offStatus === false) {
            this.content.scrollToBottom(300);
          }
        }, 1000);
      });
    });
  }

  esDirector() {
    return this.partida.director == this.usuario.uid;
  }

  sendMessage() {
    this.fireStore.collection("publicaciones").add({
      idForo: this.idForo,
      titulo: this.data.title,
      texto: this.data.message,
      tipo: this.data.type,
      sendDate: Date()
    })
    .then(function() {
      console.log("Publicación añadida correctamente!");
    })
    .catch(function(error) {
      console.error("Error añadiendo publicación: ", error);
    });
    this.data.title = '';
    this.data.message = '';
  }
}
