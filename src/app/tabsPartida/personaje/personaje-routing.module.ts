import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonajePage } from './personaje.page';
import { ItemsPersonajePage } from './items-personaje/items-personaje.page';

const routes: Routes = [
  {
    path: '',
    component: PersonajePage
  },
  {
    path: ':idPersonaje/items',
    component: ItemsPersonajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonajePageRoutingModule {}
