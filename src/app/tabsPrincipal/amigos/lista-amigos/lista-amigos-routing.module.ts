import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAmigosPage } from './lista-amigos.page';
import { AniadirAmigoPage } from '../aniadir-amigo/aniadir-amigo.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAmigosPage
  },
  {
    path: 'aniadir',
    component: AniadirAmigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAmigosPageRoutingModule {}
