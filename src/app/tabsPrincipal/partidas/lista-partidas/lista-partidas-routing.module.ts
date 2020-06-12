import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPartidasPage } from './lista-partidas.page';
import { AniadirPartidaPage } from '../aniadir-partida/aniadir-partida.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPartidasPage
  },
  {
    path: 'aniadir',
    component: AniadirPartidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPartidasPageRoutingModule {}
