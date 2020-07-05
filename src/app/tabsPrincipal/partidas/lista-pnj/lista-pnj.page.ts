import { Component, OnInit } from '@angular/core';
import { PNJ } from 'src/app/models/pnj';
import { Router, ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/services/partidas-service/partidas.service';

@Component({
  selector: 'app-lista-pnj',
  templateUrl: './lista-pnj.page.html',
  styleUrls: ['./lista-pnj.page.scss'],
})
export class ListaPnjPage implements OnInit {

  private idPartida: string;
  public personajesPNJ: PNJ[];

  constructor(public router: Router, private route: ActivatedRoute, private partidasService: PartidasService) { }

  ngOnInit() {
    this.personajesPNJ = [];
    this.idPartida = this.route.snapshot.paramMap.get('idPartida');

    this.getPNJPartida();
  }

  async getPNJPartida() {
    await this.partidasService.getPNJPartida(this.idPartida).subscribe(pnjsPartida => {
      pnjsPartida.forEach(pnjPartida => {
        let idPersonaje = pnjPartida.id;
        let personaje = pnjPartida.data() as PNJ;
        this.personajesPNJ.push(personaje);
      });
    });
  }

  irAniadirPNJ() {
    this.router.navigate(['tabs/partidas/' + this.idPartida +  '/crear-pnj']);
  }
}
