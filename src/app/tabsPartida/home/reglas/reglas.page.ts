import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Partida } from 'src/app/models/partida';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.page.html',
  styleUrls: ['./reglas.page.scss'],
})
export class ReglasPage implements OnInit {

  @ViewChild(PdfViewerComponent, {static: false}) private pdfComponent: PdfViewerComponent;

  private idPartida: string;
  public partida: Partida;
  public src: string;
  // public zoom: number = 1.0;
  // public textoBusqueda: string;
  // originalSize: boolean = true;

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
