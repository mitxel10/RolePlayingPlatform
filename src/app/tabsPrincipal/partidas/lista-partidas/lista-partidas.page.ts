import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-partidas',
  templateUrl: './lista-partidas.page.html',
  styleUrls: ['./lista-partidas.page.scss'],
})
export class ListaPartidasPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  irAniadirPartida() {
    this.router.navigate(['tabs/partidas/aniadir']);
  }
}
