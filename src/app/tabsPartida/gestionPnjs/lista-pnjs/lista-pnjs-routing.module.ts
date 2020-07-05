import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPnjsPage } from './lista-pnjs.page';
import { AniadirPnjPage } from '../aniadir-pnj/aniadir-pnj.page';
import { DetallePnjPage } from '../detalle-pnj/detalle-pnj.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPnjsPage
  },
  {
    path: 'aniadirPnj',
    component: AniadirPnjPage
  },
  {
    path: ':idPartida',
    component: DetallePnjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPnjsPageRoutingModule {}
