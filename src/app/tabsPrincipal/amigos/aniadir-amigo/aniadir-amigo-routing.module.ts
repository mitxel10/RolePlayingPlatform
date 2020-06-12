import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AniadirAmigoPage } from './aniadir-amigo.page';

const routes: Routes = [
  {
    path: '',
    component: AniadirAmigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AniadirAmigoPageRoutingModule {}
