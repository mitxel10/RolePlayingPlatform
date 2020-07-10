import { Component, OnInit, SecurityContext } from '@angular/core';
import { Partida } from 'src/app/models/partida';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.page.html',
  styleUrls: ['./reglas.page.scss'],
})
export class ReglasPage implements OnInit {

  private idPartida: string;
  public partida: Partida;
  public src: string;

  constructor(private partidasService: PartidasService, private sanitized: DomSanitizer) { }

  ngOnInit() {
    this.partida = new Partida;
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.getDatosPartida();
  }

  getDatosPartida() {
    this.partidasService.getDatosPartida(this.idPartida).subscribe(partidaBuscada => {
      this.partida = partidaBuscada.data() as Partida;
      this.src = this.sanitized.sanitize(SecurityContext.RESOURCE_URL, this.sanitized.bypassSecurityTrustResourceUrl(this.partida.docReglas));
    });
  }
}
