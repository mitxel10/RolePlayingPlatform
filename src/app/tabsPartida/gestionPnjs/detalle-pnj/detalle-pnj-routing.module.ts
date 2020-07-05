import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePnjPage } from './detalle-pnj.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePnjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePnjPageRoutingModule {}
