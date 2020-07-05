import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPnjPage } from './lista-pnj.page';
import { CrearPnjPage } from '../crear-pnj/crear-pnj.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPnjPage
  },
  {
    path: ':idPartida/crear-pnj',
    component: CrearPnjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPnjPageRoutingModule {}
