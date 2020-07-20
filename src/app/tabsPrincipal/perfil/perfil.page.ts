import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { UsuariosService } from 'src/app/services/usuarios-service/usuarios.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuario: User;

  constructor(public authService: AuthenticationService, private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));

    this.usuariosService.getDatosUsuario(this.usuario.uid).subscribe(usuarioBuscado => {
      this.usuario = usuarioBuscado.data() as User;
    });
  }

}
