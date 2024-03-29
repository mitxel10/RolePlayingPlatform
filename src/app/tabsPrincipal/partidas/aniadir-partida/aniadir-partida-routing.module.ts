import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AniadirPartidaPage } from './aniadir-partida.page';

const routes: Routes = [
  {
    path: '',
    component: AniadirPartidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AniadirPartidaPageRoutingModule {}
