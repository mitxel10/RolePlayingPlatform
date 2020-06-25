import { Component, OnInit } from '@angular/core';
import { ForosService } from 'src/app/services/foros-service/foros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aniadir-foro',
  templateUrl: './aniadir-foro.page.html',
  styleUrls: ['./aniadir-foro.page.scss'],
})
export class AniadirForoPage implements OnInit {

  private idPartida: string;
  data = { nombreForo:'', descripcionForo:'' };

  constructor(private forosService: ForosService, public router: Router) { }

  ngOnInit() {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
  }

  aniadirForo() {
    this.forosService.aniadirForo(this.idPartida, this.data.nombreForo, this.data.descripcionForo);

    this.router.navigate(['tabsPartida/historia']);
  }
}
