import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPartidasPage } from './lista-partidas.page';
import { AniadirPartidaPage } from '../aniadir-partida/aniadir-partida.page';
import { CrearPersonajePage } from '../crear-personaje/crear-personaje/crear-personaje.page';
import { ListaPnjPage } from '../lista-pnj/lista-pnj.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPartidasPage
  },
  {
    path: 'aniadir',
    component: AniadirPartidaPage
  },
  {
    path: ':idPartida/crear-personaje',
    component: CrearPersonajePage
  },
  {
    path: ':idPartida/lista-pnj',
    component: ListaPnjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPartidasPageRoutingModule {}
