import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPnjPage } from './crear-pnj.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPnjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPnjPageRoutingModule {}
