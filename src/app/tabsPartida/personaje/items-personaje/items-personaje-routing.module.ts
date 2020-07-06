import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsPersonajePage } from './items-personaje.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsPersonajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsPersonajePageRoutingModule {}
