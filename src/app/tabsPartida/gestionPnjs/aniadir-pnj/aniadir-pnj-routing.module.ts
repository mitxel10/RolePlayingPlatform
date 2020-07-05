import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AniadirPnjPage } from './aniadir-pnj.page';

const routes: Routes = [
  {
    path: '',
    component: AniadirPnjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AniadirPnjPageRoutingModule {}
