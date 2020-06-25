import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaForosPage } from './lista-foros.page';
import { AniadirForoPage } from '../aniadir-foro/aniadir-foro.page';
import { ForoPage } from '../foro/foro.page';

const routes: Routes = [
  {
    path: '',
    component: ListaForosPage
  },
  {
    path: 'aniadirForo',
    component: AniadirForoPage
  },
  {
    path: ':idForo',
    component: ForoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaForosPageRoutingModule {}
