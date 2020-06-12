import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AmigosService } from 'src/app/services/amigos-service/amigos.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Amigo } from '../shared/Amigo';
import { User } from 'src/app/login-register/shared/user';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.page.html',
  styleUrls: ['./lista-amigos.page.scss'],
})
export class ListaAmigosPage implements OnInit {

  public amigosData: User[];

  constructor(
    public router: Router,
    private amigosService: AmigosService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getAmigos();
  }

  irAniadirAmigo() {
    this.router.navigate(['tabs/amigos/aniadir']);
  }

  getAmigos() {
    this.amigosService.getAmigos().subscribe((resultadoConsulta) => {
      this.amigosData = [];
      resultadoConsulta.forEach((datosAmigo: Amigo) => {
        this.aniadirDatosUsuarioAmigo(datosAmigo.idAmigo);
      });
    });
  }

  aniadirDatosUsuarioAmigo(idAmigo: string) {
    this.authService.getUserData(idAmigo).subscribe((datosUsuario) => {

      datosUsuario.forEach((datosUsuario: User) => {
        this.amigosData.push(datosUsuario);
      });
    });
  }
}

