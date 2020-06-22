import { Component, OnInit, ViewChild } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NavController, IonContent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/login-register/shared/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, {static: false})
  content: IonContent;

  data = { type:'', nickname:'', message:'' };
  chats$: Observable<Chat[]>;
  chats: Chat[];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  private idPartida: string;
  public usuario: User;

  constructor(public navCtrl: NavController, private fireStore: AngularFirestore) {
    this.nickname = "nickName";
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    this.data.message = '';
  
    // firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {

    // this.fireStore.collection("cities").doc("SF").snapshotChanges(doc => {
      // console.log(doc);
      // this.chats = [];
      // this.chats = snapshotToMessages(resp);
      // setTimeout(() => {
      //   if(this.offStatus === false) {
      //     this.content.scrollToBottom(300);
      //   }
      // }, 1000);
    // });

    this.chats$ = this.fireStore.collection<Chat>('chats').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Chat;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  ngOnInit() {
    this.chats = [];

    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.chats$.subscribe(data => {
      this.chats = data as Chat[];
      this.chats.sort((a, b) => new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime());
      setTimeout(() => {
          if(this.offStatus === false) {
            this.content.scrollToBottom(300);
          }
        }, 1000);
    });
  }

  sendMessage() {
    this.fireStore.collection("chats").add({
      idPartida: this.idPartida,
      idUsuario: this.usuario.uid,
      username: this.usuario.displayName,
      mensaje: this.data.message,
      sendDate:Date()
    })
    .then(function() {
      console.log("Característica de personaje añadida correctamente!");
    })
    .catch(function(error) {
      console.error("Error añadiendo característica de personaje: ", error);
    });

    // let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    // newData.set({
    //   type:this.data.type,
    //   user:this.data.nickname,
    //   message:this.data.message,
    //   sendDate:Date()
    // });
    this.data.message = '';
  }
}
